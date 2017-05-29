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
	<script src="js/garage.js"></script>
	<script type="text/javascript" src="js/jquery.ajax-cross-origin.min.js"></script>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="/css/bootstrap.min.css" />
	<!-- Optional theme -->
	<link rel="stylesheet" href="/css/bootstrap-theme.min.css" />
	<!-- Latest compiled and minified JavaScript -->
	<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> -->

	<link rel="stylesheet" type="text/css" href="css/common.css">
	<style>
	#stats th,
	#stats td{text-align: center; min-width: 30px;}
	</style>
</head>
<body>	
<h1>КИС - Транспортная компания.<small>Начальник Гаража - Отдел Аналитики</small></h1>
<div class="container">
	<select id="tractors"></select>
	<div style="overflow-x: scroll; margin: 10px 0 0;">
		<table id="stats" class="table table-striped table-bordered table-condensed"></table>
	</div>
<script>
(function(){
var tractors = <?
// Получение списка грузовиков
$q = $DB->prepare('SELECT
a.ID `ID`,
a.Serial_number_tractor `SERIAL_NUMBER`,
a.Sign `SIGN`,
b.Model `MODEL`
FROM tractor a
INNER JOIN tractor_model b ON (b.ID_model=a.ID_model)');
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
	tractors[i] = {
		id: v[0],
		serial_number: v[1],
		sign: v[2],
		model: v[3]
	}
})
console.log(tractors)
garage.analytics.init({
	el: {
		select: $('#tractors'),
		table: $('#stats')
	},
	tractors: tractors
})
})()
</script>
</div>
</body>
</html>