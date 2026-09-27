/* ============================================
   script.js — 0extra profile
   ============================================ */

const enterScreen  = document.getElementById('enter-screen');
const music        = document.getElementById('music');
const vol          = document.getElementById('vol');
const volIcon      = document.getElementById('vol-icon');
const viewsEl      = document.getElementById('views-count');
const card         = document.getElementById('card');
const wrapper      = document.querySelector('.card-wrapper');
const usernameEl   = document.getElementById('username');
const bioEl        = document.getElementById('bio');
const avatarEl     = document.getElementById('avatar');
const bgEl         = document.getElementById('bg');
const creditsEl    = document.getElementById('credits');

// ============================================
// Состояние
// ============================================
let currentThemeIdx = 0;
let isFirstLoad = true;
let hasEntered = false;
let matrixRGB = '255,79,163';

// Typewriter
let bioMsgIdx = 0;
let bioCharIdx = 0;
let isBioDeleting = false;
let bioGeneration = 0;

// ============================================
// КОНФИГ ТЕМ
// ============================================
// ============================================
// КОНФИГ ТЕМ
// ============================================
const THEMES = [
  // ---------- 1. SAKURA ----------
  {
    name: 'Sakura',
    bg: 'assets/100001.jpg',
    avatar: 'assets/010001.jpg',
    music: 'assets/110001.mp3',
    bodyClass: '',
    font: "'Onest', system-ui, sans-serif",
    colors: {
      primary: '#ff4fa3',
      primarySoft: 'rgba(255,79,163,0.33)',
      text: '#ffffff',
      textDim: 'rgba(255,255,255,0.8)',
      cardBg: 'rgba(20,20,20,0.55)',
      cardBorder: 'rgba(255,255,255,0.08)',
      qrBg: 'rgba(10,10,10,0.88)',
      qrText: '#ff4fa3',
      qrBorder: '#ff4fa3',
      overlay: 'rgba(0,0,0,0.35)',
      bgFilter: 'brightness(0.5)',
      matrix: '255,79,163'
    },
    bios: [
      'Shine like cherry blossom ✿\n(((*°▽°*)八(*°▽°*)))♪',
      'Zero extra, infinite vibes ✦',
      'Je rêve en rose et je code en noir 🌸',
      '静かな夜に、星を数えてる ✧',
      'Світло в серці, спокій у думках ✿'
    ],
    credits: [
      { label: 'Иконки',   text: 'Simple Icons',  url: 'https://simpleicons.org',                        note: 'CC0' },
      { label: 'Шрифт',    text: 'Onest',         url: 'https://fonts.google.com/specimen/Onest',        note: 'OFL' },
      { label: 'Музыка',   text: 'Болен тобой',   url: 'https://www.youtube.com/watch?v=Js7_FxNGnDQ',    note: 'VLDONE' },
      { label: 'Аватарка', text: 'Pinterest',     url: 'https://ru.pinterest.com/pin/712272497317568379/', note: '' },
      { label: 'Фон',      text: 'Pinterest',     url: 'https://ru.pinterest.com/pin/752804893963443663/', note: '' }
    ]
  },

  // ---------- 2. NEON ----------
  {
    name: 'Neon',
    bg: 'assets/100010.jpg',
    avatar: 'assets/010010.jpg',
    music: 'assets/110010.mp3',
    bodyClass: '',
    font: "'Rajdhani', 'Onest', sans-serif",
    colors: {
      primary: '#3ab7ff',
      primarySoft: 'rgba(58,183,255,0.33)',
      text: '#ffffff',
      textDim: 'rgba(200,230,255,0.85)',
      cardBg: 'rgba(5,15,30,0.6)',
      cardBorder: 'rgba(58,183,255,0.15)',
      qrBg: 'rgba(58,183,255,0.9)',
      qrText: '#000000',
      qrBorder: '#3ab7ff',
      overlay: 'rgba(0,20,60,0.4)',
      bgFilter: 'brightness(0.55)',
      matrix: '58,183,255'
    },
    bios: [
        'I am no shadow. I am the storm that follows. 🌊',
  	'Tu m\'as jamais reconnu. Je m\'en fiche.',
  	'私は王の影ではない。嵐だ。',
  	'我不是王的影子。我是风暴。',
  	'Ich bin kein Schatten. Ich bin der Sturm.'
    ],
    credits: [
      { label: 'Иконки',   text: 'Simple Icons',  url: 'https://simpleicons.org',                          note: 'CC0' },
      { label: 'Шрифт',    text: 'Rajdhani',      url: 'https://fonts.google.com/specimen/Rajdhani',       note: 'OFL' },
      { label: 'Музыка',   text: 'Жена сталкер',  url: 'https://www.youtube.com/watch?v=zdvYQb0-P6o',      note: 'VLDONE' },
      { label: 'Аватарка', text: 'Pinterest',     url: 'https://ru.pinterest.com/pin/1010847078868968774/', note: '' },
      { label: 'Фон',      text: 'Pinterest',     url: 'https://ru.pinterest.com/pin/448319337907368034/',  note: '' }
    ]
  },

  // ---------- 3. CRIMSON ----------
  {
    name: 'Crimson',
    bg: 'assets/100011.jpg',
    avatar: 'assets/010011.jpg',
    music: 'assets/110011.mp3',
    bodyClass: '',
    font: "'Oswald', 'Onest', sans-serif",
    colors: {
      primary: '#ff2d3f',
      primarySoft: 'rgba(255,45,63,0.35)',
      text: '#ffffff',
      textDim: 'rgba(255,220,220,0.85)',
      cardBg: 'rgba(20,0,5,0.65)',
      cardBorder: 'rgba(255,45,63,0.2)',
      qrBg: 'rgba(15,0,3,0.92)',
      qrText: '#ff2d3f',
      qrBorder: '#ff2d3f',
      overlay: 'rgba(40,0,5,0.4)',
      bgFilter: 'brightness(0.5) saturate(1.2)',
      matrix: '255,45,63'
    },
    bios: [
        'Some eyes are not meant to look away from. 🔥',
  	'Le cœur bat plus vite quand la nuit tombe.',
  	'赤い月の下で、私は笑う。',
  	'Вогонь у мені, а не навколо.',
  	'红色の光が、私の名前を呼ぶ。',
  	'Manche Herzen brennen, ohne zu verbrennen.'
    ],
    credits: [
      { label: 'Иконки',   text: 'Simple Icons',  url: 'https://simpleicons.org',                          note: 'CC0' },
      { label: 'Шрифт',    text: 'Oswald',        url: 'https://fonts.google.com/specimen/Oswald',         note: 'OFL' },
      { label: 'Музыка',   text: 'Зачем?',        url: 'https://www.youtube.com/watch?v=zTDI46ZrM5k',      note: 'VLDONE' },
      { label: 'Аватарка', text: 'Pinterest',     url: 'https://ru.pinterest.com/pin/1139832986916902573/', note: '' },
      { label: 'Фон',      text: 'Pinterest',     url: 'https://ru.pinterest.com/pin/197876977366136384/',  note: '' }
    ]
  },

  // ---------- 4. TERMINAL ----------
  {
    name: 'Terminal',
    bg: 'assets/100100.jpg',
    avatar: 'assets/010100.jpg',
    music: 'assets/110100.mp3',
    bodyClass: 'terminal-theme',
    font: "'VT323', 'Courier New', monospace",
    colors: {
      primary: '#33ff33',
      primarySoft: 'rgba(51,255,51,0.35)',
      text: '#33ff33',
      textDim: 'rgba(51,255,51,0.75)',
      cardBg: 'rgba(0,10,0,0.82)',
      cardBorder: 'rgba(51,255,51,0.35)',
      qrBg: 'rgba(0,15,0,0.95)',
      qrText: '#33ff33',
      qrBorder: '#33ff33',
      overlay: 'rgba(0,0,0,0.5)',
      bgFilter: 'brightness(0.4) saturate(0.5) hue-rotate(60deg)',
      matrix: '51,255,51'
    },
    bios: [
        '> curl -X GET http://0extra.github.io/404/\n> 200 OK',
  	'> uname -a\nLinux 0extra 6.12.1-arch #1 SMP PREEMPT',
  	'> whoami\n0extra',
  	'> sudo pacman -S meaning\n:: meaning is already installed',
  	'> http status 418\nI\'m a teapot.'
    ],
    credits: [
      { label: 'Иконки',   text: 'Simple Icons',  url: 'https://simpleicons.org',                          note: 'CC0' },
      { label: 'Шрифт',    text: 'VT323',         url: 'https://fonts.google.com/specimen/VT323',          note: 'OFL' },
      { label: 'Музыка',   text: 'http',          url: 'https://www.youtube.com/watch?v=CrlP_AxSQn8',      note: 'VLDONE' },
      { label: 'Аватарка', text: 'Pinterest',     url: 'https://ru.pinterest.com/pin/1058205243688314247/', note: '' },
      { label: 'Фон',      text: 'Pinterest',     url: 'https://ru.pinterest.com/pin/737816351447235815/',  note: '' }
    ]
  },

  // ---------- 5. CHAOS ----------
  {
    name: 'Chaos',
    bg: 'assets/100101.jpg',
    avatar: 'assets/010101.jpg',
    music: 'assets/110101.mp3',
    bodyClass: 'rainbow-theme',
    font: "'Onest', system-ui, sans-serif",
    colors: {
      primary: '#b847ff',
      primarySoft: 'rgba(184,71,255,0.35)',
      text: '#ffffff',
      textDim: 'rgba(255,255,255,0.85)',
      cardBg: 'rgba(20,10,35,0.6)',
      cardBorder: 'rgba(184,71,255,0.2)',
      qrBg: 'rgba(20,0,40,0.9)',
      qrText: '#b847ff',
      qrBorder: '#b847ff',
      overlay: 'rgba(30,0,50,0.4)',
      bgFilter: 'brightness(0.5) saturate(1.3)',
      matrix: '184,71,255'
    },
    bios: [
  	'The lily blooms without asking. Beautiful.',
  	'Une soirée douce. Rien de plus.',
  	'花が咲いている。ただそれだけ。',
  	'风轻轻吹过。一切都在这里。',
  	'Просто красивий вечір. І все.',
  	'Et puis tu es arrivée, ma reine.'
    ],
    credits: [
      { label: 'Иконки',   text: 'Simple Icons',  url: 'https://simpleicons.org',                          note: 'CC0' },
      { label: 'Шрифт',    text: 'Onest',         url: 'https://fonts.google.com/specimen/Onest',          note: 'OFL' },
      { label: 'Музыка',   text: 'околдовала',        url: 'https://www.youtube.com/watch?v=CODtOH_AQxw',      note: 'enveel' },
      { label: 'Аватарка', text: 'Pinterest',     url: 'https://ru.pinterest.com/pin/6122149489277397/',    note: '' },
      { label: 'Фон',      text: 'Pinterest',     url: 'https://ru.pinterest.com/pin/22940279347669872/',   note: '' }
    ]
  }
];

// ============================================
// Рендер кредитов
// ============================================
function renderCredits(theme) {
  creditsEl.innerHTML = theme.credits.map(c => {
    const note = c.note ? ` (${c.note})` : '';
    return `<span>${c.label}: <a href="${c.url}" target="_blank">${c.text}</a>${note}</span>`;
  }).join('');
}

// ============================================
// Применить CSS-переменные
// ============================================
function applyThemeVars(theme) {
  const c = theme.colors;
  const root = document.documentElement;
  root.style.setProperty('--theme-primary',      c.primary);
  root.style.setProperty('--theme-primary-soft', c.primarySoft);
  root.style.setProperty('--theme-text',         c.text);
  root.style.setProperty('--theme-text-dim',     c.textDim);
  root.style.setProperty('--theme-card-bg',      c.cardBg);
  root.style.setProperty('--theme-card-border',  c.cardBorder);
  root.style.setProperty('--theme-qr-bg',        c.qrBg);
  root.style.setProperty('--theme-qr-text',      c.qrText);
  root.style.setProperty('--theme-qr-border',    c.qrBorder);
  root.style.setProperty('--theme-overlay',      c.overlay);
  root.style.setProperty('--theme-bg-filter',    c.bgFilter);
  root.style.setProperty('--theme-font',         theme.font);
  matrixRGB = c.matrix;

  document.body.classList.remove('light-theme', 'rainbow-theme', 'terminal-theme');
  if (theme.bodyClass) document.body.classList.add(theme.bodyClass);
}

// ============================================
// Смена музыки
// ============================================
function switchMusic(newSrc) {
  const oldVolume = music.volume;
  const shouldPlay = hasEntered && !music.paused;

  music.pause();
  music.src = newSrc;
  music.volume = oldVolume;

  if (!shouldPlay) return;

  const onCanPlay = () => {
    music.removeEventListener('canplay', onCanPlay);
    music.play().catch(() => {
      const retry = () => music.play().catch(() => {});
      document.addEventListener('click', retry, { once: true });
    });
  };
  music.addEventListener('canplay', onCanPlay);
}

// ============================================
// Переключение темы
// ============================================
function applyTheme(idx, { animate = true } = {}) {
  const theme = THEMES[idx];
  currentThemeIdx = idx;

  document.querySelectorAll('.theme-btn').forEach((b, i) => {
    b.classList.toggle('active', i === idx);
  });

  applyThemeVars(theme);
  renderCredits(theme);

  if (animate && !isFirstLoad) {
    bgEl.classList.add('fading');
    avatarEl.classList.add('fading');
    setTimeout(() => {
      bgEl.style.backgroundImage = `url('${theme.bg}')`;
      avatarEl.src = theme.avatar;
      bgEl.classList.remove('fading');
      avatarEl.classList.remove('fading');
    }, 400);
  } else {
    bgEl.style.backgroundImage = `url('${theme.bg}')`;
    avatarEl.src = theme.avatar;
  }

  switchMusic(theme.music);

  if (hasEntered) startTypewriterBio();

  isFirstLoad = false;
}

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = parseInt(btn.dataset.theme, 10);
    if (idx !== currentThemeIdx) applyTheme(idx);
  });
});

applyTheme(0, { animate: false });

// ============================================
// Громкость
// ============================================
music.volume = 0.5;
vol.addEventListener('input', () => {
  music.volume = parseFloat(vol.value);
  volIcon.style.opacity = vol.value == 0 ? '0.4' : '1';
});
volIcon.addEventListener('click', () => {
  if (music.volume > 0) {
    music.dataset.prev = music.volume;
    music.volume = 0;
    vol.value = 0;
    volIcon.style.opacity = '0.4';
  } else {
    music.volume = music.dataset.prev || 0.5;
    vol.value = music.volume;
    volIcon.style.opacity = '1';
  }
});

// ============================================
// Click to enter
// ============================================
enterScreen.addEventListener('click', () => {
  enterScreen.classList.add('hidden');
  hasEntered = true;
  music.volume = parseFloat(vol.value);
  music.play().catch(()=>{});
  startTypewriterName();
  startTypewriterBio();
});

// ============================================
// Физика карточки
// ============================================
const MAX_TILT = 14;
const LIFT = 8;

window.addEventListener('mousemove', (e) => {
  const rect = wrapper.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const dx = (e.clientX - cx) / (window.innerWidth / 2);
  const dy = (e.clientY - cy) / (window.innerHeight / 2);

  const rx = (-dy * MAX_TILT).toFixed(2);
  const ry = ( dx * MAX_TILT).toFixed(2);

  card.style.transform =
    `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${LIFT}px)`;
});

document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
});

// ============================================
// Счётчик просмотров — ОТКЛЮЧЁН
// ============================================
/*
fetch('https://abacus.jasoncameron.dev/hit/0extra-profile/visits')
  .then(r => r.json())
  .then(d => { if (d && d.value !== undefined) viewsEl.textContent = d.value; })
  .catch(() => { viewsEl.textContent = '—'; });
*/
viewsEl.textContent = '—';

// ============================================
// WeChat QR
// ============================================
const wechatBtn    = document.getElementById('wechat-btn');
const wechatModal  = document.getElementById('wechat-modal');
const wechatClose  = document.getElementById('wechat-close');

wechatBtn.addEventListener('click', (e) => {
  e.preventDefault();
  wechatModal.classList.add('active');
});
wechatClose.addEventListener('click', () => {
  wechatModal.classList.remove('active');
});
wechatModal.addEventListener('click', (e) => {
  if (e.target === wechatModal) wechatModal.classList.remove('active');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') wechatModal.classList.remove('active');
});

// ============================================
// Matrix
// ============================================
(function initMatrix() {
  const canvas = document.getElementById('wechat-matrix');
  const ctx = canvas.getContext('2d');

  const chars =
    '的一是不了人我在有他这为之大来以个中上们到说国和地也子时道出而要于就下得可你年生自会那后能对着事其里所去行过家十用发天如然作方成者多日都三小军二无同么经法当起与好看学进种将还分此心前面又定见只主没公从' +
    '0123456789' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let columns = 0;
  let drops = [];
  const fontSize = 18;
  let animId = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(1).map(() => Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = 'rgba(8, 8, 8, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px "Noto Sans SC", monospace';
    ctx.textBaseline = 'top';

    const isRainbow = document.body.classList.contains('rainbow-theme');
    let gradient, shadowColor;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      if (isRainbow) {
        const hue = (performance.now() / 20 + i * 5) % 360;
        const hue2 = (hue + 40) % 360;
        gradient = ctx.createLinearGradient(x, y - 100, x, y);
        gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0)`);
        gradient.addColorStop(0.7, `hsla(${hue}, 100%, 60%, 0.6)`);
        gradient.addColorStop(1, `hsla(${hue2}, 100%, 70%, 1)`);
        shadowColor = `hsl(${hue}, 100%, 60%)`;
      } else {
        gradient = ctx.createLinearGradient(x, y - 100, x, y);
        gradient.addColorStop(0, `rgba(${matrixRGB}, 0)`);
        gradient.addColorStop(0.7, `rgba(${matrixRGB}, 0.6)`);
        gradient.addColorStop(1, `rgba(${matrixRGB}, 1)`);
        shadowColor = `rgb(${matrixRGB})`;
      }

      ctx.fillStyle = gradient;
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 8;
      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  function start() {
    resize();
    if (animId) cancelAnimationFrame(animId);
    function loop() { draw(); animId = requestAnimationFrame(loop); }
    loop();
  }

  function stop() {
    if (animId) { cancelAnimationFrame(animId); animId = null; }
  }

  window.addEventListener('resize', resize);

  const observer = new MutationObserver(() => {
    if (wechatModal.classList.contains('active')) setTimeout(start, 30);
    else stop();
  });
  observer.observe(wechatModal, { attributes: true, attributeFilter: ['class'] });
})();

// ============================================
// Typewriter: ник
// ============================================
const NAME = '0extra';
let nameIdx = 0;

function startTypewriterName() {
  if (nameIdx <= NAME.length) {
    usernameEl.textContent = NAME.slice(0, nameIdx);
    nameIdx++;
    setTimeout(startTypewriterName, 180);
  }
}

// ============================================
// Typewriter: био
// ============================================
function startTypewriterBio() {
  const myGen = ++bioGeneration;

  bioMsgIdx = 0;
  bioCharIdx = 0;
  isBioDeleting = false;
  bioEl.textContent = '';

  function tick() {
    if (myGen !== bioGeneration) return;

    const theme = THEMES[currentThemeIdx];
    const messages = theme.bios;
    const current = messages[bioMsgIdx % messages.length];

    if (!isBioDeleting && bioCharIdx < current.length) {
      bioCharIdx++;
      bioEl.textContent = current.slice(0, bioCharIdx);
      setTimeout(tick, 55);
    } else if (!isBioDeleting && bioCharIdx === current.length) {
      isBioDeleting = true;
      setTimeout(tick, 2500);
    } else if (isBioDeleting && bioCharIdx > 0) {
      bioCharIdx--;
      bioEl.textContent = current.slice(0, bioCharIdx);
      setTimeout(tick, 25);
    } else {
      isBioDeleting = false;
      bioMsgIdx = (bioMsgIdx + 1) % messages.length;
      setTimeout(tick, 400);
    }
  }

  tick();
}
