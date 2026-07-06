// Main interactions: personalization, clock, days counter, compliments, share, accessibility
(() => {
  const DEFAULT_NAME = 'Friend';
  const START_DATE_ISO = '2025-12-05'; // original start date

  // Elements
  const intro = document.getElementById('intro');
  const openGiftBtn = document.getElementById('openGiftBtn');

  const recipientSpan = document.getElementById('recipient');
  const clockEl = document.getElementById('clock');
  const daysEl = document.getElementById('daysCounter');
  const complimentBtn = document.getElementById('complimentBtn');
  const surpriseBtn = document.getElementById('surpriseBtn');
  const messageEl = document.getElementById('message');

  const msgs = [
    "🌸 You are my favorite kind of beautiful.",
    "🌷 You make everything softer.",
    "🌻 You are my peace.",
    "💐 You are my happiness.",
    "✨ Your laughter brightens my whole day.",
    "🌟 You are brave and kind."
  ];

  // Utilities
  function qs(selector){ return document.querySelector(selector); }
  function getName(){
    // priority: query param ?name= > localStorage > DEFAULT_NAME
    const params = new URLSearchParams(location.search);
    const qname = params.get('name');
    if(qname) return qname;
    return localStorage.getItem('goodMorningName') || DEFAULT_NAME;
  }
  function setName(n){
    localStorage.setItem('goodMorningName', n);
    recipientSpan.textContent = n;
    // if intro visible, update title
    const title = document.getElementById('introTitle');
    if(title) title.textContent = `🌸 I made something special for you 🌷`;
  }

  // Clock
  function updateClock(){
    clockEl.textContent = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'});
  }
  // Days counter
  function updateDays(){
    const start = new Date(START_DATE_ISO);
    let diff = Math.floor((new Date() - start) / (1000*60*60*24));
    if(isNaN(diff) || diff < 0) diff = 0;
    daysEl.textContent = `🌹 Memories: ${diff} days`;
  }

  // Greeting controls
  function showCompliment(){
    messageEl.textContent = msgs[Math.floor(Math.random() * msgs.length)];
  }
  function showSurprise(){
    messageEl.textContent = "🌷 Just like flowers bloom, my feelings for you grow every day.";
  }

  // Event wiring
  openGiftBtn.addEventListener('click', () => {
    intro.style.display = 'none';
    document.getElementById('main').focus();
    start();
  });

  complimentBtn.addEventListener('click', showCompliment);
  surpriseBtn.addEventListener('click', showSurprise);

  // Ripple effect for buttons (delegated)
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.btn');
    if(!target) return;
    // create ripple
    const rect = target.getBoundingClientRect();
    const circle = document.createElement('span');
    circle.className = 'ripple';
    circle.style.left = (e.clientX - rect.left) + 'px';
    circle.style.top = (e.clientY - rect.top) + 'px';
    target.appendChild(circle);
    setTimeout(()=> circle.remove(), 600);
  });

  // On load
  function init(){
    // set initial name
    const name = getName();
    setName(name);

    // If a name was set via query param, reveal main immediately
    const params = new URLSearchParams(location.search);
    if(params.has('name')){
      intro.style.display = 'none';
      start();
    } else {
      // keep intro up; let user open
      intro.style.display = 'flex';
    }

    // set focus and accessibility
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  // Start intervals
  let clockInterval, daysInterval;
  function start(){
    updateClock();
    updateDays();
    clearInterval(clockInterval);
    clearInterval(daysInterval);
    clockInterval = setInterval(updateClock, 1000);
    daysInterval = setInterval(updateDays, 60*1000);
  }

  // keyboard accessibility: allow Enter key to open when focused on button
  openGiftBtn.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGiftBtn.click(); } });

  // initial run
  init();

  // expose minimal API for debugging (optional)
  window._gm = { setName, start, showCompliment, showSurprise };

})();
