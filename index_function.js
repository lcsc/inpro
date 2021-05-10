
// ref: https://stackoverrun.com/es/q/239577
// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
   // Check to see if the delimiter is defined. If not,
   // then default to comma.
   strDelimiter = (strDelimiter || ",");
   // Create a regular expression to parse the CSV values.
   var objPattern = new RegExp(
       (
           // Delimiters.
           "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

           // Quoted fields.
           "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

           // Standard fields.
           "([^\"\\" + strDelimiter + "\\r\\n]*))"
       ),
       "gi"
       );
   // Create an array to hold our data. Give the array
   // a default empty first row.
   var arrData = [[]];
   // Create an array to hold our individual pattern
   // matching groups.
   var arrMatches = null;
   // Keep looping over the regular expression matches
   // until we can no longer find a match.
   while (arrMatches = objPattern.exec( strData )){
       // Get the delimiter that was found.
       var strMatchedDelimiter = arrMatches[ 1 ];
       // Check to see if the given delimiter has a length
       // (is not the start of string) and if it matches
       // field delimiter. If id does not, then we know
       // that this delimiter is a row delimiter.
       if (
           strMatchedDelimiter.length &&
           strMatchedDelimiter !== strDelimiter
           ){
           // Since we have reached a new row of data,
           // add an empty row to our data array.
           arrData.push( [] );
       }
       var strMatchedValue;
       // Now that we have our delimiter out of the way,
       // let's check to see which kind of value we
       // captured (quoted or unquoted).
       if (arrMatches[ 2 ]){

           // We found a quoted value. When we capture
           // this value, unescape any double quotes.
           strMatchedValue = arrMatches[ 2 ].replace(
               new RegExp( "\"\"", "g" ),
               "\""
               );
       } else {
           // We found a non-quoted value.
           strMatchedValue = arrMatches[ 3 ];
       }
       // Now that we have our value string, let's add
       // it to the data array.
       arrData[ arrData.length - 1 ].push( strMatchedValue );
   }
   // Return the parsed data.
   return( arrData );
}

// https://github.com/pointhi/leaflet-color-markers
var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  // filter: 'hue-rotate(120deg)', // https://stackoverflow.com/questions/23567203/leaflet-changing-marker-color
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// https://www.rapidtables.com/web/tools/svg-viewer-editor.html
// https://stackoverflow.com/questions/45110081/svg-icons-in-leaflet-js-map
let achenSvgString = "<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'><path d='M2,111 h300 l-242.7,176.3 92.7,-285.3 92.7,285.3 z' fill='red'/></svg>"
let myIconUrl = encodeURI("data:image/svg+xml," + achenSvgString).replace('#','%23');

// var svgrect = "<svg xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='20' height='10' fill='#5a7cd2'></rect><rect x='0' y='15' width='20' height='10' fill='#5d52cf'></rect></svg>";
// var myIconUrl = encodeURI("data:image/svg+xml," + svgrect).replace('#','%23');


var greenIcon = new L.Icon({
  // iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconUrl: myIconUrl,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function new_icon(value, maxValue){
  // https://stackoverflow.com/questions/41848677/how-to-make-a-color-scale-in-d3-js-to-use-in-fill-attribute
  var colors = d3.scaleQuantize()
    .domain([1, maxValue])
    // https://www.rdocumentation.org/packages/scales/versions/0.4.0/topics/seq_gradient_pal
    // .range(["#f9f871", "#ffc75f", "#ff9671", "#ff6f91", "#d65db1", "#845ec2"]);
    .range(["#2B6788", "#2E6787", "#306786", "#336686", "#356685", "#376684", "#396683", "#3B6683", "#3D6582", "#3F6581", "#406581", "#426580", "#44657F", "#45647E", "#47647E", "#49647D", "#4A647C", "#4B647B", "#4D637B", "#4E637A", "#506379", "#516378", "#526378", "#536277", "#556276", "#566275", "#576275", "#586274", "#596173", "#5B6172", "#5C6172", "#5D6171", "#5E6170", "#5F606F", "#60606F", "#61606E", "#62606D", "#635F6C", "#645F6C", "#655F6B", "#665F6A", "#675F6A", "#685E69", "#695E68", "#695E67", "#6A5E67", "#6B5D66", "#6C5D65", "#6D5D64", "#6E5D64", "#6F5D63", "#705C62", "#705C61", "#715C61", "#725C60", "#735B5F", "#745B5F", "#745B5E", "#755B5D", "#765A5C", "#775A5C", "#775A5B", "#785A5A", "#795959", "#7A5959", "#7A5958", "#7B5957", "#7C5956", "#7D5856", "#7D5855", "#7E5854", "#7F5854", "#7F5753", "#805752", "#815751", "#815751", "#825650", "#83564F", "#83564E", "#84554E", "#85554D", "#85554C", "#86554C", "#86544B", "#87544A", "#885449", "#885449", "#895348", "#8A5347", "#8A5346", "#8B5346", "#8B5245", "#8C5244", "#8D5243", "#8D5143", "#8E5142", "#8E5141", "#8F5140", "#8F5040", "#90503F"]);
  var color = colors(value);
  // console.log(value + " " + maxValue + " " + color);

  // https://stackoverflow.com/questions/57767359/how-to-load-an-svg-icon-in-leaflet
  var iconSettings = {
          mapIconUrl: '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="{mapIconColorInnerCircle}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="{pinInnerCircleRadius}"/></svg>',
          mapIconColor: color,
          mapIconColorInnerCircle: color,
          pinInnerCircleRadius: 19
  };

  // <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="#cc756b" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="#fff" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="48"/></svg>
  // icon normal state
  var divIcon = L.divIcon({
          className: "leaflet-data-marker",
          html: L.Util.template(iconSettings.mapIconUrl, iconSettings),
          iconAnchor: [12, 32],
          iconSize: [25, 30],
          popupAnchor: [0, -28]
  });

  return(divIcon)
}

function init(){

}

function toNumber(number){
  return( Number(number.split(',').join('.')) );
}

//https://wsvincent.com/javascript-remove-duplicates-array/
function removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

function toDate(year, month, day){
    var text;
    if(day != ""){ // Fecha completa
      text = day + "/" + month + "/" + year;
    }else{ // Fecha mes
      if(month != ""){
        text = month + "/" + year;
      }else{ // Fecha año
        text = year;
      }
    }
    return(text);
}

function addDataSeason(seasons, month){
  var i;
  // A: 'Verano', B: 'Otoño', C: 'Invierno', D: 'Anual', E: 'Primavera'
  if(month != ""){
    if(month == 12 || month == 1 || month == 2){ //Invierno
       i =  2;
    }else{
      if(month == 3 || month == 4 || month == 5){ //Primavera
         i =  4;
      }else{
        if(month == 6 || month == 7 || month == 8){ //Verano
          i =  0;
        }else{  //month == 9 || month == 10 || month == 11 // Otoño
          i = 1;
        }
      }
    }
  }else{ //Anual
    i = 3;
  }
  seasons[i] = seasons[i] + 1;
  return(seasons);
}

function addData(oldData, newData){
  oldData[oldData.length] = newData;
  oldData = removeDups(oldData);
  return(oldData);
}

// dataText = data_vector[100]
function popupText(location, date, documentary){

  var text = "";

  text = text + "<strong>Location:</strong> " + location.join(', ') + "<br>";

  text = text + "<strong>Dates of rogations:</strong> " + date.join(', ') + "<br>";

  text = text + "<strong>Documentary source:</strong> " + documentary.join('<br>');

  return(text)
}

function removeMarker(value, key, map){
  value.remove();
}

function deleteMarkers(markers, donutMarkers){
  markers.forEach(removeMarker);
  markers.clear();
  donutMarkers.clearLayers();
}

// min Thu Jan 01 1333 12:00:00 GMT-0014 (hora estándar de Europa central)
// min Sat Dec 31 1949 12:00:00 GMT+0100 (hora estándar de Europa central)
function searchMinMax(){
  var min = new Date("1700" + "-" + "1" + "-" + "1" + " 12:00:00");
  var max = min;

  for (var i = 0; i < data_vector.length; i++){
  if(data_vector[i][P_DAY] != ""){ // Fecha completa
      dateMin = dateMax = new Date(data_vector[i][P_YEAR] + "-" + data_vector[i][P_MONTH] + "-" + data_vector[i][P_DAY] + " 12:00:00");
    }else{ // Fecha mes
      if(data_vector[i][P_MONTH] != ""){
        dateMin = new Date(data_vector[i][P_YEAR] + "-" + data_vector[i][P_MONTH] + "-" + "1" + " 12:00:00");
        dateMax = new Date(data_vector[i][P_YEAR], data_vector[i][P_MONTH], "0" ).getDate();
        dateMax = new Date(data_vector[i][P_YEAR] + "-" + data_vector[i][P_MONTH] + "-" + dateMax + " 12:00:00");
      }else{ // Fecha año
        dateMin = new Date(data_vector[i][P_YEAR] + "-" + "1" + "-" + "1" + " 12:00:00");
        dateMax = new Date(data_vector[i][P_YEAR] + "-" + "12" + "-" + "31" + " 12:00:00");
      }
    }


    if(dateMin < min){
      min = dateMin;
    }
    if(dateMax > max){
      max = dateMax;
    }
  }
  console.log("min " + min);
  console.log("min " + max);
}
