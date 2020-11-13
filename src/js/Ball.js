class Ball {
    constructor(canvas, color = '#fc6203') {
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
        this.dx = 2;
        this.dy = -2;
        this.radius = 10;
        this.color = color;
        this.canvas = canvas;
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

export default Ball