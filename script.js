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

    // 1. Initial State: Scene 1 visible
    if (scene) {
      tl.set(scene, { opacity: 1, filter: 'brightness(1) contrast(1)' }, 0);
    }

    // 2. Black screen flickers on like an old CRT (0.0s - 0.35s)
    // - Quick horizontal line expanding to full screen width
    if (crtBeam) {
      tl.fromTo(crtBeam,
        { scaleX: 0, scaleY: 1, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.12, ease: 'power4.inOut' },
        0
      );
      // - Expands vertically to full screen
      tl.to(crtBeam,
        { scaleY: 600, opacity: 0.9, duration: 0.15, ease: 'power2.in' },
        0.12
      );
      // - Fade out beam as full picture stabilizes
      tl.to(crtBeam, { opacity: 0, duration: 0.08 }, 0.27);
    }

    // - Brief brightness jitter & flash strobe
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
    // Note: Fog remains active across all later scenes!
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
    if (scene) {
      tl.set(scene, { opacity: 0 })
        .to(scene, { opacity: 1, duration: 0.35, ease: 'power2.inOut' })
        .to(scene, { duration: 1.3 }) // Scene 5 duration hold
        .to(scene, { opacity: 0, duration: 0.35, ease: 'power2.inOut' });
    } else {
      tl.to({}, { duration: 2.0 });
    }
    return tl;
  }

  function buildScene6() {
    const tl = gsap.timeline();
    const scene = document.getElementById('scene6');
    if (scene) {
      tl.set(scene, { opacity: 0 })
        .to(scene, { opacity: 1, duration: 0.35, ease: 'power2.inOut' })
        .to(scene, { duration: 1.3 }) // Scene 6 duration hold
        .to(scene, { opacity: 0, duration: 0.35, ease: 'power2.inOut' });
    } else {
      tl.to({}, { duration: 2.0 });
    }
    return tl;
  }

  function buildScene7() {
    const tl = gsap.timeline();
    const scene = document.getElementById('scene7');
    if (scene) {
      tl.set(scene, { opacity: 0 })
        .to(scene, { opacity: 1, duration: 0.35, ease: 'power2.inOut' })
        .to(scene, { duration: 1.3 }) // Scene 7 duration hold
        .to(scene, { opacity: 0, duration: 0.35, ease: 'power2.inOut' });
    } else {
      tl.to({}, { duration: 2.0 });
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

    if (prefersReducedMotion) {
      if (introScreen) {
        introScreen.style.display = 'none';
        introScreen.setAttribute('aria-hidden', 'true');
      }
      if (mainSection) {
        mainSection.style.display = 'block';
      }
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    } else {
      if (introScreen) {
        gsap.to(introScreen, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            introScreen.style.display = 'none';
            introScreen.setAttribute('aria-hidden', 'true');
            if (mainSection) {
              mainSection.style.display = 'block';
            }
            if (typeof ScrollTrigger !== 'undefined') {
              ScrollTrigger.refresh();
            }
          }
        });
      }
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
    { id: 'main', name: 'DOSSIER' },
    { id: 'case', name: 'CASES' },
    { id: 'evidence', name: 'EVIDENCE' },
    { id: 'footer', name: 'CONTACT' }
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

    // Handle bottom of page / footer
    ScrollTrigger.create({
      trigger: '#footer',
      start: 'top 80%',
      end: 'bottom bottom',
      onEnter: () => setActiveSection('footer'),
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

  // "OPEN THE CASE" button interaction
  if (openCaseBtn) {
    openCaseBtn.addEventListener('click', () => {
      // Directs to the Cases section
      scrollToTarget('case');
    });
  }
});
