var markerLoaded = false;
var Stations = function (data) {
	this.name = ko.observable(data.name);
	this.marker = ko.observable(data.marker);
};

var ViewModel = function () {
	var self = this;
	// creating data list 
	this.locationList = ko.observableArray([]);
	MARKERS.forEach(function (stationItem) {
		self.locationList.push(new Stations(stationItem));
	})
	/*
	filter algorithm :checking for matching and set the un matched items to invisible
	*/
	this.filter = ko.observable("");
	this.filterSearch = ko.computed(function () {
		var filter = self.filter().toLowerCase();
		if (markerLoaded) {
			if (!filter) {
				showAll()
				return self.locationList();
			} else {
				clearInfo()
				return ko.utils.arrayFilter(self.locationList(), function (item) {
					var result = stringStartsWith(item.name().toLowerCase(), filter);
					if (result) {
						if (item.marker) {
							setVisible(MAPPER[item.name().split(" ")[0]], true);
						}
					} else {
						if (item.marker) {
							setVisible(MAPPER[item.name().split(" ")[0]], false);
						}
					}
					return result;
				});
			}
		} else {
			return self.locationList();
		}
	});
};
// changing the visiblity of marker 
function setVisible(index, flag) {
	chosenMarker = document.getElementById("marker_" + index)
	if (chosenMarker) {
		if (flag == false) {
			if (chosenMarker.classList[0] == "normal-marker") {
				chosenMarker.classList.remove("normal-marker")
			} else if (chosenMarker.classList[0] == "chosen-marker") {
				chosenMarker.classList.remove("chosen-marker")
			}
		} else {
			chosenMarker.className =
				'normal-marker mapboxgl-marker mapboxgl-marker-anchor-center';
		}
	}
}

// restore the marker original style
function deselected(index) {
	chosenMarker = document.getElementById("marker_" + index)
	if (chosenMarker) {
		if (chosenMarker.classList[0] == "chosen-marker") {
			chosenMarker.classList.remove("chosen-marker")
			chosenMarker.className = 'normal-marker mapboxgl-marker mapboxgl-marker-anchor-center';
		}
	}
}
// set all markersto default  style
var clearSelection = function (id) {
	for (var i = 0; i < MARKERS.length; i++) {
		if ("marker_" + i == id) {
			continue
		}
		deselected(i)
	}


}
// mae all markers visible (default state)
var showAll = function () {
	for (var i = 0; i < MARKERS.length; i++) {
		setVisible(i, true);
	}

}
var stringStartsWith = function (string, startsWith) {
	string = string || "";
	if (startsWith.length > string.length) {
		return false;
	}
	return string.substring(0, startsWith.length) === startsWith;
};
// handing list item click and update info box
var animateMarker = function (item) {
	let id = "marker_" + MAPPER[item.name().split(" ")[0]]
	clearSelection(id);
	markerHandler(id)
	getInfo(MARKERS[MAPPER[item.name().split(" ")[0]]].position)
};
var bindMarker = function(e) {	
	markerHandler(e.target.id)
}

var markerHandler = function(id) {
	chosenMarker = document.getElementById(id)	
	if(chosenMarker.classList[0]=="normal-marker"){
		chosenMarker.classList.remove("normal-marker")
		chosenMarker.className = 'chosen-marker mapboxgl-marker mapboxgl-marker-anchor-center';
		clearSelection(id)
		getInfo(MARKERS[parseInt(id.split("_")[1])].position)
		getImage(MARKERS[parseInt(id.split("_")[1])].name)
	}else{
		// marker was already chosen, so clear it's info box and it's color 
		clearInfo()
		clearSelection(null)
	}
}
// getting info of clicked item 
var getInfo = function (pos) {
	let key = "pk.eyJ1IjoiaWJyYWhpbXRhaGEiLCJhIjoiY2ptc3pyNWFhMGdlajN2bnVmNDdmOTh5cCJ9.j6C6vDOhtwYY8M5m14O5_g"
	$.ajax({
		type: "GET",
		url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${pos.lng},${pos.lat}.json?access_token=${key}`,
		dataType: 'json',
		async: true,

		success: function (data) {
			// setting the location info 
			let infoBox = document.getElementById("info-box")
			infoBox.innerHTML = `<h4 class=info-title> address:</h4>
			<p class="col-sm-12 col-md-12 info-data">${data.features[0].place_name}</p>`
		},
		error: function (XHR, textStatus, errorThrown) {
			// handlingrequest error 
			let infoBox = document.getElementById("info-box")
			infoBox.innerHTML = `<p class="col-sm-12 col-md-12 error-message">${textStatus}</p>`
			alert("error: " + textStatus);
			alert("error: " + errorThrown);
		}
	})
}

var getImage = function(name){
	var client_secret = "KRPZBXL5EKOGTEKHGTVHVJHADBO0TBHAYEUJRCHFJJMUR4TL&v=20180323"
	var client_id = "SPP3MNNQTMQVVMYDWNGVXE1QBZNITOEK25WLJB52ALQSPZ2N"
	var id = FOURSQUARE[name.split(" ")[0]]
	var url = `https://api.foursquare.com/v2/venues/${id}/photos?client_id=${client_id}&client_secret=${client_secret}`
	$.ajax({
		type: "GET",
		url: url,
		dataType: 'json',
		async: true,
		success: function (data) {
			// setting the image of pokemon 
			var imgdata = data.response.photos.items[0]
			var imgUrl = `${imgdata.prefix}${imgdata.width}x${imgdata.height}${imgdata.suffix}`
			let imagePopup = document.getElementById("description_"+ name.split(" ")[0])
			imagePopup.setAttribute("src", imgUrl)
		},
		error: function (XHR, textStatus, errorThrown) {
			// handlingrequest error 
			let infoBox = document.getElementById("info-box")
			infoBox.innerHTML = `<p class="col-sm-12 col-md-12 error-message">${textStatus}</p>`
			alert("error: " + textStatus);
			alert("error: " + errorThrown);
		}
	})

}

var clearInfo = function () {
	let infoBox = document.getElementById("info-box")
	infoBox.innerHTML = `<p class="col-sm-12 col-md-12">${""}</p>`
}

var vm = new ViewModel();
ko.applyBindings(vm);
