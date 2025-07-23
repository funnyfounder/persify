// Pass & Play Only Quiz Game - All Enhancements
// Author: Suraj Kumar Gupta 🚀

const app = document.getElementById('app');

// Trait mapping! (8 keys, with emoji)
const TRAIT_LABELS = [
  { key: "intelligence",  label: "Intelligence",  emoji: "🧠" },
  { key: "creativity",    label: "Creativity",    emoji: "🎨" },
  { key: "social",        label: "Social Skills", emoji: "🤝" },
  { key: "emotional",     label: "Emotional EQ",  emoji: "💖" },
  { key: "risk",          label: "Risk-taking",   emoji: "🎲" },
  { key: "leadership",    label: "Leadership",    emoji: "🌟" },
  { key: "humor",         label: "Humor",         emoji: "😂" },
  { key: "curiosity",     label: "Curiosity",     emoji: "🔍" },
];

// Simple adaptive question set for demo with trait influences
const QUESTION_SET = [
  {
    q: "You're planning your dream weekend. What do you pick?",
    options: [
      {txt:"Join a fun improv group show!", affects: {humor:2, social:2}},
      {txt:"Explore a new science museum.", affects: {curiosity:2, intelligence:2}},
      {txt:"Set up an adventure hike to somewhere wild.", affects: {risk:2, leadership:1}},
      {txt:"Paint murals with friends.", affects: {creativity:2, social:1}}
    ]
  },
  {
    q: "You discover a mystery box. What do you do?",
    options: [
      {txt:"Open it, but carefully analyze clues!", affects: {curiosity:2, intelligence:1}},
      {txt:"Invite everyone to guess what's inside!", affects: {humor:1, social:2}},
      {txt:"Craft a creative story about its origin.", affects: {creativity:2}},
      {txt:"Risk it all and open—YOLO!", affects: {risk:2, leadership:1}},
    ]
  },
  {
    q: "A friend feels down. Your response?",
    options:[
      {txt:"Crack a silly joke or meme!", affects: {humor:2, emotional:1}},
      {txt:"Listen and try to empathize.", affects: {emotional:2, social:1}},
      {txt:"Offer to do a creative activity together.", affects: {creativity:1, emotional:1}},
      {txt:"Give strategic advice for their situation.", affects: {intelligence:2, leadership:1}}
    ]
  },
  {
    q: "Which challenge would you ACTUALLY sign up for?",
    options:[
      {txt:"Solve a Rubik’s cube blindfolded.", affects: {intelligence:2, curiosity:1}},
      {txt:"Stand-up comedy open mic!", affects: {humor:2, risk:1}},
      {txt:"Organize a charity hackathon.", affects: {leadership:2, social:1}},
      {txt:"Design fantasy creatures.", affects: {creativity:2, curiosity:1}},
    ]
  },
  {
    q: "If you win a surprise prize, what would you hope it is?",
    options:[
      {txt:"Tickets to a creative workshop.", affects: {creativity:2, curiosity:1}},
      {txt:"VIP pass to meet a famous scientist.", affects: {intelligence:2, curiosity:1}},
      {txt:"A group adventure holiday.", affects: {risk:2, leadership:1}},
      {txt:"Invitation to host a fun podcast!", affects: {humor:2, social:1}},
    ]
  },
  {
    q: "You're the game master at a party. You...",
    options:[
      {txt:"Invent hilarious new rules!", affects: {humor:2, creativity:1}},
      {txt:"Boost everyone’s energy and teamwork.", affects: {leadership:2, social:1}},
      {txt:"Quietly observe and jot down improvements.", affects: {intelligence:1, curiosity:2}},
      {txt:"Try wild and risky game ideas.", affects: {risk:2, creativity:1}},
    ]
  },
  {
    q: "Best compliment you could receive?",
    options:[
      {txt:"So imaginative! Your ideas WOW me.", affects: {creativity:2, curiosity:1}},
      {txt:"You always make me laugh!", affects: {humor:2, social:1}},
      {txt:"You’re super insightful—so sharp.", affects: {intelligence:2, leadership:1}},
      {txt:"So empathetic, you just get me.", affects: {emotional:2, social:1}},
    ]
  },
  {
    q: "Pick a superpower:",
    options:[
      {txt:"Charm everyone at a party", affects: {social:2, leadership:1}},
      {txt:"Solve the world’s hardest puzzle!", affects: {intelligence:2, curiosity:1}},
      {txt:"Make everyone laugh anywhere", affects: {humor:2, emotional:1}},
      {txt:"Invent new worlds in seconds", affects: {creativity:2, intelligence:1}},
    ]
  },
  {
    q: "You receive an invitation to a mysterious *new experience*.",
    options: [
      {txt: "Jump in—what’s life without risk!", affects: {risk:2, curiosity:1}},
      {txt: "Ask questions & research first.", affects: {intelligence:1, curiosity:2}},
      {txt: "Make it a fun group event!", affects: {humor:1, social:2}},
      {txt: "Turn it into an art/science project.", affects: {creativity:2, leadership:1}},
    ]
  },
  {
    q: "What's your ideal pet?",
    options:[
      {txt:"A witty parrot who cracks jokes.", affects: {humor:2}},
      {txt:"A quirky lizard who loves experiments.", affects: {curiosity:2, intelligence:1}},
      {txt:"A friendly dog who loves people.", affects: {emotional:2, social:1}},
      {txt:"A bold cat who leads the pack!", affects: {risk:1, leadership:2}},
    ]
  },
  {
    q: "You’re stuck on a puzzle. What next?",
    options:[
      {txt:"Try wild solutions, even silly ones.", affects: {creativity:2, humor:1}},
      {txt:"Team up and brainstorm together.", affects: {social:2, emotional:1}},
      {txt:"Research, strategize, try again!", affects: {intelligence:2, curiosity:1}},
      {txt:"Take a risk and make a bold guess!", affects: {risk:2, leadership:1}},
    ]
  },
  {
    q: "What role do you play in your squad?",
    options:[
      {txt:"The cheerful troublemaker", affects: {humor:2, risk:1}},
      {txt:"The wise strategist", affects: {intelligence:2, leadership:1}},
      {txt:"The creative wildcard", affects: {creativity:2, curiosity:1}},
      {txt:"The supportive peacemaker", affects: {emotional:2, social:1}},
    ]
  }
];
// Fun tips for after the quiz
const FUN_TIPS = [
  "Tell your friends to try—everyone's quiz world is unique!",
  "What trait surprised you the most?",
  "Play with friends, pass it around, compare your worlds!",
  "Your personality matrix has hidden strengths—embrace them!",
  "You shine brightest when you’re yourself. ✨"
];

let state = {
  stage: "landing",      // landing, player, quiz, result
  players: [],           // array of names
  currentPlayer: 0,
  responses: [],         // [ [{qIdx, ansIdx}, ...], ... ]
  scores: [],            // [ { trait: val, ... }, ... ]
  quizOrder: []          // array of question indices, can shuffle for each player
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
function randTip(fallback="Enjoy!") {
  return FUN_TIPS[Math.floor(Math.random()*FUN_TIPS.length)] || fallback;
}

// ---------- RENDERING SECTIONS ----------

function renderLanding() {
  state.stage = "landing";
  app.innerHTML = `
    <div class="fade-in">
      <h1 class="quiz-title">🌟 Welcome to Funky Quiz World! 🌍</h1>
      <div class="intro-glow">Step into a neon wonderland of questions, laughter and discovery!</div>
      <div class="description">
        <b>Discover your hidden strengths</b>—from intelligence to humor to bold spirit.<br>
        Challenge yourself or <b>pass & play with friends</b>: every choice shapes your unique personality.<br>
        <ul style="text-align:left;font-size:.98em;margin:16px 0 0 30px;line-height:1.5;">
          <li>🤩 12 dazzling, ever-changing questions</li>
          <li>🌈 Animated, colorful, and smooth experience</li>
          <li>💡 8 personality traits revealed: Smart, Creative, Social, Empathetic, Risky, Leader, Witty, Inquisitive!</li>
        </ul>
        <b style="font-size:1.11em;color:var(--secondary);">Ready to find your vibe?</b>
      </div>
      <button class="cta-btn" tabindex="0" onclick="startPlayerSelect()">Start Your Journey!</button>
    </div>
  `;
}

function startPlayerSelect() {
  state.stage = "player";
  state.players = [];
  state.responses = [];
  state.scores = [];
  state.currentPlayer = 0;
  app.innerHTML = `
    <div class="slide-in player-select-wrap">
      <h2 class="quiz-title" style="font-size:2.1em;margin-top:11px;">How many are playing?</h2>
      <div class="player-cards">
        <div class="player-card" onclick="selectPlayerCount(1)">1 Player</div>
        <div class="player-card" onclick="selectPlayerCount(2)">2 Players</div>
        <div class="player-card" onclick="selectPlayerCount(3)">3 Players</div>
        <div class="player-card" onclick="selectPlayerCount(4)">4 Players</div>
      </div>
      <div style="color:#ffeea6;font-size:.99em;margin:13px 0 7px 0;">(Pass your device after each round!)</div>
    </div>
  `;
}
window.startPlayerSelect = startPlayerSelect; // For button

function selectPlayerCount(count) {
  const form = [];
  for (let i=0;i<count;i++) {
    form.push(`<input required class="input-box" id="pname${i}" maxlength="16" placeholder="Enter Player ${i+1} name">`);
  }
  app.innerHTML = `
    <div class="slide-in" style="text-align:center;max-width:340px;margin:auto;">
      <h2 class="quiz-title" style="font-size:1.32em;">Enter player name${count>1?'s':''}:</h2>
      <form autocomplete="off" id="playerNamesForm" onsubmit="submitPlayerNames(event,${count})">
        <div class="input-boxes" style="margin-top:22px;display:flex;flex-direction:column;gap:17px;">
          ${form.join('')}
        </div>
        <button class="cta-btn" style="margin-top:27px;">Let's Go!</button>
      </form>
    </div>
  `;
}
window.selectPlayerCount = selectPlayerCount;

function submitPlayerNames(e,count) {
  e.preventDefault();
  const names = [];
  for (let i=0;i<count;i++) {
    let val = document.getElementById('pname'+i).value.trim();
    if (!val) {
      document.getElementById('pname'+i).focus();
      return;
    }
    names.push(val.slice(0,14));
  }
  state.players = names;
  state.responses = Array.from({length:count},()=>[]);
  state.scores = Array.from({length:count},()=>({}));
  state.quizOrder = Array.from({length:QUESTION_SET.length},(_,i)=>i);
  shuffleArray(state.quizOrder);
  state.currentPlayer = 0;
  startQuiz();
}
window.submitPlayerNames = submitPlayerNames;

// --- QUIZ LOGIC + ADAPTIVE FLOW ---

function startQuiz() {
  renderQuizForPlayer(state.currentPlayer, 0);
}

function renderQuizForPlayer(playerIndex, qNum) {
  state.stage = "quiz";
  const name = state.players[playerIndex];
  const totalQs = Math.min(QUESTION_SET.length,12);
  const qIdx = state.quizOrder[qNum];
  const qData = QUESTION_SET[qIdx];
  const prevAns = state.responses[playerIndex][qNum] || null;
  let optionsHtml = '';
  for (let i=0;i<qData.options.length;i++) {
    optionsHtml += `
      <button class="option-btn${prevAns && prevAns.ansIdx===i ?' selected':''}" 
        onclick="selectAnswer(${playerIndex},${qNum},${i},this)" 
        tabindex="0" aria-label="Answer option ${i+1}">
        ${qData.options[i].txt}
      </button>
    `;
  }
  app.innerHTML = `
    <div class="quiz-section fade-in" id="quizSection">
      <div class="question-no">Player <b>${name}</b> &mdash; Question ${qNum+1} of ${totalQs}</div>
      <div class="quiz-question">${qData.q}</div>
      <div class="options-wrap" id="opts${playerIndex}-${qNum}">${optionsHtml}</div>
      <button class="next-btn" id="nextBtn" disabled style="margin-top:28px;" onclick="nextQuizQ(${playerIndex},${qNum})">
          ${qNum+1===totalQs?(playerIndex+1===state.players.length?"See Results":"Next Player"):"Next"}
      </button>
    </div>
  `;
  // Restore selected state
  if (prevAns) {
    document.getElementById('nextBtn').disabled = false;
  }
}
window.selectAnswer = function(player, qNum, ansIdx, btn) {
  // Deselect all
  const optionsDiv = document.getElementById(`opts${player}-${qNum}`);
  Array.from(optionsDiv.children).forEach(c => c.classList.remove('selected'));
  btn.classList.add('selected');
  state.responses[player][qNum] = {qIdx: state.quizOrder[qNum], ansIdx: ansIdx};
  document.getElementById('nextBtn').disabled = false;
}

window.nextQuizQ = function(playerIndex, qNum) {
  // Next question for this player, or switch to next player, or to results
  const totalQs = Math.min(QUESTION_SET.length,12);
  if (qNum+1 < totalQs) {
    renderQuizForPlayer(playerIndex, qNum+1);
  } else {
    if (playerIndex+1 < state.players.length) {
      state.currentPlayer++;
      renderQuizForPlayer(state.currentPlayer, 0);
    } else {
      // All finished; calculate results!
      showResults();
    }
  }
}

// --------- RESULTS ---------
function showResults() {
  state.stage = "result";
  // Compute personality matrix for each player
  let resHtml = '';
  for (let p=0;p<state.players.length;p++) {
    // Tally
    let matrix = {};
    for (let t of TRAIT_LABELS) matrix[t.key]=0;
    for (let q of state.responses[p]) {
      let qData = QUESTION_SET[q.qIdx];
      let optionObj = qData.options[q.ansIdx];
      for (let k in optionObj.affects) matrix[k] += optionObj.affects[k];
    }
    state.scores[p]=matrix;
    // Explorer traits
    let maxV = Math.max(...Object.values(matrix));
    let bestTraits = TRAIT_LABELS.filter(t=>matrix[t.key]===maxV);
    let traitStr = bestTraits.map(t=>t.label).join(", ");
    let emojis = bestTraits.map(t=>t.emoji).join(' ');
    resHtml += `
      <div style="margin-bottom:23px;">
        <div class="result-title">${state.players[p]}, Your Quiz World is: ${emojis}</div>
        <div class="result-desc">
          <b>Strongest traits:</b> <span style="color:var(--primary);font-weight:700;">${traitStr}</span>
        </div>
        <div class="personality-matrix">
          ${
            TRAIT_LABELS.map(t=>`
              <div class="pers-trait">
                <span class="emoji-badge">${t.emoji}</span>
                ${t.label}
                <div style="font-size:1.17em;color:var(--primary);font-weight:800;">
                  ${matrix[t.key]}
                </div>
              </div>
            `).join('')
          }
        </div>
        <div class="fun-tip">${randTip()}</div>
      </div>
      <hr style="margin:28px 0 23px 0; border:.5px solid #b8f8fd80;">
    `;
  }
  app.innerHTML = `
    <div class="result-section" style="text-align:center;">
      <h2 class="quiz-title" style="background:linear-gradient(87deg,#fff72d,#0cd6ff 120%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Your Funky Report!</h2>
      <div style="margin-bottom:18px;font-size:1.2em">Quiz Complete! See your personality in vibrant color:</div>
      ${resHtml}
      <div style="margin:34px 0 16px 0;"><button class="again-btn" onclick="renderLanding()">Play Again</button></div>
    </div>
  `;
  confetti();
}

// ---- Confetti Animation ----
// Based on https://codepen.io/linrock/pen/Amdhr
function confetti() {
  let canvas = document.getElementById('confetti-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let context = canvas.getContext("2d");
  let W = canvas.width, H = canvas.height;
  let mp = 120 + 35*Math.random(); // count
  let particles = [];
  for(let i = 0; i < mp; i++) {
    particles.push({
      x: Math.random()*W,
      y: Math.random()*-H,
      r: Math.random()*8+6,
      d: (Math.random()*mp) + 10,
      color: `hsl(${Math.random()*360}, 86%, 56%)`,
      tilt: Math.random()*20-10,
      tiltAngleIncremental: (Math.random()*0.12)+0.05,
      tiltAngle: 0
    });
  }
  let angle = 0;
  function draw() {
    context.clearRect(0, 0, W, H);
    angle += 0.01;
    for(let i = 0; i < mp; i++) {
      let p = particles[i];
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(angle+p.d)+2+p.r/2)/1.4;
      p.x += Math.sin(angle);
      p.tilt = Math.sin(p.tiltAngle- (i%3)) * 16;
      context.beginPath();
      context.lineWidth = p.r;
      context.strokeStyle = p.color;
      context.moveTo(p.x+p.tilt+p.r/3, p.y);
      context.lineTo(p.x, p.y + p.tilt + p.r/3);
      context.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
  setTimeout(()=>{canvas.width=canvas.height=0},2800);
}

// Focus management and mobile fix
window.onresize = () => {
  let canvas = document.getElementById('confetti-canvas');
  if(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

// Start!
renderLanding();
