	$(document).ready(function() {
	$.ajax({
		url: 'php/fill_crew.php',
				success: function(resp) //TODO: get rid of freakin empty string at the end of items (look 4 split problems)
		{
			$("#crew option").each(function() {
				$(this).remove();
			});
				var items = resp.split("\n");
				for (var i = items.length - 2; i >= 0; i--) {	//temporary solution
					$('#crew').append($('<option>', { 
						text: items[i],
					}));
				};
			}
		})
	.done(function(){
		$("#crew").trigger("change");
	})
});

$(document).ready(function(){
	$.ajax({
		url: 'php/fill_driver.php',/*default: Intelligent Guess (Other values: xml, json, script, or html)*/
		success: function(resp){
			var items = resp.split("\n");
			for (var i = items.length - 2; i >= 0; i--) {	//temporary solution
					$('#Driver_1').append($('<option>', { 
						text: items[i],
					}));
					$('#Driver_2').append($('<option>', { 
						text: items[i],
					}));
				};
		}
		});
})

$(document).ready(function(){
	$.ajax({
		url: 'php/fill_tractor.php',/*default: Intelligent Guess (Other values: xml, json, script, or html)*/
		success: function(resp){
			var items = resp.split("\n");
			for (var i = items.length - 2; i >= 0; i--) {	//temporary solution
					$('#Tractor').append($('<option>', { 
						text: items[i],
					}));
				};
		}
		});
})

$(document).ready(function(){
	$.ajax({
		url: 'php/fill_trailer.php',/*default: Intelligent Guess (Other values: xml, json, script, or html)*/
		success: function(resp){	
			var items = resp.split("\n");
			for (var i = items.length - 2; i >= 0; i--) {	//temporary solution
					$('#Trailer').append($('<option>', { 
						text: items[i],
					}));
				};
		}
		});
})

$(document).ready(function(){$("#crew").trigger("change");})

//$("#my_select :contains('two')").attr("selected", "selected"); VAJNO

$('#crew').change(function(){
		var str = $('#crew option:selected').text().split('-');
		$('#Driver_1').val(str[0].trim());
		$('#Driver_2').val(str[1].trim());
		$('#Tractor').val(str[2].trim());
		$('#Trailer').val(str[3].trim());
	});