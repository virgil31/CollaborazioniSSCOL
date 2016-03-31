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



//LIST FULL
if(isset($_GET["flag_full"])){
	$statement = $pdo->prepare("
		SELECT A.id, A.nome, COUNT(*) OVER() as total
		FROM registrazione A
	");
}
//LIST PAGINATO
else{
	$statement = $pdo->prepare("

		SELECT *,COUNT(*) OVER() as total
		FROM (
			(
				SELECT A.id,'individuale' as tipo,CONCAT(A.nome,' ',A.cognome) as nome_grid,data_registrazione,confermata,
					url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva					
				FROM registrazione_individuale A
				WHERE confermata = 't'
			)
		    UNION
		    (
				SELECT A.id,'ditta' as tipo,A.nome_ditta as nome_grid,data_registrazione,confermata,
					url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva
				FROM registrazione_ditta A

			)
		)tmp
		WHERE confermata = 't'

		ORDER BY $pro $dir LIMIT $limit OFFSET $start
	");
}


$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);


if(count($result) != 0)
	$total = $result[0]->total;

echo json_encode(array(
	"result" => $result,
	"total" => $total
));
