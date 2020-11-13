class Score {
    constructor(canvas, score = 0, lives = 3) {
        this.canvas = canvas;
        this.score = score;
        this.lives = lives;
    }

    drawScore(ctx) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#0095DD';
        ctx.fillText(`Score: ${this.score}`, 8, 20);
    }

    drawLives(ctx) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#0095DD';
        ctx.fillText(`Lives: ${this.lives}`, this.canvas.width - 65, 20);
    }

    increaseScore() {
        this.score += 1;
    }

    decreaseScore() {
        this.score -= 1;
    }

    resetScore() {
        this.score = 0;
    }

    decreaseLives() {
        this.lives -= 1;
    }

    resetLives() {
        this.lives = 3;
    }
}

export default Score;