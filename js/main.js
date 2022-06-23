
class Game {
    constructor() {
        this.player = null; // will store an instance of the Player class
    }
    start () {
        console.log("starting game...")
        this.player = new Player();
        this.attachEventListeners();
    }
    attachEventListeners() {
        document.addEventListener('keydown', (event) => {
            //console.log(event);
            if(event.key==="ArrowLeft") {
                //console.log("you pressed arrow left");
                this.player.moveLeft();
            }
            else if(event.key==="ArrowRight") {
                //console.log("you pressed arrow right");
                this.player.moveRight();
            }
        }
        );
    }
}

class Player {
    constructor(){
        this.positionX= 45;
        this.positionY= 0;
        this.domElement = null; 
        this.createDomElement();
    }
    createDomElement() {
        this.domElement = document.createElement('div');
        this.domElement.id = "player";   
        this.domElement.style.position = "absolute";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        //domElement.style.backgroundColor = "green";
        
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    moveLeft(){
        this.positionX--;
        console.log(this.positionX)
        this.domElement.style.left = this.positionX + "vw";
    }
    moveRight(){
        this.positionX++;
        console.log(this.positionX);
        this.domElement.style.left = this.positionX + "vw";
    }

}

const game = new Game();
game.start();

