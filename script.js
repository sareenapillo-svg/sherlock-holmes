/**
 * Sherlock Holmes - 221B Case Files
 * Single-Page Architecture & ScrollTrigger Coordination
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Register GSAP plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // DOM Elements
  const progressLabel = document.getElementById('progress-label');
  const progressDots = document.querySelectorAll('.progress-dot');
  const navLinks = document.querySelectorAll('.nav-link');
  const openCaseBtn = document.getElementById('open-case-btn');

  /* ==========================================================================
     #loader Full-Screen Intro Sequence
     Platform 221B counter (0% to 100% over ~3s), card slide-up, fade out,
     and skip interaction by click or any keypress.
     ========================================================================== */
  const loaderScreen = document.getElementById('loader');
  const loaderCard = document.getElementById('loader-card');
  const loaderCounter = document.getElementById('loader-counter');
  let isLoaderDismissed = false;
  let loaderTimeline = null;

  function finishLoader() {
    if (isLoaderDismissed && !loaderScreen) return;
    isLoaderDismissed = true;

    if (loaderScreen) {
      loaderScreen.style.display = 'none';
      loaderScreen.setAttribute('aria-hidden', 'true');
    }

    // Clean up event listeners
    window.removeEventListener('keydown', handleKeySkip);

    // If prefers-reduced-motion is active, skip intro and hand over straight to #main
    if (prefersReducedMotion) {
      handoverToMain();
    } else {
      // Begin the 15-second cinematic intro sequence
      playIntro();
    }
  }

  function handleKeySkip() {
    skipLoader();
  }

  function skipLoader() {
    if (isLoaderDismissed) return;
    isLoaderDismissed = true;

    if (loaderTimeline) {
      loaderTimeline.kill();
    }

    if (loaderCounter) {
      loaderCounter.textContent = '100%';
    }

    if (prefersReducedMotion) {
      finishLoader();
    } else {
      // Rapid exit transition on skip
      gsap.to(loaderCard, {
        y: -100,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in'
      });
      gsap.to(loaderScreen, {
        opacity: 0,
        duration: 0.3,
        delay: 0.08,
        ease: 'power2.out',
        onComplete: finishLoader
      });
    }
  }

  if (loaderScreen && loaderCard && loaderCounter) {
    // Lock page scroll while loader is displayed
    document.body.style.overflow = 'hidden';

    // Allow skip by click anywhere or any keypress
    loaderScreen.addEventListener('click', skipLoader);
    window.addEventListener('keydown', handleKeySkip);

    if (prefersReducedMotion) {
      loaderCounter.textContent = '100%';
      setTimeout(finishLoader, 200);
    } else {
      const counterProgress = { val: 0 };
      loaderTimeline = gsap.timeline();

      // Count from 0% to 100% over ~3 seconds
      loaderTimeline.to(counterProgress, {
        val: 100,
        duration: 3.0,
        ease: 'power1.inOut',
        onUpdate: () => {
          loaderCounter.textContent = `${Math.floor(counterProgress.val)}%`;
        },
        onComplete: () => {
          loaderCounter.textContent = '100%';
        }
      });

      // When counter reaches 100%, slide the card up
      loaderTimeline.to(loaderCard, {
        y: -120,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.in'
      }, '+=0.05');

      // Loader fades out, revealing the hero
      loaderTimeline.to(loaderScreen, {
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        onComplete: finishLoader
      }, '-=0.35');
    }
  }


  /* ==========================================================================
     Audio Manager (Staged for sound design - muted by default)
     ========================================================================== */
  class AudioManager {
    constructor() {
      this.isMuted = true;
      this.soundRegistry = new Map();
      this.activeInstances = new Map();
    }

    init() {
      // Audio context / HTML5 Audio init hook for future implementation
    }

    registerSound(id, src, options = {}) {
      this.soundRegistry.set(id, { src, options });
    }

    play(id) {
      if (this.isMuted) return;
      // Staged for sound playback implementation
    }

    stop(id) {
      // Staged for stopping audio instances
    }

    setMuted(muted) {
      this.isMuted = Boolean(muted);
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }
  }

  const audioManager = new AudioManager();

  // Sound Toggle UI Coordination
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundStatusText = document.getElementById('sound-status-text');

  if (soundToggleBtn && soundStatusText) {
    soundToggleBtn.addEventListener('click', () => {
      const isMuted = audioManager.toggleMute();
      soundToggleBtn.classList.toggle('sound-active', !isMuted);
      soundToggleBtn.setAttribute('aria-pressed', isMuted ? 'false' : 'true');
      soundStatusText.textContent = isMuted ? 'MUTED' : 'ACTIVE';
    });
  }

  /* ==========================================================================
     #intro Cinematic Master Timeline (7 Stacked Scene Layers)
     Target length: ~15 seconds total (buildScene1 ... buildScene7)
     ========================================================================== */
  let masterTimeline = null;
  let isIntroDismissed = false;

  function buildScene1() {
    const tl = gsap.timeline();
    const scene = document.getElementById('scene1');
    const crtBeam = document.getElementById('crt-beam-slit');
    const crtFlash = document.getElementById('crt-flash-glow');
    const atmosphere = document.getElementById('intro-atmosphere');
    const textEl = document.getElementById('scene1-text');
    const scene1Location = document.getElementById('scene1-location');

    // 1. Initial State: Scene 1 visible
    if (scene) {
      tl.set(scene, { opacity: 1, filter: 'brightness(1) contrast(1)' }, 0);
    }
    if (scene1Location) {
      tl.set(scene1Location, { opacity: 1 }, 0);
    }

    // 2. Black screen flickers on like an old CRT (0.0s - 0.35s)
    if (crtBeam) {
      tl.fromTo(crtBeam,
        { scaleX: 0, scaleY: 1, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.12, ease: 'power4.inOut' },
        0
      );
      tl.to(crtBeam,
        { scaleY: 600, opacity: 0.9, duration: 0.15, ease: 'power2.in' },
        0.12
      );
      tl.to(crtBeam, { opacity: 0, duration: 0.08 }, 0.27);
    }

    if (crtFlash) {
      tl.fromTo(crtFlash,
        { opacity: 0.95 },
        { opacity: 0, duration: 0.32, ease: 'power2.out' },
        0.22
      );
    }

    if (scene) {
      tl.fromTo(scene,
        { filter: 'brightness(2.4) contrast(1.3)' },
        { filter: 'brightness(1) contrast(1)', duration: 0.35, ease: 'power2.out' },
        0.24
      );
    }

    // 3. Thick grey fog rolls in slowly (persistent layer, 0.3s - 1.7s)
    if (atmosphere) {
      tl.fromTo(atmosphere,
        { opacity: 0 },
        { opacity: 0.85, duration: 1.4, ease: 'power1.out' },
        0.3
      );
    }

    // 4. Bottom left: Michroma label types out "LONDON, 1890" (0.6s - 1.55s)
    const textToType = "LONDON, 1890";
    const typeProxy = { charCount: 0 };

    if (textEl) {
      tl.to(typeProxy, {
        charCount: textToType.length,
        duration: 0.95,
        ease: 'none',
        onUpdate: () => {
          textEl.textContent = textToType.substring(0, Math.floor(typeProxy.charCount));
        }
      }, 0.6);
    }

    // 5. Scene 1 holds until 2.0s mark
    tl.set({}, {}, 2.0);

    return tl;
  }

  function buildScene2() {
    const tl = gsap.timeline();
    const scene = document.getElementById('scene2');
    const scene1Location = document.getElementById('scene1-location');
    const quoteWrapper = document.getElementById('scene2-quote-wrapper');
    const quoteEl = document.getElementById('scene2-quote');
    const textGlow = document.getElementById('scene2-text-glow');
    const brackets = document.querySelectorAll('#scene2-hud-brackets .hud-corner-bracket');
    const cornerLabels = document.querySelectorAll('.scene2-corner-label');
    const gasLamp = document.getElementById('scene2-gas-lamp');

    if (!scene) {
      return tl.to({}, { duration: 3.0 });
    }

    // Initial state
    tl.set(scene, { opacity: 1 }, 0);

    // Requirement 1: LONDON, 1890 label fades out during Scene 2
    if (scene1Location) {
      tl.to(scene1Location, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0);
    }

    // 1. Quote emerges out of fog (0.0s - 0.55s)
    if (quoteWrapper) {
      tl.fromTo(quoteWrapper,
        { opacity: 0, filter: 'blur(14px)', scale: 0.96 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.55, ease: 'power2.out' },
        0
      );
    }

    // Letter-spacing animation: letters start spread and tighten (0.0s - 0.7s)
    if (quoteEl) {
      tl.fromTo(quoteEl,
        { letterSpacing: '0.28em' },
        { letterSpacing: '0.06em', duration: 0.7, ease: 'power2.out' },
        0
      );
    }

    // Soft orange glow blooms behind the text (0.1s - 0.8s)
    if (textGlow) {
      tl.fromTo(textGlow,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
        0.1
      );
    }

    // 2. Cyan HUD corner brackets draw in (0.15s - 0.7s)
    if (brackets.length > 0) {
      tl.fromTo(brackets,
        { strokeDashoffset: 100, opacity: 0 },
        { strokeDashoffset: 0, opacity: 0.95, duration: 0.55, stagger: 0.05, ease: 'power2.out' },
        0.15
      );
    }

    // Tiny Michroma corner labels fade in (0.25s - 0.65s)
    if (cornerLabels.length > 0) {
      tl.fromTo(cornerLabels,
        { opacity: 0, y: (i) => (i < 2 ? -4 : 4) },
        { opacity: 0.85, y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out' },
        0.25
      );
    }

    // 3. Faint gas lamp glow appears in the background fog (0.55s - 1.35s)
    if (gasLamp) {
      tl.fromTo(gasLamp,
        { opacity: 0, filter: 'blur(6px)' },
        { opacity: 0.75, filter: 'blur(1px)', duration: 0.8, ease: 'power2.out' },
        0.55
      );
    }

    // 4. Stable readable hold for ~2.0s (0.55s to 2.55s)
    tl.to({}, { duration: 2.0 }, '+=0');

    // 5. Quote dissolves into the fog: blur plus opacity out (2.55s - 3.0s)
    if (quoteWrapper) {
      tl.to(quoteWrapper,
        { filter: 'blur(16px)', opacity: 0, scale: 1.04, duration: 0.45, ease: 'power2.in' },
        2.55
      );
    }

    if (gasLamp) {
      tl.to(gasLamp,
        { opacity: 0, filter: 'blur(8px)', duration: 0.4, ease: 'power2.in' },
        2.6
      );
    }

    tl.to(scene, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, 2.65);

    return tl;
  }

  function buildScene3() {
    const tl = gsap.timeline();
    const scene = document.getElementById('scene3');
    const atmosphere = document.getElementById('intro-atmosphere');
    const streetSign = document.getElementById('baker-street-sign');

    const lampFar1 = document.getElementById('lamp-1');
    const lampFar2 = document.getElementById('lamp-2');
    const lampMid1 = document.getElementById('lamp-3');
    const lampMid2 = document.getElementById('lamp-4');
    const lampNear1 = document.getElementById('lamp-5');
    const lampNear2 = document.getElementById('lamp-6');

    if (!scene) {
      return tl.to({}, { duration: 2.0 });
    }

    // 1. Initial State: Scene 3 fades in as fog parts (0.0s - 0.4s)
    tl.set(scene, { opacity: 1 }, 0);

    // Fog parts to reveal Baker Street: atmosphere opacity eases down from ~0.85 to ~0.42
    if (atmosphere) {
      tl.to(atmosphere, { opacity: 0.42, duration: 0.8, ease: 'power2.out' }, 0);
    }

    // Helper to ignite a Victorian gas lamp with flame, aura, and wet floor reflection
    const igniteLamp = (lampEl, atTime) => {
      if (!lampEl) return;
      const flame = lampEl.querySelector('.baker-lamp-flame');
      const aura = lampEl.querySelector('.baker-lamp-aura');
      const reflection = lampEl.querySelector('.baker-lamp-reflection');

      if (flame) {
        tl.fromTo(flame,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.22, ease: 'power2.out' },
          atTime
        );
      }
      if (aura) {
        tl.fromTo(aura,
          { scale: 0.2, opacity: 0 },
          { scale: 1, opacity: 0.9, duration: 0.32, ease: 'power2.out' },
          atTime + 0.04
        );
      }
      if (reflection) {
        tl.fromTo(reflection,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.65, duration: 0.38, ease: 'power2.out' },
          atTime + 0.08
        );
      }
      // Activate subtle continuous flicker
      tl.call(() => {
        lampEl.classList.add('lamp-flickering');
      }, null, atTime + 0.1);
    };

    // 2. Gas lamps along both sides light up one by one in orange (0.15s - 1.2s)
    // Order: Far vanishing lamps, receding mid lamps, dramatic near foreground lamps
    igniteLamp(lampFar1, 0.15);
    igniteLamp(lampFar2, 0.32);
    igniteLamp(lampMid1, 0.52);
    igniteLamp(lampMid2, 0.72);
    igniteLamp(lampNear1, 0.94);
    igniteLamp(lampNear2, 1.15);

    // 3. "BAKER STREET" enamel-style corner street sign fades in (0.75s - 1.4s)
    if (streetSign) {
      tl.fromTo(streetSign,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.65, ease: 'power2.out' },
        0.75
      );
    }

    // 4. Scene 3 holds until 2.0s mark (persists seamlessly into Scene 4 parallax push)
    tl.set({}, {}, 2.0);

    return tl;
  }

  function buildScene4() {
    const tl = gsap.timeline();
    const scene3 = document.getElementById('scene3');
    const scene4 = document.getElementById('scene4');
    const atmosphere = document.getElementById('intro-atmosphere');

    // 4 Depth layers from Scene 3 to push camera forward with parallax
    const depth1 = document.getElementById('baker-depth-1');
    const depth2 = document.getElementById('baker-depth-2');
    const depth3 = document.getElementById('baker-depth-3');
    const depth4 = document.getElementById('baker-depth-4');

    // Cast actors in Scene 4
    const hansomCab = document.getElementById('hansom-cab');
    const sherlock = document.getElementById('sherlock-figure');

    if (!scene4) {
      return tl.to({}, { duration: 2.0 });
    }

    // 1. Scene 4 becomes active over Scene 3 (0.0s)
    tl.set(scene4, { opacity: 1 }, 0);

    // 2. Camera moves forward down the street: Parallax scale & shift 4 depth layers (0.0s - 2.0s)
    if (depth1) {
      tl.to(depth1, { scale: 1.05, y: '1.5%', duration: 2.0, ease: 'none' }, 0);
    }
    if (depth2) {
      tl.to(depth2, { scale: 1.15, y: '3.5%', duration: 2.0, ease: 'none' }, 0);
    }
    if (depth3) {
      tl.to(depth3, { scale: 1.28, y: '5.5%', duration: 2.0, ease: 'none' }, 0);
    }
    if (depth4) {
      tl.to(depth4, { scale: 1.45, y: '8%', duration: 2.0, ease: 'none' }, 0);
    }

    // 3. Hansom cab silhouette crosses right-to-left in the mid layer (0.0s - 2.0s)
    if (hansomCab) {
      tl.fromTo(hansomCab,
        { x: '105vw' },
        { x: '-35vw', duration: 2.0, ease: 'none' },
        0
      );
    }

    // 4. Sherlock Holmes walks left-to-right under the lamp in the foreground (0.0s - 2.0s)
    if (sherlock) {
      tl.fromTo(sherlock,
        { x: '-25vw' },
        { x: '105vw', duration: 2.0, ease: 'power1.inOut' },
        0
      );
    }

    // 5. Atmospheric fog thickens slightly toward end of scene (1.4s - 2.0s)
    if (atmosphere) {
      tl.to(atmosphere, { opacity: 0.65, duration: 0.6, ease: 'power2.in' }, 1.4);
    }

    // 6. Dissolve transition at end of Scene 4 preparing for Scene 5 (1.7s - 2.0s)
    if (scene3) {
      tl.to(scene3, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 1.7);
    }
    tl.to(scene4, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 1.7);

    return tl;
  }

  function buildScene5() {
    const tl = gsap.timeline();
    const scene = document.getElementById('scene5');
    const facade = document.getElementById('scene5-facade');
    const shineSweep = document.getElementById('scene5-shine-sweep');
    const hudTag = document.getElementById('scene5-hud-tag');
    const bowLine = document.getElementById('scene5-bow-line');
    const windowSmoke = document.getElementById('scene5-window-smoke');

    if (!scene) {
      return tl.to({}, { duration: 2.0 });
    }

    // 1. Scene 5 fades in (0.0s - 0.35s)
    tl.set(scene, { opacity: 1 }, 0);

    // Camera push-in on facade (0.0s - 2.0s)
    if (facade) {
      tl.fromTo(facade,
        { scale: 1.0, y: '0%' },
        { scale: 1.15, y: '-2%', duration: 2.0, ease: 'power1.out' },
        0
      );
    }

    // 2. Brass plate light sweep (0.2s - 1.4s)
    if (shineSweep) {
      tl.fromTo(shineSweep,
        { left: '-100%' },
        { left: '200%', duration: 1.2, ease: 'power2.inOut' },
        0.2
      );
    }

    // 3. Cyan HUD Tag fades in (0.35s - 0.8s)
    if (hudTag) {
      tl.fromTo(hudTag,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        0.35
      );
    }

    // 4. Violinist bow movement (oscillates back & forth)
    if (bowLine) {
      tl.fromTo(bowLine,
        { x: -12, y: -4 },
        { x: 12, y: 4, duration: 0.9, ease: 'sine.inOut', repeat: 1, yoyo: true },
        0.1
      );
    }

    // 5. Pipe smoke drifting out of window (0.1s - 2.0s)
    if (windowSmoke) {
      tl.fromTo(windowSmoke,
        { strokeDashoffset: 40, opacity: 0 },
        { strokeDashoffset: 0, opacity: 0.7, duration: 1.8, ease: 'power1.out' },
        0.1
      );
    }

    // 6. Camera zooms into the window glow at end of Scene 5 to transition into Scene 6 (1.6s - 2.0s)
    if (facade) {
      tl.to(facade, {
        scale: 4.8,
        transformOrigin: '50% 30%',
        opacity: 0.2,
        duration: 0.4,
        ease: 'power2.in'
      }, 1.6);
    }

    tl.to(scene, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 1.7);

    return tl;
  }

  function buildScene6() {
    const tl = gsap.timeline();
    const scene = document.getElementById('scene6');
    const scanline = document.getElementById('scene6-scanline');
    const clues = [
      { el: document.getElementById('clue1-item'), label: document.getElementById('clue-label-1') },
      { el: document.getElementById('clue2-item'), label: document.getElementById('clue-label-2') },
      { el: document.getElementById('clue3-item'), label: document.getElementById('clue-label-3') },
      { el: document.getElementById('clue4-item'), label: document.getElementById('clue-label-4') },
      { el: document.getElementById('clue5-item'), label: document.getElementById('clue-label-5') }
    ];
    const jewelCase = document.getElementById('jewel-case-item');
    const sapphire = document.getElementById('sapphire-outline');

    if (!scene) {
      return tl.to({}, { duration: 2.5 });
    }

    // 1. Scene 6 fades in to dark charcoal room (0.0s)
    tl.set(scene, { opacity: 1 }, 0);

    // 2. Thin cyan scanline sweeps once across the screen (0.1s - 1.7s)
    if (scanline) {
      tl.fromTo(scanline,
        { top: '0%', opacity: 0.9 },
        { top: '100%', duration: 1.6, ease: 'power1.inOut' },
        0.1
      );
    }

    // 3. 5 Line-Art Clues appear one by one at different positions:
    // Each fading and scaling in over 0.3s with 0.25s between them
    clues.forEach(({ el, label }, index) => {
      const startTime = 0.15 + index * 0.25;
      if (el) {
        tl.fromTo(el,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.2)' },
          startTime
        );
      }
      if (label) {
        tl.call(() => {
          label.classList.add('label-active');
        }, null, startTime + 0.1);
      }
    });

    // 4. After the five clues: empty open jewel case appears in center with cyan sapphire outline & "STOLEN" tag
    const jewelStartTime = 1.45;
    if (jewelCase) {
      tl.fromTo(jewelCase,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
        jewelStartTime
      );
    }

    // Faint cyan sapphire outline flickers and fades away
    if (sapphire) {
      tl.to(sapphire, { opacity: 0.2, duration: 0.1, yoyo: true, repeat: 3 }, jewelStartTime + 0.2);
      tl.to(sapphire, { opacity: 0, duration: 0.4, ease: 'power2.out' }, jewelStartTime + 0.6);
    }

    // Scene hold until 2.4s mark
    tl.set({}, {}, 2.4);

    // Fade out scene6 preparing for scene7 (2.4s - 2.7s)
    tl.to(scene, { opacity: 0, duration: 0.3, ease: 'power2.inOut' }, 2.4);

    return tl;
  }

  function buildScene7() {
    const tl = gsap.timeline();
    const scene = document.getElementById('scene7');
    const strings = document.querySelectorAll('.detective-string');
    const title = document.getElementById('scene7-title');
    const statusChip = document.getElementById('scene7-status-chip');
    const line1El = document.getElementById('scene7-typewriter-line1');
    const line2El = document.getElementById('scene7-typewriter-line2');
    const flash = document.getElementById('scene7-flash');

    if (!scene) {
      return tl.to({}, { duration: 3.5 });
    }

    // 1. Scene 7 active (0.0s)
    tl.set(scene, { opacity: 1 }, 0);

    // 2. Orange string lines (stroke-dashoffset, about 1s) connect clue1 to clue5 & converge in center
    if (strings.length > 0) {
      tl.fromTo(strings,
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 1.0, stagger: 0.08, ease: 'power2.out' },
        0
      );
    }

    // 3. Title "AZURE ALIBI" in Pirata One, cream colored, large, centered
    if (title) {
      tl.fromTo(title,
        { opacity: 0, scale: 0.88, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
        0.4
      );
    }

    // Under title: small cyan chip "STATUS: OPEN"
    if (statusChip) {
      tl.fromTo(statusChip,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.75
      );
    }

    // 4. Below that, type out in Special Elite, in fog grey:
    // Line 1: "A sapphire is missing. Five suspects. One truth."
    const text1 = "A sapphire is missing. Five suspects. One truth.";
    const proxy1 = { count: 0 };
    if (line1El) {
      tl.to(proxy1, {
        count: text1.length,
        duration: 0.95,
        ease: 'none',
        onUpdate: () => {
          line1El.textContent = text1.substring(0, Math.floor(proxy1.count));
        }
      }, 1.0);
    }

    // Line 2: "You see, but you do not observe."
    const text2 = "You see, but you do not observe.";
    const proxy2 = { count: 0 };
    if (line2El) {
      tl.to(proxy2, {
        count: text2.length,
        duration: 0.75,
        ease: 'none',
        onUpdate: () => {
          line2El.textContent = text2.substring(0, Math.floor(proxy2.count));
        }
      }, 2.05);
    }

    // 5. Hold about 1 second (2.8s to 3.8s)
    tl.set({}, {}, 3.8);

    // 6. Orange flash fills screen for 0.3s and fades to reveal #main
    if (flash) {
      tl.fromTo(flash,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.15,
          ease: 'power3.in',
          onComplete: () => {
            handoverToMain();
            gsap.to(flash, { opacity: 0, duration: 0.15 });
          }
        },
        3.8
      );
    }

    return tl;
  }

  // Construct Master Timeline chaining Scene 1 through Scene 7 (~15s)
  function initMasterTimeline() {
    masterTimeline = gsap.timeline({
      paused: true,
      onComplete: handoverToMain
    });

    masterTimeline
      .add(buildScene1())
      .add(buildScene2())
      .add(buildScene3())
      .add(buildScene4())
      .add(buildScene5())
      .add(buildScene6())
      .add(buildScene7());

    window.masterTimeline = masterTimeline;
    return masterTimeline;
  }

  initMasterTimeline();

  function playIntro() {
    if (prefersReducedMotion) {
      handoverToMain();
      return;
    }
    document.body.style.overflow = 'hidden';
    if (masterTimeline) {
      masterTimeline.play(0);
    }
  }

  function handoverToMain() {
    if (isIntroDismissed) return;
    isIntroDismissed = true;

    if (masterTimeline) {
      masterTimeline.kill();
    }

    const introScreen = document.getElementById('intro');
    const mainSection = document.getElementById('main');

    // Restore standard scrolling
    document.body.style.overflow = '';

    if (introScreen) {
      introScreen.remove();
    }
    if (mainSection) {
      mainSection.style.display = 'block';
      mainSection.style.opacity = '1';
    }

    // Set CASE BOARD as active after hand-off
    setActiveSection('hero');

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }

  // Skip Intro Link Click Handling
  const skipIntroBtn = document.getElementById('skip-intro-btn');
  if (skipIntroBtn) {
    skipIntroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handoverToMain();
    });
  }

  // Keyboard shortcut for skipping intro [Escape]
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !isIntroDismissed && isLoaderDismissed) {
      handoverToMain();
    }
  });

  // Section targets for scroll tracking
  const sections = [
    { id: 'hero', name: 'CASE BOARD' },
    { id: 'suspects', name: 'SUSPECTS' },
    { id: 'deduction', name: 'DEDUCTION' }
  ];

  /**
   * Updates the UI state for the active section:
   * - Active dot in progress indicator (orange)
   * - Section name mono text in progress indicator
   * - Active link in navbar
   */
  function setActiveSection(targetId) {
    const matched = sections.find(s => s.id === targetId);
    if (!matched) return;

    // Update Progress Label text
    if (progressLabel && progressLabel.textContent !== matched.name) {
      if (prefersReducedMotion) {
        progressLabel.textContent = matched.name;
      } else {
        // Quick subtle text swap animation
        gsap.to(progressLabel, {
          opacity: 0,
          y: -4,
          duration: 0.15,
          onComplete: () => {
            progressLabel.textContent = matched.name;
            gsap.to(progressLabel, { opacity: 1, y: 0, duration: 0.15 });
          }
        });
      }
    }

    // Update Progress Dots
    progressDots.forEach(dot => {
      const isCurrent = dot.dataset.target === targetId;
      dot.classList.toggle('active', isCurrent);
      dot.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    // Update Navbar Links
    navLinks.forEach(link => {
      const isCurrent = link.dataset.target === targetId;
      link.classList.toggle('active', isCurrent);
    });
  }

  /**
   * Smoothly scrolls to target element
   */
  function scrollToTarget(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    if (prefersReducedMotion) {
      targetElement.scrollIntoView({ behavior: 'auto' });
    } else if (typeof gsap !== 'undefined' && gsap.to) {
      const navOffset = 60; // height of sticky navbar
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Set up ScrollTrigger observers for each section
   */
  if (typeof ScrollTrigger !== 'undefined') {
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });
  }

  // Progress dot click handling
  progressDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.dataset.target;
      if (targetId) {
        scrollToTarget(targetId);
      }
    });
  });

  // Nav link click handling
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;
      if (targetId) {
        scrollToTarget(targetId);
      }
    });
  });

  // "ENTER THE CASE" and screen navigation button interactions
  const enterCaseBtn = document.getElementById('enter-case-btn');
  if (enterCaseBtn) {
    enterCaseBtn.addEventListener('click', () => {
      scrollToTarget('briefing');
      if (window.caseStore) window.caseStore.setScreen('briefing');
    });
  }

  const proceedBoardBtn = document.getElementById('proceed-board-btn');
  if (proceedBoardBtn) {
    proceedBoardBtn.addEventListener('click', () => {
      scrollToTarget('board');
      if (window.caseStore) window.caseStore.setScreen('board');
    });
  }

  // Initialize Phase 1 Case Logic if window.caseStore is available
  if (window.caseStore && window.CASE_DATA) {
    initCaseApp();
  }
});

/**
 * Helper: Generate SVG Portrait for Suspects (Faceless Engraved Silhouette Style)
 */
function getSuspectPortraitSVG(id) {
  switch (id) {
    case 'suspect1': // Moriarty: High forehead & long coat
      return `<svg class="suspect-portrait-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
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
      </svg>`;
    case 'suspect2': // Irene Adler: Silk lace shawl & chignon
      return `<svg class="suspect-portrait-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
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
      </svg>`;
    case 'suspect3': // Col. Moran: Military collar & mustache contour
      return `<svg class="suspect-portrait-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
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
      </svg>`;
    case 'suspect4': // Milverton: Gold monocle & seal ring
      return `<svg class="suspect-portrait-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
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
      </svg>`;
    case 'suspect5': // Roylott: Top hat & medical bag
      return `<svg class="suspect-portrait-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
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
      </svg>`;
    default:
      return '';
  }
}

/**
 * Helper: Generate SVG Vector Art for Clues
 */
function getClueSVG(clueId) {
  switch (clueId) {
    case 'clue1':
      return `<svg class="clue-card-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FF6A1F" stroke-width="1.5" fill="none">
          <path d="M 60 30 C 60 75, 100 75, 100 30 Z"/>
          <line x1="64" y1="48" x2="96" y2="48" stroke-dasharray="3 2" opacity="0.7"/>
          <line x1="80" y1="75" x2="80" y2="125"/>
          <line x1="55" y1="125" x2="105" y2="125"/>
          <path d="M 62 33 C 64 28, 72 28, 74 33" stroke="#4FD1D9" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </svg>`;
    case 'clue2':
      return `<svg class="clue-card-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FF6A1F" stroke-width="1.5" fill="none">
          <path d="M 45 45 C 45 35 52 30 58 40 L 62 25 C 66 22 72 25 74 40 L 78 20 C 82 18 88 20 90 40 L 94 28 C 98 28 102 32 102 50 L 105 80 L 100 110 L 92 105 L 84 122 L 76 108 L 68 124 L 60 112 L 52 106 L 45 85 Z"/>
          <path d="M 65 60 L 65 95 M 78 58 L 78 95 M 90 62 L 90 92" stroke-dasharray="3 3" opacity="0.6"/>
          <path d="M 84 122 L 87 130 M 76 108 L 74 116 M 68 124 L 70 132" stroke="#4FD1D9" stroke-width="1"/>
        </g>
      </svg>`;
    case 'clue3':
      return `<svg class="clue-card-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FF6A1F" stroke-width="1.5" fill="none">
          <circle cx="80" cy="42" r="22"/>
          <circle cx="80" cy="42" r="14"/>
          <circle cx="80" cy="20" r="4"/>
          <line x1="80" y1="64" x2="80" y2="135"/>
          <rect x="74" y="72" width="12" height="5" rx="1"/>
          <path d="M 80 105 L 104 105 L 104 116 L 94 116 L 94 122 L 106 122 L 106 135 L 80 135"/>
        </g>
      </svg>`;
    case 'clue4':
      return `<svg class="clue-card-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FF6A1F" stroke-width="1.5" fill="none">
          <path d="M 30 25 L 130 25 L 130 100 L 118 95 L 105 115 L 90 102 L 75 118 L 60 106 L 45 120 L 30 110 Z"/>
          <path d="M 42 40 Q 55 35 68 43 T 92 38 T 118 42" stroke-width="1.2"/>
          <path d="M 42 56 Q 58 50 72 58 T 98 52 T 112 56" stroke-width="1.2"/>
          <path d="M 42 72 Q 52 68 64 74 T 88 70 T 115 74" stroke-width="1.2"/>
          <path d="M 42 88 Q 55 84 68 90 T 95 86" stroke-width="1.2"/>
          <line x1="40" y1="56" x2="114" y2="56" stroke="#4FD1D9" stroke-width="1.5"/>
        </g>
      </svg>`;
    case 'clue5':
      return `<svg class="clue-card-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
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
      </svg>`;
    default:
      return '';
  }
}

/**
 * Initialize Case App with Evidence Wall, Deduction, Timeline & Outcome Logic
 */
function initCaseApp() {
  let activeClueId = null;
  let activeSuspectId = null;

  // DOM Elements
  const clueCardsContainer = document.getElementById('clue-cards-container');
  const suspectPolaroidsGrid = document.getElementById('suspect-polaroids-grid') || document.getElementById('suspects');
  const inspectedCountEl = document.getElementById('inspected-clues-count');
  const connectedCountEl = document.getElementById('connected-strings-count');
  const navStatusLabel = document.getElementById('nav-status-label');
  const navCaseStatusChip = document.getElementById('nav-case-status');
  const resetBtn = document.getElementById('reset-evidence-btn');
  const boardEmptyHint = document.getElementById('board-empty-hint');

  // Deduction Screen DOM
  const deductionSuspectsGrid = document.getElementById('deduction-suspects-grid');
  const deductionCluesRecap = document.getElementById('deduction-clues-recap');
  const submitDeductionBtn = document.getElementById('submit-deduction-btn');
  const accuseBtnHint = document.getElementById('accuse-btn-hint');
  const summaryContainer = document.getElementById('summary-container');

  // Modal elements
  const clueModal = document.getElementById('clue-modal');
  const clueModalClose = document.getElementById('clue-modal-close');
  const modalClueSubtitle = document.getElementById('modal-clue-subtitle');
  const modalClueTitle = document.getElementById('modal-clue-title');
  const modalClueSvg = document.getElementById('modal-clue-svg-container');
  const modalClueDesc = document.getElementById('modal-clue-description');
  const suspectSelect = document.getElementById('suspect-select');
  const connectEvidenceBtn = document.getElementById('connect-evidence-btn');
  const removeEvidenceBtn = document.getElementById('remove-evidence-btn');

  const suspectModal = document.getElementById('suspect-modal');
  const suspectModalClose = document.getElementById('suspect-modal-close');
  const suspectModalOkBtn = document.getElementById('suspect-modal-ok-btn');
  const modalSuspectRole = document.getElementById('modal-suspect-role');
  const modalSuspectName = document.getElementById('modal-suspect-name');
  const modalSuspectPortrait = document.getElementById('modal-suspect-portrait');
  const modalSuspectProp = document.getElementById('modal-suspect-prop');
  const modalSuspectAlibi = document.getElementById('modal-suspect-alibi');
  const modalSuspectConnection = document.getElementById('modal-suspect-connection');

  // Timeline Modal
  const timelineModal = document.getElementById('timeline-modal');
  const timelineEventsContainer = document.getElementById('timeline-events-container');
  const timelineModalClose = document.getElementById('timeline-modal-close');
  const timelineModalOkBtn = document.getElementById('timeline-modal-ok-btn');
  const boardViewTimelineBtn = document.getElementById('board-view-timeline-btn');
  const deductionViewTimelineBtn = document.getElementById('deduction-view-timeline-btn');

  // Accusation Confirmation Modal
  const accusationModal = document.getElementById('accusation-modal');
  const accusationModalClose = document.getElementById('accusation-modal-close');
  const accusationModalText = document.getElementById('accusation-modal-text');
  const confirmAccusationBtn = document.getElementById('confirm-accusation-btn');
  const cancelAccusationBtn = document.getElementById('cancel-accusation-btn');

  // Incorrect Outcome Modal
  const incorrectModal = document.getElementById('incorrect-modal');
  const incorrectModalClose = document.getElementById('incorrect-modal-close');
  const incorrectReturnBoardBtn = document.getElementById('incorrect-return-board-btn');
  const incorrectTryAgainBtn = document.getElementById('incorrect-try-again-btn');

  // Dynamic SVG Red Strings Drawing
  function drawEvidenceStrings() {
    const svg = document.getElementById('board-strings-svg');
    if (!svg) return;
    svg.innerHTML = '';

    const state = window.caseStore.getState();
    const connections = state.connections;
    if (!connections || connections.length === 0) return;

    const svgRect = svg.getBoundingClientRect();
    if (svgRect.width === 0 || svgRect.height === 0) return;

    connections.forEach(conn => {
      const clueEl = document.querySelector(`[data-clue-id="${conn.clueId}"]`);
      const suspectEl = document.querySelector(`[data-suspect-id="${conn.suspectId}"]`);

      if (clueEl && suspectEl) {
        const clueRect = clueEl.getBoundingClientRect();
        const suspectRect = suspectEl.getBoundingClientRect();

        const x1 = (clueRect.left + clueRect.width / 2) - svgRect.left;
        const y1 = (clueRect.top + clueRect.height / 2) - svgRect.top;
        const x2 = (suspectRect.left + suspectRect.width / 2) - svgRect.left;
        const y2 = (suspectRect.top + suspectRect.height / 2) - svgRect.top;

        // Quadratic curve for sagging string effect
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 + 25;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`);

        const isClueSelected = (state.selectedClueId === conn.clueId);
        const isSuspectSelected = (state.selectedSuspectId === conn.suspectId);
        const isHighlighted = isClueSelected || isSuspectSelected || (!state.selectedClueId && !state.selectedSuspectId);

        path.setAttribute('class', `evidence-string-path ${isHighlighted ? 'string-active' : 'string-dimmed'}`);
        svg.appendChild(path);

        // Pin dots
        const p1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        p1.setAttribute('cx', x1);
        p1.setAttribute('cy', y1);
        p1.setAttribute('r', '4');
        p1.setAttribute('fill', '#FF6A1F');
        svg.appendChild(p1);

        const p2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        p2.setAttribute('cx', x2);
        p2.setAttribute('cy', y2);
        p2.setAttribute('r', '4');
        p2.setAttribute('fill', '#FF6A1F');
        svg.appendChild(p2);
      }
    });
  }

  window.addEventListener('resize', drawEvidenceStrings);

  // Render UI according to state
  function renderUI() {
    const state = window.caseStore.getState();
    const caseStatus = window.caseStore.getCaseStatus();

    // 1. Update status chip
    if (navStatusLabel) {
      navStatusLabel.textContent = `STATUS: ${caseStatus}`;
    }
    if (navCaseStatusChip) {
      navCaseStatusChip.classList.remove('status-open', 'status-in-progress', 'status-solved');
      if (caseStatus === 'OPEN') navCaseStatusChip.classList.add('status-open');
      else if (caseStatus === 'IN PROGRESS') navCaseStatusChip.classList.add('status-in-progress');
      else if (caseStatus === 'SOLVED') navCaseStatusChip.classList.add('status-solved');
    }

    // 2. Update counters & empty hint
    if (inspectedCountEl) inspectedCountEl.textContent = `${state.inspectedClues.length} / 5`;
    if (connectedCountEl) connectedCountEl.textContent = `${state.connections.length} / 5`;

    if (boardEmptyHint) {
      if (state.connections.length === 0) {
        boardEmptyHint.textContent = "No evidence connected yet. Select a clue slip below, then a suspect polaroid.";
      } else if (state.selectedClueId) {
        const clue = window.CASE_DATA.clues.find(c => c.id === state.selectedClueId);
        boardEmptyHint.textContent = `Selected "${clue ? clue.title : 'Clue'}". Click a suspect polaroid above to connect string.`;
      } else {
        boardEmptyHint.textContent = `Evidence strings active (${state.connections.length}/5). Click a clue slip to select or examine.`;
      }
    }

    // 3. Render Suspect Polaroid Cards on Board
    if (suspectPolaroidsGrid) {
      suspectPolaroidsGrid.innerHTML = '';
      window.CASE_DATA.suspects.forEach(suspect => {
        const connection = window.caseStore.getConnectionForSuspect(suspect.id);
        const connectionCount = window.caseStore.getConnectionsForSuspectCount(suspect.id);
        const isSelected = (state.selectedSuspectId === suspect.id);
        const isConnected = !!connection;

        const card = document.createElement('div');
        card.className = `polaroid-card ${isConnected ? 'connected' : ''} ${isSelected ? 'selected' : ''}`;
        card.setAttribute('data-suspect-id', suspect.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Suspect ${suspect.name}, ${suspect.role}`);

        card.innerHTML = `
          <div class="polaroid-pin" aria-hidden="true"></div>
          <div class="polaroid-portrait-box">
            ${getSuspectPortraitSVG(suspect.id)}
          </div>
          <div class="polaroid-info">
            <div class="polaroid-name">${suspect.name}</div>
            <div class="polaroid-role">${suspect.role}</div>
            <div class="polaroid-chips">
              <span class="chip-text chip-inspected">INSPECTED</span>
              <span class="chip-text chip-connections">${connectionCount} STRING${connectionCount !== 1 ? 'S' : ''}</span>
              ${isSelected ? `<span class="chip-text chip-selected">SELECTED</span>` : ''}
            </div>
          </div>
        `;

        card.addEventListener('click', () => handleSuspectPolaroidClick(suspect.id));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSuspectPolaroidClick(suspect.id);
          }
        });
        suspectPolaroidsGrid.appendChild(card);
      });
    }

    // 4. Render Clue Cream Paper Slips in Board Tray
    if (clueCardsContainer) {
      clueCardsContainer.innerHTML = '';
      window.CASE_DATA.clues.forEach((clue, idx) => {
        const isInspected = state.inspectedClues.includes(clue.id);
        const connection = window.caseStore.getConnectionForClue(clue.id);
        const isSelected = (state.selectedClueId === clue.id);
        const connectedSuspect = connection 
          ? window.CASE_DATA.suspects.find(s => s.id === connection.suspectId)
          : null;
        const currentVerdict = connection ? (window.caseStore.getClueVerdict(clue.id) || 'NOT ASSESSED') : null;

        const slip = document.createElement('div');
        slip.className = `clue-paper-slip animate-slip-slide ${isInspected ? 'inspected' : ''} ${connection ? 'connected' : ''} ${isSelected ? 'selected' : ''}`;
        slip.setAttribute('data-clue-id', clue.id);
        slip.setAttribute('tabindex', '0');
        slip.setAttribute('role', 'button');
        slip.setAttribute('aria-label', `Evidence Clue ${clue.title}`);
        slip.style.animationDelay = `${idx * 0.08}s`;

        slip.innerHTML = `
          <div class="slip-tape" aria-hidden="true"></div>
          <div class="slip-exhibit">EXHIBIT 0${idx + 1}</div>
          <div class="slip-title">${clue.title}</div>
          ${connection ? `<div class="slip-status-tag">LINKED TO: ${connectedSuspect ? connectedSuspect.name : 'SUSPECT'} [${currentVerdict}]</div>` : ''}
          <div class="slip-examine-hint">CLICK TO EXAMINE →</div>
        `;

        slip.addEventListener('click', () => handleClueSlipClick(clue.id));
        slip.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClueSlipClick(clue.id);
          }
        });
        clueCardsContainer.appendChild(slip);
      });
    }

    // 5. Render Deduction Room Selectable Suspects Grid
    if (deductionSuspectsGrid) {
      deductionSuspectsGrid.innerHTML = '';
      window.CASE_DATA.suspects.forEach(suspect => {
        const isAccuseSelected = (state.accusedSuspectId === suspect.id);
        const suspectConnections = state.connections.filter(c => c.suspectId === suspect.id);
        const linkedCount = suspectConnections.length;
        
        let contradictsCount = 0;
        let notAssessedCount = 0;

        suspectConnections.forEach(conn => {
          const v = window.caseStore.getClueVerdict(conn.clueId);
          if (v === 'CONTRADICTS ALIBI') {
            contradictsCount++;
          } else if (!v || v === 'NOT ASSESSED') {
            notAssessedCount++;
          }
        });

        const neutralSummary = `${linkedCount} clue${linkedCount !== 1 ? 's' : ''} linked, ${contradictsCount} contradict${contradictsCount !== 1 ? 's' : ''} alibi, ${notAssessedCount} not assessed`;

        const card = document.createElement('div');
        card.className = `deduction-suspect-card ${isAccuseSelected ? 'accuse-selected' : ''}`;
        card.setAttribute('data-deduction-suspect-id', suspect.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-selected', isAccuseSelected ? 'true' : 'false');
        card.setAttribute('aria-label', `Select ${suspect.name} for accusation`);

        let cluesListHtml = '';
        if (linkedCount > 0) {
          cluesListHtml = suspectConnections.map(conn => {
            const clue = window.CASE_DATA.clues.find(c => c.id === conn.clueId);
            if (!clue) return '';
            const currentVerdict = window.caseStore.getClueVerdict(clue.id) || 'NOT ASSESSED';
            return `
              <div class="deduction-clue-slip">
                <div class="slip-header">
                  <span class="slip-exhibit">EVIDENCE CLUE</span>
                  <span class="slip-title">${clue.title}</span>
                </div>
                <div class="verdict-microcopy">Does this evidence support the alibi, contradict it, or remain inconclusive?</div>
                <div class="verdict-options">
                  <button type="button" class="verdict-btn ${currentVerdict === 'SUPPORTS ALIBI' ? 'active-supports' : ''}" data-clue-id="${clue.id}" data-verdict="SUPPORTS ALIBI">SUPPORTS ALIBI</button>
                  <button type="button" class="verdict-btn ${currentVerdict === 'CONTRADICTS ALIBI' ? 'active-contradicts' : ''}" data-clue-id="${clue.id}" data-verdict="CONTRADICTS ALIBI">CONTRADICTS ALIBI</button>
                  <button type="button" class="verdict-btn ${currentVerdict === 'INCONCLUSIVE' ? 'active-inconclusive' : ''}" data-clue-id="${clue.id}" data-verdict="INCONCLUSIVE">INCONCLUSIVE</button>
                </div>
              </div>
            `;
          }).join('');
        } else {
          cluesListHtml = `<div class="deduction-no-clues">No evidence connected</div>`;
        }

        card.innerHTML = `
          ${isAccuseSelected ? `<div class="selected-badge-label">SELECTED</div>` : ''}
          <div class="deduction-portrait-wrapper">
            ${getSuspectPortraitSVG(suspect.id)}
          </div>
          <div class="deduction-suspect-name">${suspect.name}</div>
          <div class="deduction-suspect-role">${suspect.role}</div>
          <div class="deduction-alibi-snippet">"${suspect.alibi}"</div>
          <div class="deduction-linked-clues-box">
            <span class="box-title">LINKED EVIDENCE SLIPS:</span>
            ${cluesListHtml}
          </div>
          <div class="deduction-neutral-summary">${neutralSummary}</div>
        `;

        card.addEventListener('click', (e) => {
          if (e.target.classList.contains('verdict-btn')) return;
          window.caseStore.selectAccusedSuspect(suspect.id);
        });

        card.addEventListener('keydown', (e) => {
          if (e.target.classList.contains('verdict-btn')) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.caseStore.selectAccusedSuspect(suspect.id);
          }
        });

        const verdictBtns = card.querySelectorAll('.verdict-btn');
        verdictBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const clueId = btn.getAttribute('data-clue-id');
            const verdict = btn.getAttribute('data-verdict');
            window.caseStore.setClueVerdict(clueId, verdict);
          });
        });

        deductionSuspectsGrid.appendChild(card);
      });
    }

    // 6. Render Deduction Clues Recap Strip
    if (deductionCluesRecap) {
      deductionCluesRecap.innerHTML = '';
      window.CASE_DATA.clues.forEach(clue => {
        const connection = window.caseStore.getConnectionForClue(clue.id);
        const connectedSuspect = connection 
          ? window.CASE_DATA.suspects.find(s => s.id === connection.suspectId)
          : null;
        const v = window.caseStore.getClueVerdict(clue.id) || 'NOT ASSESSED';

        const chip = document.createElement('div');
        chip.className = `recap-clue-chip ${connection ? 'linked' : ''}`;
        chip.textContent = `${clue.title}: ${connectedSuspect ? connectedSuspect.name : 'UNLINKED'}${connection ? ` [${v}]` : ''}`;
        deductionCluesRecap.appendChild(chip);
      });
    }

    // 7. Deduction Submit Button state
    if (submitDeductionBtn) {
      const hasSelection = !!state.accusedSuspectId;
      submitDeductionBtn.disabled = !hasSelection;
      if (accuseBtnHint) {
        if (hasSelection) {
          const accused = window.CASE_DATA.suspects.find(s => s.id === state.accusedSuspectId);
          accuseBtnHint.textContent = `Ready to accuse ${accused ? accused.name : 'selected suspect'}. Click button to submit.`;
        } else {
          accuseBtnHint.textContent = "Select a prime suspect card above to file your accusation.";
        }
      }
    }

    // 8. Render Solved Summary Page if Case Solved
    if (summaryContainer && state.isSolved) {
      renderSolvedSummary();
    }

    // Draw evidence strings after DOM updates
    setTimeout(drawEvidenceStrings, 50);
  }

  // Handle board interactions
  function handleClueSlipClick(clueId) {
    const state = window.caseStore.getState();
    // If a clue is already selected and clicked again, open detail modal
    if (state.selectedClueId === clueId) {
      openClueModal(clueId);
    } else {
      window.caseStore.selectClueOnBoard(clueId);
      // Also open modal on direct click if user wants full inspection
      openClueModal(clueId);
    }
  }

  function handleSuspectPolaroidClick(suspectId) {
    const state = window.caseStore.getState();
    if (state.selectedClueId) {
      // Connect selected clue to this suspect!
      window.caseStore.setConnection(state.selectedClueId, suspectId);
    } else {
      // Open suspect dossier modal
      openSuspectModal(suspectId);
    }
  }

  // Timeline Modal
  function openTimelineModal() {
    if (timelineEventsContainer) {
      timelineEventsContainer.innerHTML = '';
      window.CASE_DATA.timeline.forEach(event => {
        const item = document.createElement('div');
        item.className = 'timeline-event-card';
        item.innerHTML = `
          <div class="timeline-time-badge">${event.time}</div>
          <div class="timeline-event-content">
            <div class="timeline-event-title">${event.title}</div>
            <div class="timeline-event-location">LOCATION: ${event.location}</div>
            <div class="timeline-event-desc">${event.desc}</div>
          </div>
        `;
        timelineEventsContainer.appendChild(item);
      });
    }
    if (timelineModal) {
      timelineModal.classList.add('active');
      timelineModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeTimelineModal() {
    if (timelineModal) {
      timelineModal.classList.remove('active');
      timelineModal.setAttribute('aria-hidden', 'true');
    }
  }

  // Clue Modal Handlers
  function openClueModal(clueId) {
    activeClueId = clueId;
    window.caseStore.inspectClue(clueId);

    const clue = window.CASE_DATA.clues.find(c => c.id === clueId);
    if (!clue) return;

    if (modalClueSubtitle) modalClueSubtitle.textContent = clue.subtitle;
    if (modalClueTitle) modalClueTitle.textContent = clue.title;
    if (modalClueSvg) modalClueSvg.innerHTML = getClueSVG(clueId);
    if (modalClueDesc) modalClueDesc.textContent = clue.description;

    const currentConn = window.caseStore.getConnectionForClue(clueId);
    if (suspectSelect) {
      suspectSelect.value = currentConn ? currentConn.suspectId : "";
    }

    if (clueModal) {
      clueModal.classList.add('active');
      clueModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeClueModal() {
    if (clueModal) {
      clueModal.classList.remove('active');
      clueModal.setAttribute('aria-hidden', 'true');
    }
    activeClueId = null;
  }

  // Suspect Modal Handlers
  function openSuspectModal(suspectId) {
    activeSuspectId = suspectId;
    const suspect = window.CASE_DATA.suspects.find(s => s.id === suspectId);
    if (!suspect) return;

    if (modalSuspectRole) modalSuspectRole.textContent = suspect.role;
    if (modalSuspectName) modalSuspectName.textContent = suspect.name;
    if (modalSuspectPortrait) modalSuspectPortrait.innerHTML = getSuspectPortraitSVG(suspectId);
    if (modalSuspectProp) modalSuspectProp.textContent = suspect.prop;
    if (modalSuspectAlibi) modalSuspectAlibi.textContent = suspect.alibi;

    const state = window.caseStore.getState();
    const suspectConnections = state.connections.filter(c => c.suspectId === suspectId);

    if (modalSuspectConnection) {
      if (suspectConnections.length > 0) {
        const details = suspectConnections.map(conn => {
          const clue = window.CASE_DATA.clues.find(c => c.id === conn.clueId);
          const verdict = window.caseStore.getClueVerdict(conn.clueId) || 'NOT ASSESSED';
          return `${clue ? clue.title : 'CLUE'} [${verdict}]`;
        });
        modalSuspectConnection.textContent = `LINKED EVIDENCE: ${details.join(', ')}`;
      } else {
        modalSuspectConnection.textContent = "NO EVIDENCE CONNECTED";
      }
    }

    if (suspectModal) {
      suspectModal.classList.add('active');
      suspectModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeSuspectModal() {
    if (suspectModal) {
      suspectModal.classList.remove('active');
      suspectModal.setAttribute('aria-hidden', 'true');
    }
    activeSuspectId = null;
  }

  // Accusation Confirmation Modal Handlers
  function openAccusationModal() {
    const state = window.caseStore.getState();
    if (!state.accusedSuspectId) return;
    const suspect = window.CASE_DATA.suspects.find(s => s.id === state.accusedSuspectId);
    if (!suspect) return;

    const linkedCount = window.caseStore.getConnectionsForSuspectCount(suspect.id);
    const totalExamined = state.inspectedClues.length;

    let baseMessage = `You are about to submit your final deduction accusing ${suspect.name}. Are you certain?`;
    let softGuidance = "";

    if (linkedCount === 0) {
      softGuidance = ` You have not linked any evidence to this suspect yet. You can still submit, or go back and investigate.`;
    } else if (totalExamined < 3) {
      softGuidance = ` You have examined fewer than 3 clues overall (${totalExamined}/5 examined). You can still submit, or go back and investigate.`;
    }

    if (accusationModalText) {
      accusationModalText.textContent = baseMessage + softGuidance;
    }
    if (accusationModal) {
      accusationModal.classList.add('active');
      accusationModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeAccusationModal() {
    if (accusationModal) {
      accusationModal.classList.remove('active');
      accusationModal.setAttribute('aria-hidden', 'true');
    }
  }

  // Incorrect Deduction Modal Handlers
  function openIncorrectModal(suspectName) {
    const textEl = document.getElementById('incorrect-modal-text');
    if (textEl) {
      textEl.textContent = `The evidence collected does not support an accusation against ${suspectName}. The true culprit remains at large. All your connected evidence strings remain preserved.`;
    }
    if (incorrectModal) {
      incorrectModal.classList.add('active');
      incorrectModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeIncorrectModal() {
    if (incorrectModal) {
      incorrectModal.classList.remove('active');
      incorrectModal.setAttribute('aria-hidden', 'true');
    }
  }

  // Render Solved Case Summary Archive Page
  function renderSolvedSummary() {
    if (!summaryContainer) return;
    const reveal = window.CASE_DATA.culpritReveal;
    const culprit = window.CASE_DATA.suspects.find(s => s.id === reveal.culpritId);

    summaryContainer.innerHTML = `
      <div class="solved-stamp-banner">SOLVED</div>
      <div class="summary-title-block">
        <span class="summary-code">CASE ARCHIVE FILE 01 · CASE SOLVED</span>
        <h2 class="summary-main-title">AZURE ALIBI DOSSIER</h2>
      </div>

      <div class="summary-culprit-box">
        <span class="culprit-label">IDENTIFIED CULPRIT:</span>
        <h3 class="culprit-name">${culprit ? culprit.name : 'Prof. James Moriarty'}</h3>
        <p class="culprit-text">${reveal.summary}</p>
      </div>

      <h3 class="summary-section-title">RED HERRINGS BREAKDOWN & EXPLANATION</h3>
      <div class="red-herrings-list">
        ${reveal.redHerrings.map(rh => `
          <div class="herring-card">
            <div class="herring-suspect">${rh.suspect}</div>
            <div class="herring-detail">${rh.detail}</div>
          </div>
        `).join('')}
      </div>

      <h3 class="summary-section-title">EVIDENCE CLUES & MEANINGS</h3>
      <div class="red-herrings-list">
        ${window.CASE_DATA.clues.map(c => `
          <div class="herring-card">
            <div class="herring-suspect">${c.title}</div>
            <div class="herring-detail">${c.meaning || c.description}</div>
          </div>
        `).join('')}
      </div>

      <div class="summary-actions">
        <button class="btn-sticker" id="summary-review-board-btn" type="button">
          REVIEW CASE BOARD &gt;&gt;
        </button>
      </div>
    `;

    const reviewBtn = document.getElementById('summary-review-board-btn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        const boardEl = document.getElementById('board');
        if (boardEl) boardEl.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // Event Listeners Setup
  if (connectEvidenceBtn) {
    connectEvidenceBtn.addEventListener('click', () => {
      if (!activeClueId) return;
      const selectedSuspectId = suspectSelect ? suspectSelect.value : "";
      window.caseStore.setConnection(activeClueId, selectedSuspectId);
      closeClueModal();
    });
  }

  if (removeEvidenceBtn) {
    removeEvidenceBtn.addEventListener('click', () => {
      if (!activeClueId) return;
      window.caseStore.removeConnection(activeClueId);
      closeClueModal();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      window.caseStore.resetProgress();
    });
  }

  // Timeline Triggers
  if (boardViewTimelineBtn) boardViewTimelineBtn.addEventListener('click', openTimelineModal);
  if (deductionViewTimelineBtn) deductionViewTimelineBtn.addEventListener('click', openTimelineModal);
  if (timelineModalClose) timelineModalClose.addEventListener('click', closeTimelineModal);
  if (timelineModalOkBtn) timelineModalOkBtn.addEventListener('click', closeTimelineModal);

  // Deduction & Accusation Triggers
  if (submitDeductionBtn) {
    submitDeductionBtn.addEventListener('click', openAccusationModal);
  }

  if (confirmAccusationBtn) {
    confirmAccusationBtn.addEventListener('click', () => {
      closeAccusationModal();
      const state = window.caseStore.getState();
      const suspect = window.CASE_DATA.suspects.find(s => s.id === state.accusedSuspectId);
      const isCorrect = window.caseStore.submitDeduction(state.accusedSuspectId);

      if (isCorrect) {
        // Solved outcome
        renderSolvedSummary();
        const summaryEl = document.getElementById('summary');
        if (summaryEl) summaryEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Incorrect outcome
        openIncorrectModal(suspect ? suspect.name : "the suspect");
      }
    });
  }

  if (cancelAccusationBtn) cancelAccusationBtn.addEventListener('click', closeAccusationModal);
  if (accusationModalClose) accusationModalClose.addEventListener('click', closeAccusationModal);

  // Incorrect Modal Actions
  if (incorrectReturnBoardBtn) {
    incorrectReturnBoardBtn.addEventListener('click', () => {
      closeIncorrectModal();
      const boardEl = document.getElementById('board');
      if (boardEl) boardEl.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (incorrectTryAgainBtn) {
    incorrectTryAgainBtn.addEventListener('click', () => {
      closeIncorrectModal();
      const deductionEl = document.getElementById('deduction');
      if (deductionEl) deductionEl.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (incorrectModalClose) incorrectModalClose.addEventListener('click', closeIncorrectModal);

  // Modal Closures
  if (clueModalClose) clueModalClose.addEventListener('click', closeClueModal);
  if (suspectModalClose) suspectModalClose.addEventListener('click', closeSuspectModal);
  if (suspectModalOkBtn) suspectModalOkBtn.addEventListener('click', closeSuspectModal);

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeClueModal();
      closeSuspectModal();
      closeTimelineModal();
      closeAccusationModal();
      closeIncorrectModal();
    }
  });

  // Close modals on backdrop click
  [clueModal, suspectModal, timelineModal, accusationModal, incorrectModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeClueModal();
          closeSuspectModal();
          closeTimelineModal();
          closeAccusationModal();
          closeIncorrectModal();
        }
      });
    }
  });

  // Hidden Sapphire Trigger Handler
  const hiddenSapphireBtn = document.getElementById('hidden-sapphire-btn');
  if (hiddenSapphireBtn) {
    hiddenSapphireBtn.addEventListener('click', openCipherModal);
  }

  // Cipher Modal Controls
  let selectedCipherSlotIndex = 0;
  const cipherModal = document.getElementById('cipher-modal');
  const cipherModalClose = document.getElementById('cipher-modal-close');
  const cipherReturnBtn = document.getElementById('cipher-return-btn');
  const showDecodingKeyBtn = document.getElementById('show-decoding-key-btn');
  const needHintBtn = document.getElementById('need-hint-btn');

  function openCipherModal() {
    renderCipherPanel();
    if (cipherModal) {
      cipherModal.classList.add('active');
      cipherModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCipherModal() {
    if (cipherModal) {
      cipherModal.classList.remove('active');
      cipherModal.setAttribute('aria-hidden', 'true');
    }
  }

  function renderCipherPanel() {
    const displayEl = document.getElementById('cipher-symbols-display');
    const keyboardEl = document.getElementById('cipher-alphabet-grid');
    const state = window.caseStore.getState();
    const targetLetters = ["F", "I", "N", "D", "T", "H", "E", "K", "E", "Y"];

    if (displayEl) {
      displayEl.innerHTML = '';
      
      // Render slots for "FIND THE KEY"
      // Word 1: FIND (indices 0..3)
      // Word 2: THE (indices 4..6)
      // Word 3: KEY (indices 7..9)
      const wordGroups = [
        { start: 0, end: 3, label: 'FIND' },
        { start: 4, end: 6, label: 'THE' },
        { start: 7, end: 9, label: 'KEY' }
      ];

      wordGroups.forEach((group, gIdx) => {
        for (let i = group.start; i <= group.end; i++) {
          const letterTarget = targetLetters[i];
          const currentGuess = state.cipherGuesses[i] || "";
          const isSlotSelected = (selectedCipherSlotIndex === i);

          const slot = document.createElement('div');
          slot.className = `cipher-symbol-slot ${isSlotSelected ? 'selected' : ''}`;
          slot.setAttribute('tabindex', '0');
          slot.setAttribute('role', 'button');
          slot.setAttribute('aria-label', `Symbol ${i+1}, current letter ${currentGuess || 'empty'}`);

          slot.innerHTML = `
            ${getDancingManSVG(letterTarget)}
            <div class="cipher-letter-display">${currentGuess || '_'}</div>
          `;

          slot.addEventListener('click', () => {
            selectedCipherSlotIndex = i;
            renderCipherPanel();
          });
          slot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              selectedCipherSlotIndex = i;
              renderCipherPanel();
            }
          });
          displayEl.appendChild(slot);
        }

        // Add space between words
        if (gIdx < wordGroups.length - 1) {
          const spaceSlot = document.createElement('div');
          spaceSlot.className = 'cipher-symbol-slot space-slot';
          spaceSlot.setAttribute('aria-hidden', 'true');
          displayEl.appendChild(spaceSlot);
        }
      });
    }

    // Render A-Z Alphabet Keyboard
    if (keyboardEl) {
      keyboardEl.innerHTML = '';
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      alphabet.forEach(char => {
        const btn = document.createElement('button');
        btn.className = 'cipher-key-btn';
        btn.type = 'button';
        btn.textContent = char;
        btn.setAttribute('aria-label', `Select letter ${char}`);

        btn.addEventListener('click', () => {
          window.caseStore.setCipherGuess(selectedCipherSlotIndex, char);
          // Auto-advance selection
          selectedCipherSlotIndex = (selectedCipherSlotIndex + 1) % 10;
          renderCipherPanel();

          // Check if newly solved
          if (window.caseStore.getState().archiveUnlocked) {
            setTimeout(() => {
              closeCipherModal();
              scrollToTarget('archive');
              if (window.caseStore) window.caseStore.setScreen('archive');
            }, 400);
          }
        });
        keyboardEl.appendChild(btn);
      });
    }

    // Update Hint button label
    if (needHintBtn) {
      needHintBtn.textContent = `NEED A HINT? (${state.cipherHintsCount})`;
    }
  }

  if (showDecodingKeyBtn) {
    showDecodingKeyBtn.addEventListener('click', () => {
      window.caseStore.showCipherKey();
      renderCipherPanel();
      setTimeout(() => {
        closeCipherModal();
        scrollToTarget('archive');
        if (window.caseStore) window.caseStore.setScreen('archive');
      }, 400);
    });
  }

  if (needHintBtn) {
    needHintBtn.addEventListener('click', () => {
      window.caseStore.revealCipherHint();
      renderCipherPanel();
      if (window.caseStore.getState().archiveUnlocked) {
        setTimeout(() => {
          closeCipherModal();
          scrollToTarget('archive');
          if (window.caseStore) window.caseStore.setScreen('archive');
        }, 400);
      }
    });
  }

  if (cipherModalClose) cipherModalClose.addEventListener('click', closeCipherModal);
  if (cipherReturnBtn) cipherReturnBtn.addEventListener('click', closeCipherModal);

  // Archive Screen Buttons
  const archiveReviewDocBtn = document.getElementById('archive-review-doc-btn');
  const archiveReturnBoardBtn = document.getElementById('archive-return-board-btn');

  if (archiveReviewDocBtn) {
    archiveReviewDocBtn.addEventListener('click', () => {
      const doc = document.querySelector('.archive-document-card');
      if (doc) doc.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (archiveReturnBoardBtn) {
    archiveReturnBoardBtn.addEventListener('click', () => {
      scrollToTarget('board');
      if (window.caseStore) window.caseStore.setScreen('board');
    });
  }

  // Subscribe to state changes and initial render
  window.caseStore.subscribe(renderUI);
  renderUI();
}

/**
 * Dancing Men SVG Symbol Generator (9 Distinct Vector Figures)
 */
function getDancingManSVG(letter) {
  switch (letter) {
    case 'F':
      return `<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <path d="M 8 16 L 20 20 L 32 16"/>
        <line x1="20" y1="28" x2="12" y2="40"/>
        <line x1="20" y1="28" x2="28" y2="40"/>
      </svg>`;
    case 'I':
      return `<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <path d="M 20 18 L 32 14 L 32 24 Z" fill="#4FD1D9"/>
        <line x1="20" y1="28" x2="14" y2="40"/>
        <line x1="20" y1="28" x2="26" y2="40"/>
      </svg>`;
    case 'N':
      return `<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <line x1="20" y1="18" x2="8" y2="26"/>
        <line x1="20" y1="18" x2="32" y2="10"/>
        <line x1="20" y1="28" x2="12" y2="40"/>
        <line x1="20" y1="28" x2="28" y2="40"/>
      </svg>`;
    case 'D':
      return `<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <line x1="6" y1="18" x2="34" y2="18"/>
        <line x1="20" y1="28" x2="20" y2="42"/>
        <line x1="20" y1="28" x2="30" y2="34"/>
      </svg>`;
    case 'T':
      return `<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <path d="M 10 22 L 20 18 L 30 22"/>
        <line x1="20" y1="28" x2="12" y2="40"/>
        <line x1="20" y1="28" x2="28" y2="40"/>
      </svg>`;
    case 'H':
      return `<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="34" r="4"/>
        <line x1="20" y1="30" x2="20" y2="14"/>
        <line x1="20" y1="24" x2="8" y2="16"/>
        <line x1="20" y1="24" x2="32" y2="16"/>
        <line x1="20" y1="14" x2="10" y2="4"/>
        <line x1="20" y1="14" x2="30" y2="4"/>
      </svg>`;
    case 'E':
      return `<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="26"/>
        <path d="M 6 10 L 20 16 L 34 10"/>
        <path d="M 10 40 L 20 26 L 30 40"/>
      </svg>`;
    case 'K':
      return `<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="4"/>
        <line x1="20" y1="12" x2="20" y2="28"/>
        <line x1="20" y1="18" x2="10" y2="24"/>
        <line x1="20" y1="18" x2="32" y2="22"/>
        <line x1="20" y1="28" x2="12" y2="40"/>
        <line x1="20" y1="28" x2="34" y2="20"/>
      </svg>`;
    case 'Y':
      return `<svg class="cipher-svg-icon" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="10" r="4"/>
        <line x1="20" y1="14" x2="20" y2="30"/>
        <line x1="20" y1="18" x2="6" y2="6"/>
        <line x1="20" y1="18" x2="34" y2="6"/>
        <line x1="20" y1="30" x2="20" y2="42"/>
      </svg>`;
    default:
      return '';
  }
}



