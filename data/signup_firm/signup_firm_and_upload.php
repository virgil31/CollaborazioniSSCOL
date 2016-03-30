<?php

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);

$s = $pdo->prepare("
	INSERT INTO registrazione_ditta(
		nome,cognome,email,codice_fiscale,nome_ditta,indirizzo,cap,stato_sede_legale,citta_sede_legale,
		email_ditta,pec,telefono,partita_iva,codice_fiscale_ditta,unique_seed
	)
	VALUES(
        :nome,:cognome,:email,:codice_fiscale,:nome_ditta,:indirizzo,:cap,:stato_sede_legale,:citta_sede_legale,
		:email_ditta,:pec,:telefono,:partita_iva,:codice_fiscale_ditta,:unique_seed
    )
");

$unique_seed = generateRandomString(32);

$params = array(
	'nome' => $data['nome'],
	'cognome' => $data['cognome'],
	'email' => $data['email'],
	'codice_fiscale' => $data['codice_fiscale'],
	'nome_ditta' => $data['nome_ditta'],
	'indirizzo' => $data['indirizzo'],
	'cap' => $data['cap'],
	'stato_sede_legale' => $data['stato_sede_legale'],
	'citta_sede_legale' => $data['citta_sede_legale'],
	'email_ditta' => $data['email_ditta'],
	'pec' => $data['pec'],
	'telefono' => $data['telefono'],
	'partita_iva' => $data['partita_iva'],
	'codice_fiscale_ditta' => $data['codice_fiscale_ditta'],
	'partita_iva' => $data['partita_iva'],

	'unique_seed' => $unique_seed
);

$success = $s->execute($params);
$evetual_error = $pdo->errorInfo();

$registrazione_ditta_id = $pdo->lastInsertId("registrazione_ditta_id_seq");


//NaN con i servizi
foreach ($data["servizi_selezionati"] as $servizio_selezionato) {
    $s = $pdo->prepare("
    	INSERT INTO registrazione_ditta_servizio(registrazione_ditta_id,servizio_id)
    	VALUES(:registrazione_ditta_id,:servizio_id)
    ");

    $params = array(
    	'registrazione_ditta_id' => $registrazione_ditta_id,
    	'servizio_id' => $servizio_selezionato["id"]
    );

    $success = $s->execute($params);
	$evetual_error = $pdo->errorInfo();

}


// sposto i files e aggiorno i campi in "iscrizione_ditta"
spostaFileEAggiornaIscrizione($_FILES["curriculum"],$registrazione_ditta_id,"url_curriculum");
spostaFileEAggiornaIscrizione($_FILES["documento_identita"],$registrazione_ditta_id,"url_documento_identita");
spostaFileEAggiornaIscrizione($_FILES["referenze_professionali"],$registrazione_ditta_id,"url_referenze_professionali");
spostaFileEAggiornaIscrizione($_FILES["dichiarazione_sostitutiva"],$registrazione_ditta_id,"url_dichiarazione_sostitutiva");

if ($success) {
    echo json_encode(array(
        "success" => true,
        "result" => array(
            "id" => $registrazione_ditta_id
        ),
		"mail_inviata" => inviaMail("Collaborazioni-SSCOL@no-reply.com", $data['email'], "Conferma registrazione", 'Si è pregati di confermare la registrazione cliccando su questo <a target="_blank" href="http://localhost/projects/Extjs_6.0.0/CollaborazioniSSCOL/#activate/d/'.$unique_seed.'">LINK</a>.')
    ));
}
else{
    echo json_encode(array(
        "success" => false,
        "error_message" => $evetual_error
    ));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

/*
I file verranno uppati in sottocartelle da massimo 1000 files. Il conteggio lo faccio in base a l'id
dell'iscrizione
*/
function spostaFileEAggiornaIscrizione($file_object, $registrazione_ditta_id, $attribute_name){
	$ini_array = parse_ini_file("../config.ini");
	$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

	$path_upload = $ini_array['path_upload'];
	$path_info = pathinfo($file_object["name"]);
	$file_name = md5_file($file_object["tmp_name"]);
	$extension = $path_info["extension"];
	$final_file_name = $file_name .".".$extension;

	$sub_direcorty_name = "".(floor($registrazione_ditta_id/1000))."";

	if(!file_exists($path_upload.$sub_direcorty_name))
        mkdir($path_upload.$sub_direcorty_name, 0775);

    move_uploaded_file($file_object["tmp_name"],$path_upload.$sub_direcorty_name."/".$final_file_name);


	//aggiorno tabella
	$s = $pdo->prepare("
		UPDATE registrazione_ditta
		SET $attribute_name = :url
		WHERE id = :id
    ");

    $params = array(
    	'url' => $sub_direcorty_name."/".$final_file_name,
    	'id' => $registrazione_ditta_id
    );

    $success = $s->execute($params);
}

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function inviaMail($from, $to, $oggetto, $testo){
	require '../../resources/lib/PHPMailer/PHPMailerAutoload.php';
	$ini_array = parse_ini_file("../config.ini");

	$mail = new PHPMailer;

	//$mail->SMTPDebug = 3;

	$mail->isSMTP();
	$mail->Host = $ini_array["smtp_host"];
	$mail->SMTPAuth = false;
	$mail->Port = $ini_array["smtp_port"];

	$mail->SMTPOptions = array(
		'ssl' => array(
		    'verify_peer' => false,
		    'verify_peer_name' => false,
		    'allow_self_signed' => true
		)
	);


	$mail->setFrom($from, 'Collaborazioni SSCOL');
	$mail->addAddress($to);

	$mail->Subject = $oggetto;
	$mail->Body    = $testo."<br><br><b><i>La presente e-mail è stata generata automaticamente da un indirizzo di posta elettronica di solo invio; si chiede pertanto di non rispondere al messaggio.</i></b>";
	//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

	$mail->isHTML(true);

	if(!$mail->send())
	    return 'Mailer Error: ' . $mail->ErrorInfo;
	else
	    return 'Message has been sent';


}
