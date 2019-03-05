

var movieArray = ["Pulp Fiction", "Die Hard", "The Fifth Element"];




    function makeButtons() {
        $("#button-div").empty();
        for (var i = 0; i < movieArray.length; i++){
    
        var gifButton = $("<button>");
        gifButton.addClass("movie-button");
        gifButton.attr("data-movie", movieArray[i]);
        gifButton.text(movieArray[i]);
        $("#button-div").append(gifButton);

        };
    // };

    // makeButtons();

        $(".movie-button").on("click", function() {

        $(".gif-images").remove();
        
        var movie = $(this).attr("data-movie");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=OKuVGjgT0V7r20tpzmToIqOjeggIVUYM&limit=10";
        
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        
        .then(function(response) {
            
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div for the gif
                var gifDiv = $("<div>");
                gifDiv.addClass("gif-images");
                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var movieImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                movieImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(movieImage);

                $("#gif-div").append(gifDiv);

                }
        

            }
        });

    });

};

   
   
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        console.log("ive been clicked");

        // This line will grab the text from the input box
        var movie = $("#movie-input").val().trim();
        // The movie from the textbox is then added to our array
        movieArray.push(movie);
        
        // calling makeButtons which handles the processing of our movie array
        makeButtons();
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