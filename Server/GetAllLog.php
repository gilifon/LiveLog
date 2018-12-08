<?
include ("db_holylanddb.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');

$result = mysqli_query($Link,"SELECT DISTINCT l.my_call,l.band, l.callsign,l.mode, o.station FROM `log` l, `operators` o WHERE l.my_call = o.operator AND `band` IN ('10M','12M','15M','17M','20M','30M','40M','80M','160M')") or die('Error: ' . mysqli_error());
while($obj = mysqli_fetch_object($result)) {
$res[] = $obj;
}
echo json_encode($res);
?>