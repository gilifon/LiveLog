<?
include ("db_holylanddb.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');

$result = mysqli_query($Link,"SELECT DISTINCT `my_call`,`band`,`callsign`,`mode` FROM `log` WHERE `band` IN ('10M','12M','15M','17M','20M','30M','40M','80M','160M')") or die('Error: ' . mysqli_error());
while($obj = mysqli_fetch_object($result)) {
$res[] = $obj;
}
echo json_encode($res);
?>