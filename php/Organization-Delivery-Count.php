<?php
 	require_once('connect.php');
	$dbh =connect();
	
	$city = '1';
	$sql = "SELECT Suborder.Delivery, Suborder.Order_quantity, `Order`.Organization  from Suborder INNER JOIN `Order` ON Suborder.ID_order = `Order`.ID_order INNER JOIN Place ON Suborder.ID_dep = Place.ID_place WHERE 1";
		$res = mysqli_query($dbh,$sql);
		while ($row = mysqli_fetch_array($res)) {
			echo $row['Organization']. " - " .$row['Delivery']. " - " .$row['Order_quantity']. "\n";
		}
?>