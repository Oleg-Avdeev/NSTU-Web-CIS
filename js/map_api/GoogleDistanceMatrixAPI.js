// $("#add_point").click(function() {
// 			GetDistance("Хабаровск", "Калининград");
// 		});

function GetDistance(origin, destination, output)
{
	var apikey = "AIzaSyDECyua6rkg2yibx8sqUnT0cfd_8TgKDR4";
  var origins = "origins=" + origin;
  var destinations = "&destinations=" + destination;

	var query = "https://maps.googleapis.com/maps/api/distancematrix/json?" + origins + destinations + "&language=ru&key=" + apikey;
  // alert(query);
 return $.ajax({
      crossOrigin: true,
      // dataType: 'json',
      url : query,
      type : "GET",
      success:function(data){
         // console.log(data);
         var response = JSON.parse(data);
         alert(response.rows[0].elements[0].distance.text);
         output.text(response.rows[0].elements[0].distance.text);
      },
      error:function(){
        output.text("Google distancematrix unavaliable");
      }
    })
}