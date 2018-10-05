var map;
var marker;
var markersArray = {};
var finalContent;
var markerLoaded = false;

function initMap() {
	mapboxgl.accessToken = 'pk.eyJ1IjoiaWJyYWhpbXRhaGEiLCJhIjoiY2ptc3pyNWFhMGdlajN2bnVmNDdmOTh5cCJ9.j6C6vDOhtwYY8M5m14O5_g';
	var map = new mapboxgl.Map({
			container: 'map',
			minZoom:5,
			maxZoom:15,
			style: 'mapbox://styles/mapbox/satellite-streets-v10',
			doubleClickZoomboolean: true,
			center: CURRENT_LOCATION

	});
	for (var i = 0; i < MARKERS.length; i ++) {
		var popupContent = `<h3 id = "poopup">Reykjavik Roasters</h3><p>A good coffee shop${i}</p>`
		var popup = new mapboxgl.Popup()
		.setHTML(popupContent);
		var el = document.createElement('div');
		el.className = "normal-marker"
		el.setAttribute("id", `marker_${i}`);
		el.addEventListener('click', function(e) {	
			chosenMarker = document.getElementById(e.target.id)	
			let classes = chosenMarker.classList
			if(chosenMarker.classList[0]=="normal-marker"){
				chosenMarker.classList.remove("normal-marker")
				chosenMarker.className = 'chosen-marker mapboxgl-marker mapboxgl-marker-anchor-center';
				clearSelection(e.target.id)
			}else{
				clearSelection(null)
			}
		})
		var marker = new mapboxgl.Marker(el)
		.setLngLat(MARKERS[i].position)
		.setPopup(popup)
		.addTo(map);
	}
	markerLoaded = true;

	function infoWindowListener(marker) {
		console.log("hamadas");
		infoWindow.addListener('closeclick', function() {
			marker.setAnimation(null);
		});
	}
}

initMap()
