<?php

$str = file_get_contents('ConnectionInfo.json');
$json = json_decode($str);

$servername = $json->Login[2]->servername;
$username = $json->Login[2]->username;
$password = $json->Login[2]->password;
$dbname = $json->Login[2]->dbname;

$Id = $_POST["Id"];
$User = $_POST["User"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql2 = "SELECT id FROM likes WHERE Post_id = $Id AND user_id = $User";
$statement2 = $conn->prepare($sql2);
$statement2->execute();
$result2 = $statement2->get_result(); 


if($result2->num_rows > 0){
	$sql5 = $conn->query("DELETE FROM likes WHERE Post_id = $Id AND user_id = $User");
	$sql6 = $conn->query("UPDATE post SET likes = likes - 1 WHERE id = $Id");
	echo "deleted";
}

else {
	$sql4 = "SELECT id FROM dislikes WHERE Post_id = $Id AND user_id = $User";
	$statement = $conn->prepare($sql4);
	$statement->execute();
	$result = $statement->get_result(); 

	if($result->num_rows > 0){
		$sql5 = $conn->query("DELETE FROM dislikes WHERE Post_id = $Id AND user_id = $User");
		$sql6 = $conn->query("UPDATE post SET dislikes = dislikes - 1 WHERE id = $Id");
		echo "Changed";
	}

	$sql = $conn->query("UPDATE post SET likes = likes + 1 WHERE id = $Id");
	$sql3 = $conn->query("INSERT INTO likes (user_id, Post_id) VALUES ($User, $Id)");

	echo "liked";
}

$conn->close();
?>
