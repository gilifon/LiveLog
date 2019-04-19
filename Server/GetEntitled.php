<?
include ("db_holylanddb.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');
$result = mysqli_query($Link,"SELECT callsign, cnt FROM ( SELECT k.callsign, COUNT(k.my_call) cnt FROM ( SELECT DISTINCT callsign, my_call FROM `log`) AS k GROUP BY k.callsign) t WHERE t.cnt >= 200 ORDER BY callsign;") or die('Error: ' . mysqli_error());
while($obj = mysqli_fetch_object($result)) {
$res[] = $obj;
}
echo json_encode($res);
?>