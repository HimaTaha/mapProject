var Stations = function (data) {
	this.name = ko.observable(data.name);
	this.marker = ko.observable(data.marker);
};

var ViewModel = function () {
	var self = this;
	this.locationList = ko.observableArray([]);
	MARKERS.forEach(function (stationItem) {
		self.locationList.push(new Stations(stationItem));
	})
	this.animateMarker = function (item) {
		let id = "marker_" + MAPPER[item.name().split(" ")[0]]
		clearSelection(id);
		let clickedPlace = document.getElementById(id)
		clickedPlace.click();
		console.log(MARKERS[MAPPER[item.name().split(" ")[0]]]);
		
		getInfo(MARKERS[MAPPER[item.name().split(" ")[0]]].position)
	};
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
function selected(index) {
	chosenMarker = document.getElementById("marker_" + index)
	if (chosenMarker) {
		if (chosenMarker.classList[0] == "normal-marker") {
			chosenMarker.classList.remove("normal-marker")
			chosenMarker.className = 'chosen-marker mapboxgl-marker mapboxgl-marker-anchor-center';
		}
	}
}
function deselected(index) {
	chosenMarker = document.getElementById("marker_" + index)
	if (chosenMarker) {
		if (chosenMarker.classList[0] == "chosen-marker") {
			chosenMarker.classList.remove("chosen-marker")
			chosenMarker.className = 'normal-marker mapboxgl-marker mapboxgl-marker-anchor-center';
		}
	}
}
var clearSelection = function (id) {
	for (var i = 0; i < MARKERS.length; i++) {
		if ("marker_" + i == id) {
			continue
		}
		deselected(i)
	}

}
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

var getInfo = function (pos) {
	let key = "pk.eyJ1IjoiaWJyYWhpbXRhaGEiLCJhIjoiY2ptc3pyNWFhMGdlajN2bnVmNDdmOTh5cCJ9.j6C6vDOhtwYY8M5m14O5_g"
	$.ajax ({
        type: "GET",
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${pos.lng},${pos.lat}.json?access_token=${key}`,
        dataType: 'json',
        async: true,

        success: function (data) {
            //successful authentication here
			console.log(data.features[0]);
			let infoBox = document.getElementById("info-box")
		infoBox.innerHTML = `<p class="col-sm-12 col-md-12">${data.features[0].place_name}</p>`
        },
        error: function(XHR, textStatus, errorThrown) {
            alert("error: " + textStatus);
            alert("error: " + errorThrown);
        }
    })
}

var vm = new ViewModel();
ko.applyBindings(vm);
