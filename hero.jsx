/* ============================================================================
   hero.jsx — Nav + Hero for Sunhill Public School, Maranchi
   Exports: Nav, Hero, CustomCursor, useReveal, CrestSun
   ============================================================================ */

const { useState, useEffect, useRef } = React;

/* ─────────────────────── Custom cursor ─────────────────────── */
function CustomCursor({ enabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const stateRef = useRef({ tx: -100, ty: -100, rx: -100, ry: -100, x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!enabled) { document.body.classList.remove('cursor-on'); return; }
    // Skip on touch / coarse-pointer devices and reduced motion
    const isTouch = window.matchMedia && (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    if (isTouch) { document.body.classList.remove('cursor-on'); return; }
    document.body.classList.add('cursor-on');
    const onMove = (e) => { stateRef.current.x = e.clientX; stateRef.current.y = e.clientY; };
    const onOver = (e) => setHover(!!e.target.closest('a, button, input, textarea, select'));
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    let raf;
    const tick = () => {
      const s = stateRef.current;
      s.tx += (s.x - s.tx) * 0.5;
      s.ty += (s.y - s.ty) * 0.5;
      s.rx += (s.x - s.rx) * 0.16;
      s.ry += (s.y - s.ry) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate(${s.tx}px, ${s.ty}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${s.rx}px, ${s.ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.body.classList.remove('cursor-on');
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className={'cursor' + (hover ? ' lg' : '')} />
      <div ref={ringRef} className="cursor ring" style={{ opacity: hover ? 0 : .3 }} />
    </>
  );
}

/* ─────────────────────── Reveal-on-scroll ─────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─────────────────────── Crest sun (inspired by school logo) ─────────────────────── */
function CrestSun({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      {/* alternating saffron/red rays */}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 16;
        const r1 = 32, r2 = i % 2 === 0 ? 48 : 42;
        const x1 = 50 + Math.cos(a) * r1;
        const y1 = 50 + Math.sin(a) * r1;
        const x2 = 50 + Math.cos(a) * r2;
        const y2 = 50 + Math.sin(a) * r2;
        const x3 = 50 + Math.cos(a + Math.PI / 16) * r1;
        const y3 = 50 + Math.sin(a + Math.PI / 16) * r1;
        return (
          <path key={i}
            d={`M${x1} ${y1} L${x2} ${y2} L${x3} ${y3} Z`}
            fill={i % 2 === 0 ? 'var(--saffron)' : 'var(--red)'} />
        );
      })}
      <circle cx="50" cy="50" r="32" fill="var(--cream)" stroke="var(--navy)" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="22" fill="var(--paper)" />
      <text x="50" y="55" textAnchor="middle" fontSize="13" fontFamily="var(--serif)"
            fill="var(--navy)" fontWeight="700">S</text>
    </svg>
  );
}

/* ─────────────────────── Navigation ─────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['About', '#about'],
    ['Academics', '#academics'],
    ['Life', '#life'],
    ['Words on the wall', '#words'],
    ['Visit', '#visit'],
    ['Find us', '#find'],
  ];

  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0;
          padding: 18px var(--gutter);
          display: flex; align-items: center; justify-content: space-between;
          z-index: 200;
          transition: padding .35s cubic-bezier(.3,.7,.4,1), background .35s, backdrop-filter .35s, border-color .35s;
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        .nav.scrolled {
          padding: 10px var(--gutter);
          background: rgba(253, 250, 241, 0.9);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          border-bottom: 1px solid var(--line-soft);
        }
        .nav-brand {
          display: flex; align-items: center; gap: 14px;
          color: var(--ink);
        }
        .nav-brand .crest { flex-shrink: 0; }
        .nav-brand .name {
          font-family: var(--serif);
          font-size: 16px;
          line-height: 1.1;
          letter-spacing: -0.005em;
          color: var(--navy);
          font-weight: 600;
        }
        .nav-brand .sub {
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-top: 3px;
          font-weight: 500;
        }
        @media (max-width: 600px) {
          .nav-brand .name { font-size: 14px; }
          .nav-brand .sub { display: none; }
          .nav-brand .crest { transform: scale(0.85); transform-origin: center; }
        }
        @media (max-width: 380px) {
          .nav { padding-left: 14px; padding-right: 14px; }
          .nav-cta { padding: 8px 14px; font-size: 12px; }
          .nav-cta svg { display: none; }
        }
        .nav-links {
          display: none;
          gap: 2px;
          padding: 5px;
          border-radius: 999px;
          background: rgba(255,255,255,.5);
          border: 1px solid var(--line-soft);
        }
        @media (min-width: 980px) { .nav-links { display: flex; } }
        .nav-links a {
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
          transition: background .2s, color .2s;
        }
        .nav-links a:hover { background: var(--navy); color: var(--cream); }
        .nav-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 18px;
          border-radius: 999px;
          background: var(--saffron);
          color: var(--ink);
          font-size: 13px;
          font-weight: 600;
          transition: background .2s, color .2s, transform .2s;
        }
        .nav-cta:hover { background: var(--red); color: var(--cream); transform: translateY(-1px); }
      `}</style>

      <a href="#top" className="nav-brand">
        <span className="crest"><CrestSun size={36} /></span>
        <div>
          <div className="name">Sunhill Public School</div>
          <div className="sub">Maranchi · Patna · Est. 2003</div>
        </div>
      </a>

      <div className="nav-links">
        {links.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </div>

      <a href="#visit" className="nav-cta">
        Admissions
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8m0 0L6.5 2.5M10 6 6.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </nav>
  );
}

/* ─────────────────────── Hero ─────────────────────── */
function Hero({ motionLevel = 7 }) {
  const sunRef = useRef(null);
  const photoRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const mult = motionLevel / 10;
    let ticking = false;
    const apply = () => {
      const y = window.scrollY;
      if (sunRef.current) sunRef.current.style.transform = `translateY(${y * 0.3 * mult}px) rotate(${y * 0.02 * mult}deg)`;
      if (photoRef.current) photoRef.current.style.transform = `translateY(${y * 0.15 * mult}px)`;
      if (titleRef.current) titleRef.current.style.transform = `translateY(${y * -0.08 * mult}px)`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(apply); ticking = true; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    apply();
    return () => window.removeEventListener('scroll', onScroll);
  }, [motionLevel]);

  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          background: var(--paper);
          color: var(--ink);
          padding: 120px var(--gutter) 0;
        }
        @media (max-width: 640px) {
          .hero { padding: 96px var(--gutter) 0; min-height: auto; }
        }
        .hero-grid {
          position: relative;
          z-index: 2;
          max-width: var(--maxw);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.35fr 1fr; gap: 64px; }
        }

        /* Left: Type */
        .hero-text { position: relative; z-index: 3; }
        .hero-est {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 8px 14px 8px 8px;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: rgba(255,255,255,.6);
          backdrop-filter: blur(6px);
          font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink-mute);
          font-weight: 600;
          margin-bottom: 28px;
        }
        .hero-est .yr {
          display: inline-flex; align-items: center; justify-content: center;
          width: 24px; height: 24px; border-radius: 50%;
          background: var(--saffron); color: var(--ink);
          font-family: var(--serif); font-size: 11px; font-weight: 700;
          letter-spacing: 0;
        }

        .hero-memorial {
          font-family: var(--serif);
          font-size: clamp(13px, 1vw, 15px);
          font-style: italic;
          color: var(--red);
          letter-spacing: 0.04em;
          margin-bottom: 10px;
          text-transform: uppercase;
          font-weight: 500;
        }

        .hero-title {
          font-family: var(--serif);
          font-weight: 500;
          font-size: clamp(56px, 8vw, 124px);
          line-height: 0.96;
          letter-spacing: -0.025em;
          color: var(--navy);
          margin: 0;
          text-wrap: balance;
        }
        .hero-title .saff { color: var(--saffron); font-style: italic; font-weight: 400; }
        .hero-title .small {
          display: inline-block;
          font-family: var(--serif);
          font-style: italic;
          font-size: 0.18em;
          color: var(--ink-mute);
          font-weight: 400;
          letter-spacing: 0.02em;
          transform: translateY(-0.7em);
          margin-left: 0.5em;
        }

        .hero-motto {
          margin-top: 32px;
          display: flex; align-items: baseline; gap: 18px;
          font-family: var(--devanagari);
          font-size: clamp(34px, 4.5vw, 56px);
          line-height: 1;
          color: var(--red);
          font-weight: 400;
        }
        .hero-motto .translit {
          font-family: var(--sans);
          font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-mute);
          font-weight: 500;
        }

        .hero-sub {
          margin-top: 28px;
          max-width: 38ch;
          font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.55;
          color: var(--ink-soft);
          text-wrap: pretty;
        }
        .hero-actions { margin-top: 40px; display: flex; gap: 12px; flex-wrap: wrap; }

        /* Right: Photo + crest collage */
        .hero-collage {
          position: relative;
          aspect-ratio: 4 / 5;
          width: 100%;
          max-width: 520px;
          justify-self: end;
        }
        @media (max-width: 1023px) {
          .hero-collage { justify-self: center; max-width: 460px; aspect-ratio: 4 / 5; margin: 0 auto; }
        }
        @media (max-width: 480px) {
          .hero-collage { max-width: 100%; aspect-ratio: 4 / 5; }
        }
        .hero-photo {
          position: absolute;
          inset: 4% 12% 8% 0;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 30px 80px -30px rgba(26,15,8,.4), 0 8px 24px -10px rgba(26,15,8,.15);
          will-change: transform;
        }
        .hero-photo img {
          width: 100%; height: 100%; object-fit: cover;
          filter: saturate(.95) contrast(1.04);
        }
        .hero-photo::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(27,42,107,0.06) 0%, transparent 40%, rgba(177,18,38,0.16) 100%);
          pointer-events: none;
        }
        .hero-photo .photo-label {
          position: absolute; left: 16px; bottom: 16px;
          padding: 8px 12px;
          background: rgba(253,250,241,.92);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink); font-weight: 600;
          display: inline-flex; gap: 8px; align-items: center;
        }
        .hero-photo .photo-label::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: var(--red);
        }

        .hero-crest {
          position: absolute;
          top: 0; right: 0;
          width: 38%;
          aspect-ratio: 1;
          background: var(--cream);
          border-radius: 50%;
          padding: 14px;
          box-shadow: 0 20px 50px -20px rgba(177,18,38,.35), 0 4px 14px -4px rgba(26,15,8,.2);
          will-change: transform;
          z-index: 4;
        }
        .hero-crest img { width: 100%; height: 100%; object-fit: contain; }

        .hero-stamp {
          position: absolute;
          left: 0; bottom: 0;
          background: var(--navy);
          color: var(--cream);
          padding: 18px 22px;
          border-radius: 4px;
          max-width: 64%;
          font-size: 12px;
          line-height: 1.45;
          z-index: 3;
          box-shadow: 0 10px 30px -10px rgba(26,15,8,.4);
        }
        @media (max-width: 480px) {
          .hero-stamp { max-width: 78%; padding: 14px 16px; }
          .hero-stamp .num { font-size: 28px !important; }
        }
        .hero-stamp .num {
          font-family: var(--serif);
          font-size: 36px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--saffron);
          display: block;
          margin-bottom: 6px;
        }
        .hero-stamp .lbl {
          font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(251, 246, 236, .6);
          font-weight: 600;
          margin-bottom: 4px;
        }

        /* Background sun rays */
        .hero-bg-sun {
          position: absolute;
          right: -260px; top: -200px;
          width: 760px; height: 760px;
          z-index: 1;
          opacity: .55;
          pointer-events: none;
          will-change: transform;
        }
        @media (max-width: 720px) { .hero-bg-sun { width: 480px; height: 480px; right: -160px; top: -120px; opacity: .35; } }
        @media (max-width: 480px) { .hero-bg-sun { width: 340px; height: 340px; right: -110px; top: -90px; opacity: .25; } }

        /* Bottom info row + marquee */
        .hero-meta {
          position: relative;
          z-index: 2;
          max-width: var(--maxw);
          margin: clamp(60px, 8vh, 100px) auto 0;
          padding-top: 28px;
          border-top: 1px solid var(--line);
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 720px) {
          .hero-meta { grid-template-columns: repeat(4, 1fr); gap: 32px; }
        }
        .hero-meta .m {
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-mute); font-weight: 600;
        }
        .hero-meta .m b {
          display: block;
          font-family: var(--serif);
          font-weight: 500;
          font-size: 22px;
          letter-spacing: -0.01em;
          color: var(--navy);
          text-transform: none;
          margin-top: 8px;
        }

        .hero-marquee {
          margin-top: clamp(60px, 8vh, 100px);
          margin-left: calc(-1 * var(--gutter));
          margin-right: calc(-1 * var(--gutter));
          padding: 20px 0;
          background: var(--navy);
          color: var(--cream);
          font-family: var(--serif);
          font-size: clamp(22px, 2.4vw, 32px);
          letter-spacing: -0.005em;
          overflow: hidden;
          border-top: 4px solid var(--saffron);
        }
        .hero-marquee .star { display: inline-block; color: var(--saffron); margin: 0 22px; font-size: 0.7em; vertical-align: middle; }
        .hero-marquee .devnag { font-family: var(--devanagari); color: var(--saffron); }
      `}</style>

      {/* Background sun rays */}
      <svg ref={sunRef} className="hero-bg-sun" viewBox="0 0 760 760" fill="none">
        <g className="sun-rays" style={{ transformOrigin: '380px 380px' }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 24;
            const r1 = 220;
            const r2 = i % 2 === 0 ? 340 : 290;
            const x1 = 380 + Math.cos(a) * r1;
            const y1 = 380 + Math.sin(a) * r1;
            const x2 = 380 + Math.cos(a) * r2;
            const y2 = 380 + Math.sin(a) * r2;
            const w = 30;
            const ax = 380 + Math.cos(a + Math.PI / 24) * r1;
            const ay = 380 + Math.sin(a + Math.PI / 24) * r1;
            const bx = 380 + Math.cos(a - Math.PI / 24) * r1;
            const by = 380 + Math.sin(a - Math.PI / 24) * r1;
            return (
              <path key={i}
                d={`M${ax} ${ay} L${x2} ${y2} L${bx} ${by} Z`}
                fill={i % 2 === 0 ? 'var(--saffron)' : 'var(--red)'} opacity={i % 2 === 0 ? 0.55 : 0.7} />
            );
          })}
        </g>
        <circle cx="380" cy="380" r="200" fill="var(--paper)" />
        <circle cx="380" cy="380" r="200" fill="none" stroke="var(--saffron)" strokeWidth="2" opacity="0.4" />
      </svg>

      <div className="hero-grid">
        <div className="hero-text" ref={titleRef}>
          <div className="hero-est">
            <span className="yr">03</span>
            <span>Estd. 2003 · BSEB Curriculum · Nursery – Std X</span>
          </div>
          <div className="hero-memorial">Shahid Priya Sharma Memorial</div>
          <h1 className="hero-title">
            Sunhill <span className="saff">Public</span><br />
            School<span className="small">— Maranchi.</span>
          </h1>
          <div className="hero-motto">
            <span>अमृतं&nbsp;तु&nbsp;विद्या</span>
            <span className="translit">Knowledge<br />is nectar.</span>
          </div>
          <p className="hero-sub">
            A neighbourhood BSEB school on the road to Patna — small enough that every child
            is known by name, and proud enough to put its hopes for them on every wall.
          </p>
          <div className="hero-actions">
            <a href="#visit" className="pill warm">
              Apply for Admission
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10m0 0L8 3m4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#about" className="pill ghost">Our story</a>
          </div>
        </div>

        <div className="hero-collage">
          <div className="hero-crest">
            <img src="photos/logo.png" alt="Sunhill Public School crest" loading="eager" decoding="async" width="200" height="200" />
          </div>
          <div className="hero-photo" ref={photoRef}>
            <img src="photos/building.jpeg" alt="Pre-Primary classroom at Sunhill Public School, Maranchi" loading="eager" decoding="async" width="800" height="1000" />
            <div className="photo-label">The school · Maranchi</div>
          </div>
          <div className="hero-stamp">
            <span className="lbl">On the rolls today</span>
            <span className="num">480+</span>
            <span style={{ color: 'rgba(251,246,236,.7)' }}>students from the villages around Maranchi.</span>
          </div>
        </div>
      </div>

      <div className="hero-meta">
        <div className="m">Curriculum<b>BSEB</b></div>
        <div className="m">Levels<b>Nursery → Std X</b></div>
        <div className="m">Founded<b>2003</b></div>
        <div className="m">Location<b>Maranchi, Patna</b></div>
      </div>

      <div className="hero-marquee">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} style={{ display: 'flex', gap: 56, alignItems: 'center', whiteSpace: 'nowrap' }}>
              <span className="devnag">अमृतं तु विद्या</span>
              <span className="star">✺</span>
              <span style={{ fontStyle: 'italic' }}>Knowledge is the only nectar</span>
              <span className="star">✺</span>
              <span>A memorial to Priya Sharma</span>
              <span className="star">✺</span>
              <span style={{ fontStyle: 'italic' }}>Since 2003 · Maranchi</span>
              <span className="star">✺</span>
              <span>BSEB Curriculum · Nursery → Std X</span>
              <span className="star">✺</span>
              <span style={{ fontStyle: 'italic' }}>Slow and steady wins the race</span>
              <span className="star">✺</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, CustomCursor, CrestSun, useReveal });
