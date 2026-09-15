/**
 * Akib Siddiki — Personal Portfolio JavaScript
 * Pure Vanilla JavaScript · Zero Dependencies · Accessible & High Performance
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. STICKY HEADER & SCROLL STATE
     -------------------------------------------------------------------------- */
  const header = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  function handleScroll() {
    const scrollY = window.scrollY;
    
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 450) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0.6';
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. MOBILE MENU & ACCESSIBILITY
     -------------------------------------------------------------------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close mobile menu on anchor click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* --------------------------------------------------------------------------
     3. SCROLL SPY (ACTIVE NAVIGATION ITEM)
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const dockLinks = document.querySelectorAll('.dock-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update Left Cyber-Dock active state
        dockLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update Mobile Drawer active state
        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  /* --------------------------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-element');

  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  /* --------------------------------------------------------------------------
     5. HERO SHOWCASE VIEW SWITCHER & TERMINAL TYPEWRITER
     -------------------------------------------------------------------------- */
  // Mode Switcher Tabs (Portrait vs Terminal)
  const tabPortrait = document.getElementById('hero-tab-portrait');
  const tabTerminal = document.getElementById('hero-tab-terminal');
  const panelPortrait = document.getElementById('hero-panel-portrait');
  const panelTerminal = document.getElementById('hero-panel-terminal');

  function switchHeroView(mode) {
    if (mode === 'portrait') {
      if (tabPortrait) {
        tabPortrait.classList.add('active');
        tabPortrait.setAttribute('aria-selected', 'true');
        tabPortrait.setAttribute('tabindex', '0');
      }
      if (tabTerminal) {
        tabTerminal.classList.remove('active');
        tabTerminal.setAttribute('aria-selected', 'false');
        tabTerminal.setAttribute('tabindex', '-1');
      }
      if (panelPortrait) {
        panelPortrait.classList.add('active');
        panelPortrait.removeAttribute('hidden');
      }
      if (panelTerminal) {
        panelTerminal.classList.remove('active');
        panelTerminal.setAttribute('hidden', '');
      }
    } else if (mode === 'terminal') {
      if (tabTerminal) {
        tabTerminal.classList.add('active');
        tabTerminal.setAttribute('aria-selected', 'true');
        tabTerminal.setAttribute('tabindex', '0');
      }
      if (tabPortrait) {
        tabPortrait.classList.remove('active');
        tabPortrait.setAttribute('aria-selected', 'false');
        tabPortrait.setAttribute('tabindex', '-1');
      }
      if (panelTerminal) {
        panelTerminal.classList.add('active');
        panelTerminal.removeAttribute('hidden');
      }
      if (panelPortrait) {
        panelPortrait.classList.remove('active');
        panelPortrait.setAttribute('hidden', '');
      }
    }
  }

  if (tabPortrait && tabTerminal) {
    tabPortrait.addEventListener('click', () => switchHeroView('portrait'));
    tabTerminal.addEventListener('click', () => switchHeroView('terminal'));

    // Keyboard navigation (Arrow keys between tabs)
    [tabPortrait, tabTerminal].forEach(btn => {
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          if (btn === tabPortrait) {
            tabTerminal.focus();
            switchHeroView('terminal');
          } else {
            tabPortrait.focus();
            switchHeroView('portrait');
          }
        }
      });
    });
  }

  // Synchronized Terminal Command Typewriter Effect
  const typedCommandEls = document.querySelectorAll('#typed-command, .t-typed-alt');
  if (typedCommandEls.length > 0 && !prefersReducedMotion) {
    const commands = [
      'explore --experience',
      'php artisan test --parallel',
      'flutter run -d release',
      'redis-cli PING # PONG',
      'mysql -u akib -e "SHOW STATUS;"'
    ];

    let cmdIndex = 0;
    let charIndex = commands[0].length;
    let isDeleting = false;
    let typingDelay = 120;

    function updateTypedText(text) {
      typedCommandEls.forEach(el => {
        el.textContent = text;
      });
    }

    function typeLoop() {
      const currentCommand = commands[cmdIndex];

      if (isDeleting) {
        const text = currentCommand.substring(0, charIndex - 1);
        updateTypedText(text);
        charIndex--;
        typingDelay = 45;
      } else {
        const text = currentCommand.substring(0, charIndex + 1);
        updateTypedText(text);
        charIndex++;
        typingDelay = 110;
      }

      if (!isDeleting && charIndex === currentCommand.length) {
        // Pause at complete command
        typingDelay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        cmdIndex = (cmdIndex + 1) % commands.length;
        typingDelay = 500;
      }

      setTimeout(typeLoop, typingDelay);
    }

    // Start typing after initial display delay
    setTimeout(typeLoop, 2000);
  }

  /* --------------------------------------------------------------------------
     6. AMBIENT SPOTLIGHT & DESKTOP CUSTOM CURSOR
     -------------------------------------------------------------------------- */
  const ambientSpotlight = document.getElementById('ambient-spotlight');
  let spotlightTicking = false;

  window.addEventListener('mousemove', (e) => {
    if (!spotlightTicking && ambientSpotlight) {
      window.requestAnimationFrame(() => {
        ambientSpotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
        ambientSpotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
        spotlightTicking = false;
      });
      spotlightTicking = true;
    }
  }, { passive: true });

  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('cursor-dot');
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth < 768;

  if (cursor && cursorDot && !isTouchDevice && !prefersReducedMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isCursorVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isCursorVisible) {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
        isCursorVisible = true;
      }

      // Keep small dot locked precisely to mouse
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
      isCursorVisible = false;
    });

    // Smooth animation loop for trailing outer circle
    function animateCursor() {
      const ease = 0.18;
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on links and buttons
    const hoverTargets = document.querySelectorAll('a, button, .tech-item, .stat-box, .channel-card, .term-exec-btn');
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      target.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  /* --------------------------------------------------------------------------
     7. DHAKA REAL-TIME CLOCK (UTC+6)
     -------------------------------------------------------------------------- */
  const dhakaClockEl = document.getElementById('dhaka-clock');
  const contactClockEl = document.getElementById('contact-local-clock');

  function updateDhakaTime() {
    try {
      const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const timeStr = `${formatter.format(new Date())} BST`;
      if (dhakaClockEl) dhakaClockEl.textContent = timeStr;
      if (contactClockEl) contactClockEl.textContent = timeStr;
    } catch (e) {
      // Fallback
      const d = new Date();
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const dhakaTime = new Date(utc + (3600000 * 6));
      const fallbackStr = dhakaTime.toLocaleTimeString() + ' BST';
      if (dhakaClockEl) dhakaClockEl.textContent = fallbackStr;
      if (contactClockEl) contactClockEl.textContent = fallbackStr;
    }
  }

  updateDhakaTime();
  setInterval(updateDhakaTime, 1000);

  /* --------------------------------------------------------------------------
     8. EMAIL COPY TO CLIPBOARD & TOAST SYSTEM
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toastContainer = document.getElementById('toast-container');

  function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent);">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 2800);
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.setAttribute('readonly', '');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('Copied to clipboard!');
    } catch (err) {
      showToast('akib.siddiki@gmail.com');
    }
    document.body.removeChild(tempInput);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'akib.siddiki@gmail.com';

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email)
          .then(() => {
            showToast('Email copied to clipboard!');
          })
          .catch(() => {
            fallbackCopy(email);
          });
      } else {
        fallbackCopy(email);
      }
    });
  }

  /* --------------------------------------------------------------------------
     9. INTERACTIVE CONTACT TERMINAL DISPATCHER
     -------------------------------------------------------------------------- */
  const termForm = document.getElementById('terminal-contact-form');
  const termNameInput = document.getElementById('term-sender-name');
  const termEmailInput = document.getElementById('term-sender-email');
  const termTypeSelect = document.getElementById('term-project-type');
  const termMsgInput = document.getElementById('term-message-body');
  const termSubmitBtn = document.getElementById('term-submit-btn');
  const termCopyBtn = document.getElementById('term-copy-payload-btn');
  const termLogScreen = document.getElementById('term-log-screen');

  function appendTermLog(text, type = 'normal') {
    if (!termLogScreen) return;
    const row = document.createElement('div');
    row.className = 'term-log-row';

    let dotColor = 'var(--accent)';
    let textClass = '';
    if (type === 'success') {
      dotColor = '#27C93F';
      textClass = 'success';
    } else if (type === 'warning') {
      dotColor = '#FFBD2E';
      textClass = 'warning';
    } else if (type === 'info') {
      dotColor = 'var(--accent)';
      textClass = 'info';
    }

    row.innerHTML = `
      <span class="log-cursor-dot" style="background: ${dotColor};" aria-hidden="true"></span>
      <span class="log-text ${textClass}">${text}</span>
    `;
    termLogScreen.appendChild(row);
    termLogScreen.scrollTop = termLogScreen.scrollHeight;
  }

  if (termForm) {
    termForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (termNameInput ? termNameInput.value.trim() : '') || 'Anonymous';
      const email = (termEmailInput ? termEmailInput.value.trim() : '') || 'sender@example.com';
      const projectType = termTypeSelect ? termTypeSelect.value : 'Full-Stack Inquiry';
      const message = (termMsgInput ? termMsgInput.value.trim() : '');

      if (!message) {
        appendTermLog('! Error: Message payload empty. Write project requirements first.', 'warning');
        if (termMsgInput) termMsgInput.focus();
        return;
      }

      // Display terminal execution sequence
      appendTermLog(`> Initializing transmission handshake for "${name}" <${email}>...`, 'info');
      if (termSubmitBtn) termSubmitBtn.disabled = true;

      setTimeout(() => {
        appendTermLog(`> Encoding payload [Type: ${projectType}] [Chars: ${message.length}]... [OK]`, 'normal');
      }, 350);

      setTimeout(() => {
        appendTermLog('> Launching client mail gateway handshake... [SUCCESS]', 'success');

        // Formulate mailto link
        const subject = `[Inquiry] ${projectType} — from ${name}`;
        const body = `Hi Akib,\n\nI am contacting you through your portfolio terminal:\n\nSender Name: ${name}\nEmail: ${email}\nDomain / Role: ${projectType}\n\nProject Brief:\n${message}\n\n---\nSent via Portfolio Terminal (akib.siddiki@gmail.com)`;

        const mailtoUrl = `mailto:akib.siddiki@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoUrl;
        showToast('Opening mail client to complete dispatch!');

        if (termSubmitBtn) {
          termSubmitBtn.disabled = false;
        }
      }, 800);
    });
  }

  if (termCopyBtn) {
    termCopyBtn.addEventListener('click', () => {
      const name = (termNameInput ? termNameInput.value.trim() : '') || 'Anonymous';
      const email = (termEmailInput ? termEmailInput.value.trim() : '') || 'sender@example.com';
      const projectType = termTypeSelect ? termTypeSelect.value : 'Full-Stack Inquiry';
      const message = (termMsgInput ? termMsgInput.value.trim() : '') || '(No brief text entered)';

      const payload = `TO: akib.siddiki@gmail.com\nFROM: ${name} <${email}>\nSUBJECT: [Inquiry] ${projectType} — from ${name}\nCATEGORY: ${projectType}\n\nBRIEF:\n${message}\n\n---\nGenerated by Akib Siddiki Portfolio Terminal`;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(payload)
          .then(() => {
            appendTermLog('> Message payload copied to clipboard buffer. [OK]', 'success');
            showToast('Message payload copied to clipboard!');
          })
          .catch(() => {
            fallbackCopy(payload);
            appendTermLog('> Payload copied to buffer via fallback. [OK]', 'success');
          });
      } else {
        fallbackCopy(payload);
        appendTermLog('> Payload copied to buffer via fallback. [OK]', 'success');
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. THEME SWITCHER CONTROLLER (LIGHT / DARK)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');

  function updateThemeAria(theme) {
    const label = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', label);
      themeToggleBtn.setAttribute('title', label);
    }
    if (mobileThemeToggleBtn) {
      mobileThemeToggleBtn.setAttribute('aria-label', label);
      mobileThemeToggleBtn.setAttribute('title', label);
    }
  }

  function applyTheme(theme, showNotification = false) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Ignore storage restrictions
    }
    updateThemeAria(theme);
    if (showNotification) {
      showToast(theme === 'light' ? 'Theme: Light Mode active' : 'Theme: Dark Mode active');
    }
  }

  function handleThemeToggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme, true);
  }

  const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeAria(activeTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', handleThemeToggle);
  }

  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', handleThemeToggle);
  }

  // Sync with OS preference changes if no manual preference stored
  try {
    const osColorQuery = window.matchMedia('(prefers-color-scheme: dark)');
    osColorQuery.addEventListener('change', (e) => {
      let saved = null;
      try {
        saved = localStorage.getItem('theme');
      } catch (err) {}
      if (!saved) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  } catch (e) {}

  /* --------------------------------------------------------------------------
     11. FLOATING TECH CONSTELLATION NETWORK GRAPH
     -------------------------------------------------------------------------- */
  const constellationContainer = document.getElementById('tech-constellation');
  const constellationCanvas = document.getElementById('tech-constellation-canvas');

  if (constellationContainer && constellationCanvas) {
    const ctx = constellationCanvas.getContext('2d');
    const nodes = Array.from(constellationContainer.querySelectorAll('.tech-float-node'));
    
    // Key-to-Element map
    const nodeMap = new Map();
    nodes.forEach(node => {
      const key = node.getAttribute('data-tech');
      if (key) nodeMap.set(key, node);
    });

    // Architectural synapse connections
    const connections = [
      ['laravel', 'php'],
      ['laravel', 'mysql'],
      ['laravel', 'postgres'],
      ['laravel', 'redis'],
      ['laravel', 'rest'],
      ['laravel', 'docker'],
      ['laravel', 'sslcommerz'],
      ['php', 'git'],
      ['php', 'sslcommerz'],
      ['sslcommerz', 'javascript'],
      ['sslcommerz', 'rest'],
      ['mysql', 'postgres'],
      ['mysql', 'redis'],
      ['redis', 'docker'],
      ['docker', 'aws'],
      ['docker', 'git'],
      ['rest', 'javascript'],
      ['rest', 'flutter'],
      ['rest', 'aws'],
      ['javascript', 'tailwind'],
      ['flutter', 'dart'],
      ['flutter', 'firebase'],
      ['aws', 'firebase']
    ];

    // Animated data pulse packets along each connection
    const packets = connections.map((_, i) => ({
      speed: 0.00045 + (i % 5) * 0.00012,
      offset: (i * 0.23) % 1,
      size: 2.2 + (i % 3) * 0.6
    }));

    let hoveredTech = null;
    let animFrameId = null;
    let isVisible = false;
    let width = 0;
    let height = 0;
    let dpr = 1;

    function resizeCanvas() {
      const rect = constellationContainer.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      constellationCanvas.width = width * dpr;
      constellationCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Node interaction events
    nodes.forEach(node => {
      const key = node.getAttribute('data-tech');
      node.addEventListener('mouseenter', () => {
        hoveredTech = key;
        node.classList.add('is-active');
        // Highlight connected neighbor nodes
        connections.forEach(([a, b]) => {
          if (a === key && nodeMap.has(b)) nodeMap.get(b).classList.add('is-active');
          if (b === key && nodeMap.has(a)) nodeMap.get(a).classList.add('is-active');
        });
      });
      node.addEventListener('mouseleave', () => {
        hoveredTech = null;
        nodes.forEach(n => n.classList.remove('is-active'));
      });
      node.addEventListener('focus', () => {
        hoveredTech = key;
        node.classList.add('is-active');
      });
      node.addEventListener('blur', () => {
        hoveredTech = null;
        nodes.forEach(n => n.classList.remove('is-active'));
      });
    });

    function draw(time) {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const containerRect = constellationContainer.getBoundingClientRect();

      // Theme colors matching the site
      const defaultLineColor = isLight ? 'rgba(220, 38, 38, 0.16)' : 'rgba(255, 46, 46, 0.22)';
      const activeLineColor = isLight ? 'rgba(220, 38, 38, 0.85)' : 'rgba(255, 46, 46, 0.95)';
      const packetColor = isLight ? '#dc2626' : '#ff2e2e';
      const glowColor = isLight ? 'rgba(220, 38, 38, 0.45)' : 'rgba(255, 46, 46, 0.65)';

      // Calculate real-time center points of each node (tracking CSS float movement)
      const positions = new Map();
      nodes.forEach(node => {
        const key = node.getAttribute('data-tech');
        const rect = node.getBoundingClientRect();
        positions.set(key, {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2
        });
      });

      // 1. Draw connecting lines
      connections.forEach(([a, b]) => {
        const posA = positions.get(a);
        const posB = positions.get(b);
        if (!posA || !posB) return;

        const isConnectedToHover = hoveredTech && (a === hoveredTech || b === hoveredTech);
        const isDimmed = hoveredTech && !isConnectedToHover;

        ctx.beginPath();
        ctx.moveTo(posA.x, posA.y);
        ctx.lineTo(posB.x, posB.y);

        if (isConnectedToHover) {
          ctx.strokeStyle = activeLineColor;
          ctx.lineWidth = 2.4;
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = 10;
        } else {
          ctx.strokeStyle = isDimmed ? (isLight ? 'rgba(220, 38, 38, 0.05)' : 'rgba(255, 46, 46, 0.07)') : defaultLineColor;
          ctx.lineWidth = 1.2;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 2. Draw animated traveling photon data packets
      if (!prefersReducedMotion) {
        connections.forEach(([a, b], idx) => {
          const posA = positions.get(a);
          const posB = positions.get(b);
          if (!posA || !posB) return;

          const packet = packets[idx];
          const progress = (time * packet.speed + packet.offset) % 1;
          const px = posA.x + (posB.x - posA.x) * progress;
          const py = posA.y + (posB.y - posA.y) * progress;

          const isConnectedToHover = hoveredTech && (a === hoveredTech || b === hoveredTech);

          ctx.beginPath();
          ctx.arc(px, py, isConnectedToHover ? packet.size * 1.5 : packet.size, 0, Math.PI * 2);
          ctx.fillStyle = packetColor;
          if (isConnectedToHover) {
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = 8;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animFrameId = requestAnimationFrame(draw);
    }

    // Performance: Pause when section is scrolled out of view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          resizeCanvas();
          if (!animFrameId) animFrameId = requestAnimationFrame(draw);
        } else {
          if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
          }
        }
      });
    }, { threshold: 0.05 });

    observer.observe(constellationContainer);
  }

})();

