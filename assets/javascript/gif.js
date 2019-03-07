
// movie array global variable
var movieArray = ["Pulp Fiction", "Die Hard", "The Fifth Element", "Joe Dirt", "The Running Man", "Commando", "Total Recall","The Expendables", "Snatch","Lock Stock and Two Smoking Barrels"];
// function to create buttons from array
    function makeButtons() {
        $("#button-div").empty();
        for (var i = 0; i < movieArray.length; i++){
    
        var gifButton = $("<button>");
        gifButton.addClass("movie-button btn btn-danger");
        gifButton.attr("data-movie", movieArray[i]);
        gifButton.text(movieArray[i]);
        $("#button-div").append(gifButton);
        };
    
        $(".movie-button").on("click", function() {

        $(".gif-images").remove();
        
        var movie = $(this).attr("data-movie");
          // Start of api call to giphy
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=OKuVGjgT0V7r20tpzmToIqOjeggIVUYM&limit=10";
        
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        
        .then(function(response) {
            console.log(response);
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

                // Giving the image tag an src attribute for still and animate
                movieImage.attr("src", results[i].images.fixed_width_still.url);
                movieImage.attr("data-still", results[i].images.fixed_width_still.url);
                movieImage.attr("data-animate", results[i].images.fixed_width.url);
                movieImage.attr("data-state", "still");
                movieImage.addClass("gif");
                // Appending the paragraph and movieImage we created to the "gifDiv" div we created
                
                gifDiv.append(movieImage);
                gifDiv.append(p);

                $("#gif-div").append(gifDiv);

                }
            }
        });
    });
};
    // adding the gifs when button is clicked
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line will grab the text from the input box
        var movie = $("#movie-input").val().trim();
        if (movie === ""){
          return;
        }
        // The movie from the textbox is then added to our array
        movieArray.push(movie);
        // calling makeButtons which handles the processing of our movie array
        makeButtons();
    });
      // making the gifs clickable to animate
    $(document).on("click", ".gif", function() {
        
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

      makeButtons();