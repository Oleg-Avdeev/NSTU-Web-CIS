<?php 
require_once('connect.php'); 
$pdo = connect(); 
$stmt = $pdo->query("SELECT * FROM Place"); 
while ($row = $stmt->fetch()) { 
echo "<option>" .$row['Name']. "</option>"; 
}?>