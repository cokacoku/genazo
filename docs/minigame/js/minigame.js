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
levelContainer.style.color = "#777"; // 'Level: ' 글자의 기본 색상 유지

// 💡 [수정됨] 숫자 부분(1/10)만 <span>으로 한 번 더 감싸고 컬러 지정
levelContainer.innerHTML =
  'Level: <span style="color: #3cafcb; font-weight: bold;"><span id="level">1</span>/10</span>';

scoreBoard.appendChild(levelContainer);
const levelDisplay = document.getElementById("level");
// --- Image Preloading ---
const ballImg = new Image();
ballImg.src = "./asset/mizuki.png"; // 상대경로 적용 (필요시 ./asset/ 로 변경)

const paddleImg = new Image();
paddleImg.src = "./asset/gegero.png"; // 상대경로 적용 (필요시 ./asset/ 로 변경)

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
  // 1. 디바이스 전체 가로 너비의 92%를 기본 가용 너비로 설정
  let maxWidth = window.innerWidth * 0.92;

  // 🔥 [추가] PC/태블릿 대화면 대응: 게임 화면이 최대 420px을 넘지 않도록 제한
  const ABSOLUTE_MAX_WIDTH = 420;
  if (maxWidth > ABSOLUTE_MAX_WIDTH) {
    maxWidth = ABSOLUTE_MAX_WIDTH;
  }

  // 2. 전체 화면 높이에서 UI 여백을 제외한 영역을 최대 높이로 설정
  const maxHeight = window.innerHeight - 200;

  let displayWidth = maxWidth;
  let displayHeight = displayWidth * (LOGICAL_HEIGHT / LOGICAL_WIDTH);

  // 계산된 높이가 가용 가능한 최대 높이를 넘어서면, 높이를 기준으로 크기를 재조정
  if (displayHeight > maxHeight) {
    displayHeight = maxHeight;
    displayWidth = displayHeight * (LOGICAL_WIDTH / LOGICAL_HEIGHT);
  }

  // 스타일 적용하여 상위 컨테이너 크기 고정
  container.style.width = `${displayWidth}px`;
  container.style.height = `${displayHeight}px`;

  // DPR 최적화 및 캔버스 크기 반영
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = LOGICAL_WIDTH * dpr;
  canvas.height = LOGICAL_HEIGHT * dpr;

  ctx.scale(dpr, dpr);

  // 터치 연산용 렉트 정보 캐싱 업데이트
  cachedCanvasRect = canvas.getBoundingClientRect();
}

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
  y: LOGICAL_HEIGHT - 300,
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
  ball.y = LOGICAL_HEIGHT - 300; // 💡 시작할 때도 파묻히지 않도록 높이를 위로 올림
  ball.dx = Math.random() > 0.5 ? BASE_DX : -BASE_DX;
  ball.dy = BASE_DY;
  ball.angle = 0;

  // 패들 초기화 위치도 width(140)에 맞게 올바르게 중앙 정렬되도록 수정했습니다.
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

  // 벽 충돌 (좌우)
  if (
    ball.x + ball.dx > LOGICAL_WIDTH - ball.radius ||
    ball.x + ball.dx < ball.radius
  ) {
    ball.dx = -ball.dx;
  }

  // 벽 충돌 (상단)
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  }
  // 하단 패들 충돌 판단 영역
  else if (ball.y + ball.dy > LOGICAL_HEIGHT - paddle.height - ball.radius) {
    if (
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.width &&
      ball.y <= LOGICAL_HEIGHT - paddle.height
    ) {
      // 💡 [핵심 최적화: 다이나믹 반사각 물리 연산]
      // 1. 현재 공의 전체 속도 크기(벡터 길이)를 구합니다. (레벨에 따른 총속도를 보존하기 위함)
      const currentSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);

      // 2. 패들의 중심점 대비 공이 맞은 위치 비율을 계산합니다. (-1에서 1사이의 값)
      // 왼쪽 끝에 맞으면 -1, 정중앙에 맞으면 0, 오른쪽 끝에 맞으면 1이 됩니다.
      let hitPosition =
        (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);

      // 예외 방지 고정값 처리
      if (hitPosition < -1) hitPosition = -1;
      if (hitPosition > 1) hitPosition = 1;

      // 3. 튕겨나갈 최대 각도를 지정합니다. (Math.PI / 3 = 60도)
      const maxBounceAngle = Math.PI / 3;
      const bounceAngle = hitPosition * maxBounceAngle;

      // 4. 계산된 각도와 원래 속도를 기준으로 x축, y축 속도를 재분배합니다.
      ball.dx = currentSpeed * Math.sin(bounceAngle);
      ball.dy = -currentSpeed * Math.cos(bounceAngle); // 위로 튕겨야 하므로 항상 음수

      // 점수 증가 및 UI 업데이트
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
