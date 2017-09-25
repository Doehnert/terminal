var url = 'https://opensky-network.org/api/states/all';

// Options for map
var options = {
  lat: -25.5316666667,
  lng: -49.1761111111,
  zoom: 6,
  style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}

// Create an instance of Leaflet
var mappa = new Mappa('Leaflet');
var myMap;
var canvas;
var recordSpeed = 0;
var recordAviao;
var raioTerminal = 74.08;
var tma1 = [];
var avioes = [];


function checkDanger(){
  for(var i=0;i<avioes.length;i++) {
    var avi = avioes[i];
    for(var j=0;j<avioes.length;j++) {
      if (i==j) {
        continue;
      } else {
        avi2 = avioes[j];
        var dist = calcGeoDistance(avi.latitude, avi.longitude, avi2.latitude, avi2.longitude, 'km');
        if(dist < 10) {
          var pos1 = myMap.latLngToPixel(avi.latitude, avi.longitude);
          var pos2 = myMap.latLngToPixel(avi2.latitude, avi2.longitude);
          stroke(0);
          strokeWeight(1);
          line(pos1.x, pos1.y, pos2.x, pos2.y);
        }
      }
    }
  }
}

function converteCoordenadas(graus,minutos,segundos) {
  var decimais = graus + minutos/60 + segundos/3600;
  return decimais;
}

function setup() {
  //collideDebug(true);
  canvas = createCanvas(800, 700);
  angleMode(DEGREES);
  imageMode(CENTER);

  loadJSON(url, gotData);
  
  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  setInterval(reler, 20000);

  // Load the data
  //meteorites = loadTable('../../data/Meteorite_Landings.csv', 'csv', 'header');

  // Only redraw the meteorites when the map change and not every frame.
  //myMap.onChange(redesenhar);
}


function gotData(json){
    avioes = [];
    var len = json.states.length;
    for (var i=0;i<len;i++) {
      var aviao = (json.states[i]);
      
        var latitude = aviao[6];
        var longitude = aviao[5];
        var ground = aviao[8];

        if(ground == true)
          continue;
        
        if(latitude && longitude) {
          var distance = calcGeoDistance(latitude, longitude, -25.5316666667, -49.1761111111, 'km');
          
          if(distance < raioTerminal*2) {
            var callsign = aviao[1];
            var heading = aviao[10];
            var speed = aviao[9];
            var altitude = aviao[7];
            var vertical_rate = aviao[11];

            //verifica se esta na terminal
            var pos = myMap.latLngToPixel(latitude, longitude);
            if ( collidePointPoly(pos.x,pos.y,tma1) ) {
            //if (distance < raioTerminal) {
              var meuaviao = new nave(latitude, longitude, callsign, heading, true, speed, altitude, vertical_rate);
            }else{
              var meuaviao = new nave(latitude, longitude, callsign, heading, false, speed, altitude, vertical_rate);
            }
            avioes.push(meuaviao);
          }
        }
    }
    print_info();
}

// The draw loop is fully functional but we are not using it for now.
function draw() {

  //console.log(frameRate());
  
  clear();
  for (var i=0;i<avioes.length;i++) {
    avioes[i].update();
    avioes[i].show();
  }

  checkDanger();

  var posSBCT = myMap.latLngToPixel(-25.5316666667, -49.1761111111);
  var v1 = createVector(posSBCT.x, posSBCT.y);

  //var distGrausLat = raioTerminal/110.574;
  //var pos = myMap.latLngToPixel(-25.5316666667+distGrausLat, -49.1761111111);
  //var v2 = createVector(pos.x, pos.y);
  //var raio = p5.Vector.dist(v1, v2);

  fill(204, 102, 0, 30);
  noStroke();

	beginShape();
	for(i=0; i < tma1.length; i++){
		vertex(tma1[i].x,tma1[i].y);
	}
	endShape(CLOSE);

  fill(70, 203,31);	
  //stroke(100);
   
  var lat = converteCoordenadas(-25, -42, -33);
  var lon = converteCoordenadas(-50, -02, -01);
  var pos = myMap.latLngToPixel(lat, lon);
  tma1[0] = createVector(pos.x, pos.y);

  var lat = converteCoordenadas(-25, -10, -52);
  var lon = converteCoordenadas(-49, -49, -18);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[1] = createVector(pos.x,pos.y);     // set X/Y positions

  var lat = converteCoordenadas(-24, -52, -51);
  var lon = converteCoordenadas(-49, -37, -04);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[2] = createVector(pos.x,pos.y);     // set X/Y positions

  var lat = converteCoordenadas(-24, -45, -51);
  var lon = converteCoordenadas(-49, -16, -27);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[3] = createVector(pos.x,pos.y);     // set X/Y positions

  var lat = converteCoordenadas(-24, -45, -38);
  var lon = converteCoordenadas(-48, -51, -21);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[4] = createVector(pos.x,pos.y);     // set X/Y positions

  var lat = converteCoordenadas(-25, -02, -05);
  var lon = converteCoordenadas(-48, -35, -16);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[5] = createVector(pos.x,pos.y);

  var lat = converteCoordenadas(-25, -08, -43);
  var lon = converteCoordenadas(-48, -36, -11);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[6] = createVector(pos.x,pos.y);     // set X/Y positions
  
  var lat = converteCoordenadas(-25, -17, -59);
  var lon = converteCoordenadas(-48, -37, -29);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[7] = createVector(pos.x,pos.y);     // set X/Y positions

  var lat = converteCoordenadas(-25, -18, -35);
  var lon = converteCoordenadas(-48, -32, -35);
  var pos = myMap.latLngToPixel(lat, lon);
 	tma1[8] = createVector(pos.x,pos.y);     // set X/Y positions

  var lat = converteCoordenadas(-25, -20, -39);
  var lon = converteCoordenadas(-48, -15, -35);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[9] = createVector(pos.x,pos.y);     // set X/Y positions
  
  var lat = converteCoordenadas(-25, -50, -26);
  var lon = converteCoordenadas(-48, -23, -20);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[10] = createVector(pos.x,pos.y);     // set X/Y positions
  
  var lat = converteCoordenadas(-26, -00, -12);
  var lon = converteCoordenadas(-48, -16, -46);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[11] = createVector(pos.x,pos.y);     // set X/Y positions
  
  var lat = converteCoordenadas(-26, -09, -48);
  var lon = converteCoordenadas(-48, -18, -09);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[12] = createVector(pos.x,pos.y);     // set X/Y positions

  var lat = converteCoordenadas(-26, -06, -07);
  var lon = converteCoordenadas(-48, -27, -33);
  var pos = myMap.latLngToPixel(lat, lon);
 	tma1[13] = createVector(pos.x,pos.y);     // set X/Y positions

  var lat = converteCoordenadas(-26, -29, -23);
  var lon = converteCoordenadas(-48, -33, -35);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[14] = createVector(pos.x,pos.y);     // set X/Y positions

  var lat = converteCoordenadas(-26, -55, -05);
  var lon = converteCoordenadas(-49, -15, -47);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[15] = createVector(pos.x,pos.y);     // set X/Y positions

  var lat = converteCoordenadas(-26, -19, -30);
  var lon = converteCoordenadas(-49, -27, -54);
  var pos = myMap.latLngToPixel(lat, lon);
	tma1[16] = createVector(pos.x,pos.y);     // set X/Y positions

  var lat = converteCoordenadas(-25, -58, -30);
  var lon = converteCoordenadas(-49, -48, -31);
  var pos = myMap.latLngToPixel(lat, lon);  
	tma1[17] = createVector(pos.x,pos.y);     // set X/Y positions

  //noLoop();
  // fill(255,0,0, 30);
  // //desenhar a nova terminal
  // beginShape();
  // var lat = converteCoordenadas(-25, -10, -34);
  // var lon = converteCoordenadas(-49, -20, -28);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // var lat = converteCoordenadas(-25, -23, -50);
  // var lon = converteCoordenadas(-48, -54, -55);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // var lat = converteCoordenadas(-25, -52, -30);
  // var lon = converteCoordenadas(-49, -03, -27);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // var lat = converteCoordenadas(-25, -41, -57);
  // var lon = converteCoordenadas(-49, -33, -58);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // var lat = converteCoordenadas(-25, -21, -31);
  // var lon = converteCoordenadas(-49, -28, -33);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // var lat = converteCoordenadas(-25, -13, -05);
  // var lon = converteCoordenadas(-49, -22, -52);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // endShape(CLOSE);


  // fill(123,104,238, 30);
  // //desenhar a nova terminal
  // beginShape();
  // var lat = converteCoordenadas(-25, -50, -45);
  // var lon = converteCoordenadas(-48, -49, -04);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // var lat = converteCoordenadas(-25, -48, -40);
  // var lon = converteCoordenadas(-48, -39, -57);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // var lat = converteCoordenadas(-25, -50, -00);
  // var lon = converteCoordenadas(-48, -25, -39);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // var lat = converteCoordenadas(-26, -22, -04);
  // var lon = converteCoordenadas(-48, -31, -41);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // var lat = converteCoordenadas(-26, -27, -41);
  // var lon = converteCoordenadas(-48, -36, -10);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // var lat = converteCoordenadas(-26, -31, -39);
  // var lon = converteCoordenadas(-48, -42, -15);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // var lat = converteCoordenadas(-26, -12, -37);
  // var lon = converteCoordenadas(-49, -08, -31);
  // var pos = myMap.latLngToPixel(lat, lon);
  // vertex(pos.x, pos.y);
  // endShape(CLOSE);


//  ellipse(posSBCT.x, posSBCT.y, raio*2);

  // if ((frameCount % 500)==0){
  //   reler();
  // }
}

function reler() {
    console.log('releu');
    
    loadJSON(url, gotData);
}

function print_info() {
  var vel = select('#vel');
  var s = '';
  var teste = select('#teste');

  teste.html('');
  vel.html('');

  for (var i=0;i<avioes.length;i++) {
    if(avioes[i].terminal == true) {
      if(avioes[i].speed > recordSpeed) {
        recordSpeed = avioes[i].speed;
        recordAviao = new nave(avioes[i].latitude, avioes[i].longitude, avioes[i].callsign, avioes[i].heading, false, avioes[i].speed);
      }
      if(avioes[i].callsign!='') {
        var aviao = '<li>'+avioes[i].callsign+'</li>';
        teste.html(aviao, true);
      }
    }
  }

  
  if(recordAviao){
    vel.html(recordSpeed*3.6+' Km/h - '+recordAviao.callsign, true);
  }
}