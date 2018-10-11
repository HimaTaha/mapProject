var MARKERS = [
	{ name: "Karnak", position: { lat: 25.719434, lng: 32.659545 }, descriptions: "https://img.purch.com/w/640/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzAzMy85OTkvaTAyL3NodXR0ZXJzdG9ja181ODA0MTcuanBnPzEzNTQzMjA2MDQ" },
	{ name: "Valley of the Kings", position: { lat: 25.740203, lng: 32.601791 }, descriptions: "https://www.tripsavvy.com/thmb/d88RE1-qpYVKNeirnXct91UtHL4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-523409425-5abcfdc6eb97de0036705019.jpg" },
	{ name: "Abu Simbel temples", position: { lat: 22.337887, lng: 31.6271728 }, descriptions: "https://cdn.britannica.com/s:700x450/49/189749-004-D29111A8.jpg" },
	{ name: "Egyptian Museum Cairo", position: { lat: 30.048831, lng: 31.235280 }, descriptions: "https://www.egypttoursportal.com/wp-content/uploads/2017/01/Tours-to-the-Egyptian-Museum.jpg" },
	{ name: "Siwa Oasis", position: { lat: 29.205631, lng: 25.519971 }, descriptions: "https://prasadmodakblog.files.wordpress.com/2018/04/cleopatra-bath.jpg" },
	{ name: "Alexandria", position: { lat: 31.235792, lng: 29.948900 }, descriptions: "http://www.egypttoday.com/images/larg/48879.jpg"},
	{ name: "Hurghada", position: { lat: 27.252378, lng: 33.803864 }, descriptions: "https://www.egypttoursportal.com/wp-content/uploads/2017/01/diving-in-Hurghada.jpg" },
	{name: "Sharm El-Sheikh", position: {lat:27.911318,lng:34.321621}, descriptions: "https://www.telegraph.co.uk/content/dam/Travel/leadAssets/24/49/sharm-thomson2_2449064a.jpg?imwidth=450"}
];

var CURRENT_LOCATION = { lat: 30.048831, lng: 31.235280 };

var MAPPER = {
	Karnak: 0,
	Valley: 1,
	Abu: 2,
	Egyptian: 3,
	Siwa: 4,
	Alexandria: 5,
	Hurghada: 6,
	Sharm: 7
}
