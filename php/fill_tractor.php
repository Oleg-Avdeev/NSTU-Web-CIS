<?php
require_once('connect.php'); 
$pdo = connect(); 
$stmt = $pdo->query("SELECT Tractor.Serial_number_tractor, Tractor.Sign, Tractor_model.Model FROM Tractor INNER JOIN Tractor_model ON Tractor.ID_model = Tractor_model.ID_model");  
while ($row = $stmt->fetch())
echo $row['Model']. " " .$row['Sign']. " " .$row['Serial_number_tractor']. "\n"; 
?>