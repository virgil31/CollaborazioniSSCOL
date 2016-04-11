<?php

$ini_array = parse_ini_file("../config.ini");
$path_upload = $ini_array["path_upload"];

$file_url = $_GET['file_url'];

$pathinfo = pathinfo($file_url);

if(strtolower($pathinfo["extension"]) == 'xls'){
    header('Content-type: application/ms-excel');
    header('Content-Disposition: attachment; filename=collaborazione.xls');
}
else if(strtolower($pathinfo["extension"]) == 'doc'){
    header('Content-type: application/ms-word');
    header('Content-Disposition: attachment; filename=collaborazione.doc');
}


readfile($path_upload.$file_url);

?>
