<?php
 	require_once('connect.php');
	$pdo =connect();
	
	$del = $_POST['delivery'];
	$stmt = $pdo->prepare("SELECT Suborder.Delivery_mass from Suborder WHERE Suborder.Delivery = ?");
		$stmt->execute(array($del));
		while ($row = $stmt->fetch()) {
			echo $row['Delivery_mass'];
		}
?>