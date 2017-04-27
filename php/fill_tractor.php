<?php
require_once('connect.php'); 
$dbh = connect(); 
$query = "SELECT Tractor.Serial_number_tractor, Tractor.Sign, Tractor_model.Model FROM Tractor INNER JOIN Tractor_model ON Tractor.ID_model = Tractor_model.ID_model"; 
$res = mysqli_query($dbh,$query); 
while ($row = mysqli_fetch_array($res))
echo $row['Model']. " " .$row['Sign']. " " .$row['Serial_number_tractor']. "\n"; 
?>