<?
include ("db_holylanddb.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');

// get the POST variable
$info = $_POST ["info"];

// extract all the properties of the request
if (isset ( $info ['call'] )) {
	$call = strtoupper($info ['call']);
	if (strtolower($call) == "*all*")
	{
		$result = mysql_query("select `my_call`,`call`,`band`,`freq`,`mode`,`qso_date`,`time_on` from `live_log` order by `qso_date` desc ,`time_on` desc ") or die('Error: ' . mysql_error());
	}
	else if(substr( $call, 0, 1 ) == "*")
	{
		$call = substr( $call, 1, strlen($call)-1);
		$result = mysql_query("select `my_call`,`call`,`band`,`freq`,`mode`,`qso_date`,`time_on` from `live_log` where `call` = '$call' order by `qso_date` desc ,`time_on` desc ") or die('Error: ' . mysql_error());
		$eligability = mysql_query("SELECT (SELECT COUNT(DISTINCT `my_call`) >= 6 FROM `live_log` WHERE `call` = '$call' AND (`mode` = 'ssb' OR `mode` = 'usb' OR `mode` = 'lsb' OR `mode` = 'ph' )) AS 'SSB', (SELECT COUNT(DISTINCT `my_call`) >= 6 FROM `live_log` WHERE `call` = '$call' AND `mode` = 'cw') AS 'CW',(SELECT COUNT(DISTINCT `my_call`) >= 6 FROM `live_log` WHERE `call` = '$call' AND (`mode` = 'rtty' OR `mode` = 'psk')) AS 'DIGI',(SELECT COUNT(DISTINCT `my_call`) >= 6 FROM `live_log` WHERE `call` = '$call') AS 'MIX' ") or die('Error: ' . mysql_error());
	}
	else
	{
		$result = mysql_query("select `my_call`,`call`,`band`,`freq`,`mode`,`qso_date`,`time_on` from `live_log` where `call` = '$call' order by `qso_date` desc ,`time_on` desc ") or die('Error: ' . mysql_error());
		$eligability = mysql_query("SELECT (SELECT COUNT(DISTINCT `my_call`) >= 6 FROM `live_log` WHERE `call` = '$call' AND (`mode` = 'ssb' OR `mode` = 'usb' OR `mode` = 'lsb' OR `mode` = 'ph' )) AS 'SSB', (SELECT COUNT(DISTINCT `my_call`) >= 6 FROM `live_log` WHERE `call` = '$call' AND `mode` = 'cw') AS 'CW',(SELECT COUNT(DISTINCT `my_call`) >= 6 FROM `live_log` WHERE `call` = '$call' AND (`mode` = 'rtty' OR `mode` = 'psk')) AS 'DIGI',(SELECT COUNT(DISTINCT `my_call`) >= 6 FROM `live_log` WHERE `call` = '$call') AS 'MIX' ") or die('Error: ' . mysql_error());
	}
} 
else 
{
	$result = '';
}
$res["data"][] = "";
while($obj = mysql_fetch_object($result)) {
$res["data"][] = $obj;
}
while($obj = mysql_fetch_object($eligability)) {
$res["eligability"] = $obj;
}
echo json_encode($res);
?>

