/* ============================================================================
   intro.jsx — Sunrise intro for Sunhill Public School (v2)
   The sun rises from behind the hill, sky brightens, school name reveals,
   final white flash, fade to the live website.
   ============================================================================ */

const { useState: useStateI, useEffect: useEffectI, useMemo: useMemoI, useCallback: useCallbackI } = React;

/* color helpers */
function _interp(c1, c2, t) {
  return [
    c1[0] + (c2[0] - c1[0]) * t,
    c1[1] + (c2[1] - c1[1]) * t,
    c1[2] + (c2[2] - c1[2]) * t,
  ];
}
function _rgb(c) { return `rgb(${c[0]|0}, ${c[1]|0}, ${c[2]|0})`; }
function _at(stops, p) {
  if (p < 0.5) return _interp(stops.night, stops.dawn, p / 0.5);
  return _interp(stops.dawn, stops.morning, (p - 0.5) / 0.5);
}

const SKY = {
  zenith:  { night: [8, 6, 26],    dawn: [50, 24, 72],    morning: [240, 188, 130] },
  middle:  { night: [22, 18, 58],  dawn: [188, 80, 90],   morning: [250, 178, 112] },
  horizon: { night: [44, 34, 92],  dawn: [240, 130, 78],  morning: [255, 200, 138] },
};

function SunriseIntro({ onDone, durationMs = 6200 }) {
  const [progress, setProgress] = useStateI(0);
  const [phase, setPhase] = useStateI('playing'); // 'playing' | 'flash' | 'fading' | 'done'

  useEffectI(() => {
    document.body.style.overflow = 'hidden';
    let raf;
    let cleanupTimers = [];
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / durationMs);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        cleanupTimers.push(setTimeout(() => setPhase('flash'), 280));
        cleanupTimers.push(setTimeout(() => setPhase('fading'), 1100));
        cleanupTimers.push(setTimeout(() => {
          setPhase('done');
          document.body.style.overflow = '';
          onDone && onDone();
        }, 2000));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      cleanupTimers.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, [durationMs, onDone]);
  const skip = useCallbackI(() => {
    document.body.style.overflow = '';
    setPhase('done');
    onDone && onDone();
  }, [onDone]);

  useEffectI(() => {
    const onKey = (e) => { if (e.key === 'Escape' || e.key === ' ') { e.preventDefault(); skip(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [skip]);

  // Generate stars deterministically once — fewer on small screens
  const stars = useMemoI(() => {
    const count = (typeof window !== 'undefined' && window.innerWidth < 640) ? 35 : 70;
    return Array.from({ length: count }).map((_, i) => {
      const seed = i * 2654435761 >>> 0;
      const x = (seed % 1000) / 10;          // 0..100
      const y = ((seed >>> 7) % 580) / 10;   // 0..58 (upper)
      const size = 0.6 + ((seed >>> 17) % 12) / 10;
      const delay = ((seed >>> 23) % 30) / 10;
      return { x, y, size, delay };
    });
  }, []);

  if (phase === 'done') return null;

  const easeOut = (t) => 1 - Math.pow(1 - t, 2.4);
  const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // Sun rise: from below screen → above hill
  const sunRise = easeOut(progress);
  const sunTopVh = 108 - 80 * sunRise; // 108vh → 28vh
  const sunOpacity = Math.min(1, progress * 4);
  const sunScale = 0.85 + 0.15 * sunRise;

  // Stars
  const starsOpacity = Math.max(0, 1 - progress * 1.7);

  // Sky
  const zen = _rgb(_at(SKY.zenith, progress));
  const mid = _rgb(_at(SKY.middle, progress));
  const hor = _rgb(_at(SKY.horizon, progress));
  const skyBg = `linear-gradient(180deg, ${zen} 0%, ${mid} 55%, ${hor} 78%, ${hor} 100%)`;

  // Hill rim light grows
  const rimLight = Math.max(0, easeInOut(Math.min(1, (progress - 0.18) / 0.62)));

  // Text reveals — stepped
  const reveal = (s, e) => Math.max(0, Math.min(1, (progress - s) / (e - s)));
  const welcomeOpacity = Math.max(0, 1 - progress * 1.6);
  const memorialOpacity = reveal(0.28, 0.46);
  const titleOpacity = reveal(0.38, 0.56);
  const titleY = 22 * (1 - reveal(0.38, 0.6));
  const mottoOpacity = reveal(0.56, 0.72);
  const translitOpacity = reveal(0.7, 0.84);
  const subOpacity = reveal(0.8, 0.94);

  // Text color interpolation — cream/saffron on dark sky
  // → navy/deep-red as sky brightens, so text stays legible.
  const bright = Math.max(0, Math.min(1, easeInOut((progress - 0.5) / 0.42)));
  const titleColor    = _rgb(_interp([251, 246, 236], [15, 25, 74],   bright)); // cream → deep navy
  const sunWordColor  = _rgb(_interp([255, 176, 72],  [177, 18, 38],  bright)); // saffron → red
  const accentColor   = _rgb(_interp([255, 176, 72],  [161, 26, 42],  bright)); // saffron → red
  const mutedColor    = _rgb(_interp([251, 246, 236], [61, 44, 31],   bright)); // cream → ink-soft
  const dotColor      = _rgb(_interp([255, 180, 80],  [177, 18, 38],  bright));
  const borderColor   = `rgba(${_interp([251, 246, 236], [26, 15, 8], bright).map(c => (c|0)).join(',')}, ${0.22 + bright * 0.18})`;

  // Phase styles
  const overlayOpacity = phase === 'fading' ? 0 : 1;
  const flashOpacity = phase === 'flash' ? 0.9 : (phase === 'fading' ? 0.4 : 0);

  return (
    <div className="intro" style={{ opacity: overlayOpacity, background: skyBg }} aria-hidden="true">
      <style>{`
        .intro {
          position: fixed; inset: 0;
          z-index: 99999;
          overflow: hidden;
          transition: opacity 1.05s cubic-bezier(.2,.7,.2,1), background .1s linear;
          color: #FBF6EC;
          font-family: 'Manrope', system-ui, sans-serif;
        }
        .intro-stars { position: absolute; inset: 0; pointer-events: none; transition: opacity .4s; }
        .intro-star {
          position: absolute;
          background: rgba(255, 240, 200, 0.92);
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(255, 220, 170, 0.6);
          animation: intro-twinkle 2.6s ease-in-out infinite;
        }
        @keyframes intro-twinkle {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        .intro-glow {
          position: absolute;
          left: 50%;
          border-radius: 50%;
          background: radial-gradient(circle at center,
            rgba(255, 200, 120, 0.55) 0%,
            rgba(255, 150, 60, 0.18) 30%,
            transparent 65%);
          z-index: 1;
          pointer-events: none;
          will-change: top, width, height;
          transform: translateX(-50%);
        }

        .intro-sun-wrap {
          position: absolute;
          left: 50%;
          z-index: 2;
          filter: drop-shadow(0 0 60px rgba(255, 180, 80, 0.45));
          will-change: top, transform, opacity;
        }
        .intro-sun-rays {
          animation: intro-spin 80s linear infinite;
          transform-origin: center;
        }
        @keyframes intro-spin { to { transform: rotate(360deg); } }

        .intro-shaft {
          position: absolute;
          left: 50%;
          width: 60vw;
          background: linear-gradient(180deg, rgba(255, 200, 120, 0) 0%, rgba(255, 200, 120, 0.18) 60%, rgba(255, 200, 120, 0) 100%);
          transform-origin: top center;
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: screen;
        }

        .intro-hill {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          width: 100%; height: 38vh;
          z-index: 3;
          pointer-events: none;
          display: block;
        }

        .intro-content {
          position: absolute;
          left: 0; right: 0;
          bottom: 24vh;
          z-index: 4;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          pointer-events: none;
          padding: 0 24px;
          gap: 0;
        }
        .intro-welcome {
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(251, 246, 236, 0.7);
          font-weight: 600;
        }
        .intro-memorial {
          font-family: 'Eczar', serif;
          font-style: italic;
          font-size: clamp(13px, 1.05vw, 16px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #FFB048;
          font-weight: 500;
          margin-top: 8px;
        }
        .intro-title {
          font-family: 'Eczar', serif;
          font-size: clamp(36px, 6.4vw, 96px);
          line-height: 1;
          letter-spacing: -0.025em;
          font-weight: 500;
          margin: 16px 0 0;
          color: #FBF6EC;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
          white-space: nowrap;
          will-change: opacity, transform, color;
          transition: color .35s linear;
        }
        .intro-title .sun {
          font-style: italic;
          font-weight: 400;
          transition: color .35s linear;
        }
        .intro-motto {
          margin-top: 18px;
          font-family: 'Tiro Devanagari Hindi', serif;
          font-size: clamp(40px, 6vw, 88px);
          color: #FFB048;
          letter-spacing: 0.02em;
          line-height: 1;
          font-weight: 400;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
          transition: color .35s linear;
        }
        .intro-translit {
          margin-top: 14px;
          font-family: 'Eczar', serif;
          font-style: italic;
          font-size: clamp(14px, 1.3vw, 19px);
          color: rgba(251, 246, 236, 0.75);
          letter-spacing: 0.04em;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
          transition: color .35s linear;
        }
        .intro-sub {
          margin-top: 26px;
          padding-top: 16px;
          border-top: 1px solid rgba(251, 246, 236, 0.22);
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(251, 246, 236, 0.7);
          font-weight: 600;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          transition: color .35s linear, border-color .35s linear;
        }
        .intro-sub .dot { display: inline-block; width: 4px; height: 4px; border-radius: 50%; background: rgba(255, 180, 80, 0.7); margin: 0 12px; transform: translateY(-2px); }

        @media (max-width: 640px) {
          .intro-title { font-size: 8.5vw; white-space: normal; line-height: 1.05; }
          .intro-motto { font-size: 11vw; }
          .intro-content { bottom: 20vh; }
          .intro-sub { font-size: 9.5px; letter-spacing: 0.18em; padding: 12px 8px 0; }
          .intro-sub .dot { margin: 0 7px; }
        }

        .intro-skip {
          position: absolute;
          top: 22px; right: 22px;
          z-index: 10;
          appearance: none; border: 1px solid rgba(251, 246, 236, 0.25);
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          color: rgba(251, 246, 236, 0.9);
          padding: 9px 18px;
          border-radius: 999px;
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s, color .2s, border-color .2s, transform .2s;
        }
        .intro-skip:hover { background: rgba(251, 246, 236, 0.95); color: #1A0F08; border-color: transparent; transform: translateY(-1px); }

        .intro-progress {
          position: absolute;
          left: 22px; right: 22px; bottom: 22px;
          z-index: 10;
          display: flex; align-items: center; gap: 18px;
          font-family: 'Manrope', sans-serif;
          font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(251, 246, 236, 0.55);
          font-weight: 600;
        }
        .intro-progress .label { min-width: 90px; }
        .intro-progress .bar {
          flex: 1; height: 1px;
          background: rgba(251, 246, 236, 0.18);
          position: relative;
          overflow: hidden;
        }
        .intro-progress .bar::after {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: var(--p, 0%);
          background: linear-gradient(90deg, rgba(255,180,80,.6), rgba(255,255,255,.95));
          transition: width .12s linear;
        }
        .intro-progress .pct { min-width: 32px; text-align: right; }

        .intro-flash {
          position: absolute; inset: 0;
          background: #FBF6EC;
          opacity: var(--flash, 0);
          transition: opacity .55s cubic-bezier(.2,.7,.2,1);
          z-index: 6;
          pointer-events: none;
        }

        .intro-corner-l, .intro-corner-r {
          position: absolute;
          top: 22px;
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(251, 246, 236, 0.45);
          font-weight: 600;
          z-index: 10;
        }
        .intro-corner-l { left: 22px; }

        @media (max-width: 720px) {
          .intro-progress .label { display: none; }
          .intro-corner-l { display: none; }
        }
      `}</style>

      {/* Stars */}
      <div className="intro-stars" style={{ opacity: starsOpacity }}>
        {stars.map((s, i) => (
          <div key={i} className="intro-star"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: `${s.size * 2}px`, height: `${s.size * 2}px`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Sun glow halo */}
      {(() => {
        const glowSize = 600 + 400 * sunRise;
        return (
          <div className="intro-glow"
            style={{
              top: `calc(${sunTopVh}vh + 5vw - ${glowSize / 2}px)`,
              width: `${glowSize}px`,
              height: `${glowSize}px`,
              opacity: sunOpacity * (0.5 + 0.5 * sunRise),
            }}
          />
        );
      })()}

      {/* Light shafts (visible mid-rise) */}
      {sunRise > 0.4 && sunRise < 0.98 && (
        <>
          <div className="intro-shaft" style={{
            top: `${sunTopVh + 8}vh`,
            height: '80vh',
            transform: `translateX(-50%) rotate(-14deg)`,
            opacity: 0.6 * Math.min(1, (sunRise - 0.4) * 2.5),
          }} />
          <div className="intro-shaft" style={{
            top: `${sunTopVh + 8}vh`,
            height: '80vh',
            transform: `translateX(-50%) rotate(12deg)`,
            opacity: 0.5 * Math.min(1, (sunRise - 0.4) * 2.5),
          }} />
        </>
      )}

      {/* Sun */}
      <div className="intro-sun-wrap"
        style={{
          top: `${sunTopVh}vh`,
          width: `clamp(260px, 32vw, 420px)`,
          height: `clamp(260px, 32vw, 420px)`,
          transform: `translateX(-50%) scale(${sunScale})`,
          opacity: sunOpacity,
        }}>
        <svg viewBox="0 0 460 460" width="100%" height="100%">
          <defs>
            <radialGradient id="introSunDisc" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#FFEDC2" />
              <stop offset="45%" stopColor="#FFB048" />
              <stop offset="100%" stopColor="#F26B1F" />
            </radialGradient>
          </defs>
          {/* Rays — alternating saffron + red, growing with rise */}
          <g className="intro-sun-rays" style={{ transformOrigin: '230px 230px' }}>
            {Array.from({ length: 28 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 28;
              const r1 = 130;
              const r2 = (i % 2 === 0 ? 215 : 180) + 30 * sunRise;
              const w = Math.PI / 32;
              const ax = 230 + Math.cos(a - w) * r1;
              const ay = 230 + Math.sin(a - w) * r1;
              const bx = 230 + Math.cos(a + w) * r1;
              const by = 230 + Math.sin(a + w) * r1;
              const tx = 230 + Math.cos(a) * r2;
              const ty = 230 + Math.sin(a) * r2;
              return <path key={i} d={`M${ax} ${ay} L${tx} ${ty} L${bx} ${by} Z`}
                fill={i % 2 === 0 ? '#F26B1F' : '#B11226'} opacity={0.75} />;
            })}
          </g>
          {/* Disc */}
          <circle cx="230" cy="230" r="118" fill="url(#introSunDisc)" />
          <circle cx="230" cy="230" r="118" fill="none" stroke="rgba(255,230,180,0.5)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Hill silhouette */}
      <svg className="intro-hill" viewBox="0 0 1600 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A0608" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
          <linearGradient id="hillRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD27A" stopOpacity={rimLight} />
            <stop offset="2.5%" stopColor="#F26B1F" stopOpacity={rimLight * 0.7} />
            <stop offset="8%" stopColor="#B11226" stopOpacity={rimLight * 0.3} />
            <stop offset="14%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Back hill */}
        <path d="M0,600 L0,260 C200,180 400,210 700,200 C1000,190 1300,240 1600,210 L1600,600 Z"
              fill="#0F0810" opacity={0.5 + 0.3 * rimLight} />
        {/* Main hill */}
        <path d="M0,600 L0,360 C200,260 400,290 700,250 C900,225 1100,260 1300,280 C1450,295 1550,300 1600,290 L1600,600 Z"
              fill="url(#hillGrad)" />
        {/* Rim light overlay */}
        <path d="M0,600 L0,360 C200,260 400,290 700,250 C900,225 1100,260 1300,280 C1450,295 1550,300 1600,290 L1600,600 Z"
              fill="url(#hillRim)" />
        {/* Trees */}
        <g fill="#000">
          {[[120, 358], [180, 364], [240, 358], [340, 326], [420, 294], [560, 270], [720, 252], [780, 258], [950, 244], [1110, 270], [1240, 280], [1300, 286], [1420, 295]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x},${y}) scale(${1.3 + (i % 3) * 0.3})`}>
              <path d="M0,0 L-8,18 L8,18 Z" />
              <path d="M0,-8 L-7,8 L7,8 Z" />
              <rect x="-1" y="14" width="2" height="6" />
            </g>
          ))}
        </g>
        {/* Tiny school building tucked into the hill (appears subtly) */}
        <g transform="translate(800, 248)" opacity={Math.max(0, (rimLight - 0.5) * 2)}>
          <rect x="-20" y="0" width="40" height="20" fill="#1A0F08" stroke="#F26B1F" strokeOpacity="0.4" strokeWidth="0.6" />
          <path d="M-24,0 L0,-12 L24,0 Z" fill="#0A0405" />
          <rect x="-2" y="-22" width="2" height="10" fill="#1A0F08" />
          <circle cx="-1" cy="-22" r="2.5" fill="#FFB048" opacity={Math.max(0, (rimLight - 0.7) * 3)} />
        </g>
      </svg>

      {/* Text content */}
      <div className="intro-content">
        <div className="intro-welcome" style={{ opacity: welcomeOpacity, color: mutedColor }}>
          Welcome to
        </div>
        <div className="intro-memorial" style={{ opacity: memorialOpacity, color: accentColor }}>
          Shahid Priya Sharma Memorial
        </div>
        <h1 className="intro-title" style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, color: titleColor }}>
          <span className="sun" style={{ color: sunWordColor }}>Sun</span>hill Public School
        </h1>
        <div className="intro-motto" style={{ opacity: mottoOpacity, color: accentColor }}>
          अमृतं&nbsp;तु&nbsp;विद्या
        </div>
        <div className="intro-translit" style={{ opacity: translitOpacity, color: mutedColor }}>
          — Knowledge is the only nectar —
        </div>
        <div className="intro-sub" style={{ opacity: subOpacity, color: mutedColor, borderTopColor: borderColor }}>
          CBSE Curriculum<span className="dot" style={{ background: dotColor }}></span>Nursery – Std X<span className="dot" style={{ background: dotColor }}></span>Maranchi, Patna<span className="dot" style={{ background: dotColor }}></span>Estd. 2003
        </div>
      </div>

      {/* Corner annotations */}
      <div className="intro-corner-l">A CBSE Day School · Bihar</div>

      {/* Skip button */}
      <button className="intro-skip" onClick={skip} type="button">
        Skip intro →
      </button>

      {/* Progress bar */}
      <div className="intro-progress" style={{ '--p': `${Math.round(progress * 100)}%` }}>
        <span className="label">
          {progress < 0.33 ? 'Pre-dawn' : progress < 0.7 ? 'Sunrise' : phase === 'flash' || phase === 'fading' ? 'Good morning' : 'Almost there'}
        </span>
        <div className="bar"></div>
        <span className="pct">{Math.round(progress * 100)}%</span>
      </div>

      {/* Final white flash */}
      <div className="intro-flash" style={{ '--flash': flashOpacity }} />
    </div>
  );
}

Object.assign(window, { SunriseIntro });
