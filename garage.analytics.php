<?
include './php/connect.php';
$DB = connect();
?>
<!DOCTYPE html>

<html>
<head>
	<meta charset="utf-8">
	<title>Корпоративная Информационная Система - Выбор Состава</title>
	<script src="js/jquery-3.2.0.min.js"></script>
	<script src="js/tabControl.js"></script>
	<script src="js/garage.js"></script>
	<script type="text/javascript" src="js/jquery.ajax-cross-origin.min.js"></script>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="/css/bootstrap.min.css" />
	<!-- Optional theme -->
	<link rel="stylesheet" href="/css/bootstrap-theme.min.css" />
	<!-- Latest compiled and minified JavaScript -->
	<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> -->

	<link rel="stylesheet" type="text/css" href="css/common.css">
	<link rel="stylesheet" type="text/css" href="css/garage.analytics.css">

</head>
<body>
<h1>КИС - Транспортная компания.<small>Начальник Гаража - Отдел Аналитики</small></h1>
<div class="container" style="width:952px;">
<ul id="tabs" class="nav nav-tabs"></ul>
<div id="conts"></div>
<script>
(function(){
var tractors = <?
// Получение списка грузовиков
$q = $DB->prepare('SELECT
a.ID `ID`,
a.Serial_number_tractor `SERIAL_NUMBER`,
a.Sign `SIGN`,
b.Model `MODEL`
FROM Tractor a
INNER JOIN Tractor_model b ON (b.ID_model=a.ID_model)');
$q->execute();
$arr = array();
while ($a = $q->fetch(PDO::FETCH_ASSOC)){
	$arr[] = array(
		$a['ID'],
		$a['SERIAL_NUMBER'],
		$a['SIGN'],
		$a['MODEL']
	);
}
echo json_encode($arr);
?>;
$.each(tractors, function(i, v){
	v = {
		id: v[0],
		serial_number: v[1],
		sign: v[2],
		model: v[3]
	}
	v._name = [v.sign, v.model, v.serial_number].join(' ')
	tractors[i] = v
})
var stuff = <?
$q = $DB->prepare('SELECT
id,
name,
id_group,
measure,
price,
type
FROM garage_Stuff');
$q->execute();
$arr = array();
$group = array();
while ($a = $q->fetch(PDO::FETCH_ASSOC)){
	$a['id'] = (int)$a['id'];
	$a['type'] = (int)$a['type'];
	if ($a['id_group']){
		$a['id_group'] = (int)$a['id_group'];
	} else{
		$group[$a['id']] = array_replace($a, array('items' => array()));
	}
	$arr[$a['id']] = array(
		$a['id'],
		$a['name'],
		$a['id_group'],
		$a['measure'],
		$a['price'],
		$a['type']
	);
}
foreach($arr as $a){
	if (!$a['id_group']){ continue; }
	$group[$a['id_group']]['items'][$a['id']] = $a;
}
echo json_encode($arr);
?>;
$.each(stuff, function(i, v){
	v = {
		id: v[0],
		name: v[1],
		id_group: v[2],
		measure: v[3],
		price: v[4],
		type: v[5]
	}
	v._name = v.name
	stuff[i] = v
})

garage.analytics({
	tractors: tractors,
	stuff: stuff
})

})()
</script>
</div>
</body>
</html>