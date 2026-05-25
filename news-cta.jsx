/* ============================================================================
   news-cta.jsx — News, Visit/Admissions, Footer
   Exports: News, Visit, Footer
   ============================================================================ */

/* ─────────────────────── News ─────────────────────── */
function News() {
  const stories = [
    {
      tag: 'School day', date: '24 May 2026',
      title: 'A morning in Class V — handwriting, geography, and a power cut at 11.',
      dek: 'Notes from a Tuesday, when the fan stopped at the third period and class moved to the corridor.',
      photo: 'photos/classroom-2.jpeg',
      lead: true,
    },
    {
      tag: 'Independence Day', date: '15 Aug 2025',
      title: 'The whole school stood for the anthem in the foggy August sun.',
      dek: 'Photographs from the morning flag hoisting, in the school playground.',
      photo: 'photos/independence-day.jpeg',
    },
    {
      tag: 'Annual function', date: '12 Mar 2025',
      title: 'Prize Day and the long line of certificates.',
      dek: 'Forty-six prizes in a single morning, and a Class IX student who quietly won three.',
      photo: 'photos/assembly-1.jpeg',
    },
  ];
  return (
    <section className="section news" id="news" data-screen-label="07 News">
      <style>{`
        .news { background: var(--paper); }
        .news-head { display: flex; justify-content: space-between; align-items: end; gap: 32px; margin-bottom: 56px; flex-wrap: wrap; }
        .news-head h2 {
          font-family: var(--serif);
          font-size: clamp(48px, 6.5vw, 88px);
          line-height: 0.98;
          letter-spacing: -0.02em;
          margin: 14px 0 0;
          color: var(--navy);
          font-weight: 500;
          text-wrap: balance;
        }
        .news-head h2 .saff { color: var(--saffron); font-style: italic; font-weight: 400; }
        .news-head .all {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 22px;
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 13.5px; font-weight: 600;
          color: var(--navy);
          transition: background .2s, color .2s, border-color .2s;
        }
        .news-head .all:hover { background: var(--navy); color: var(--cream); border-color: var(--navy); }

        .news-grid {
          display: grid; gap: 28px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 720px)  { .news-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1100px) { .news-grid { grid-template-columns: 1.4fr 1fr 1fr; } }

        .news-card {
          border-radius: 16px;
          overflow: hidden;
          background: var(--cream);
          border: 1px solid var(--line-soft);
          display: flex; flex-direction: column;
          transition: transform .35s cubic-bezier(.3,.7,.4,1);
          cursor: pointer;
        }
        .news-card:hover { transform: translateY(-4px); }
        .news-card .img {
          aspect-ratio: 5 / 3;
          position: relative;
          overflow: hidden;
        }
        .news-card.lead .img { aspect-ratio: 5 / 4; }
        .news-card .img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.95) contrast(1.05); transition: transform .8s cubic-bezier(.2,.7,.2,1); }
        .news-card:hover .img img { transform: scale(1.04); }
        .news-card .img::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(26,15,8,.3) 100%);
          pointer-events: none;
        }
        .news-card .tag {
          position: absolute; top: 16px; left: 16px;
          padding: 6px 12px;
          border-radius: 999px;
          background: var(--saffron); color: var(--ink);
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          font-weight: 700;
        }

        .news-card .body { padding: 24px 22px 26px; display: flex; flex-direction: column; gap: 14px; flex: 1; }
        .news-card .meta { display: flex; gap: 14px; align-items: center; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); font-weight: 600; }
        .news-card .meta .dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ink-mute); display: inline-block; }
        .news-card h3 {
          font-family: var(--serif);
          font-size: clamp(22px, 1.9vw, 28px);
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin: 0;
          color: var(--navy);
          font-weight: 500;
          text-wrap: balance;
        }
        .news-card.lead h3 { font-size: clamp(28px, 2.6vw, 38px); }
        .news-card .dek { color: var(--ink-soft); font-size: 14.5px; line-height: 1.55; margin: 0; text-wrap: pretty; }
        .news-card .more {
          margin-top: auto;
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 600;
          color: var(--red);
        }
      `}</style>

      <div className="section-inner">
        <div className="news-head reveal">
          <div>
            <div className="eyebrow"><span className="dot"></span>News from the school</div>
            <h2>What's happened <span className="saff">recently.</span></h2>
          </div>
          <a href="#" className="all">
            See all notices
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6h8m0 0L6.5 2.5M10 6 6.5 9.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
        <div className="news-grid">
          {stories.map((s, i) => (
            <article key={i} className={'news-card' + (s.lead ? ' lead' : '') + ' reveal d' + (i + 1)}>
              <div className="img">
                <img src={s.photo} alt={s.title} loading="lazy" />
                <div className="tag">{s.tag}</div>
              </div>
              <div className="body">
                <div className="meta"><span>{s.date}</span><span className="dot"></span><span>3 min read</span></div>
                <h3>{s.title}</h3>
                <p className="dek">{s.dek}</p>
                <span className="more">Read more →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Visit / Admissions ─────────────────────── */
function Visit() {
  const steps = [
    { n: '01', t: 'Enquire', d: 'Visit the school office on any weekday morning, 9 to 12. Or call the number below. There is no online form; we like to meet you first.' },
    { n: '02', t: 'Visit & test', d: 'A short visit with the child. From Class II onwards, a simple written assessment in English, Hindi and Mathematics, in keeping with CBSE entry norms.' },
    { n: '03', t: 'Admission', d: 'Bring the birth certificate, transfer certificate (if applicable), Aadhaar, and two photographs. Fees are payable per quarter.' },
  ];
  return (
    <section className="section visit" id="visit" data-screen-label="08 Visit">
      <style>{`
        .visit {
          background: linear-gradient(180deg, #0C0F2E 0%, var(--navy) 50%, #2A0810 100%);
          color: var(--cream);
          position: relative;
          overflow: hidden;
        }
        .visit::before {
          content: '';
          position: absolute;
          right: -260px; top: -200px;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(242,107,31,.4) 0%, transparent 60%);
          pointer-events: none;
        }
        .visit-inner { position: relative; z-index: 1; }

        .visit-quote {
          font-family: var(--serif);
          font-size: clamp(40px, 6vw, 88px);
          line-height: 1.02;
          letter-spacing: -0.02em;
          max-width: 22ch;
          margin: 0 0 24px;
          color: var(--cream);
          font-weight: 500;
          text-wrap: balance;
        }
        .visit-quote .saff { color: var(--saffron); font-style: italic; font-weight: 400; }
        .visit-attr { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(251,246,236,.6); font-weight: 600; margin: 0 0 64px; }
        @media (max-width: 640px) { .visit-attr { margin-bottom: 40px; } }
        .visit-attr b { font-family: var(--serif); font-weight: 500; color: var(--cream); font-style: italic; font-size: 16px; text-transform: none; letter-spacing: 0; margin-right: 10px; }

        .visit-bottom { display: grid; gap: 56px; grid-template-columns: 1fr; }
        @media (min-width: 980px) { .visit-bottom { grid-template-columns: 1.2fr 1fr; align-items: end; gap: 80px; } }

        .visit-steps { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 640px) { .visit-steps { grid-template-columns: repeat(3, 1fr); } }
        .step {
          border-top: 1px solid rgba(251,246,236,.22);
          padding-top: 20px;
        }
        .step .n { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; color: var(--saffron); font-weight: 500; }
        .step .t { font-family: var(--serif); font-size: 28px; line-height: 1; margin: 12px 0 12px; color: var(--cream); font-weight: 500; }
        .step .d { font-size: 13.5px; color: rgba(251,246,236,.65); line-height: 1.55; margin: 0; text-wrap: pretty; }

        .visit-cta { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; }
        @media (min-width: 980px) { .visit-cta { align-items: flex-end; text-align: right; } }
        .visit-cta h3 {
          font-family: var(--serif);
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1.04;
          letter-spacing: -0.015em;
          margin: 0;
          color: var(--cream);
          font-weight: 500;
          text-wrap: balance;
        }
        .visit-cta h3 .saff { color: var(--saffron); font-style: italic; font-weight: 400; }
        .visit-cta .sub { font-size: 15px; color: rgba(251,246,236,.7); line-height: 1.5; max-width: 32ch; }

        .visit-pill {
          display: inline-flex; align-items: center; gap: 14px;
          padding: 18px 32px;
          border-radius: 999px;
          background: var(--saffron); color: var(--ink);
          font-size: 15px; font-weight: 700;
          transition: background .2s, color .2s, transform .2s;
        }
        .visit-pill:hover { background: var(--cream); color: var(--navy); transform: translateY(-1px); }

        .visit-eyebrow { color: rgba(251,246,236,.6); margin-bottom: 32px; }
        .visit-eyebrow .dot { background: var(--saffron); }

        .visit-phone {
          margin-top: 6px;
          font-family: var(--serif);
          font-size: 30px;
          color: var(--saffron);
          letter-spacing: -0.01em;
          font-weight: 500;
        }
      `}</style>

      <div className="section-inner visit-inner">
        <div className="eyebrow visit-eyebrow"><span className="dot"></span>Admissions open · Session 2026–27 · Nursery to Class X</div>
        <h2 className="visit-quote reveal">
          Come walk through the gate. We will meet you at the <span className="saff">office.</span>
        </h2>
        <p className="visit-attr reveal d1"><b>—  Shri Sharma</b> Principal</p>

        <div className="visit-bottom">
          <div className="visit-steps reveal d2">
            {steps.map((s, i) => (
              <div key={i} className="step">
                <div className="n">{s.n}</div>
                <div className="t">{s.t}</div>
                <p className="d">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="visit-cta reveal d3">
            <h3>Visit the school<span className="saff"> in person.</span></h3>
            <p className="sub">Sunhill Public School, Maranchi · Open Mon–Sat, 8:00 am to 2:00 pm · Office until 4:00 pm.</p>
            <div className="visit-phone">+91 8265 1318</div>
            <a href="#" className="visit-pill">
              Get directions
              <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Find us (map) ─────────────────────── */
function FindUs() {
  // Exact pin from the short link the school shared:
  // https://maps.app.goo.gl/mUkkWN6CPeAzC5Qv7 → 25.3604412, 85.9939213
  const LAT = 25.3604412;
  const LNG = 85.9939213;
  const mapDirect = 'https://maps.app.goo.gl/mUkkWN6CPeAzC5Qv7';
  const embedSrc = `https://www.google.com/maps?q=loc:${LAT},${LNG}(Sunhill+Public+School)&z=17&hl=en&output=embed`;

  return (
    <section className="section findus" id="find" data-screen-label="09 Find us">
      <style>{`
        .findus { background: var(--cream); padding-top: clamp(80px, 10vh, 140px); padding-bottom: clamp(80px, 10vh, 140px); }
        .fu-head { display: grid; gap: 24px; margin-bottom: 48px; }
        @media (min-width: 980px) { .fu-head { grid-template-columns: 1.3fr 1fr; align-items: end; gap: 48px; } }
        .fu-head h2 {
          font-family: var(--serif);
          font-size: clamp(48px, 6.5vw, 88px);
          line-height: 0.98;
          letter-spacing: -0.02em;
          margin: 14px 0 0;
          color: var(--navy);
          font-weight: 500;
          text-wrap: balance;
        }
        .fu-head h2 .saff { color: var(--saffron); font-style: italic; font-weight: 400; }
        .fu-head p { font-size: clamp(16px, 1.2vw, 18px); line-height: 1.6; color: var(--ink-soft); max-width: 42ch; margin: 0; text-wrap: pretty; }

        .fu-frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: var(--navy);
          aspect-ratio: 16 / 9;
          box-shadow: 0 30px 70px -30px rgba(26,15,8,.4), 0 6px 16px -6px rgba(26,15,8,.15);
          border: 1px solid var(--line);
        }
        @media (max-width: 720px) { .fu-frame { aspect-ratio: 4 / 5; } }
        .fu-frame iframe {
          width: 100%; height: 100%;
          border: 0;
          display: block;
          filter: saturate(0.85) contrast(1.02) sepia(0.08);
        }
        .fu-frame::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(155deg, rgba(27,42,107,0.04) 0%, transparent 30%, rgba(177,18,38,0.04) 100%);
          pointer-events: none;
          z-index: 2;
        }

        .fu-pin {
          position: absolute;
          top: 8%; right: 6%;
          background: var(--cream);
          color: var(--ink);
          padding: 6px 10px 6px 6px;
          border-radius: 999px;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          font-weight: 700;
          display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 20px -6px rgba(26,15,8,.3);
          z-index: 3;
          pointer-events: none;
        }
        .fu-pin .dot {
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--red);
          display: inline-flex; align-items: center; justify-content: center;
          color: var(--cream); font-size: 10px;
          position: relative;
        }
        .fu-pin .dot::after {
          content: ''; position: absolute; inset: -4px;
          border-radius: 50%;
          border: 1px solid var(--red);
          animation: pingPin 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pingPin {
          0% { transform: scale(1); opacity: .6; }
          80%, 100% { transform: scale(2.6); opacity: 0; }
        }

        .fu-card {
          position: absolute;
          left: clamp(18px, 3vw, 28px);
          bottom: clamp(18px, 3vw, 28px);
          background: var(--paper);
          border-radius: 14px;
          padding: 22px 24px;
          max-width: 360px;
          box-shadow: 0 20px 50px -16px rgba(26,15,8,.35);
          z-index: 3;
          border: 1px solid var(--line-soft);
        }
        @media (max-width: 720px) {
          .fu-frame { aspect-ratio: 4 / 5; overflow: visible; background: transparent; box-shadow: none; border: 0; }
          .fu-frame iframe { border-radius: 14px; box-shadow: 0 20px 50px -20px rgba(26,15,8,.3); }
          .fu-card {
            position: relative;
            left: auto; right: auto; bottom: auto;
            margin-top: 14px;
            max-width: none;
            padding: 18px 20px;
          }
          .fu-pin { top: 14px; right: 14px; }
        }
        .fu-card .cap {
          font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--red); font-weight: 700; margin-bottom: 10px;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .fu-card .cap::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: var(--saffron);
        }
        .fu-card h3 {
          font-family: var(--serif);
          font-size: clamp(20px, 1.8vw, 24px);
          line-height: 1.1;
          margin: 0 0 8px;
          color: var(--navy);
          font-weight: 500;
          letter-spacing: -0.005em;
        }
        .fu-card .addr {
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--ink-soft);
          margin: 0 0 14px;
        }
        .fu-card .open {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 16px;
          border-radius: 999px;
          background: var(--navy);
          color: var(--cream);
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.01em;
          transition: background .2s, transform .2s;
        }
        .fu-card .open:hover { background: var(--red); transform: translateY(-1px); }

        .fu-extras {
          margin-top: 32px;
          display: grid; gap: 16px;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 720px) { .fu-extras { grid-template-columns: repeat(4, 1fr); } }
        .fu-extra {
          padding: 22px 20px;
          border-radius: 12px;
          background: var(--paper);
          border: 1px solid var(--line-soft);
        }
        .fu-extra .lbl {
          font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-mute); font-weight: 600;
          margin-bottom: 10px;
        }
        .fu-extra .val {
          font-family: var(--serif);
          font-size: clamp(18px, 1.5vw, 22px);
          line-height: 1.15;
          color: var(--navy);
          font-weight: 500;
          letter-spacing: -0.005em;
        }
        .fu-extra .val.small { font-size: 16px; }
        .fu-extra a:hover .val { color: var(--red); }
      `}</style>

      <div className="section-inner">
        <div className="fu-head reveal">
          <div>
            <div className="eyebrow"><span className="dot"></span>Find us</div>
            <h2>On the road through <span className="saff">Maranchi.</span></h2>
          </div>
          <p>The school is set just off the village road, a short walk from the panchayat office. Tap the map to open directions in Google Maps.</p>
        </div>

        <div className="fu-frame reveal d1">
          <iframe
            src={embedSrc}
            title="Sunhill Public School on Google Maps"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="fu-pin">
            <span className="dot">✺</span>
            <span>Sunhill Public School</span>
          </div>

          <div className="fu-card">
            <div className="cap">The school gate</div>
            <h3>Sunhill Public School,<br />Maranchi</h3>
            <p className="addr">
              Maranchi, Dist. Patna,<br />
              Bihar &nbsp;·&nbsp; CBSE Curriculum
            </p>
            <a href={mapDirect} className="open" target="_blank" rel="noopener noreferrer">
              Open in Google Maps
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2h6v6M10 2 4 8M2 5v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="fu-extras reveal d2">
          <div className="fu-extra">
            <div className="lbl">School hours</div>
            <div className="val">Mon – Sat<br />8:00 am – 2:00 pm</div>
          </div>
          <div className="fu-extra">
            <div className="lbl">Office hours</div>
            <div className="val">Mon – Sat<br />8:00 am – 4:00 pm</div>
          </div>
          <a className="fu-extra" href="tel:+918265131800">
            <div className="lbl">Call the office</div>
            <div className="val">+91 8265 1318</div>
          </a>
          <a className="fu-extra" href="mailto:office@sunhillmaranchi.in">
            <div className="lbl">Write to us</div>
            <div className="val small">office@sunhillmaranchi.in</div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Footer ─────────────────────── */
function Footer() {
  return (
    <footer className="footer" data-screen-label="09 Footer">
      <style>{`
        .footer { background: #0A0805; color: rgba(251,246,236,.8); padding: clamp(72px, 9vh, 120px) var(--gutter) 32px; position: relative; overflow: hidden; }
        .footer-inner { max-width: var(--maxw); margin: 0 auto; position: relative; z-index: 1; }
        .footer-top { display: grid; gap: 48px; grid-template-columns: 1fr; }
        @media (min-width: 880px) { .footer-top { grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 56px; align-items: start; } }

        .footer-brand .mark { display: flex; align-items: flex-start; gap: 14px; }
        .footer-brand .crest-img { width: 56px; height: 56px; border-radius: 50%; background: var(--cream); padding: 4px; flex-shrink: 0; }
        .footer-brand .crest-img img { width: 100%; height: 100%; object-fit: contain; }
        .footer-brand h4 { font-family: var(--serif); font-size: 24px; margin: 0; color: var(--cream); letter-spacing: -0.005em; font-weight: 500; line-height: 1.1; }
        .footer-brand .est { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(251,246,236,.5); margin-top: 6px; font-weight: 600; }
        .footer-brand .motto { font-family: var(--devanagari); font-size: 22px; color: var(--saffron); margin-top: 20px; }
        .footer-brand p { margin: 12px 0 0; font-size: 14px; line-height: 1.6; color: rgba(251,246,236,.55); max-width: 32ch; }

        .footer-col h5 { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(251,246,236,.5); font-weight: 600; margin: 0 0 18px; }
        .footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .footer-col a { font-size: 14px; color: rgba(251,246,236,.75); transition: color .2s; }
        .footer-col a:hover { color: var(--saffron); }
        .footer-col address { font-style: normal; font-size: 14px; line-height: 1.6; color: rgba(251,246,236,.75); }
        .footer-col .biggie { font-family: var(--serif); font-size: 22px; color: var(--cream); margin: 0 0 10px; font-weight: 500; }

        .footer-bottom {
          display: flex; justify-content: space-between; align-items: end;
          margin-top: 64px;
          padding-top: 24px;
          border-top: 1px solid rgba(251,246,236,.12);
          gap: 24px;
          flex-wrap: wrap;
          font-size: 12px; color: rgba(251,246,236,.45);
        }
        .footer-bottom .legal { display: flex; gap: 18px; }
        .footer-bottom .legal a { color: rgba(251,246,236,.45); }
        .footer-bottom .legal a:hover { color: var(--saffron); }

        .footer-massive {
          font-family: var(--serif);
          font-size: clamp(80px, 22vw, 320px);
          line-height: 0.84;
          letter-spacing: -0.04em;
          color: rgba(251,246,236,.04);
          margin: 32px 0 -20px;
          padding: 0;
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
          overflow: hidden;
          font-weight: 500;
        }
        .footer-massive .saff { font-style: italic; color: rgba(242,107,31,.08); }
        .footer-bg-sun {
          position: absolute;
          left: -150px; bottom: -180px;
          width: 500px; height: 500px;
          opacity: .08;
          pointer-events: none;
        }

        .reg-tag {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 4px 10px; border: 1px solid rgba(251,246,236,.18);
          border-radius: 999px; font-size: 10px; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(251,246,236,.6); margin-top: 14px;
          font-weight: 600;
        }
      `}</style>

      {/* Background sun mark */}
      <svg className="footer-bg-sun" viewBox="0 0 500 500" fill="none" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 20;
          const r1 = 130;
          const r2 = i % 2 === 0 ? 240 : 200;
          const x1 = 250 + Math.cos(a) * r1;
          const y1 = 250 + Math.sin(a) * r1;
          const x2 = 250 + Math.cos(a) * r2;
          const y2 = 250 + Math.sin(a) * r2;
          const ax = 250 + Math.cos(a + Math.PI / 20) * r1;
          const ay = 250 + Math.sin(a + Math.PI / 20) * r1;
          const bx = 250 + Math.cos(a - Math.PI / 20) * r1;
          const by = 250 + Math.sin(a - Math.PI / 20) * r1;
          return <path key={i} d={`M${ax} ${ay} L${x2} ${y2} L${bx} ${by} Z`} fill={i % 2 === 0 ? '#F26B1F' : '#B11226'} />;
        })}
        <circle cx="250" cy="250" r="120" fill="#FBF6EC" />
      </svg>

      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="mark">
              <div className="crest-img"><img src="photos/logo.png" alt="Crest" /></div>
              <div>
                <h4>Shahid Priya Sharma Memorial<br />Sunhill Public School</h4>
                <div className="est">Maranchi · Patna · Estd. 2003</div>
              </div>
            </div>
            <div className="motto">अमृतं तु विद्या</div>
            <p>A CBSE day school in Maranchi, Patna. Small enough that every child is known by name.</p>
            <div className="reg-tag">CBSE Reg. 23014 · Udise 10261901518</div>
          </div>

          <div className="footer-col">
            <h5>Visit</h5>
            <p className="biggie">Maranchi, Patna</p>
            <address>
              Sunhill Public School,<br />
              Maranchi, Dist. Patna,<br />
              Bihar 803302 <br /><br />
              +91 8265 1318<br />
              office@sunhillmaranchi.in
            </address>
          </div>

          <div className="footer-col">
            <h5>Explore</h5>
            <ul>
              <li><a href="#about">About the school</a></li>
              <li><a href="#academics">Academics</a></li>
              <li><a href="#life">Life at Sunhill</a></li>
              <li><a href="#words">Words on the wall</a></li>
              <li><a href="#news">News & Notices</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Belong</h5>
            <ul>
              <li><a href="#visit">Admissions 2026–27</a></li>
              <li><a href="#">Fee structure</a></li>
              <li><a href="#">Transfer certificate</a></li>
              <li><a href="#">Careers · Teaching</a></li>
              <li><a href="#">Alumni</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-massive">
          Sun <span className="saff">hill.</span>
        </div>

        <div className="footer-bottom">
          <div>© 2003–2026 Shahid Priya Sharma Memorial Sunhill Public School. All rights reserved.</div>
          <div className="legal">
            <a href="#">Mandatory Disclosure</a>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { News, Visit, FindUs, Footer });
