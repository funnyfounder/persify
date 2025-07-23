/* ---------- FOOTER CONTROL ---------- */
const app   = document.getElementById('app');
const foot  = document.getElementById('site-footer');
const FOOT_FULL = "© 2025 PERSIFY | Built by Suraj Kumar Gupta 🚀";
const FOOT_LITE = "© 2025 PERSIFY";
const setFooter = full => foot.textContent = full ? FOOT_FULL : FOOT_LITE;

/* ---------- DATA ---------- */
const TRAITS = [
  {k:"intelligence",l:"Intelligence",e:"🧠"},
  {k:"creativity", l:"Creativity", e:"🎨"},
  {k:"social",     l:"Social Skills",e:"🤝"},
  {k:"emotional",  l:"Empathy",e:"💖"},
  {k:"risk",       l:"Risk-Taking",e:"🎲"},
  {k:"leadership", l:"Leadership",e:"🌟"},
  {k:"humor",      l:"Humor",e:"😂"},
  {k:"curiosity",  l:"Curiosity",e:"🔍"}
];

const Q = [ /* 12 questions – same as earlier release */  
  {q:"You're planning your dream weekend. What do you pick?",
   o:[
     {t:"Join a fun improv group show!",         a:{humor:2,social:2}},
     {t:"Explore a new science museum.",         a:{curiosity:2,intelligence:2}},
     {t:"Set up an adventure hike somewhere wild.",a:{risk:2,leadership:1}},
     {t:"Paint murals with friends.",            a:{creativity:2,social:1}}
   ]},
  {q:"You discover a mystery box. What do you do?",
   o:[
     {t:"Open it, but carefully analyse clues!", a:{curiosity:2,intelligence:1}},
     {t:"Invite everyone to guess what's inside!",a:{humor:1,social:2}},
     {t:"Craft a creative story about its origin.",a:{creativity:2}},
     {t:"Risk it all and open—YOLO!",            a:{risk:2,leadership:1}}
   ]},
  {q:"A friend feels down. Your response?",
   o:[
     {t:"Crack a silly joke or meme!",           a:{humor:2,emotional:1}},
     {t:"Listen and empathise.",                 a:{emotional:2,social:1}},
     {t:"Offer a creative activity together.",   a:{creativity:1,emotional:1}},
     {t:"Give strategic advice.",                a:{intelligence:2,leadership:1}}
   ]},
  {q:"Which challenge would you actually sign up for?",
   o:[
     {t:"Solve a Rubik’s cube blindfolded.",     a:{intelligence:2,curiosity:1}},
     {t:"Stand-up comedy open mic!",             a:{humor:2,risk:1}},
     {t:"Organise a charity hackathon.",         a:{leadership:2,social:1}},
     {t:"Design fantasy creatures.",             a:{creativity:2,curiosity:1}}
   ]},
  {q:"If you win a surprise prize, what would you hope it is?",
   o:[
     {t:"Tickets to a creative workshop.",       a:{creativity:2,curiosity:1}},
     {t:"VIP pass to meet a famous scientist.",  a:{intelligence:2,curiosity:1}},
     {t:"A group adventure holiday.",            a:{risk:2,leadership:1}},
     {t:"Invitation to host a fun podcast!",     a:{humor:2,social:1}}
   ]},
  {q:"You're the game-master at a party. You…",
   o:[
     {t:"Invent hilarious new rules!",           a:{humor:2,creativity:1}},
     {t:"Boost everyone’s energy and teamwork.", a:{leadership:2,social:1}},
     {t:"Quietly observe and improve.",          a:{intelligence:1,curiosity:2}},
     {t:"Try wild and risky ideas.",             a:{risk:2,creativity:1}}
   ]},
  {q:"Best compliment you could receive?",
   o:[
     {t:"So imaginative! Your ideas wow me.",    a:{creativity:2,curiosity:1}},
     {t:"You always make me laugh!",             a:{humor:2,social:1}},
     {t:"You’re super insightful—so sharp.",     a:{intelligence:2,leadership:1}},
     {t:"So empathetic, you just get me.",       a:{emotional:2,social:1}}
   ]},
  {q:"Pick a super-power:",
   o:[
     {t:"Charm everyone at a party.",            a:{social:2,leadership:1}},
     {t:"Solve the world’s hardest puzzle!",     a:{intelligence:2,curiosity:1}},
     {t:"Make everyone laugh anywhere.",         a:{humor:2,emotional:1}},
     {t:"Invent new worlds in seconds.",         a:{creativity:2,intelligence:1}}
   ]},
  {q:"You receive an invitation to a mysterious experience.",
   o:[
     {t:"Jump in—what’s life without risk!",     a:{risk:2,curiosity:1}},
     {t:"Ask questions & research first.",       a:{intelligence:1,curiosity:2}},
     {t:"Make it a fun group event!",            a:{humor:1,social:2}},
     {t:"Turn it into an art/science project.",  a:{creativity:2,leadership:1}}
   ]},
  {q:"What's your ideal pet?",
   o:[
     {t:"A witty parrot who cracks jokes.",      a:{humor:2}},
     {t:"A quirky lizard for experiments.",      a:{curiosity:2,intelligence:1}},
     {t:"A friendly dog who loves people.",      a:{emotional:2,social:1}},
     {t:"A bold cat who leads the pack!",        a:{risk:1,leadership:2}}
   ]},
  {q:"You’re stuck on a puzzle. What next?",
   o:[
     {t:"Try wild solutions—even silly ones.",   a:{creativity:2,humor:1}},
     {t:"Team-up and brainstorm.",               a:{social:2,emotional:1}},
     {t:"Research, strategise, retry.",          a:{intelligence:2,curiosity:1}},
     {t:"Take a risk and guess!",                a:{risk:2,leadership:1}}
   ]},
  {q:"What role do you play in your squad?",
   o:[
     {t:"The cheerful troublemaker.",            a:{humor:2,risk:1}},
     {t:"The wise strategist.",                  a:{intelligence:2,leadership:1}},
     {t:"The creative wildcard.",                a:{creativity:2,curiosity:1}},
     {t:"The supportive peacemaker.",            a:{emotional:2,social:1}}
   ]}
];

const TIPS = [
  "Tell friends to try—every Persify world is unique!",
  "Which trait surprised you most?",
  "Pass & play with friends to compare your vibes.",
  "Your hidden strengths are shining—embrace them!",
  "Stay curious. Adventure awaits! 🚀"
];

/* ---------- UTIL ---------- */
const rnd  = a => a[Math.floor(Math.random()*a.length)];
const shuf = a => {for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}};
const confetti = ()=>{ /* tiny confetti from earlier version */ 
  const canvas=document.getElementById('confetti-canvas');canvas.width=innerWidth;canvas.height=innerHeight;
  const ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height,mp=140;
  const p=[]; for(let i=0;i<mp;i++)p.push({x:Math.random()*W,y:Math.random()*-H,r:Math.random()*8+4,d:Math.random()*mp+10,c:`hsl(${Math.random()*360},80%,60%)`,t:0});
  const draw=()=>{ctx.clearRect(0,0,W,H);p.forEach((m,i)=>{m.t+=.05;m.y+=(Math.cos(m.d)+3+m.r/2)/1.6;m.x+=Math.sin(m.d);ctx.beginPath();ctx.arc(m.x+m.t,m.y,m.r,0,2*Math.PI);ctx.fillStyle=m.c;ctx.fill();if(m.y>H)p[i].y=-10});requestAnimationFrame(draw)};draw();setTimeout(()=>{canvas.width=canvas.height=0},2500);
};

/* ---------- STATE ---------- */
let S = {stage:"landing",players:[],current:0,resp:[],order:[]};

/* ---------- RENDERERS ---------- */
function landing(){
  setFooter(true);
  S.stage="landing";
  app.innerHTML=`
    <h1 class="title">Step into a neon wonderland of questions, laughter and discovery! ✨</h1>
    <div class="desc">
      Discover your hidden strengths—from <b>intelligence</b> to <b>humor</b> to <b>bold spirit</b>.<br>
      Challenge yourself or <b>pass & play with friends</b>: every choice shapes your unique personality.<br><br>
      <ul>
        <li>🤩 12 dazzling, ever-changing questions</li>
        <li>🌈 Animated, colorful, and smooth experience</li>
        <li>💡 8 personality traits revealed: Smart, Creative, Social, Empathetic, Risky, Leader, Witty, Inquisitive!</li>
      </ul><br>
      <b>Ready to find your vibe?</b>
    </div>
    <button class="btn start-btn" onclick="playerSelect()">Start Your Journey!</button>
  `;
}

function playerSelect(){
  setFooter(true);
  S.stage="players";
  app.innerHTML=`
    <h2 class="title" style="font-size:2rem">How many players?</h2>
    <div>${[1,2,3,4].map(n=>`<div class="card" onclick="nameForm(${n})">${n}</div>`).join('')}</div>
  `;
}

function nameForm(n){
  S.players=Array(n).fill("");
  S.resp = Array(n).fill(null).map(()=>[]);
  S.current=0;
  app.innerHTML=`
    <h2 class="title" style="font-size:1.85rem">Enter player names</h2>
    <form onsubmit="startQuiz(event)">
      ${S.players.map((_,i)=>`<input class="input" id="p${i}" placeholder="Player ${i+1}" required>`).join('')}
      <button class="btn start-btn" style="margin-top:20px">Start Quiz</button>
    </form>
  `;
}
window.nameForm=nameForm; /* needed for inline onclick */

function startQuiz(e){
  e.preventDefault();
  S.players=S.players.map((_,i)=>document.getElementById(`p${i}`).value.trim()||`P${i+1}`);
  S.order=[...Array(Q.length).keys()]; shuf(S.order);
  question(0,0);
}

function question(p,q){
  setFooter(false);
  const total=12, qIdx=S.order[q], data=Q[qIdx];
  const chosen=S.resp[p][q];
  app.innerHTML=`
    <div class="quiz">
      <div>Player <b>${S.players[p]}</b> – Question ${q+1}/${total}</div>
      <div class="qtxt">${data.q}</div>
      ${data.o.map((o,i)=>`<button class="obtn${chosen===i?' sel':''}" onclick="pick(${p},${q},${i},this)">${o.t}</button>`).join('')}
      <button id="next" class="btn next-btn" disabled>Next</button>
    </div>
  `;
}
function pick(p,q,i,btn){
  btn.parentNode.querySelectorAll('.obtn').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  S.resp[p][q]=i;
  const nxt=document.getElementById('next');
  nxt.disabled=false;
  nxt.onclick=()=>advance(p,q);
}
function advance(p,q){
  const total=12;
  if(q+1<total){question(p,q+1)}
  else if(p+1<S.players.length){question(p+1,0)}
  else results();
}

function results() {
  setFooter(true); confetti();
  const reports = S.players.map((nm, idx) => {
    const sco = TRAITS.reduce((m, t) => (m[t.k] = 0, m), {});
    S.resp[idx].forEach((ans, i) => {
      const o = Q[S.order[i]].o[ans];
      for (const [k, v] of Object.entries(o.a)) sco[k] += v;
    });
    const max = Math.max(...Object.values(sco));
    const tops = TRAITS.filter(t => sco[t.k] === max);
    return { nm, sco, tops };
  });

  app.innerHTML = `
    <div class="result" id="result-share">
      <h2 class="rtitle">Your Persify Profile</h2>
      ${reports.map(r => `
        <h3 style="margin:12px 0">${r.nm} – ${r.tops.map(t => t.e).join(' ')}</h3>
        <p><b>Top trait(s):</b> ${r.tops.map(t => t.l).join(', ')}</p>
        <p>${TRAITS.map(t => `${t.e} ${t.l}: <b>${r.sco[t.k]}</b>`).join(' ‧ ')}</p>
        <div style="margin:10px 0 22px;font-style:italic">${rnd(TIPS)}</div>
        <hr/>
      `).join('')}
      <div style="text-align:center; font-size:.93em; margin:18px 0;">
        Try it yourself: <b>https://funnyfounder.github.io/persify</b>
      </div>
      <button class="btn start-btn" onclick="landing()">Play Again</button>
      <button class="btn share-btn" onclick="sharePNG()">Share as Image</button>
    </div>
  `;
}


function sharePNG() {
  const el = document.getElementById('result-share');
  html2canvas(el).then(canvas => {
    canvas.toBlob(blob => {
      const shareText = "Try it yourself: https://funnyfounder.github.io/persify";
      const file = new File([blob], 'Persify-Result.png', { type: blob.type });
      // Most modern Android and WhatsApp/Telegram will use this text as caption
      if (
        navigator.canShare &&
        navigator.canShare({ files: [file], text: shareText })
      ) {
        navigator.share({
          files: [file],
          text: shareText,
          title: "My Persify Personality Quiz Result"
        });
      } else {
        // For platforms that don't support text+file, fallback: image download and prompt copy link
        const link = document.createElement('a');
        link.download = "Persify-Result.png";
        link.href = canvas.toDataURL();
        link.click();
        setTimeout(() => {
          // Prompt user to manually copy the link, if they want
          prompt("Your result image was saved!\nTo share and invite friends, copy and paste this link with your result image:", "https://funnyfounder.github.io/persify");
        }, 200);
      }
    });
  });
}
window.sharePNG = sharePNG;


/* ---------- START ---------- */
window.playerSelect = playerSelect;
window.pick         = pick;
landing();
