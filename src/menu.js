export class Menu{
    constructor(){
        this.startButtonX = 1000;
        this.startButtonY = 500;
        this.startButtonText = "New Game";
        this.isHovered = false;

        this.width = 500;
        this.height = 100;
    }
    update(game){
        if(game.input.mouseX > this.startButtonX && game.input.mouseX < this.startButtonX + this.width){
            if(game.input.mouseY > this.startButtonY && game.input.mouseY < this.startButtonY + this.height){
                this.isHovered = true;
            }
        }
        else{
            this.isHovered = false;
        }

        if(this.isHovered == true && game.input.buttons.indexOf(0) > -1){
            game.gameOver = false;
        }
    }
    draw(context){
        context.beginPath();
        context.strokeStyle = 'red';
        context.lineWidth = 10;
        context.strokeRect(this.startButtonX, this.startButtonY, this.width, this.height);
        context.closePath();

        if(this.isHovered == true){
            context.beginPath();
            context.fillStyle = 'cyan';
            context.fillRect(this.startButtonX, this.startButtonY, this.width, this.height);
            context.closePath();
        }

        context.beginPath();
        context.font = "50px Arial Black";
        context.fillStyle = 'black';
        context.fillText(""+this.startButtonText, this.startButtonX + 100, this.startButtonY + 60);
        context.closePath();
    }
}