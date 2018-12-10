<?
include ("db_holylanddb.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');

$result = mysqli_query($Link,"SELECT o.`id`,o.`callsign`,ses.`callsign` AS 'ses_callsign',ses.`qth`,ses.`description` FROM `operators` o,`special_event_station` ses WHERE o.ses_id=ses.id") or die('Error: ' . mysqli_error());
while($obj = mysqli_fetch_object($result)) {
$res[] = $obj;
}
echo json_encode($res);
?>