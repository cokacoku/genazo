const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const container = canvas.parentElement;

// UI elements cached
const uiOverlay = document.getElementById("ui-overlay");
const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("final-score");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

// Dynamically add Level UI
const scoreBoard = document.querySelector(".score-board");
const levelContainer = document.createElement("span");
levelContainer.style.marginLeft = "20px";
levelContainer.style.color = "#2ecc71";
levelContainer.innerHTML = 'Level: <span id="level">1</span>/10';
scoreBoard.appendChild(levelContainer);
const levelDisplay = document.getElementById("level");

// --- Image Preloading ---
const ballImg = new Image();
ballImg.src = "./asset/ball.png";

const paddleImg = new Image();
paddleImg.src = "./asset/paddle.png";

// --- Game State ---
let score = 0;
let isPlaying = false;
let animationId = null;
let speedIntervalId = null;

// --- Speed Level Configurations ---
let speedLevel = 1;
const MAX_LEVEL = 10;
const LEVEL_UP_TIME = 5000;
const SPEED_MULTIPLIER = 1.15;

const BASE_DX = 2.5;
const BASE_DY = -4.5;

const LOGICAL_WIDTH = 360;
const LOGICAL_HEIGHT = 640;

// [Optimization] Cache bounding rect to prevent Layout Thrashing during touch/mouse moves
let cachedCanvasRect = null;

function resizeCanvas() {
  const maxWidth = window.innerWidth * 0.92;
  const maxHeight = window.innerHeight - 140;

  let displayWidth = maxWidth;
  let displayHeight = displayWidth * (LOGICAL_HEIGHT / LOGICAL_WIDTH);

  if (displayHeight > maxHeight) {
    displayHeight = maxHeight;
    displayWidth = displayHeight * (LOGICAL_WIDTH / LOGICAL_HEIGHT);
  }

  container.style.width = `${displayWidth}px`;
  container.style.height = `${displayHeight}px`;

  // [Optimization] Cap Device Pixel Ratio at 2 to save massive GPU fill-rate on high-end mobiles
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = LOGICAL_WIDTH * dpr;
  canvas.height = LOGICAL_HEIGHT * dpr;

  ctx.scale(dpr, dpr);

  // Update cached rect after DOM layout settles
  cachedCanvasRect = canvas.getBoundingClientRect();
}

// Initialize and bind resize events
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("orientationchange", resizeCanvas);

// --- Game Objects ---
const paddle = {
  width: 140,
  height: 140,
  x: (LOGICAL_WIDTH - 70) / 2,
  speed: 8.5,
  isMovingLeft: false,
  isMovingRight: false,
};

const ball = {
  x: LOGICAL_WIDTH / 2,
  y: LOGICAL_HEIGHT - 120,
  dx: BASE_DX,
  dy: BASE_DY,
  radius: 60,
  angle: 0,
};

// --- Game Control Functions ---
function resetGame() {
  score = 0;
  speedLevel = 1;
  scoreDisplay.innerText = score;
  levelDisplay.innerText = speedLevel;

  ball.x = LOGICAL_WIDTH / 2;
  ball.y = LOGICAL_HEIGHT - 150;
  ball.dx = Math.random() > 0.5 ? BASE_DX : -BASE_DX;
  ball.dy = BASE_DY;
  ball.angle = 0;

  paddle.x = (LOGICAL_WIDTH - paddle.width) / 2;

  // Ensure rect is accurate before starting
  cachedCanvasRect = canvas.getBoundingClientRect();
}

function startGame() {
  if (isPlaying) return;

  resetGame();
  isPlaying = true;

  uiOverlay.classList.add("hidden");
  startScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");

  updateGame();

  speedIntervalId = setInterval(() => {
    if (isPlaying && speedLevel < MAX_LEVEL) {
      speedLevel++;
      levelDisplay.innerText = speedLevel;
      ball.dx *= SPEED_MULTIPLIER;
      ball.dy *= SPEED_MULTIPLIER;
    }
  }, LEVEL_UP_TIME);
}

function endGame() {
  isPlaying = false;
  if (animationId) cancelAnimationFrame(animationId);
  if (speedIntervalId) clearInterval(speedIntervalId);

  finalScoreDisplay.innerText = score;
  uiOverlay.classList.remove("hidden");
  gameOverScreen.classList.remove("hidden");
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

// --- Controls & Event Listeners ---
document.addEventListener("keydown", (e) => {
  if (e.key === "Right" || e.key === "ArrowRight") paddle.isMovingRight = true;
  else if (e.key === "Left" || e.key === "ArrowLeft")
    paddle.isMovingLeft = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Right" || e.key === "ArrowRight") paddle.isMovingRight = false;
  else if (e.key === "Left" || e.key === "ArrowLeft")
    paddle.isMovingLeft = false;
});

function handlePointerMove(e) {
  if (!isPlaying || !cachedCanvasRect) return;

  let clientX;
  if (e.type === "touchmove" || e.type === "touchstart") {
    clientX = e.touches[0].clientX;
  } else {
    clientX = e.clientX;
  }

  // [Optimization] Uses cachedCanvasRect instead of calling getBoundingClientRect() every single touch event
  const scaleX = LOGICAL_WIDTH / cachedCanvasRect.width;
  let canvasX = (clientX - cachedCanvasRect.left) * scaleX;
  paddle.x = canvasX - paddle.width / 2;

  if (paddle.x < 0) paddle.x = 0;
  if (paddle.x > LOGICAL_WIDTH - paddle.width)
    paddle.x = LOGICAL_WIDTH - paddle.width;
}

container.addEventListener("touchstart", handlePointerMove, { passive: false });
container.addEventListener("touchmove", handlePointerMove, { passive: false });
container.addEventListener("mousemove", handlePointerMove);

// --- Render Functions ---
function drawBall() {
  ctx.save();
  ctx.translate(ball.x, ball.y);
  ctx.rotate(ball.angle);

  const size = ball.radius * 2;
  ctx.drawImage(ballImg, -ball.radius, -ball.radius, size, size);
  ctx.restore();
}

function drawPaddle() {
  ctx.drawImage(
    paddleImg,
    paddle.x,
    LOGICAL_HEIGHT - paddle.height,
    paddle.width,
    paddle.height,
  );
}

function drawInitialBackground() {
  ctx.clearRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  // Draw elements only when images are loaded natively
  if (ballImg.complete && paddleImg.complete) {
    drawBall();
    drawPaddle();
  } else {
    ballImg.onload = paddleImg.onload = () => {
      ctx.clearRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
      drawBall();
      drawPaddle();
    };
  }
}

// --- Main Game Loop ---
function updateGame() {
  if (!isPlaying) return;

  ctx.clearRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);

  drawBall();
  drawPaddle();

  // Wall Collision (Left / Right)
  if (
    ball.x + ball.dx > LOGICAL_WIDTH - ball.radius ||
    ball.x + ball.dx < ball.radius
  ) {
    ball.dx = -ball.dx;
  }

  // Wall Collision (Top)
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  }
  // Paddle Collision Area
  else if (ball.y + ball.dy > LOGICAL_HEIGHT - paddle.height - ball.radius) {
    if (
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.width &&
      ball.y <= LOGICAL_HEIGHT - paddle.height
    ) {
      ball.dy = -Math.abs(ball.dy);
      score += 100;
      scoreDisplay.innerText = score;
    } else if (ball.y + ball.dy > LOGICAL_HEIGHT - ball.radius) {
      endGame();
      return;
    }
  }

  // Keyboard Movement Smooth Update
  if (paddle.isMovingRight && paddle.x < LOGICAL_WIDTH - paddle.width) {
    paddle.x += paddle.speed;
  } else if (paddle.isMovingLeft && paddle.x > 0) {
    paddle.x -= paddle.speed;
  }

  // Move Ball & Update Rotation
  ball.x += ball.dx;
  ball.y += ball.dy;
  ball.angle += ball.dx * 0.04;

  animationId = requestAnimationFrame(updateGame);
}

// Draw preview screen on startup
drawInitialBackground();
