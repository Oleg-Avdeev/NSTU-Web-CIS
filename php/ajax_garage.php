<?
include './connect.php';
$DB = connect();
header('Content-type: application/json; charset=UTF-8');
$R = array();
try{
if (!isset($_POST['TYPE'])){
	throw new Exception('data');
}
if ($_POST['TYPE'] === 'analytics.getData'){
	if (!isset($_POST['TRACTOR_ID']) || filter_var($_POST['TRACTOR_ID'], FILTER_VALIDATE_INT) === false || $_POST['TRACTOR_ID'] < 1){
		throw new Exception('data');
	}
	$tractor_id = (int)$_POST['TRACTOR_ID'];
	for ($i = 0; $i < 12; ++$i){
		$R[$i] = array();
		$a = rand(1,14);
		$b = max($a+1, rand(7,27));
		$R[$i][] = array(
			'start_day' => $a,
			'end_day' => $b,
			'km' => rand(7, 15)/10*($b-$a)*1000
		);
	}
}
echo json_encode($R);
} catch(Exception $e){
	header('HTTP/1.1 400 Bad Request');
	echo json_encode(array(
		'error' => $e->getMessage()
	));
}