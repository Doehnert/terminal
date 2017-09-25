class nave {
    constructor(latitude, longitude, callsign, heading, terminal, speed, altitude, vertical_rate){
        this.latitude = latitude;
        this.longitude = longitude;
        this.callsign = callsign;
        this.heading = heading;
        this.terminal = terminal;
        this.speed = speed;
        this.altitude = altitude;
        this.vertical_rate = vertical_rate;
        this.r = 4;


        this.size = 20;
        //this.img = loadImage("includes/aviao.png"); 
        //this.img2 = loadImage("includes/aviao2.png");
    }

    update() {

        this.altitude += this.vertical_rate/frameRate();
        
        this.red = map(this.altitude, 0, 13000, 0, 255);
        this.green = 0;
        this.blue = map(this.altitude, 0, 13000, 255, 0);
        
        angleMode(DEGREES);
        var speedY = this.speed * cos(this.heading);
        var speedX = this.speed * sin(this.heading);

        var dist1Lon = calcGeoDistance(this.latitude, this.longitude, this.latitude, this.longitude+1, 'km')*1000;
        var dist1Lat = calcGeoDistance(this.latitude, this.longitude, this.latitude+1, this.longitude, 'km')*1000;

        var speedLat = (speedY / dist1Lat) / frameRate();
        var speedLon = (speedX / dist1Lon) / frameRate();

        this.latitude = this.latitude + speedLat;
        this.longitude = this.longitude + speedLon;
    }

    show(){
        var pos = myMap.latLngToPixel(this.latitude, this.longitude);
        // image(this.img, pos.x, pos.y, this.img.width/10, this.img.height/10);
        // Draw a triangle rotated in the direction of velocity
        // angleMode(DEGREES);
        // imageMode(CENTER);
        var angle = float(this.heading);

        //clear();

        push();
        translate(pos.x, pos.y);
        noStroke();
        fill('black');
        text(this.callsign, 0, -10);
        text(this.altitude, 0, 0);
        text(this.speed, 0, 10);
        //text(this.speed + ' - '+this.heading,0,0);
        rotate(angle);

        fill(this.red, this.green, this.blue);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);

        // if(this.terminal == false){
        //     image(this.img, 0, 0, this.img.width/10, this.img.height/10);
        // } else{
        //     image(this.img2, 0, 0, this.img2.width/10, this.img2.height/10);
        // }
        pop();
    }
}