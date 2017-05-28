<?php
require_once('connect.php');
$pdo = connect();

header('Content-type: application/json; charset=UTF-8');

$R = array();

// Crews
// fuuu, кто-нибудь, убедитесь, что нет связей м/у таблицами через 'serial_' и подобное дерьмо
// TODO: поменять serial на id
$q = $pdo->query('SELECT 
cr.ID,
cr.ID_first_driver `ID_CADRE1`,
cr.ID_second_driver `ID_CADRE2`,
Tractor.ID `ID_TRACTOR`,
Trailer.ID `ID_TRAILER` 
FROM Crew cr
INNER JOIN Tractor ON (cr.Serial_tractor = Tractor.Serial_number_tractor) 
INNER JOIN Trailer ON (cr.Serial_trailer = Trailer.Serial_number_trailer) 
WHERE 1');
$arr = array();
while($a = $q->fetch(PDO::FETCH_ASSOC)){
	$arr[] = array(
		$a['ID'],
		$a['ID_CADRE1'],
		$a['ID_CADRE2'],
		$a['ID_TRACTOR'],
		$a['ID_TRAILER']
	);
}
$R['crews'] = $arr;

// Drivers
$q = $pdo->query('SELECT 
ID_Cadre,
Name,
Surname,
Patronymic 
FROM Cadre 
WHERE ID_Position = 1');
$arr = array();
while ($a = $q->fetch(PDO::FETCH_ASSOC)){
	$arr[] = array(
		$a['ID_Cadre'],
		$a['Name'].' '.$a['Surname'].' '.$a['Patronymic']
	);
}
$R['drivers'] = $arr;

// Tractors
$q = $pdo->query('SELECT 
t.ID `ID_TRACTOR`,
t.Serial_number_tractor,
t.Sign,
tm.Model 
FROM Tractor t 
INNER JOIN Tractor_model tm ON (t.ID_model = tm.ID_model)');
$arr = array();
while ($a = $q->fetch(PDO::FETCH_ASSOC)){
	$arr[] = array_values($a);
}
$R['tractors'] = $arr;

// Trailers
$q = $pdo->query('SELECT 
ID,
Serial_number_trailer,
Sign 
FROM Trailer');
$arr = array();
while ($a = $q->fetch(PDO::FETCH_ASSOC)){
	$arr[] = array_values($a);
}
$R['trailers'] = $arr;

echo json_encode($R);