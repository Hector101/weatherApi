$(function(){
	var h1 = $("h1");
	var zip = $("input[name='zip']");
	var h3 = $("h3");

	$(".pure-form").on("submit", function(e){
		e.preventDefault();

		
		h1.text("Loading...")
		h3.text("");
		var zipCode = $.trim(zip.val());

		var request = $.ajax({
			url: "/"+zipCode,
			dataType: "json"
		})
		request.done(function(data){
			
			h1.html("Temperature is "+data.temperature+ "&#176; in "+data.at);
			h3.html("Weather would be "+data.summary);
		})
		request.fail(function(){
			h1.text("")
			h3.text("Invalid Zipcode")
		})
	})
})