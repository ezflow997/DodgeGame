import { Projectile } from "./projectile.js";

export class Projectiles{
    constructor(){
        this.projectilesList = [];
        this.lastCreation = performance.now();
        this.setRandomSpawnTime = 500;
        this.randomSpawnTime = Math.random() * this.setRandomSpawnTime;

        this.minSpawnPercent = 0;
        this.maxSpawnPercent = 65;
        this.maximumProctilesMultiplier = 70;
        this.speed = 10;
        this.speeds = [this.speed*0.4, this.speed*0.6, this.speed*0.8, this.speed*1.1];
        this.speedDifficulty = 2;
    }
    update(player, game, update){
        if(this.projectilesList.length < this.maximumProctilesMultiplier){
            var startX = game.width * Math.random();
            var xDir = 1;
            if(startX - player.desiredX < 0){
                xDir = -1;
            }

            var startY = game.height * Math.random();
            var yDir = 1;
            if(startY - player.desiredY < 0){
                yDir = -1;
            }

            var pSpeed = this.speeds[this.speedDifficulty];

            let dx = startX - player.desiredX;
            let dy = startY - player.desiredY;
            let slope = dy/dx;
            let intercept = ((slope*startX) - startY)/-1;
            //console.log(slope, intercept);

            // decide wether to calucate for y or x
            var endX = game.width * 1.25;
            var beginX = 0 - (game.width * 0.25);
            if(xDir == -1){
                endX = 0 - (game.width * 0.25);
                beginX = game.width * 1.25
            }
            var endY = (slope*endX) + intercept;
            var beginY = (slope*beginX) + intercept;

            var projectile = new Projectile(beginX, beginY, 15, pSpeed, endX, endY, false);
            if(update - this.lastCreation > this.randomSpawnTime){
                this.projectilesList.push(projectile);
                this.lastCreation = performance.now();
                this.randomSpawnTime = Math.random() * this.setRandomSpawnTime;
                //console.log(this.randomSpawnTime);
            }
        }
        if(this.projectilesList.length > 0){
            for(let i = 0; i < this.projectilesList.length; i++){
                let p = this.projectilesList[i];
                if(p.destroy == true){
                    this.projectilesList.splice(i,1);
                }
                else{
                    p.update();
                    p.checkCollision(player);
                    if(p.collisionDetected == true){
                        game.score = 0;
                        game.gameOver = true;
                        this.projectilesList = [];
                    }
                }
            }
        }
        if(game.score > 1500){
            if(game.score > 7000){
                this.randomSpawnTime = this.randomSpawnTime * 0.997;
                this.maximumProctilesMultiplier = this.maximumProctilesMultiplier * 1.003;
            }
            else if(game.score > 6000){
                this.randomSpawnTime = 280;
                this.maximumProctilesMultiplier = 120;
            }
            else if(game.score > 5000){
                this.randomSpawnTime = 300;
                this.maximumProctilesMultiplier = 110;
            }
            else if(game.score > 3800){
                this.randomSpawnTime = 340;
                this.maximumProctilesMultiplier = 100;
            }
            else if(game.score > 2500){
                this.randomSpawnTime = 370;
                this.maximumProctilesMultiplier = 90;
            }
            else if(game.score > 1500){
                this.randomSpawnTime = 400;
                this.maximumProctilesMultiplier = 80;
            }
        }
        else{
            this.randomSpawnTime = 500;
            this.maximumProctilesMultiplier = 70;
        }
    }
    draw(context){
        if(this.projectilesList.length > 0){
            for(let i = 0; i < this.projectilesList.length; i++){
                this.projectilesList[i].draw(context);
                //console.log(this.projectilesList[i])
            }
        }
    }
}