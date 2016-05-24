var app;

$(function(){
  app = {};

  var logo = document.getElementById('logo');
  var input = document.getElementById('input');
  var searchContainer = document.getElementById('container');
  var body = document.getElementsByTagName('body');
  var loading = document.getElementById('loading');

  var state = {
    blankSearchBar: 1,
    categories: 2,
    specificSubject: 3
  }

  var currentState = 2;

  /*********** Listeners (jQuery) *************************/

  input.oninput = function () {
    searchContainer.className = "hideSearchContainer";
    input.className = "moveUp";
    $('#logo').remove();
    loading.innerHTML = "<img src='./assets/loading.gif' class='loading'>";
    if(input.value === ''){
      $('#logoContainer').append("<h1 id='logo' class='title' alt='WikiSearch' aria='wikisearch'>wiki<span class='blue'>Search</span></h1>");
      $(".results").remove();
      app.addDefaultStyle();
      currentState = state.blankSearchBar;
    } else {
      app.searchFor(input.value);
    }
  }

  $('#form').submit(function(e){
    e.preventDefault();
    searchContainer.className = "hideSearchContainer";
    input.className = "moveUp";
    $('#logo').remove();
    currentState = state.blankSearchBar;
    app.searchFor(input.value);
  })
  // input.onsubmit()

  $.fn.center = function () {
    this.css("margin-left", ( $(window).width() - (this.width() - 75) ) / 2 + "px");
  }

  // center search container on page load
  $('.searchContainer').center()

   $.fn.resultsCenter = function () {
    this.css("margin-left", ( $(window).width() - (this.width() - 1) ) / 2 + "px");
  }

  window.onresize = function(){
    $('.searchContainer').center()
    $('.hideSearchContainer').center()
    $('#searchResults').resultsCenter()
    if(window.innerWidth > 650){
      $('.results').css("width", "600px")
    }
    if(window.innerWidth < 650){
      $('.results').css("width", "380px")
    }
  }

  $('#searchResults').on('click', 'div', function(){
    if(currentState === state.categories){
      // loading.className = 'loading'
      loading.innerHTML = "<img src='./assets/loading.gif' class='loading'>";
      app.searchForCategory(this.innerHTML);
      currentState = state.specificSubject;
    } else if (currentState === state.specificSubject){
      $('a')[0].click();
    }
  });
  /************* Helpers *************************/

  // app.redirectTo = function(html) {
  //   $(html).on('click' ,function(){
  //     console.log($('a')[0].click());
  //   });
  // }

  // adds default styles to all elements on the page
  app.addDefaultStyle = function() {
    searchContainer.className = "searchContainer";
    input.className = "searchBar";
    logo.className = "title";
    $("#logo").hide().fadeIn(600);
    loading.innerHTML = "";
  }

  app.displaySearchResults = function(results) {
    // display all results and give them a delayed fade-in by index
    results.forEach(function(val, index){
      var result  = $("<div class='results' alt='"+val['*']+"' aria='"+val['*']+"'><h2>"+val['*']+"</h2>"+"</div>")
      $("#searchResults").append(result.hide().fadeIn(300));
    });
    // center results & searchResults container
    window.onresize();
    $('#searchResults').resultsCenter();
    // give the last result a little margin-bottom so people can see it clearly
    $('.results:last').css('margin-bottom', '50px');
  }

  app.displaySearchCategoryResults = function(results) {
    // display all results and give them a delayed fade-in by index
    results.forEach(function(val, index){
      var link = JSON.stringify('https://en.wikipedia.org/wiki/' + val.title);
      var result  = $("<div class='results' alt='"+val.title+"' aria='"+val.title+"'><a id='link' href="+link+">"+val.title+"</a><p>"+val.snippet+"...</p></div>");
      $("#searchResults").append(result.hide().fadeIn(300));
    });
    // center results & searchResults container
    window.onresize();
    $('#searchResults').resultsCenter();
    // give the last result a little margin-bottom so people can see it clearly
    $('.results:last').css('margin-bottom', '50px');
  }

  // TODO - search by category. click through to wikipedia
  app.searchFor = function(text) {
      $.ajax( {
        url: "https://en.wikipedia.org/w/api.php",
        jsonp: "callback",
        dataType: 'jsonp',
        data: {
            action: "query",
            list: "allcategories",
            acprefix: text,
            aclimit: 100,
            format: "json"
        },
        xhrFields: { withCredentials: true },
        success: function(response) {
          console.log('wikipedia response:', response)
          $(".results").remove();
          loading.innerHTML = "";
          if(input.value !== ""){
            currentState = state.categories;
            app.displaySearchResults(response.query.allcategories);
          }
        },
        error: function(response) {
          console('Error in finding results', response);
        }
      })
  }

  app.searchForCategory = function(text) {
      var regex = /<\/?h2>+/;
      var first = text.replace(regex, '');
      var second = first.replace(regex, '');
      console.log(second);
      $.ajax( {
        url: "https://en.wikipedia.org/w/api.php",
        jsonp: "callback",
        dataType: 'jsonp',
        data: {
            action: "query",
            list: "search",
            generator: "allcategories",
            gacprefix: "Sample",
            prop: 'info, id',
            srsearch: second,
            format: "json"
        },
        xhrFields: { withCredentials: true },
        success: function(response) {
          console.log('wikipedia response:', response)
          $(".results").remove();
          loading.innerHTML = "";
          if(input.value !== ""){
            currentState = state.specificSubject;
            app.displaySearchCategoryResults(response.query.search);
          }
        },
        error: function(response) {
          console('Error in finding results', response);
        }
      });
  }

});


