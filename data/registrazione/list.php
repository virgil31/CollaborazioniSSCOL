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
				SELECT A.id,'individuale' as tipo,CONCAT(A.nome,' ',A.cognome) as nome_grid,data_registrazione,confermata,esito,
					url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva,

					nome, cognome, email, codice_fiscale, '' as nome_ditta, indirizzo, cap, '' as stato_sede_legale, '' as citta_sede_legale,
					'' as email_ditta, pec, telefono, partita_iva, '' as codice_fiscale_ditta, unique_seed

				FROM registrazione_individuale A
				WHERE confermata = 't'
			)
		    UNION
		    (
				SELECT A.id,'ditta' as tipo,A.nome_ditta as nome_grid,data_registrazione,confermata,esito,
					url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva,

					nome, cognome, email, codice_fiscale, nome_ditta, indirizzo, cap, stato_sede_legale, citta_sede_legale,
					email_ditta, pec, telefono, partita_iva, codice_fiscale_ditta, unique_seed

				FROM registrazione_ditta A
				WHERE confermata = 't'
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


foreach ($result as $row)
	$row->servizi = getServiziByIdAndTipo($row->id,$row->tipo);


echo json_encode(array(
	"result" => $result,
	"total" => $total
));




//////////////////////////////////////

function getServiziByIdAndTipo($id,$tipo){
	$ini_array = parse_ini_file("../config.ini");
	$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

	$statement = $pdo->prepare("
		SELECT C.id, C.nome, B.anni_esperienza
		FROM registrazione_".$tipo." A
			LEFT JOIN registrazione_".$tipo."_servizio B ON B.registrazione_".$tipo."_id = A.id
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
