/* ============================================================================
   story.jsx — Welcome (Principal's note), Memorial, Academics (Nursery→X)
   Exports: Welcome, Memorial, Academics
   ============================================================================ */

/* ─────────────────────── Welcome ─────────────────────── */
function Welcome() {
  return (
    <section className="section welcome" id="about" data-screen-label="02 Welcome">
      <style>{`
        .welcome { background: var(--paper); }
        .welcome-grid {
          display: grid; gap: clamp(32px, 4vw, 64px);
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .welcome-grid { grid-template-columns: 1.1fr 1fr; align-items: start; }
        }
        .w-letter h2 {
          font-family: var(--serif);
          font-size: clamp(40px, 5.4vw, 76px);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--navy);
          margin: 18px 0 28px;
          text-wrap: balance;
          font-weight: 500;
        }
        .w-letter h2 .saff { color: var(--saffron); font-style: italic; font-weight: 400; }
        .w-letter p { color: var(--ink-soft); font-size: clamp(16px, 1.15vw, 18px); line-height: 1.65; margin: 0 0 16px; text-wrap: pretty; }
        .w-letter .first { font-family: var(--serif); font-size: 22px; line-height: 1.4; color: var(--ink); font-style: italic; margin-bottom: 24px; }
        .w-letter .first::first-letter {
          font-family: var(--serif);
          font-size: 64px;
          line-height: 0.85;
          float: left;
          padding: 8px 12px 0 0;
          color: var(--red);
          font-style: normal;
        }

        .signature { display: flex; align-items: center; gap: 16px; margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--line); }
        .sig-name { font-family: var(--serif); font-style: italic; font-size: 28px; color: var(--navy); font-weight: 500; }
        .sig-role { display:block; font-family: var(--sans); font-style: normal; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); margin-top: 4px; font-weight: 600; }
        .sig-mark {
          width: 64px; height: 64px; border-radius: 50%;
          background: var(--navy);
          color: var(--cream);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--serif); font-size: 26px; font-style: italic;
          flex-shrink: 0;
        }

        /* Right: stacked bento */
        .w-bento {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-auto-rows: 120px;
          gap: 12px;
        }
        .w-cell {
          border-radius: 16px;
          padding: 20px;
          background: var(--ivory);
          border: 1px solid var(--line-soft);
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
          transition: transform .3s cubic-bezier(.3,.7,.4,1);
        }
        .w-cell:hover { transform: translateY(-2px); }
        .w-cell .cap { font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); font-weight: 600; }
        .w-cell .big { font-family: var(--serif); font-size: clamp(26px, 2.6vw, 38px); line-height: 1; letter-spacing: -0.01em; color: var(--ink); margin: 0; font-weight: 500; }

        .c-photo { grid-column: span 4; grid-row: span 3; padding: 0; }
        .c-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .c-photo .overlay {
          position: absolute; left: 0; right: 0; bottom: 0;
          padding: 16px;
          background: linear-gradient(0deg, rgba(26,15,8,.85), transparent);
          color: var(--cream);
        }
        .c-photo .overlay .cap { color: rgba(251,246,236,.7); }
        .c-photo .overlay .big { color: var(--cream); font-size: 22px; }

        .c-saff {
          grid-column: span 2; grid-row: span 2;
          background: linear-gradient(155deg, var(--saffron) 0%, var(--red) 100%);
          color: var(--cream);
        }
        .c-saff .cap { color: rgba(251,246,236,.7); }
        .c-saff .big { color: var(--cream); }

        .c-navy { grid-column: span 2; background: var(--navy); color: var(--cream); }
        .c-navy .cap { color: rgba(251,246,236,.65); }
        .c-navy .big { color: var(--cream); font-style: italic; font-size: 18px; line-height: 1.2; }

        .c-cream { grid-column: span 3; }
        .c-cream .big { color: var(--navy); font-style: italic; font-size: 18px; line-height: 1.25; }

        .c-stamp { grid-column: span 3; background: var(--cream); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: center; }
        .c-stamp .row { display: flex; justify-content: space-between; align-items: baseline; }
        .c-stamp b { font-family: var(--serif); font-weight: 500; font-size: 22px; color: var(--red); letter-spacing: -0.01em; }

        @media (max-width: 720px) {
          .w-bento { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 110px; }
          .c-photo, .c-saff, .c-navy, .c-cream, .c-stamp { grid-column: span 2; }
          .c-photo { grid-row: span 2; }
        }
      `}</style>

      <div className="section-inner welcome-grid">
        <div className="w-letter reveal">
          <div className="eyebrow"><span className="dot"></span>A note from the Principal</div>
          <h2>We are a small school<br />with a <span className="saff">long memory.</span></h2>
          <p className="first">
            Welcome to Sunhill. Walk into any classroom here and you will find the same
            three things: a ceiling fan, a wall full of writing, and a child who is
            certain they have something to say.
          </p>
          <p>
            We are a CBSE day school in Maranchi, founded in 2003 in memory of Priya
            Sharma. The school carries her name as its first promise — that every child
            who walks through these doors will be taken seriously, taught carefully, and
            sent home each evening a little surer of themselves.
          </p>
          <p>
            We don't have the largest campus in the district, or the latest equipment in
            every room. What we have is a faculty that learned to teach here, and parents
            who turned up the morning we put up the flagpole.
          </p>
          <div className="signature">
            <div className="sig-mark">C</div>
            <div>
              <span className="sig-name">Chandan Kumar</span>
              <span className="sig-role">Principal · Sunhill Public School</span>
            </div>
          </div>
        </div>

        <div className="w-bento reveal d1">
          <div className="w-cell c-photo">
            <img src="photos/independence-day.jpeg" alt="Children with Indian flags on Independence Day" loading="lazy" decoding="async" />
            <div className="overlay">
              <div className="cap">15 August · Independence Day</div>
              <div className="big">All of Maranchi, in white and tricolour.</div>
            </div>
          </div>
          <div className="w-cell c-saff">
            <span className="cap">Ratio</span>
            <div>
              <p className="big">1 : 22</p>
              <p style={{ marginTop: 6, fontSize: 13, opacity: .85 }}>teacher to student</p>
            </div>
          </div>
          <div className="w-cell c-navy">
            <span className="cap">On every wall</span>
            <p className="big">"Slow and steady<br />wins the race."</p>
          </div>
          <div className="w-cell c-cream">
            <span className="cap">In the corridor</span>
            <p className="big">"Time once lost<br />never comes back."</p>
          </div>
          <div className="w-cell c-stamp">
            <span className="cap">Affiliated to</span>
            <div className="row" style={{ marginTop: 8 }}>
              <b>CBSE</b>
              <span style={{ fontSize: 12, color: 'var(--ink-mute)', letterSpacing: '0.08em' }}>Reg. 23014</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Memorial section ─────────────────────── */
function Memorial() {
  return (
    <section className="section memorial" data-screen-label="03 Memorial">
      <style>{`
        .memorial {
          background: linear-gradient(180deg, var(--maroon) 0%, #2A0810 100%);
          color: var(--cream);
          position: relative;
          overflow: hidden;
        }
        .memorial::before {
          content: '';
          position: absolute; left: 50%; top: -300px; transform: translateX(-50%);
          width: 1200px; height: 1200px;
          background: radial-gradient(circle at center, rgba(242,107,31,0.18) 0%, transparent 55%);
          pointer-events: none;
        }
        .mem-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; text-align: center; }
        .mem-eyebrow { color: rgba(251,246,236,.65); justify-content: center; }
        .mem-eyebrow .dot { background: var(--saffron); }
        .mem-name {
          font-family: var(--serif);
          font-size: clamp(40px, 6vw, 84px);
          line-height: 1;
          margin: 22px 0 18px;
          color: var(--cream);
          font-weight: 500;
          letter-spacing: -0.015em;
          text-wrap: balance;
        }
        .mem-name .saff { color: var(--saffron); font-style: italic; }
        .mem-dates {
          display: inline-flex; align-items: center; gap: 16px;
          font-family: var(--serif); font-style: italic;
          font-size: 18px;
          color: rgba(251,246,236,.6);
          margin-bottom: 36px;
        }
        .mem-dates .bar { display: inline-block; width: 28px; height: 1px; background: var(--saffron); }
        .mem-body {
          font-family: var(--serif);
          font-size: clamp(22px, 2.4vw, 32px);
          line-height: 1.35;
          color: var(--cream);
          font-weight: 400;
          max-width: 26ch;
          margin: 0 auto;
          text-wrap: balance;
        }
        .mem-body .em { color: var(--saffron); font-style: italic; }
        .mem-quote {
          margin-top: 56px;
          padding-top: 36px;
          border-top: 1px solid rgba(251,246,236,.18);
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: center;
        }
        @media (min-width: 720px) {
          .mem-quote { grid-template-columns: 1fr 1fr 1fr; gap: 36px; text-align: left; }
        }
        .mem-q-col {
          font-size: 14px; line-height: 1.55;
          color: rgba(251,246,236,.65);
        }
        .mem-q-col b { display: block; font-family: var(--serif); font-style: italic; font-weight: 500; font-size: 22px; color: var(--cream); margin-bottom: 8px; letter-spacing: -0.005em; }
        .mem-flame {
          width: 56px; height: 56px;
          margin: 0 auto 28px;
        }
      `}</style>

      <div className="section-inner mem-inner reveal">
        {/* small flame mark */}
        <svg className="mem-flame" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <path d="M28 6c-2 10 8 14 8 22a8 8 0 0 1-8 8 8 8 0 0 1-8-8c0-4 3-7 5-11 1 4 4 5 4 5s-3-6-1-16z"
                fill="url(#flameGrad)" />
          <defs>
            <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFD27A" />
              <stop offset="60%" stopColor="#F26B1F" />
              <stop offset="100%" stopColor="#B11226" />
            </linearGradient>
          </defs>
          <circle cx="28" cy="48" r="2" fill="var(--saffron)" opacity=".5" />
        </svg>

        <div className="eyebrow mem-eyebrow"><span className="dot"></span>In Memoriam · The school's namesake</div>
        <h2 className="mem-name">Shahid <span className="saff">Priya</span> Sharma</h2>
        <div className="mem-dates"><span className="bar"></span><span>Remembered by name, every morning, since 2003</span><span className="bar"></span></div>
        <p className="mem-body">
          A school built in her memory carries a weight, and a softness.
          We try to be worthy of <span className="em">both,</span> every day.
        </p>

        <div className="mem-quote">
          <div className="mem-q-col">
            <b>The promise</b>
            That every child who walks through our gate is taken seriously, taught with patience, and never made small.
          </div>
          <div className="mem-q-col">
            <b>The discipline</b>
            A long memory. We notice the child who has been quiet for two days. We remember the one who finally raised a hand.
          </div>
          <div className="mem-q-col">
            <b>The joy</b>
            The mid-morning bell. The hot khichdi on Wednesdays. The sound of the whole school singing the anthem on a foggy August morning.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Academics (CBSE Nursery → X) ─────────────────────── */
function Academics() {
  const sections = [
    {
      id: 'pre', tag: 'Pre-Primary', grades: 'Nursery · LKG · UKG',
      title: 'Small chairs, big questions.',
      desc: 'Our youngest learners. The day is short, the snacks are early, and almost everything happens through play, song, and reading aloud. We focus on the alphabet, numbers, colours, and the much harder lesson of sitting at a desk for ten minutes.',
      bullets: ['Short school day · 8:00 to 12:30', 'Picture books · daily storytime', 'No formal homework', 'Mid-morning snack provided'],
      photo: 'photos/building.jpeg',
      caption: 'Pre-Primary classroom · Nursery & LKG',
    },
    {
      id: 'pri', tag: 'Primary', grades: 'Class I – V',
      title: 'Where reading, writing, and asking why begin in earnest.',
      desc: 'The core of the school. English, Hindi, Mathematics, EVS, and the slow building of handwriting that takes five years to finish. We teach to the CBSE syllabus but at a pace that respects the child.',
      bullets: ['English, Hindi, Maths, EVS, Computer', 'Class-teacher model · one teacher per class', 'Daily reading hour from Class II', 'House system from Class III'],
      photo: 'photos/classroom-1.jpeg',
      caption: 'Class III · Tuesday morning',
    },
    {
      id: 'mid', tag: 'Middle', grades: 'Class VI – VIII',
      title: 'The years of opinions, projects, and a real science notebook.',
      desc: 'Subject teachers take over. Sanskrit joins the timetable. The science lab opens. Notebooks get thicker, and so do the questions. This is also when our students begin to lead — house captains, monitors, and the morning announcements.',
      bullets: ['Subject teachers · 7 periods a day', 'Sanskrit + a third language', 'Working science lab', 'House captains elected'],
      photo: 'photos/classroom-2.jpeg',
      caption: 'Class VII · Section B',
    },
    {
      id: 'sec', tag: 'Secondary', grades: 'Class IX – X',
      title: 'The final two years, ending at the CBSE Board examination.',
      desc: 'Everything before this leads here. Two years of focused preparation across the five Board subjects, with extra evening hours, practical files, and a faculty that has guided every batch since 2007 to the same finish line.',
      bullets: ['CBSE Board prep · 2-year programme', 'Extra evening sessions, Sep–Mar', 'Pre-Board examinations × 2', '100% appeared · Class X 2025'],
      photo: 'photos/classroom-4.jpeg',
      caption: 'Class X · Senior batch photograph',
    },
  ];
  const [active, setActive] = React.useState('pre');
  const current = sections.find((s) => s.id === active);

  return (
    <section className="section academics" id="academics" data-screen-label="04 Academics">
      <style>{`
        .academics { background: var(--paper); }
        .ac-head { max-width: 1000px; margin-bottom: 64px; }
        .ac-head h2 {
          font-family: var(--serif);
          font-size: clamp(48px, 6.5vw, 96px);
          line-height: 0.98;
          letter-spacing: -0.02em;
          margin: 14px 0 24px;
          color: var(--navy);
          font-weight: 500;
          text-wrap: balance;
        }
        .ac-head h2 .saff { color: var(--saffron); font-style: italic; font-weight: 400; }
        .ac-head p { font-size: clamp(17px, 1.25vw, 19px); line-height: 1.6; color: var(--ink-soft); max-width: 56ch; text-wrap: pretty; }

        .ac-tabs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin-bottom: 48px;
        }
        @media (max-width: 700px) { .ac-tabs { grid-template-columns: repeat(2, 1fr); } }
        .ac-tab {
          appearance: none; border: none;
          padding: 24px 22px;
          background: transparent;
          text-align: left;
          border-right: 1px solid var(--line);
          cursor: pointer;
          position: relative;
          transition: background .2s, color .2s;
        }
        .ac-tab:last-child { border-right: none; }
        @media (max-width: 700px) { .ac-tab:nth-child(2n) { border-right: none; } .ac-tab { border-bottom: 1px solid var(--line); } .ac-tab:nth-last-child(-n+2) { border-bottom: none; }  }
        .ac-tab::before {
          content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 3px;
          background: var(--saffron); transform: scaleX(0); transform-origin: left;
          transition: transform .4s cubic-bezier(.3,.7,.4,1);
        }
        .ac-tab.on::before { transform: scaleX(1); }
        .ac-tab.on { background: var(--cream); }
        .ac-tab:hover { background: rgba(177,18,38,.04); }
        .ac-tab .num { font-family: var(--mono); font-size: 11px; color: var(--ink-mute); letter-spacing: 0.12em; font-weight: 500; }
        .ac-tab.on .num { color: var(--red); }
        .ac-tab .tn { display: block; margin-top: 14px; font-family: var(--serif); font-size: 24px; letter-spacing: -0.01em; color: var(--navy); font-weight: 500; }
        .ac-tab .tg { display: block; margin-top: 4px; font-size: 12px; color: var(--ink-mute); letter-spacing: 0.02em; }

        .ac-panel { display: grid; grid-template-columns: 1fr; gap: 48px; }
        @media (min-width: 1024px) { .ac-panel { grid-template-columns: 1fr 1.05fr; gap: 64px; align-items: stretch; } }

        .ac-text h3 {
          font-family: var(--serif);
          font-size: clamp(34px, 4vw, 56px);
          line-height: 1.04;
          letter-spacing: -0.015em;
          margin: 14px 0 24px;
          color: var(--navy);
          font-weight: 500;
          text-wrap: balance;
        }
        .ac-text p { color: var(--ink-soft); font-size: 16px; line-height: 1.65; margin: 0 0 32px; max-width: 52ch; text-wrap: pretty; }
        .ac-bullets { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--line); }
        .ac-bullets li {
          display: grid;
          grid-template-columns: 28px 1fr auto;
          gap: 16px;
          padding: 18px 0;
          border-bottom: 1px solid var(--line);
          align-items: center;
          font-size: 15.5px;
          color: var(--ink);
        }
        .ac-bullets li .ix { font-family: var(--mono); font-size: 11px; color: var(--red); letter-spacing: 0.1em; font-weight: 500; }

        .ac-photo {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          min-height: 480px;
          background: var(--navy);
          box-shadow: 0 20px 60px -20px rgba(26,15,8,.3);
        }
        .ac-photo img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.95) contrast(1.04); }
        .ac-photo .overlay {
          position: absolute; left: 0; right: 0; bottom: 0;
          padding: 24px;
          background: linear-gradient(0deg, rgba(26,15,8,.85) 0%, transparent 100%);
          color: var(--cream);
        }
        .ac-photo .cap-cap { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(251,246,236,.7); font-weight: 600; }
        .ac-photo .cap-title { font-family: var(--serif); font-size: 24px; margin: 6px 0 0; font-weight: 500; }
        .ac-photo .ribbon {
          position: absolute; top: 20px; left: 20px;
          background: var(--saffron); color: var(--ink);
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          font-weight: 700;
        }
      `}</style>

      <div className="section-inner">
        <div className="ac-head reveal">
          <div className="eyebrow"><span className="dot"></span>Academics</div>
          <h2>Four sections, one <span className="saff">CBSE</span> classroom culture.</h2>
          <p>From Nursery to Class X, Sunhill follows the CBSE curriculum at a pace that respects the child. The school is structured as four small sections that share a building, a culture, and one long lunchtime bell.</p>
        </div>

        <div className="ac-tabs reveal d1">
          {sections.map((s, i) => (
            <button key={s.id} className={'ac-tab' + (active === s.id ? ' on' : '')} onClick={() => setActive(s.id)}>
              <span className="num">0{i + 1} · 04</span>
              <span className="tn">{s.tag}</span>
              <span className="tg">{s.grades}</span>
            </button>
          ))}
        </div>

        <div className="ac-panel" key={current.id}>
          <div className="ac-text reveal">
            <div className="eyebrow"><span className="dot"></span>{current.tag} · {current.grades}</div>
            <h3>{current.title}</h3>
            <p>{current.desc}</p>
            <ul className="ac-bullets">
              {current.bullets.map((b, i) => (
                <li key={i}>
                  <span className="ix">0{i + 1}</span>
                  <span>{b}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10m0 0L8 3m4 4-4 4" stroke="var(--ink-mute)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </li>
              ))}
            </ul>
          </div>
          <div className="ac-photo reveal d1">
            <img src={current.photo} alt={current.caption} loading="lazy" decoding="async" />
            <div className="ribbon">{current.tag}</div>
            <div className="overlay">
              <div className="cap-cap">{current.tag} · {current.grades}</div>
              <h4 className="cap-title">{current.caption}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Welcome, Memorial, Academics });
