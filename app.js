// Live To Dare Life - Interactive Features & Lead Handling
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // Lead Modal Controls
  const modal = document.getElementById('leadModal');
  const openModalBtns = document.querySelectorAll('.trigger-lead-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  const modalOpportunitySelect = document.getElementById('modalSelectedOpportunity');

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const oppPrefill = btn.getAttribute('data-opp') || 'both';
      if (modalOpportunitySelect) {
        modalOpportunitySelect.value = oppPrefill;
      }
      openModal();
    });
  });

  closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal();
    });
  });

  // Close when clicking background
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Handle Form Submissions (Both Embedded & Modal)
  setupLeadForm('embeddedLeadForm', 'embeddedSuccessMsg');
  setupLeadForm('modalLeadForm', 'modalSuccessMsg');

  function setupLeadForm(formId, successMsgId) {
    const form = document.getElementById(formId);
    const successMsg = document.getElementById(successMsgId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Submitting & Connecting...';
      submitBtn.disabled = true;

      // Extract values
      const formData = new FormData(form);
      const name = formData.get('fullName') || 'Aspiring Partner';
      const phone = formData.get('phoneNumber') || '';
      const opp = formData.get('opportunity') || 'Salesbeez & Subham EV';
      const prefTime = formData.get('prefTime') || 'Anytime';

      // Simulate instantaneous processing & lead save
      setTimeout(() => {
        // Hide form inputs and display high-impact confirmation
        form.style.display = 'none';
        if (successMsg) {
          successMsg.style.display = 'block';
        }

        // WhatsApp Direct Link Option for Immediate Conversation
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const adminPhone = '919347965863';
        const encodedText = encodeURIComponent(
          `Hello Live To Dare Life team! I just applied on your landing page.\n\n` +
          `👤 Name: ${name}\n` +
          `📞 Phone: ${phone}\n` +
          `💼 Selected Opportunity: ${opp}\n` +
          `⏰ Preferred Call Time: ${prefTime}\n\n` +
          `I am ready to get started and build my wealth!`
        );

        const waLink = `https://wa.me/${adminPhone}?text=${encodedText}`;
        
        // Add one-click WhatsApp action inside success block if element exists
        const waContainer = successMsg ? successMsg.querySelector('.wa-action-box') : null;
        if (waContainer) {
          waContainer.innerHTML = `
            <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:16px; width:100%;">
              ⚡ Click Here to Connect Instantly on WhatsApp
            </a>
          `;
        }

        // Re-enable in case form resets later
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 700);
    });
  }

  // FAQ Accordion Toggle
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach((card) => {
    const trigger = card.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        // Close others
        faqCards.forEach(c => c.classList.remove('active'));
        if (!isActive) {
          card.classList.add('active');
        }
      });
    }
  });

  // Smooth Scroll Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if opened
        if (navLinks && navLinks.classList.contains('mobile-open')) {
          navLinks.classList.remove('mobile-open');
        }
      }
    });
  });

  // --- Business Guide Tab Switcher ---
  const guideTabs = document.querySelectorAll('.guide-tab-btn');
  const guideContents = document.querySelectorAll('.guide-tab-content');

  guideTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      guideTabs.forEach(t => t.classList.remove('active'));
      guideContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // --- Interactive Income Calculator Logic ---
  const directSlider = document.getElementById('directSlider');
  const directCountDisp = document.getElementById('directCountDisp');
  const calcPlanSelect = document.getElementById('calcPlanSelect');
  const planTypeDisp = document.getElementById('planTypeDisp');
  const dispDirectBonus = document.getElementById('dispDirectBonus');
  const dispMonthlyOverride = document.getElementById('dispMonthlyOverride');
  const dispUnlockedReward = document.getElementById('dispUnlockedReward');

  function updateCalculator() {
    if (!directSlider || !calcPlanSelect) return;
    const count = parseInt(directSlider.value, 10);
    const plan = calcPlanSelect.value;

    directCountDisp.textContent = `${count} Members`;

    let directBonus = 0;
    let monthlyOverride = 0;
    let rewardTier = '';

    if (plan === 'salesbeez') {
      planTypeDisp.textContent = 'Salesbeez (₹2,000)';
      // Salesbeez 5% on 10 orders (₹20,000) = ₹1,000 per ME promoted
      directBonus = count * 1200;
      monthlyOverride = Math.round(count * 3800 * 1.5);
      if (count >= 20) {
        rewardTier = 'Car / ₹5 Lakhs Cash';
      } else if (count >= 10) {
        rewardTier = 'Bike / ₹1 Lakh Cash';
      } else if (count >= 5) {
        rewardTier = 'Goa Trip / ₹25,000 Cash';
      } else {
        rewardTier = 'Mobile Phone (₹10,000)';
      }
    } else if (plan === 'subham') {
      planTypeDisp.textContent = 'Subham EV (₹15,000)';
      // Subham EV: ₹5,000 direct + ₹3,000 per pair
      const pairs = Math.floor(count / 2);
      directBonus = (count * 5000) + (pairs * 3000);
      monthlyOverride = pairs * 9500 + 15000;
      if (count >= 25) {
        rewardTier = 'MG-1 EV Scooter & Car Bonus';
      } else if (count >= 12) {
        rewardTier = 'Luxury Dubai Retreat';
      } else if (count >= 6) {
        rewardTier = 'Flagship Smartphone';
      } else {
        rewardTier = 'Cash Match Bonuses';
      }
    } else {
      planTypeDisp.textContent = 'Dual / Combined';
      const pairs = Math.floor(count / 2);
      directBonus = (count * 6200) + (pairs * 3000);
      monthlyOverride = Math.round((pairs * 12000) + (count * 4500));
      if (count >= 20) {
        rewardTier = 'Brand New EV Scooter + Luxury Car';
      } else if (count >= 10) {
        rewardTier = 'International Trip + Smartphone';
      } else if (count >= 5) {
        rewardTier = 'Goa Retreat + Smartphone';
      } else {
        rewardTier = 'Cash Milestone Bonus';
      }
    }

    dispDirectBonus.textContent = `₹${directBonus.toLocaleString('en-IN')}`;
    dispMonthlyOverride.textContent = `₹${monthlyOverride.toLocaleString('en-IN')}/mo`;
    dispUnlockedReward.textContent = rewardTier;
  }

  if (directSlider && calcPlanSelect) {
    directSlider.addEventListener('input', updateCalculator);
    calcPlanSelect.addEventListener('change', updateCalculator);
    updateCalculator();
  }

  // --- Smart Sales Advisor Interactive Drawer ---
  const advisorDrawer = document.getElementById('advisorDrawer');
  const openAdvisorBtn = document.getElementById('openAdvisorBtn');
  const closeAdvisorBtn = document.getElementById('closeAdvisorBtn');
  const advisorBody = document.getElementById('advisorBody');
  const advisorInput = document.getElementById('advisorInput');
  const advisorSendBtn = document.getElementById('advisorSendBtn');

  if (openAdvisorBtn && advisorDrawer) {
    openAdvisorBtn.addEventListener('click', () => {
      advisorDrawer.classList.toggle('open');
      if (advisorDrawer.classList.contains('open')) {
        advisorBody.scrollTop = advisorBody.scrollHeight;
      }
    });
  }

  if (closeAdvisorBtn && advisorDrawer) {
    closeAdvisorBtn.addEventListener('click', () => {
      advisorDrawer.classList.remove('open');
    });
  }

  // Quick Chips in Advisor
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('advisor-chip-btn')) {
      const goal = e.target.getAttribute('data-goal');
      handleAdvisorAction(goal, e.target.textContent);
    }
  });

  function addAdvisorMessage(text, isUser = false) {
    if (!advisorBody) return;
    const msg = document.createElement('div');
    msg.className = `advisor-msg ${isUser ? 'user' : 'bot'}`;
    msg.innerHTML = text;
    advisorBody.appendChild(msg);
    advisorBody.scrollTop = advisorBody.scrollHeight;
  }

  function handleAdvisorAction(goal, label) {
    addAdvisorMessage(label, true);

    setTimeout(() => {
      if (goal === 'salesbeez') {
        addAdvisorMessage(
          `🐝 <strong>Salesbeez Overview (₹2,000)</strong>:<br>` +
          `• Hyperlocal instant grocery & e-commerce model.<br>` +
          `• Start with just 10 orders to become Marketing Executive (5% commission).<br>` +
          `• Win Bonanza prizes from Smartphone (₹10K) up to Fortuner (₹60 Lakhs) & ₹3 Cr Retirement Villa.<br>` +
          `<a href="Salesbeez_Marketing_Plan.pdf" download class="btn btn-secondary btn-sm" style="margin-top:8px; display:inline-block;">⬇ Download Salesbeez PDF</a>` +
          `<a href="https://wa.me/919347965863?text=Hi%2C%20tell%20me%20how%20to%20start%20Salesbeez%20now" target="_blank" class="btn btn-primary btn-sm" style="margin-top:8px; display:inline-block; margin-left:6px;">💬 Join on WhatsApp</a>`
        );
      } else if (goal === 'subham') {
        addAdvisorMessage(
          `⚡ <strong>Subham EV Overview (₹15,000)</strong>:<br>` +
          `• Partnership with MG-1 EV Bikes & Autos Marketing Pvt Ltd.<br>` +
          `• Get ID + Magnetic Mattress (₹15,000 credited back when buying an EV Bike).<br>` +
          `• Earn <strong>₹13,000 on your first 2 members</strong> (₹5K + ₹5K direct + ₹3K matching)!<br>` +
          `• Daily cap: <strong>₹50,000 / day</strong> (₹15 Lakhs/month).<br>` +
          `<a href="Subham_EV_Plan.pdf" download class="btn btn-secondary btn-sm" style="margin-top:8px; display:inline-block;">⬇ Download Subham EV PDF</a>` +
          `<a href="https://wa.me/919347965863?text=Hi%2C%20tell%20me%20how%20to%20join%20Subham%20EV%20now" target="_blank" class="btn btn-primary btn-sm" style="margin-top:8px; display:inline-block; margin-left:6px;">💬 Join on WhatsApp</a>`
        );
      } else if (goal === 'compare') {
        addAdvisorMessage(
          `⚖️ <strong>Which Plan Is Right For You?</strong><br><br>` +
          `• <strong>Choose Salesbeez (₹2,000)</strong> if you want an ultra-low entry point, quick beginner wins, and e-commerce grocery distribution.<br>` +
          `• <strong>Choose Subham EV (₹15,000)</strong> if you want high-ticket payouts (₹5,000 per referral), EV scooter rewards, and up to ₹50,000/day passive caps.<br>` +
          `• <strong>Best Choice: Dual Strategy</strong> — start with ₹2,000 to validate, and reinvest immediate earnings into Subham EV for maximum growth!`
        );
      } else if (goal === 'pdf') {
        addAdvisorMessage(
          `📄 <strong>Official Verified Presentations:</strong><br><br>` +
          `1. <a href="Salesbeez_Marketing_Plan.pdf" download style="color:var(--cyan-accent); font-weight:700;">Salesbeez Marketing Plan.pdf (8 Pages)</a><br>` +
          `2. <a href="Subham_EV_Plan.pdf" download style="color:var(--gold-solid); font-weight:700;">Subham EV Business Plan.pdf (21 Pages)</a><br><br>` +
          `Need someone to walk you through the slides? <a href="https://wa.me/919347965863?text=Hi%2C%20please%20walk%20me%20through%20both%20PDF%20plans" target="_blank" style="color:#25D366; font-weight:700;">Click to chat on WhatsApp (+91 9347965863)</a>.`
        );
      } else if (goal === 'whatsapp') {
        window.open('https://wa.me/919347965863?text=Hello%20Live%20To%20Dare%20Life%20leadership%2C%20I%20want%20direct%20guidance%20on%20joining%20your%20team.', '_blank');
        addAdvisorMessage(`🚀 Opening WhatsApp to connect with senior leadership at <strong>+91 9347965863</strong>...`);
      }
    }, 400);
  }

  if (advisorSendBtn && advisorInput) {
    const sendMessage = () => {
      const val = advisorInput.value.trim();
      if (!val) return;
      addAdvisorMessage(val, true);
      advisorInput.value = '';

      setTimeout(() => {
        const lower = val.toLowerCase();
        if (lower.includes('pdf') || lower.includes('plan') || lower.includes('document')) {
          handleAdvisorAction('pdf', 'Download PDF Plans');
        } else if (lower.includes('salesbeez') || lower.includes('2000') || lower.includes('grocery')) {
          handleAdvisorAction('salesbeez', 'Salesbeez Details');
        } else if (lower.includes('ev') || lower.includes('subham') || lower.includes('15000') || lower.includes('bike')) {
          handleAdvisorAction('subham', 'Subham EV Details');
        } else if (lower.includes('call') || lower.includes('phone') || lower.includes('contact') || lower.includes('whatsapp') || lower.includes('number')) {
          addAdvisorMessage(
            `📞 You can reach our leadership directly:<br>` +
            `• <strong>Phone:</strong> <a href="tel:+919347965863" style="color:var(--gold-solid);">+91 9347965863</a><br>` +
            `• <strong>WhatsApp:</strong> <a href="https://wa.me/919347965863" target="_blank" style="color:#25D366;">Chat Instantly on WhatsApp</a>`
          );
        } else {
          addAdvisorMessage(
            `Thanks for your question! Both Salesbeez (₹2,000) and Subham EV (₹15,000) offer daily payouts and direct mentorship.<br><br>` +
            `Would you like to speak 1-on-1 with our team leader right now? ` +
            `<a href="https://wa.me/919347965863?text=Hello%2C%20I%20have%20questions%20regarding%20${encodeURIComponent(val)}" target="_blank" class="btn btn-primary btn-sm" style="margin-top:8px; display:inline-block;">⚡ Chat on WhatsApp (+91 9347965863)</a>`
          );
        }
      }, 500);
    };

    advisorSendBtn.addEventListener('click', sendMessage);
    advisorInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // ============================================================
  // CINEMATIC LION INTRO SEQUENCE & AUDIO-VISUAL ENGINE
  // ============================================================
  initCinematicIntro();

  function initCinematicIntro() {
    const overlay = document.getElementById('cinematicIntroOverlay');
    const walkingStage = document.getElementById('lionWalkingStage');
    const runningStage = document.getElementById('lionRunningStage');
    const roarStage = document.getElementById('lionRoarStage');
    const logoStage = document.getElementById('introLogoStage');
    const skipBtn = document.getElementById('skipIntroBtn');
    const canvas = document.getElementById('introSparksCanvas');
    const subtitleElem = document.getElementById('subtitleText');
    const audioToggleBtn = document.getElementById('introAudioToggleBtn');
    const audioToggleIcon = document.getElementById('audioToggleIcon');
    const audioToggleLabel = document.getElementById('audioToggleLabel');

    if (!overlay) return;

    // Prevent body scrolling during intro
    document.body.style.overflow = 'hidden';

    // Spark & Fireflies Particles animation on canvas
    let sparksRunning = true;
    if (canvas) {
      initSparksCanvas(canvas, () => sparksRunning);
    }

    let soundEnabled = true;
    let audioCtx = null;
    let forestAmbienceGain = null;
    let isEnded = false;
    let introTimers = [];

    // --- Web Audio API: Forest Ambiance, Jungle Wind, Steps & Lion Roar ---
    function ensureAudioContext() {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          audioCtx = new AudioContext();
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    // Deep Jungle Wind & Forest Sub-bass Drone
    function startForestAmbience() {
      if (!soundEnabled) return;
      try {
        ensureAudioContext();
        if (!audioCtx) return;

        forestAmbienceGain = audioCtx.createGain();
        forestAmbienceGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        forestAmbienceGain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 1.8);
        forestAmbienceGain.connect(audioCtx.destination);

        // Low resonant drone (deep trees & wilderness mystery)
        const droneOsc = audioCtx.createOscillator();
        droneOsc.type = 'sine';
        droneOsc.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note
        droneOsc.frequency.exponentialRampToValueAtTime(45, audioCtx.currentTime + 8.0);

        const droneFilter = audioCtx.createBiquadFilter();
        droneFilter.type = 'lowpass';
        droneFilter.frequency.setValueAtTime(140, audioCtx.currentTime);

        droneOsc.connect(droneFilter);
        droneFilter.connect(forestAmbienceGain);
        droneOsc.start();

        // White noise filtered to sound like distant forest wind & foliage rustling
        const bufferSize = audioCtx.sampleRate * 4;
        const windBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = windBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.4;
        }

        const windSource = audioCtx.createBufferSource();
        windSource.buffer = windBuffer;
        windSource.loop = true;

        const windFilter = audioCtx.createBiquadFilter();
        windFilter.type = 'bandpass';
        windFilter.frequency.setValueAtTime(220, audioCtx.currentTime);
        windFilter.Q.setValueAtTime(3.0, audioCtx.currentTime);

        windSource.connect(windFilter);
        windFilter.connect(forestAmbienceGain);
        windSource.start();

        // Slow soft deep thud for lion footsteps in forest
        scheduleFootsteps(audioCtx, forestAmbienceGain);
      } catch (err) {
        console.log('Ambience initialized safely:', err);
      }
    }

    function scheduleFootsteps(ctx, destGain) {
      const stepTimes = [1.2, 2.8, 4.4, 5.8];
      stepTimes.forEach(t => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(75, ctx.currentTime + t);
        osc.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + t + 0.45);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + t);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.5);

        osc.connect(gain);
        gain.connect(destGain);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.6);
      });
    }

    // Lion Roar Synthesizer
    function playRoarSound() {
      if (!soundEnabled) return;
      try {
        ensureAudioContext();
        if (!audioCtx) return;

        // 1. Deep Sub-bass Impact / Rumble
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(120, audioCtx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 2.0);

        gain1.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain1.gain.linearRampToValueAtTime(0.9, audioCtx.currentTime + 0.3);
        gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.4);

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(480, audioCtx.currentTime);
        filter.frequency.linearRampToValueAtTime(240, audioCtx.currentTime + 1.8);

        // White noise throat burst
        const bufferSize = audioCtx.sampleRate * 2.5;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(400, audioCtx.currentTime);
        noiseFilter.Q.setValueAtTime(2.2, audioCtx.currentTime);

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        noiseGain.gain.linearRampToValueAtTime(0.55, audioCtx.currentTime + 0.28);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.2);

        osc1.connect(filter);
        filter.connect(gain1);
        gain1.connect(audioCtx.destination);

        whiteNoise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);

        osc1.start();
        whiteNoise.start();

        osc1.stop(audioCtx.currentTime + 2.4);
        whiteNoise.stop(audioCtx.currentTime + 2.4);
      } catch (err) {
        console.log('Roar audio handled:', err);
      }
    }

    // --- Web Speech API: Powerful Cinematic Voice Narration ---
    function speakNarration(text, rate = 0.88, pitch = 0.82) {
      if (!soundEnabled) return;
      if (!('speechSynthesis' in window)) return;

      try {
        window.speechSynthesis.cancel(); // cancel any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate; // Slow, dramatic, kingly cadence
        utterance.pitch = pitch; // Deep authoritative tone
        utterance.volume = 1.0;

        // Choose deepest male/resonant voice available
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const preferredVoice = voices.find(v => 
            (v.name.toLowerCase().includes('david') || 
             v.name.toLowerCase().includes('mark') || 
             v.name.toLowerCase().includes('george') || 
             v.name.toLowerCase().includes('natural') || 
             v.name.toLowerCase().includes('male')) && v.lang.startsWith('en')
          ) || voices.find(v => v.lang.startsWith('en'));

          if (preferredVoice) {
            utterance.voice = preferredVoice;
          }
        }

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.log('Speech narration handled:', err);
      }
    }

    // Update Subtitles HUD with smooth animation
    function updateSubtitle(text) {
      if (!subtitleElem) return;
      subtitleElem.style.opacity = '0';
      subtitleElem.style.transform = 'translateY(6px)';
      setTimeout(() => {
        subtitleElem.textContent = text;
        subtitleElem.style.opacity = '1';
        subtitleElem.style.transform = 'translateY(0)';
      }, 250);
    }

    // Audio Toggle Handler
    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
          if (audioToggleIcon) audioToggleIcon.textContent = '🔊';
          if (audioToggleLabel) audioToggleLabel.textContent = 'Sound On';
          ensureAudioContext();
          startForestAmbience();
        } else {
          if (audioToggleIcon) audioToggleIcon.textContent = '🔇';
          if (audioToggleLabel) audioToggleLabel.textContent = 'Muted';
          if (window.speechSynthesis) window.speechSynthesis.cancel();
          if (forestAmbienceGain && audioCtx) {
            forestAmbienceGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
          }
        }
      });
    }

    // Ensure audio can play on first interaction if blocked by browser policy
    const enableAudioOnUserGesture = () => {
      ensureAudioContext();
      if (soundEnabled && (!audioCtx || audioCtx.state === 'suspended')) {
        audioCtx.resume().then(() => {
          startForestAmbience();
        });
      }
      window.removeEventListener('click', enableAudioOnUserGesture);
      window.removeEventListener('touchstart', enableAudioOnUserGesture);
      window.removeEventListener('keydown', enableAudioOnUserGesture);
    };
    window.addEventListener('click', enableAudioOnUserGesture);
    window.addEventListener('touchstart', enableAudioOnUserGesture);
    window.addEventListener('keydown', enableAudioOnUserGesture);

    // --- Master Cinematic Timeline ---
    function runIntro() {
      isEnded = false;
      sparksRunning = true;
      overlay.style.display = 'flex';
      overlay.classList.remove('fade-out');
      document.body.style.overflow = 'hidden';

      // Stage Reset
      if (walkingStage) walkingStage.classList.add('active');
      if (runningStage) runningStage.classList.remove('active');
      if (roarStage) roarStage.classList.remove('active');
      if (logoStage) logoStage.classList.remove('active');

      introTimers.forEach(t => clearTimeout(t));
      introTimers = [];

      // Start Forest Ambience
      startForestAmbience();

      // Timeline 0.0s: Slow Lion in Deep Forest
      updateSubtitle('"Deep in the ancient forest... the King steps into his power."');
      speakNarration('Deep in the ancient forest, the King steps into his power.', 0.86, 0.8);

      // Timeline 3.8s: Lion Sprints / Accelerates
      introTimers.push(setTimeout(() => {
        if (isEnded) return;
        if (walkingStage) walkingStage.classList.remove('active');
        if (runningStage) runningStage.classList.add('active');

        updateSubtitle('"Unstoppable focus. Relentless speed."');
        speakNarration('Unstoppable focus. Take action today.', 0.92, 0.85);
      }, 3800));

      // Timeline 6.6s: Lion Roars & Shockwaves Strike
      introTimers.push(setTimeout(() => {
        if (isEnded) return;
        if (runningStage) runningStage.classList.remove('active');
        if (roarStage) {
          roarStage.classList.add('active');
          playRoarSound();
        }

        updateSubtitle('"Live to dare. Rule your financial destiny!"');
        speakNarration('Live to dare! Rule your destiny!', 0.95, 0.8);
      }, 6600));

      // Timeline 9.2s: Brand Reveal — Live To Dare Life
      introTimers.push(setTimeout(() => {
        if (isEnded) return;
        if (roarStage) roarStage.classList.remove('active');
        if (logoStage) {
          logoStage.classList.add('active');
        }

        updateSubtitle('"Welcome to Live To Dare Life. Your journey begins now."');
        speakNarration('Welcome to Live To Dare Life.', 0.88, 0.85);
      }, 9200));

      // Timeline 12.0s: Graceful exit into dashboard
      introTimers.push(setTimeout(() => {
        finishIntro();
      }, 12000));
    }

    function finishIntro() {
      if (isEnded) return;
      isEnded = true;
      sparksRunning = false;
      introTimers.forEach(t => clearTimeout(t));

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      if (forestAmbienceGain && audioCtx) {
        try {
          forestAmbienceGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
        } catch (e) {}
      }

      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      }, 1050);
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        finishIntro();
      });
    }

    const replayBtn = document.getElementById('replayIntroBtn');
    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.preventDefault();
        runIntro();
      });
    }

    // Launch immediately on page load
    runIntro();
  }

  // Particle Canvas Engine for Forest Fireflies & Golden Embers
  function initSparksCanvas(canvas, isRunningCheck) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 55;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 1.2 - 0.2,
        size: Math.random() * 3.5 + 1.2,
        alpha: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        color: Math.random() > 0.4 ? '#F59E0B' : (Math.random() > 0.5 ? '#10B981' : '#FDE68A')
      });
    }

    function render() {
      if (!isRunningCheck()) return;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.y * 0.02) * 0.5;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * 0.003) * 0.01;

        if (p.y < -10 || p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.alpha = Math.random() * 0.7 + 0.3;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }
});



