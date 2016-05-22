$(document).ready(function(){

  var logo = document.getElementById('logo');
  var input = document.getElementById('input');
  var searchContainer = document.getElementById('container');
  var body = document.getElementsByTagName('body');
  var loading = document.getElementById('loading');

  /*********** Listeners *************************/

  input.oninput = function () {
    searchContainer.className = "hideSearchContainer";
    input.className = "moveUp";

    $('#logo').remove();
    loading.innerHTML = "<img src='./assets/loading.gif' class='loading'>";
    if(input.value === ''){
      $('#logoContainer').append("<h1 id='logo' class='title' alt='WikiSearch' aria='wikisearch'>wiki<span class='blue'>Search</span></h1>");
      $(".results").remove();
      addDefaultStyle();
    } else {
      Search(input.value);
    }
  }

  /************* Helpers *************************/

  function addDefaultStyle() {
    searchContainer.className = "searchContainer";
    input.className = "searchBar";
    logo.className = "title";
    $("#logo").hide().fadeIn(600);
    loading.innerHTML = "";
  }

  function displaySearchResults (results) {
      results.forEach(function(val, index){
        var result  = $("<div class='results'><h2>"+val.title+"</h2>"+"<p>"+val.snippet+" . . .</p></div>")
        $("#searchResults").append(result.hide().fadeIn(300 + index * 300));
      });
  }

  function Search(text) {
      $.ajax( {
        url: "https://en.wikipedia.org/w/api.php",
        jsonp: "callback",
        dataType: 'jsonp',
        data: {
            action: "query",
            list: "search",
            generator: "allcategories",
            gacprefix: "Sample",
            prop: 'info',
            srsearch: text,
            format: "json"
        },
        xhrFields: { withCredentials: true },
        success: function(response) {
          $(".results").remove();
          loading.innerHTML = "";
          if(input.value !== ""){
            displaySearchResults(response.query.search);
          }
        },
        error: function(response) {
          console('error...error', response);
        }
      })
  }

});


