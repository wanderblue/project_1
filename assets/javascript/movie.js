//function to make the button shake using animate library
$(function(){
  $('button').on('click', function (){
      $('button').addClass('animated shake');
  });
 }); 

//display this when no movie title is found
function displayFalse(){
  $("#failedSearch").show();
  $("#searchTable").hide();

}

//function to use to pull from itunes API
function loadAjax(title, posterSrc, mYear) {
  $.ajax({
    url: `https://itunes.apple.com/search?term=${title}+movie&country=us&limit=10`,
    method: "GET",
  }).done(function(newResponse) {
    var newResults = JSON.parse(newResponse).results[0].previewUrl;
    var description = JSON.parse(newResponse).results[0].longDescription
    // console.log(newResults);
    // console.log(newResponse);
    // console.log(description);
    //the description is undefined, replace it
    if (description === undefined) {
      
      $("#added-movie > tbody").append("<tr><td>" + "<img src=" + posterSrc + " width=100px height=150px>" + "</img>" + "</td><td>" + title + "</td><td>" +
      mYear + "</td><td>"+ "<video src=" + newResults + " width=320 height=200 controls preload></video>"+ "</td><td>"+ "We don't have a description available for this movie right now, but please enjoy this song associated to the movie."+"</td></tr>");
    }//else do this
    else {
      $("#added-movie > tbody").append("<tr><td>" + "<img src=" + posterSrc + " width=100px height=150px>" + "</img>" + "</td><td>" + title + "</td><td>" +
      mYear + "</td><td>"+ "<video src=" + newResults + " width=320 height=200 controls preload></video>"+ "</td><td>"+ description+"</td></tr>");
    }
  });
}


// This .on("click") function will trigger the AJAX Call
document.querySelector("#movieSearch").addEventListener("click", function(event) {

  // event.preventDefault() can be used to prevent an event's default behavior.
  // Here, it prevents the submit button from trying to submit a form when clicked
  event.preventDefault();

  //display table

  // Here we grab the text from the input box
  var movie = document.querySelector("#searchTerm").value;
    //get the value of the search 
    $("#searchTerm").val("");
    // Here we construct our URL
    var queryURL = `https://www.omdbapi.com/?s=${movie}&apikey=598a871e`;
    $.ajax({
      url: queryURL,
      method: "GET"
      }).done(function(response) {
        //do this if the response returns false
        if(response.Response === "False") {
          displayFalse();
        }
        //else do this
        else{
          //show search table, empty the content on each new search and hide the failed search
          $(".content").empty();
          $("#failedSearch").hide();
          $("#searchTable").show();
          //loop through the search results
          for (var i = 0; i < 10; i++) {
            var title = response.Search[i].Title;
            var posterSrc = response.Search[i].Poster;
            var mYear = response.Search[i].Year;
            //function to get itunes info based on Title and display everything in one line
            loadAjax(title, posterSrc, mYear)
            // console.log(response)
            // console.log(Title)
        };
      }
    });
});