<?php
$host='66.198.240.24'; // имя хоста (уточняется у провайдера)
	$database='daysofok_CIS'; // имя базы данных, которую вы должны создать
	$user='daysofok_develop'; // заданное вами имя пользователя, либо определенное провайдером
	$pswd='AVT_412'; 
	$dbh = mysql_connect($host, $user, $pswd) or die("Не могу соединиться с MySQL.");
	mysql_query("SET NAMES utf8");
	mysql_select_db($database) or die("Не могу подключиться к базе.");
	
	$city = '1';
	$sql = "SELECT Suborder.Delivery, Suborder.Order_quantity, `Order`.Organization  from Suborder INNER JOIN `Order` ON Suborder.ID_order = `Order`.ID_order INNER JOIN Place ON Suborder.ID_dep = Place.ID_place WHERE 1";
		$res = mysql_query($sql);
		while ($row = mysql_fetch_array($res)) {
			echo $row['Organization']. " - " .$row['Delivery']. " - " .$row['Order_quantity']. "\n";
		}
?>