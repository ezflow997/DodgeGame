export class Display{
    constructor(game){
        this.scoreX = game.width*0.60;
        this.scoreY = game.height*0.05;

        this.scoreText = 0;
    }
    update(game){
        this.scoreText = game.score;
    }
    draw(context){
        context.font = "50px Arial Black";
        context.fillStyle = 'white';
        context.fillText(""+this.scoreText, this.scoreX, this.scoreY);
    }
}