class Lives {
    constructor() {

    }

    render(ctx) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#fc6203';
        ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
    }
}

export default Lives