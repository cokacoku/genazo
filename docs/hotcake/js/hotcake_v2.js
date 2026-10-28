// ==========================================
// 0. 다국어(i18n) 설정 및 브라우저/OS 언어 자동 감지
// ==========================================
function detectLanguage() {
  const langs = navigator.languages || [
    navigator.language || navigator.userLanguage || "en",
  ];
  for (const l of langs) {
    if (!l) continue;
    const code = l.toLowerCase();
    if (code.startsWith("ko")) return "ko";
    if (code.startsWith("ja")) return "ja";
  }
  return "en"; // 한국어/일본어가 아니면 기본 영어로 노출
}

const CURRENT_LANG = detectLanguage();

// 일본어 환경일 때 귀여운 둥근 일본어 폰트 자동 추가 로드
if (CURRENT_LANG === "ja" && typeof document !== "undefined") {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700;800&display=swap";
  document.head.appendChild(link);
}

const I18N = {
  ko: {
    pageTitle: "미즈키씨의 핫케이크 타워 🥞",
    hudCurrent: "현재 높이",
    hudBest: "최고 기록",
    unitSheet: "장",
    unitFloor: "층",
    soundTitle: "소리 켜기/끄기",
    badgeRetro: "GENAZO FANMADE GAME",
    titleHtml:
      '미즈키씨의<br><span class="text-[#FFE169]">핫케이크</span> 타워',
    subtitleHtml:
      "프라이팬을 튕겨 핫케이크를 높이 쌓아보세요!<br>완성된 타워 꼭대기엔 고소한 버터가 올라갑니다!",
    rule1Html: "<b>클릭 / 터치 / 스페이스바</b>로 핫케이크 토스!",
    rule2Html: "PC, Mobile OK!",
    startBtn: "🥞 START!",
    countingTitle: "접시 위 핫케이크 높이 세는 중...",
    countingSub: "접시 맨 아래부터 차곡차곡 세어봅니다!",
    countingZero: "아쉽게도 한 장도 올리지 못했어요 😢",
    saveBtn: "📸 결과 이미지 저장",
    retryBtn: "🔄 다시 쌓아보기!",
    playHintHtml:
      '👆 화면 클릭 또는 <kbd class="px-1.5 py-0.5 bg-[#FFE169] text-[#3E2314] rounded font-extrabold mx-0.5">Space</kbd> 로 던지기!',
    failCollapse: "무게중심이 한쪽으로 쏠려 무너졌어요!",
    failSlip: "모서리에서 미끄러져 떨어졌어요!",
    failMiss: "조준 실패! 핫케이크가 바닥에 떨어졌어요!",
    rank0: "다음엔 꼭 접시 위에 올려봐요! 🍳",
    rank1: "한 장 성공! 땀이 삐질 나네요 😅",
    rank2: "귀여운 꼬마 핫케이크 간식 완성! 🥞",
    rank3: "오호! 카페 인기 메뉴 부럽지 않아요! ☕",
    rank4: "대단해요! 전설의 파티시에 실력! 👨‍🍳✨",
    rank5: "구름을 뚫는 핫케이크 마천루!! 🏰🌟",
    rank6: "우주까지 닿을 기세! 핫케이크 신 등극!! 🚀👑",
    photoTitle: "🥞 미즈키씨의 핫케이크 타워",
    shareTitle: "미즈키씨의 핫케이크 타워",
    shareText: (n) => `핫케이크를 ${n}층 쌓았어요! 🥞✨`,
    floorMark: (n) => `${n}층`,
    modalHint: "👆 이미지를 꾹 길게 눌러서 사진첩에 저장하세요!",
    modalClose: "닫기",
  },
  ja: {
    pageTitle: "ミズキさんのホットケーキタワー 🥞",
    hudCurrent: "現在の高さ",
    hudBest: "ベスト記録",
    unitSheet: "枚",
    unitFloor: "段",
    soundTitle: "サウンド ON/OFF",
    badgeRetro: "GENAZO FANMADE GAME",
    titleHtml:
      'ミズキさんの<br><span class="text-[#FFE169]">ホットケーキ</span><br>タワー',
    subtitleHtml:
      "フライパンを弾いてホットケーキを高く積み上げよう！<br>完成したタワーの頂上にはバターが乗るよ！",
    rule1Html: "<b>クリック / タップ / Spaceキー</b>でトス！",
    rule2Html: "PC, Mobile OK!",
    startBtn: "🥞 START！",
    countingTitle: "積み上げた高さをカウント中...",
    countingSub: "お皿の一番下から順番に数えるよ！",
    countingZero: "残念！1枚も乗せられませんでした 😢",
    saveBtn: "📸 結果画像を保存",
    retryBtn: "🔄 もう一度挑戦！",
    playHintHtml:
      '👆 画面クリック または <kbd class="px-1.5 py-0.5 bg-[#FFE169] text-[#3E2314] rounded font-extrabold mx-0.5">Space</kbd> でトス！',
    failCollapse: "重心が偏ってタワーが崩れちゃった！",
    failSlip: "端っこから滑り落ちちゃった！",
    failMiss: "狙いミス！床に落ちちゃった！",
    rank0: "次はきっとお皿の上に乗せよう！ 🍳",
    rank1: "1枚成功！ドキドキしたね 😅",
    rank2: "かわいいミニホットケーキの完成！ 🥞",
    rank3: "おおっ！喫茶店の人気メニュー級！ ☕",
    rank4: "すごい！伝説のパティシエの腕前！ 👨‍🍳✨",
    rank5: "雲を突き抜けるホットケーキ摩天楼！！ 🏰🌟",
    rank6: "宇宙まで届きそう！ホットケーキの神降臨！！ 🚀👑",
    photoTitle: "🥞 ミズキさんのホットケーキタワー",
    shareTitle: "ミズキさんのホットケーキタワー",
    shareText: (n) => `ホットケーキを${n}段積み上げたよ！ 🥞✨`,
    floorMark: (n) => `${n}段`,
    modalHint: "👆 画像を長押しして「写真に保存」してください！",
    modalClose: "閉じる",
  },
  en: {
    pageTitle: "Mizuki's Hotcake Tower 🥞",
    hudCurrent: "HEIGHT",
    hudBest: "BEST",
    unitSheet: "",
    unitFloor: "F",
    soundTitle: "Mute / Unmute",
    badgeRetro: "GENAZO FANMADE GAME",
    titleHtml: 'Mizuki\'s<br><span class="text-[#FFE169]">Hotcake</span> Tower',
    subtitleHtml:
      "Flip the pan to stack hotcakes as high as you can!<br>A golden pat of butter awaits at the very top!",
    rule1Html: "<b>Click / Tap / Spacebar</b> to toss!",
    rule2Html: "PC, Mobile OK!",
    startBtn: "🥞 START!",
    countingTitle: "Counting your hotcake tower...",
    countingSub: "Counting up from the bottom plate!",
    countingZero: "Oh no! Couldn't land a single hotcake 😢",
    saveBtn: "📸 Save Photo",
    retryBtn: "🔄 Play Again!",
    playHintHtml:
      '👆 Click anywhere or press <kbd class="px-1.5 py-0.5 bg-[#FFE169] text-[#3E2314] rounded font-extrabold mx-0.5">Space</kbd> to toss!',
    failCollapse: "The tower leaned too far and collapsed!",
    failSlip: "Slipped right off the edge!",
    failMiss: "Missed the plate! Hotcake hit the floor!",
    rank0: "Let's land one on the plate next time! 🍳",
    rank1: "Just one! Phew, that was close 😅",
    rank2: "A cute little hotcake snack! 🥞",
    rank3: "Nice! Good enough for a cozy cafe menu! ☕",
    rank4: "Amazing! Legendary pastry chef skills! 👨‍🍳✨",
    rank5: "Sky-high hotcake skyscraper!! 🏰🌟",
    rank6: "Reaching into space! Hotcake God!! 🚀👑",
    photoTitle: "🥞 Mizuki's Hotcake Tower",
    shareTitle: "Mizuki's Hotcake Tower",
    shareText: (n) => `I stacked ${n} hotcakes! 🥞✨`,
    floorMark: (n) => `${n}F`,
    modalHint: "👆 Long-press the image to save to your photos!",
    modalClose: "Close",
  },
};

const T = I18N[CURRENT_LANG];

const BEST_SCORE_KEY = "peng_pancake_best";
function loadBestScore() {
  try {
    return parseInt(localStorage.getItem(BEST_SCORE_KEY) || "0", 10) || 0;
  } catch {
    return 0;
  }
}
function saveBestScore(score) {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch {
    // 스토리지 제한 환경에서는 무시
  }
}

// HTML DOM의 텍스트를 현재 감지된 언어로 자동 변환
function applyLocalizationToDOM() {
  document.documentElement.lang = CURRENT_LANG;
  document.title = T.pageTitle;

  const hudCurrentLabel = document.getElementById("hud-current-label");
  if (hudCurrentLabel) hudCurrentLabel.textContent = T.hudCurrent;

  const hudCountUnit = document.getElementById("hud-count-unit");
  if (hudCountUnit) hudCountUnit.textContent = T.unitSheet;

  const hudBestLabel = document.getElementById("hud-best-label");
  if (hudBestLabel) hudBestLabel.textContent = T.hudBest;

  const hudBestUnit = document.getElementById("hud-best-unit");
  if (hudBestUnit) hudBestUnit.textContent = T.unitSheet;

  const sBtn = document.getElementById("sound-btn");
  if (sBtn) sBtn.title = T.soundTitle;

  const badge = document.getElementById("title-badge");
  if (badge) badge.textContent = T.badgeRetro;

  const h1 = document.getElementById("title-heading");
  if (h1) {
    h1.innerHTML = T.titleHtml;
    if (CURRENT_LANG === "ja") {
      h1.style.fontFamily = "'M PLUS Rounded 1c', 'Pretendard', sans-serif";
    }
  }

  const descP = document.getElementById("title-sub");
  if (descP) descP.innerHTML = T.subtitleHtml;

  const rule1El = document.getElementById("rule-1");
  const rule2El = document.getElementById("rule-2");
  if (rule1El && rule2El) {
    rule1El.innerHTML = T.rule1Html;
    rule2El.innerHTML = T.rule2Html;
  } else {
    const ruleSpans = document.querySelectorAll(
      "#start-overlay .toy-card > div > span:nth-child(2)",
    );
    if (ruleSpans[0]) ruleSpans[0].innerHTML = T.rule1Html;
    if (ruleSpans[1]) ruleSpans[1].innerHTML = T.rule2Html;
  }

  const startBtnEl = document.getElementById("start-btn");
  if (startBtnEl) startBtnEl.innerHTML = `<span>${T.startBtn}</span>`;

  const countingTitleEl = document.getElementById("counting-title");
  if (countingTitleEl) countingTitleEl.textContent = T.countingTitle;

  const talliedUnitEl = document.getElementById("tallied-unit");
  if (talliedUnitEl) talliedUnitEl.textContent = T.unitFloor;

  const rankTextEl = document.getElementById("result-rank-text");
  if (rankTextEl) rankTextEl.textContent = T.countingSub;

  const saveBtnEl = document.getElementById("save-img-btn");
  if (saveBtnEl) saveBtnEl.innerHTML = `<span>${T.saveBtn}</span>`;

  const retryBtnEl = document.getElementById("retry-btn");
  if (retryBtnEl) retryBtnEl.innerHTML = `<span>${T.retryBtn}</span>`;

  const hintBox =
    document.getElementById("play-hint-box") ||
    document.querySelector("#play-hint > div");
  if (hintBox) hintBox.innerHTML = T.playHintHtml;
}

// ==========================================
// 0-1. 커스텀 이미지 설정
// ==========================================
const IMAGE_SOURCES = {
  pancake: "./asset/hotcake.png",
  plate: "./asset/plate.png",
  pan: "./asset/pan.png",
  butter: "./asset/butter.png",

  // 기본 캐릭터 이미지 (플레이 중 표시)
  charLeft: "./asset/char_left.png",
  charRight: "./asset/char_right.png",

  // 결과 화면 표정별 캐릭터 이미지 (파일이 없으면 자동으로 기본 캐릭터가 표시됨)
  // 1) 1개일 때: 땀 흘리는 표정
  charLeftSweat: "./asset/char_left_sweat.png",
  charRightSweat: "./asset/char_right_sweat.png",
  // 2) 2개 ~ 9개일 때: 뿌듯한 표정
  charLeftProud: "./asset/char_left_proud.png",
  charRightProud: "./asset/char_right_proud.png",
  // 3) 10개 이상일 때: 우와 하는 표정
  charLeftWow: "./asset/char_left_wow.png",
  charRightWow: "./asset/char_right_wow.png",
};

// 배경 캐릭터 크기 및 위치 조절 설정
const CHAR_CONFIG = {
  left: {
    width: 149,
    height: 160,
    x: 8,
    offsetY: 0,
    scale: 1.0,
  },
  right: {
    width: 137,
    height: 120,
    x: 300,
    offsetY: 0,
    scale: 1.0,
  },
};

const sprites = {};
Object.keys(IMAGE_SOURCES).forEach((key) => {
  const src = IMAGE_SOURCES[key];
  if (src) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    sprites[key] = img;
  }
});

function isSpriteReady(key) {
  const img = sprites[key];
  return Boolean(img && img.complete && img.naturalWidth > 0);
}

function getCharacterSprite(side) {
  const baseKey = side === "left" ? "charLeft" : "charRight";

  if (gameState === STATE.TALLY || gameState === STATE.COLLAPSING) {
    const count = stack.length;
    let expKey = baseKey;

    if (count === 1) {
      expKey = side === "left" ? "charLeftSweat" : "charRightSweat";
    } else if (count >= 2 && count <= 9) {
      expKey = side === "left" ? "charLeftProud" : "charRightProud";
    } else if (count >= 10) {
      expKey = side === "left" ? "charLeftWow" : "charRightWow";
    }

    if (isSpriteReady(expKey)) {
      return sprites[expKey];
    }
  }

  if (isSpriteReady(baseKey)) {
    return sprites[baseKey];
  }
  return null;
}

// ==========================================
// 1. 효과음 합성기 (Web Audio API)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playFlip() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.16);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playLand(perfect = false, stackCount = 1) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    const baseFreq = 140 + Math.min(stackCount * 6, 200);
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.12);

    gain.gain.setValueAtTime(0.32, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.13);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);

    if (perfect) {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const pOsc = this.ctx.createOscillator();
        const pGain = this.ctx.createGain();
        pOsc.type = "sine";
        pOsc.frequency.setValueAtTime(freq, now + idx * 0.045);
        pGain.gain.setValueAtTime(0.14, now + idx * 0.045);
        pGain.gain.exponentialRampToValueAtTime(
          0.008,
          now + idx * 0.045 + 0.22,
        );
        pOsc.connect(pGain);
        pGain.connect(this.ctx.destination);
        pOsc.start(now + idx * 0.045);
        pOsc.stop(now + idx * 0.045 + 0.23);
      });
    }
  }

  playCountTick(index) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    const semitone = Math.min(index, 36);
    const freq = 330 * Math.pow(2, semitone / 18);
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.008, now + 0.11);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playCollapse() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [300, 240, 190, 130].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      osc.frequency.linearRampToValueAtTime(
        freq * 0.7,
        now + idx * 0.08 + 0.15,
      );

      gain.gain.setValueAtTime(0.15, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.08 + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.17);
    });
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      const start = now + i * 0.09;
      const dur = i === notes.length - 1 ? 0.45 : 0.15;
      osc.frequency.setValueAtTime(f, start);
      gain.gain.setValueAtTime(0.22, start);
      gain.gain.exponentialRampToValueAtTime(0.008, start + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + dur);
    });
  }
}

const sfx = new SoundFX();

// ==========================================
// 2. 게임 상수 및 상태 정의
// ==========================================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const STATE = {
  TITLE: "TITLE",
  PLAYING: "PLAYING",
  COLLAPSING: "COLLAPSING",
  TALLY: "TALLY",
};

let gameState = STATE.TITLE;

const WORLD_W = 440;
const WORLD_H = 760;

// 접시 및 핫케이크 크기 상수
const PLATE_CENTER_Y = 544; // 접시 전체의 수직 정중앙 Y 좌표
const PLATE_DRAW_W = 180; // 접시 이미지 가로 표시 크기
const PLATE_DRAW_H = 38; // 접시 이미지 세로 표시 크기
const PLATE_WIDTH = 158; // 물리 판정용 접시 유효 폭

const PANCAKE_W = 114; // 핫케이크 가로 표시 크기
const PANCAKE_H = 22; // 핫케이크 세로 표시 크기
const STACK_STEP = PANCAKE_H - 3; // 층간 간격 (19px)

const BASE_PAN_SPEED = 1.8;
const ADD_PAN_SPEED = 0.075;

let stack = [];
let activePancake = null;
let fallingPancakes = [];
let particles = [];
let floatingTexts = [];

const pan = {
  x: WORLD_W / 2,
  y: 675,
  time: 0,
  speed: BASE_PAN_SPEED,
  range: 142,
  flipAnim: 0,
};

let towerSwayAngle = 0;
let towerSwayVel = 0;
let centerOfGravityOffset = 0;
let collapseReason = "";

const camera = {
  y: 0,
  targetY: 0,
  scale: 1,
  targetScale: 1,
  focusX: WORLD_W / 2,
  focusY: PLATE_CENTER_Y,
};

let tallyIndex = 0;
let tallyTimer = 0;
let tallyDone = false;
let bestScore = loadBestScore();

const hudCountEl = document.getElementById("hud-count");
const hudBestEl = document.getElementById("hud-best");
const startOverlay = document.getElementById("start-overlay");
const resultOverlay = document.getElementById("result-overlay");
const failReasonBadge = document.getElementById("fail-reason-badge");
const talliedNumberEl = document.getElementById("tallied-number");
const resultRankText = document.getElementById("result-rank-text");
const retryBtn = document.getElementById("retry-btn");
const saveImgBtn = document.getElementById("save-img-btn");
const playHint = document.getElementById("play-hint");
const soundBtn = document.getElementById("sound-btn");

if (hudBestEl) hudBestEl.textContent = bestScore;
applyLocalizationToDOM();

// 배경 그라데이션 캐싱 (렌더링 최적화)
let cachedBgGrad = null;
function getMainBgGradient(c) {
  if (!cachedBgGrad) {
    cachedBgGrad = c.createLinearGradient(0, 0, 0, WORLD_H);
    cachedBgGrad.addColorStop(0, "#F3E1C7");
    cachedBgGrad.addColorStop(0.5, "#FDF6E9");
    cachedBgGrad.addColorStop(1, "#EFE0C9");
  }
  return cachedBgGrad;
}

function resizeCanvas() {
  const wrapper = document.getElementById("game-wrapper");
  if (!wrapper) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const scale = (wrapper.clientWidth / WORLD_W) * dpr;
  canvas.width = Math.round(WORLD_W * scale);
  canvas.height = Math.round(WORLD_H * scale);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function spawnReadyPancake() {
  const level = stack.length;
  pan.speed = Math.min(
    BASE_PAN_SPEED + level * ADD_PAN_SPEED,
    BASE_PAN_SPEED * 2.1,
  );

  activePancake = {
    state: "ON_PAN",
    x: pan.x,
    y: pan.y - 16,
    vx: 0,
    vy: 0,
    width: PANCAKE_W,
    height: PANCAKE_H,
    rotation: 0,
    vRot: 0,
    scaleX: 1,
    scaleY: 1,
    hasButter: false,
  };
}

function resetGame() {
  stack = [];
  fallingPancakes = [];
  particles = [];
  floatingTexts = [];
  towerSwayAngle = 0;
  towerSwayVel = 0;
  centerOfGravityOffset = 0;

  camera.y = 0;
  camera.targetY = 0;
  camera.scale = 1;
  camera.targetScale = 1;

  pan.time = Math.random() * Math.PI * 2;
  pan.flipAnim = 0;
  pan.y = 675;

  if (hudCountEl) hudCountEl.textContent = "0";

  spawnReadyPancake();
}

// ==========================================
// 3. 토스 및 입력 액션
// ==========================================
function tossPancake() {
  if (gameState !== STATE.PLAYING) return;
  if (!activePancake || activePancake.state !== "ON_PAN") return;

  sfx.playFlip();
  pan.flipAnim = 1.0;

  const nextTargetY = getNextLandingCenterY();
  const targetPeakY = nextTargetY - 145;
  const distanceToPeak = Math.max(120, activePancake.y - targetPeakY);
  const gravity = 1550;
  const initialVy = -Math.sqrt(2 * gravity * distanceToPeak);
  const panHorizontalVel = Math.cos(pan.time) * pan.range * pan.speed;

  activePancake.state = "FLYING";
  activePancake.vy = initialVy;
  activePancake.vx = panHorizontalVel * 0.18;
  activePancake.vRot = (Math.random() - 0.5) * 0.5;
  activePancake.scaleX = 0.88;
  activePancake.scaleY = 1.18;

  for (let i = 0; i < 6; i++) {
    particles.push({
      x: activePancake.x + (Math.random() - 0.5) * 50,
      y: activePancake.y + 10,
      vx: (Math.random() - 0.5) * 60,
      vy: -30 - Math.random() * 50,
      size: 6 + Math.random() * 8,
      alpha: 0.75,
      color: "#FFFDF7",
      type: "puff",
    });
  }
}

canvas.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  if (gameState === STATE.PLAYING) {
    tossPancake();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (gameState === STATE.PLAYING) {
      tossPancake();
    } else if (gameState === STATE.TITLE) {
      startGame();
    } else if (gameState === STATE.TALLY && tallyDone) {
      startGame();
    }
  }
});

// ==========================================
// 4. 물리 연산 및 착지 판정
// ==========================================
function getNextLandingCenterY() {
  return PLATE_CENTER_Y - stack.length * STACK_STEP;
}

function getStackedPancakeWorldPos(index, customSwayAngle = towerSwayAngle) {
  const item = stack[index];
  const heightFromPlateCenter = index * STACK_STEP;
  const swayShiftX =
    Math.sin(customSwayAngle) * ((index + 1) * STACK_STEP) * 1.15;
  return {
    x: item.x + swayShiftX,
    y: PLATE_CENTER_Y - heightFromPlateCenter + item.squashY,
    angle: item.tilt + customSwayAngle * 0.85,
  };
}

function checkLanding(p) {
  const targetY = getNextLandingCenterY();

  if (p.vy > 0 && p.y >= targetY - 5 && p.y - p.vy * 0.035 <= targetY + 18) {
    let supportX = WORLD_W / 2;
    let maxAllowedOffset;

    if (stack.length === 0) {
      maxAllowedOffset = PLATE_WIDTH / 2 + PANCAKE_W * 0.7;
    } else {
      const belowPos = getStackedPancakeWorldPos(stack.length - 1);
      supportX = belowPos.x;
      maxAllowedOffset = PANCAKE_W * 0.68;
    }

    const dx = p.x - supportX;

    if (Math.abs(dx) <= maxAllowedOffset) {
      const isPerfect = Math.abs(dx) < 14;
      const newIndex = stack.length;

      const swayHeight = (newIndex + 1) * STACK_STEP;
      const currentSwayShift = Math.sin(towerSwayAngle) * swayHeight * 1.15;

      const landedPancake = {
        x: p.x - currentSwayShift,
        width: PANCAKE_W,
        height: PANCAKE_H,
        tilt: dx * 0.0016,
        scaleX: 1.22,
        scaleY: 0.72,
        squashY: 5,
        hasButter: false,
        counted: false,
        countPop: 0,
      };

      stack.push(landedPancake);
      activePancake = null;

      for (let i = Math.max(0, stack.length - 5); i < stack.length - 1; i++) {
        const factor = 1 - (stack.length - 1 - i) * 0.2;
        stack[i].scaleX = 1 + 0.08 * factor;
        stack[i].scaleY = 1 - 0.08 * factor;
        stack[i].squashY = 3 * factor;
      }

      towerSwayVel += (dx / PANCAKE_W) * 1.2;

      sfx.playLand(isPerfect, stack.length);
      if (hudCountEl) hudCountEl.textContent = stack.length;
      if (stack.length > bestScore) {
        bestScore = stack.length;
        saveBestScore(bestScore);
        if (hudBestEl) hudBestEl.textContent = bestScore;
      }

      if (isPerfect) {
        floatingTexts.push({
          x: p.x,
          y: targetY - 22,
          text: "PERFECT! ✨",
          color: "#FFE169",
          stroke: "#3E2314",
          alpha: 1,
          vy: -55,
          scale: 1.25,
        });
        spawnSparkles(p.x, targetY, 12);
      } else if (Math.abs(dx) < 32) {
        floatingTexts.push({
          x: p.x,
          y: targetY - 18,
          text: "GOOD!",
          color: "#FFFDF7",
          stroke: "#8B3A0E",
          alpha: 1,
          vy: -45,
          scale: 1.0,
        });
      } else {
        floatingTexts.push({
          x: p.x,
          y: targetY - 18,
          text: "CLOSE!💦",
          color: "#FFD166",
          stroke: "#3E2314",
          alpha: 1,
          vy: -45,
          scale: 0.95,
        });
      }

      if (checkTowerInstability()) {
        triggerTowerCollapse(T.failCollapse, true);
        return;
      }

      const nextTopY = getNextLandingCenterY();
      if (nextTopY < 390) {
        camera.targetY = nextTopY - 390;
      }

      pan.y = PLATE_CENTER_Y + 131 + camera.targetY;
      spawnReadyPancake();
      return;
    } else if (Math.abs(dx) <= maxAllowedOffset + 32) {
      p.vx = dx > 0 ? 140 : -140;
      p.vy = -80;
      p.vRot = dx > 0 ? 4.5 : -4.5;
      sfx.playCollapse();
      fallingPancakes.push(p);
      activePancake = null;
      triggerTowerCollapse(T.failSlip, false);
      return;
    }
  }

  const failBottomY = PLATE_CENTER_Y + 210 + camera.y;
  if (p.y > failBottomY) {
    sfx.playCollapse();
    fallingPancakes.push(p);
    activePancake = null;
    triggerTowerCollapse(T.failMiss, false);
  }
}

function checkTowerInstability() {
  if (stack.length === 0) return false;

  let sumX = 0;
  for (let i = 0; i < stack.length; i++) {
    sumX += stack[i].x - WORLD_W / 2;
  }
  const avgOffset = sumX / stack.length;

  let maxTorqueRatio = Math.abs(avgOffset) / (PLATE_WIDTH * 0.5);

  for (let baseIdx = 0; baseIdx < stack.length - 1; baseIdx++) {
    let subSum = 0;
    const countAbove = stack.length - 1 - baseIdx;
    for (let j = baseIdx + 1; j < stack.length; j++) {
      subSum += stack[j].x;
    }
    const subCoG = subSum / countAbove;
    const basePancakeX = stack[baseIdx].x;
    const localDiff = subCoG - basePancakeX;
    const ratio = Math.abs(localDiff) / (PANCAKE_W * 0.52);
    if (ratio > maxTorqueRatio) {
      maxTorqueRatio = ratio;
    }
  }

  const sign = avgOffset >= 0 ? 1 : -1;
  centerOfGravityOffset = sign * Math.min(1.15, maxTorqueRatio);

  return maxTorqueRatio >= 1.0;
}

function triggerTowerCollapse(reasonText, isTowerCollapsed = false) {
  gameState = STATE.COLLAPSING;
  collapseReason = reasonText;
  if (playHint) playHint.style.opacity = "0";

  sfx.playCollapse();

  if (isTowerCollapsed) {
    const collapseDir = centerOfGravityOffset >= 0 ? 1 : -1;
    towerSwayVel = collapseDir * 2.4;
  } else {
    towerSwayVel = 0;
  }

  setTimeout(() => {
    startResultTally();
  }, 950);
}

// ==========================================
// 5. 결과 화면 및 순차 카운팅
// ==========================================
function getRankComment(count) {
  if (count === 0) return T.rank0;
  if (count === 1) return T.rank1;
  if (count < 5) return T.rank2;
  if (count < 10) return T.rank3;
  if (count < 22) return T.rank4;
  if (count < 35) return T.rank5;
  return T.rank6;
}

function startResultTally() {
  gameState = STATE.TALLY;
  resultOverlay.classList.remove("hidden");
  resultOverlay.classList.add("flex");

  if (failReasonBadge) failReasonBadge.textContent = collapseReason;
  if (talliedNumberEl) talliedNumberEl.textContent = "0";
  if (resultRankText) {
    resultRankText.textContent =
      stack.length > 0 ? T.countingSub : T.countingZero;
  }

  if (retryBtn) retryBtn.classList.add("opacity-0", "pointer-events-none");
  if (saveImgBtn) saveImgBtn.classList.add("opacity-0", "pointer-events-none");

  towerSwayAngle *= 0.2;
  towerSwayVel = 0;

  camera.scale = 1.0;
  camera.targetScale = 1.0;
  camera.y = 0;
  camera.targetY = 0;

  stack.forEach((p) => {
    p.counted = false;
    p.countPop = 0;
    p.hasButter = false;
  });
  tallyIndex = 0;
  tallyTimer = -0.4;
  tallyDone = false;

  if (stack.length === 0) {
    finishTally();
  }
}

function finishTally() {
  if (tallyDone) return;
  tallyDone = true;

  stack.forEach((p, idx) => {
    p.counted = true;
    p.countPop = idx === stack.length - 1 ? 1.35 : 1;
    p.hasButter = idx === stack.length - 1;
  });

  tallyIndex = stack.length;
  if (talliedNumberEl) talliedNumberEl.textContent = stack.length;

  const count = stack.length;
  if (resultRankText) resultRankText.textContent = getRankComment(count);

  if (count > 0) {
    sfx.playFanfare();
    const topPos = getStackedPancakeWorldPos(stack.length - 1);
    camera.targetY = topPos.y - 400;
    spawnSparkles(topPos.x, topPos.y - 20, 22);
  }

  if (retryBtn) retryBtn.classList.remove("opacity-0", "pointer-events-none");
  if (saveImgBtn)
    saveImgBtn.classList.remove("opacity-0", "pointer-events-none");
}

function spawnSparkles(x, y, count = 10) {
  const colors = ["#FFE169", "#FF6B6B", "#4ECDC4", "#FFFDF7", "#FFA41B"];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const speed = 60 + Math.random() * 130;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 40,
      size: 5 + Math.random() * 6,
      alpha: 1,
      color: colors[i % colors.length],
      type: "star",
    });
  }
}

// ==========================================
// 6. 메인 업데이트 및 렌더링 루프
// ==========================================
let lastTime = performance.now();

function update(dt) {
  if (gameState === STATE.PLAYING || gameState === STATE.TITLE) {
    pan.time += dt * pan.speed;
    pan.x = WORLD_W / 2 + Math.sin(pan.time) * pan.range;
    pan.y = PLATE_CENTER_Y + 131 + camera.y;
  }

  if (pan.flipAnim > 0) {
    pan.flipAnim = Math.max(0, pan.flipAnim - dt * 4.5);
  }

  if (activePancake) {
    if (activePancake.state === "ON_PAN") {
      activePancake.x = pan.x;
      activePancake.y = pan.y - 16;
      activePancake.rotation = Math.cos(pan.time) * 0.05;
    } else if (activePancake.state === "FLYING") {
      const gravity = 1550;
      activePancake.vy += gravity * dt;
      activePancake.x += activePancake.vx * dt;
      activePancake.y += activePancake.vy * dt;
      activePancake.rotation += activePancake.vRot * dt;

      activePancake.scaleX += (1 - activePancake.scaleX) * 10 * dt;
      activePancake.scaleY += (1 - activePancake.scaleY) * 10 * dt;

      if (gameState === STATE.PLAYING) {
        checkLanding(activePancake);
      }
    }
  }

  for (let i = 0; i < stack.length; i++) {
    const p = stack[i];
    p.scaleX += (1 - p.scaleX) * 12 * dt;
    p.scaleY += (1 - p.scaleY) * 12 * dt;
    p.squashY += (0 - p.squashY) * 12 * dt;
    if (p.countPop > 0) {
      p.countPop += (1 - p.countPop) * 10 * dt;
    }
  }

  if (gameState === STATE.PLAYING) {
    const targetTilt = centerOfGravityOffset * 0.14;
    const springK = 16;
    const damping = 4.2;
    const accel =
      (targetTilt - towerSwayAngle) * springK - towerSwayVel * damping;
    towerSwayVel += accel * dt;
    towerSwayAngle += towerSwayVel * dt;
  } else if (gameState === STATE.COLLAPSING) {
    towerSwayAngle += towerSwayVel * dt;
  } else if (gameState === STATE.TALLY) {
    towerSwayAngle += (0 - towerSwayAngle) * 5 * dt;
  }

  for (let i = fallingPancakes.length - 1; i >= 0; i--) {
    const fp = fallingPancakes[i];
    fp.vy += 1500 * dt;
    fp.x += fp.vx * dt;
    fp.y += fp.vy * dt;
    fp.rotation += fp.vRot * dt;
    if (fp.y > PLATE_CENTER_Y + 600) {
      fallingPancakes.splice(i, 1);
    }
  }

  camera.y += (camera.targetY - camera.y) * 6.5 * dt;
  camera.scale += (camera.targetScale - camera.scale) * 6 * dt;

  if (gameState === STATE.TALLY && !tallyDone && stack.length > 0) {
    const interval = Math.max(0.08, Math.min(0.35, 2.5 / stack.length));
    tallyTimer += dt;
    if (tallyTimer >= interval) {
      tallyTimer = 0;
      if (tallyIndex < stack.length) {
        const targetPancake = stack[tallyIndex];
        targetPancake.counted = true;
        targetPancake.countPop = 1.45;
        targetPancake.scaleX = 1.18;
        targetPancake.scaleY = 0.85;

        if (tallyIndex === stack.length - 1) {
          targetPancake.hasButter = true;
        }

        const pos = getStackedPancakeWorldPos(tallyIndex);

        tallyIndex++;
        if (talliedNumberEl) talliedNumberEl.textContent = tallyIndex;
        sfx.playCountTick(tallyIndex);

        camera.targetY = pos.y - 400;
        spawnSparkles(pos.x + PANCAKE_W * 0.5, pos.y, 4);

        if (tallyIndex >= stack.length) {
          setTimeout(finishTally, 450);
        }
      }
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i];
    pt.x += pt.vx * dt;
    pt.y += pt.vy * dt;
    if (pt.type === "star") pt.vy += 260 * dt;
    pt.alpha -= dt * 1.4;
    if (pt.alpha <= 0) particles.splice(i, 1);
  }

  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const ft = floatingTexts[i];
    ft.y += ft.vy * dt;
    ft.alpha -= dt * 1.15;
    if (ft.alpha <= 0) floatingTexts.splice(i, 1);
  }
}

function draw() {
  ctx.save();
  const scale = canvas.width / WORLD_W;
  ctx.scale(scale, scale);

  drawBackground(ctx);

  ctx.save();
  ctx.translate(0, -camera.y);

  // 1) 배경 캐릭터 (식탁 및 접시보다 뒤쪽 레이어)
  drawCharacters(ctx);

  // 2) 식탁과 접시
  drawTableAndPlate(ctx);

  // 3) 쌓인 핫케이크 타워
  for (let i = 0; i < stack.length; i++) {
    const p = stack[i];
    const pos = getStackedPancakeWorldPos(i);
    const isTop = i === stack.length - 1;
    const showHighlight = p.counted && (!tallyDone || isTop);

    drawPancake(
      ctx,
      pos.x,
      pos.y,
      p.width * p.scaleX,
      p.height * p.scaleY,
      pos.angle,
      p.hasButter,
      showHighlight,
    );

    if (gameState === STATE.TALLY && p.counted && (!tallyDone || isTop)) {
      drawCountBadge(ctx, pos.x, pos.y, i + 1, isTop, p.countPop);
    }
  }

  for (const fp of fallingPancakes) {
    drawPancake(
      ctx,
      fp.x,
      fp.y,
      fp.width,
      fp.height,
      fp.rotation,
      false,
      false,
    );
  }

  if (activePancake && gameState !== STATE.TALLY) {
    if (activePancake.state === "ON_PAN" && gameState === STATE.PLAYING) {
      drawAimGuide(ctx, activePancake.x, activePancake.y);
    }
    drawPancake(
      ctx,
      activePancake.x,
      activePancake.y,
      activePancake.width * activePancake.scaleX,
      activePancake.height * activePancake.scaleY,
      activePancake.rotation,
      false,
      false,
    );
  }

  if (gameState !== STATE.TALLY) {
    drawFryingPan(ctx, pan.x, pan.y, pan.flipAnim);
  }

  drawEffects(ctx);

  ctx.restore();
  ctx.restore();
}

// ==========================================
// 7. 드로잉 함수들
// ==========================================
function drawBackground(c = ctx) {
  c.fillStyle = getMainBgGradient(c);
  c.fillRect(0, 0, WORLD_W, WORLD_H);

  c.fillStyle = "rgba(139, 90, 43, 0.06)";
  const stripeW = 28;
  for (let x = 0; x < WORLD_W; x += stripeW * 2) {
    c.fillRect(x, 0, stripeW, WORLD_H);
  }

  const parallaxY = (-camera.y * 0.25) % 450;
  drawRetroLamp(c, 90, 120 + parallaxY);
  drawRetroFrame(c, 345, 230 + parallaxY);
  drawRetroLamp(c, 110, -180 + parallaxY);

  if (gameState === STATE.PLAYING || gameState === STATE.TALLY) {
    c.save();
    c.translate(0, -camera.y);

    c.strokeStyle = "rgba(92, 64, 51, 0.18)";
    c.fillStyle = "rgba(92, 64, 51, 0.5)";
    c.font = "bold 11px Fredoka, Pretendard, sans-serif";
    c.lineWidth = 1.5;
    c.setLineDash([4, 6]);

    for (let lv = 5; lv <= Math.max(30, stack.length + 10); lv += 5) {
      const lineY = PLATE_CENTER_Y - (lv - 1) * STACK_STEP;
      c.beginPath();
      c.moveTo(20, lineY);
      c.lineTo(WORLD_W - 20, lineY);
      c.stroke();
      c.fillText(T.floorMark(lv), 24, lineY - 5);
    }
    c.restore();
  }
}

function drawRetroLamp(c, x, y) {
  c.save();
  const glow = c.createRadialGradient(x, y + 10, 4, x, y + 10, 55);
  glow.addColorStop(0, "rgba(255, 215, 130, 0.45)");
  glow.addColorStop(1, "rgba(255, 215, 130, 0)");
  c.fillStyle = glow;
  c.beginPath();
  c.arc(x, y + 10, 55, 0, Math.PI * 2);
  c.fill();

  c.strokeStyle = "rgba(92, 64, 51, 0.22)";
  c.fillStyle = "rgba(210, 140, 70, 0.25)";
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(x, y - 90);
  c.lineTo(x, y - 12);
  c.stroke();

  c.beginPath();
  c.arc(x, y, 22, Math.PI, 0);
  c.closePath();
  c.fill();
  c.stroke();
  c.restore();
}

function drawRetroFrame(c, x, y) {
  c.save();
  c.strokeStyle = "rgba(92, 64, 51, 0.2)";
  c.fillStyle = "rgba(255, 250, 240, 0.4)";
  c.lineWidth = 2;
  c.beginPath();
  c.roundRect(x - 22, y - 28, 44, 56, 3);
  c.fill();
  c.stroke();
  c.strokeRect(x - 15, y - 20, 30, 40);
  c.restore();
}

function drawCharacters(c = ctx) {
  const tableTopY = PLATE_CENTER_Y + 12;

  const leftImg = getCharacterSprite("left");
  if (leftImg) {
    const cfg = CHAR_CONFIG.left;
    const drawW = cfg.width * cfg.scale;
    const drawH = cfg.height * cfg.scale;
    const drawX = cfg.x;
    const drawY = tableTopY - drawH + cfg.offsetY;
    c.drawImage(leftImg, drawX, drawY, drawW, drawH);
  }

  const rightImg = getCharacterSprite("right");
  if (rightImg) {
    const cfg = CHAR_CONFIG.right;
    const drawW = cfg.width * cfg.scale;
    const drawH = cfg.height * cfg.scale;
    const drawX = cfg.x;
    const drawY = tableTopY - drawH + cfg.offsetY;
    c.drawImage(rightImg, drawX, drawY, drawW, drawH);
  }
}

function drawTableAndPlate(c = ctx) {
  const tableTopY = PLATE_CENTER_Y + 12;
  c.fillStyle = "#7C5332";
  c.fillRect(-200, tableTopY, WORLD_W + 400, 900);

  c.fillStyle = "#FDF8CE";
  c.fillRect(-200, tableTopY, WORLD_W + 400, 26);

  c.fillStyle = "#4B7A67";
  for (let x = -180; x < WORLD_W + 200; x += 40) {
    c.fillRect(x, tableTopY, 20, 26);
  }
  c.strokeStyle = "#3E2314";
  c.lineWidth = 3.5;
  c.beginPath();
  c.moveTo(-200, tableTopY);
  c.lineTo(WORLD_W + 200, tableTopY);
  c.stroke();

  c.fillStyle = "rgba(62, 35, 20, 0.22)";
  c.beginPath();
  c.ellipse(
    WORLD_W / 2,
    PLATE_CENTER_Y + 16,
    PLATE_WIDTH * 0.62,
    10,
    0,
    0,
    Math.PI * 2,
  );
  c.fill();

  if (isSpriteReady("plate")) {
    c.drawImage(
      sprites.plate,
      WORLD_W / 2 - PLATE_DRAW_W / 2,
      PLATE_CENTER_Y - PLATE_DRAW_H / 2,
      PLATE_DRAW_W,
      PLATE_DRAW_H,
    );
    return;
  }

  c.fillStyle = "#E2E8F0";
  c.strokeStyle = "#3E2314";
  c.lineWidth = 3.5;
  c.beginPath();
  c.roundRect(
    WORLD_W / 2 - PLATE_WIDTH * 0.38,
    PLATE_CENTER_Y + 4,
    PLATE_WIDTH * 0.76,
    12,
    6,
  );
  c.fill();
  c.stroke();

  c.fillStyle = "#FFFFFF";
  c.beginPath();
  c.ellipse(
    WORLD_W / 2,
    PLATE_CENTER_Y,
    PLATE_WIDTH * 0.64,
    15,
    0,
    0,
    Math.PI * 2,
  );
  c.fill();
  c.stroke();

  c.strokeStyle = "#60A5FA";
  c.lineWidth = 2;
  c.beginPath();
  c.ellipse(
    WORLD_W / 2,
    PLATE_CENTER_Y,
    PLATE_WIDTH * 0.48,
    9,
    0,
    0,
    Math.PI * 2,
  );
  c.stroke();
}

function drawPancake(c, x, y, w, h, angle, hasButter, isHighlighted) {
  c.save();
  c.translate(x, y);
  c.rotate(angle);

  const rx = w / 2;
  const ry = h / 2;

  if (isHighlighted && gameState === STATE.TALLY) {
    c.shadowColor = "#FFE169";
    c.shadowBlur = 12;
  }

  if (isSpriteReady("pancake")) {
    c.drawImage(sprites.pancake, -rx, -ry, w, h);
    c.shadowBlur = 0;
  } else {
    c.fillStyle = "#F7C873";
    c.strokeStyle = "#3E2314";
    c.lineWidth = 3;

    c.beginPath();
    c.roundRect(-rx, -ry, w, h, ry);
    c.fill();
    c.stroke();

    c.shadowBlur = 0;

    c.fillStyle = "#FFF3C4";
    c.beginPath();
    c.roundRect(-rx + 4, -2, w - 8, 5, 2.5);
    c.fill();

    c.fillStyle = "#C86D25";
    c.beginPath();
    c.ellipse(0, -ry + 4, rx - 3, ry * 0.55, 0, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = "rgba(255, 240, 200, 0.35)";
    c.beginPath();
    c.ellipse(-rx * 0.3, -ry + 3, rx * 0.35, ry * 0.22, -0.1, 0, Math.PI * 2);
    c.fill();
  }

  if (hasButter) {
    if (isSpriteReady("butter")) {
      c.drawImage(sprites.butter, -15, -ry - 7, 30, 11);
    } else {
      c.fillStyle = "#FFE169";
      c.strokeStyle = "#3E2314";
      c.lineWidth = 2.5;
      c.beginPath();
      c.roundRect(-15, -ry - 7, 30, 11, 3);
      c.fill();
      c.stroke();
    }
  }

  c.restore();
}

function drawCountBadge(c, x, y, number, isTop, popScale = 1) {
  c.save();
  const side = number % 2 === 1 ? 1 : -1;
  const badgeX = x + side * (PANCAKE_W * 0.68);
  const badgeY = y;

  c.translate(badgeX, badgeY);
  const s = Math.max(0.8, popScale);
  c.scale(s, s);

  c.strokeStyle = "#3E2314";
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(-side * 16, 0);
  c.lineTo(-side * 6, 0);
  c.stroke();

  c.fillStyle = isTop ? "#D9381E" : "#FFE169";
  c.strokeStyle = "#3E2314";
  c.lineWidth = 2.5;
  c.beginPath();
  c.roundRect(-18, -11, 36, 22, 11);
  c.fill();
  c.stroke();

  c.fillStyle = isTop ? "#FFFFFF" : "#3E2314";
  c.font = "800 12px Fredoka, Pretendard, sans-serif";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.fillText(`${number}`, 0, 1);

  c.restore();
}

function drawAimGuide(c, panX, panY) {
  c.save();
  c.strokeStyle = "rgba(200, 90, 23, 0.35)";
  c.lineWidth = 2.5;
  c.setLineDash([5, 6]);
  c.beginPath();
  c.moveTo(panX, panY - 18);
  c.lineTo(panX, panY - 125);
  c.stroke();
  c.restore();
}

function drawFryingPan(c, x, y, flipAnim) {
  c.save();

  const panW = 144;
  const panH = 22;

  const pivotOffsetX = panW * 0.42;
  c.translate(x + pivotOffsetX, y);

  const tilt = flipAnim * 0.32;
  c.rotate(tilt);

  c.translate(-pivotOffsetX, 0);

  if (isSpriteReady("pan")) {
    c.drawImage(sprites.pan, -panW / 2, -15, 210, 30);
    c.restore();
    return;
  }

  c.fillStyle = "#5C3A21";
  c.strokeStyle = "#3E2314";
  c.lineWidth = 3.5;
  c.beginPath();
  c.roundRect(panW * 0.42, -7, 68, 14, 7);
  c.fill();
  c.stroke();

  c.fillStyle = "#FFF8E7";
  c.beginPath();
  c.arc(panW * 0.42 + 54, 0, 3.5, 0, Math.PI * 2);
  c.fill();

  c.fillStyle = "#334155";
  c.strokeStyle = "#1E293B";
  c.lineWidth = 3.5;
  c.beginPath();
  c.roundRect(-panW / 2, -panH / 2, panW, panH, [4, 4, 14, 14]);
  c.fill();
  c.stroke();

  c.strokeStyle = "#64748B";
  c.lineWidth = 2.5;
  c.beginPath();
  c.moveTo(-panW * 0.36, 2);
  c.lineTo(panW * 0.36, 2);
  c.stroke();

  c.restore();
}

function drawEffects(c = ctx) {
  for (const pt of particles) {
    c.save();
    c.globalAlpha = Math.max(0, pt.alpha);
    c.fillStyle = pt.color;
    if (pt.type === "puff") {
      c.beginPath();
      c.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      c.fill();
    } else {
      c.translate(pt.x, pt.y);
      c.beginPath();
      c.arc(0, 0, pt.size * 0.6, 0, Math.PI * 2);
      c.fill();
    }
    c.restore();
  }

  for (const ft of floatingTexts) {
    c.save();
    c.globalAlpha = Math.max(0, ft.alpha);
    c.font = `900 ${Math.round(20 * ft.scale)}px Fredoka, Pretendard, sans-serif`;
    c.textAlign = "center";
    c.lineWidth = 5;
    c.strokeStyle = ft.stroke;
    c.strokeText(ft.text, ft.x, ft.y);
    c.fillStyle = ft.color;
    c.fillText(ft.text, ft.x, ft.y);
    c.restore();
  }
}

// ==========================================
// 8. 포토프레임 결과 이미지 생성 및 모바일/PC 분기 저장
// ==========================================
async function saveResultAsImage() {
  const tableTopY = PLATE_CENTER_Y + 12;
  const bottomWorldY = tableTopY + 46;

  const maxCharH = Math.max(
    CHAR_CONFIG.left.height * CHAR_CONFIG.left.scale,
    CHAR_CONFIG.right.height * CHAR_CONFIG.right.scale,
    161,
  );
  const charTopLimitY = tableTopY - maxCharH - 35;

  let pancakeTopLimitY = PLATE_CENTER_Y - 50;
  if (stack.length > 0) {
    const topPos = getStackedPancakeWorldPos(stack.length - 1, 0);
    pancakeTopLimitY = topPos.y - 65;
  }

  const topWorldY = Math.min(charTopLimitY, pancakeTopLimitY);
  const sceneWorldH = bottomWorldY - topWorldY;

  const exportScale = 2;
  const padSide = 26;
  const padTop = 34;
  const padBottom = 118;

  const frameW = WORLD_W + padSide * 2;
  const frameH = sceneWorldH + padTop + padBottom;

  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = Math.round(frameW * exportScale);
  exportCanvas.height = Math.round(frameH * exportScale);
  const eCtx = exportCanvas.getContext("2d");

  eCtx.scale(exportScale, exportScale);

  // [A] 포토프레임 외곽 배경
  eCtx.fillStyle = "#3E2314";
  eCtx.fillRect(0, 0, frameW, frameH);

  eCtx.fillStyle = "#FFFDF7";
  eCtx.beginPath();
  eCtx.roundRect(6, 6, frameW - 12, frameH - 12, 14);
  eCtx.fill();

  eCtx.strokeStyle = "#E6D5B8";
  eCtx.lineWidth = 2;
  eCtx.beginPath();
  eCtx.roundRect(12, 12, frameW - 24, frameH - 24, 10);
  eCtx.stroke();

  // [B] 사진 내부 영역 클리핑 및 전체 타워 풀샷 렌더링
  eCtx.save();
  eCtx.beginPath();
  eCtx.roundRect(padSide, padTop, WORLD_W, sceneWorldH, 6);
  eCtx.clip();

  eCtx.translate(padSide, padTop - topWorldY);

  const bgGrad = eCtx.createLinearGradient(0, topWorldY, 0, bottomWorldY);
  bgGrad.addColorStop(0, "#F3E1C7");
  bgGrad.addColorStop(0.5, "#FDF6E9");
  bgGrad.addColorStop(1, "#EFE0C9");
  eCtx.fillStyle = bgGrad;
  eCtx.fillRect(0, topWorldY, WORLD_W, sceneWorldH);

  eCtx.fillStyle = "rgba(139, 90, 43, 0.06)";
  for (let x = 0; x < WORLD_W; x += 56) {
    eCtx.fillRect(x, topWorldY, 28, sceneWorldH);
  }

  for (let y = PLATE_CENTER_Y - 180; y > topWorldY - 100; y -= 340) {
    drawRetroLamp(eCtx, 85, y);
    drawRetroFrame(eCtx, 350, y + 95);
  }

  eCtx.strokeStyle = "rgba(92, 64, 51, 0.18)";
  eCtx.fillStyle = "rgba(92, 64, 51, 0.5)";
  eCtx.font = "bold 11px Fredoka, Pretendard, sans-serif";
  eCtx.lineWidth = 1.5;
  eCtx.setLineDash([4, 6]);
  for (let lv = 5; lv <= Math.max(25, stack.length + 5); lv += 5) {
    const lineY = PLATE_CENTER_Y - (lv - 1) * STACK_STEP;
    if (lineY >= topWorldY + 15) {
      eCtx.beginPath();
      eCtx.moveTo(20, lineY);
      eCtx.lineTo(WORLD_W - 20, lineY);
      eCtx.stroke();
      eCtx.fillText(T.floorMark(lv), 24, lineY - 5);
    }
  }
  eCtx.setLineDash([]);

  drawCharacters(eCtx);
  drawTableAndPlate(eCtx);

  for (let i = 0; i < stack.length; i++) {
    const p = stack[i];
    const pos = getStackedPancakeWorldPos(i, 0);
    const isTop = i === stack.length - 1;
    drawPancake(eCtx, pos.x, pos.y, p.width, p.height, p.tilt, isTop, false);
    if (isTop) {
      drawCountBadge(eCtx, pos.x, pos.y, i + 1, true, 1);
    }
  }

  eCtx.restore();

  // [C] 사진 창 외곽선 및 네 모서리 빈티지 앨범 코너 장식
  eCtx.strokeStyle = "#3E2314";
  eCtx.lineWidth = 3;
  eCtx.beginPath();
  eCtx.roundRect(padSide, padTop, WORLD_W, sceneWorldH, 6);
  eCtx.stroke();

  const cornerSize = 18;
  eCtx.fillStyle = "#D4A373";
  eCtx.strokeStyle = "#3E2314";
  eCtx.lineWidth = 2;
  const corners = [
    [padSide - 2, padTop - 2, 1, 1],
    [padSide + WORLD_W + 2, padTop - 2, -1, 1],
    [padSide - 2, padTop + sceneWorldH + 2, 1, -1],
    [padSide + WORLD_W + 2, padTop + sceneWorldH + 2, -1, -1],
  ];
  corners.forEach(([cx, cy, dx, dy]) => {
    eCtx.beginPath();
    eCtx.moveTo(cx, cy);
    eCtx.lineTo(cx + dx * cornerSize, cy);
    eCtx.lineTo(cx, cy + dy * cornerSize);
    eCtx.closePath();
    eCtx.fill();
    eCtx.stroke();
  });

  eCtx.save();
  eCtx.translate(frameW / 2, padTop - 2);
  eCtx.rotate(-0.025);
  eCtx.fillStyle = "rgba(255, 225, 105, 0.88)";
  eCtx.strokeStyle = "#3E2314";
  eCtx.lineWidth = 2;
  eCtx.fillRect(-52, -11, 104, 22);
  eCtx.strokeRect(-52, -11, 104, 22);
  eCtx.restore();

  // [D] 하단 폴라로이드 캡션
  const footerTopY = padTop + sceneWorldH;

  eCtx.fillStyle = "#8B4513";
  eCtx.font = "800 13px Pretendard, sans-serif";
  eCtx.textAlign = "left";
  eCtx.fillText(T.photoTitle, padSide + 4, footerTopY + 34);

  eCtx.fillStyle = "#3E2314";
  eCtx.font = "bold 14px Pretendard, sans-serif";
  eCtx.fillText(getRankComment(stack.length), padSide + 4, footerTopY + 60);

  const localeMap = { ko: "ko-KR", ja: "ja-JP", en: "en-US" };
  const todayStr = new Date().toLocaleDateString(localeMap[CURRENT_LANG], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  eCtx.fillStyle = "#9C7A5B";
  eCtx.font = "bold 11px Pretendard, sans-serif";
  eCtx.fillText(`DATE: ${todayStr}`, padSide + 4, footerTopY + 86);

  const stampX = frameW - padSide - 54;
  const stampY = footerTopY + 52;
  eCtx.save();
  eCtx.translate(stampX, stampY);
  eCtx.rotate(-0.06);

  eCtx.fillStyle = "#FFE169";
  eCtx.strokeStyle = "#3E2314";
  eCtx.lineWidth = 3;
  eCtx.beginPath();
  eCtx.roundRect(-52, -32, 104, 64, 16);
  eCtx.fill();
  eCtx.stroke();

  eCtx.fillStyle = "#D9381E";
  eCtx.font = "900 32px Fredoka, Pretendard, sans-serif";
  eCtx.textAlign = "center";
  eCtx.textBaseline = "middle";
  eCtx.fillText(`${stack.length}${T.unitFloor}`, 0, 2);
  eCtx.restore();

  // 우측 하단 구석 제작자 서명 (@cokacoku)
  eCtx.save();
  eCtx.fillStyle = "rgba(156, 122, 91, 0.65)";
  eCtx.font = "600 10px Fredoka, Pretendard, sans-serif";
  eCtx.textAlign = "right";
  eCtx.textBaseline = "alphabetic";
  eCtx.fillText("@cokacoku", frameW - 18, frameH - 16);
  eCtx.restore();

  // [E] PC vs 모바일 기기 분기
  const ua = navigator.userAgent || "";
  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const fileName = `hotcake-tower-${stack.length}F.png`;
  const dataUrl = exportCanvas.toDataURL("image/png");

  if (isMobileDevice) {
    try {
      const blob = dataURLToBlob(dataUrl);
      const file = new File([blob], fileName, { type: "image/png" });

      if (
        navigator.canShare &&
        navigator.share &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: T.shareTitle,
          text: T.shareText(stack.length),
        });
        return;
      }
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }

    showImageSaveModal(dataUrl);
  } else {
    triggerDirectDownload(dataUrl, fileName);
  }
}

function dataURLToBlob(dataURL) {
  const parts = dataURL.split(",");
  const mime = parts[0].match(/:(.*?);/)[1];
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function triggerDirectDownload(dataUrl, fileName) {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function showImageSaveModal(dataUrl) {
  let modal = document.getElementById("img-save-modal");
  if (modal) modal.remove();

  modal = document.createElement("div");
  modal.id = "img-save-modal";
  modal.className =
    "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4 backdrop-blur-sm";
  modal.style.touchAction = "auto";

  modal.innerHTML = `
    <div class="bg-[#FFE169] text-[#3E2314] border-2 border-[#3E2314] px-4 py-2 rounded-full font-extrabold text-xs sm:text-sm mb-3 shadow-md animate-bounce text-center">
      ${T.modalHint}
    </div>
    <div class="max-h-[70vh] overflow-y-auto rounded-xl border-4 border-[#3E2314] shadow-2xl bg-[#FFFDF7]">
      <img src="${dataUrl}" alt="Hotcake Tower Result" class="block max-w-[82vw] sm:max-w-xs h-auto select-auto" style="-webkit-touch-callout: default !important; user-select: auto !important; -webkit-user-select: auto !important;" />
    </div>
    <button type="button" id="close-save-modal" class="toy-btn mt-4 px-8 py-2.5 text-sm font-extrabold">
      ${T.modalClose}
    </button>
  `;

  document.body.appendChild(modal);

  document.getElementById("close-save-modal").addEventListener("click", () => {
    modal.remove();
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}

// ==========================================
// 9. 게임 시작 제어 및 이벤트 연결
// ==========================================
function startGame() {
  sfx.init();
  sfx.playFlip();
  resetGame();
  gameState = STATE.PLAYING;

  startOverlay.classList.add("opacity-0", "pointer-events-none");
  setTimeout(() => startOverlay.classList.add("hidden"), 300);

  resultOverlay.classList.add("hidden");
  resultOverlay.classList.remove("flex");

  if (playHint) playHint.style.opacity = "1";
}

const startBtn = document.getElementById("start-btn");
if (startBtn) startBtn.addEventListener("click", startGame);
if (retryBtn) retryBtn.addEventListener("click", startGame);
if (saveImgBtn) saveImgBtn.addEventListener("click", saveResultAsImage);

if (soundBtn) {
  soundBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sfx.enabled = !sfx.enabled;
    soundBtn.textContent = sfx.enabled ? "🔊" : "🔇";
  });
}

resetGame();

function loop(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000);
  lastTime = now;

  update(dt);
  draw();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
