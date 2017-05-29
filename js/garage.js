(function(){
var $months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
garage = function(){
	
}
/*

*/
garage.analytics = function(e){
	
}
/*
{
	el: {
		select
		table
	}
	tractors: [
	{
		id
		serial_number
		sign
		model
	}
	...
	]
}
*/
garage.analytics.init = function(e){
	$.each(e.tractors, function(i, v){
		var el = $('<option>',{
			value: v.id,
			text: [v.sign, v.model, v.serial_number].join(' ')
		})
		e.el.select.append(el)
	})
	var aj = null
	e.el.select.change(function(){
		if (aj){ aj.abort() }
		aj = $.ajax({
			url: '/php/ajax_garage.php',
			type: 'POST',
			data: {
				TYPE: 'analytics.getData',
				TRACTOR_ID: this.value
			},
			dataType: 'json',
			success: function(q){
				var date = new Date()
				var year = date.getFullYear()
				//var day = (new Date(year, 0, 1).getDay() + 6) % 7
				var r = ''
				for (var i = 1; i <= 31; ++i){
					r += '<th>'+i+'</th>'
				}
				e.el.table.append(
'<thead>\
	<tr>\
		<th>Месяц\\День</th>'+r+'\
	</tr>\
</thead>')
				var tbody = $('<tbody>').appendTo(e.el.table)
				for (var imonth = 0; imonth < 12; ++imonth){
					var days = new Date(year, imonth+1, 0).getDate()
					r = ''
					for (var iday = 1; iday <= days; ++iday){
						r += '<td></td>'
					}
					var el = $(
'<tr>\
	<td>'+$months[imonth]+'</td>'+r+'\
</td>')
					var data = q[imonth]
					$.each(data, function(i, v){
						var dkm =(v.km/(v.end_day - v.start_day + 1)).toFixed(0)
						for (var j = v.start_day; j <= v.end_day; ++j){
							el.children().eq(j).html(dkm)
						}
					})
					tbody.append(el)
				}
			}
		})
	})
	.trigger('change')
}
})()