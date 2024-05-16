import { InputHandler } from "./input.js";
import { Player } from "./player.js";
import { World } from "./world.js";
import { Projectiles } from "./projectiles.js";
import { Display } from "./display.js";
import { Menu } from "./menu.js";

window.addEventListener('load', function(){
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 1920;
	canvas.height = 1080;

	class Game {
		constructor(width, height){
			this.fps = 120;
			this.width = width;
			this.height = height;
			this.player = new Player(this, 1);
			this.world = new World();
			this.input = new InputHandler();
			this.projectiles = new Projectiles(player);
			this.display = new Display(this);
			this.menu = new Menu();

			this.msPrev = window.performance.now();
			this.msScore = window.performance.now();
			this.graphicsRenderFPS = 120;

			this.score = 0;
			this.gameOver = true;
		}
		update(){
			this.player.update(this.input);
			this.projectiles.update(this.player, this, performance.now());
			this.display.update(this);

			const msNow = window.performance.now();
			const msPassed = msNow - this.msScore;
			if(msPassed < 1000/30) return;
			this.msScore = msNow;

			this.score = Math.ceil(this.score + 2.5);
			console.log(this.score);
		}
		draw(context){
			ctx.clearRect(-100, -100, this.width+100, this.height+100);
			this.world.draw(context, game.width, game.height);
			this.player.draw(context);
			this.projectiles.draw(context);
			this.display.draw(context);
		}
	}

	const game = new Game(canvas.width, canvas.height);
	console.log(game);

	function animate(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		//console.log(canvas.width)
		game.draw(ctx);
		game.update();
		
		//console.log(game.gameOver);
		if(game.gameOver == true){
			requestAnimationFrame(drawMenu);
			return;
		}
		requestAnimationFrame(animate);
		//console.log(game.gameOver);
	}

	function drawMenu(){
		ctx.clearRect(-100, -100, game.width*2, game.height*2);
		game.menu.draw(ctx);
		game.menu.update(game);

		console.log(game.gameOver);
		if(game.gameOver == true){
			requestAnimationFrame(drawMenu);
		}
		else{
			requestAnimationFrame(animate);
		}
	}

	drawMenu();

});




