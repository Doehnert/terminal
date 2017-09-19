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