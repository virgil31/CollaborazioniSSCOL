<?php

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$codice_fiscale = $_POST["codice_fiscale"];

$statement = $pdo->prepare("
	SELECT id
	FROM registrazione_individuale
	WHERE codice_fiscale like :codice_fiscale
");

$params = array(
	"codice_fiscale" => $codice_fiscale
);


$statement->execute($params);
$result = $statement->fetchAll(PDO::FETCH_OBJ);


echo json_encode(array(
	"result" => count($result) > 0	//torna TRUE se è un duplicato, altrimenti FALSE
));
