// $("#add_point").click(function() {
// 			GetDistance("Хабаровск", "Калининград");
// 		});

function GetDistance(origin, destination)
{
	var apikey = "AIzaSyDECyua6rkg2yibx8sqUnT0cfd_8TgKDR4";
  var origins = "origins=" + origin;
  var destinations = "&destinations=" + destination;

	var query = "https://maps.googleapis.com/maps/api/distancematrix/json?" + origins + destinations + "&language=ru&key=" + apikey;
  alert(query);
 $.ajax({
      crossOrigin: true,
      // dataType: 'json',
      url : query,
      type : "GET",
      
      success:function(data){
         console.log(data);
         var response = JSON.parse(data);
         alert(response.rows[0].elements[0].distance.text);

      }
    })

}