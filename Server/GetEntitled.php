<?
include ("db_holylanddb.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');

$result = mysql_query("SELECT callsign, cnt FROM ( SELECT k.callsign, COUNT(k.my_call) cnt FROM ( SELECT DISTINCT callsign, my_call FROM `log` WHERE `my_call` IN ('4X70I','4X70S','4X70R','4X70A','4X70E','4X70L','4Z70IARC') ) AS k GROUP BY k.callsign) t WHERE t.cnt >= 6 ORDER BY callsign;") or die('Error: ' . mysql_error());
while($obj = mysql_fetch_object($result)) {
$res[] = $obj;
}
echo json_encode($res);
?>