<?php

$ini_array = parse_ini_file("../config.ini");
$default_upload_dir = $ini_array["path_upload"];

$title = $_GET["file_name"];
$url = $_GET["file_url"];
$tmp_info = pathinfo($url);
$file_title = $title.".".$tmp_info["extension"];


$file_url = $default_upload_dir.$url;
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary");
header("Content-disposition: attachment; filename=\"$file_title\"");
readfile($file_url);
