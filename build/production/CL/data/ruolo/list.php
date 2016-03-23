<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$sort = (isset($_GET['sort']) ? $_GET['sort'] : $_GET['sort']);
$tmp = json_decode($sort,true);
$pro = $tmp[0]['property'];
$dir = $tmp[0]['direction'];

$limit = $_GET['limit'];
$start = $_GET['start'];

$total = 0;

$statement = $pdo->prepare("
	SELECT A.id, A.nome, ARRAY_AGG(B.requisito_id) as requisito_ids, COUNT(*) OVER() as total
	FROM ruolo A
	LEFT JOIN ruolo_requisito B ON B.ruolo_id = A.id
	GROUP BY A.id,A.nome
	ORDER BY $pro $dir LIMIT $limit OFFSET $start
");

$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);

foreach ($result as $row) {
	$row->requisito_ids = getIntArrayFromPGArray($row->requisito_ids);
}


if(count($result) != 0)
	$total = $result[0]->total;

echo json_encode(array(
	"result" => $result,
	"total" => $total
));

/////////////////////////////////////////////////////////////////

function getIntArrayFromPGArray($pg_array){
	$pg_array = str_replace('{','',$pg_array);
	$pg_array = str_replace('}','',$pg_array);
	return array_map('intval',explode(",",$pg_array));
}
