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
levelContainer.style.color = "#777";

levelContainer.innerHTML =
  'Level: <span style="color: #3cafcb; font-weight: bold;"><span id="level">1</span>/10</span>';

scoreBoard.appendChild(levelContainer);
const levelDisplay = document.getElementById("level");

// --- Image Preloading ---
const ballImg = new Image();
ballImg.src = "./asset/mizuki.png";

const paddleImg = new Image();
paddleImg.src = "./asset/gegero.png";

// --- Game State ---
let score = 0;
let isPlaying = false;
let animationId = null;
let speedIntervalId = null;
let lastTime = 0;

// --- Speed Level Configurations ---
let speedLevel = 1;
const MAX_LEVEL = 10;
const LEVEL_UP_TIME = 5000;
const SPEED_MULTIPLIER = 1.1;

const BASE_DX = 2.5;
const BASE_DY = -4.5;
const TARGET_FPS = 60;
const FRAME_DURATION = 1000 / TARGET_FPS; // 약 16.67ms

const LOGICAL_WIDTH = 360;
const LOGICAL_HEIGHT = 640;

let cachedCanvasRect = null;

// --- Game Objects ---
const paddle = {
  width: 140,
  height: 140,
  x: (LOGICAL_WIDTH - 140) / 2,
  speed: 8.5,
  isMovingLeft: false,
  isMovingRight: false,
};

const ball = {
  x: LOGICAL_WIDTH / 2,
  y: LOGICAL_HEIGHT - 400,
  dx: BASE_DX,
  dy: Math.abs(BASE_DY),
  radius: 60,
  angle: 0,
};

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

function drawStaticScene() {
  ctx.clearRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  if (ballImg.complete && paddleImg.complete) {
    drawBall();
    drawPaddle();
  }
}

// --- Responsive Resize ---
function resizeCanvas() {
  const gameWrapper = document.getElementById("game-wrapper");
  const titleEl = document.querySelector("h1");
  const scoreBoardEl = document.querySelector(".score-board");
  const accountEl = document.querySelector(".account");

  const wrapperStyle = window.getComputedStyle(gameWrapper);
  const paddingY =
    parseFloat(wrapperStyle.paddingTop) +
    parseFloat(wrapperStyle.paddingBottom);
  const paddingX =
    parseFloat(wrapperStyle.paddingLeft) +
    parseFloat(wrapperStyle.paddingRight);

  const otherElementsHeight =
    (titleEl ? titleEl.offsetHeight + 12 : 0) +
    (scoreBoardEl ? scoreBoardEl.offsetHeight + 12 : 0) +
    (accountEl ? accountEl.offsetHeight + 12 : 0);

  const ABSOLUTE_MAX_WIDTH = 480;
  let maxWidth = Math.min(window.innerWidth - paddingX, ABSOLUTE_MAX_WIDTH);
  let maxHeight = window.innerHeight - paddingY - otherElementsHeight;

  if (maxHeight < 250) maxHeight = 250;

  let displayWidth = maxWidth;
  let displayHeight = displayWidth * (LOGICAL_HEIGHT / LOGICAL_WIDTH);

  if (displayHeight > maxHeight) {
    displayHeight = maxHeight;
    displayWidth = displayHeight * (LOGICAL_WIDTH / LOGICAL_HEIGHT);
  }

  container.style.width = `${Math.floor(displayWidth)}px`;
  container.style.height = `${Math.floor(displayHeight)}px`;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = LOGICAL_WIDTH * dpr;
  canvas.height = LOGICAL_HEIGHT * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cachedCanvasRect = canvas.getBoundingClientRect();

  if (!isPlaying) {
    drawStaticScene();
  }
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("orientationchange", () => {
  setTimeout(resizeCanvas, 100);
});

// --- Game Control Functions ---
function resetGame() {
  score = 0;
  speedLevel = 1;
  scoreDisplay.innerText = score;
  levelDisplay.innerText = speedLevel;

  ball.x = LOGICAL_WIDTH / 2;
  ball.y = LOGICAL_HEIGHT - 400;
  ball.dx = Math.random() > 0.5 ? BASE_DX : -BASE_DX;
  ball.dy = Math.abs(BASE_DY);
  ball.angle = 0;

  paddle.x = (LOGICAL_WIDTH - paddle.width) / 2;
  cachedCanvasRect = canvas.getBoundingClientRect();
}

function startGame() {
  if (isPlaying) return;

  resetGame();
  isPlaying = true;
  lastTime = performance.now();

  uiOverlay.classList.add("hidden");
  startScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");

  animationId = requestAnimationFrame(updateGame);

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

function updateGame(currentTime) {
  if (!isPlaying) return;

  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  const timeScale = Math.min(deltaTime / FRAME_DURATION, 3);

  const stepX = ball.dx * timeScale;
  const stepY = ball.dy * timeScale;

  ctx.clearRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);

  drawBall();
  drawPaddle();

  // 좌우 벽 충돌 판정 및 즉시 위치 보정
  if (ball.x + stepX < ball.radius) {
    ball.dx = Math.abs(ball.dx);
    ball.x = ball.radius;
  } else if (ball.x + stepX > LOGICAL_WIDTH - ball.radius) {
    ball.dx = -Math.abs(ball.dx);
    ball.x = LOGICAL_WIDTH - ball.radius;
  }

  // 상단 벽 충돌 판정 및 즉시 위치 보정
  if (ball.y + stepY < ball.radius) {
    ball.dy = Math.abs(ball.dy);
    ball.y = ball.radius;
  }
  // 하단 패들 충돌 판단 영역
  else if (ball.y + stepY > LOGICAL_HEIGHT - paddle.height - ball.radius) {
    if (
      ball.dy > 0 &&
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.width &&
      ball.y <= LOGICAL_HEIGHT - paddle.height
    ) {
      const currentSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);

      let hitPosition =
        (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);

      if (hitPosition < -1) hitPosition = -1;
      if (hitPosition > 1) hitPosition = 1;

      const maxBounceAngle = Math.PI / 3;
      const bounceAngle = hitPosition * maxBounceAngle;

      ball.dx = currentSpeed * Math.sin(bounceAngle);
      ball.dy = -currentSpeed * Math.cos(bounceAngle);

      // 패들 내부 끼임 방지
      ball.y = LOGICAL_HEIGHT - paddle.height - ball.radius;

      score += 100;
      scoreDisplay.innerText = score;
    } else if (ball.y + stepY > LOGICAL_HEIGHT - ball.radius) {
      endGame();
      return;
    }
  }

  // 키보드 이동
  if (paddle.isMovingRight && paddle.x < LOGICAL_WIDTH - paddle.width) {
    paddle.x = Math.min(
      LOGICAL_WIDTH - paddle.width,
      paddle.x + paddle.speed * timeScale,
    );
  } else if (paddle.isMovingLeft && paddle.x > 0) {
    paddle.x = Math.max(0, paddle.x - paddle.speed * timeScale);
  }

  ball.x += ball.dx * timeScale;
  ball.y += ball.dy * timeScale;
  ball.angle += ball.dx * 0.02 * timeScale;

  animationId = requestAnimationFrame(updateGame);
}

// --- Initialization ---
ballImg.onload = drawStaticScene;
paddleImg.onload = drawStaticScene;
resizeCanvas();
