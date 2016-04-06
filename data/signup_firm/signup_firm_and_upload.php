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
    	INSERT INTO registrazione_ditta_servizio(registrazione_ditta_id,servizio_id,anni_esperienza)
    	VALUES(:registrazione_ditta_id,:servizio_id,:anni_esperienza)
    ");

    $params = array(
    	'registrazione_ditta_id' => $registrazione_ditta_id,
    	'servizio_id' => $servizio_selezionato["id"],
    	'anni_esperienza' => $servizio_selezionato["anni_esperienza"]
    );

    $success = $s->execute($params);
	$evetual_error = $pdo->errorInfo();

}


// sposto i files e aggiorno i campi in "iscrizione_ditta"
spostaFileEAggiornaIscrizione($_FILES["curriculum"],$registrazione_ditta_id,"url_curriculum");
spostaFileEAggiornaIscrizione($_FILES["documento_identita"],$registrazione_ditta_id,"url_documento_identita");
spostaFileEAggiornaIscrizione($_FILES["referenze_professionali"],$registrazione_ditta_id,"url_referenze_professionali");
spostaFileEAggiornaIscrizione($_FILES["dichiarazione_sostitutiva"],$registrazione_ditta_id,"url_dichiarazione_sostitutiva");

$url_da_allegare_tmp = getUrlsDocumenti($registrazione_ditta_id);
$url_da_allegare = array(
	$ini_array["path_upload"].$url_da_allegare_tmp->url_curriculum,
	$ini_array["path_upload"].$url_da_allegare_tmp->url_documento_identita,
	$ini_array["path_upload"].$url_da_allegare_tmp->url_referenze_professionali,
	$ini_array["path_upload"].$url_da_allegare_tmp->url_dichiarazione_sostitutiva
);

if ($success) {
    echo json_encode(array(
        "success" => true,
        "result" => array(
            "id" => $registrazione_ditta_id
        ),
		"mail_inviata" => inviaMail("Collaborazioni-SSCOL@no-reply.com", $data['email'], "Conferma registrazione", getRiepilogo($registrazione_ditta_id).'<br><br>Si è pregati di confermare la registrazione cliccando su questo <a target="_blank" href="http://localhost/projects/Extjs_6.0.0/CollaborazioniSSCOL/#activate/d/'.$unique_seed.'">LINK</a>.',$url_da_allegare)
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

function getUrlsDocumenti($registrazione_ditta_id){
	$ini_array = parse_ini_file("../config.ini");
	$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

	$statement = $pdo->prepare("
		SELECT url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva
		FROM registrazione_ditta A
		WHERE A.id = $registrazione_ditta_id
	");

	$statement->execute();
	$result = $statement->fetchAll(PDO::FETCH_OBJ);

	return $result[0];
}

function getRiepilogo($registrazione_ditta_id){
	$ini_array = parse_ini_file("../config.ini");
	$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

	$servizi =  getServiziById($registrazione_ditta_id);
	$servizi_txt = "";

	foreach ($servizi as $servizio) {
		$servizi_txt .= $servizio->nome." (".$servizio->anni_esperienza." anni), ";
	}

	$to_return = "";

	$statement = $pdo->prepare("
		SELECT CONCAT(A.id,'D') as id,A.nome_ditta,data_registrazione,
			url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva,

			nome, cognome, email, codice_fiscale, nome_ditta, indirizzo, cap, stato_sede_legale, citta_sede_legale,
			email_ditta, pec, telefono, partita_iva, codice_fiscale_ditta, unique_seed

		FROM registrazione_ditta A
		WHERE A.id = $registrazione_ditta_id

	");

	$statement->execute();
	$result = $statement->fetchAll(PDO::FETCH_OBJ);
	return '<b>Riepilogo Informazioni Della Registrazione</b><br><br>
			<table border="1">
				<tr style="background: greenyellow;"><th>Codice ID</th><b>'.$result[0]->id.'</b></tr>
				<br>
				<br>
				<tr><th>Nome (Rappresentante)</th>'.$result[0]->nome." ".$result[0]->cognome.'</tr>
				<tr><th>Email (Rappresentante)</th>'.$result[0]->email.'</tr>
				<tr><th>Codice Fiscale (Rappresentante)</th>'.$result[0]->codice_fiscale.'</tr>
				<br>
				<br>
				<tr><th>Nome Associazione</th>'.$result[0]->nome_ditta.'</tr>
				<tr><th>Indirizzo</th>'.$result[0]->indirizzo." ".$result[0]->cap.'</tr>
				<tr><th>Stato</th>'.$result[0]->stato_sede_legale.'</tr>
				<tr><th>Citta\'</th>'.$result[0]->citta_sede_legale.'</tr>
				<br>
				<br>
				<tr><th>Email (Associazione)</th>'.$result[0]->email_ditta.'</tr>
				<tr><th>PEC (Associazione)</th>'.$result[0]->pec.'</tr>
				<tr><th>Telefono</th>'.$result[0]->telefono.'</tr>
				<tr><th>Partita IVA</th>'.$result[0]->partita_iva.'</tr>
				<tr><th>Codice Fiscale (Associazione)</th>'.$result[0]->codice_fiscale_ditta.'</tr>
				<br>
				<br>
				<tr><th>Servizi</th>'.$servizi_txt.'</tr>
			</table>';
}

function getServiziById($id){
	$ini_array = parse_ini_file("../config.ini");
	$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

	$statement = $pdo->prepare("
		SELECT C.id, C.nome, B.anni_esperienza
		FROM registrazione_ditta A
			LEFT JOIN registrazione_ditta_servizio B ON B.registrazione_ditta_id = A.id
			LEFT JOIN servizio C ON C.id = B.servizio_id
		WHERE A.id = :registrazione_id
	");

	$params = array(
		'registrazione_id' => $id
	);

	$statement->execute($params);
	$result = $statement->fetchAll(PDO::FETCH_OBJ);

	return $result;
}


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

function inviaMail($from, $to, $oggetto, $testo, $allegati = null){
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

	if($allegati != null){
		$mail->addAttachment($allegati[0], "CV.pdf");
		$mail->addAttachment($allegati[1], "Documento Identita.pdf");
		$mail->addAttachment($allegati[2], "Referenze Professionali.xls");
		$mail->addAttachment($allegati[3], "Dichiarazione Sostitutiva.pdf");
	}

	$mail->Subject = $oggetto;
	$mail->Body    = $testo."<br><br><b><i>La presente e-mail è stata generata automaticamente da un indirizzo di posta elettronica di solo invio; si chiede pertanto di non rispondere al messaggio.</i></b>";
	//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

	$mail->isHTML(true);

	if(!$mail->send())
	    return 'Mailer Error: ' . $mail->ErrorInfo;
	else
	    return 'Message has been sent';


}
