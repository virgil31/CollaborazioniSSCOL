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

        tipo_laurea,nome_laurea,tipo_specializzazione,nome_specializzazione,albo,numero_albo,data_albo,

		unique_seed
    )
	VALUES(
        :nome,:cognome,:data_nascita,:stato_nascita,:citta_nascita,

        :indirizzo, :cap, :stato_residenza, :citta_residenza,

        :email, :pec, :telefono,

        :codice_fiscale, :partita_iva,

        :tipo_laurea, :nome_laurea, :tipo_specializzazione, :nome_specializzazione, :albo, :numero_albo, :data_albo,

		:unique_seed
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
	'data_albo' => $data['data_albo'],

	'unique_seed' => $unique_seed
);

$success = $s->execute($params);
$evetual_error = $pdo->errorInfo();

$registrazione_individuale_id = $pdo->lastInsertId("registrazione_individuale_id_seq");


//NaN con i servizi
foreach ($data["servizi_selezionati"] as $servizio_selezionato) {
    $s = $pdo->prepare("
    	INSERT INTO registrazione_individuale_servizio(registrazione_individuale_id,servizio_id)
    	VALUES(:registrazione_individuale_id,:servizio_id)
    ");

    $params = array(
    	'registrazione_individuale_id' => $registrazione_individuale_id,
    	'servizio_id' => $servizio_selezionato["id"]
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

// invio mail con link di attivazione ($unique_seed)
//TODO

if ($success) {
    echo json_encode(array(
        "success" => true,
        "result" => array(
            "id" => $registrazione_individuale_id
        )
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
function spostaFileEAggiornaIscrizione($file_object, $registrazione_individuale_id, $attribute_name){
	$ini_array = parse_ini_file("../config.ini");
	$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

	$path_upload = $ini_array['path_upload'];
	$path_info = pathinfo($file_object["name"]);
	$file_name = md5_file($file_object["tmp_name"]);
	$extension = $path_info["extension"];
	$final_file_name = $file_name .".".$extension;

	$sub_direcorty_name = "".(floor($registrazione_individuale_id/5))."";

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
