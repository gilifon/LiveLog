<?
include ("db_holylanddb.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');
$result = mysql_query('delete from log where `call` = "4z1kd"') or die('Error: ' . mysql_error());
echo json_encode('Log added!');
?>