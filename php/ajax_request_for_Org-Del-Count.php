<script>

$(".city_input").click(function(){
	// var gorod = $('select[name=City] option:selected').text();
	//city_handler(this);
$.ajax({
	type: 'POST',
	dataType: 'text',
	url: 'Organization-Delivery-Count.php',
	data: {
		gorod : $('select[name=City] option:selected').text()
	},
	success: function(resp) //TODO: get rid of freakin empty string at the end of items (look 4 split problems)
		{

			$("#city option").each(function() {
    $(this).remove();
});

			//alert(resp + "0");
			var items = resp.split("\n");
			alert(items[2]);
			// $.each(items, function (i, item) { //too hungryto get this work right now
	  //   		$('#city').append($('<option>', { 
	  //       		text: item,
	  //   		}));
			// });

			for (var i = items.length - 2; i >= 0; i--) {	//temporary solution
	    		$('#city').append($('<option>', { 
	        		text: items[i],
	    		}));
	    	};
	}});
});

</script>