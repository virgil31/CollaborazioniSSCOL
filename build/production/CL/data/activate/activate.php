<?php

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);


$type = $_POST["type"];
$unique_seed = $_POST["unique_seed"];


//attivazione registrazione individuale
if($type == "u"){
    $s = $pdo->prepare("
    	UPDATE registrazione_individuale
        SET confermata = :confermata
        WHERE unique_seed = :unique_seed
    ");
}
//attivazione registrazione ditta
else{
    $s = $pdo->prepare("
    	UPDATE registrazione_ditta
        SET confermata = :confermata
        WHERE unique_seed = :unique_seed
    ");
}

$params = array(
    'confermata' => true,
    'unique_seed' => $unique_seed
);

$success = $s->execute($params);

$eventual_error = $pdo->errorInfo();


if($success){
    echo json_encode(array(
        'success' => true
    ));
}
else{
    echo json_encode(array(
        'success' => false,
        'error' => $eventual_error
    ));
}
