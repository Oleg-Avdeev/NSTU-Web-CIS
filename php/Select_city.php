<?php 
require_once('connect.php'); 
$dbh = connect(); 
$query = "SELECT * FROM Place"; 
$res = mysqli_query($dbh,$query); 

while ($row = mysqli_fetch_array($res)) { 
echo "<option>" .$row['Name']. "</option>"; 
}?>