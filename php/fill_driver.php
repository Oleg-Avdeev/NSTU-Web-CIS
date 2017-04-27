<?php
require_once('connect.php'); 
$dbh = connect(); 
$query = "SELECT Cadre.Name, Cadre.Surname, Cadre.Patronymic FROM Cadre WHERE Cadre.ID_Position = 1"; 
$res = mysqli_query($dbh,$query); 
while ($row = mysqli_fetch_array($res)) 
echo $row['Name']. " " .$row['Surname']. " " .$row['Patronymic']. "\n"; 
?>