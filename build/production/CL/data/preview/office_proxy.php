<?php

$ini_array = parse_ini_file("../config.ini");
$path_upload = $ini_array["path_upload"];

$file_url = $_GET['file_url'];

header('Content-type: application/ms-excel');
header('Content-Disposition: attachment; filename=test.xls');
readfile($path_upload.$file_url);

?>
