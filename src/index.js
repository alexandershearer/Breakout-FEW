import Brick from './js/Brick.js'
import Ball from './js/Ball.js'
import Paddle from './js/Paddle.js'
import Score from './js/Score.js'



const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let rightPressed = false;
let leftPressed = false;


const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;


const ball = new Ball(canvas);
const paddle = new Paddle(canvas);
const score = new Score(canvas)

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
    bricks[c] = [];

    for (let r = 0; r < brickRowCount; r += 1) {
        bricks[c][r] = new Brick(0, 0, 1);
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c += 1) {
        for (let r = 0; r < brickRowCount; r += 1) {
            if (bricks[c][r].status === 1) {
                const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#fff';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}



function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c += 1) {
        for (let r = 0; r < brickRowCount; r += 1) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    score.increaseScore();
                    if (score.score === (brickRowCount * brickColumnCount)) {
                        alert('YOU WIN, CONGRATULATIONS!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle.render(ctx)
    score.drawLives(ctx)
    score.drawScore(ctx)
    collisionDetection();
    ball.render(ctx);
    drawBricks();
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        } else {
            score.decreaseLives(1);
            if (!score.lives) {
                alert('GAME OVER');
                document.location.reload();
            } else {
                ball.x = canvas.width / 2;
                ball.y = canvas.height - 30;
                ball.dx = 3;
                ball.dy = -3;
                paddle.x = (canvas.width - paddle.width) / 2;
            }
        }
    }

    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 7;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    requestAnimationFrame(draw);
}



//Events 
function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
    }
}

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);


draw();
