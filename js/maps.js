var map;
var marker;
var markersArray = {};
var finalContent;


function initMap() {
	// initializing the map with center and access token 
	mapboxgl.accessToken = 'pk.eyJ1IjoiaWJyYWhpbXRhaGEiLCJhIjoiY2ptc3pyNWFhMGdlajN2bnVmNDdmOTh5cCJ9.j6C6vDOhtwYY8M5m14O5_g';
	var map = new mapboxgl.Map({
			container: 'map',
			minZoom:5,
			maxZoom:15,
			style: 'mapbox://styles/mapbox/satellite-streets-v10',
			doubleClickZoomboolean: true,
			center: CURRENT_LOCATION

	});
	// adding markers to map 
	for (var i = 0; i < MARKERS.length; i ++) {
		// image shown in popup
		var popupContent = `<img class="description" id=description_${MARKERS[i].name.split(" ")[0]} alt="loading image">`
		var popup = new mapboxgl.Popup()
		.setHTML(popupContent);
		var el = document.createElement('div');
		el.className = "normal-marker"
		el.setAttribute("id", `marker_${i}`);
		// click event to handle changing the color on marker click 
		el.addEventListener('click', bindMarker)
		//binding makers to map 
		var marker = new mapboxgl.Marker(el)
		.setLngLat(MARKERS[i].position)
		.setPopup(popup)
		.addTo(map);
	}
	// flag that map is ready 
	markerLoaded = true;

}

initMap()
