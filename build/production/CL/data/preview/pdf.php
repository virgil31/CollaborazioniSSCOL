<?php

    $ini_array = parse_ini_file("../config.ini");

    $file = $ini_array['path_upload'].$_GET["file_url"];
    $filename = 'pdf.pdf';
    header('Content-type: application/pdf');
    header('Content-Disposition: inline; filename="' . $filename . '"');
    header('Content-Transfer-Encoding: binary');
    header('Accept-Ranges: bytes');
    @readfile($file);

?>
