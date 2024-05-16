export class World {
    constructor(){
        this.scale = 1;
        this.xOffset = 0;
        this.yOffset = 0;
        //this.image = document.getElementById('world');
    }
    
    draw(context, width, height){
        //context.drawImage(this.image, this.xOffset, this.yOffset, this.game.width*this.scale, this.game.height*this.scale);
        context.beginPath();
        context.fillStyle = 'black';
        context.fillRect(this.xOffset, this.yOffset, width*2, height*2);
        context.closePath();
    }
}