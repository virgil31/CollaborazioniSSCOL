<?php

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);

$s = $pdo->prepare("
	INSERT INTO registrazione_individuale(
        nome,cognome,data_nascita,stato_nascita,citta_nascita,

        indirizzo, cap, stato_residenza, citta_residenza,

        email,pec,telefono,

        codice_fiscale,partita_iva,

        tipo_laurea,nome_laurea,tipo_specializzazione,nome_specializzazione,albo,numero_albo, ". (($data['data_albo']!="") ? ":data_albo," : "") ."

		unique_seed, cittadinanza
    )
	VALUES(
        :nome,:cognome,:data_nascita,:stato_nascita,:citta_nascita,

        :indirizzo, :cap, :stato_residenza, :citta_residenza,

        :email, :pec, :telefono,

        :codice_fiscale, :partita_iva,

        :tipo_laurea, :nome_laurea, :tipo_specializzazione, :nome_specializzazione, :albo, :numero_albo, ". (($data['data_albo']!="") ? ":data_albo," : "") ."

		:unique_seed, :cittadinanza
    )
");

$unique_seed = generateRandomString(32);

$params = array(
	'nome' => $data['nome'],
	'cognome' => $data['cognome'],
	'data_nascita' => $data['data_nascita'],
	'stato_nascita' => $data['stato_nascita'],
	'citta_nascita' => $data['citta_nascita'],
	'indirizzo' => $data['indirizzo'],
	'cap' => $data['cap'],
	'stato_residenza' => $data['stato_residenza'],
	'citta_residenza' => $data['citta_residenza'],
	'email' => $data['email'],
	'pec' => $data['pec'],
	'telefono' => $data['telefono'],

	'codice_fiscale' => $data['codice_fiscale'],
	'partita_iva' => $data['partita_iva'],
	'tipo_laurea' => $data['tipo_laurea'],
	'nome_laurea' => $data['nome_laurea'],
	'tipo_specializzazione' => $data['tipo_specializzazione'],
	'nome_specializzazione' => $data['nome_specializzazione'],
	'albo' => $data['albo'],
	'numero_albo' => $data['numero_albo'],
	//'data_albo' => $data['data_albo'],

	'unique_seed' => $unique_seed,

	'cittadinanza' => $data["cittadinanza"]
);

if($data["data_albo"]!="") array_push($params,$data["data_albo"]);

$success = $s->execute($params);
$evetual_error = $pdo->errorInfo();

$registrazione_individuale_id = $pdo->lastInsertId("registrazione_individuale_id_seq");


//NaN con i servizi
foreach ($data["servizi_selezionati"] as $servizio_selezionato) {
    $s = $pdo->prepare("
    	INSERT INTO registrazione_individuale_servizio(registrazione_individuale_id,servizio_id,anni_esperienza)
    	VALUES(:registrazione_individuale_id,:servizio_id,:anni_esperienza)
    ");

    $params = array(
    	'registrazione_individuale_id' => $registrazione_individuale_id,
    	'servizio_id' => $servizio_selezionato["id"],
    	'anni_esperienza' => $servizio_selezionato["anni_esperienza"]
    );

    $success = $s->execute($params);
}
//NaN con i diplomi
foreach ($data["diploma_ids"] as $diploma_id) {
    $s = $pdo->prepare("
    	INSERT INTO registrazione_individuale_diploma(registrazione_individuale_id,diploma_id)
    	VALUES(:registrazione_individuale_id,:diploma_id)
    ");

    $params = array(
    	'registrazione_individuale_id' => $registrazione_individuale_id,
    	'diploma_id' => $diploma_id
    );

    $success = $s->execute($params);
}

// sposto i files e aggiorno i campi in "iscrizione_individuale"
spostaFileEAggiornaIscrizione($_FILES["curriculum"],$registrazione_individuale_id,"url_curriculum");
spostaFileEAggiornaIscrizione($_FILES["documento_identita"],$registrazione_individuale_id,"url_documento_identita");
spostaFileEAggiornaIscrizione($_FILES["referenze_professionali"],$registrazione_individuale_id,"url_referenze_professionali");
spostaFileEAggiornaIscrizione($_FILES["dichiarazione_sostitutiva"],$registrazione_individuale_id,"url_dichiarazione_sostitutiva");

$url_da_allegare_tmp = getUrlsDocumenti($registrazione_individuale_id);
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
            "id" => $registrazione_individuale_id
        ),
		"mail_inviata" => inviaMail("Collaborazioni-SSCOL@no-reply.com", $data['email'], "Conferma registrazione", 'Si è pregati di confermare la registrazione cliccando su questo <a target="_blank" href="http://localhost/projects/Extjs_6.0.0/CollaborazioniSSCOL/#activate/u/'.$unique_seed.'">LINK</a>.<br><br>'.getRiepilogo($registrazione_individuale_id),$url_da_allegare)
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


function getUrlsDocumenti($registrazione_individuale_id){
	$ini_array = parse_ini_file("../config.ini");
	$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

	$statement = $pdo->prepare("
		SELECT url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva
		FROM registrazione_individuale A
		WHERE A.id = $registrazione_individuale_id
	");

	$statement->execute();
	$result = $statement->fetchAll(PDO::FETCH_OBJ);

	return $result[0];
}


function getRiepilogo($registrazione_id){
	$ini_array = parse_ini_file("../config.ini");
	$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

	$servizi =  getServiziById($registrazione_id);
	$servizi_txt = "";

	foreach ($servizi as $servizio) {
		$servizi_txt .= $servizio->nome." (".$servizio->anni_esperienza." anni), ";
	}

	$to_return = "";

	$statement = $pdo->prepare("
		SELECT CONCAT(A.id,'U') as id,A.nome,A.cognome,cittadinanza, data_nascita,stato_nascita,citta_nascita,
		stato_residenza, citta_residenza,indirizzo, cap,

		email,pec,telefono,codice_fiscale,partita_iva,

		url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva,

		tipo_laurea,nome_laurea,tipo_specializzazione,nome_specializzazione,
		albo, numero_albo,data_albo


		FROM registrazione_individuale A
			WHERE A.id = $registrazione_id
	");

	$diplomi = getDiplomiFromRegistrazioneIndividuale($registrazione_id);

	$statement->execute();
	$result = $statement->fetchAll(PDO::FETCH_OBJ);
	return '<b>Riepilogo Informazioni Della Registrazione</b><br><br>
			<table border="1">
				<tr style="background: greenyellow;"><th>Codice ID</th><b>'.$result[0]->id.'</b></tr>
				<br>
				<br>
				<tr><th>Nome</th>'.$result[0]->nome." ".$result[0]->cognome.'</tr>
				<tr><th>Email</th>'.$result[0]->email.'</tr>
				<tr><th>Cittadinanza</th>'.$result[0]->cittadinanza.'</tr>
				<tr><th>Data di Nascita</th>'.$result[0]->data_nascita.'</tr>
				<tr><th>Stato di Nascita</th>'.$result[0]->stato_nascita.'</tr>
				<tr><th>Citta\' di Nascita</th>'.$result[0]->citta_nascita.'</tr>
				<tr><th>Codice Fiscale</th>'.$result[0]->codice_fiscale.'</tr>
				<br>
				<br>
				<tr><th>Stato di Residenza</th>'.$result[0]->stato_residenza.'</tr>
				<tr><th>Citta\' di Residenza</th>'.$result[0]->citta_residenza.'</tr>
				<tr><th>Indirizzo</th>'.$result[0]->indirizzo." - ".$result[0]->cap.'</tr>
				<br>
				<br>
				<tr><th>email</th>'.$result[0]->email.'</tr>
				<tr><th>PEC</th>'.$result[0]->pec.'</tr>
				<tr><th>Telefono</th>'.$result[0]->telefono.'</tr>
				<tr><th>Codice Fiscale</th>'.$result[0]->codice_fiscale.'</tr>
				<tr><th>Partita IVA</th>'.$result[0]->partita_iva.'</tr>
				<br>
				<br>
				<tr><th>Diplomi</th>'.$diplomi.'</tr>
				<tr><th>Laurea</th>'.$result[0]->tipo_laurea." - ".$result[0]->nome_laurea.'</tr>
				<tr><th>Specializzazione</th>'.$result[0]->tipo_specializzazione." - ".$result[0]->nome_specializzazione.'</tr>
				<tr><th>Albo</th>'.$result[0]->albo.'</tr>
				<tr><th>#Albo</th>'.$result[0]->numero_albo.'</tr>
				<tr><th>Data Iscrizione Albo</th>'.$result[0]->data_albo.'</tr>
				<br>
				<br>
				<tr><th>Servizi</th>'.$servizi_txt.'</tr>
			</table>';
}

function getDiplomiFromRegistrazioneIndividuale($id){
	$ini_array = parse_ini_file("../config.ini");
	$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);


	$statement = $pdo->prepare("
		SELECT STRING_AGG(B.nome,',') as diplomi
		FROM registrazione_individuale_diploma A
			LEFT JOIN diploma B ON B.id = A.diploma_id
		WHERE A.registrazione_individuale_id = :registrazione_id
		GROUP BY A.registrazione_individuale_id
	");

	$params = array(
		'registrazione_id' => $id
	);

	$statement->execute($params);
	$result = $statement->fetchAll(PDO::FETCH_OBJ);

	return $result[0]->diplomi;
}

function getServiziById($id){
	$ini_array = parse_ini_file("../config.ini");
	$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

	$statement = $pdo->prepare("
		SELECT C.id, C.nome, B.anni_esperienza
		FROM registrazione_individuale A
			LEFT JOIN registrazione_individuale_servizio B ON B.registrazione_individuale_id = A.id
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
function spostaFileEAggiornaIscrizione($file_object, $registrazione_individuale_id, $attribute_name){
	$ini_array = parse_ini_file("../config.ini");
	$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

	$path_upload = $ini_array['path_upload'];
	$path_info = pathinfo($file_object["name"]);
	$file_name = md5_file($file_object["tmp_name"]);
	$extension = $path_info["extension"];
	$final_file_name = $file_name .".".$extension;

	$sub_direcorty_name = "".(floor($registrazione_individuale_id/1000))."";

	if(!file_exists($path_upload.$sub_direcorty_name))
        mkdir($path_upload.$sub_direcorty_name, 0775);

    move_uploaded_file($file_object["tmp_name"],$path_upload.$sub_direcorty_name."/".$final_file_name);


	//aggiorno tabella
	$s = $pdo->prepare("
		UPDATE registrazione_individuale
		SET $attribute_name = :url
		WHERE id = :id
    ");

    $params = array(
    	'url' => $sub_direcorty_name."/".$final_file_name,
    	'id' => $registrazione_individuale_id
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
