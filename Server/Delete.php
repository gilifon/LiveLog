<?
include ("db_holylanddb.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');
$result = mysqli_query($Link,'delete from log where `call` = "4z1kd"') or die('Error: ' . mysqli_error());
echo json_encode('Log added!');
?>