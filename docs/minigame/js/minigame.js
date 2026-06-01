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

// --- Speed Level Configurations ---
let speedLevel = 1;
const MAX_LEVEL = 10;
const LEVEL_UP_TIME = 5000;
const SPEED_MULTIPLIER = 1.15;

const BASE_DX = 2.5;
const BASE_DY = -4.5;

const LOGICAL_WIDTH = 360;
const LOGICAL_HEIGHT = 640;

let cachedCanvasRect = null;

function resizeCanvas() {
  let maxWidth = window.innerWidth * 0.92;

  const ABSOLUTE_MAX_WIDTH = 420;
  if (maxWidth > ABSOLUTE_MAX_WIDTH) {
    maxWidth = ABSOLUTE_MAX_WIDTH;
  }

  const maxHeight = window.innerHeight - 200;

  let displayWidth = maxWidth;
  let displayHeight = displayWidth * (LOGICAL_HEIGHT / LOGICAL_WIDTH);

  if (displayHeight > maxHeight) {
    displayHeight = maxHeight;
    displayWidth = displayHeight * (LOGICAL_WIDTH / LOGICAL_HEIGHT);
  }

  container.style.width = `${displayWidth}px`;
  container.style.height = `${displayHeight}px`;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = LOGICAL_WIDTH * dpr;
  canvas.height = LOGICAL_HEIGHT * dpr;

  ctx.scale(dpr, dpr);
  cachedCanvasRect = canvas.getBoundingClientRect();
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("orientationchange", resizeCanvas);

// --- Game Objects ---
const paddle = {
  width: 140,
  height: 140,
  x: (LOGICAL_WIDTH - 140) / 2, // 초기 중앙 정렬 공식 수정 (width 반영)
  speed: 8.5,
  isMovingLeft: false,
  isMovingRight: false,
};

const ball = {
  x: LOGICAL_WIDTH / 2,
  y: LOGICAL_HEIGHT - 300,
  dx: BASE_DX,
  dy: Math.abs(BASE_DY), // 💡 시작할 때 아래로 떨어지도록 양수로 설정
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
  ball.y = LOGICAL_HEIGHT - 300;
  ball.dx = Math.random() > 0.5 ? BASE_DX : -BASE_DX;
  ball.dy = Math.abs(BASE_DY); // 💡 리셋 시에도 아래로 떨어지도록 양수 고정
  ball.angle = 0;

  paddle.x = (LOGICAL_WIDTH - paddle.width) / 2;
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

  // 💡 [버그 수정] 좌우 벽 충돌 판정 및 즉시 위치 보정
  if (ball.x + ball.dx < ball.radius) {
    ball.dx = Math.abs(ball.dx); // 무조건 오른쪽 이동
    ball.x = ball.radius; // 좌측 벽 표면에 고정
  } else if (ball.x + ball.dx > LOGICAL_WIDTH - ball.radius) {
    ball.dx = -Math.abs(ball.dx); // 무조건 왼쪽 이동
    ball.x = LOGICAL_WIDTH - ball.radius; // 우측 벽 표면에 고정
  }

  // 💡 [버그 수정] 상단 벽 충돌 판정 및 즉시 위치 보정
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = Math.abs(ball.dy); // 무조건 아래로 이동
    ball.y = ball.radius; // 천장 표면에 고정
  }

  // 하단 패들 충돌 판단 영역
  else if (ball.y + ball.dy > LOGICAL_HEIGHT - paddle.height - ball.radius) {
    // 💡 ball.dy > 0 조건을 주어 아래로 떨어질 때만 패들 충돌을 연산하도록 제한
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

      // 💡 [버그 수정] 패들 내부에 끼어서 점수가 폭발하지 않도록 패들 위 표면으로 즉시 강제 텔레포트
      ball.y = LOGICAL_HEIGHT - paddle.height - ball.radius;

      score += 100;
      scoreDisplay.innerText = score;
    } else if (ball.y + ball.dy > LOGICAL_HEIGHT - ball.radius) {
      endGame();
      return;
    }
  }

  // 키보드 이동
  if (paddle.isMovingRight && paddle.x < LOGICAL_WIDTH - paddle.width) {
    paddle.x += paddle.speed;
  } else if (paddle.isMovingLeft && paddle.x > 0) {
    paddle.x -= paddle.speed;
  }

  // 공 위치 및 회전 애니메이션 업데이트
  ball.x += ball.dx;
  ball.y += ball.dy;
  ball.angle += ball.dx * 0.02;

  animationId = requestAnimationFrame(updateGame);
}

drawInitialBackground();
