$(".checkbox").change(function() { //event catcher on change checkboxes for fade/show div's 
	checkbox_handle(this);
});

function checkbox_handle(that){	//event handler for checkboxes for fade/show div's 
	var element_id = "#"+$(that).attr("id")+"_div"; //get that_name of div that depends on checkbox that_name (because i cannot do it better)
	var parent =  $(element_id).parent();
	if(that.checked) { 		
    	$(element_id).fadeIn("fast","swing");	//animations
    	// animation_show($(element_id), 0); //TODO animtions
    }
    else
    {
    	$(element_id).fadeOut("fast", "swing");
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
				$(that_name).append("<div class=\"quantityLoad\" style=\"display: none;\"> Заказ : <select> <option>a12312123</option> <option>b</option> <option>c</option> </select> :: Погрузить : <input type=\"number\" id = \"quantityLoad_"+1+"_"+children+i+"\" that_name=\"quantityLoad\" min=\"1\" max=\"8\"></div>");
			}
			else if (name == "unload_inner"){//that "style=\"display: none;\"" is really important becouse i want smooth animation on parent
			$(that_name).append("<div class=\"quantityLoad\" style=\"display: none;\"> Заказ : <select> <option>a12312123</option> <option>b</option> <option>c</option> </select> :: Разгрузить : <input type=\"number\" id = \"quantityLoad_"+1+"_"+children+i+"\" that_name=\"quantityLoad\" min=\"1\" max=\"8\"></div>");
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

$("#select_city").ready(function(){
	$.ajax({
		url: 'php/Select_city.php',
		type: 'get',
		dataType: 'html',/*default: Intelligent Guess (Other values: xml, json, script, or html)*/
		success: function(data){
			var $response = $(data);
			$("#select_city").append($(data));
		}
	}).done(function(){
		$("#select_city").trigger("change");
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
		success: function(resp) //TODO: get rid of freakin empty string at the end of items (look 4 split problems)
		{

			$("#select_order_1_1 option").each(function() {
				$(this).remove();
			});

				//alert(resp + "0");
				var items = resp.split("\n");
				// $.each(items, function (i, item) { //too hungryto get this work right now
		  //   		$('#city').append($('<option>', { 
		  //       		text: item,
		  //   		}));
				// });

				for (var i = items.length - 2; i >= 0; i--) {	//temporary solution
					$('#select_order_1_1').append($('<option>', { 
						text: items[i],
					}));
				};
			}
		});

	$.ajax({
		url: '/php/order_counter.php',
		type: 'POST',
		dataType: 'text',
		data: {gorod: $('#select_city option:selected').text()},

		success: function(resp){
			$input = $("#load_inner");
			$input.attr('max', resp);
		}
	});

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