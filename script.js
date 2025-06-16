const body = document.body;
const colorPicker = document.getElementById('colorPicker');
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let bubbles = [];
let newColor = null;
let bubbleColor = "#ffffff";

function getRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

body.style.backgroundColor = getRandomColor();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

function createBubbles(count) {
  bubbles = []; // limpar bolhas anteriores
  for (let i = 0; i < count; i++) {
    bubbles.push({
      x: Math.random() * width,
      y: height + Math.random() * height,
      radius: 60 + Math.random() * 60,
      speed: 4 + Math.random() * 3,
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  bubbles.forEach((bubble, index) => {
    bubble.y -= bubble.speed;

    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fillStyle = bubbleColor;
    ctx.fill();
  });

  // manter só as bolhas visíveis
  bubbles = bubbles.filter(b => b.y + b.radius >= 0);

  requestAnimationFrame(animate);
}

animate();

colorPicker.addEventListener('input', (e) => {
  newColor = e.target.value;
  bubbleColor = newColor;
  createBubbles(600);

  // mudar cor após 3 segundos
  setTimeout(() => {
    body.style.backgroundColor = newColor;
  }, 3000);
});
