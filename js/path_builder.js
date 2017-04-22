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
	alert($(that).parents('.child_set').length + 1);
}