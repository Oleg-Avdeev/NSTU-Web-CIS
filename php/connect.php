<?php
	function connect(){ 
	$host='66.198.240.24'; // имя хоста (уточняется у провайдера)
	$database='daysofok_CIS'; // имя базы данных, которую вы должны создать
	$user='daysofok_develop'; // заданное вами имя пользователя, либо определенное провайдером
	$pswd='AVT_412'; // заданный вами пароль

	$dbh = mysqli_connect($host, $user, $pswd, $database) or die("Не могу соединиться с MySQL.");
	mysqli_query($dbh, "SET NAMES utf8");
	//mysqli_select_db($database) or die("Не могу подключиться к базе.");
	return $dbh;
}
?>