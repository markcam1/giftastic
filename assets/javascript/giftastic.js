
var topics = ["GanGangnam Style", "Electric Slide", "Do the Twist", "Macarena"];

window.onload = function() {

  $("#add-movie").on("click", addToArray);
  $(document).on("click", ".movie", displayMovieInfo);
  $("#highway").on("click", ".gifbox", stateMaker);
  $("#favroad").on("click", ".gifbox", stateMaker);
  $("#highway").on("click", ".btn-xs", favoritesAdder);
  $("#favroad").on("click", ".btn-xs", favKiller);

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
    
    var favBtnId = $(this).attr("data-btnid");
    var favImgId = "#" + favBtnId;
    var favImgProps = $(favImgId).attr('data-play', 'src');

    console.log(favImgProps);
    var favData = favImgProps[0].outerHTML;
  
    var favKeep = JSON.parse(localStorage.favKeep || "[]")
  
    favKeep.push(favData)
  
    localStorage.favKeep = JSON.stringify(favKeep)
  
    loadFavsOnPage()
  }
  

  function loadFavsOnPage() {
    console.log("loader")

    var favKeep = JSON.parse(localStorage.favKeep || "[]")
    $("#favroad").empty();
  
    favKeep.forEach(function(value, index, arrayV) {

      console.log(value + " : " + index)

      var favShow = $("<div>").append(value).attr("id", "item-" + index)

      // var rmvFavBtn = $("<div class='btn btn-danger btn-xs'>").text("remove");
      var rmvFavBtn = $("<br><div class='btn btn-danger btn-xs'>").text("remove");

      rmvFavBtn.attr({'data-removeid': index});

      favShow.append(rmvFavBtn);

      $("#favroad").prepend( favShow );
  
    })
  }
  
  loadFavsOnPage()

  function favKiller () {

    var indexFav = $(this).attr("data-removeid");

    var favKeep = JSON.parse(localStorage.favKeep);
    
    favKeep.splice(indexFav, 1);

    localStorage.favKeep = JSON.stringify(favKeep);

    loadFavsOnPage();
  };

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

      var addFavBtn = $("<br><div class='btn btn-info btn-xs'>").text("favs");
      var dwnBtn = $("<a>").text("Download"); 

      var dwnlink1 = 'https://media.giphy.com/media/';
      var dwnId = dwnlink1 + gifid;
      var fullDwnLink = dwnId + '/giphy.gif';

      dwnBtn.attr({
        // 'href': imgMove,
        // 'download': imgMove,
        'href': fullDwnLink,
        'download': "file.gif"
      });

      showImg.attr({
        src: imgStill,
        'data-move': imgMove,
        'data-still': imgStill,
        'data-state': "still",
        'data-play': "play1",
        class: "gifbox",
        id: gifid
      });

      addFavBtn.attr({
        'data-btnid': gifid
      });

      p2.append(addFavBtn);
      p2.append(dwnBtn);
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







  

  
 














