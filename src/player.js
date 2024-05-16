import { makeMovements } from "./makeMovement.js";

const rotatingCanvas = document.getElementById('rotating-canvas');
const rotatingCtx = rotatingCanvas.getContext('2d');

const tempCanvas = document.getElementById('temp-canvas');
const tempCtx = tempCanvas.getContext('2d');

const canvas = document.getElementById('canvas1');

var move = new makeMovements();

var modelsList = [
    [20, 20, 750, 1460, 810, 35, 445, 990, 160, 200],
    [2915, 1785, 880, 1510, 3890, 1790, 675, 1440, 100, 450]
];

var colorsList = ['red', 'blue', 'green', 'purple'];

export class Player {
    constructor(game, playerID){
        this.game = game;
        this.playerID = playerID;
        this.x = this.game.width/2;
        this.y = this.game.height/2;
        this.speed = 6;

        this.dx = 0;
        this.dy = 0;
        this.desiredX = this.x;
        this.desiredY = this.y;

        this.size = 35;
    }
    update(input){
        //console.log(buttons);
        //console.log(canvas.clientWidth, canvas.clientHeight);
        
        if(this.desiredX != this.x || this.desiredY != this.y){
            var values = move.make(this.x, this.y, this.speed, this.desiredX, this.desiredY);
            this.x = values[0];
            this.y = values[1];
            //console.log(this.desiredX, this.x, this.desiredY, this.y);
        }

        
        if(input.buttons.indexOf(2) >= 0){
            this.desiredX = input.mouseX + this.size/2 - 10;
            //this.x = this.desiredX;
            this.desiredY = input.mouseY + this.size/2 - 10;
            //this.y = this.desiredY;
            //console.log(input.buttons);
            //console.log(this.x, this.y);
        }
        if(input.buttons.indexOf('q')){

        }
    }
    draw(context){
        context.beginPath();
        context.fillStyle = colorsList[this.playerID];
        context.arc(this.x, this.y, this.size, 0, 2* Math.PI);
        context.fill();
        context.strokeStyle = "black";
        context.lineWidth = this.size*0.15;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
    }
}