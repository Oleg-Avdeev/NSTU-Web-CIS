<?php
 	require_once('connect.php');
	$pdo =connect();
	
	$tractor = $_POST['Tractor'];
	$stmt = $pdo->prepare("SELECT Tractor_model.Consumption from Tractor_model INNER JOIN Tractor ON Tractor_model.ID_model = Tractor.ID_model WHERE Tractor.Serial_number_tractor = ?");
		$stmt->execute(array($tractor));
		while ($row = $stmt->fetch()) {
			echo $row['Consumption'];
		}
?>