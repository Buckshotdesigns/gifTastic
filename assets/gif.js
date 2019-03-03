

var gifArray = ["Pulp Fiction", "Die Hard", "The Fifth Element"];

function makeButtons() {

var gifButton = $("<button>");
gifButton.attr("data", movie);
gifButton.text(movie);
$(".button-div").append(gifButton);


};

movie = "Die Hard";


var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=OKuVGjgT0V7r20tpzmToIqOjeggIVUYM&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    console.log(response);

  });

makeButtons();


// start by creating an array of topics for the gif buttons
// we then need to loop through that array and generate buttons
// append the buttons to the html 
// the api needs to be called to generate images 
// images must be rated
// these ratings also need to be displayed on the screen 
// we need a search field to input user data with a button
// once user has entered info it needs to generate a button by adding to original array
// the loaded gifs need to be stills that when clicked animate 