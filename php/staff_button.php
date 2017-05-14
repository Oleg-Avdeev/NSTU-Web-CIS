<?php
require_once('connect.php');
$d1 = $_POST["Driver_1"];
$d2 = $_POST["Driver_2"];
$trac = $_POST["Tractor"];
$trail = $_POST["Trailer"];

$pdo = connect();
$redirect_url = "/path_builder.html";

$stmt = $pdo->prepare("DELETE FROM Crew WHERE Crew.Serial_tractor = ? OR Crew.Serial_trailer = ? OR Crew.ID_first_driver = (Select Cadre.ID_Cadre from Cadre Where Cadre.Surname = ? AND Cadre.Name = ? AND Cadre.Patronymic = ?) OR Crew.ID_second_driver = (Select Cadre.ID_Cadre from Cadre Where Cadre.Surname = ? AND Cadre.Name = ? AND Cadre.Patronymic = ?)");
$stmt->execute(array(explode(" ", $trac)[2], explode(" ", $trail)[1],explode(" ", $d1)[0],explode(" ", $d1)[1],explode(" ", $d1)[2], explode(" ", $d2)[0], explode(" ", $d2)[1],explode(" ", $d2)[2]));

$count = $stmt->rowCount();

if($count)
{
	$stmt = $pdo->prepare("INSERT INTO Crew VALUES (?,?,(Select Cadre.ID_Cadre from Cadre Where Cadre.Surname = ? AND Cadre.Name = ? AND Cadre.Patronymic = ?),(Select Cadre.ID_Cadre from Cadre Where Cadre.Surname = ? AND Cadre.Name = ? AND Cadre.Patronymic = ?))");
	$stmt->execute(array(explode(" ", $trac)[2], explode(" ", $trail)[1],explode(" ", $d1)[0],explode(" ", $d1)[1],explode(" ", $d1)[2], explode(" ", $d2)[0], explode(" ", $d2)[1],explode(" ", $d2)[2]));
}
header('Location: http://'.$_SERVER['HTTP_HOST'].$redirect_url.'?Driver_1='.$d1.'&Driver_2='.$d2.'&Tractor='.explode(" ", $trac)[2].'&Trailer='.explode(" ", $trail)[1]);
?>