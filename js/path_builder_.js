function Point($point, ind) //point object (class)
{ 
	//elements
	this.$divPoint = $point; //self link
	$point.slideDown("fast", "swing");//show element
	//search for elements i need
	this.$comboCity = $point.find('#select_city');
	this.$comboLoad = $point.find('.select_order_load');//mb it should be array?
	this.$comboUnload = $point.find('#select_order_unload_1_1');

	this.$inputInnerLoad = $point.find('input#load_inner');
	this.$inputInnerUnload = $point.find('input#unload_inner');

	this.$divQuantityLoad = $point.find('div.quantityLoad');//TODO clean mess = find
	this.$divQuantityUnload = $point.find('div.quantityUnload');


	this.$inputQuantityLoadInner = 		$point.find('div.quantityLoad input.quantity_inner');
	this.$inputQuantityUnloadInner = 	$point.find('div.quantityUnload input.quantity_inner');

	this.$inputQuantityInner = $point.find('input.quantity_inner');

	this.$checkbox = $point.find('.checkbox');

	this.$checkLoad = $point.find('#load.checkbox');
	this.$checkUnload = $point.find('#unload.checkbox');

	this.index = ind;

	//handlers
	$(this.$checkbox).change(function() {//event catcher on change checkboxes for fade/show div's 
		Checkbox_handle(this, $point);
	});

	$(this.$inputQuantityInner).change(function() {
		//change cities and distance in pathways[i]
		Constr_mass(ind);//cannot get this.$index here
	});

	$($point.find('.quantity')).on('change keyup paste mouseup', function() {
		Quantity_prehandler(this, $point);
		//change mass and full mass and other in pathways[i]
		Constr_mass(ind);//TODO move constr_mass in Quantity_prehandler 
	});

	// alert("checkUnload - " + this.checkUnload.attr('id'));

	// $(this.comboCity).ready(function($) {});

	$(this.$comboCity).change(function() { 
		City_handler(this, $point);
		//change cities and distance in pathways[i]
		Constr_distance(ind);//cannot get this.$index here
	}); 

}

function Path($path, ind){ //path point object
	this.$pathPoint = $path;

	this.$cities = $path.find(".city");
	this.$distance = $path.find('#distance');
	this.$mass = $path.find('#mass');
	this.$full_mass = $path.find('#full_mass');	
	this.$consumption = $path.find('#consumption');
	this.$full_consumption = $path.find('#full_consumption');
	
	this.$index = ind;
}

function Constr_distanceHandle(i){//city & distance clear af
		// alert(true);
		if (points[i].$comboCity.val() != points[i+1].$comboCity.val()){
			//distance from google api
			GetDistance(points[i].$comboCity.val(), points[i+1].$comboCity.val(), pathways[i].$distance);
	 	}
	 	else pathways[i].$distance.text("0 м")
	 	//get cities names from points above and below
	 	pathways[i].$cities.each(function(index, el) {
	 		$(el).text(points[i+index].$comboCity.val());
	 	});
	 	// pathways[i].$distance
}

function Constr_distance(i){//i - index of current path in array pathways
	if (i != 0){
		Constr_distanceHandle(i-1);
	}
	//check if there is next point
	if (points.length > i+1){
	 	Constr_distanceHandle(i);
 	}
}

function Constr_mass(i){
	alert("Constr_mass");
	var sum = 0;
	points[i].$inputQuantityInner.each(function(index, el) {
		// alert($(el).val());
		if ($(el).val() != 0) sum += $(el).val();
	});
	var eqMass = 1200;//TODO get mass from db
	var mass = sum * eqMass;
	pathways[i].$mass.text(mass + " кг");
}

$startingPoint ={};
$startingPath = {};
var points = [];
var pathways = [];

$().ready(function() {
	var $point = $('#panel_point');	
	var $path = $('#path');
	$startingPoint = new Point($point, points.length);
	points[0] = $startingPoint; // need to deep clone by hand

	$startingPath = new Path($path, pathways.length);
	pathways[0] = $startingPath;
	// alert('pathways[0] = ' + pathways[0].$pathPoint.attr('id'));
	// pathways.push($startingPath.clone()); dosent work clone idk

	// points[0] = new Point($objec, points.length-1t);
	// var startingPoint = $.extend(true, {}, points[0]);
	// alert('extend gives me this - ' + startingPoint.divPoint);
	
	$(points[0].combo2).change(function(event) { 
		alert("Outer handler on combo 2");
	});
});

function Pathways_handler(){
	$currentPath = $startingPath.$pathPoint.clone();
	$currentPath.hide().appendTo('#panel_wrap');//add new pathPoint to the page

	Constr_distance(pathways[pathways.length-1].$index);

	pathways[pathways.length-1].$pathPoint.slideDown("fast", "swing");//show previous one

	$tryobject = $('#panel_wrap .panel_path:last-child');
	var $currentObject = new Path($tryobject, pathways.length);

	// $currentObject.$distance.text('SMOrc');

	// $newPath = new Path($startingPath);//works this time i guess
	// alert('newpath = ' + $newPath.pathPoint.attr('id'));
	pathways.push($currentObject);//TODO overload clone
	// alert('pathPoint[pathPoint.length-1] = ' + pathways[pathways.length-1].$pathPoint);
	// $newPath.appendTo('#panel_wrap');
}

function Checkbox_handle(that, _point){	//event handler for checkboxes for fade/show div's 
	var element_id = "#"+$(that).attr("id")+"_div"; //get that_name of div that depends on checkbox that_name (because i cannot do it better)
	// STILL DONT KNOW, well i kind know but im afrid that all other stuff will crumble
	var _div = _point.find(element_id);
	
	if(that.checked) { 		
    	$(_div).fadeIn("fast","swing");	//animations
    	// animation_show($(element_id), 0); //TODO animtions
    }
    else
    {
    	$(_div).fadeOut("fast", "swing");
    }
}

//	The better way to implement catching this event
// 	"Don't blame the player, blame the game".
var lastQuatityValue = [1, 1]; //an array because life is hard
function Quantity_prehandler(that, _point){
	var name = $(that).attr('id');

	var QuatityIndex = 0;
	if (name == "unload_inner") QuatityIndex = 1;

	// if ($(that).val() != lastQuatityValue[QuatityIndex]) {;
		lastQuatityValue[QuatityIndex] = $(that).val();
		Quantity_handler(that, _point);
	// }
}

function Quantity_handler(that, _point){	//event handler for checkboxes
	var name = '#'+$(that).attr('id');
	var _div_inner = _point.find('div'+name);//find div in point that contains trigger

	var children = _div_inner.children().length; //number of children (inputs)
	var number = $(that).val();

	if (number <= 0){ //check if number is in our dioposone
		number = 1;
		$(that).val(number);
	}

	if (number >= parseInt(that.max))	//look up
	{
		number = that.max;
		$(that).val(number);
	};

	if (number > children){	
		for (var i = 1; i <= (number-children); i++) { //crete order
			if (name == "#load_inner"){
				//cannot get access to _point.divQuantityLoad for some reason
				_point.find('div.quantityLoad:first').clone().hide().appendTo(_div_inner);
			}
			else if (name == "#unload_inner"){//that "style=\"display: none;\"" is really important becouse i want smooth animation on parent
				_point.find('div.quantityUnload:first').clone().hide().appendTo(_div_inner);
		}

			$(name+" div:last-child").slideDown("fast", "swing");//that is a key to parent smooth animation.
			//I really do fcking need to hide elements first and then show them one by one
		}
	}
	else
	{
		for (var i = number; i < (children); i++) {							// deleting from number to total count	
			_div_inner.children().eq(i).slideUp("fast", "swing", function(){ // animating i-th child
					$(this).remove(); 										// removing animated child
				});
		}
	}
}

$("#select_city").ready(function(){ //creating combobox on ready
	$.ajax({						//working with php script
		url: 'php/Select_city.php',
		type: 'get',
		dataType: 'html',
		success: function(data){
			var $response = $(data);
			$("#select_city").append($(data));
		}
	}).done(function(){
		City_handler(this, points[0].$divPoint);
		//^call City_handler after ajax is done. City_handler is working with small combos in order
		$('.checkbox').fadeIn("fast", "swing");
		//^prevent actions before ajax is done. U cant click if u cant see wht to click :smart:
		$('#add_point').fadeIn("fast", "swing");
	})
});

function Refresh_children(_children, _resp){
	$(_children).each(function(i, el) {
		$(_children[i]).find('option').each(function(index, el) {
			$(this).remove();	// removing i-th options
		});
	});

	var items = _resp.split("\n");

	$.each(items, function (i, item) {
		if(item !=""){
			$(_children).each(function(i, el) {
				$(_children[i]).find('select').append($('<option>', { 
					text: item,
				}))
			});
		}
	});
}

function City_handler(that, _point){
	$_comboCity = _point.find('#select_city');
	$.ajax({
		method: 'POST',
		dataType: 'text',
		url: 'php/Organization-Delivery-Count.php',
		data: {
			gorod : $_comboCity.find(':selected').text()
		},
		success: function(resp)
		{
			var childrenLoad = _point.find('div#load_inner').children();
			var childrenUnload = _point.find('div#unload_inner').children();

			Refresh_children(childrenLoad, resp);
			Refresh_children(childrenUnload, resp);
		}});

	$.ajax({
		url: 'php/order_counter.php',
		type: 'POST',
		dataType: 'text',
		data: {gorod: $('#select_city option:selected').text()},
		success: function(resp){
			$("#load_inner").attr('max', resp);
			$("#unload_inner").attr('max', resp);
		}
	});
}

function Point_clear(_point){

	_point.$checkLoad.prop('checked', false);
	_point.$checkUnload.prop('checked', false);

	Checkbox_handle(_point.$checkLoad, _point.$divPoint);
	Checkbox_handle(_point.$checkUnload, _point.$divPoint);

	_point.$inputInnerLoad.val("1");
	_point.$inputInnerUnload.val("1");

	Quantity_prehandler(_point.$inputInnerLoad, _point.$divPoint);
	Quantity_prehandler(_point.$inputInnerUnload, _point.$divPoint);

	City_handler(_point.$comboCity,_point.$divPoint);

	_point.$inputQuantityInner.val("");
}

function dump(obj) {//developing tool FTW
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    alert(out);
}

$("#add_point").click(function() {//button that is addnig points
	$currentPoint = $startingPoint.$divPoint.clone();

	$currentPoint.hide();
	$currentPoint.appendTo('#panel_wrap');

	$currentObject = new Point($('#panel_wrap .panel_point:last-child'), points.length);//do i relly want to go this way again? Children bit me once
	//^works this time i guess
	points.push($currentObject);
	Pathways_handler();//only there after point pushed
	Point_clear(points[points.length-1]);//reset object to blank (apart from ajax)
	$('#panel_wrap .panel_point:last-child').slideDown("fast", "swing");
});

// function animation_show(that, number){	//TODO one day we will have shiny animtions
	
// 	// alert($(that).attr("id"));

// 	if (!$(that).length){
// 		// alert("we r out");
// 		return;
// 	}

// 	var name = $(that).attr('id');
// 	var that_name ="#" + name + "_inner_1";

// 	var children = $(that).children().length; 									//number of children (inputs)
// 	for (var i = 0; i < (children); i++) {									// showing from number to total count	
// 		// alert("iteration " + i);
// 		$(that).children().eq(i).slideDown("fast", "swing", function(){}); // animating i-th child
// 	}
// 	animation_show(that_name, 0);
// 	$(that).fadeIn("fast","swing");	//animations