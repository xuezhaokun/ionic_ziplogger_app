<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Headers: Content-Type, x-xsrf-token');
header('Access-Control-Allow-Headers: Content-Type, application/x-www-form-urlencoded');
//header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/x-www-form-urlencoded');
include("config.php");

if($_SERVER["REQUEST_METHOD"] == "POST"){
// username and password sent from form 

	$myusername=$_POST['username'];
	$mypassword=$_POST['password']; 
	$myfullname=$_POST['fullname']; 
	$myemail=$_POST['email'];
	$myidentity=$_POST['identity'];
	$mymusic=$_POST['music'];
	$mygender=$_POST['gender'];
	$myzipcode=$_POST['zipcode'];
	$mylatitude=$_POST['latitude'];
	$mylongitude=$_POST['longitude'];

	if(isset($myusername) && isset($mypassword)){
		$sql="SELECT id FROM users WHERE username='$myusername'";
		$result=mysqli_query($db,$sql);
		$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
		$active=$row['active'];e
		$count = mysqli_num_rows($result);
		if($count==1) {
			echo "registered";
		}else {
			$query = "INSERT INTO `users` (username, password, fullname, email, role, favorite_music, gender, zipcode) VALUES ('$myusername', '$mypassword', '$myfullname','$myemail', '$myidentity', '$mymusic', '$mygender', '$myzipcode')";
			//echo $query;
			$result = mysqli_query($db, $query);
			$query2="INSERT INTO `users_latest_location` (username, location) VALUES ('$myusername', POINT('$mylatitude', '$mylongitude'));";
			$result2 = mysqli_query($db, $query2);
			echo "success";
		}

	}else{
		echo "invalid";
	}
}
exit;
?>