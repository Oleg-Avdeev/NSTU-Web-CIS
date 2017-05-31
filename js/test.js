function Point($HTMLKusok, number)
{
	$combo1 = $HTMLKusok.children('#combo1');
	$combo2 = $HTMLKusok.children('#combo2');
	$($combo1).change(function(event) {
		alert("number - " + number);

	});
}

// var points[] = {}

//
$().ready(function() {

	var $HTMLKusok = $(".kusok");
	
	$(".kusok").each(function(event){
		alert(event.target.nodeName);
	})

	var point1 = new Point($HTMLKusok.eq(0), 1);
	var point2 = new Point($HTMLKusok.eq(1), 2);

});