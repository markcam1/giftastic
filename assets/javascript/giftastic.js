
// Initial array of movies
var movies = ["GanGangnam Style", "Electric Slide", "Cha Cha Slide", "Dancing Fool"];

window.onload = function() {

  $("#add-movie").on("click", addToArray);
  $(document).on("click", ".movie", displayMovieInfo);
  $("#movies-view").on("click", ".gif", stateMaker);

  // Function for displaying movie data
  function renderButtons() {
  
    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
  
    // Loops through the array of movies
    for (var i = 0; i < movies.length; i++) {
  
      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("movie");
      // Added a data-attribute
      a.attr("data-name", movies[i]);
      // Provided the initial button text
      a.text(movies[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
};


  // This function handles events where the add movie button is clicked
  $("#add-movie").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var movie = $("#movie-input").val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

  });

  
  function addToArray() {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var movie = $("#movie-input").val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

  };



// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

  var searchTerm = $(this).attr("data-name");
  // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=1&q=";
  queryURL += searchTerm

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {

    response.data.forEach(function(gifObject) {

      var imgStill = gifObject.images.fixed_height_still.url;
      var imgMove = gifObject.images.fixed_height.url;

      var showImg = $('<img>');

      showImg.attr({
        src: imgStill,
        'data-move': imgMove,
        'data-still': imgStill,
        'data-state': "still",
        class: "gif"
      });

      $('#movies-view').prepend( showImg )
    })
    console.log(response)
  });

}

function stateMaker() {
  console.log("state")
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-move"));
    $(this).attr("data-state", "move");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};


  

  
 














