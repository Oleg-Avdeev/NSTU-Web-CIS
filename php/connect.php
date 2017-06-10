<?php
function connect(){ 
	$db = 'daysofok_CIS'; // имя базы данных, которую вы должны создать
	if (!true){
		$host = '66.198.240.24'; // имя хоста (уточняется у провайдера)
		$user = 'daysofok_develop'; // заданное вами имя пользователя, либо определенное провайдером
		$pass = 'AVT_412'; // заданный вами пароль
	} else{
		// ну не мучаться же мне со скоростью загрузки сервера с бд (кот. выше)
		$host = '127.0.0.1';
		$user = 'root';
		$pass = '';
	}
	$charset = 'utf8';

	$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
	$opt = array(
		PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES   => false,
	);
	$pdo = new PDO($dsn, $user, $pass, $opt);
	return $pdo;
}