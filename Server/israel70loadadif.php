<?php

include 'adif_parser.php';
include 'db_holylanddb.inc';
include 'error.inc';
ini_set ( 'error_reporting', E_ALL );
set_error_handler ( "handleError" );

function addFileToDB($filename)
{
	$p = new ADIF_Parser;
	$p->load_from_file($filename);
	$p->initialize();

	$query = "INSERT INTO `iarcorg_holylanddb`.`live_log` (`my_call`, `band`, `call`, `freq`, `mode`, `qso_date`) VALUES ";
	while($record = $p->get_record())
	{
		if(count($record) == 0)
		{
			break;
		};
		$query .= "('".$record["station_callsign"]."','".$record["band"]."','".$record["call"]. "','" .$record["freq"]."','".$record["mode"]."','".$record["qso_date"]."'),";
	};
	$query = substr($query, 0, -1);
	$query .= " ON DUPLICATE KEY UPDATE `my_call`=my_call";
	$result = mysql_query ( $query );	
	if ($result)
	{
		die(json_encode(array('success' => true, 'msg' => 'Thank you for sending the log. 73!')));
	}
	else
	{
		die(json_encode(array('success' => false, 'msg' => 'Error: Failed to add QSOs')));
	}
}


/***********************************************************************************************************************/
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

// Check if file already exists
if (file_exists($target_file)) {
    return array('success' => false, 'msg' => 'Error: File already exist Change file name and try again.');
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    return array('success' => false, 'msg' => 'Error: File is too big, only 500k allowed.');
}

if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file))
{
	addFileToDB($target_file);
} 
else 
{
	return array('success' => false, 'msg' => 'Error: Failed loading the file.');
}

/************************************************************************************************************************/

?>