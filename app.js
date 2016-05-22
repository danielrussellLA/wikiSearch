$(document).ready(function(){

  var logo = document.getElementById('logo');
  var input = document.getElementById('input');
  var searchContainer = document.getElementById('container');
  var body = document.getElementsByTagName('body');
  var loading = document.getElementById('loading');

    console.log(input)
  /*********** Listeners *************************/
  input.oninput = function () {
    searchContainer.className = "hideSearchContainer";
    input.className = "moveUp";
    // logo.className = "hidden";
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

  // body[0].onclick = function () {
  //   searchContainer.className = "searchContainer";
  //   input.className = "searchBar";
  //   logo.className = "title";
  // }

  /************* Helpers *************************/

  function addDefaultStyle() {
    searchContainer.className = "searchContainer";
    input.className = "searchBar";
    logo.className = "title";
    loading.innerHTML = "";
  }

  function displaySearchResults (results) {

    results.forEach(function(val, index){
      setTimeout(
        function(){
          $("#searchResults").append("<div class='results'><h2>"+val.title+"</h2>"+"<p>"+val.snippet+"...</p></div>").hide().fadeIn(100, function(){console.log('should be fadin')});
        }, 300*index);
    });

  }

  function Search(text) {
    console.log(text);
    if(text.trim() !== ''){
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
          displaySearchResults(response.query.search)
          console.log(response);
        },
        error: function(response) {
          console('error...error', response);
        }
      })
    }
  }

});


