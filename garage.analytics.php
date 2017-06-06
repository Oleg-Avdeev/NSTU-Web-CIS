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
var stuff_group = {}
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
	if (!v.id_group){ stuff_group[v.id] = [] }
})
$.each(stuff, function(i, v){
	if (v.id_group){ stuff_group[v.id_group].push(v.id) }
})

var setMaxSelectMultiple = function(select, max){
	var $isDown = false
	var $highlight = false
	select.children().mousedown(function(e){
		$isDown = true
		$highlight = true
		if (e.ctrlKey){
			var val = select.val()
			if ($.inArray(this.value, val) === -1){
				if (max <= select.val().length){
					e.preventDefault()
				}
			} else{
				$highlight = false
			}
		}
	}).mousemove(function(e){
		if ($isDown && $highlight){
			var val = select.val()
			if ($.inArray(this.value, val) === -1){
				if (max <= val.length){
					e.preventDefault()
				}
			}
		}
	})
	$(document.body).mouseup(function(){
		$isDown = false
	})
}
var tab_cont = $('#tabs')
var $curTab = -1
var tabs = [
{
	text: 'Поездки',
	init: function(){
		var $maxTractorsSelected = 8
		var select = $('<select>',{
			multiple: '',
			class: 'form-control'
		}).css({
			height: '140px'
		})
		$.each(tractors, function(i, v){
			select.append($('<option>',{
				value: i,
				text: v._name
			}))
		})
		setMaxSelectMultiple(select, $maxTractorsSelected)
		select.change(function(){
			var ids = {}
			$.each($(this).val(), function(i, v){
				ids[tractors[v].id+''] = tractors[v]
			})
			obj.loadData(ids)
		})
		var cont = $()
		var temp = $(
'<div class="form-group">\
	<h3>Грузовики</h3>\
</div>')
		temp.append(select)
		var year_legend = $('<div class="garage-an-year-legend"></div>')
		var year_table = $('<div id="stats_year" class="cla"></div>')
		cont = cont
		.add(temp)
		.add(year_legend)
		.add(year_table)
		var obj = garage.analytics.trips({
			el: {
				year: year_table,
				year_legend: year_legend
			}
		})
		return cont
	},
	show: function(){
		
	}
},
{
	text: 'Работы/детали',
	init: function(){
		var $maxStuffSelected = 8
		var select = $('<select>',{
			multiple: '',
			class: 'form-control'
		}).css({
			height: '140px'
		})
		$.each(stuff_group, function(id, gr){
			var v = stuff[id]
			select.append($('<option>',{
				value: id,
				text: v._name
			}))
			$.each(gr, function(_, id){
				v = stuff[id]
				select.append($('<option>',{
					value: id,
					text: '---'+v._name
				}))
			})
		})
		setMaxSelectMultiple(select, $maxStuffSelected)
		select.change(function(){
			updateData()
		})
		var updateData = function(){
			var stuffs = {}
			$.each(select.val(), function(i, v){
				stuffs[v+''] = stuff[v]
			})
			obj.loadData({
				stuffs: stuffs,
				group_by: group_by
			})
		}
		var obj
		var cont = $()
		var temp = $(
'<div class="form-group">\
	<h3>Грузовики</h3>\
</div>')
		temp.append(select)
		var year_legend = $('<div class="garage-an-year-legend"></div>')
		var year_table = $('<div class="cla"></div>')
		var group_by_tabs = $('<ul class="nav nav-tabs"></ul>')
		var group_by_conts = $()
		var group_by
		$.each({
			week: 'Неделя',
			month: 'Месяц'
		}, function(i, v){
			group_by_tabs.append($('<li><a href="javascript://">'+v+'</a></li>').click(function(){
				if (group_by === i){ return }
				group_by_tabs.children().removeClass('active')
				group_by_conts.hide()
				$(this).addClass('active')
				group_by_conts.eq(group_by_tabs.children().index(this)).show()
				group_by = i
				updateData()
			}))
			group_by_conts = group_by_conts.add('<div>')
		})
		cont = cont
		.add(temp)
		.add(group_by_tabs)
		.add(group_by_conts)
		group_by_conts.eq(0)
		.append(year_legend)
		.append(year_table)
		var obj = garage.analytics.stuff({
			el: {
				year: year_table,
				year_legend: year_legend,
				month: group_by_conts.eq(1)
			}
		})
		group_by_tabs.children().eq(0).trigger('click')
		return cont
	},
	show: function(){
		
	}
}
]
var tab_list = $()
var tab_conts = $()
$.each(tabs, function(i, v){
	var tab_el = $('<li><a href="javascript://">'+v.text+'</a></li>')
	tab_el.click(function(){
		if ($curTab === i){ return }
		$curTab = i
		tab_list.removeClass('active')
		$(this).addClass('active')
		tab_conts.hide().eq(i).show()
		v.show()
	})
	tab_list = tab_list.add(tab_el)
	tab_conts = tab_conts.add($('<div>').append(v.init()))
})
tab_cont.append(tab_list)
tab_list.eq(0).trigger('click')
$('#conts').append(tab_conts)
})()
</script>
</div>
</body>
</html>