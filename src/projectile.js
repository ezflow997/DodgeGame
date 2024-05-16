import { makeMovements } from "./makeMovement.js";

var move = new makeMovements();

export class Projectile{
    constructor(pX, pY, pSize, pSpeed, pEndX, pEndY, destroy){
        this.x = pX;
        this.y = pY;
        this.speed = pSpeed;
        this.size = pSize;
        this.endX = pEndX;
        this.endY = pEndY;
        this.destroy = destroy;
        this.collisionDetected = false;
    }
    update(){
        if(this.x != this.endX || this.y != this.endY){
            var values = move.make(this.x, this.y, this.speed, this.endX, this.endY);
            this.x = values[0];
            this.y = values[1];
        }
        else{
            this.destroy = true;
        }
    }
    checkCollision(player){
        var distX = Math.abs(this.x - player.x);
        var distY = Math.abs(this.y - player.y);
        var distC = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));

        if(distC < (this.size + player.size)){
            this.collisionDetected = true;
        }
        else{
            this.collisionDetected = false;
        }
    }
    draw(context){
        context.beginPath();
        context.fillStyle = 'red';
        context.arc(this.x, this.y, this.size, 0, 2* Math.PI);
        context.fill();
        context.strokeStyle = "black";
        context.lineWidth = this.size*0.15;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
    }
}