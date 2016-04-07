
<iframe src="http://docs.google.com/viewer?url=<?=urlencode('www.columbia.edu/~dj114/excel-examples.xls')?>&embedded=true" width="100%" height="97.5%" style="border: none;"></iframe>

<?php
/*
(http://stackoverflow.com/questions/11487365/http-header-for-downloading-microsoft-word-and-excel-files)
quando si entrerà in produzione bisognerà (distinguere il tipo di estensione?)
e stamapare il file verso l'api di google



Ad esempio nel caso dei PDF, per dare un pdf in pasto al widget
gli ho passato questo:

dal client -> src: "resources/lib/pdfjs/web/viewer.html?file=..%2F..%2F..%2F..%2Fdata%2Fpreview%2Fpdf.php%3Ffile_url%3D"+file_url+"#page=1"
ed nel file data/preview/pdf.php
vv
$ini_array = parse_ini_file("../config.ini");

$file = $ini_array['path_upload'].$_GET["file_url"];
$filename = 'pdf.pdf';
header('Content-type: application/pdf');
header('Content-Disposition: inline; filename="' . $filename . '"');
header('Content-Transfer-Encoding: binary');
header('Accept-Ranges: bytes');
@readfile($file);
^^

nel mio caso, il php che farà da tramite è data/
*/
?>
