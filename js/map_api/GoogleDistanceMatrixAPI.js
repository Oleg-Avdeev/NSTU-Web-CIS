$("#add_point").click(function() {
			GetDistance();
		});

function GetDistance()
{
	var apikey = "AIzaSyDECyua6rkg2yibx8sqUnT0cfd_8TgKDR4";
	var query = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Seattle&destinations=San+Francisco&key=";
	query += apikey;

 $.ajax({
      crossOrigin: true,
      url : "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.86,151.195&radius=5000&type=ATM&keyword=ATM&key=MyKey",
      type : "GET",
      success:function(data){
         console.log(data);
      }
    })

}