
class Game {
    constructor() {
        this.time = 0;
        this.player = null; // will store an instance of the Player class
        this.obstacleArr = []; // will store instances of the Obstacle class
    }
    start () {
        //console.log("starting game...")
        this.player = new Player();
        this.attachEventListeners();

        setInterval(() => {

            // create new obstacle
            if(this.time % 60 === 0){
                const newObstacle = new Obstacle();
                this.obstacleArr.push(newObstacle);
            }

            // move all obstacles
            this.obstacleArr.forEach(
                (obstacleInstance) => {
                    obstacleInstance.moveDown();

                    if((obstacleInstance.positionY + obstacleInstance.height) === 0){
                        this.obstacleArr.shift();
                        obstacleInstance.domElement.remove();
                    }
                // else {
                //     const bodyElm = document.getElementById("board");
                //     const obstacleElm = document.querySelector(".obstacle");
                //     bodyElm.removeChild(obstacleElm);
                //     obstacleArr.shift();
                // }
            });

            // detect collision

            this.obstacleArr.forEach((obstacleInstance) => {
                // horizontal pos of the player
                if(this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                    this.player.positionX + this.player.width > obstacleInstance.positionX &&
                    this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                    this.player.height + this.player.positionY > obstacleInstance.positionY){
                        //collision detected !!
                        console.log("collision detected !!")
                }
            });

            this.time++;

        }, 50);

        /* 
        // interval to create obstacles
        setInterval( () => {
            const newObstacle = new Obstacle();
            this.obstacleArr.push(newObstacle);
        }, 500);

        // move obstacles
        setInterval( () => {
            this.obstacleArr.forEach( obstacle => {
                obstacle.moveDown();
            })
        }, 100);
        */

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

        this.width = 10;
        this.height = 10;

        this.domElement = null; 
        this.createDomElement();
    }
    createDomElement() {
        this.domElement = document.createElement('div');
        this.domElement.id = "player";
           
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";

        this.domElement.style.position = "absolute";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        //domElement.style.backgroundColor = "green";
        
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    moveLeft(){
        if (this.positionX > 0 && this.positionX+this.width <= 100) {
        this.positionX--;
        console.log(this.positionX)
        this.domElement.style.left = this.positionX + "vw";
        }

    }
    moveRight(){
        if (this.positionX >= 0 && this.positionX+this.width < 100) {
        this.positionX++;
        console.log(this.positionX);
        this.domElement.style.left = this.positionX + "vw";
        }   
    }

}

class Obstacle {
    constructor() {
        this.width = 20;
        this.height = 10;

        //this.positionX = Math.random() * 100;
        this.positionX = Math.floor(Math.random() * (100-this.width + 1));
        this.positionY = 100;

        this.domElement = this.createDomElement();
    }

    createDomElement() {
        const newElm = document.createElement('div');
        newElm.className = "obstacle";

        newElm.style.width = this.width + "vw";
        newElm.style.height = this.height + "vh";

        newElm.style.left = this.positionX + "vw";
        newElm.style.bottom = this.positionY + "vh";
        
        const boardElm = document.getElementById("board");
        boardElm.appendChild(newElm);
        return newElm;
    }
    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}



/* class Obstacle extends Player {
    constructor(){
        super();
        this.positionX = 45;
        this.positionY = 50;
    }

    //here the id needs to be removed and the class needs to be added! but how?

    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh"
    }
} */



const game = new Game();
game.start();

