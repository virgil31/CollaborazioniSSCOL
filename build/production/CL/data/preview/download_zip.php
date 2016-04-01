<?php


$ini_array = parse_ini_file("../config.ini");
$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$default_upload_dir = $ini_array["path_upload"];

$registrazione_id = $_GET["registrazione_id"];
$tipo = $_GET["tipo"];

if($tipo == 'individuale'){
    $statement = $pdo->prepare("
        SELECT CONCAT(id,'U') as id,CONCAT(nome,' ',cognome) as nome, url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva
        FROM registrazione_individuale
    ");
}
else{
    $statement = $pdo->prepare("
        SELECT CONCAT(id,'D') as id,nome_ditta as nome, url_curriculum, url_documento_identita, url_referenze_professionali, url_dichiarazione_sostitutiva
        FROM registrazione_ditta
    ");
}

$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);


$zip = new ZipArchive();
$zip_name = $result[0]->id."-".$result[0]->nome.".zip";
$zip->open("temp/".$zip_name, ZipArchive::CREATE);

$zip->addFromString("CV.pdf",file_get_contents($ini_array["path_upload"].$result[0]->url_curriculum));
$zip->addFromString("Documento_Identita.pdf",file_get_contents($ini_array["path_upload"].$result[0]->url_documento_identita));
$zip->addFromString("Referenze_Professionali.xls",file_get_contents($ini_array["path_upload"].$result[0]->url_referenze_professionali));
$zip->addFromString("Dichiarazione_Sostitutiva.pdf",file_get_contents($ini_array["path_upload"].$result[0]->url_dichiarazione_sostitutiva));

$zip->close();

//faccio partire il download
header('Content-Type: application/zip');
header('Content-disposition: attachment; filename='.$zip_name);
readfile("temp/".$zip_name);
//elimino lo zip temporaneo creato per l'invio
unlink("temp/".$zip_name);
