<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Headers: Content-Type, x-xsrf-token');
header('Access-Control-Allow-Headers: Content-Type, application/x-www-form-urlencoded');
//header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/x-www-form-urlencoded');
include("config.php");
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST"){
	// username and password sent from form 

	$myusername=$_POST['username']; 
	$mypassword=$_POST['password']; 
	$mylatitude=$_POST['latitude'];
	$mylongitude=$_POST['longitude'];


	$sql="SELECT id FROM users WHERE username='$myusername' and password='$mypassword';";
	$result=mysqli_query($db,$sql);
	$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
	//$active=$row['active'];
	$count = mysqli_num_rows($result);

	// If result matched $myusername and $mypassword, table row must be 1 row
	if($count==1) {
		$sql_location="SELECT location FROM users_latest_location WHERE username='$myusername';";
		$result_location=mysqli_query($db,$sql_location);	
		$count_location = mysqli_num_rows($result_location);
		if($count_location == 1){
			$sql_update="UPDATE `users_latest_location` SET `location`=POINT('$mylatitude', '$mylongitude') WHERE username='$myusername';";
			$result_update=mysqli_query($db,$sql_update);
		}else{
			$query_insert="INSERT INTO `users_latest_location` (username, location) VALUES ('$myusername', POINT('$mylatitude', '$mylongitude'));";
			$result_insert = mysqli_query($db, $query_insert);
		}
		$_SESSION['login_user'] = $myusername;
		echo "success";
	}
	else {
		echo "error_wrong";
	}
}
exit;
?>