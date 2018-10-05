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
	this.showMarkerInfo = function (item) {
		clearSelection();
		let id = "marker_" + MAPPER[item.name().split(" ")[0]]
		let clickedPlace = document.getElementById(id)
		clickedPlace.click();
	};
	// Filter Function (includes Marker functions that are handled via Knockout's computed observable)
	this.filter = ko.observable("");
	// Computed observable from Knockout which filters out arrays and markers from the input
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
		let classes = chosenMarker.classList
		if (chosenMarker.classList[0] == "normal-marker") {
			chosenMarker.classList.remove("normal-marker")
			chosenMarker.className = 'chosen-marker mapboxgl-marker mapboxgl-marker-anchor-center';
		}
	}
}
function deselected(index) {
	chosenMarker = document.getElementById("marker_" + index)
	if (chosenMarker) {
		let classes = chosenMarker.classList
		if (chosenMarker.classList[0] == "chosen-marker") {
			chosenMarker.classList.remove("chosen-marker")
			chosenMarker.className = 'normal-marker mapboxgl-marker mapboxgl-marker-anchor-center';
		}
	}
}
var clearSelection = function () {
	for (var i = 0; i < MARKERS.length; i++) {
		deselected(i)
	}
}
var showAll = function() {
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

var vm = new ViewModel();
ko.applyBindings(vm);
