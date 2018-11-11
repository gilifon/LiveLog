<?
include ("db_holylanddb.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');

$result = mysqli_query($Link,"select `call`,`datetime` from audit order by `datetime`") or die('Error: ' . mysqli_error());
while($obj = mysqli_fetch_object($result)) {
$res[] = $obj;
}
echo json_encode($res);
?>