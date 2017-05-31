function Point($point) //point object (class)
{ 
	//elements
	this.$divPoint = $point; //self link
	$point.slideDown("fast", "swing");//show element
	//search for elements i need
	this.comboCity = $point.find('#select_city');
	this.comboLoad = $point.find('.select_order_load');//mb it should be array?
	this.comboUnload = $point.find('#select_order_unload_1_1');

	this.comboInnerLoad = $point.find('div#load_inner');
	this.comboInnerUnload = $point.find('div#unload_inner');

	this.divQuantityLoad = $point.find('div.quantityLoad');
	this.divQuantityUnload = $point.find('div.quantityUnload');
	// this.checkbox = $point.find('.checkbox'); idk
	this.checkLoad = $point.find('#load.checkbox');
	this.checkUnload = $point.find('#unload.checkbox');

	//handlers
	$($point.find('.checkbox')).change(function() {//event catcher on change checkboxes for fade/show div's 
		Checkbox_handle(this, $point);
	});

	$($point.find('.quantity')).on('change keyup paste mouseup', function() {
		Quantity_prehandler(this, $point);
	});

	// alert("checkUnload - " + this.checkUnload.attr('id'));

	// $(this.comboCity).ready(function($) {});

	$(this.comboCity).change(function(event) { 
		City_handler(this, $point);
	}); 

}

function Path($path){ //path point object
	this.$pathPoint = $path;
	// $path.slideDown("fast", "swing");//show element
}

$startingPoint ={};
$startingPath = {};
var points = [];
var pathways = [];

$().ready(function() {
	var $point = $('#panel_point');	
	var $path = $('#path');
	$startingPoint = new Point($point);
	points[0] = $startingPoint; // need to deep clone by hand

	$startingPath = new Path($path);
	pathways[0] = $startingPath;
	// alert('pathways[0] = ' + pathways[0].$pathPoint.attr('id'));
	// pathways.push($startingPath.clone()); dosent work clone idk

	// points[0] = new Point($object);
	// var startingPoint = $.extend(true, {}, points[0]);
	// alert('extend gives me this - ' + startingPoint.divPoint);
	
	$(points[0].combo2).change(function(event) { 
		alert("Outer handler on combo 2");
	});
});

function Pathways_handler(){
	$currentPath = $startingPath.$pathPoint.clone();
	$currentPath.hide();
	$currentPath.appendTo('#panel_wrap');//add new pathPoint to the page
	
	pathways[pathways.length-1].$pathPoint.slideDown("fast", "swing");//show previous one

	// $currentObject = new Point(pathways[pathways.length-1].$pathPoint);
	$tryobject = $('#panel_wrap .panel_path:last-child');
	$currentObject = new Path($tryobject);

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
	if (name == "unload_div") QuatityIndex = 1;

	if ($(that).val() != lastQuatityValue[QuatityIndex]) {
		lastQuatityValue[QuatityIndex] = $(that).val();
		Quantity_handler(that, _point);
	}
}

function Quantity_handler(that, _point){	//event handler for checkboxes
	var name = '#'+$(that).attr('id');
	// var that_name ="#" + name + "_1";

	var _div_inner = _point.find('div'+name);//find div in point that contains trigger
	// alert ('_div_inner id = ' + _div_inner.attr('id'));

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
		// City_handler()
		// $("#select_city").trigger("change"); //call change after ajax is done. Change is working with small combos in order
		City_handler(this, points[0].$divPoint);
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
			$input = $("#load_inner");
			$input.attr('max', resp);
		}
	});
}

$("#add_point").click(function() {//button that is addnig points
	$currentPoint = $startingPoint.$divPoint.clone();

	$currentPoint.hide();
	$currentPoint.appendTo('#panel_wrap');
	$currentObject = new Point($('#panel_wrap .panel_point:last-child'));//do i relly want to go this way again? Children bit me once
	//^works this time i guess
	points.push($currentObject);
	Pathways_handler();//only there after point pushed
	$('#panel_wrap .panel_point:last-child').slideDown("fast", "swing");

	// alert(points.length-1);
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