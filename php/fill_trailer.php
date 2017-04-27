<?php
require_once('connect.php'); 
$dbh = connect(); 
$query = "SELECT Trailer.Serial_number_trailer, Trailer.Sign FROM Trailer"; 
$res = mysqli_query($dbh,$query); 
while ($row = mysqli_fetch_array($res))
echo $row['Sign']. " " .$row['Serial_number_trailer']. "\n"; 
?>