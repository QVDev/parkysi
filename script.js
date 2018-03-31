var searchQuery = document.getElementById('searchQuery');
var queryResult = document.getElementById("queryResult");

var headerIcon = '<img src="https://cdn.glitch.com/547ca242-c982-433f-b57a-660f61ce955b%2Ftransport%20(1).svg?1522455440650" height="25px">';
var headerCount = "Spots";
var headerZipcode = "Zip code";
var headerStreet = "Street";
var headerCity = "City";

document.addEventListener('DOMContentLoaded', function() {
  searchQuery.focus();
  search();
  initInfo();
  
}, false);

searchQuery.oninput = function() {
  search();
}

//TODO get from backend
var parkings = '{ "spots" : [' +
'{ "zipcode":"1073BD" , "street":"Albert Cuypstraat", "city":"Amsterdam", "count":"2" },' +
'{ "zipcode":"08025" , "street":"Carrer del Rosselló", "city":"Barcelona", "count":"1" },' +
'{ "zipcode":"EC4M 7LS" , "street":"Paternoster Rowt", "city":"London", "count":"1" },' +
'{ "zipcode":"NY10007" , "street":"Greenwich St.", "city":"New York", "count":"5" },' + 
'{ "zipcode":"CA94103" , "street":"Mission St.", "city":"San Francisco", "count":"3" },' +
'{ "zipcode":"10119" , "street":"Kastanienallee", "city":"Berlin", "count":"1" }]}';

function search() {
  clearResult();
  searchQuery.focus();
  console.log(searchQuery.value);
  searchSpace(searchQuery.value);
};

function clearResult() {
  var header = '<li class="table-header">'
  var col1 = '<div class="col col-1">{0}</div>';
  var col2 = '<div class="col col-2">{0}</div>';
  var col3 = '<div class="col col-3">{0}</div>';
  var col4 = '<div class="col col-4">{0}</div>';
  var col5 = '<div class="col col-5">{0}</div>';
  var end = '</li>';
  queryResult.innerHTML = header + col1.format(headerIcon) + col2.format(headerCount) + col3.format(headerZipcode) + col4.format(headerStreet) + col5.format(headerCity) + end;
}

function searchSpace(zipcode) {
  var zipcode = zipcode.toLowerCase();
  var parsedParkings = JSON.parse(parkings);
  
  var result =  parsedParkings.spots.filter(function (el) {
    return (
      (el.zipcode.toLowerCase().includes(zipcode) ||
      el.street.toLowerCase().includes(zipcode)) ||
      el.city.toLowerCase().includes(zipcode)
    );
  });
  
  var col1 = '<div class="col-1" data-label="">{0}</div>';
  var col2 = '<div class="col-2" data-label="">{0}</div>';
  var col3 = '<div class="col-3" data-label="">{0}</div>';
  var col4 = '<div class="col-4" data-label="">{0}</div>';
  var col5 = '<div class="col-4" data-label="">{0}</div>';

  
  for(var i = 0; i < result.length ; i++) {      
    var entry = document.createElement('li');
    var item = result[i];
    entry.className = "table-row";
    entry.innerHTML = col1.format(headerIcon) + col2.format(item.count) + col3.format(item.zipcode) + col4.format(item.street) + col5.format(item.city);
    queryResult.appendChild(entry);
  }
}

String.prototype.format = function()
{
   var content = this;
   for (var i=0; i < arguments.length; i++)
   {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);  
   }
   return content;
};

var close = document.getElementById("popupclose");
var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");

function initInfo() {
   close.onclick = function() {closePopup();}
}

function closePopup() {
    overlay.style.display = 'none';
    popup.style.display = 'none';  
}

// Show Overlay and Popup
function openPopup() {
  overlay.style.display = 'block';
  popup.style.display = 'block';
  window.scrollTo(0, 0);
}
