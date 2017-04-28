<?php
require_once('connect.php'); 
$pdo = connect(); 
$stmt = $pdo->query("SELECT Trailer.Serial_number_trailer, Trailer.Sign FROM Trailer"); 
while ($row = $stmt->fetch())
echo $row['Sign']. " " .$row['Serial_number_trailer']. "\n"; 
?>