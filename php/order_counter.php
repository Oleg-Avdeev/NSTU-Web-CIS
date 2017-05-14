<?php 
require_once('connect.php');
	$pdo =connect();
	$city = $_POST['gorod'];
	$stmt = $pdo->prepare("SELECT COUNT(*) from Suborder INNER JOIN `Order` ON Suborder.ID_order = `Order`.ID_order INNER JOIN Place ON Suborder.ID_dep = Place.ID_place WHERE Place.Name = ?");
	$stmt->execute(array($city));
	while ($row = $stmt->fetch()) {
    echo $row['COUNT(*)'];
}
?>