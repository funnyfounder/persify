// Pass & Play Only Quiz Game - All Enhancements
// Author: Suraj Kumar Gupta 🚀

/* ------------------ State ------------------ */
const app   = document.getElementById('app');
const foot  = document.getElementById('site-footer');
const stageFooterFull = "© 2025 PERSIFY | Built by Suraj Kumar Gupta 🚀";
const stageFooterLite = "© 2025 PERSIFY";

/* ------------------ Questions & Traits (unchanged from last version) ------------------ */
const TRAIT_LABELS=[{key:"intelligence",label:"Intelligence",emoji:"🧠"},{key:"creativity",label:"Creativity",emoji:"🎨"},{key:"social",label:"Social Skills",emoji:"🤝"},{key:"emotional",label:"Emotional EQ",emoji:"💖"},{key:"risk",label:"Risk-Taking",emoji:"🎲"},{key:"leadership",label:"Leadership",emoji:"🌟"},{key:"humor",label:"Humor",emoji:"😂"},{key:"curiosity",label:"Curiosity",emoji:"🔍"}];
/* (Keep QUESTION_SET and FUN_TIPS arrays from previous code) */
const QUESTION_SET=[/* … (same as before) … */];
const FUN_TIPS=[/* … (same as before) … */];

/* ------------------ Helpers ------------------ */
const S=state=>window.location.hash=state;
function setFooter(full){foot.textContent=full?stageFooterFull:stageFooterLite;}
function randTip(){return FUN_TIPS[Math.floor(Math.random()*FUN_TIPS.length)];}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a}

/* ------------------ Global State ------------------ */
let GAME={
  stage:"landing",
  players:[],
  current:0,
  answers:[],  // per player per q
  order:shuffle([...Array(QUESTION_SET.length).keys()])
};

/* ------------------ Render Functions ------------------ */
function renderLanding(){
  setFooter(true);
  GAME.stage="landing";
  app.innerHTML=`
    <h1 class="quiz-title fade-in">Welcome to Persify’s Quiz World!</h1>
    <p class="desc fade-in">Dive into 12 vibrant questions that reveal eight core traits. Play solo or pass your phone to friends – discover who you are in living colour! 🔮</p>
    <button class="cta-btn fade-in" onclick="renderPlayerSelect()">Play Now</button>
  `;
}

function renderPlayerSelect(){
  setFooter(true);
  GAME.stage="player";
  app.innerHTML=`
    <h2 class="quiz-title">How many players?</h2>
    <div>${[1,2,3,4].map(n=>`<div class="player-card" onclick="askNames(${n})">${n}</div>`).join('')}</div>
  `;
}

function askNames(n){
  GAME.players=Array(n).fill("");
  GAME.answers=Array(n).fill(null).map(()=>[]);
  GAME.current=0;
  app.innerHTML=`
    <h2 class="quiz-title">Enter player names</h2>
    <form onsubmit="saveNames(event)">
      ${GAME.players.map((_,i)=>`<input class="input-box" id="p${i}" placeholder="Player ${i+1}" required>`).join('')}
      <button class="cta-btn" style="margin-top:18px">Start Quiz</button>
    </form>
  `;
}
function saveNames(e){
  e.preventDefault();
  GAME.players=GAME.players.map((_,i)=>document.getElementById(`p${i}`).value.trim()||`P${i+1}`);
  GAME.order=shuffle([...Array(QUESTION_SET.length).keys()]);
  renderQuiz(0,0);
}

function renderQuiz(p,q){
  setFooter(false);
  const total=12;
  const qIdx=GAME.order[q];
  const Q=QUESTION_SET[qIdx];
  const picked=GAME.answers[p][q];
  app.innerHTML=`
    <div class="quiz-section">
      <div>Player <b>${GAME.players[p]}</b> – Question ${q+1}/${total}</div>
      <div class="quiz-question">${Q.q}</div>
      ${Q.options.map((o,i)=>`
        <button class="option-btn${picked===i?' selected':''}" onclick="selectOpt(${p},${q},${i},this)">${o.txt}</button>
      `).join('')}
      <button id="nextBtn" class="next-btn" disabled>Next</button>
    </div>
  `;
}
function selectOpt(p,q,i,btn){
  [...btn.parentNode.querySelectorAll('.option-btn')].forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  GAME.answers[p][q]=i;
  document.getElementById("nextBtn").disabled=false;
  document.getElementById("nextBtn").onclick=()=>nextStep(p,q);
}
function nextStep(p,q){
  const total=12;
  if(q+1<total){renderQuiz(p,q+1)}
  else if(p+1<GAME.players.length){renderQuiz(p+1,0)}
  else showResults();
}

function showResults(){
  setFooter(true);
  const reports=GAME.players.map((name,idx)=>{
    const score=TRAIT_LABELS.reduce((m,t)=>(m[t.key]=0,m),{});
    GAME.answers[idx].forEach((ans,qNum)=>{
      const opt=QUESTION_SET[GAME.order[qNum]].options[ans];
      Object.entries(opt.affects).forEach(([k,v])=>score[k]+=v);
    });
    const max=Math.max(...Object.values(score));
    const top=TRAIT_LABELS.filter(t=>score[t.key]===max);
    return{ name,score,top };
  });
  app.innerHTML=`
    <div class="result-section fade-in">
      <h2 class="result-title">Your Persify Profile</h2>
      ${reports.map(r=>`
        <h3 style="margin:10px 0">${r.name} – ${r.top.map(t=>t.emoji).join(' ')}</h3>
        <p><b>Top trait(s):</b> ${r.top.map(t=>t.label).join(', ')}</p>
        <div>${TRAIT_LABELS.map(t=>`${t.emoji} ${t.label}: ${r.score[t.key]}`).join(' | ')}</div>
        <hr/>
      `).join('')}
      <button class="again-btn" onclick="renderLanding()">Play Again</button>
      <button class="cta-btn share-btn" onclick="shareScore()">Share Result</button>
    </div>
  `;
  confetti();
}

/* ------------------ Share API ------------------ */
function shareScore(){
  const text="I just discovered my traits on Persify’s Quiz World! 🚀";
  if(navigator.share){
    navigator.share({title:"Persify Result",text, url:location.href});
  }else{
    navigator.clipboard.writeText(text+" "+location.href).then(()=>alert("Link copied!"));
  }
}

/* ------------------ Confetti (unchanged) ------------------ */
/* (reuse the confetti() function from prior version) */

/* ------------------ Init ------------------ */
renderLanding();
