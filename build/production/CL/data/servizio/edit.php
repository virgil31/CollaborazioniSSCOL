<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);

//AGGIORNO RUOLO
$s = $pdo->prepare("
	UPDATE ruolo
	SET nome = :nome
	WHERE id = :id
");

$params = array(
	'id' => $data["id"],
	'nome' => $data['nome']
);

$success = $s->execute($params);

//AGGIORNO RUOLO x REQUISITO
//prima elimino i precedenti requisiti
$s = $pdo->prepare("
	DELETE FROM ruolo_requisito
	WHERE ruolo_id = :id
");
$params = array(
	'id' => $data["id"]
);
$success = $s->execute($params);

//poi inserisco i nuovi
foreach ($data['requisito_ids'] as $requisito_id) {
	$s = $pdo->prepare("
		INSERT INTO ruolo_requisito(ruolo_id,requisito_id)
		VALUES(:ruolo_id,:requisito_id)
	");
	$params = array(
		'ruolo_id' => $data["id"],
		'requisito_id' => $requisito_id
	);
	$success = $s->execute($params);
}



if ($success) {
    echo json_encode(array(
        "success" => true
    ));
}
else{
    echo json_encode(array(
        "success" => false,
        "error_message" =>  $pdo->errorInfo()
    ));
}
