class nave {
    constructor(latitude, longitude, callsign, heading, terminal, speed){
        this.latitude = latitude;
        this.longitude = longitude;
        this.callsign = callsign;
        this.heading = heading;
        this.terminal = terminal;
        this.speed = speed;

        this.size = 20;
        this.img = loadImage("includes/aviao.png"); 
        this.img2 = loadImage("includes/aviao2.png"); 
    }

    update() {
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
        var angle = float(this.heading);

        push();
        translate(pos.x, pos.y);
        noStroke();
        fill('black');
        text(this.callsign, 0, 0);
        rotate(angle);

        if(this.terminal == false){
            image(this.img, 0, 0, this.img.width/10, this.img.height/10);
        } else{
            image(this.img2, 0, 0, this.img2.width/10, this.img2.height/10);
        }
        pop();
    }
}