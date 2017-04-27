<?php
 require_once('connect.php');
 $dbh = connect();
 $sql = "SELECT c1.Name \"Name1\", c1.Surname \"Sname1\", c1.Patronymic \"Patr1\", c2.Name \"Name2\", c2.Surname \"Sname2\", c2.Patronymic \"Patr2\", Tractor.Serial_number_tractor, Trailer.Serial_number_trailer FROM Crew INNER JOIN Cadre as c1 ON Crew.ID_first_driver = c1.ID_Cadre INNER JOIN Tractor ON Crew.Serial_tractor = Tractor.Serial_number_tractor INNER JOIN Trailer ON Crew.Serial_trailer= Trailer.Serial_number_trailer INNER JOIN Cadre as c2 on Crew.ID_second_driver = c2.ID_Cadre WHERE 1";

$res = mysqli_query($dbh, $sql);

while ($row = mysqli_fetch_array($res)) {
			echo $row['Name1']. " " .$row['Sname1']. " ".$row['Patr1']. " - " .$row['Name2']. " " .$row['Sname2']. " ".$row['Patr2']. " - " .$row['Serial_number_tractor']. " - " .$row['Serial_number_trailer']. "\n";
		}
?>