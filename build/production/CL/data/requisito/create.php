<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);

$s = $pdo->prepare("
	INSERT INTO requisito(nome)
	VALUES(:nome)
");

$params = array(
	'nome' => $data['nome']
);

$success = $s->execute($params);

$ruolo_id = $pdo->lastInsertId("requisito_id_seq");


if ($success) {
    echo json_encode(array(
        "success" => true,
        "result" => array(
            "id" => $ruolo_id
        )
    ));
}
else{
    echo json_encode(array(
        "success" => false,
        "error_message" =>  $pdo->errorInfo()
    ));
}
