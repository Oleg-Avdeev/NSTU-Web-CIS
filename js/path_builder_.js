function Point($point) //MEGA OBJECT SYSTEM
{ 
	this.$divPoint = $point; //self link
	// alert($point);
	$point.slideDown("fast", "swing");//show element
	//search for elements i need
	this.comboCity = $point.find('#select_city');
	this.comboLoad = $point.find('.select_order_load');//mb it should be array?
	this.comboUnload = $point.find('#select_order_unload_1_1');
	// this.checkbox = $point.find('.checkbox'); idk
	this.checkLoad = $point.find('#load.checkbox');
	this.checkUnload = $point.find('#unload.checkbox');

	$($point.find('.checkbox')).change(function() {//event catcher on change checkboxes for fade/show div's 
		checkbox_handle(this, $point);
	});

	// alert("checkUnload - " + this.checkUnload.attr('id'));
	$(this.comboCity).change(function(event) { 
		// alert("Inner handler on combo 1"); 
	}); 
}

$startingPoint ={};
var points = [];

$().ready(function() {
	var $object = $('#panel_point');	
	$startingPoint = new Point($object);
	points[0] = $startingPoint; // need to clone? My copy of the first element, which im adding
	// points[0] = new Point($object);
	// var startingPoint = $.extend(true, {}, points[0]);
	// alert('extend gives me this - ' + startingPoint.divPoint);
	
	$(points[0].combo2).change(function(event) { 
	alert("Outer handler on combo 2");
	});
});

// $(".checkbox").change(function() { //event catcher on change checkboxes for fade/show div's 
// 	checkbox_handle(this);
// });

function checkbox_handle(that, _point){	//event handler for checkboxes for fade/show div's 
	var element_id = "#"+$(that).attr("id")+"_div"; //get that_name of div that depends on checkbox that_name (because i cannot do it better)
	// STILL DONT KNOW, well i kind know but im afrid that all other stuff will crumble
	var _div = _point.find(element_id);
	// alert("what i found " + _div.attr('id'));
	
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
$(".quantity").on('change keyup paste mouseup', function() {
	var name = $(this).attr('id');
	var QuatityIndex = 0;
	if (name == "unload_div") QuatityIndex = 1;

	if ($(this).val() != lastQuatityValue[QuatityIndex]) {
		lastQuatityValue[QuatityIndex] = $(this).val();
		quantity_handler(this);
	}
});

function quantity_handler(that){	//event handler for checkboxes
	var name = $(that).attr('id');
	var that_name ="#" + name + "_1";
	// alert("that_name " + that_name);
	var children = $(that_name).children().length; //number of children (inputs)
	var number = $(that).val();	

	if (number <= 0){ //check if number is in our diprosone
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
			if (name == "load_inner"){
				$(that_name).append("<div class=\"quantityLoad\" style=\"display: none;\"> Заказ : <select id =select_order_"+1+"_"+parseInt(children+i)+"> <option>a12312123</option> <option>b</option> <option>c</option> </select> :: Погрузить : <input type=\"number\" id = \"quantityLoad_"+1+"_"+children+i+"\" that_name=\"quantityLoad\" min=\"1\" max=\"8\"></div>");
			}
			else if (name == "unload_inner"){//that "style=\"display: none;\"" is really important becouse i want smooth animation on parent
			$(that_name).append("<div class=\"quantityLoad\" style=\"display: none;\"> Заказ : <select id =select_order_"+1+"_"+parseInt(children+i)+"> <option>a12312123</option> <option>b</option> <option>c</option> </select> :: Разгрузить : <input type=\"number\" id = \"quantityLoad_"+1+"_"+children+i+"\" that_name=\"quantityLoad\" min=\"1\" max=\"8\"></div>");
		}

			$(that_name+" div:last-child").slideDown("fast", "swing");//that is a key to parent smooth animation.
			//I really do fcking need to hide elements first and then show them one by one
		}
	}
	else
	{
		for (var i = number; i < (children); i++) {							// deleting from number to total count	
			$(that_name).children().eq(i).slideUp("fast", "swing", function(){ // animating i-th child
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
		$("#select_city").trigger("change"); //call change after ajax is done. Change is working with small combos in order
	})
});

$("#select_city").change(function() {
	$.ajax({
		method: 'POST',
		dataType: 'text',
		url: 'php/Organization-Delivery-Count.php',
		data: {
			gorod : $('#select_city option:selected').text()
		},
		success: function(resp)
		{
		//TODO: upload data to ALL load/unload combos, get custom creations for ALL load/unload combos (put options from db)
		var children = $("#load_inner_1").children().length; 		//number of children (inputs)
			for (var i = 1; i <= (children); i++) {					// showing from number to total count	
				$("#select_order_1_" + i +" option").each(function() {
				$(this).remove();	// removing i-th options
			});		
			}
			var items = resp.split("\n");
				$.each(items, function (i, item) { //Working! Which one is better?
					if(item !=""){
						// alert("0" + item + "0");
						$('#select_order_1_1').append($('<option>', { 
							text: item,
						}));
					}
				});
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
});

$("#add_point").click(function() {//button that is addnig points
	$currentPoint = $startingPoint.$divPoint.clone();

	$currentPoint.hide();
	$currentPoint.appendTo('#panel_wrap');
	$currentObject = new Point($('#panel_wrap .panel_point:last-child'));//do i relly want to go this way again? Children bit me once
	//works this time me i guess
	points.push($currentObject);
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