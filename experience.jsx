/* ============================================================================
   experience.jsx — Wall of Words + Life at Sunhill (real-photo gallery)
   Exports: WallOfWords, LifeGallery
   ============================================================================ */

/* ─────────────────────── Wall of Words ─────────────────────── */
function WallOfWords() {
  const quotes = [
    {
      text: 'A Teacher is like a candle, that lights by consuming itself.',
      where: 'Painted above the corridor', face: 'serif', tone: 'navy',
    },
    {
      text: 'Slow and steady wins the race.',
      where: 'Outside Room No. 8', face: 'italic', tone: 'cream',
    },
    {
      text: 'Time once lost never comes back.',
      where: 'Above the staff room door', face: 'serif', tone: 'red',
    },
    {
      text: 'Every revolution in this world has begun with a single step.',
      where: 'Stairwell, ground floor', face: 'serif', tone: 'saffron',
    },
    {
      text: 'अमृतं तु विद्या',
      translit: 'Knowledge is the only nectar.',
      where: 'School crest · 2003', face: 'devanagari', tone: 'navy-bold',
    },
    {
      text: 'Be the change you wish to see.',
      where: 'Class VII bulletin board', face: 'italic', tone: 'cream',
    },
  ];

  return (
    <section className="section wow" id="words" data-screen-label="05 Wall of Words">
      <style>{`
        .wow {
          background: var(--paper);
          background-image: 
            radial-gradient(circle at 15% 20%, rgba(242,107,31,.06) 0, transparent 50%),
            radial-gradient(circle at 85% 80%, rgba(27,42,107,.05) 0, transparent 50%);
        }
        .wow-head { display: grid; gap: 24px; margin-bottom: 64px; }
        @media (min-width: 980px) { .wow-head { grid-template-columns: 1.2fr 1fr; align-items: end; gap: 48px; } }
        .wow-head h2 {
          font-family: var(--serif);
          font-size: clamp(48px, 6.5vw, 96px);
          line-height: 0.98;
          letter-spacing: -0.02em;
          margin: 14px 0 0;
          color: var(--navy);
          font-weight: 500;
          text-wrap: balance;
        }
        .wow-head h2 .saff { color: var(--saffron); font-style: italic; font-weight: 400; }
        .wow-head p { font-size: clamp(16px, 1.2vw, 18px); line-height: 1.6; color: var(--ink-soft); max-width: 44ch; margin: 0; text-wrap: pretty; }

        .wow-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        @media (max-width: 720px) { .wow-grid { grid-template-columns: 1fr; } }

        .wow-card {
          border-radius: 14px;
          padding: 32px 28px;
          position: relative;
          min-height: 280px;
          display: flex; flex-direction: column; justify-content: space-between;
          border: 1px solid var(--line-soft);
          transition: transform .35s cubic-bezier(.3,.7,.4,1);
          overflow: hidden;
        }
        .wow-card:hover { transform: translateY(-3px); }
        .wow-card .q-mark {
          font-family: var(--serif); font-style: italic;
          font-size: 80px;
          line-height: 0.6;
          opacity: .2;
          margin-bottom: -20px;
        }
        .wow-card .quote {
          font-family: var(--serif);
          font-size: clamp(20px, 1.7vw, 26px);
          line-height: 1.2;
          letter-spacing: -0.005em;
          margin: 0;
          font-weight: 500;
          text-wrap: balance;
        }
        .wow-card .where {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid currentColor;
          opacity: .55;
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          font-weight: 600;
        }
        .wow-card.italic .quote { font-style: italic; }
        .wow-card.devanagari .quote { font-family: var(--devanagari); font-size: clamp(36px, 3.6vw, 56px); line-height: 1; }
        .wow-card.devanagari .translit { font-family: var(--sans); font-size: 14px; color: inherit; opacity: .65; margin-top: 12px; font-style: italic; }

        .wow-card.cream { background: var(--cream); color: var(--ink); grid-column: span 2; grid-row: span 1; }
        .wow-card.navy { background: var(--navy); color: var(--cream); grid-column: span 2; grid-row: span 2; min-height: 380px; }
        .wow-card.red { background: var(--red); color: var(--cream); grid-column: span 2; }
        .wow-card.saffron { background: var(--saffron); color: var(--ink); grid-column: span 2; }
        .wow-card.navy-bold {
          background: linear-gradient(155deg, var(--navy) 0%, var(--maroon) 100%);
          color: var(--cream); grid-column: span 4; grid-row: span 2; min-height: 380px;
          text-align: center; align-items: center; justify-content: center;
        }
        .wow-card.navy-bold .translit { color: rgba(251,246,236,.6); }

        @media (max-width: 720px) {
          .wow-card { grid-column: span 1 !important; grid-row: auto !important; min-height: 220px; }
          .wow-card.devanagari { min-height: 300px; }
        }

        .wow-card .corner-ix {
          position: absolute; top: 20px; right: 22px;
          font-family: var(--mono); font-size: 11px;
          letter-spacing: 0.12em; opacity: .5;
          font-weight: 500;
        }
      `}</style>

      <div className="section-inner">
        <div className="wow-head reveal">
          <div>
            <div className="eyebrow"><span className="dot"></span>Words on the wall</div>
            <h2>Read the <span className="saff">walls.</span> The school will tell you what it believes.</h2>
          </div>
          <p>Sunhill has the quiet habit of painting its hopes onto the wall above the door. These six are the ones the children pass most often, every day.</p>
        </div>

        <div className="wow-grid">
          {quotes.map((q, i) => (
            <article key={i} className={'wow-card ' + q.tone + ' ' + q.face + ' reveal d' + ((i % 4) + 1)}>
              <span className="corner-ix">{String(i + 1).padStart(2, '0')} / 06</span>
              {q.face !== 'devanagari' && <div className="q-mark">"</div>}
              <div>
                <p className="quote">{q.text}</p>
                {q.translit && <p className="translit">{q.translit}</p>}
              </div>
              <div className="where">— {q.where}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Life at Sunhill (real-photo gallery) ─────────────────────── */
function LifeGallery() {
  // Spans matched to image aspect ratios so nothing gets badly cropped:
  // big (6×3, landscape) and small (3×2, landscape) take 4:3-ish photos.
  // tall (3×4, portrait) takes the portrait-oriented event photos.
  // wide (6×2, very wide) takes the long classroom hall.
  const items = [
    { src: 'photos/assembly-1.jpeg',       cap: 'Republic Day',       sub: 'Tricolour assembly on the school ground', span: 'big' },
    { src: 'photos/event-1.jpeg',          cap: 'Annual Function',    sub: 'A student steps forward for her prize',   span: 'tall' },
    { src: 'photos/assembly-2.jpeg',       cap: 'Flag Hoisting',      sub: 'Morning ceremony at the school gate',     span: 'small' },
    { src: 'photos/classroom-1.jpeg',      cap: 'Primary Classroom',  sub: 'A regular morning, Class III',            span: 'small' },
    { src: 'photos/classroom-2.jpeg',      cap: 'Middle School',      sub: 'A full classroom · Class VII',            span: 'wide' },
    { src: 'photos/students-group.jpeg',   cap: 'School Assembly',    sub: 'Faculty address the school',              span: 'tall' },
    { src: 'photos/independence-day.jpeg', cap: "Teachers' Day",      sub: 'Assembly hall · prize distribution',      span: 'small' },
    { src: 'photos/classroom-4.jpeg',      cap: 'Class X · Farewell', sub: 'Senior batch photograph',                 span: 'small' },
  ];

  const [focus, setFocus] = React.useState(null);

  return (
    <section className="section life" id="life" data-screen-label="06 Life">
      <style>{`
        .life {
          background: var(--cream);
          background-image: 
            repeating-linear-gradient(0deg, transparent 0 39px, rgba(177,18,38,0.04) 39px 40px);
        }
        .life-head { display: grid; gap: 24px; margin-bottom: 56px; }
        @media (min-width: 980px) { .life-head { grid-template-columns: 1.2fr 1fr; align-items: end; gap: 48px; } }
        .life-head h2 {
          font-family: var(--serif);
          font-size: clamp(48px, 6.5vw, 96px);
          line-height: 0.98;
          letter-spacing: -0.02em;
          margin: 14px 0 0;
          color: var(--navy);
          font-weight: 500;
          text-wrap: balance;
        }
        .life-head h2 .saff { color: var(--saffron); font-style: italic; font-weight: 400; }
        .life-head h2 .devnag { font-family: var(--devanagari); color: var(--red); font-style: normal; font-weight: 400; font-size: 0.7em; }
        .life-head p { font-size: clamp(16px, 1.2vw, 18px); line-height: 1.6; color: var(--ink-soft); max-width: 42ch; margin: 0; }

        .life-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: 140px;
          gap: 14px;
        }
        @media (max-width: 720px) { .life-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; } }

        .life-tile {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background: var(--navy);
          cursor: pointer;
          transition: transform .35s cubic-bezier(.3,.7,.4,1);
        }
        .life-tile:hover { transform: scale(1.012); }
        .life-tile img {
          width: 100%; height: 100%; object-fit: cover;
          filter: saturate(.95) contrast(1.05);
          transition: transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .life-tile:hover img { transform: scale(1.05); }
        .life-tile .info {
          position: absolute; left: 0; right: 0; bottom: 0;
          padding: 18px;
          background: linear-gradient(0deg, rgba(26,15,8,.86) 0%, rgba(26,15,8,.0) 100%);
          color: var(--cream);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity .3s, transform .3s;
        }
        .life-tile:hover .info { opacity: 1; transform: none; }
        .life-tile .info .c {
          font-family: var(--serif); font-size: 18px; font-weight: 500;
          letter-spacing: -0.005em;
        }
        .life-tile .info .s {
          font-size: 11.5px; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(251,246,236,.65); font-weight: 600;
          margin-top: 4px;
        }
        .life-tile .ribbon {
          position: absolute; top: 12px; left: 12px;
          padding: 5px 10px;
          background: rgba(253,250,241,.95);
          backdrop-filter: blur(6px);
          border-radius: 999px;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink); font-weight: 700;
        }
        .life-tile .ribbon::before {
          content: ''; display: inline-block; width: 5px; height: 5px;
          border-radius: 50%; background: var(--saffron);
          margin-right: 6px; vertical-align: middle; transform: translateY(-1px);
        }

        .span-big   { grid-column: span 6; grid-row: span 3; }
        .span-tall  { grid-column: span 3; grid-row: span 4; }
        .span-wide  { grid-column: span 6; grid-row: span 2; }
        .span-small { grid-column: span 3; grid-row: span 2; }

        @media (max-width: 720px) {
          .span-big, .span-tall, .span-wide, .span-small { grid-column: span 1; grid-row: span 1; }
          .span-big { grid-column: span 2; }
          .span-tall { grid-row: span 2; }
        }

        /* Focus overlay */
        .life-overlay {
          position: fixed; inset: 0;
          background: rgba(26,15,8,.92);
          z-index: 500;
          display: flex; align-items: center; justify-content: center;
          padding: clamp(20px, 4vw, 60px);
          cursor: pointer;
          backdrop-filter: blur(12px);
          animation: fadeIn .25s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .life-overlay img {
          max-width: 100%; max-height: 100%;
          border-radius: 6px;
          box-shadow: 0 30px 80px -20px rgba(0,0,0,.6);
        }
        .life-overlay .close {
          position: absolute; top: 24px; right: 24px;
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(251,246,236,.1);
          border: 1px solid rgba(251,246,236,.2);
          color: var(--cream);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono); font-size: 14px;
        }
        .life-overlay .caption {
          position: absolute; left: 24px; bottom: 24px;
          color: var(--cream);
          font-family: var(--serif); font-size: 22px;
          letter-spacing: -0.01em;
        }
        .life-overlay .caption .s { display: block; font-family: var(--sans); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(251,246,236,.6); margin-top: 6px; font-weight: 600; }
      `}</style>

      <div className="section-inner">
        <div className="life-head reveal">
          <div>
            <div className="eyebrow"><span className="dot"></span>Life at Sunhill</div>
            <h2>A school in <span className="saff">Maranchi,</span> in its own words.</h2>
          </div>
          <p>Photographs taken on ordinary mornings and a few extraordinary ones. Tap any photo to see it larger.</p>
        </div>

        <div className="life-grid reveal d1">
          {items.map((it, i) => (
            <button
              key={i}
              className={'life-tile span-' + it.span}
              onClick={() => setFocus(it)}
              aria-label={it.cap}
            >
              <img src={it.src} alt={it.cap} loading="lazy" />
              <span className="ribbon">{it.cap}</span>
              <div className="info">
                <div className="c">{it.cap}</div>
                <div className="s">{it.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {focus && (
        <div className="life-overlay" onClick={() => setFocus(null)}>
          <button className="close" aria-label="Close">✕</button>
          <img src={focus.src} alt={focus.cap} />
          <div className="caption">
            {focus.cap}
            <span className="s">{focus.sub}</span>
          </div>
        </div>
      )}
    </section>
  );
}

Object.assign(window, { WallOfWords, LifeGallery });
