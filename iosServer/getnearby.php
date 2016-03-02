<?php
header('Content-Type: application/javascript');
include("config.php");
//session_start();

if($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['callback'])){

	$mylatitude=$_GET['latitude'];
	$mylongitude= $_GET['longitude']; 
	
	if(isset($_GET['token'])){
		$user_check = $_GET['token'];
		$ses_sql=mysqli_query($db,"select username from users where username='$user_check'; ");
		$row=mysqli_fetch_array($ses_sql,MYSQLI_ASSOC);
		$login_session=$row['username'];
		
		$sql_location="SELECT location FROM users_latest_location WHERE username='$login_session';";
		$result_location=mysqli_query($db,$sql_location);	
		$count_location = mysqli_num_rows($result_location);
		if($count_location == 1){
			$sql_update="UPDATE `users_latest_location` SET `location`=POINT('$mylatitude', '$mylongitude') WHERE username='$login_session';";
			$result_update=mysqli_query($db,$sql_update);
		}else{
			$query_insert="INSERT INTO `users_latest_location` (username, location) VALUES ('$login_session', POINT('$mylatitude', '$mylongitude'));";
			$result_insert = mysqli_query($db, $query_insert);
		}
		$sql = "SELECT 
  				users.username, 
  				users.role,
  				users.favorite_music,
   				ROUND(( 3959 * acos( cos( radians('$mylatitude') ) * cos( radians( X(location) ) ) 
   					* cos( radians(Y(location)) - radians('$mylongitude')) + sin(radians('$mylatitude')) 
   					* sin( radians(X(location))))), 2) AS distance 
			FROM users_latest_location 
			INNER JOIN users
			ON users_latest_location.username=users.username
			WHERE users.username <> '$login_session'
			ORDER BY distance ASC;";
	}else{
		$sql = "SELECT 
  				users.username, 
  				users.role,
  				users.favorite_music,
   				ROUND((3959 * acos( cos( radians('$mylatitude') ) * cos( radians( X(location) ) ) 
   					* cos( radians(Y(location)) - radians('$mylongitude')) + sin(radians('$mylatitude')) 
   					* sin( radians(X(location))))), 2) AS distance
			FROM users_latest_location 
			INNER JOIN users
			ON users_latest_location.username=users.username
			ORDER BY distance ASC;";
	}
	
	$result=mysqli_query($db,$sql);
    
    $rows = array();
	while($r =mysqli_fetch_array($result,MYSQLI_ASSOC)) {
		$rows[] = $r;
	}
	//$rows = $mylatitude . $mylongitude;
	echo $_GET['callback']. '(' . json_encode($rows) . ');';
    //echo json_encode($rows);
}

?>