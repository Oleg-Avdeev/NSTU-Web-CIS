<?php
require_once('connect.php');
$d1 = $_POST['Driver_1'];
$d2 = $_POST['Driver_2'];
$trac = $_POST['Tractor'];
$trail = $_POST['Trailer'];

$pdo = connect();

// Нахуя вы тут чёто удаляете и вставляете в crew? дела, конечно, ваши, просто, на первый взгляд ни одному челу на планете не было бы понятно
/*
$stmt = $pdo->prepare('DELETE FROM Crew 
WHERE 
(
Crew.Serial_tractor = ? || 
Crew.Serial_trailer = ? || 
Crew.ID_first_driver = (Select Cadre.ID_Cadre from Cadre Where (Cadre.Surname = ? && Cadre.Name = ? && Cadre.Patronymic = ?)) || 
Crew.ID_second_driver = (Select Cadre.ID_Cadre from Cadre Where (Cadre.Surname = ? && Cadre.Name = ? && Cadre.Patronymic = ?))
)');
$stmt->execute(array(explode(' ', $trac)[2], explode(' ', $trail)[1],explode(' ', $d1)[0],explode(' ', $d1)[1],explode(' ', $d1)[2], explode(' ', $d2)[0], explode(' ', $d2)[1],explode(' ', $d2)[2]));*/

/*$count = $stmt->rowCount();

if($count){
	$stmt = $pdo->prepare('INSERT INTO Crew 
VALUES 
(
?,
?,
(Select Cadre.ID_Cadre from Cadre Where (Cadre.Surname = ? && Cadre.Name = ? && Cadre.Patronymic = ?)),
(Select Cadre.ID_Cadre from Cadre Where (Cadre.Surname = ? && Cadre.Name = ? && Cadre.Patronymic = ?))
)');
	$stmt->execute(array(explode(' ', $trac)[2], explode(' ', $trail)[1],explode(' ', $d1)[0],explode(' ', $d1)[1],explode(' ', $d1)[2], explode(' ', $d2)[0], explode(' ', $d2)[1],explode(' ', $d2)[2]));
}*/

// ATTENTION: поменялись передаваемые пар-ры на id. впринципе, у вас на странице path_builder ещё ничего не сделано, так что оставлю пока так
$arr = array(
	'Driver_1' => $d1,
	'Driver_2' => $d2,
	'Tractor' => $trac,
	'Trailer' => $trail
);
header('Location: /path_builder.html?'.http_build_query($arr));
?>