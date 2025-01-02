// Initialize map (using Google Maps API example)
function initMap() {
const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: -11.2027, lng: 17.8739 },
  zoom: 5,
    });

// Function to add a marker and info window
function addMarker(data) {
      const marker = new google.maps.Marker({
      position: {lat: parseFloat(data.lat), lng: parseFloat(data.long)},
    map: map,
      title: `Client Type:${data.clientType}, DL:${data.dl}, UL:${data.ul}`,
      });

    marker.addListener("click", () => {
    var contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
       `<h1 id="firstHeading" class="firstHeading">Client Data</h1>`+
      '<div id="bodyContent">' +
      `<p><b>Client Type:</b> ${data.clientType}</p>`+
      `<p><b>GPS (Lat, Long, Elevation):</b> ${data.lat}, ${data.long}, ${data.elevation}</p>`+
      `<p><b>Internet Speed (DL, UL):</b> ${data.dl}, ${data.ul}</p>`+
      "</div>" +
      "</div>";


        const infowindow = new google.maps.InfoWindow({
        content: contentString,
        });
     infowindow.open(map, marker);
      });
      return marker;
    }
// Make a GET request to load the data from the server
 fetch('/data').then((response)=> response.json()).then((data)=> {
  data.forEach((item) => {
    addMarker(item);
  })
})
}
// Load the map
window.initMap = initMap;
