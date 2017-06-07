<?php 
require_once('connect.php'); 
$pdo =connect(); 

$tractor = $_POST['Tractor']; 
$trailer = $_POST['Trailer']; 

$stmt1 = $pdo->prepare("SELECT Tractor_model.Mass 
FROM Tractor INNER JOIN Tractor_model 
ON Tractor.ID = Tractor_model.ID_model 
WHERE Tractor.Serial_number_tractor = ?"); 
$stmt2 = $pdo->prepare("SELECT Trailer_model.Mass 
FROM Trailer_model INNER JOIN Trailer 
ON Trailer.ID_model = Trailer_model.ID_model 
WHERE Trailer.Serial_number_trailer = ?"); 

$stmt1->execute(array($tractor)); 
$stmt2->execute(array($trailer)); 

$row1 = $stmt1->fetch(); 
$row2 = $stmt2->fetch(); 

$final = $row1['Mass'] + $row2['Mass']; 
echo $final; 
?>