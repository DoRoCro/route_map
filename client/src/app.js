var MapWrapper = require('./mapWrapper.js')
var Route = require('./models/route.js')
var mainMap;
var Page = require('./views/setup_page.js')
var Sidebar = require('./views/sidebar.js')


var app = function () {
  localStorage.clear()

  var page = new Page()
  page.setupButtons()
  // page.map.mainMap.placesService({lat: 55.953251, lng: -3.188267}, 5500, "restaurant")


  // TODO - move this to make_requests.js

  var makeRequest = function (url, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.onload = callback
    request.send()
  }

  // SIDEBAR

  var sidebar = new Sidebar()
  sidebar.populateList(makeRequest)
  sidebar.sidebarHTMLObject.style.display = 'none';


  var wishlistRevealButton = document.querySelector('#wishlist-button');
  wishlistRevealButton.addEventListener('click', sidebar.revealWishlist);
}

window.onload = app
