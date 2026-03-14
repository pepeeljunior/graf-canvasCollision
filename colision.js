const canvas = document.getElementById("canvas"); 
let ctx = canvas.getContext("2d");

//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {

constructor(x, y, radius, color, text, speed) {

this.posX = x;
this.posY = y;
this.radius = radius;

this.color = color;
this.originalColor = color;

this.text = text;
this.speed = speed;

this.dx = (Math.random() * 2 - 1) * this.speed;
this.dy = (Math.random() * 2 - 1) * this.speed;

}

draw(context) {

context.beginPath();

context.strokeStyle = this.color;
context.textAlign = "center";
context.textBaseline = "middle";
context.font = "20px Arial";

context.fillText(this.text, this.posX, this.posY);

context.lineWidth = 2;
context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);

context.stroke();
context.closePath();

}

update(context) {

this.draw(context);

//Actualizar posición X
this.posX += this.dx;

if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
this.dx = -this.dx;
}

//Actualizar posición Y
this.posY += this.dy;

if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
this.dy = -this.dy;
}

}

}

//Array para almacenar los círculos
let circles = [];

//Generar círculos aleatorios
function generateCircles(n) {

for (let i = 0; i < n; i++) {

let radius = Math.random() * 30 + 20;

let x = Math.random() * (window_width - radius * 2) + radius;
let y = Math.random() * (window_height - radius * 2) + radius;

let color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

let speed = Math.random() * 4 + 1; //velocidad entre 1 y 5

let text = `C${i + 1}`;

circles.push(new Circle(x, y, radius, color, text, speed));

}

}


//Detección de colisiones
function detectCollisions() {

for (let i = 0; i < circles.length; i++) {

circles[i].color = circles[i].originalColor;

for (let j = i + 1; j < circles.length; j++) {

let dx = circles[i].posX - circles[j].posX;
let dy = circles[i].posY - circles[j].posY;

let distance = Math.sqrt(dx * dx + dy * dy);

if (distance <= circles[i].radius + circles[j].radius) {

circles[i].color = "#0000FF";
circles[j].color = "#0000FF";

}

}

}

}


//Animación
function animate() {

ctx.clearRect(0, 0, window_width, window_height);

detectCollisions();

circles.forEach(circle => {
circle.update(ctx);
});

requestAnimationFrame(animate);

}

//Crear 20 círculos
generateCircles(20);

animate();