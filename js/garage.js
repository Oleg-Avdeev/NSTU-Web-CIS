(function(){
var $months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
var $days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
var $curYear = new Date().getFullYear()
var $colors_num = 8
var $settings = {
	day_block_height: 28,
	trip_line_min_height: 10
}
var getZDay = function(zdate, year){
	var sumd = 0
	for(var i = 0; i < 12; ++i){
		var d = new Date(year, i+1, 0).getDate()
		sumd += d
		if (sumd >= zdate){
			var date = new Date(year, i, zdate - (sumd - d))
			return {
				month: i,
				date: zdate - (sumd - d),
				day: (date.getDay() + 6) % 7
			}
		}
	}
}
var getDays = function(year, month){
	return new Date(year, month + 1, 0).getDate()
}
var getDaysInYear = function(year){
	var sum = 0
	for (var i = 0; i < 12; ++i){
		sum += getDays(year, i)
	}
	return sum
}

garage = function(){
	
}
/*

*/
garage.analytics = function(e){
	
}

;(function(){
var buildYear = function(year){
	var res = $()
	var prev_days = getDays(year, -1)
	for (var imonth = 0; imonth < 12; ++imonth){
		var days = getDays(year, imonth)
		var date = new Date(year, imonth, 1)
		var cont = $(
'<div class="fl garage-an-year">\
	<div class="garage-an-year-title">'+$months[imonth]+'</div>\
	<table class="garage-an-year-table">\
		<thead><th>'+$days.join('</th><th>')+'</th></thead>\
		<tbody></tbody>\
	</table>\
</div>')
		var tbody = cont.find('tbody')
		var r = '<tr>'
		var curDay = (date.getDay() + 6) % 7
		for (var i = 0; i < curDay; ++i){
			r += 
'<td class="pr not_day_of_month">\
	<div class="pr day_block" month-day="'+(-curDay + i + 1)+'" real-day="'+(prev_days - curDay + i + 1)+'"></div>\
	<div class="pa oh trip_block"></div>\
	<div class="pa oh trip_block_hover"></div>\
</td>'
		}
		for (var iday = 0; iday < days; ++iday){
			r += 
'<td class="pr day_of_month">\
	<div class="pr day_block" month-day="'+(iday + 1)+'" real-day="'+(iday + 1)+'"></div>\
	<div class="pa oh trip_block"></div>\
	<div class="pa oh trip_block_hover"></div>\
</td>'
			curDay = (curDay + 1) % 7
			if (curDay === 0){
				if (iday + 1 >= days){ curDay = 7 }
				else{ r += '</tr><tr>' }
			}
		}
		for (var i = curDay + 1; i <= 7; ++i){
			r += 
'<td class="pr not_day_of_month">\
	<div class="pr day_block" month-day="'+(days + i - curDay)+'" real-day="'+(i - curDay)+'"></div>\
	<div class="pa oh trip_block"></div>\
	<div class="pa oh trip_block_hover"></div>\
</td>'
		}
		r += '</tr>'
		tbody.html(r)
		tbody.find('.day_of_month').hover(function(){
			
		}, function(){
			
		})
		//e.el.year.append(cont)
		res = res.add(cont)
		prev_days = days
	}
	return res
}
var $legend_active
var addLegendEntry = function(table, legend, idx, name){
	legend.append($('<div num-child="'+(idx + 1)+'">'+name+'</div>').click(function(){
		$(this).toggleClass('active')
		clearLegendYear(table)
		$legend_active = $(this).hasClass('active')
		legend.find('div').removeClass('inactive active')
		if ($legend_active){
			legend.find('div').addClass('inactive')
			$(this).removeClass('inactive').addClass('active')
			table.find('.trip_block .trip_line:not([num-child="0"])').addClass('inactive')
			table.find('.day_of_month, .not_day_of_month').addClass('hover')
			table.find('.day_block').each(function(){
				var tr_bl = $(this).siblings('.trip_block')
				var el = tr_bl.find('[num-child="'+(idx + 1)+'"] .trip_text')
				var wh_el = tr_bl.find('[num-child="0"] .trip_text')
				$(this).add(wh_el).attr('attr-val', '')
				if (el.length){
					wh_el.attr('attr-val', el.attr('attr-val'))
					el.parent().removeClass('inactive')
					el.parent().addClass('hover')
				} else{
					$(this).parent().removeClass('hover')
				}
			})
		}
	}))
}
var clearLegendYear = function(table){
	$legend_active = false
	table
	.find('.day_of_month, .not_day_of_month').removeClass('hover')
	.find('.trip_line').removeClass('hover inactive')
}
/*
{
	el: {
		year
		year_legend
	}
}
*/
garage.analytics.trips = function(e){
	var clearData = function(){
		clearLegendYear(e.el.year)
		e.el.year.find('.trip_block, .trip_block_hover').children().remove()
		e.el.year_legend.html('')
	}
	var loadData = function(tractors){
		var tractors_ids = Object.keys(tractors)
		if (aj){ aj.abort() }
		if (tractors_ids.length === 0){
			clearData()
			e.el.year_legend.hide()
			return
		}
		aj = $.ajax({
			url: '/php/ajax_garage.php',
			type: 'POST',
			data: {
				METHOD: 'analytics.getData',
				TYPE: 'km',
				TRACTORS_ID: tractors_ids
			},
			dataType: 'json',
			success: function(q){
				clearData()
				e.el.year_legend.show()
				e.el.year_legend.append('<h4>Легенда</h4>')
				var days = getDaysInYear($curYear)
				var trip_line_height = Math.max($settings.trip_line_min_height, Math.round($settings.day_block_height/tractors_ids.length))
				e.el.year.find('.day_block, .trip_block, .trip_block_hover').css({
					height: (trip_line_height*tractors_ids.length)+'px'
				})
				$.each(q.tractors_trips, function(tr_id, t){
					var tr_idx = $.inArray(tr_id+'', tractors_ids)
					addLegendEntry(e.el.year, e.el.year_legend, tr_idx, tractors[tr_id]._name)
					$.each(t.trips, function(i, v){
						var dkm = (v.km/(v.end_day - v.start_day + 1)).toFixed(0)
						var start_day = Math.max(1, v.start_day)
						var end_day = Math.min(days, v.end_day)
						for (var j = start_day; j <= end_day; ++j){
							var zday = getZDay(j, $curYear)
							var dayEl = e.el.year.children().eq(zday.month).find('[month-day="'+zday.date+'"]')
							if (zday.month >= 1){
								dayEl = dayEl.add(e.el.year.children().eq(zday.month - 1).find('[month-day="'+(getDays($curYear, zday.month - 1) + zday.date)+'"]'))
							}
							if (zday.month <= 10 || true){
								dayEl = dayEl.add(e.el.year.children().eq(zday.month + 1).find('[month-day="'+(-getDays($curYear, zday.month) + zday.date)+'"]'))
							}
							var attr = {
								class: 'pa oh trip_line',
								'num-child': tr_idx % $colors_num + 1
							}
							if (j === start_day){ attr['val-left'] = '' }
							if (j === end_day){ attr['val-right'] = '' }
							dayEl.each(function(){
								var curDayEl = $(this)
								var trip_line = $('<div>', attr).css({
									height: trip_line_height+'px',
									top: (tr_idx*trip_line_height)+'px'
								}).append(
									$('<div>',{
										class: 'pr oh trip_text',
										'attr-val': dkm,
										'real-day': dayEl.attr('real-day')
									}).css({
										top: (-tr_idx*trip_line_height)+'px'
									})
								)
								var el_bl = curDayEl.siblings('.trip_block')
								el_bl.append(trip_line)
								curDayEl.siblings('.trip_block_hover').append(
									$('<div>', attr).css({
										height: trip_line_height+'px',
										top: (tr_idx*trip_line_height)+'px'
									}).hover(function(){
										if ($legend_active){ return }
										trip_line.addClass('hover')
										curDayEl.attr('attr-val', dkm).parent().addClass('hover')
										el_bl.find('[num-child="0"] .trip_text').attr('attr-val', dkm)
									}, function(){
										if ($legend_active){ return }
										trip_line.removeClass('hover')
										curDayEl.parent().removeClass('hover')
									})
								)
							})
						}
					})
				})
				e.el.year.find('.day_block').each(function(){
					var real_day = $(this).attr('real-day')
					var white_ids = tractors_ids.slice(0)
					var el_bl = $(this).siblings('.trip_block')
					el_bl.children().each(function(){
						white_ids.splice($.inArray(tractors_ids[parseInt($(this).attr('num-child')) - 1], white_ids), 1)
					})
					$.each(white_ids, function(i, v){
						var tr_idx = $.inArray(v+'', tractors_ids)
						var trip_line = $('<div>', {
							class: 'pa oh trip_line',
							'num-child': 0
						}).css({
							height: trip_line_height+'px',
							top: (tr_idx*trip_line_height)+'px'
						}).append(
							$('<div>',{
								class: 'pr oh trip_text',
								'real-day': real_day
							}).css({
								top: (-tr_idx*trip_line_height)+'px'
							})
						)
						el_bl.append(trip_line)
					})
				})
			}
		})
	}
	e.el.year.append(buildYear($curYear))
	var aj
	return new function(){
		this.loadData = loadData
	}()
}
/*
{
	el: {
		year
		year_legend
	}
}
*/
garage.analytics.stuff = function(e){
	var clearData = function(group_by){
		clearLegendYear(e.el.year)
		if (group_by === 'week' || !group_by){
			e.el.year.find('.trip_block, .trip_block_hover').children().remove()
			e.el.year_legend.html('')
		}
		if (group_by === 'month' || !group_by){
			e.el.month.find('.garage-an-month-value').remove()
		}
	}
	var loadData = function(arg){
		var stuffs = arg.stuffs
		var stuffs_ids = Object.keys(stuffs)
		if (aj){ aj.abort() }
		if (stuffs_ids.length === 0){
			clearData()
			e.el.year_legend.hide()
			return
		}
		aj = $.ajax({
			url: '/php/ajax_garage.php',
			type: 'POST',
			data: {
				METHOD: 'analytics.getData',
				TYPE: 'stuff',
				STUFFS_ID: stuffs_ids,
				GROUP_BY: arg.group_by,
				YEAR: $curYear
			},
			dataType: 'json',
			success: function(q){
				clearData(arg.group_by)
				if (arg.group_by === 'week'){
					e.el.year_legend.show()
					e.el.year_legend.append('<h4>Легенда</h4>')
					var days = getDaysInYear($curYear)
					var trip_line_height = Math.max($settings.trip_line_min_height, Math.round($settings.day_block_height/stuffs_ids.length))
					e.el.year.find('.day_block, .trip_block, .trip_block_hover').css({
						height: (trip_line_height*stuffs_ids.length)+'px'
					})
					$.each(q.stuffs_info, function(tr_id, t){
						var st_idx = $.inArray(tr_id+'', stuffs_ids)
						addLegendEntry(e.el.year, e.el.year_legend, st_idx, stuffs[tr_id]._name)
						$.each(t.info, function(i, v){
							var val = v.quantity
							var start_day
							var end_day
							var day = (new Date($curYear, 0, 1).getDay() + 6) % 7
							var daysFirstWeek = (day === 0 ? 0 : 7 - (day))
							if (daysFirstWeek > 0 && v.group_entity === 0){
								start_day = 1
								end_day = daysFirstWeek
							} else{
								start_day = daysFirstWeek + 1 + (v.group_entity - 1) * 7
								end_day = Math.min(days, start_day + 6)
							}
							for (var j = start_day; j <= end_day; ++j){
								var zday = getZDay(j, $curYear)
								var dayEl = e.el.year.children().eq(zday.month).find('[month-day="'+zday.date+'"]')
								if (zday.month >= 1){
									dayEl = dayEl.add(e.el.year.children().eq(zday.month - 1).find('[month-day="'+(getDays($curYear, zday.month - 1) + zday.date)+'"]'))
								}
								if (zday.month <= 10 || true){
									dayEl = dayEl.add(e.el.year.children().eq(zday.month + 1).find('[month-day="'+(-getDays($curYear, zday.month) + zday.date)+'"]'))
								}
								var attr = {
									class: 'pa oh trip_line',
									'num-child': st_idx % $colors_num + 1
								}
								if (j === start_day){ attr['val-left'] = '' }
								if (j === end_day){ attr['val-right'] = '' }
								dayEl.each(function(){
									var curDayEl = $(this)
									var trip_line = $('<div>', attr).css({
										height: trip_line_height+'px',
										top: (st_idx*trip_line_height)+'px'
									}).append(
										$('<div>',{
											class: 'pr oh trip_text',
											'attr-val': val,
											'real-day': dayEl.attr('real-day')
										}).css({
											top: (-st_idx*trip_line_height)+'px'
										})
									)
									var el_bl = curDayEl.siblings('.trip_block')
									el_bl.append(trip_line)
									curDayEl.siblings('.trip_block_hover').append(
										$('<div>', attr).css({
											height: trip_line_height+'px',
											top: (st_idx*trip_line_height)+'px'
										}).hover(function(){
											if ($legend_active){ return }
											trip_line.addClass('hover')
											curDayEl.attr('attr-val', val).parent().addClass('hover')
											el_bl.find('[num-child="0"] .trip_text').attr('attr-val', val)
										}, function(){
											if ($legend_active){ return }
											trip_line.removeClass('hover')
											curDayEl.parent().removeClass('hover')
										})
									)
								})
							}
						})
					})
					e.el.year.find('.day_block').each(function(){
						var real_day = $(this).attr('real-day')
						var white_ids = stuffs_ids.slice(0)
						var el_bl = $(this).siblings('.trip_block')
						el_bl.children().each(function(){
							white_ids.splice($.inArray(stuffs_ids[parseInt($(this).attr('num-child')) - 1], white_ids), 1)
						})
						$.each(white_ids, function(i, v){
							var st_idx = $.inArray(v+'', stuffs_ids)
							var trip_line = $('<div>', {
								class: 'pa oh trip_line',
								'num-child': 0
							}).css({
								height: trip_line_height+'px',
								top: (st_idx*trip_line_height)+'px'
							}).append(
								$('<div>',{
									class: 'pr oh trip_text',
									'real-day': real_day
								}).css({
									top: (-st_idx*trip_line_height)+'px'
								})
							)
							el_bl.append(trip_line)
						})
					})
				}
				else if(arg.group_by === 'month'){
					var el = e.el.month.find('.garage-an-month')
					$.each(q.stuffs_info, function(gr_id, t){
						var idx = $.inArray(gr_id, stuffs_ids)
						$.each(t.info, function(_, v){
							el.eq(v.group_entity)
							.append($('<div>',{
								class: 'pa garage-an-month-value',
								'num-child': idx % $colors_num + 1,
								html: v.quantity+' '+(stuffs[gr_id].measure || '')+'<div class="descr">'+v.price+' руб</div>'
							}).css({
								left: (100 + 102*idx)+'px'
							}))
						})
					})
				}
			}
		})
	}
	e.el.year.append(buildYear($curYear))
	for (var i = 0; i < 12; ++i){
		e.el.month
		.append($(
'<div class="pr garage-an-month">\
	<div class="garage-an-month-title">'+$months[i]+'</div>\
</div>'))
	}
	var aj
	return new function(){
		this.loadData = loadData
	}()
}
})()

})()