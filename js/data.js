var MARKERS = [
	{ name: "Karnak", position: { lat: 25.719434, lng: 32.659545 } },
	{ name: "Valley of the Kings", position: { lat: 25.740203, lng: 32.601791 } },
	{ name: "Aswan", position: { lat: 24.090178, lng: 32.899677 } },
	{ name: "Abu Simbel temples", position: { lat: 22.337887, lng: 31.6271728 } },
	{ name: "Egyptian Museum Cairo", position: { lat: 30.048831, lng: 31.235280 } },
	{ name: "Siwa Oasis", position: { lat: 29.205631, lng: 25.519971 } },
	{ name: "Alexandria", position: { lat: 31.235792, lng: 29.948900 } },
	{ name: "Hurghada", position: { lat: 27.252378, lng: 33.803864 } },
	//	{name: "Sharm El-Sheikh", position: {lat:27.911318,lng:34.321621}}
];

var CURRENT_LOCATION = [34.321621, 27.911318];

var MAPPER = {
	Karnak: 0,
	Valley: 1,
	Aswan: 2,
	Abu: 3,
	Egyptian: 4,
	Siwa: 5,
	Alexandria: 6,
	san: 7,
	Hurghada: 8
}

var FOURSQUARE = {
	Karnak: "4c3ad5674565e21e42be556a",
	Valley: "4bc43686abf49521f2bdc493",
	Aswan: "4d174e9b816af04d204b4ec2",
	Abu: "4cc0ff6667a3b1f7651bc60e",
	Egyptian: "4b653727f964a5203ee92ae3",
	Siwa: "51127a6ce4b023bbb3f68695",
	Alexandria: "4e29dce3aeb745b1fab215f8",
	Hurghada: "5378dcaf498ef60a218a65f8"
}
