<?php
include ("../db_holylanddb.inc");
include ("../error.inc");
include ("../mpdf/mpdf.php");

ini_set ( 'display_errors', 1 );
error_reporting ( E_ALL );

if (isset ( $_POST ['callsign'] )) {
	$callsign = strtoupper(trim($_POST['callsign']));
} else {
	$callsign = '';
}

if (isset ( $_POST ['cw'] )) {
	$cw = $_POST['cw'] === 'true';
} else {
	$cw = false;
}
if (isset ( $_POST ['ssb'] )) {
	$ssb = $_POST['ssb'] === 'true';
} else {
	$ssb = false;
}
if (isset ( $_POST ['digi'] )) {
	$digi = $_POST['digi'] === 'true';
} else {
	$digi = false;
}
if (isset ( $_POST ['mix'] )) {
	$mix = $_POST['mix'] === 'true';
} else {
	$mix = false;
}
//load style
$stylesheet = file_get_contents ( 'israel70.css' );

//create new mPDF instance -> this object writes html to pdf files
$mpdf = new mPDF ( '', 'A4-L', '16', 'Times', 0, 0, 0, 0, 9, 9 );
$mpdf->SetImportUse ();
$mpdf->AddPage ();
$pagecount = $mpdf->SetSourceFile ( 'israel70.pdf' );
$tplId = $mpdf->ImportPage ( $pagecount );
$mpdf->UseTemplate ( $tplId );

//prepare the html
$html = '<div class="recognition_div"><span class="recognition_style">This is to certify that</span><br/><span class="call">' . $callsign . '</span><br/><span class="recognition_style"> has submitted the proof of completion of QSOs with all required 4X70 stations</span></div><div class="date">'.date("Y/m/d").'</div>';
if ($cw)
	$html .= '<div class="cw"></div>';
if ($ssb)
	$html .= '<div class="ssb"></div>';
if ($digi)
	$html .= '<div class="digi"></div>';
if (!$cw && !$ssb && !$digi && $mix)
	 $html .= '<div class="mix"></div>';

//write it to the template file
$mpdf->WriteHTML ( $stylesheet, 1 );
$mpdf->WriteHTML ( $html, 2 );
$mpdf->Output ( $callsign . ".pdf", "I" );

$query = "INSERT INTO `iarcorg_holylanddb`.`israel70cert` (`call`) VALUES ('".trim(strtoupper($callsign))."') ON DUPLICATE KEY UPDATE `call`=`call`";
$result = mysql_query( $query );

echo "$_POST ['cw']";

?>