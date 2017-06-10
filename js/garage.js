(function(){
var $months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
var $days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
var $curYear = new Date().getFullYear()
var $colors_num = 8
var $settings = {
	day_block_height: 30,
	line_min_height: 10
}
var getZDay
var getDays
var getDaysInYear
;(function(){
	var $cacheZDay = {}
	var $cacheDays = {}
	var $cacheDaysInYear = {}
	getZDay = function(zdate, year){
		var sumd = 0
		while (zdate < 1){
			zdate += getDaysInYear(--year)
		}
		for (var d = getDaysInYear(year); zdate > d;){
			zdate -= d
			d = getDaysInYear(++year)
		}
		if ($cacheZDay[zdate + '-' + year] === undefined){
			for(var i = 0; i < 12; ++i){
				var days = getDays(year, i)
				sumd += days
				if (sumd >= zdate){
					var d = zdate - (sumd - days)
					var date = new Date(year, i, d)
					$cacheZDay[zdate + '-' + year] = {
						year: year,
						month: i,
						date: d,
						day: (date.getDay() + 6) % 7
					}
					break
				}
			}
		}
		return $cacheZDay[zdate + '-' + year]
	}
	getDays = function(year, month){
		if ($cacheDays[year + '-' + month] === undefined){
			$cacheDays[year + '-' + month] = new Date(year, month + 1, 0, 0, 0, 0, 0).getDate()
		}
		return $cacheDays[year + '-' + month]
	}
	getDaysInYear = function(year){
		if ($cacheDaysInYear[year] === undefined){
			$cacheDaysInYear[year] = Math.round((new Date(year, 11, 31, 0, 0, 0, 0).getTime() - new Date(year, 0, 0, 0, 0, 0, 0).getTime()) / (1000 * 60 * 60 * 24))
		}
		return $cacheDaysInYear[year]
	}
})()

garage = function(){
	
}
/*

*/
garage.analytics = function(e){
	var tractors = e.tractors
	var stuff = e.stuff
	var stuff_group = {}
	$.each(stuff, function(i, v){
		if (!v.id_group){ stuff_group[v.id] = [] }
	})
	$.each(stuff, function(i, v){
		if (v.id_group){ stuff_group[v.id_group].push(v.id) }
	})
	var setMaxSelectMultiple = function(select, max){
		var $isDown = false
		var $highlight = false
		var startIndex
		var length
		var arr
		var check = function(e){
			var idx
			var cnt = 0
			for (var i = 0; i < length; ++i){
				if (arr[i]){ ++cnt }
				if (this.children[i] === e.target){
					idx = i
				}
			}
			var inc = idx > startIndex ? 1 : (idx < startIndex ? -1 : 0)
			for (var i = startIndex; i != idx + inc; i += inc){
				if (!arr[i]){ ++cnt }
			}
			if (cnt > max){
				e.preventDefault()
			}
		}
		select.mousedown(function(e){
			if (e.target === this){ return }
			$isDown = true
			$highlight = true
			startIndex = select.children().index(e.target)
			length = this.children.length
			arr = []
			if (e.ctrlKey){
				var val = select.val()
				if (e.target.selected){
					$highlight = false
				} else{
					for (var i = 0; i < length; ++i){
						arr.push(this.children[i].selected)
					}
					arr[startIndex] = true
					check.call(this, e)
				}
			} else{
				for (var i = 0; i < length; ++i){
					arr.push(false)
				}
				arr[startIndex] = true
				check.call(this, e)
			}
		}).mousemove(function(e){
			if (e.target === this){ return }
			if (!$isDown || !$highlight){ return }
			check.call(this, e)
		})
		$(document.body).mouseup(function(){
			$isDown = false
		})
	}

	var tabs = [
	{
		text: 'Поездки',
		init: function(){
			var $maxTractorsSelected = 8
			var select = $('<select>',{
				multiple: '',
				class: 'form-control'
			}).css({
				height: '180px'
			})
			$.each(tractors, function(i, v){
				select.append($('<option>',{
					value: i,
					text: v._name
				}))
			})
			setMaxSelectMultiple(select, $maxTractorsSelected)
			select.change(function(){
				var ids = {}
				$.each($(this).val(), function(i, v){
					ids[tractors[v].id+''] = tractors[v]
				})
				obj.loadData(ids)
			})
			var cont = $()
			var temp = $(
'<div class="form-group">\
	<h3>Грузовики</h3>\
</div>')
			temp.append(select)
			var scroll_empty_el = $('<div style="height: 0.1px;">')
			var scroll_el = $('<div class="garage-an-year-scroll"></div>')
			var year_info = $('<div class="fr pr garage-an-year-info"></div>')
			var year_legend = $('<div class="garage-an-year-legend"></div>')
			var year_table = $('<div id="stats_year" class="cla"></div>')
			cont = cont
			.add(temp)
			.add(scroll_empty_el)
			.add(scroll_el)
			.add(year_table)
			scroll_el
			.append(year_info)
			.append(year_legend)
			var obj = garage.analytics.trips({
				el: {
					year: year_table,
					year_legend: year_legend
				}
			})
			$(window).scroll(function(){
				if (tabControl.getActive() !== 0){ return }
				var off = scroll_empty_el.offset()
				var scr = $(window).scrollTop()
				if (scroll_el[0].classList.contains('pf')){
					if (scr <= off.top){
						scroll_el[0].classList.remove('pf')
						scroll_empty_el[0].style.height = '0.1px'
					}
				} else{
					if (scr > off.top){
						scroll_empty_el[0].style.height = scroll_el.outerHeight()+'px'
						scroll_el[0].classList.add('pf')
					}
				}
			})
			return cont
		},
		show: function(){
			
		}
	},
	{
		text: 'Работы/детали',
		init: function(){
			var $maxStuffSelected = 8
			var select = $('<select>',{
				multiple: '',
				class: 'form-control'
			}).css({
				height: '180px'
			})
			$.each(stuff_group, function(id, gr){
				var v = stuff[id]
				select.append($('<option>',{
					value: id,
					text: v._name
				}))
				$.each(gr, function(_, id){
					v = stuff[id]
					select.append($('<option>',{
						value: id,
						text: '---' + v._name
					}))
				})
			})
			setMaxSelectMultiple(select, $maxStuffSelected)
			select.change(function(){
				updateData()
			})
			var updateData = function(){
				var stuffs = {}
				$.each(select.val(), function(i, v){
					stuffs[v+''] = stuff[v]
				})
				obj.loadData({
					stuffs: stuffs,
					group_by: group_by
				})
			}
			var obj
			var cont = $()
			var temp = $(
'<div class="form-group">\
	<h3>Работы/детали</h3>\
</div>')
			temp.append(select)
			var scroll_empty_el = $('<div style="height: 0.1px;">')
			var scroll_el = $('<div class="cla garage-an-year-scroll"></div>')
			var year_info = $('<div class="fr pr garage-an-year-info"></div>')
			var year_legend = $('<div class="garage-an-year-legend"></div>')
			var year_table = $('<div class="cla"></div>')
			var group_by_els = {
				tabs: null,
				conts: null
			}
			var group_by
			var tabs = [
			{
				text: 'Неделя',
				init: function(){
					return scroll_empty_el
					.add(scroll_el)
					.add(year_table)
					.add(year_table)
				},
				show: function(){
					group_by = 'week'
					updateData()
				}
			},
			{
				text: 'Месяц',
				init: function(){
					
				},
				show: function(){
					group_by = 'month'
					updateData()
				}
			}
			]
			TabControl({
				tabs: tabs,
				el: group_by_els
			})
			cont = cont
			.add(temp)
			.add($('<ul class="nav nav-tabs"></ul>').append(group_by_els.tabs))
			.add(group_by_els.conts)
			scroll_el
			.append(year_info)
			.append(year_legend)
			var obj = garage.analytics.stuff({
				el: {
					year: year_table,
					year_legend: year_legend,
					month: group_by_els.conts.eq(1),
					info: year_info
				}
			})
			$(window).scroll(function(){
				if (tabControl.getActive() !== 1){ return }
				var off = scroll_empty_el.offset()
				var scr = $(window).scrollTop()
				if (scroll_el[0].classList.contains('pf')){
					if (scr <= off.top){
						scroll_el[0].classList.remove('pf')
						scroll_empty_el[0].style.height = '0.1px'
					}
				} else{
					if (scr > off.top){
						scroll_empty_el[0].style.height = scroll_el.outerHeight()+'px'
						scroll_el[0].classList.add('pf')
					}
				}
			})
			group_by_els.tabs.eq(1).trigger('click')
			return cont
		},
		show: function(){
			
		}
	}
	]
	
	var tabControl
	;(function(){
	var els = {
		tabs: null,
		conts: null
	}
	tabControl = TabControl({
		tabs: tabs,
		el: els
	})
	$('#tabs').append(els.tabs)
	$('#conts').append(els.conts)
	els.tabs.eq(1).trigger('click')
	})()
}

;(function(){
/*
{
	table
	legend
	max_entries // for optimization
}
*/
var Year = function(e){
var table = e.table
var legend = e.legend
var max_entries = e.max_entries
var day_el_arr
var block_els // .block
var block_hover_els // .block_hover
var all_block_els // .block; .block_hover
var block_line_els // .block_els.children()
var line_els // .block_els.children(); block_hover_els.children()
var td_els // .day_of_month, .not_day_of_month
var $year
var daysInYear
var dayStartYear
var visibleDaysInYear
var legend_active
var $entries
// Возвращает таблицу в исходное состояние (отображаются дни)
var clearLegendYear = function(){
	legend_active = false
	td_els.each(function(){
		this.classList.remove('hover')
		var val = this.getAttribute('real-day')
		for (var i = 0; i < this.firstChild.children.length; ++i){
			var el = this.firstChild.children[i]
			el.classList.remove('hover')
			el.classList.remove('inactive')
			el.firstChild.innerHTML = val
		}
	})
}
/*
{
	year
}
*/
var build = function(q){
	$year = q.year
	daysInYear = getDaysInYear($year)
	var res = $()
	day_el_arr = []
	var prev_days = getDays($year, -1)
	for (var imonth = 0; imonth < 12; ++imonth){
		var day_els = {}
		var days = getDays($year, imonth)
		var date = new Date($year, imonth, 1)
		var cont = $(
'<div class="fl garage-an-year">\
	<div class="garage-an-year-title">'+$months[imonth]+'</div>\
	<table class="garage-an-year-table">\
		<thead><th>'+$days.join('</th><th>')+'</th></thead>\
		<tbody>\
			<tr></tr>\
		</tbody>\
	</table>\
</div>')
		var tbody = cont.find('tbody')
		var tr = tbody.children().eq(0)
		var curDay = (date.getDay() + 6) % 7
		if (imonth === 0){
			dayStartYear = curDay
		}
		for (var i = 0; i < curDay; ++i){
			var month_day = -curDay + i + 1
			var real_day = prev_days - curDay + i + 1
			var el = $(
'<td class="pr not_day_of_month" real-day="'+real_day+'">'+
	'<div class="oh block"></div>'+
	'<div class="pa oh block_hover"></div>'+
'</td>')
			var tr_els = ''
			var tr_hover_els = ''
			for (var j = 0; j < max_entries; ++j){
				tr_els += 
'<div class="pr oh line">'+
	'<div class="pr oh text">'+real_day+'</div>'+
'</div>'
				tr_hover_els += 
'<div></div>'
			}
			el.children().eq(0).append(tr_els)
			.next().append(tr_hover_els)
			tr.append(el)
			day_els[month_day] = el
		}
		for (var iday = 0; iday < days; ++iday){
			var month_day = iday + 1
			var real_day = iday + 1
			var el = $(
'<td class="pr day_of_month" real-day="'+real_day+'">'+
	'<div class="oh block"></div>'+
	'<div class="pa oh block_hover"></div>'+
'</td>')
			var tr_els = ''
			var tr_hover_els = ''
			for (var j = 0; j < max_entries; ++j){
				tr_els += 
'<div class="pr oh line">'+
	'<div class="pr oh text">'+real_day+'</div>'+
'</div>'
				tr_hover_els += 
'<div></div>'
			}
			el.children().eq(0).append(tr_els)
			.next().append(tr_hover_els)
			tr.append(el)
			day_els[month_day] = el
			curDay = (curDay + 1) % 7
			if (curDay === 0){
				if (iday + 1 >= days){ curDay = 7 }
				else{
					tr = $('<tr>').appendTo(tbody)
				}
			}
		}
		for (var i = curDay + 1; i <= 7; ++i){
			var month_day = days + i - curDay
			var real_day = i - curDay
			var el = $(
'<td class="pr not_day_of_month" real-day="'+real_day+'">'+
	'<div class="oh block"></div>'+
	'<div class="pa oh block_hover"></div>'+
'</td>')
			var tr_els = ''
			var tr_hover_els = ''
			for (var j = 0; j < max_entries; ++j){
				tr_els += 
'<div class="pr oh line">'+
	'<div class="pr oh text">'+real_day+'</div>'+
'</div>'
				tr_hover_els += 
'<div></div>'
			}
			el.children().eq(0).append(tr_els)
			.next().append(tr_hover_els)
			tr.append(el)
			day_els[month_day] = el
		}
		res = res.add(cont)
		prev_days = days
		day_el_arr.push(day_els)
	}
	table.html('').append(res)
	block_els = table.find('.block')
	block_hover_els = table.find('.block_hover')
	all_block_els = block_els.add(block_hover_els)
	block_line_els = block_els.children()
	line_els = block_line_els.add(block_hover_els.children())
	td_els = table.find('.day_of_month, .not_day_of_month')
	visibleDaysInYear = td_els.length
	
	block_hover_els.each(function(i){
		$(this).children().each(function(j){
			var line_el = block_els[i].children[j]
			var entry
			var line
			var get = function(){
				entry = $entries[$(line_el).data('entry_id')]
				line = entry.lines[$(line_el).data('line_id')]
			}
			$(this).hover(function(){
				if (legend_active || !line_el.classList.contains('colored')){ return }
				get()
				line.els.each(function(){
					var val = this.firstChild.getAttribute('attr-val')
					this.classList.add('hover')
					this.firstChild.innerHTML = val
					this.parentNode.parentNode.classList.add('hover')
					$(this).siblings(':not(.colored)').children().html(val)
				})
				if (line.onOver){
					line.onOver({
						start_day: line.start_day,
						end_day: line.end_day,
						el: line_el,
						els: line.els
					})
				}
			}, function(){
				if (legend_active || !line_el.classList.contains('colored')){ return }
				line.els.each(function(){
					var td = this.parentNode.parentNode
					td.classList.remove('hover')
					var val = td.getAttribute('real-day')
					this.classList.remove('hover')
					this.firstChild.innerHTML = val
					$(this).siblings(':not(.colored)').children().html(val)
				})
				if (line.onOut){
					line.onOut({
						start_day: line.start_day,
						end_day: line.end_day,
						el: line_el,
						els: line.els
					})
				}
			}).click(function(){
				get()
				if (line.onClick){
					line.onClick({
						start_day: line.start_day,
						end_day: line.end_day,
						el: line_el,
						els: line.els
					})
				}
			})
		})
	})
}
var addLegendEntry = function(idx, name){
	legend.find('> .garage-an-year-legend-els').append($('<div>'+name+'</div>').click(function(){
		this.classList.toggle('active')
		clearLegendYear()
		legend_active = this.classList.contains('active')
		legend.find('div').removeClass('inactive active')
		if (!legend_active){ return }
		legend.find('div').addClass('inactive')
		this.classList.remove('inactive')
		this.classList.add('active')
		td_els.each(function(i){
			var el = this.firstChild.children[idx]
			$(el).siblings().addClass('inactive')
			if (!el.classList.contains('colored')){ return }
			this.classList.add('hover')
			el.classList.add('hover')
			var val = el.firstChild.getAttribute('attr-val')
			el.firstChild.innerHTML = val
			$(el).siblings(':not(.colored)').children().html(val)
		})
	}))
}
/*
{
	group_by - 'none' | 'week'
	entries: Array(entries)[
		{
			legend_title
			lines: Array(lines)[
				(start_day
				end_day)
				or
				(group_entity)
				getTitle - function(i)
				[onClick] - function({
					start_day
					end_day
					el
					els
				})
				[onOver] - function({
					start_day
					end_day
					el
					els
				})
				[onOut] - function({
					start_day
					end_day
					el
					els
				})
			]
		}
	]
}
return Array(entries)[
	{
		setDisplayValue - function(mixed)
	}
]
*/
var setEntries = function(q){
	$entries = q.entries
	clearEntries()
	var group_by = q.group_by || 'none'
	var line_height
	if ($entries.length === 0){
		line_height = $settings.day_block_height
		block_els.each(function(){
			this.firstChild.firstChild.style.top = 0
		})
		all_block_els.css({
			height: line_height + 'px'
		})
	} else{
		legend.show()
		line_height = Math.max($settings.line_min_height, Math.round($settings.day_block_height / q.entries.length))
		block_els.each(function(){
			$(this).children().each(function(j){
				this.firstChild.style.top = (-j * line_height) + 'px'
			})
		})
		all_block_els.css({
			height: (line_height * q.entries.length) + 'px'
		})
	}
	line_els.css({
		height: line_height + 'px'
	})
	line_els.removeClass('left right colored')
	$.each($entries, function(entry_id, entry){
		addLegendEntry(entry_id, entry.legend_title)
		$.each(entry.lines, function(line_id, line){
			var start_day
			var end_day
			if (group_by === 'none'){
				start_day = Math.max((dayStartYear === 0 ? 0 : -dayStartYear) + 1, line.start_day)
				end_day = Math.min(visibleDaysInYear, line.end_day)
			}
			else if(group_by === 'week'){
				if (dayStartYear > 0){
					if (line.group_entity === 0){
						start_day = 1
						end_day = 7 - dayStartYear
					} else{
						start_day = (7 - dayStartYear) + 1 + (line.group_entity - 1) * 7
						end_day = Math.min(daysInYear, start_day + 6)
					}
				} else{
					start_day = 1 + (line.group_entity - 1) * 7
					end_day = Math.min(daysInYear, start_day + 6)
				}
				line.start_day = start_day
				line.end_day = end_day
			}
			line.start_day = start_day
			line.end_day = end_day
			var entry_line_els = $()
			for (var j = start_day; j <= end_day; ++j){
				var zday = getZDay(j, $year)
				var dayEl = day_el_arr[zday.month][zday.date]
				if (zday.year < $year){
					var d = getDays($year - 1, 11) - zday.date
					if (day_el_arr[0][d]){
						dayEl = dayEl.add(day_el_arr[0][d])
					}
				} else if(zday.year === $year){
					if (zday.month >= 1){
						var d = getDays($year, zday.month - 1) + zday.date
						if (day_el_arr[zday.month - 1][d]){
							dayEl = dayEl.add(day_el_arr[zday.month - 1][d])
						}
					}
					if (zday.month <= 10){
						var d = -getDays($year, zday.month) + zday.date
						if (day_el_arr[zday.month + 1][d]){
							dayEl = dayEl.add(day_el_arr[zday.month + 1][d])
						}
					}
				} else{
					var d = getDays($year, 11) - zday.date
					if (day_el_arr[11][d]){
						dayEl = dayEl.add(day_el_arr[11][d])
					}
				}
				dayEl.each(function(){
					var el = this.firstChild.children[entry_id]
					entry_line_els = entry_line_els.add(el)
					// means real start and end day, not the visible ones'
					if (j === line.start_day){ el.classList.add('left') }
					if (j === line.end_day){ el.classList.add('right') }
					var val = line.getTitle(j - line.start_day)
					el.classList.add('colored')
					el.firstChild.setAttribute('attr-val', val)
					el.firstChild.innerHTML = this.getAttribute('real-day')
				})
			}
			entry_line_els.data({
				entry_id: entry_id,
				line_id: line_id
			})
			line.els = entry_line_els
		})
	})
}
// Подготавливает таблицу к установлению новых entries (очистка легенды и всех линий)
var clearEntries = function(){
	clearLegendYear()
	legend.hide().html(
'<h4>Легенда</h4>\
<div class="garage-an-year-legend-els"></div>')
	line_els.removeClass('colored')
}
	return new function(){
		this.build = build
		this.setEntries = setEntries
		this.clearEntries = clearEntries
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
			yearObj.clearEntries()
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
				var entries = []
				$.each(q.tractors_trips, function(tractor_id, tractor){
					var lines = []
					$.each(tractor.trips, function(i, v){
						var dkm = (v.km/(v.end_day - v.start_day + 1)).toFixed(0)
						lines.push({
							start_day: v.start_day,
							end_day: v.end_day,
							getTitle: function(k){
								return dkm
							}
						})
					})
					entries.push({
						legend_title: tractors[tractor_id]._name,
						showInfo: function(value){
							
						},
						onHover: function(w){
							
						},
						lines: lines
					})
				})
				yearObj.setEntries({
					entries: entries
				})
			}
		})
	}
	//e.el.year.append(buildYear($curYear))
	var yearObj = Year({
		table: e.el.year,
		legend: e.el.year_legend,
		max_entries: $colors_num
	})
	yearObj.build({
		year: $curYear
	})
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
		month
		info
	}
}
*/
garage.analytics.stuff = function(e){
	var clearData = function(){
		e.el.month.find('.garage-an-month-value').remove()
	}
	var loadData = function(arg){
		var stuffs = arg.stuffs
		var stuffs_ids = Object.keys(stuffs)
		if (aj){ aj.abort() }
		e.el.info.html('')
		if (stuffs_ids.length === 0){
			yearObj.clearEntries()
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
				if (arg.group_by === 'week'){
					var entries = []
					$.each(q.stuffs_info, function(stuff_id, qstuff){
						var lines = []
						var stuff = stuffs[stuff_id]
						$.each(qstuff.info, function(i, v){
							lines.push({
								group_entity: v.group_entity,
								getTitle: function(k){
									if (k === 0){ return v.quantity }
									return ''
								},
								onClick: function(w){
									var formateDate = function(date){
										var d = date.getUTCDate(),
										m = date.getUTCMonth() + 1
										return date.getUTCFullYear() + '.' + (m < 10 ? '0' : '') + m + '.' + (d < 10 ? '0' : '') + d
									}
									var a = getZDay(w.start_day, $curYear),
									b = getZDay(w.end_day, $curYear)
									e.el.info.html(
'<h4>Информация</h4>\
<ul>\
<li>Неделя №' + v.group_entity + ' (' + formateDate(new Date($curYear, a.month, a.date + 1, 0, 0, 0, 0)) + ' – ' + formateDate(new Date($curYear, b.month, b.date + 1, 0, 0, 0, 0)) + ')</li>\
<li>' + stuff._name + '</li>\
<li>' + (stuff.measure ? v.quantity + ' ' + stuff.measure : 'Кол-во: ' + v.quantity) + '</li>\
<li>Сумма: ' + v.price + ' руб</li>\
</ul>')
								}
							})
						})
						entries.push({
							legend_title: stuff._name,
							showInfo: function(value){
								
							},
							onHover: function(w){
								
							},
							lines: lines
						})
					})
					yearObj.setEntries({
						group_by: 'week',
						entries: entries
					})
				} else if(arg.group_by === 'month'){
					var el = e.el.month.find('.garage-an-month')
					$.each(q.stuffs_info, function(stuff_id, qstuff){
						var idx = $.inArray(stuff_id, stuffs_ids)
						var stuff = stuffs[stuff_id]
						$.each(qstuff.info, function(_, v){
							el.eq(v.group_entity)
							.append($('<div>',{
								class: 'pa garage-an-month-value',
								'num-child': idx % $colors_num + 1,
								title: stuff._name,
								style: 'left: ' + (106 + 102 * idx) + 'px;',
								html: v.quantity + ' ' + (stuff.measure || '') + '<div class="descr">' + v.price + ' руб</div>'
							}))
						})
					})
				}
			}
		})
	}
	var yearObj = Year({
		table: e.el.year,
		legend: e.el.year_legend,
		max_entries: $colors_num
	})
	yearObj.build({
		year: $curYear
	})
	for (var i = 0; i < 12; ++i){
		e.el.month.append(
'<div class="pr garage-an-month">'+
	'<div class="garage-an-month-title">'+$months[i]+'</div>'+
'</div>')
	}
	var aj
	return new function(){
		this.loadData = loadData
	}()
}
})()

})()