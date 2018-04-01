
var topics = ["GanGangnam Style", "Electric Slide", "Do the Twist", "Macarena"];

window.onload = function() {

  $("#add-movie").on("click", addToArray);
  $(document).on("click", ".movie", displayMovieInfo);
  $("#highway").on("click", ".gifbox", stateMaker);
  $("#highway").on("click", ".btn-xs", favoritesAdder);

  // Function for displaying movie data
  function renderButtons() {
  
    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
  
    for (var i = 0; i < topics.length; i++) {
  
      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button class='btn btn-default'>");
      // Adds a class of movie to our button
      a.addClass("movie");
      // Added a data-attribute
      a.attr("data-name", topics[i]);
      // Provided the initial button text
      a.text(topics[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }
  renderButtons();
  function addToArray() {
    event.preventDefault();
    var newData = $("#movie-input").val().trim();
    topics.push(newData);
    renderButtons();
  };

  function favoritesAdder(){
    console.log("in favs maker");
  
    var favBtnId = $(this).attr("data-imgid")
  
    console.log(favBtnId);
  
    var favKeep = JSON.parse(localStorage.favKeep || "[]")
  
    favKeep.push(favBtnId)
  
    localStorage.favKeep = JSON.stringify(favKeep)
  
    loadFavsOnPage()
  
  }

  function loadFavsOnPage() {

    var favKeep = JSON.parse(localStorage.favKeep || "[]")
    console.log("loader")
  
    //get image from id; or save entire image (state) in button; or add gif id to div and move div to favs
    favKeep.forEach(function(value, index, arrayV) {
      var toDoItem = $("<p>").text(" " + value).attr("id", "item-" + index)
  
      var toDoClose = $("<button>").attr("data-to-do", index)
      toDoClose.addClass("checkbox").text("ðŸ’ª")
  
      toDoItem.prepend(toDoClose)
  
      $("#to-dos").append(toDoItem)
  
    })
  }
  
  loadFavsOnPage()

};


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

  var searchTerm = $(this).attr("data-name");
  // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=3&q=";
  queryURL += searchTerm

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    
    var newFlex = $("<div class='giftruck flex-grow'>");

    response.data.forEach(function(gifObject) {
      
      var newDiv = $("<div class='gifpallet'>");
      var imgStill = gifObject.images.fixed_height_still.url;
      var imgMove = gifObject.images.fixed_height.url;
      var rating = gifObject.rating;
      var title = gifObject.title;
      var impDate = gifObject.import_datetime
      var gifid = gifObject.id;
      var p = $("<p class='pee'>").text("Name: " + title + " | Rating: " + rating);
      var p2 = $("<p>").text("Date: " + impDate);
      var showImg = $('<img>');

      var addFavBtn = $("<div class='btn btn-default btn-xs'>").text("favs");

      showImg.attr({
        src: imgStill,
        'data-move': imgMove,
        'data-still': imgStill,
        'data-state': "still",
        class: "gifbox",
        'data-imgid': gifid
      });

      addFavBtn.attr({
        'data-imgid': gifid
      });

      p2.append(addFavBtn);
      p.append(p2);
      newDiv.prepend(p);
      newDiv.prepend(showImg);
      newFlex.append(newDiv);
      $("#highway").prepend( newFlex )
    })
    console.log(response)
  });
}

function stateMaker() {
  console.log("state")
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-move"));
    $(this).attr("data-state", "move");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};







  

  
 














