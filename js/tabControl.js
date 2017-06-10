(function(){
/*
{
	tabs: [
	{
		text
		init - function()
		show - function()
	}
	]
	[initial]
	el: {
		tabs
		conts
	}
}
*/
TabControl = function(e){
	var curTab = -1
	var tab_list = $()
	var tab_conts = $()
	$.each(e.tabs, function(i, v){
		var tab_el = $('<li><a href="javascript://">'+v.text+'</a></li>')
		tab_el.click(function(){
			if (curTab === i){ return }
			curTab = i
			tab_list.removeClass('active')
			$(this).addClass('active')
			tab_conts.hide().eq(i).show()
			v.show()
		})
		tab_list = tab_list.add(tab_el)
		tab_conts = tab_conts.add($('<div style="display: none;">').append(v.init()))
	})
	e.el.tabs = tab_list
	if (e.initial !== undefined){
		tab_list.eq(e.initial).trigger('click')
	}
	e.el.conts = tab_conts
	return new function(){
		this.getActive = function(){
			return curTab
		}
	}()
}
})()