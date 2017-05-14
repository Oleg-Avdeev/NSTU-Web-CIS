<?php
	function connect(){ 
	$host='66.198.240.24'; // имя хоста (уточняется у провайдера)
	$db='daysofok_CIS'; // имя базы данных, которую вы должны создать
	$user='daysofok_develop'; // заданное вами имя пользователя, либо определенное провайдером
	$pass='AVT_412'; // заданный вами пароль
	$charset = 'utf8';

	$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
	 $opt = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $user, $pass, $opt);
    return $pdo;
}
?>