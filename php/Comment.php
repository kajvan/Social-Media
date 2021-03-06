<?php

$str = file_get_contents('ConnectionInfo.json');
$json = json_decode($str);

//database info
$servername = $json->Login[1]->servername;
$username = $json->Login[1]->username;
$password = $json->Login[1]->password;
$dbname = $json->Login[1]->dbname;

session_start();

//by user
$Content = $_POST["Content"];
$id = $_SESSION['id'];
$Postid = $_POST["Postid"];

//create Connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check Connection
if($conn->connect_error) {
	die("Connection Failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO comments (Post_id, user_id, Comment) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $Postid, $_SESSION['id'], $Content);
$stmt->execute();
$sql = $conn->query("UPDATE post SET comments = comments + 1 WHERE id = $Id");

$conn->close();

?>