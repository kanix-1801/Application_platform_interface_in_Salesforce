import { LightningElement, track } from 'lwc';

export default class SnakeGame extends LightningElement {
    score;
    blockSize = 20;
    @track gameBlocks = [];
    isRendered = false;

    xSpeed = 1;
    ySpeed = 0;

    xHead;
    yHead;

    renderedCallback() {
        if (!this.isRendered) {
            let eWidth = this.template.querySelector('.game-container').clientWidth;
            let eHeight = this.template.querySelector('.game-container').clientHeight;

            let xMax = Math.floor(eWidth / this.blockSize);
            let yMax = Math.floor(eHeight / this.blockSize);
            let Arr = []

            let obj;
            for (let y = 0; y < yMax; y++) {
                for (let x = 0; x < xMax; x++) {
                    if (x == 0 && y == 0) {
                        obj = { id: `${x}:${y}`, snake: true, food: false };
                    } else {
                        obj = { id: `${x}:${y}`, snake: false, food: false };
                    }
                    Arr.push(obj);
                }
            }
            this.isRendered = true;
            this.gameBlocks = Arr;
        }
    }

    startGame() {
        setInterval(() => {
            this.move();
        }, 300);
    }

    move() {
        this.xHead = this.xHead + this.xSpeed;
        this.yHead = this.yHead + this.ySpeed;

    }
}