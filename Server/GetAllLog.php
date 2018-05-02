<?
include ("db_holylanddb.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');

$result = mysql_query("SELECT DISTINCT `my_call`,`my_square`,`band`,`callsign`,`exchange`,`mode` FROM `log` WHERE `my_call` IN ('4X70I','4X70S','4X70R','4X70A','4X70E','4X70L','4Z70IARC')") or die('Error: ' . mysql_error());
while($obj = mysql_fetch_object($result)) {
$res[] = $obj;
}
echo json_encode($res);
?>