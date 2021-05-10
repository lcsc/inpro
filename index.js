var map = L.map('map', {attributionControl: false}).setView([40.4, -3.7], 5);
// map.attributionControl.addAttribution("prueba");


// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

L.esri.basemapLayer('Gray').addTo(map);

// Year;Month ;Day;Location;Lat;Long;Type of Source;Source
// P_YEAR = 0;
// P_MONTH = 1;
// P_DAY = 2;
// P_LOCATION = 3;
// P_LAT = 4;
// P_LON = 5;
// P_TYPE = 6;
// P_SOURCE = 7;

// Year;Season;Month ;Day;Cause;Location;Latatitude ;Longitude;Type of source;Reliability;Source;;;;;
P_YEAR = 0;
P_MONTH = 2;
P_DAY = 3;
P_LOCATION = 5;
P_LAT = 6;
P_LON = 7;
P_TYPE = 8;
P_SOURCE = 10;


// Para pruebas
// i = 100;

// Botones en los popups: https://detriamelia.com/gis-tutorial-with-leafletjs-popup-and-marker-modifications/

//create the markercluster
var donutMarkers = L.DonutCluster(
    //the first parameter is  markercluster's configuration file
    {
        chunkedLoading: true
    }
    //the second parameter is  DonutCluster's configuration file
    , {
    key: 'variables', //mandotary, indicates the grouped field, set it in the options of marker
    sumField: 'value', // optional, indicates the value field to sum. set it in the options of marker
    order: ['A', 'B', 'C', 'D', 'E'], // optional, indicates the group order.
    // title: {A: 'Verano', B: 'Otoño', C: 'Invierno', D: 'Anual', E: 'Primavera'}, // optional, indicates the group title, when it is an array, the order option must be specified. or use an object.{A:'Type A',D: 'Type D',B:'Type B',C:'Type C' }
    title: {A: 'JJA', B: 'SON', C: 'DJF', D: 'Annual', E: 'MAM'},
    arcColorDict: { // mandotary, the arc color for each group.
        A: 'red',
        B: 'blue',
        C: 'yellow',
        D: 'black',
        E: 'green'
    }
});

//Toledo: markers.get("39,857_-4,023")
function addMarkers(markers, data_vector_date){
	var maxValues = 0;
	for (var i = 0; i < data_vector_date.length; i++){
		if(markers.get(data_vector_date[i][P_LAT] + "_" + data_vector_date[i][P_LON]) == undefined){
			marker = L.marker([toNumber(data_vector_date[i][P_LAT]), toNumber(data_vector_date[i][P_LON])], {});
			marker["number"] = 1;
			marker.options.variables = ['A', 'B', 'C', 'D', 'E'];
			marker.options.value = addDataSeason([0, 0, 0, 0, 0], data_vector_date[i][P_MONTH]);
			marker["location"] = addData([], data_vector_date[i][P_LOCATION]);
			marker.options.title = marker["location"];
			marker["dates"] = addData([], toDate(data_vector_date[i][P_YEAR], data_vector_date[i][P_MONTH], data_vector_date[i][P_DAY]));
			marker["documentary"] = addData([], data_vector_date[i][P_SOURCE]);
			marker.bindPopup(popupText(marker["location"], marker["dates"], marker["documentary"]));
			markers.set(data_vector_date[i][P_LAT] + "_" + data_vector_date[i][P_LON], marker);
			// donutMarkers.addLayer(marker);
			// marker.setIcon(new_icon());
		}else{
			marker = markers.get(data_vector_date[i][P_LAT] + "_" + data_vector_date[i][P_LON]);
			marker["number"] = marker["number"] + 1;
			marker.options.value =  addDataSeason(marker.options.value, data_vector_date[i][P_MONTH]);
			marker["location"] = addData(marker["location"], data_vector_date[i][P_LOCATION]);
			marker.options.title = marker["location"];
			marker["dates"] = addData(marker["dates"], toDate(data_vector_date[i][P_YEAR], data_vector_date[i][P_MONTH], data_vector_date[i][P_DAY]));
			marker["documentary"] = addData(marker["documentary"], data_vector_date[i][P_SOURCE]);
			marker.bindPopup(popupText(marker["location"], marker["dates"], marker["documentary"]), {maxHeight: 100});
			// marker.setIcon(new_icon());
		}
		if(marker["number"] > maxValues){
			maxValues = marker["number"];
		}
	}

	function new_icons(value, key, map){
		// value.setIcon(new_icon(value["number"], maxValues));
		value.setIcon(L.createIcon(value.options.value));
		donutMarkers.addLayer(value);	
	}

	markers.forEach(new_icons);

	map.addLayer(donutMarkers);
}

function reloadMarkers(e){
	deleteMarkers(markers, donutMarkers);
	data_vector_date = [];

	var ini = startTimeInput.value.split(/[^0-9]/);
	ini = new Date(ini[0], ini[1]-1, ini[2], 12, 0, 0, 0);
	var end = endTimeInput.value.split(/[^0-9]/);
	end = new Date(end[0], end[1]-1, end[2], 12, 0, 0, 0);
	for (var i = 0; i < data_vector.length; i++){

		if(data_vector[i][P_DAY] != ""){ // Fecha completa
			dateMin = dateMax = new Date(data_vector[i][P_YEAR], data_vector[i][P_MONTH] - 1, data_vector[i][P_DAY], 12, 0, 0, 0);
		}else{ // Fecha mes
			if(data_vector[i][P_MONTH] != ""){
				dateMin = new Date(data_vector[i][P_YEAR], data_vector[i][P_MONTH] - 1, 1, 12, 0, 0, 0);
				dateMax = new Date(data_vector[i][P_YEAR], data_vector[i][P_MONTH], "0" ).getDate();
				dateMax = new Date(data_vector[i][P_YEAR], data_vector[i][P_MONTH] - 1, dateMax, 12, 0, 0, 0);
			}else{ // Fecha año
				dateMin = new Date(data_vector[i][P_YEAR], 1 - 1, 1, 12, 0, 0, 0);
				dateMax = new Date(data_vector[i][P_YEAR], 12 - 1, 31, 12, 0, 0, 0);
			}
		}

		if(dateMax >= ini && dateMin <= end){
			data_vector_date[data_vector_date.length] = data_vector[i];
		}
	}
	addMarkers(markers, data_vector_date);
	if(e != undefined){
		e.preventDefault();
	}
	return(false);
}

// https://esri.github.io/esri-leaflet/examples/visualizing-time-on-dynamic-map-layer.html
var timeForm = document.getElementById('form');
var startTimeInput = document.getElementById('from');
var endTimeInput = document.getElementById('to');
timeForm.addEventListener('submit', reloadMarkers);

data_vector = CSVToArray(data, ";");

var data_vector_date;
var markers = new Map();
reloadMarkers(undefined);

// map.addLayer(donutMarkers);

//Leaflet | Powered by Esri | HERE, DeLorme, MapmyIndia, © OpenStreetMap contributors
L.control.attribution({prefix: '<span class="AttributionClass">Created by <a href="https://lcsc.csic.es">LCSC: Climatology and Climate Services Laboratory</a> | <a href="https://leafletjs.com">Leaflet </a> | Powered by <a href="https://www.esri.com">Esri </a> </span>'}).addTo(map);

//Añadir licencia
L.Control.Names = L.Control.extend({
	options: {
		position: 'bottomright',
	},
	onAdd: function(map) {
	 	this._map = map;
        var container;
        container = this._container = L.DomUtil.create('div', 'text licensed leaflet-control-attribution');
      	container.innerHTML = 'Code licensed under the <a href="http://www.gnu.org/licenses/agpl-3.0.html">GNU Affero General Public License</a>.'
		return container;
	},
	onRemove(map){
	}
});
text = new L.Control.Names();
map.addControl(text);

//Añadir frase de Fernando
L.Control.Names = L.Control.extend({
	options: {
		position: 'bottomright',
	},
	onAdd: function(map) {
	 	this._map = map;
        var container;
        container = this._container = L.DomUtil.create('div', 'text leaflet-control-attribution');
      	container.innerHTML = 'If you have any comment or you want to contribute to the INternational Propluvia ROgation database please contact us at <a href="mailto:fdominguez@unizar.es">fdominguez@unizar.es</a>'
		return container;
	},
	onRemove(map){
	}
});
text = new L.Control.Names();
map.addControl(text);

//Añadir logo de LCSC
L.Control.Names = L.Control.extend({
  options: {
    position: 'bottomright',
  },
  onAdd: function(map) {
    this._map = map;
        var container;
        container = this._container = L.DomUtil.create('div', 'text2 leaflet-control-attribution');
        container.innerHTML = '<a href="https://lcsc.csic.es"><img src="logo_lcsc.png" alt="LCSC: Climatology and Climate Services Laboratory" width="100" height="100"></a>'
    return container;
  },
  onRemove(map){
  }
});
text = new L.Control.Names();
map.addControl(text);
