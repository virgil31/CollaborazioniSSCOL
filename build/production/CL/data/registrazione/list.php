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
	//con filtri
	if(isset($_GET["query_params"])){
		$query_params = json_decode($_GET["query_params"]);

		$esito = $query_params->esito;
		$tipo = $query_params->tipo;
		$nome = $query_params->nome;
		$email = $query_params->email;
		$pec = $query_params->pec;
		$telefono = $query_params->telefono;
		$codice_fiscale = $query_params->codice_fiscale;
		$partita_iva = $query_params->partita_iva;

		$servizio_id = $query_params->servizio_id;
		$anni_esperienza = $query_params->anni_esperienza;

		$statement = $pdo->prepare("

			SELECT *,COUNT(*) OVER() as total
			FROM (
				(
					SELECT A.id,'individuale' as tipo,CONCAT(A.nome,' ',A.cognome) as nome_grid,data_registrazione,confermata,esito,
						url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva,

						nome, cognome, email, codice_fiscale, '' as nome_ditta, indirizzo, cap, '' as stato_sede_legale, '' as citta_sede_legale,
						'' as email_ditta, pec, telefono, partita_iva, '' as codice_fiscale_ditta, unique_seed,

						cittadinanza, data_nascita, stato_nascita,citta_nascita, stato_residenza, citta_residenza,
						CONCAT(tipo_laurea,' - ',nome_laurea) as laurea, CONCAT(tipo_specializzazione,' - ',nome_specializzazione) as specializzazione,
						albo, numero_albo, data_albo

					FROM registrazione_individuale A
						".(($servizio_id == "") ? " " : " RIGHT JOIN registrazione_individuale_servizio B ON (B.registrazione_individuale_id = A.id AND B.servizio_id = $servizio_id ".(($anni_esperienza == "")? " ": " AND B.anni_esperienza like '$anni_esperienza' ").") ")."

					WHERE confermata = 't'
					".(($esito == "tutti") ? " " : (($esito == "") ? " AND esito IS NULL ": " AND esito like '$esito' "))."
					".(($tipo == "tutti") ? " " : " AND 'individuale' like '$tipo'")."
					".(($nome == "") ? " ": " AND CONCAT(A.nome,' ',A.cognome) ilike '%$nome%' ")."
					".(($email == "") ? " ": " AND email ilike '%$email%' ")."
					".(($pec == "") ? " ": " AND pec ilike '%$pec%' ")."
					".(($telefono == "") ? " ": " AND telefono ilike '%$telefono%' ")."
					".(($codice_fiscale == "") ? " ": " AND telefono ilike '%$codice_fiscale%' ")."
					".(($partita_iva == "") ? " ": " AND partita_iva ilike '%$partita_iva%' ")."
				)
			    UNION
			    (
					SELECT A.id,'ditta' as tipo,A.nome_ditta as nome_grid,data_registrazione,confermata,esito,
						url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva,

						nome, cognome, email, codice_fiscale, nome_ditta, indirizzo, cap, stato_sede_legale, citta_sede_legale,
						email_ditta, pec, telefono, partita_iva, codice_fiscale_ditta, unique_seed,

						'' as cittadinanza, 'now()' as data_nascita, '' as stato_nascita,'' as citta_nascita, '' as stato_residenza, '' as citta_residenza,
						'' as laurea,'' as specializzazione,
						'' as albo, '' as numero_albo, 'now()' as data_albo


					FROM registrazione_ditta A
						".(($servizio_id == "") ? " " : " RIGHT JOIN registrazione_ditta_servizio B ON (B.registrazione_ditta_id = A.id AND B.servizio_id = $servizio_id ".(($anni_esperienza == "")? " ": " AND B.anni_esperienza like '$anni_esperienza' ").") ")."

					WHERE confermata = 't'
					".(($esito == "tutti") ? " " : (($esito == "") ? " AND esito IS NULL ": " AND esito like '$esito' "))."
					".(($tipo == "tutti") ? " " : " AND 'ditta' like '$tipo'")."
					".(($nome == "") ? " ": " AND nome_ditta ilike '%$nome%' ")."
					".(($email == "") ? " ": " AND (email ilike '%$email%' OR email_ditta ilike '%$email%')")."
					".(($pec == "") ? " ": " AND pec ilike '%$pec%' ")."
					".(($telefono == "") ? " ": " AND telefono ilike '%$telefono%' ")."
					".(($codice_fiscale == "") ? " ": " AND (codice_fiscale ilike '%$codice_fiscale%' OR codice_fiscale_ditta ilike '%$codice_fiscale%')")."
					".(($partita_iva == "") ? " ": " AND partita_iva ilike '%$partita_iva%' ")."
				)
			)tmp
			WHERE confermata = 't'

			ORDER BY $pro $dir LIMIT $limit OFFSET $start
		");
	}
	//senza filtri
	else{
		$statement = $pdo->prepare("

			SELECT *,COUNT(*) OVER() as total
			FROM (
				(
					SELECT A.id,'individuale' as tipo,CONCAT(A.nome,' ',A.cognome) as nome_grid,data_registrazione,confermata,esito,
						url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva,

						nome, cognome, email, codice_fiscale, '' as nome_ditta, indirizzo, cap, '' as stato_sede_legale, '' as citta_sede_legale,
						'' as email_ditta, pec, telefono, partita_iva, '' as codice_fiscale_ditta, unique_seed,

						cittadinanza, data_nascita, stato_nascita,citta_nascita, stato_residenza, citta_residenza,
						CONCAT(tipo_laurea,' - ',nome_laurea) as laurea, CONCAT(tipo_specializzazione,' - ',nome_specializzazione) as specializzazione,
						albo, numero_albo, data_albo

					FROM registrazione_individuale A
					WHERE confermata = 't'
				)
			    UNION
			    (
					SELECT A.id,'ditta' as tipo,A.nome_ditta as nome_grid,data_registrazione,confermata,esito,
						url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva,

						nome, cognome, email, codice_fiscale, nome_ditta, indirizzo, cap, stato_sede_legale, citta_sede_legale,
						email_ditta, pec, telefono, partita_iva, codice_fiscale_ditta, unique_seed,

						'' as cittadinanza, 'now()' as data_nascita, '' as stato_nascita, '' as citta_nascita,'' as stato_residenza, '' as citta_residenza,
						'' as laurea,'' as specializzazione,
						'' as albo, '' as numero_albo, 'now()' as data_albo


					FROM registrazione_ditta A
					WHERE confermata = 't'
				)
			)tmp
			WHERE confermata = 't'

			ORDER BY $pro $dir LIMIT $limit OFFSET $start
		");
	}
}


$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);


if(count($result) != 0)
	$total = $result[0]->total;


foreach ($result as $row){
	$row->servizi = getServiziByIdAndTipo($row->id,$row->tipo);
	if($row->tipo == 'individuale')
		$row->diplomi = getDiplomiFromRegistrazioneIndividuale($row->id);
}


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
