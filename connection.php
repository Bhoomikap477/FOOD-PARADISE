<?php
$server = "localhost";
$username = "root";
$password = "";
$dbname = "OnlineDB";

$conn = new mysqli($server, $username, $password, $dbname);

if (!$conn) {
  die("Connection Failed!..");
} else {
  echo "<script>alert('Connection established Successfully!..');</script>";
}
?>
