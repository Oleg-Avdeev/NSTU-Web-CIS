$(function(){
	var drivers = {}
	var tractors = {}
	var trailers = {}
	var crews = {}
	$.ajax({
		url: '/php/ajax_staff_selection.php',
		dataType: 'json',
		success: function(r){
			var el = $('#Driver_1, #Driver_2')
			drivers = []
			$.each(r.drivers, function(i, v){
				v = {
					id: v[0],
					name: v[1]
				}
				v._name = v.name
				drivers[v.id] = v
				el.eq(0).append($('<option>', {
					value: v.id,
					text: v.name
				}))
				el.eq(1).append($('<option>', {
					value: v.id,
					text: v.name
				}))
			})
			el = $('#Tractor')
			tractors = {}
			$.each(r.tractors, function(i, v){
				v = {
					id: v[0],
					serial_number: v[1],
					sign: v[2],
					model: v[3]
				}
				v._name = [v.model, v.sign, v.serial_number].join(' ')
				tractors[v.id] = v
				el.append($('<option>', {
					value: v.id,
					text: v._name
				}))
			})
			el = $('#Trailer')
			trailers = {}
			$.each(r.trailers, function(i, v){
				v = {
					id: v[0],
					serial_number: v[1],
					sign: v[2]
				}
				v._name = [v.sign, v.serial_number].join(' ')
				trailers[v.id] = v
				el.append($('<option>', {
					value: v.id,
					text: v._name
				}))
			})
			el = $('#crew')
			crews = []
			$.each(r.crews, function(i, v){
				v = {
					id: v[0],
					driver1: v[1],
					driver2: v[2],
					tractor: v[3],
					trailer: v[4]
				}
				crews[v.id] = v
				el.append($('<option>', {
					value: v.id,
					text: [
					drivers[v.driver1]._name,
					drivers[v.driver2]._name,
					tractors[v.tractor]._name,
					trailers[v.trailer]._name
					].join(' - ')
				}))
			})
			bind()
			$('#crew').val(Object.keys(crews)[0]).trigger('change')
		}
	})
	var bind = function(){
		$('#crew').change(function(){
			console.log(this.value)
			var v = crews[this.value]
			$('#Driver_1').val(v.driver1)
			$('#Driver_2').val(v.driver2)
			$('#Tractor').val(v.tractor)
			$('#Trailer').val(v.trailer)
		})
	}
	
	/*$('#x_form').submit(function(event){
		$.ajax({
			url: 'php/staff_button',
			type: 'POST',
			data: $('#x_form').serialize(),
			success: function(){
				alert("tut");
			}
		})
	})*/
	
	/*$.ajax({
		url: 'php/fill_driver.php',
		success: function(resp){
			var items = resp.split("\n")
			for (var i = items.length - 2; i >= 0; i--){	//temporary solution wich was mindlessly copypastedim so sad now D:
				$('#Driver_1').append($('<option>', {
					text: items[i]
				}))
				$('#Driver_2').append($('<option>', {
					text: items[i]
				}))
			}
		}
	})

	$.ajax({
		url: 'php/fill_tractor.php',
		success: function(resp){
			var items = resp.split("\n")
			for (var i = items.length - 2; i >= 0; i--){	//temporary solution
				$('#Tractor').append($('<option>', {
					text: items[i]
				}))
			}
		}
	})

	$.ajax({
		url: 'php/fill_trailer.php',
		success: function(resp){	
			var items = resp.split("\n")
			for (var i = items.length - 2; i >= 0; i--){	//temporary solution = array is the best
				$('#Trailer').append($('<option>', { 
					text: items[i],
				}))
			}
		}
	})
	
	$.ajax({
		url: 'php/fill_crew.php',
		success: function(resp){ //TODO: get rid of freakin empty string at the end of items (look 4 split problems)
		//$("#crew option").each(function() {$(this).remove();});
			var items = resp.split("\n")
			for (var i = items.length - 2; i >= 0; i--){	//temporary solution
				$('#crew').append($('<option>', { 
					text: items[i],
				}))
			}
		},
		complete: function(){
			$("#crew").trigger("change")
		}
	})*/
})

