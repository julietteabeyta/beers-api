var apiUrl = "http://beer.fluentcloud.com/v1/beer";

function buildBeersList() {
    $.getJSON(apiUrl, function(data) {
        $("#beer-list").html('');
        var beers = data;
        $.each(beers, function() {
            $("#beer-list").append(
                "<li>Beer Name: " + this.name + "</br>" +
	                "Number of likes: " + this.likes +
	                "<form>" +
		                "<p>Update number of likes</p>" +
		                "<input type='number' id='input-" + this.id + "'>" +
		                "<input type='button' value='Update' class='update-likes' id='submit-" + this.id +"'>" +
	                "</form>" +
                "</li>");

        });
    });
}
//See current beers in cooler & their # of likes
$("#beer-button").click(function() {
    buildBeersList();
});

//Add new beer to cooler
$("#submit-button").click(function(event) {
    event.preventDefault();
    var uniqueID;
    var newBeer = {};
    $.getJSON(apiUrl, function(data) {
        var highestID = 0;
        $.each(data, function() {
            if (this.id > highestID) {
                highestID = this.id
            }
        });
        uniqueID = ++highestID;
        var newBeer = {
            'id': uniqueID,
            'name': $('#name').val(),
            'likes': $('#likes').val(),

        };
        $.post(apiUrl, newBeer, function() { buildBeersList(); }, 'JSON');
    });
});

//Update likes
$(document).on('click', '.update-likes', function(){
	var id = $(this).attr('id').replace('submit-', '');
	var likesValue = $('#input-' + id).val();
	$.ajax({
		url: apiUrl + '/' + id,
		type: 'PUT',
		data: {"likes": likesValue},
		success: function(){buildBeersList();}
	});
});
