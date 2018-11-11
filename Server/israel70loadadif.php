<?php

include 'adif_parser.php';
include 'db_holylanddb.inc';
include 'error.inc';
ini_set ( 'error_reporting', E_ALL );
set_error_handler ( "handleError" );

function Redirect($msg)
{
    header("Location: http://israel70.iarc.org/#Response/" . $msg);
    exit;
}

function addFileToDB($filename)
{
	$p = new ADIF_Parser;
	$p->load_from_file($filename);
	$p->initialize();

	$callsigns = array('4X70I','4X70S','4X70R','4X70A','4X70E','4X70L','4Z70IARC');

	$skips = 0;
    $rec_counter = 0;

	//$query = "INSERT INTO `iarcorg_holylanddb`.`live_log` (`my_call`, `band`, `call`, `freq`, `mode`, `qso_date`) VALUES ";
	$query = "INSERT INTO `iarcorg_holylanddb`.`log` (`my_call`, `band`, `callsign`, `frequency`, `mode`, `timestamp`, `my_square`, `exchange`) VALUES ";
	while($record = $p->get_record())
	{
		if(count($record) == 0)
		{
			break;
		};
        $rec_counter++;
		if (in_array(strtoupper($record["station_callsign"]), $callsigns))
		{
			$query .= "('".trim(strtoupper($record["station_callsign"]))."','".trim(strtoupper($record["band"]))."','".trim(strtoupper($record["call"])). "','" .$record["freq"]."','".trim(strtoupper($record["mode"]))."','".$record["qso_date"]."','X-XX-XX','000'),";
		}
		else
		{
			$skips++;
		}
	};
	$query = substr($query, 0, -1);
	$query .= " ON DUPLICATE KEY UPDATE `my_call`=my_call";
	$result = mysqli_query ($Link, $query );	
	if ($result)
	{
		//echo json_encode(array('success' => true, 'msg' => 'Thank you for sending the log. 73!', 'skips' => $skips));
        Redirect('?success=true&msg=Thank you for sending the log. 73!&skips='.$skips.'&rec_counter='.$rec_counter);
	}
	else
	{
		//echo json_encode(array('success' => false, 'msg' => 'Error: Failed to add QSOs', 'skips' => $skips));
        Redirect('?success=false&msg=Failed to add QSOs&skips='.$skips.'&rec_counter='.$rec_counter);
	}
}


/***********************************************************************************************************************/
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

// Check if file already exists
if (file_exists($target_file)) {
    //echo json_encode(array('success' => false, 'msg' => 'Error: File already exist Change file name and try again.'));
    Redirect('?success=false&msg=Error: File already exists. Change file name and try again.&skips='.$skips.'&rec_counter='.$rec_counter);
}
// Check file size
//if ($_FILES["fileToUpload"]["size"] > 500000) {
//    //echo json_encode(array('success' => false, 'msg' => 'Error: File is too big, only 500k allowed.'));
//    Redirect('?success=false&msg=Error: File is too big, only 500k allowed.&skips='.$skips.'&rec_counter='.$rec_counter);
//}

if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file))
{
	addFileToDB($target_file);
} 
else 
{
	//echo json_encode(array('success' => false, 'msg' => 'Error: Failed loading the file.'));
    Redirect('?success=false&msg=Error: Failed loading the file.&skips='.$skips.'&rec_counter='.$rec_counter);
}

/************************************************************************************************************************/

?>