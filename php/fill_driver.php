<?php
require_once('connect.php'); 
$pdo = connect(); 
$stmt = $pdo->query("SELECT Cadre.Name, Cadre.Surname, Cadre.Patronymic FROM Cadre WHERE Cadre.ID_Position = 1"); 
while ($row = $stmt->fetch()) 
echo $row['Name']. " " .$row['Surname']. " " .$row['Patronymic']. "\n"; 
?>