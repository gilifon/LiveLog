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
		$result = mysqli_query($Link,"select `my_call`,`callsign`,`band`,`frequency`,`mode`,`timestamp` from `log` order by `timestamp` desc ") or die('Error: ' . mysqli_error());
	}
	else if(substr( $call, 0, 1 ) == "*")
	{
		$call = substr( $call, 1, strlen($call)-1);
		$result = mysqli_query($Link,"SELECT DISTINCT `my_call`,`band`,`callsign`,`mode` FROM `log`` where `callsign` = '$call' order by `timestamp` desc ") or die('Error: ' . mysqli_error());
		$eligability = mysqli_query($Link,"SELECT (SELECT COUNT(DISTINCT `my_call`) >= 3 FROM `log` WHERE `callsign` = '$call' AND (`mode` = 'ssb' OR `mode` = 'usb' OR `mode` = 'lsb' OR `mode` = 'ph' )) AS 'SSB', (SELECT COUNT(DISTINCT `my_call`) >= 3 FROM `log` WHERE `callsign` = '$call' AND `mode` = 'cw') AS 'CW',(SELECT COUNT(DISTINCT `my_call`) >= 3 FROM `log` WHERE `callsign` = '$call' AND (`mode` = 'rtty' OR `mode` = 'psk')) AS 'DIGI',(SELECT COUNT(DISTINCT `my_call`) >= 3 FROM `log` WHERE `callsign` = '$call' AS 'MIX' ") or die('Error: ' . mysqli_error());
	}
	else
	{
		$result = mysqli_query($Link,"SELECT DISTINCT `my_call`,`band`,`callsign`,`mode` FROM `log` where `callsign` = '$call' order by `timestamp` desc ") or die('Error: ' . mysqli_error());
		$eligability = mysqli_query($Link,"SELECT (SELECT COUNT(DISTINCT `my_call`) >= 3 FROM `log` WHERE `callsign` = '$call' AND (`mode` = 'ssb' OR `mode` = 'usb' OR `mode` = 'lsb' OR `mode` = 'ph' )) AS 'SSB', (SELECT COUNT(DISTINCT `my_call`) >= 3 FROM `log` WHERE `callsign` = '$call' AND `mode` = 'cw') AS 'CW',(SELECT COUNT(DISTINCT `my_call`) >= 3 FROM `log` WHERE `callsign` = '$call' AND (`mode` = 'rtty' OR `mode` = 'psk')) AS 'DIGI',(SELECT COUNT(DISTINCT `my_call`) >= 3 FROM `log` WHERE `callsign` = '$call') AS 'MIX' ") or die('Error: ' . mysqli_error());
	}
} 
else 
{
	$result = '';
}
$res["data"][] = "";
while($obj = mysqli_fetch_object($result)) {
$res["data"][] = $obj;
}
while($obj = mysqli_fetch_object($eligability)) {
$res["eligability"] = $obj;
}
echo json_encode($res);
?>

