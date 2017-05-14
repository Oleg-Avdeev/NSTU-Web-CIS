<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Корпоративная Информационная Система - Генерация Маршрута</title>
	<script src="js/jquery-3.2.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.ajax-cross-origin.min.js"></script>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
	<!-- Latest compiled and minified JavaScript -->
	<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> -->

	<link rel="stylesheet" type="text/css" href="css/path_builder.css">

</head>

<body>
	 <h1> <img src="jpg/team.png"> КИС - Транспортная компания. <small>Отдел Эксплуатации - построение маршрута &#9925;</small></h1>

	<div class="panel_point"> 

	<div class="block">
	<p> 
		<h2>Пункт - <small>Выбор пункта:
		<select id="select_city" name = "city">	</select>
		</small>
		</h2>

		<h3>
		<input type="checkbox" id = "load" 	 class="checkbox" name="load"/>   <small>Погрузка</small> ::
		<input type="checkbox" id = "unload" class="checkbox" name="unload"/> <small>Разгрузка</small>
		</h3>
	</p>
	</div>
	
	<div id="load_div" class="block" style ="display: none">
	<h3> Погрузка - <small> Количество: <input type="number" class="quantity" id = "load_inner" size="2" maxlength="2" max="15" min = "1" value="1"></small></h3>
		</p>
		<div id="load_inner_1">
			<div class="quantityLoad"> Заказ : <select id="select_order_1_1"> <option>a12312123</option> <option>b</option> <option>c</option> </select>
			:: Погрузить : <input type="number" id = "quantityLoad_1_1" name="quantityLoad" min="1" max="8"></div>
		</div>

	</div>

	<div id="unload_div" class="block"  style ="display: none">
		<p>
			<h3> Разгрузка - <small> Количество: <input type="number" class="quantity" id = "unload_inner" size="1" maxlength="2" max="15" min = "1" value="1"></small></h3>
		</p>
		<div id="unload_inner_1">
			<div class="quantityUnload"> Заказ : <select> <option>a12312123</option> <option>b</option> <option>c</option> </select>
			:: Разгрузить : <input type="number" id = "quantityUnload_1_1" name="quantityUnload" min="1" max="8"></div>
		</div>
	</div>

	<a class="boxclose" id="boxclose"></a>

</div>

<div class="panel_path" id="path_1">
	<p><h3>Перегон - <small>Петропавловск Камчатский - Калининград </small></h3></p>
	<p>Дистанция между пунктами: 1230км</p>
	<p>Вес груза: 25т</p>
	<p>Полный вес состава: 100т</p>
	<p>Расход топлива на км : 1,2л</p>
	<p>Полный расход топлива: 1600л</p>
	<p>Перечень груза:</p>
</div>

	<div class="panel_point"> 

	<div class="block">
	<p> 
		<h2>Пункт - <small>Выбор пункта:
		<select>
			<option>a</option>
			<option>b</option>
			<option>c</option>
		</select>
		</small>
		</h2>

		<h3>
		<input type="checkbox" id ="unload" class="checkbox" name="unload"/> <small>Разгрузка</small> ::
		<input type="checkbox" id="load" class="checkbox" name="load"/> <small>Погрузка</small>
		</h3>
	</p>
	</div>

	<div id="unload_div" class="block" style ="display:none">
		<p>
			<h3>Погрузка - <small> Количество: <input type="number" class="quantity" id = "multi" size="1" maxlength="2" max="15" min = "1" value="1"></small></h3>
		</p>
		<div> Заказ : <select> <option>a12312123</option> <option>b</option> <option>c</option> </select>
		:: Погрузить : <input type="number" name="quantityLoad" min="1" max="8"></div>

		<div> Заказ : <select> <option>a12312123</option> <option>b</option> <option>c</option> </select>
		:: Погрузить : <input type="number" name="quantityLoad" min="1" max="8"></div>

		<div> Заказ : <select> <option>a12312123</option> <option>b</option> <option>c</option> </select>
		:: Погрузить : <input type="number" name="quantityLoad" min="1" max="8"></div>
		
		<div> Заказ : <select> <option>a12312123</option> <option>b</option> <option>c</option> </select>
		:: Погрузить : <input type="number" name="quantityLoad" min="1" max="8"></div>
	</div>
	
	<div id="load_div" class="block" style ="display:none">
	<h3>Разгрузка - <small> Количество: <input type="number" class="quantity" id = "multi" size="2" maxlength="2" max="15" min = "1" value="1"></small></h3>
		</p>
	<select>
		<option>a</option>
		<option>b</option>
		<option>c</option>
	</select>
	<input type="number" name="quantityUnload" min="1" max="8">

	</div>

</div>
	<div style="width: 60%; margin-right: 15%; margin-left: 15%; margin-top: 25px; text-align: center;">
		<button type="button" class="btn btn-default" id="add_point" style="width: 40%">Добавить Точку</button>
	</div>

	<script src="js/path_builder_.js"></script>
	<script type="text/javascript" src="js/map_api/GoogleDistanceMatrixAPI.js"></script>
	
</body>
</html>