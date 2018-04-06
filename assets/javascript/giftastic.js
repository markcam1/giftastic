
var topics = ["GanGangnam Style", "Electric Slide", "Do the Twist", "Macarena"];

window.onload = function() {

  $("#add-gif").on("click", addToArray);
  $(document).on("click", ".gif", displayGifs);
  $("#highway").on("click", ".gifbox", stateMaker);
  $("#favroad").on("click", ".gifbox", stateMaker);
  $("#highway").on("click", ".btn-info", favoritesAdder);
  $("#favroad").on("click", ".btn-xs", favKiller);

  // Function for displaying gifs
  function renderButtons() {
  
    $("#buttons-view").empty();
  
    for (var i = 0; i < topics.length; i++) {  
      var a = $("<button class='btn gold'>");
      a.addClass("gif");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#buttons-view").append(a);
    }
  }
  renderButtons();
  function addToArray() {
    event.preventDefault();
    var newData = $("#gif-input").val().trim();
    topics.push(newData);
    renderButtons();
  };

  //adding favorites
  function favoritesAdder(){    
    var favBtnId = $(this).attr("data-btnid");
    var favImgId = "#" + favBtnId;
    var favImgProps = $(favImgId).attr('data-play', 'src');
    var favData = favImgProps[0].outerHTML;
    var favKeep = JSON.parse(localStorage.favKeep || "[]")
    favKeep.push(favData)
    localStorage.favKeep = JSON.stringify(favKeep)
    loadFavsOnPage()
  }
  

  function loadFavsOnPage() {
    var favKeep = JSON.parse(localStorage.favKeep || "[]")
    $("#favroad").empty();
    favKeep.forEach(function(value, index, arrayV) {
      var favShow = $("<div>").append(value).attr("id", "item-" + index)
      var rmvFavBtn = $("<br><div class='btn btn-danger btn-xs'>").text("remove");
      rmvFavBtn.attr({'data-removeid': index});
      favShow.append(rmvFavBtn);
      $("#favroad").prepend( favShow );
    })
  }
  
  loadFavsOnPage()

  //removing favorites
  function favKiller () {
    var indexFav = $(this).attr("data-removeid");
    var favKeep = JSON.parse(localStorage.favKeep);
    favKeep.splice(indexFav, 1);
    localStorage.favKeep = JSON.stringify(favKeep);
    loadFavsOnPage();
  };
};

function displayGifs() {
  var searchTerm = $(this).attr("data-name");
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
      var p = $("<p class='pone'>").text("Name: " + title + " | Rating: " + rating);
      var p2 = $("<p class='pone'>").text("Date: " + impDate);
      var showImg = $('<img>');

      var addFavBtn = $("<br><div class='btn btn-info btn-xs'>").text("favs");
      
      var dwnBtn = $("<a>"); //.attr('download');      
      var btnData = $('<button download>').text("Download"); 

      var dwnlink1 = ' https://giphy.com/gifs/style-';
      var dwnId = dwnlink1 + gifid;
      var fullDwnLink = dwnId + '/download';

      dwnBtn.attr({
        'href': fullDwnLink,
        'target': '_blank'
      });

      btnData.attr({
        'type': 'button',
        'class': 'btn btn-success btn-xs'
      })

      dwnBtn.append(btnData);

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
  });
}

function stateMaker() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-move"));
    $(this).attr("data-state", "move");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};









  

  
 














