export class InputHandler {
    constructor(){
        this.buttons = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.clicking = false;

        window.addEventListener('mousedown', ev => {
            //console.log(ev);
            //console.countReset;
            if(ev.button == 2 && this.buttons.indexOf(ev.button) == -1){
                this.buttons.push(ev.button);  
            }
            if(ev.button == 0 && this.buttons.indexOf(ev.button) == -1){
                this.buttons.push(ev.button);  
            }
            console.log(ev.button);
        })

        window.addEventListener('mouseup', ev => {
            if(ev.button == 2){
                this.buttons.splice(this.buttons.indexOf(ev.button), 1);
            }
            if(ev.button == 0){
                this.buttons.splice(this.buttons.indexOf(ev.button), 1);
            }
        })

        window.addEventListener('keydown', ev => {
            //console.log(ev);
            if((    ev.key == "q" ||
                    ev.key == "e" ||
                    ev.key == "f")
            && this.buttons.indexOf(ev.key) == -1){
                    this.buttons.push(ev.key);
            }
            //console.log(this.buttons);
        })

        window.addEventListener('keyup', ev => {
            if( ev.key == "q" ||
                ev.key == "e" ||
                ev.key == "f"){
                    this.buttons.splice(this.buttons.indexOf(ev.key), 1);
                }  
        })

        window.addEventListener('mousemove', ev => {
            this.mouseX = ev.pageX;
            this.mouseY = ev.pageY;    
        })
    }
}