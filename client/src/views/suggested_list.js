var SuggestionList = function (passedPage) {
  this.sidebarHTMLObject = document.querySelector('#suggested-routes')
  this.suggestionListHidden = true;
  this.page = passedPage;
}

SuggestionList.prototype = {

  populateList: function (getAllRoutes) {
    var suggestedlistUL = document.querySelector('#suggested-list')
    
    while (suggestedlistUL.hasChildNodes()) {
        suggestedlistUL.removeChild(suggestedlistUL.lastChild);
    }

    var suggestionsListScope = this;

    var returnedList = getAllRoutes('http://localhost:3000/api/suggested_routes', function () {
      var parsedList = JSON.parse(this.response)
      parsedList.forEach(function (element) {
        var newLi = document.createElement('li')

        newLi.innerText = 'Name of Route:\n' + element.name + ' \n' + element.googleResponse.travelMode

        var newBr = document.createElement('br')
        newLi.appendChild(newBr)

        var buttonsDiv = document.createElement('div')
        var divP = document.createElement('p')
        buttonsDiv.appendChild(divP)

        var doneButton = document.createElement('button')
        doneButton.id = 'doneButton'
        doneButton.innerText = 'Done'
        doneButton.onclick = function () {
          newLi.style.textDecoration = 'line-through'
        }

        var displayRoute = document.createElement('button');
        displayRoute.id = 'suggestionsDisplayRouteButton'
        displayRoute.innerText = "Display Route"

        displayRoute.addEventListener('click', function(){
          var mainMap = suggestionsListScope.page.map.mainMap;
          mainMap.drawRoute(element.googleResponse)

          // Display reviews for that route

          console.log(element)

          var reviewsDiv = document.querySelector('#reviews-info');
          reviewsDiv.style.display = 'inline'
          var reviewsHTMLObject = document.querySelector('#review-list');


          while (reviewsHTMLObject.hasChildNodes()) {
              reviewsHTMLObject.removeChild(reviewsHTMLObject.lastChild);
          }

          element.reviews.forEach(function(reviewItem){
            var reviewLi = document.createElement('li');
            var reviewP = document.createElement('p');
            reviewLi.innerText = reviewItem.name;
            reviewP.innerText = reviewItem.reviewText;
            reviewsHTMLObject.appendChild(reviewLi)
            reviewsHTMLObject.appendChild(reviewP)  
          })

          


        })

        newLi.appendChild(divP)
        newLi.appendChild(displayRoute)
        newLi.appendChild(doneButton)
        suggestedlistUL.appendChild(newLi)

        var listBr = document.createElement('br')
        suggestedlistUL.appendChild(listBr)
      })
    })
  },

  revealList: function () {
    var suggestionList = document.querySelector('#suggested-routes')
    if (suggestionList.style.display === 'inline-block') {
      suggestionList.style.display = 'none'
    } else if (suggestionList.style.display === 'none') {
      suggestionList.style.display = 'inline-block'
    }
  }
}

module.exports = SuggestionList
