// $("#unload").change(function() {
//     if(this.checked) {
//     	alert("throw up");
//     	$("#unload_div").show("slow");
//         //Do stuff
//     }
//  	else
//  	{
//  		alert("throw up");
//  		$("#unload_div").hide("slow");
//  	}
// });

$(".checkbox").change(function() {
	checkbox_handle(this);
});

function checkbox_handle(that){
	var element_id = "#"+$(that).attr("id")+"_div";
	if(that.checked) {
    	$(element_id).show("slow");
    }
 	else
 	{
 		$(element_id).hide("slow");
 	}
}

$(".quantity").change(function(){
	quantity_handler(this);
});

function quantity_handler(that){
	var children = $( "#unload_inner" ).children().length;
	var number = $(that).val();
	if (number > children){
		for (var i = 0; i < (number-children); i++) {
			$("#unload_inner").append("<div> Заказ : <select> <option>a12312123</option> <option>b</option> <option>c</option> </select> :: Погрузить : <input type=\"number\" name=\"quantityLoad\" min=\"1\" max=\"8\"></div>");
		}
	}
	else
	{
		alert("throw down");
	}
}