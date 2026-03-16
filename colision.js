const canvas = document.getElementById("canvas"); 
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#e6f2ff";

let score = 0;

class Ball {

constructor(x, y, radius, speed) {

this.posX = x;
this.posY = y;
this.radius = radius;

this.speed = speed;
this.dy = this.speed;

}

//dibujar balón tipo fútbol
draw(context) {

//círculo base
context.beginPath();
context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
context.fillStyle = "white";
context.fill();
context.strokeStyle = "black";
context.lineWidth = 2;
context.stroke();

//diseño simple (pentágono central)
context.beginPath();
context.arc(this.posX, this.posY, this.radius / 3, 0, Math.PI * 2);
context.fillStyle = "black";
context.fill();

context.closePath();
}

//caída
update(context) {

this.draw(context);

this.posY += this.dy;

//si sale de pantalla, reaparece arriba
if (this.posY - this.radius > window_height) {
this.reset();
}

}

//reiniciar arriba
reset() {

this.posY = -this.radius;
this.posX = Math.random() * window_width;

this.speed = getSpeed();
this.dy = this.speed;

}

}

//array
let balls = [];

//velocidad según puntaje
function getSpeed() {

if (score > 15) return Math.random() * 3 + 5; //alta
if (score > 10) return Math.random() * 2 + 3; //media

return Math.random() * 2 + 1; //inicial
}

//generar objetos
function generateBalls(n) {

for (let i = 0; i < n; i++) {

let radius = Math.random() * 20 + 15;
let x = Math.random() * window_width;
let y = Math.random() * window_height;

let speed = getSpeed();

balls.push(new Ball(x, y, radius, speed));

}

}

//detectar click
canvas.addEventListener("click", function(event) {

let rect = canvas.getBoundingClientRect();

let mouseX = event.clientX - rect.left;
let mouseY = event.clientY - rect.top;

balls.forEach((ball, index) => {

let dx = ball.posX - mouseX;
let dy = ball.posY - mouseY;

let distance = Math.sqrt(dx * dx + dy * dy);

if (distance <= ball.radius) {

//eliminar
balls.splice(index, 1);
score++;

//crear nuevo arriba
let radius = Math.random() * 20 + 15;
let x = Math.random() * window_width;

balls.push(new Ball(x, -radius, radius, getSpeed()));

}

});

});

//dibujar contador
function drawScore() {

ctx.font = "20px Arial";
ctx.fillStyle = "black";
ctx.fillText("Eliminadas: " + score, window_width - 180, 30);

}

//animación
function animate() {

ctx.clearRect(0, 0, window_width, window_height);

balls.forEach(ball => {
ball.update(ctx);
});

drawScore();

requestAnimationFrame(animate);

}

//crear balones
generateBalls(15);

animate();