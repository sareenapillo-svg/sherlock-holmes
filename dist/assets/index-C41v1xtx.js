(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))h(u);new MutationObserver(u=>{for(const C of u)if(C.type==="childList")for(const L of C.addedNodes)L.tagName==="LINK"&&L.rel==="modulepreload"&&h(L)}).observe(document,{childList:!0,subtree:!0});function r(u){const C={};return u.integrity&&(C.integrity=u.integrity),u.referrerPolicy&&(C.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?C.credentials="include":u.crossOrigin==="anonymous"?C.credentials="omit":C.credentials="same-origin",C}function h(u){if(u.ep)return;u.ep=!0;const C=r(u);fetch(u.href,C)}})();window.CASE_DATA={title:"AZURE ALIBI",caseCode:"CASE FILE 01 · THE MISSING SAPPHIRE",tagline:"A valuable sapphire was stolen at a party. Five suspects. Each with an alibi and one clue.",briefing:{title:"THE MISSING SAPPHIRE AT STERLING MANOR",date:"OCTOBER 14, 1890 · MAYFAIR, LONDON",summary:"During an opulent evening gala at Sterling Manor, the legendary Azure Sapphire vanished from its velvet cabinet in the private vault gallery between 9:30 PM and 10:00 PM. Five prominent guests were present in the gallery wing, each presenting an alibi for the crucial window.",objectives:["Examine the 5 line-art clues discovered at the crime scene.","Inspect the 5 suspect profiles and analyze their alibis.","Connect each clue to its corresponding suspect on the Case Board.","Track case progress from OPEN to IN PROGRESS and SOLVED."]},suspects:[{id:"suspect1",name:"Prof. James Moriarty",role:"Mathematics Chair",prop:"High forehead & long coat",alibi:"Claims he was discussing topology in the conservatory with Lord Sterling from 9:30 to 10:00 PM.",associatedClueId:"clue1"},{id:"suspect2",name:"Irene Adler",role:"Opera Prima Donna",prop:"Silk lace shawl",alibi:"Claims she was performing an aria in the grand parlor until 9:45 PM.",associatedClueId:"clue2"},{id:"suspect3",name:"Col. Sebastian Moran",role:"Retired Officer",prop:"Military collar",alibi:"Claims he was smoking on the terrace overlooking the west garden at 9:40 PM.",associatedClueId:"clue3"},{id:"suspect4",name:"Charles Milverton",role:"High-Society Publisher",prop:"Gold monocle & seal ring",alibi:"Claims he was reviewing private ledger documents alone in the library.",associatedClueId:"clue4"},{id:"suspect5",name:"Dr. Grimesby Roylott",role:"Physician & Traveller",prop:"Top hat & medical bag",alibi:"Claims he was attending to a fainting guest in the drawing room at 9:40 PM.",associatedClueId:"clue5"}],clues:[{id:"clue1",title:"Champagne Flute",subtitle:"CLUE 01 / EVIDENCE",description:"A fine crystal champagne glass found near the vault threshold bearing a faint lipstick smudge.",suspectId:"suspect1",meaning:"Left near the vault door by Moriarty to frame Irene Adler; contained trace sedatives."},{id:"clue2",title:"Torn Silk Glove",subtitle:"CLUE 02 / EVIDENCE",description:"A torn silk evening glove fragment caught in the brass latch mechanism of the parlor wing.",suspectId:"suspect2",meaning:"Torn while Irene escaped an overbearing guest in the parlor hallway, completely unrelated to the vault."},{id:"clue3",title:"Small Brass Key",subtitle:"CLUE 03 / EVIDENCE",description:"A miniature ornate brass key dropped near the terrace doors, matching a private gun case.",suspectId:"suspect3",meaning:"Belongs to Col. Moran's hunting case; dropped while he stepped out to smoke on the garden terrace."},{id:"clue4",title:"Torn Guest List",subtitle:"CLUE 04 / EVIDENCE",description:"A torn paper scrap from the guest register with crossed-out names and cryptic handwritten Vault notes.",suspectId:"suspect4",meaning:"Milverton's blackmail notes on guests, written while reviewing ledgers in the private library."},{id:"clue5",title:"Stopped Watch",subtitle:"CLUE 05 / EVIDENCE",description:"A heavy silver pocket watch with its hands stopped precisely at 9:40 PM, found under the lounge sofa.",suspectId:"suspect5",meaning:"Fell from Dr. Roylott's waistcoat while attending to a fainting guest in the drawing room."}],timeline:[{time:"8:30 PM",title:"Gala Reception Begins",location:"Grand Parlor",desc:"Guests arrive at Sterling Manor for the autumn evening gala. Five primary guests enter the gallery wing."},{time:"9:08 PM",title:"Duplicate Vault Key Signed",location:"Security Desk",desc:"The duplicate vault key register is signed under a pseudonym using unique mathematical shorthand. (Key Evidence)"},{time:"9:30 PM",title:"Vault Cabinet Verified Locked",location:"Vault Gallery",desc:"Gallery guard confirms the Azure Sapphire is locked safely inside the velvet display cabinet."},{time:"9:40 PM",title:"Pocket Watch Stopped & Theft Window",location:"Vault Wing Lounge",desc:"Silver watch stops at 9:40 PM during 10-minute guard shift change. Theft occurs in this window."},{time:"9:45 PM",title:"Guest Alibi Activities",location:"Manor Wing",desc:"Irene Adler sings aria; Moran smokes on terrace; Milverton reads ledgers; Roylott aids fainting guest."},{time:"10:00 PM",title:"Vault Alarm Raised",location:"Vault Gallery",desc:"Guard discovers velvet cabinet unlocked and empty. Azure Sapphire declared stolen."}],culpritReveal:{culpritId:"suspect1",title:"PROFESSOR JAMES MORIARTY IS THE CULPRIT",summary:"Moriarty claimed he never left Lord Sterling's sight in the conservatory between 9:30 PM and 10:00 PM. However, police logs reveal the duplicate vault key register was signed at 9:08 PM with his mathematical shorthand. He unlocked the display cabinet earlier, returned during the 9:40 PM shift change, and extracted the Azure Sapphire while Lord Sterling stepped out briefly.",redHerrings:[{suspect:"Irene Adler",detail:"Her torn blue silk glove scrap was snagged on a parlor door latch escaping an annoying admirer, not the jewel cabinet."},{suspect:"Col. Sebastian Moran",detail:"His small brass key and muddy boot prints belonged to his private gun-case on the damp west garden terrace."},{suspect:"Charles Milverton",detail:"His torn guest list and sealing wax were left while sealing blackmail documents in the private library."},{suspect:"Dr. Grimesby Roylott",detail:"His stopped pocket watch and botanical soil fell while rendering emergency medical aid to a fainting guest."}]}};class Ue{constructor(){this.STORAGE_KEY="azure_alibi_case_state_v1",this.listeners=[],this.state=this.loadInitialState()}loadInitialState(){const n={currentScreen:"hero",inspectedClues:[],connections:[],clueVerdicts:{},selectedClueId:null,selectedSuspectId:null,accusedSuspectId:null,isSolved:!1,deductionOutcome:null,archiveUnlocked:!1,cipherGuesses:Array(10).fill(""),cipherHintsCount:0};try{const r=localStorage.getItem(this.STORAGE_KEY);if(r){const h=JSON.parse(r);return{...n,...h,inspectedClues:Array.isArray(h.inspectedClues)?h.inspectedClues:[],connections:Array.isArray(h.connections)?h.connections:[],clueVerdicts:h.clueVerdicts&&typeof h.clueVerdicts=="object"?h.clueVerdicts:{},cipherGuesses:Array.isArray(h.cipherGuesses)&&h.cipherGuesses.length===10?h.cipherGuesses:Array(10).fill("")}}}catch(r){console.warn("Could not read localStorage state:",r)}return n}saveState(){try{localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this.state))}catch(n){console.warn("Could not save to localStorage:",n)}this.notify()}setClueVerdict(n,r){this.state.clueVerdicts[n]=r,this.saveState()}getClueVerdict(n){return this.state.clueVerdicts[n]||"NOT_ASSESSED"}subscribe(n){return this.listeners.push(n),()=>{this.listeners=this.listeners.filter(r=>r!==n)}}notify(){this.listeners.forEach(n=>n(this.state))}getState(){return this.state}setScreen(n){this.state.currentScreen=n,this.saveState()}unlockArchive(){this.state.archiveUnlocked=!0,this.saveState()}setCipherGuess(n,r){const h=["F","I","N","D","T","H","E","K","E","Y"],u=h[n];h.forEach((L,$)=>{L===u&&(this.state.cipherGuesses[$]=r)}),this.state.cipherGuesses.join("")==="FINDTHEKEY"&&(this.state.archiveUnlocked=!0),this.saveState()}revealCipherHint(){const n=["F","I","N","D","T","H","E","K","E","Y"];for(let r=0;r<n.length;r++)if(this.state.cipherGuesses[r]!==n[r]){const h=n[r];n.forEach((u,C)=>{u===h&&(this.state.cipherGuesses[C]=h)}),this.state.cipherHintsCount++;break}this.state.cipherGuesses.join("")==="FINDTHEKEY"&&(this.state.archiveUnlocked=!0),this.saveState()}showCipherKey(){this.state.cipherGuesses=["F","I","N","D","T","H","E","K","E","Y"],this.state.archiveUnlocked=!0,this.saveState()}inspectClue(n){this.state.inspectedClues.includes(n)||(this.state.inspectedClues.push(n),this.saveState())}selectClueOnBoard(n){this.state.selectedClueId=this.state.selectedClueId===n?null:n,this.saveState()}selectSuspectOnBoard(n){this.state.selectedSuspectId=this.state.selectedSuspectId===n?null:n,this.saveState()}selectAccusedSuspect(n){this.state.accusedSuspectId=n,this.saveState()}setConnection(n,r){this.state.connections=this.state.connections.filter(h=>h.clueId!==n&&h.suspectId!==r),r&&(this.state.connections.push({clueId:n,suspectId:r}),this.inspectClue(n)),this.state.selectedClueId=null,this.state.selectedSuspectId=null,this.saveState()}removeConnection(n){this.state.connections=this.state.connections.filter(r=>r.clueId!==n),this.saveState()}getConnectionForClue(n){return this.state.connections.find(r=>r.clueId===n)}getConnectionForSuspect(n){return this.state.connections.find(r=>r.suspectId===n)}getConnectionsForSuspectCount(n){return this.state.connections.filter(r=>r.suspectId===n).length}getCaseStatus(){return this.state.isSolved?"SOLVED":this.state.connections.length===0?"OPEN":"IN PROGRESS"}submitDeduction(n){const r=n==="suspect1";return r?(this.state.isSolved=!0,this.state.deductionOutcome="CORRECT"):this.state.deductionOutcome="INCORRECT",this.saveState(),r}clearDeductionOutcome(){this.state.deductionOutcome=null,this.saveState()}resetProgress(){this.state.inspectedClues=[],this.state.connections=[],this.state.clueVerdicts={},this.state.selectedClueId=null,this.state.selectedSuspectId=null,this.state.accusedSuspectId=null,this.state.isSolved=!1,this.state.deductionOutcome=null,this.saveState()}}window.caseStore=new Ue;document.addEventListener("DOMContentLoaded",()=>{const S=window.matchMedia("(prefers-reduced-motion: reduce)").matches;typeof gsap<"u"&&typeof ScrollTrigger<"u"&&gsap.registerPlugin(ScrollTrigger);const n=document.getElementById("progress-label"),r=document.querySelectorAll(".progress-dot"),h=document.querySelectorAll(".nav-link");document.getElementById("open-case-btn");const u=document.getElementById("loader"),C=document.getElementById("loader-card"),L=document.getElementById("loader-counter");let $=!1,F=null;function V(){$&&!u||($=!0,u&&(u.style.display="none",u.setAttribute("aria-hidden","true")),window.removeEventListener("keydown",Z),S?P():Ee())}function Z(){U()}function U(){$||($=!0,F&&F.kill(),L&&(L.textContent="100%"),S?V():(gsap.to(C,{y:-100,opacity:0,duration:.35,ease:"power3.in"}),gsap.to(u,{opacity:0,duration:.3,delay:.08,ease:"power2.out",onComplete:V})))}if(u&&C&&L)if(document.body.style.overflow="hidden",u.addEventListener("click",U),window.addEventListener("keydown",Z),S)L.textContent="100%",setTimeout(V,200);else{const e={val:0};F=gsap.timeline(),F.to(e,{val:100,duration:3,ease:"power1.inOut",onUpdate:()=>{L.textContent=`${Math.floor(e.val)}%`},onComplete:()=>{L.textContent="100%"}}),F.to(C,{y:-120,opacity:0,duration:.75,ease:"power3.in"},"+=0.05"),F.to(u,{opacity:0,duration:.55,ease:"power2.out",onComplete:V},"-=0.35")}class ee{constructor(){this.isMuted=!0,this.soundRegistry=new Map,this.activeInstances=new Map}init(){}registerSound(i,a,d={}){this.soundRegistry.set(i,{src:a,options:d})}play(i){this.isMuted}stop(i){}setMuted(i){this.isMuted=!!i}toggleMute(){return this.isMuted=!this.isMuted,this.isMuted}}const te=new ee,D=document.getElementById("sound-toggle-btn"),ne=document.getElementById("sound-status-text");D&&ne&&D.addEventListener("click",()=>{const e=te.toggleMute();D.classList.toggle("sound-active",!e),D.setAttribute("aria-pressed",e?"false":"true"),ne.textContent=e?"MUTED":"ACTIVE"});let N=null,q=!1;function he(){const e=gsap.timeline(),i=document.getElementById("scene1"),a=document.getElementById("crt-beam-slit"),d=document.getElementById("crt-flash-glow"),y=document.getElementById("intro-atmosphere"),v=document.getElementById("scene1-text"),E=document.getElementById("scene1-location");i&&e.set(i,{opacity:1,filter:"brightness(1) contrast(1)"},0),E&&e.set(E,{opacity:1},0),a&&(e.fromTo(a,{scaleX:0,scaleY:1,opacity:0},{scaleX:1,opacity:1,duration:.12,ease:"power4.inOut"},0),e.to(a,{scaleY:600,opacity:.9,duration:.15,ease:"power2.in"},.12),e.to(a,{opacity:0,duration:.08},.27)),d&&e.fromTo(d,{opacity:.95},{opacity:0,duration:.32,ease:"power2.out"},.22),i&&e.fromTo(i,{filter:"brightness(2.4) contrast(1.3)"},{filter:"brightness(1) contrast(1)",duration:.35,ease:"power2.out"},.24),y&&e.fromTo(y,{opacity:0},{opacity:.85,duration:1.4,ease:"power1.out"},.3);const I="LONDON, 1890",b={charCount:0};return v&&e.to(b,{charCount:I.length,duration:.95,ease:"none",onUpdate:()=>{v.textContent=I.substring(0,Math.floor(b.charCount))}},.6),e.set({},{},2),e}function ge(){const e=gsap.timeline(),i=document.getElementById("scene2"),a=document.getElementById("scene1-location"),d=document.getElementById("scene2-quote-wrapper"),y=document.getElementById("scene2-quote"),v=document.getElementById("scene2-text-glow"),E=document.querySelectorAll("#scene2-hud-brackets .hud-corner-bracket"),I=document.querySelectorAll(".scene2-corner-label"),b=document.getElementById("scene2-gas-lamp");return i?(e.set(i,{opacity:1},0),a&&e.to(a,{opacity:0,duration:.6,ease:"power2.out"},0),d&&e.fromTo(d,{opacity:0,filter:"blur(14px)",scale:.96},{opacity:1,filter:"blur(0px)",scale:1,duration:.55,ease:"power2.out"},0),y&&e.fromTo(y,{letterSpacing:"0.28em"},{letterSpacing:"0.06em",duration:.7,ease:"power2.out"},0),v&&e.fromTo(v,{opacity:0,scale:.8},{opacity:1,scale:1,duration:.8,ease:"power2.out"},.1),E.length>0&&e.fromTo(E,{strokeDashoffset:100,opacity:0},{strokeDashoffset:0,opacity:.95,duration:.55,stagger:.05,ease:"power2.out"},.15),I.length>0&&e.fromTo(I,{opacity:0,y:x=>x<2?-4:4},{opacity:.85,y:0,duration:.45,stagger:.04,ease:"power2.out"},.25),b&&e.fromTo(b,{opacity:0,filter:"blur(6px)"},{opacity:.75,filter:"blur(1px)",duration:.8,ease:"power2.out"},.55),e.to({},{duration:2},"+=0"),d&&e.to(d,{filter:"blur(16px)",opacity:0,scale:1.04,duration:.45,ease:"power2.in"},2.55),b&&e.to(b,{opacity:0,filter:"blur(8px)",duration:.4,ease:"power2.in"},2.6),e.to(i,{opacity:0,duration:.35,ease:"power2.inOut"},2.65),e):e.to({},{duration:3})}function Q(){const e=gsap.timeline(),i=document.getElementById("scene3"),a=document.getElementById("intro-atmosphere"),d=document.getElementById("baker-street-sign"),y=document.getElementById("lamp-1"),v=document.getElementById("lamp-2"),E=document.getElementById("lamp-3"),I=document.getElementById("lamp-4"),b=document.getElementById("lamp-5"),x=document.getElementById("lamp-6");if(!i)return e.to({},{duration:2});e.set(i,{opacity:1},0),a&&e.to(a,{opacity:.42,duration:.8,ease:"power2.out"},0);const B=(O,_)=>{if(!O)return;const oe=O.querySelector(".baker-lamp-flame"),ce=O.querySelector(".baker-lamp-aura"),ae=O.querySelector(".baker-lamp-reflection");oe&&e.fromTo(oe,{scale:0,opacity:0},{scale:1,opacity:1,duration:.22,ease:"power2.out"},_),ce&&e.fromTo(ce,{scale:.2,opacity:0},{scale:1,opacity:.9,duration:.32,ease:"power2.out"},_+.04),ae&&e.fromTo(ae,{scaleX:0,opacity:0},{scaleX:1,opacity:.65,duration:.38,ease:"power2.out"},_+.08),e.call(()=>{O.classList.add("lamp-flickering")},null,_+.1)};return B(y,.15),B(v,.32),B(E,.52),B(I,.72),B(b,.94),B(x,1.15),d&&e.fromTo(d,{opacity:0,x:-16},{opacity:1,x:0,duration:.65,ease:"power2.out"},.75),e.set({},{},2),e}function fe(){const e=gsap.timeline(),i=document.getElementById("scene3"),a=document.getElementById("scene4"),d=document.getElementById("intro-atmosphere"),y=document.getElementById("baker-depth-1"),v=document.getElementById("baker-depth-2"),E=document.getElementById("baker-depth-3"),I=document.getElementById("baker-depth-4"),b=document.getElementById("hansom-cab"),x=document.getElementById("sherlock-figure");return a?(e.set(a,{opacity:1},0),y&&e.to(y,{scale:1.05,y:"1.5%",duration:2,ease:"none"},0),v&&e.to(v,{scale:1.15,y:"3.5%",duration:2,ease:"none"},0),E&&e.to(E,{scale:1.28,y:"5.5%",duration:2,ease:"none"},0),I&&e.to(I,{scale:1.45,y:"8%",duration:2,ease:"none"},0),b&&e.fromTo(b,{x:"105vw"},{x:"-35vw",duration:2,ease:"none"},0),x&&e.fromTo(x,{x:"-25vw"},{x:"105vw",duration:2,ease:"power1.inOut"},0),d&&e.to(d,{opacity:.65,duration:.6,ease:"power2.in"},1.4),i&&e.to(i,{opacity:0,duration:.3,ease:"power2.in"},1.7),e.to(a,{opacity:0,duration:.3,ease:"power2.in"},1.7),e):e.to({},{duration:2})}function ye(){const e=gsap.timeline(),i=document.getElementById("scene5"),a=document.getElementById("scene5-facade"),d=document.getElementById("scene5-shine-sweep"),y=document.getElementById("scene5-hud-tag"),v=document.getElementById("scene5-bow-line"),E=document.getElementById("scene5-window-smoke");return i?(e.set(i,{opacity:1},0),a&&e.fromTo(a,{scale:1,y:"0%"},{scale:1.15,y:"-2%",duration:2,ease:"power1.out"},0),d&&e.fromTo(d,{left:"-100%"},{left:"200%",duration:1.2,ease:"power2.inOut"},.2),y&&e.fromTo(y,{opacity:0,y:6},{opacity:1,y:0,duration:.45,ease:"power2.out"},.35),v&&e.fromTo(v,{x:-12,y:-4},{x:12,y:4,duration:.9,ease:"sine.inOut",repeat:1,yoyo:!0},.1),E&&e.fromTo(E,{strokeDashoffset:40,opacity:0},{strokeDashoffset:0,opacity:.7,duration:1.8,ease:"power1.out"},.1),a&&e.to(a,{scale:4.8,transformOrigin:"50% 30%",opacity:.2,duration:.4,ease:"power2.in"},1.6),e.to(i,{opacity:0,duration:.3,ease:"power2.in"},1.7),e):e.to({},{duration:2})}function G(){const e=gsap.timeline(),i=document.getElementById("scene6"),a=document.getElementById("scene6-scanline"),d=[{el:document.getElementById("clue1-item"),label:document.getElementById("clue-label-1")},{el:document.getElementById("clue2-item"),label:document.getElementById("clue-label-2")},{el:document.getElementById("clue3-item"),label:document.getElementById("clue-label-3")},{el:document.getElementById("clue4-item"),label:document.getElementById("clue-label-4")},{el:document.getElementById("clue5-item"),label:document.getElementById("clue-label-5")}],y=document.getElementById("jewel-case-item"),v=document.getElementById("sapphire-outline");if(!i)return e.to({},{duration:2.5});e.set(i,{opacity:1},0),a&&e.fromTo(a,{top:"0%",opacity:.9},{top:"100%",duration:1.6,ease:"power1.inOut"},.1),d.forEach(({el:I,label:b},x)=>{const B=.15+x*.25;I&&e.fromTo(I,{opacity:0,scale:.7},{opacity:1,scale:1,duration:.3,ease:"back.out(1.2)"},B),b&&e.call(()=>{b.classList.add("label-active")},null,B+.1)});const E=1.45;return y&&e.fromTo(y,{opacity:0,scale:.8},{opacity:1,scale:1,duration:.4,ease:"back.out(1.2)"},E),v&&(e.to(v,{opacity:.2,duration:.1,yoyo:!0,repeat:3},E+.2),e.to(v,{opacity:0,duration:.4,ease:"power2.out"},E+.6)),e.set({},{},2.4),e.to(i,{opacity:0,duration:.3,ease:"power2.inOut"},2.4),e}function we(){const e=gsap.timeline(),i=document.getElementById("scene7"),a=document.querySelectorAll(".detective-string"),d=document.getElementById("scene7-title"),y=document.getElementById("scene7-status-chip"),v=document.getElementById("scene7-typewriter-line1"),E=document.getElementById("scene7-typewriter-line2"),I=document.getElementById("scene7-flash");if(!i)return e.to({},{duration:3.5});e.set(i,{opacity:1},0),a.length>0&&e.fromTo(a,{strokeDashoffset:1e3},{strokeDashoffset:0,duration:1,stagger:.08,ease:"power2.out"},0),d&&e.fromTo(d,{opacity:0,scale:.88,filter:"blur(10px)"},{opacity:1,scale:1,filter:"blur(0px)",duration:.6,ease:"power2.out"},.4),y&&e.fromTo(y,{opacity:0,y:6},{opacity:1,y:0,duration:.4,ease:"power2.out"},.75);const b="A sapphire is missing. Five suspects. One truth.",x={count:0};v&&e.to(x,{count:b.length,duration:.95,ease:"none",onUpdate:()=>{v.textContent=b.substring(0,Math.floor(x.count))}},1);const B="You see, but you do not observe.",O={count:0};return E&&e.to(O,{count:B.length,duration:.75,ease:"none",onUpdate:()=>{E.textContent=B.substring(0,Math.floor(O.count))}},2.05),e.set({},{},3.8),I&&e.fromTo(I,{opacity:0},{opacity:1,duration:.15,ease:"power3.in",onComplete:()=>{P(),gsap.to(I,{opacity:0,duration:.15})}},3.8),e}function ve(){return N=gsap.timeline({paused:!0,onComplete:P}),N.add(he()).add(ge()).add(Q()).add(fe()).add(ye()).add(G()).add(we()),window.masterTimeline=N,N}ve();function Ee(){if(S){P();return}document.body.style.overflow="hidden",N&&N.play(0)}function P(){if(q)return;q=!0,N&&N.kill();const e=document.getElementById("intro"),i=document.getElementById("main");document.body.style.overflow="",e&&e.remove(),i&&(i.style.display="block",i.style.opacity="1"),j("hero"),typeof ScrollTrigger<"u"&&ScrollTrigger.refresh()}const se=document.getElementById("skip-intro-btn");se&&se.addEventListener("click",e=>{e.preventDefault(),P()}),window.addEventListener("keydown",e=>{e.key==="Escape"&&!q&&$&&P()});const ie=[{id:"hero",name:"CASE BOARD"},{id:"suspects",name:"SUSPECTS"},{id:"deduction",name:"DEDUCTION"}];function j(e){const i=ie.find(a=>a.id===e);i&&(n&&n.textContent!==i.name&&(S?n.textContent=i.name:gsap.to(n,{opacity:0,y:-4,duration:.15,onComplete:()=>{n.textContent=i.name,gsap.to(n,{opacity:1,y:0,duration:.15})}})),r.forEach(a=>{const d=a.dataset.target===e;a.classList.toggle("active",d),a.setAttribute("aria-selected",d?"true":"false")}),h.forEach(a=>{const d=a.dataset.target===e;a.classList.toggle("active",d)}))}function H(e){const i=document.getElementById(e);if(i)if(S)i.scrollIntoView({behavior:"auto"});else if(typeof gsap<"u"&&gsap.to){const d=i.getBoundingClientRect().top+window.pageYOffset-60;window.scrollTo({top:d,behavior:"smooth"})}else i.scrollIntoView({behavior:"smooth"})}typeof ScrollTrigger<"u"&&ie.forEach(({id:e})=>{const i=document.getElementById(e);i&&ScrollTrigger.create({trigger:i,start:"top 55%",end:"bottom 55%",onEnter:()=>j(e),onEnterBack:()=>j(e)})}),r.forEach(e=>{e.addEventListener("click",i=>{i.preventDefault();const a=e.dataset.target;a&&H(a)})}),h.forEach(e=>{e.addEventListener("click",i=>{i.preventDefault();const a=e.dataset.target;a&&H(a)})});const R=document.getElementById("enter-case-btn");R&&R.addEventListener("click",()=>{H("briefing"),window.caseStore&&window.caseStore.setScreen("briefing")});const W=document.getElementById("proceed-board-btn");W&&W.addEventListener("click",()=>{H("board"),window.caseStore&&window.caseStore.setScreen("board")}),window.caseStore&&window.CASE_DATA&&Ke()});function Ie(S){switch(S){case"suspect1":return`<svg class="suspect-portrait-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="portraitBg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#16181C"/>
            <stop offset="100%" stop-color="#0B0B0C"/>
          </linearGradient>
          <radialGradient id="cyanGlow1" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="rgba(79,209,217,0.15)"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>
        <rect width="200" height="240" rx="8" fill="url(#portraitBg1)" stroke="#2A2D31" stroke-width="2"/>
        <circle cx="100" cy="90" r="60" fill="url(#cyanGlow1)"/>
        <g fill="#16181C" stroke="#9A9EA3" stroke-width="1.5">
          <!-- High forehead head silhouette -->
          <path d="M 65 95 C 60 45, 75 22, 100 22 C 125 22, 140 45, 135 95 C 130 115, 118 125, 100 125 C 82 125, 70 115, 65 95 Z"/>
          <!-- High forehead line -->
          <path d="M 78 45 Q 100 38 122 45" fill="none" stroke="#4FD1D9" stroke-width="1.5" stroke-dasharray="3 2"/>
          <!-- Neck & High Coat Collar -->
          <path d="M 85 120 L 85 140 L 40 165 L 20 240 L 180 240 L 160 165 L 115 140 L 115 120 Z"/>
          <path d="M 85 140 L 100 190 L 60 240" fill="none" stroke="#FF6A1F" stroke-width="1.5"/>
          <path d="M 115 140 L 100 190 L 140 240" fill="none" stroke="#FF6A1F" stroke-width="1.5"/>
        </g>
      </svg>`;case"suspect2":return`<svg class="suspect-portrait-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="portraitBg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#16181C"/>
            <stop offset="100%" stop-color="#0B0B0C"/>
          </linearGradient>
          <radialGradient id="cyanGlow2" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="rgba(79,209,217,0.15)"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>
        <rect width="200" height="240" rx="8" fill="url(#portraitBg2)" stroke="#2A2D31" stroke-width="2"/>
        <circle cx="100" cy="90" r="60" fill="url(#cyanGlow2)"/>
        <g fill="#16181C" stroke="#9A9EA3" stroke-width="1.5">
          <circle cx="68" cy="65" r="18" fill="#16181C" stroke="#4FD1D9" stroke-width="1.5"/>
          <path d="M 75 55 C 90 45, 125 55, 125 90 C 125 115, 105 125, 90 125 C 80 125, 75 110, 75 90 Z"/>
          <path d="M 90 122 L 90 145 L 45 170 C 45 170, 20 200, 15 240 L 185 240 C 180 200, 155 170, 155 170 L 110 145 L 110 122 Z"/>
          <!-- Silk Lace Shawl -->
          <path d="M 30 185 Q 100 215 170 185 L 180 240 L 20 240 Z" fill="none" stroke="#FF6A1F" stroke-width="1.5" stroke-dasharray="4 3"/>
          <path d="M 45 170 Q 100 195 155 170" fill="none" stroke="#4FD1D9" stroke-width="1.5"/>
        </g>
      </svg>`;case"suspect3":return`<svg class="suspect-portrait-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="portraitBg3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#16181C"/>
            <stop offset="100%" stop-color="#0B0B0C"/>
          </linearGradient>
        </defs>
        <rect width="200" height="240" rx="8" fill="url(#portraitBg3)" stroke="#2A2D31" stroke-width="2"/>
        <g fill="#16181C" stroke="#9A9EA3" stroke-width="1.5">
          <path d="M 70 90 C 68 50, 85 30, 100 30 C 115 30, 132 50, 130 90 C 128 112, 116 122, 100 122 C 84 122, 72 112, 70 90 Z"/>
          <path d="M 80 98 Q 100 92 120 98 Q 128 108 115 110 Q 100 102 85 110 Z" fill="none" stroke="#4FD1D9" stroke-width="1.5"/>
          <!-- Military collar -->
          <path d="M 75 120 L 75 150 L 30 165 L 10 240 L 190 240 L 170 165 L 125 150 L 125 120 Z"/>
          <rect x="75" y="125" width="50" height="25" fill="none" stroke="#FF6A1F" stroke-width="1.5"/>
          <line x1="75" y1="137" x2="125" y2="137" stroke="#FF6A1F" stroke-width="1.5" stroke-dasharray="4 2"/>
        </g>
      </svg>`;case"suspect4":return`<svg class="suspect-portrait-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="portraitBg4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#16181C"/>
            <stop offset="100%" stop-color="#0B0B0C"/>
          </linearGradient>
        </defs>
        <rect width="200" height="240" rx="8" fill="url(#portraitBg4)" stroke="#2A2D31" stroke-width="2"/>
        <g fill="#16181C" stroke="#9A9EA3" stroke-width="1.5">
          <path d="M 68 90 C 65 52, 82 32, 100 32 C 118 32, 135 52, 132 90 C 128 114, 118 124, 100 124 C 82 124, 72 114, 68 90 Z"/>
          <!-- Monocle -->
          <circle cx="115" cy="75" r="14" fill="none" stroke="#4FD1D9" stroke-width="2"/>
          <path d="M 127 82 Q 140 120 135 150" fill="none" stroke="#4FD1D9" stroke-width="1" stroke-dasharray="2 2"/>
          <path d="M 75 124 L 75 150 L 25 170 L 10 240 L 190 240 L 175 170 L 125 150 L 125 124 Z"/>
          <!-- Seal Ring -->
          <circle cx="155" cy="210" r="7" fill="none" stroke="#FF6A1F" stroke-width="2"/>
        </g>
      </svg>`;case"suspect5":return`<svg class="suspect-portrait-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="portraitBg5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#16181C"/>
            <stop offset="100%" stop-color="#0B0B0C"/>
          </linearGradient>
        </defs>
        <rect width="200" height="240" rx="8" fill="url(#portraitBg5)" stroke="#2A2D31" stroke-width="2"/>
        <g fill="#16181C" stroke="#9A9EA3" stroke-width="1.5">
          <!-- Top Hat -->
          <path d="M 50 65 L 150 65" stroke="#FF6A1F" stroke-width="2"/>
          <rect x="65" y="15" width="70" height="50" rx="3" fill="#16181C" stroke="#9A9EA3" stroke-width="1.5"/>
          <line x1="65" y1="55" x2="135" y2="55" stroke="#4FD1D9" stroke-width="2"/>
          <path d="M 72 70 C 70 85, 75 110, 100 110 C 125 110, 130 85, 128 70 Z"/>
          <path d="M 80 110 L 80 140 L 30 160 L 15 240 L 185 240 L 170 160 L 120 140 L 120 110 Z"/>
          <!-- Medical Bag -->
          <rect x="135" y="195" width="40" height="30" rx="3" fill="none" stroke="#FF6A1F" stroke-width="1.5"/>
          <path d="M 148 195 C 148 188, 162 188, 162 195" fill="none" stroke="#FF6A1F" stroke-width="1.5"/>
        </g>
      </svg>`;default:return""}}function _e(S){switch(S){case"clue1":return`<svg class="clue-card-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FF6A1F" stroke-width="1.5" fill="none">
          <path d="M 60 30 C 60 75, 100 75, 100 30 Z"/>
          <line x1="64" y1="48" x2="96" y2="48" stroke-dasharray="3 2" opacity="0.7"/>
          <line x1="80" y1="75" x2="80" y2="125"/>
          <line x1="55" y1="125" x2="105" y2="125"/>
          <path d="M 62 33 C 64 28, 72 28, 74 33" stroke="#4FD1D9" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </svg>`;case"clue2":return`<svg class="clue-card-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FF6A1F" stroke-width="1.5" fill="none">
          <path d="M 45 45 C 45 35 52 30 58 40 L 62 25 C 66 22 72 25 74 40 L 78 20 C 82 18 88 20 90 40 L 94 28 C 98 28 102 32 102 50 L 105 80 L 100 110 L 92 105 L 84 122 L 76 108 L 68 124 L 60 112 L 52 106 L 45 85 Z"/>
          <path d="M 65 60 L 65 95 M 78 58 L 78 95 M 90 62 L 90 92" stroke-dasharray="3 3" opacity="0.6"/>
          <path d="M 84 122 L 87 130 M 76 108 L 74 116 M 68 124 L 70 132" stroke="#4FD1D9" stroke-width="1"/>
        </g>
      </svg>`;case"clue3":return`<svg class="clue-card-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FF6A1F" stroke-width="1.5" fill="none">
          <circle cx="80" cy="42" r="22"/>
          <circle cx="80" cy="42" r="14"/>
          <circle cx="80" cy="20" r="4"/>
          <line x1="80" y1="64" x2="80" y2="135"/>
          <rect x="74" y="72" width="12" height="5" rx="1"/>
          <path d="M 80 105 L 104 105 L 104 116 L 94 116 L 94 122 L 106 122 L 106 135 L 80 135"/>
        </g>
      </svg>`;case"clue4":return`<svg class="clue-card-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FF6A1F" stroke-width="1.5" fill="none">
          <path d="M 30 25 L 130 25 L 130 100 L 118 95 L 105 115 L 90 102 L 75 118 L 60 106 L 45 120 L 30 110 Z"/>
          <path d="M 42 40 Q 55 35 68 43 T 92 38 T 118 42" stroke-width="1.2"/>
          <path d="M 42 56 Q 58 50 72 58 T 98 52 T 112 56" stroke-width="1.2"/>
          <path d="M 42 72 Q 52 68 64 74 T 88 70 T 115 74" stroke-width="1.2"/>
          <path d="M 42 88 Q 55 84 68 90 T 95 86" stroke-width="1.2"/>
          <line x1="40" y1="56" x2="114" y2="56" stroke="#4FD1D9" stroke-width="1.5"/>
        </g>
      </svg>`;case"clue5":return`<svg class="clue-card-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FF6A1F" stroke-width="1.5" fill="none">
          <circle cx="80" cy="88" r="46"/>
          <circle cx="80" cy="88" r="40" stroke-dasharray="3 3" opacity="0.6"/>
          <rect x="74" y="34" width="12" height="8" rx="1"/>
          <circle cx="80" cy="26" r="10"/>
          <circle cx="80" cy="88" r="2.5" fill="#FF6A1F"/>
          <line x1="80" y1="88" x2="57" y2="74" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="80" y1="88" x2="48" y2="104" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="80" y1="52" x2="80" y2="57"/>
          <line x1="116" y1="88" x2="111" y2="88"/>
          <line x1="80" y1="124" x2="80" y2="119"/>
          <line x1="44" y1="88" x2="49" y2="88"/>
        </g>
      </svg>`;default:return""}}function Ke(){let S=null;const n=document.getElementById("clue-cards-container"),r=document.getElementById("suspect-polaroids-grid")||document.getElementById("suspects"),h=document.getElementById("inspected-clues-count"),u=document.getElementById("connected-strings-count"),C=document.getElementById("nav-status-label"),L=document.getElementById("nav-case-status"),$=document.getElementById("reset-evidence-btn"),F=document.getElementById("board-empty-hint"),V=document.getElementById("deduction-suspects-grid"),Z=document.getElementById("deduction-clues-recap"),U=document.getElementById("submit-deduction-btn"),ee=document.getElementById("accuse-btn-hint"),te=document.getElementById("summary-container"),D=document.getElementById("clue-modal"),ne=document.getElementById("clue-modal-close"),N=document.getElementById("modal-clue-subtitle"),q=document.getElementById("modal-clue-title"),he=document.getElementById("modal-clue-svg-container"),ge=document.getElementById("modal-clue-description"),Q=document.getElementById("suspect-select"),fe=document.getElementById("connect-evidence-btn"),ye=document.getElementById("remove-evidence-btn"),G=document.getElementById("suspect-modal"),we=document.getElementById("suspect-modal-close"),ve=document.getElementById("suspect-modal-ok-btn"),Ee=document.getElementById("modal-suspect-role"),P=document.getElementById("modal-suspect-name"),se=document.getElementById("modal-suspect-portrait"),ie=document.getElementById("modal-suspect-prop"),j=document.getElementById("modal-suspect-alibi"),H=document.getElementById("modal-suspect-connection"),R=document.getElementById("timeline-modal"),W=document.getElementById("timeline-events-container"),e=document.getElementById("timeline-modal-close"),i=document.getElementById("timeline-modal-ok-btn"),a=document.getElementById("board-view-timeline-btn"),d=document.getElementById("deduction-view-timeline-btn"),y=document.getElementById("accusation-modal"),v=document.getElementById("accusation-modal-close"),E=document.getElementById("accusation-modal-text"),I=document.getElementById("confirm-accusation-btn"),b=document.getElementById("cancel-accusation-btn"),x=document.getElementById("incorrect-modal"),B=document.getElementById("incorrect-modal-close"),O=document.getElementById("incorrect-return-board-btn"),_=document.getElementById("incorrect-try-again-btn");function oe(){const t=document.getElementById("board-strings-svg");if(!t)return;t.innerHTML="";const c=window.caseStore.getState(),s=c.connections;if(!s||s.length===0)return;const o=t.getBoundingClientRect();o.width===0||o.height===0||s.forEach(m=>{const p=document.querySelector(`[data-clue-id="${m.clueId}"]`),f=document.querySelector(`[data-suspect-id="${m.suspectId}"]`);if(p&&f){const l=p.getBoundingClientRect(),A=f.getBoundingClientRect(),g=l.left+l.width/2-o.left,k=l.top+l.height/2-o.top,M=A.left+A.width/2-o.left,w=A.top+A.height/2-o.top,T=(g+M)/2,K=(k+w)/2+25,Y=document.createElementNS("http://www.w3.org/2000/svg","path");Y.setAttribute("d",`M ${g} ${k} Q ${T} ${K} ${M} ${w}`);const Pe=c.selectedClueId===m.clueId,Ve=c.selectedSuspectId===m.suspectId,He=Pe||Ve||!c.selectedClueId&&!c.selectedSuspectId;Y.setAttribute("class",`evidence-string-path ${He?"string-active":"string-dimmed"}`),t.appendChild(Y);const pe=document.createElementNS("http://www.w3.org/2000/svg","circle");pe.setAttribute("cx",g),pe.setAttribute("cy",k),pe.setAttribute("r","4"),pe.setAttribute("fill","#FF6A1F"),t.appendChild(pe);const me=document.createElementNS("http://www.w3.org/2000/svg","circle");me.setAttribute("cx",M),me.setAttribute("cy",w),me.setAttribute("r","4"),me.setAttribute("fill","#FF6A1F"),t.appendChild(me)}})}window.addEventListener("resize",oe);function ce(){const t=window.caseStore.getState(),c=window.caseStore.getCaseStatus();if(C&&(C.textContent=`STATUS: ${c}`),L&&(L.classList.remove("status-open","status-in-progress","status-solved"),c==="OPEN"?L.classList.add("status-open"):c==="IN PROGRESS"?L.classList.add("status-in-progress"):c==="SOLVED"&&L.classList.add("status-solved")),h&&(h.textContent=`${t.inspectedClues.length} / 5`),u&&(u.textContent=`${t.connections.length} / 5`),F)if(t.connections.length===0)F.textContent="No evidence connected yet. Select a clue slip below, then a suspect polaroid.";else if(t.selectedClueId){const s=window.CASE_DATA.clues.find(o=>o.id===t.selectedClueId);F.textContent=`Selected "${s?s.title:"Clue"}". Click a suspect polaroid above to connect string.`}else F.textContent=`Evidence strings active (${t.connections.length}/5). Click a clue slip to select or examine.`;if(r&&(r.innerHTML="",window.CASE_DATA.suspects.forEach(s=>{const o=window.caseStore.getConnectionForSuspect(s.id),m=window.caseStore.getConnectionsForSuspectCount(s.id),p=t.selectedSuspectId===s.id,f=!!o,l=document.createElement("div");l.className=`polaroid-card ${f?"connected":""} ${p?"selected":""}`,l.setAttribute("data-suspect-id",s.id),l.setAttribute("tabindex","0"),l.setAttribute("role","button"),l.setAttribute("aria-label",`Suspect ${s.name}, ${s.role}`),l.innerHTML=`
          <div class="polaroid-pin" aria-hidden="true"></div>
          <div class="polaroid-portrait-box">
            ${Ie(s.id)}
          </div>
          <div class="polaroid-info">
            <div class="polaroid-name">${s.name}</div>
            <div class="polaroid-role">${s.role}</div>
            <div class="polaroid-chips">
              <span class="chip-text chip-inspected">INSPECTED</span>
              <span class="chip-text chip-connections">${m} STRING${m!==1?"S":""}</span>
              ${p?'<span class="chip-text chip-selected">SELECTED</span>':""}
            </div>
          </div>
        `,l.addEventListener("click",()=>xe(s.id)),l.addEventListener("keydown",A=>{(A.key==="Enter"||A.key===" ")&&(A.preventDefault(),xe(s.id))}),r.appendChild(l)})),n&&(n.innerHTML="",window.CASE_DATA.clues.forEach((s,o)=>{const m=t.inspectedClues.includes(s.id),p=window.caseStore.getConnectionForClue(s.id),f=t.selectedClueId===s.id,l=p?window.CASE_DATA.suspects.find(k=>k.id===p.suspectId):null,A=p?window.caseStore.getClueVerdict(s.id)||"NOT ASSESSED":null,g=document.createElement("div");g.className=`clue-paper-slip animate-slip-slide ${m?"inspected":""} ${p?"connected":""} ${f?"selected":""}`,g.setAttribute("data-clue-id",s.id),g.setAttribute("tabindex","0"),g.setAttribute("role","button"),g.setAttribute("aria-label",`Evidence Clue ${s.title}`),g.style.animationDelay=`${o*.08}s`,g.innerHTML=`
          <div class="slip-tape" aria-hidden="true"></div>
          <div class="slip-exhibit">EXHIBIT 0${o+1}</div>
          <div class="slip-title">${s.title}</div>
          ${p?`<div class="slip-status-tag">LINKED TO: ${l?l.name:"SUSPECT"} [${A}]</div>`:""}
          <div class="slip-examine-hint">CLICK TO EXAMINE →</div>
        `,g.addEventListener("click",()=>ae(s.id)),g.addEventListener("keydown",k=>{(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),ae(s.id))}),n.appendChild(g)})),V&&(V.innerHTML="",window.CASE_DATA.suspects.forEach(s=>{const o=t.accusedSuspectId===s.id,m=t.connections.filter(w=>w.suspectId===s.id),p=m.length;let f=0,l=0;m.forEach(w=>{const T=window.caseStore.getClueVerdict(w.clueId);T==="CONTRADICTS ALIBI"?f++:(!T||T==="NOT ASSESSED")&&l++});const A=`${p} clue${p!==1?"s":""} linked, ${f} contradict${f!==1?"s":""} alibi, ${l} not assessed`,g=document.createElement("div");g.className=`deduction-suspect-card ${o?"accuse-selected":""}`,g.setAttribute("data-deduction-suspect-id",s.id),g.setAttribute("tabindex","0"),g.setAttribute("role","button"),g.setAttribute("aria-selected",o?"true":"false"),g.setAttribute("aria-label",`Select ${s.name} for accusation`);let k="";p>0?k=m.map(w=>{const T=window.CASE_DATA.clues.find(Y=>Y.id===w.clueId);if(!T)return"";const K=window.caseStore.getClueVerdict(T.id)||"NOT ASSESSED";return`
              <div class="deduction-clue-slip">
                <div class="slip-header">
                  <span class="slip-exhibit">EVIDENCE CLUE</span>
                  <span class="slip-title">${T.title}</span>
                </div>
                <div class="verdict-microcopy">Does this evidence support the alibi, contradict it, or remain inconclusive?</div>
                <div class="verdict-options">
                  <button type="button" class="verdict-btn ${K==="SUPPORTS ALIBI"?"active-supports":""}" data-clue-id="${T.id}" data-verdict="SUPPORTS ALIBI">SUPPORTS ALIBI</button>
                  <button type="button" class="verdict-btn ${K==="CONTRADICTS ALIBI"?"active-contradicts":""}" data-clue-id="${T.id}" data-verdict="CONTRADICTS ALIBI">CONTRADICTS ALIBI</button>
                  <button type="button" class="verdict-btn ${K==="INCONCLUSIVE"?"active-inconclusive":""}" data-clue-id="${T.id}" data-verdict="INCONCLUSIVE">INCONCLUSIVE</button>
                </div>
              </div>
            `}).join(""):k='<div class="deduction-no-clues">No evidence connected</div>',g.innerHTML=`
          ${o?'<div class="selected-badge-label">SELECTED</div>':""}
          <div class="deduction-portrait-wrapper">
            ${Ie(s.id)}
          </div>
          <div class="deduction-suspect-name">${s.name}</div>
          <div class="deduction-suspect-role">${s.role}</div>
          <div class="deduction-alibi-snippet">"${s.alibi}"</div>
          <div class="deduction-linked-clues-box">
            <span class="box-title">LINKED EVIDENCE SLIPS:</span>
            ${k}
          </div>
          <div class="deduction-neutral-summary">${A}</div>
        `,g.addEventListener("click",w=>{w.target.classList.contains("verdict-btn")||window.caseStore.selectAccusedSuspect(s.id)}),g.addEventListener("keydown",w=>{w.target.classList.contains("verdict-btn")||(w.key==="Enter"||w.key===" ")&&(w.preventDefault(),window.caseStore.selectAccusedSuspect(s.id))}),g.querySelectorAll(".verdict-btn").forEach(w=>{w.addEventListener("click",T=>{T.stopPropagation();const K=w.getAttribute("data-clue-id"),Y=w.getAttribute("data-verdict");window.caseStore.setClueVerdict(K,Y)})}),V.appendChild(g)})),Z&&(Z.innerHTML="",window.CASE_DATA.clues.forEach(s=>{const o=window.caseStore.getConnectionForClue(s.id),m=o?window.CASE_DATA.suspects.find(l=>l.id===o.suspectId):null,p=window.caseStore.getClueVerdict(s.id)||"NOT ASSESSED",f=document.createElement("div");f.className=`recap-clue-chip ${o?"linked":""}`,f.textContent=`${s.title}: ${m?m.name:"UNLINKED"}${o?` [${p}]`:""}`,Z.appendChild(f)})),U){const s=!!t.accusedSuspectId;if(U.disabled=!s,ee)if(s){const o=window.CASE_DATA.suspects.find(m=>m.id===t.accusedSuspectId);ee.textContent=`Ready to accuse ${o?o.name:"selected suspect"}. Click button to submit.`}else ee.textContent="Select a prime suspect card above to file your accusation."}te&&t.isSolved&&Be(),setTimeout(oe,50)}function ae(t){window.caseStore.getState().selectedClueId===t||window.caseStore.selectClueOnBoard(t),Ae(t)}function xe(t){const c=window.caseStore.getState();c.selectedClueId?window.caseStore.setConnection(c.selectedClueId,t):Oe(t)}function Le(){W&&(W.innerHTML="",window.CASE_DATA.timeline.forEach(t=>{const c=document.createElement("div");c.className="timeline-event-card",c.innerHTML=`
          <div class="timeline-time-badge">${t.time}</div>
          <div class="timeline-event-content">
            <div class="timeline-event-title">${t.title}</div>
            <div class="timeline-event-location">LOCATION: ${t.location}</div>
            <div class="timeline-event-desc">${t.desc}</div>
          </div>
        `,W.appendChild(c)})),R&&(R.classList.add("active"),R.setAttribute("aria-hidden","false"))}function Se(){R&&(R.classList.remove("active"),R.setAttribute("aria-hidden","true"))}function Ae(t){S=t,window.caseStore.inspectClue(t);const c=window.CASE_DATA.clues.find(o=>o.id===t);if(!c)return;N&&(N.textContent=c.subtitle),q&&(q.textContent=c.title),he&&(he.innerHTML=_e(t)),ge&&(ge.textContent=c.description);const s=window.caseStore.getConnectionForClue(t);Q&&(Q.value=s?s.suspectId:""),D&&(D.classList.add("active"),D.setAttribute("aria-hidden","false"))}function re(){D&&(D.classList.remove("active"),D.setAttribute("aria-hidden","true")),S=null}function Oe(t){const c=window.CASE_DATA.suspects.find(m=>m.id===t);if(!c)return;Ee&&(Ee.textContent=c.role),P&&(P.textContent=c.name),se&&(se.innerHTML=Ie(t)),ie&&(ie.textContent=c.prop),j&&(j.textContent=c.alibi);const o=window.caseStore.getState().connections.filter(m=>m.suspectId===t);if(H)if(o.length>0){const m=o.map(p=>{const f=window.CASE_DATA.clues.find(A=>A.id===p.clueId),l=window.caseStore.getClueVerdict(p.clueId)||"NOT ASSESSED";return`${f?f.title:"CLUE"} [${l}]`});H.textContent=`LINKED EVIDENCE: ${m.join(", ")}`}else H.textContent="NO EVIDENCE CONNECTED";G&&(G.classList.add("active"),G.setAttribute("aria-hidden","false"))}function Ce(){G&&(G.classList.remove("active"),G.setAttribute("aria-hidden","true"))}function $e(){const t=window.caseStore.getState();if(!t.accusedSuspectId)return;const c=window.CASE_DATA.suspects.find(f=>f.id===t.accusedSuspectId);if(!c)return;const s=window.caseStore.getConnectionsForSuspectCount(c.id),o=t.inspectedClues.length;let m=`You are about to submit your final deduction accusing ${c.name}. Are you certain?`,p="";s===0?p=" You have not linked any evidence to this suspect yet. You can still submit, or go back and investigate.":o<3&&(p=` You have examined fewer than 3 clues overall (${o}/5 examined). You can still submit, or go back and investigate.`),E&&(E.textContent=m+p),y&&(y.classList.add("active"),y.setAttribute("aria-hidden","false"))}function le(){y&&(y.classList.remove("active"),y.setAttribute("aria-hidden","true"))}function Re(t){const c=document.getElementById("incorrect-modal-text");c&&(c.textContent=`The evidence collected does not support an accusation against ${t}. The true culprit remains at large. All your connected evidence strings remain preserved.`),x&&(x.classList.add("active"),x.setAttribute("aria-hidden","false"))}function de(){x&&(x.classList.remove("active"),x.setAttribute("aria-hidden","true"))}function Be(){if(!te)return;const t=window.CASE_DATA.culpritReveal,c=window.CASE_DATA.suspects.find(o=>o.id===t.culpritId);te.innerHTML=`
      <div class="solved-stamp-banner">SOLVED</div>
      <div class="summary-title-block">
        <span class="summary-code">CASE ARCHIVE FILE 01 · CASE SOLVED</span>
        <h2 class="summary-main-title">AZURE ALIBI DOSSIER</h2>
      </div>

      <div class="summary-culprit-box">
        <span class="culprit-label">IDENTIFIED CULPRIT:</span>
        <h3 class="culprit-name">${c?c.name:"Prof. James Moriarty"}</h3>
        <p class="culprit-text">${t.summary}</p>
      </div>

      <h3 class="summary-section-title">RED HERRINGS BREAKDOWN & EXPLANATION</h3>
      <div class="red-herrings-list">
        ${t.redHerrings.map(o=>`
          <div class="herring-card">
            <div class="herring-suspect">${o.suspect}</div>
            <div class="herring-detail">${o.detail}</div>
          </div>
        `).join("")}
      </div>

      <h3 class="summary-section-title">EVIDENCE CLUES & MEANINGS</h3>
      <div class="red-herrings-list">
        ${window.CASE_DATA.clues.map(o=>`
          <div class="herring-card">
            <div class="herring-suspect">${o.title}</div>
            <div class="herring-detail">${o.meaning||o.description}</div>
          </div>
        `).join("")}
      </div>

      <div class="summary-actions">
        <button class="btn-sticker" id="summary-review-board-btn" type="button">
          REVIEW CASE BOARD &gt;&gt;
        </button>
      </div>
    `;const s=document.getElementById("summary-review-board-btn");s&&s.addEventListener("click",()=>{const o=document.getElementById("board");o&&o.scrollIntoView({behavior:"smooth"})})}fe&&fe.addEventListener("click",()=>{if(!S)return;const t=Q?Q.value:"";window.caseStore.setConnection(S,t),re()}),ye&&ye.addEventListener("click",()=>{S&&(window.caseStore.removeConnection(S),re())}),$&&$.addEventListener("click",()=>{window.caseStore.resetProgress()}),a&&a.addEventListener("click",Le),d&&d.addEventListener("click",Le),e&&e.addEventListener("click",Se),i&&i.addEventListener("click",Se),U&&U.addEventListener("click",$e),I&&I.addEventListener("click",()=>{le();const t=window.caseStore.getState(),c=window.CASE_DATA.suspects.find(o=>o.id===t.accusedSuspectId);if(window.caseStore.submitDeduction(t.accusedSuspectId)){Be();const o=document.getElementById("summary");o&&o.scrollIntoView({behavior:"smooth"})}else Re(c?c.name:"the suspect")}),b&&b.addEventListener("click",le),v&&v.addEventListener("click",le),O&&O.addEventListener("click",()=>{de();const t=document.getElementById("board");t&&t.scrollIntoView({behavior:"smooth"})}),_&&_.addEventListener("click",()=>{de();const t=document.getElementById("deduction");t&&t.scrollIntoView({behavior:"smooth"})}),B&&B.addEventListener("click",de),ne&&ne.addEventListener("click",re),we&&we.addEventListener("click",Ce),ve&&ve.addEventListener("click",Ce),window.addEventListener("keydown",t=>{t.key==="Escape"&&(re(),Ce(),Se(),le(),de())}),[D,G,R,y,x].forEach(t=>{t&&t.addEventListener("click",c=>{c.target===t&&(re(),Ce(),Se(),le(),de())})});const ke=document.getElementById("hidden-sapphire-btn");ke&&ke.addEventListener("click",Ge);let X=0;const z=document.getElementById("cipher-modal"),Te=document.getElementById("cipher-modal-close"),Me=document.getElementById("cipher-return-btn"),De=document.getElementById("show-decoding-key-btn"),be=document.getElementById("need-hint-btn");function Ge(){J(),z&&(z.classList.add("active"),z.setAttribute("aria-hidden","false"))}function ue(){z&&(z.classList.remove("active"),z.setAttribute("aria-hidden","true"))}function J(){const t=document.getElementById("cipher-symbols-display"),c=document.getElementById("cipher-alphabet-grid"),s=window.caseStore.getState(),o=["F","I","N","D","T","H","E","K","E","Y"];if(t){t.innerHTML="";const m=[{start:0,end:3,label:"FIND"},{start:4,end:6,label:"THE"},{start:7,end:9,label:"KEY"}];m.forEach((p,f)=>{for(let l=p.start;l<=p.end;l++){const A=o[l],g=s.cipherGuesses[l]||"",k=X===l,M=document.createElement("div");M.className=`cipher-symbol-slot ${k?"selected":""}`,M.setAttribute("tabindex","0"),M.setAttribute("role","button"),M.setAttribute("aria-label",`Symbol ${l+1}, current letter ${g||"empty"}`),M.innerHTML=`
            ${Ye(A)}
            <div class="cipher-letter-display">${g||"_"}</div>
          `,M.addEventListener("click",()=>{X=l,J()}),M.addEventListener("keydown",w=>{(w.key==="Enter"||w.key===" ")&&(w.preventDefault(),X=l,J())}),t.appendChild(M)}if(f<m.length-1){const l=document.createElement("div");l.className="cipher-symbol-slot space-slot",l.setAttribute("aria-hidden","true"),t.appendChild(l)}})}c&&(c.innerHTML="","ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(p=>{const f=document.createElement("button");f.className="cipher-key-btn",f.type="button",f.textContent=p,f.setAttribute("aria-label",`Select letter ${p}`),f.addEventListener("click",()=>{window.caseStore.setCipherGuess(X,p),X=(X+1)%10,J(),window.caseStore.getState().archiveUnlocked&&setTimeout(()=>{ue(),scrollToTarget("archive"),window.caseStore&&window.caseStore.setScreen("archive")},400)}),c.appendChild(f)})),be&&(be.textContent=`NEED A HINT? (${s.cipherHintsCount})`)}De&&De.addEventListener("click",()=>{window.caseStore.showCipherKey(),J(),setTimeout(()=>{ue(),scrollToTarget("archive"),window.caseStore&&window.caseStore.setScreen("archive")},400)}),be&&be.addEventListener("click",()=>{window.caseStore.revealCipherHint(),J(),window.caseStore.getState().archiveUnlocked&&setTimeout(()=>{ue(),scrollToTarget("archive"),window.caseStore&&window.caseStore.setScreen("archive")},400)}),Te&&Te.addEventListener("click",ue),Me&&Me.addEventListener("click",ue);const Fe=document.getElementById("archive-review-doc-btn"),Ne=document.getElementById("archive-return-board-btn");Fe&&Fe.addEventListener("click",()=>{const t=document.querySelector(".archive-document-card");t&&t.scrollIntoView({behavior:"smooth"})}),Ne&&Ne.addEventListener("click",()=>{scrollToTarget("board"),window.caseStore&&window.caseStore.setScreen("board")}),window.caseStore.subscribe(ce),ce()}function Ye(S){switch(S){case"F":return`<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <path d="M 8 16 L 20 20 L 32 16"/>
        <line x1="20" y1="28" x2="12" y2="40"/>
        <line x1="20" y1="28" x2="28" y2="40"/>
      </svg>`;case"I":return`<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <path d="M 20 18 L 32 14 L 32 24 Z" fill="#4FD1D9"/>
        <line x1="20" y1="28" x2="14" y2="40"/>
        <line x1="20" y1="28" x2="26" y2="40"/>
      </svg>`;case"N":return`<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <line x1="20" y1="18" x2="8" y2="26"/>
        <line x1="20" y1="18" x2="32" y2="10"/>
        <line x1="20" y1="28" x2="12" y2="40"/>
        <line x1="20" y1="28" x2="28" y2="40"/>
      </svg>`;case"D":return`<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <line x1="6" y1="18" x2="34" y2="18"/>
        <line x1="20" y1="28" x2="20" y2="42"/>
        <line x1="20" y1="28" x2="30" y2="34"/>
      </svg>`;case"T":return`<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <path d="M 10 22 L 20 18 L 30 22"/>
        <line x1="20" y1="28" x2="12" y2="40"/>
        <line x1="20" y1="28" x2="28" y2="40"/>
      </svg>`;case"H":return`<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="34" r="4"/>
        <line x1="20" y1="30" x2="20" y2="14"/>
        <line x1="20" y1="24" x2="8" y2="16"/>
        <line x1="20" y1="24" x2="32" y2="16"/>
        <line x1="20" y1="14" x2="10" y2="4"/>
        <line x1="20" y1="14" x2="30" y2="4"/>
      </svg>`;case"E":return`<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="26"/>
        <path d="M 6 10 L 20 16 L 34 10"/>
        <path d="M 10 40 L 20 26 L 30 40"/>
      </svg>`;case"K":return`<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <line x1="20" y1="18" x2="10" y2="24"/>
        <line x1="20" y1="18" x2="32" y2="22"/>
        <line x1="20" y1="28" x2="12" y2="40"/>
        <line x1="20" y1="28" x2="34" y2="20"/>
      </svg>`;case"Y":return`<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="10" r="4"/>
        <line x1="20" y1="14" x2="20" y2="30"/>
        <line x1="20" y1="18" x2="6" y2="6"/>
        <line x1="20" y1="18" x2="34" y2="6"/>
        <line x1="20" y1="30" x2="20" y2="42"/>
      </svg>`;default:return""}}
