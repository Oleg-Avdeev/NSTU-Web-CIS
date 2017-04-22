$(".checkbox").change(function() { //event catcher on change checkboxes 
	checkbox_handle(this);
});

function checkbox_handle(that){	//event handler for checkboxes
	var element_id = "#"+$(that).attr("id")+"_div"; //get name of div that depends on checkbox name (because i cannot do it better)
	if(that.checked) { 
    	$(element_id).fadeIn("fast","swing");	//animations
    }
 	else
 	{
 		$(element_id).fadeOut("slow", "swing");
 	}
}

$(".quantity").change(function(){ //event catcher of changes of inputs (number quantity) 
	quantity_handler(this);
});

function quantity_handler(that){	//event handler for checkboxes
	var children = $( "#unload_inner_1" ).children().length; //number of children (inputs)
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
			$("#unload_inner_1").append("<div class=\"quantityLoad\"> Заказ : <select> <option>a12312123</option> <option>b</option> <option>c</option> </select> :: Погрузить : <input type=\"number\" id = \"quantityLoad_"+1+"_"+children+i+"\" name=\"quantityLoad\" min=\"1\" max=\"8\"></div>");
		}
	}
	else
	{
		for (var i = 0; i < (children-number); i++) {	//delete order
			$(".quantityLoad").last().remove();
		}
	}
}