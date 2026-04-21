const petZone = document.getElementById("petZone");
const petImgNormal = petZone.querySelector(".img-normal");
const petImgHappy = petZone.querySelector(".img-happy");
const imageDefault = petZone.querySelector(".image_default");
const imageHappy = petZone.querySelector(".image_happy");
const petCount = document.getElementById("petCount");
const pageTitle = document.getElementById("pageTitle");
const introOverlay = document.getElementById("introOverlay");

// 동물별 이미지 데이터
const ANIMALS = {
  kitaro: {
    label: "KITARO",
    emoji: "🐱",
    normal: "./asset/kitaro1.jpg",
    happy: "./asset/kitaro2.jpg",
  },
  gegero: {
    label: "GEGERO",
    emoji: "🐱",
    normal: "./asset/gegero1.jpg",
    happy: "./asset/gegero2.jpg",
  },
  mizuki: {
    label: "MIZUKI",
    emoji: "🐶",
    normal: "./asset/mizuki1.jpg",
    happy: "./asset/mizuki2.jpg",
  },
};

function switchAnimal(key) {
  const data = ANIMALS[key];
  if (!data) return;

  const currentClasses = Array.from(petZone.classList);
  currentClasses.forEach((cls) => {
    if (cls.startsWith("is-")) {
      petZone.classList.remove(cls);
    }
  });

  // 새로운 동물 클래스 추가
  petZone.classList.add(`is-${key}`);

  // 현재 동물 카운트 저장
  counts[currentAnimal] = count;

  // 이미지 교체
  imageDefault.src = data.normal;
  imageHappy.src = data.happy;
  imageDefault.alt = `${data.label}`;
  imageHappy.alt = `happy ${data.label}`;

  // 제목 업데이트
  pageTitle.textContent = `NADENADE ${data.label}${data.emoji}`;

  // 버튼 활성 상태
  document.querySelectorAll(".animal_button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.animal === key);
  });

  // 선택한 동물의 카운트 복원
  currentAnimal = key;
  count = counts[key];
  petCount.textContent = String(count);

  // 진행 중 상태 초기화
  resetTracking();
}

document.getElementById("animalSelector").addEventListener("click", (e) => {
  const btn = e.target.closest(".animal_button");
  if (btn) switchAnimal(btn.dataset.animal);
});

let count = 0;
let currentAnimal = "kitaro";
const counts = { kitaro: 0, gegero: 0, mizuki: 0 };
let lastX = null;
let lastDirection = null;
let pettingTimer = null;

// --- 흔들림 애니메이션 ---
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
// ---

// 쓰다듬는 중 → petting 클래스 (기쁜 표정), 멈추면 일정 시간 후 해제
function setPetting() {
  petZone.classList.add("petting");
  clearTimeout(pettingTimer);
  pettingTimer = setTimeout(() => {
    petZone.classList.remove("petting");
  }, 600);
}

const resetTracking = () => {
  lastX = null;
  lastDirection = null;
  clearTimeout(pettingTimer);
  petZone.classList.remove("petting");
  resetSway();
};

// 마우스 / 터치 공통 처리
function handleMove(currentX) {
  if (lastX === null) {
    lastX = currentX;
    return;
  }

  const deltaX = currentX - lastX;
  const threshold = 4; // 움직임 감지 임계값

  if (Math.abs(deltaX) < threshold) return;

  const currentDirection = deltaX > 0 ? "right" : "left";

  if (lastDirection && currentDirection !== lastDirection) {
    count += 1;
    petCount.textContent = String(count);
  }

  startSway(currentDirection);
  setPetting();

  lastDirection = currentDirection;
  lastX = currentX;
}

// 마우스 이벤트
petZone.addEventListener("mouseleave", resetTracking);
petZone.addEventListener("mousemove", (e) => handleMove(e.clientX));

// 터치 이벤트
petZone.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    lastX = e.touches[0].clientX;
  },
  { passive: false },
);

petZone.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  },
  { passive: false },
);

petZone.addEventListener("touchend", resetTracking);
