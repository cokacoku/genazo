const petZone = document.getElementById("petZone");
const petImgNormal = petZone.querySelector(".img-normal");
const petImgHappy = petZone.querySelector(".img-happy");
const petCount = document.getElementById("petCount");

let count = 0;
let lastX = null;
let lastDirection = null;
let pettingTimer = null;

// --- 흔들림 애니메이션 설정 ---
let swayAngle = 0;
let swayTarget = 0;
let swayRafId = null;
const MAX_ANGLE = 4;
const LERP_SPEED = 0.18;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function applyTransform(angle) {
  const tx = angle * 2.5;
  const t = `rotate(${angle}deg) translateX(${tx}px)`;
  petImgNormal.style.transform = t;
  petImgHappy.style.transform = t;
}

function animateSway() {
  swayAngle = lerp(swayAngle, swayTarget, LERP_SPEED);
  applyTransform(swayAngle);

  if (Math.abs(swayAngle - swayTarget) > 0.05) {
    swayRafId = requestAnimationFrame(animateSway);
  } else {
    swayAngle = swayTarget;
    applyTransform(swayAngle);
    swayRafId = null;
  }
}

function startSway(direction) {
  swayTarget = direction === "right" ? MAX_ANGLE : -MAX_ANGLE;
  if (!swayRafId) swayRafId = requestAnimationFrame(animateSway);
}

function resetSway() {
  swayTarget = 0;
  if (!swayRafId) swayRafId = requestAnimationFrame(animateSway);
}

// --- 상태 관리 기능 ---

// 쓰다듬는 중 처리 (기쁜 표정 활성화)
function setPetting() {
  petZone.classList.add("petting");
  clearTimeout(pettingTimer);
  pettingTimer = setTimeout(() => {
    petZone.classList.remove("petting");
  }, 600);
}

// 트래킹 초기화
const resetTracking = () => {
  lastX = null;
  lastDirection = null;
  clearTimeout(pettingTimer);
  petZone.classList.remove("petting");
  resetSway();
};

// 마우스 / 터치 공통 처리 로직
function handleMove(currentX) {
  if (lastX === null) {
    lastX = currentX;
    return;
  }

  const deltaX = currentX - lastX;
  const threshold = 4; // 움직임 감지 임계값

  if (Math.abs(deltaX) < threshold) return;

  const currentDirection = deltaX > 0 ? "right" : "left";

  // 방향이 바뀌었을 때 카운트 증가
  if (lastDirection && currentDirection !== lastDirection) {
    count += 1;
    petCount.textContent = String(count);
  }

  startSway(currentDirection);
  setPetting();

  lastDirection = currentDirection;
  lastX = currentX;
}

// --- 이벤트 리스너 ---

// 마우스 이벤트
petZone.addEventListener("mouseleave", resetTracking);
petZone.addEventListener("mousemove", (e) => handleMove(e.clientX));

// 터치 이벤트 (모바일 지원)
petZone.addEventListener(
  "touchstart",
  (e) => {
    // 스크롤 방지
    if (e.cancelable) e.preventDefault();
    lastX = e.touches[0].clientX;
  },
  { passive: false },
);

petZone.addEventListener(
  "touchmove",
  (e) => {
    if (e.cancelable) e.preventDefault();
    handleMove(e.touches[0].clientX);
  },
  { passive: false },
);

petZone.addEventListener("touchend", resetTracking);
