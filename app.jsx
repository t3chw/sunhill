/* ============================================================================
   app.jsx — composes the Sunhill site
   ============================================================================ */

const PALETTES = {
  crest: {
    label: 'Crest',
    saffron: '#F26B1F', 'saffron-d': '#D65211',
    red: '#B11226', 'red-d': '#7E0D1B',
    maroon: '#4A0E16', navy: '#1B2A6B', 'navy-d': '#11194A',
    gold: '#C99A33',
    cream: '#FBF6EC', paper: '#FDFAF1', ivory: '#F4EDDD',
    ink: '#1A0F08', 'ink-soft': '#3D2C1F', 'ink-mute': '#806A55',
  },
  haldi: {
    label: 'Haldi & Sindoor',
    saffron: '#E8941A', 'saffron-d': '#C57411',
    red: '#A11A2A', 'red-d': '#75121E',
    maroon: '#3B0C12', navy: '#2B2452', 'navy-d': '#1A153D',
    gold: '#C99A33',
    cream: '#FBF3DC', paper: '#FCF8E8', ivory: '#F2E9CF',
    ink: '#1F1308', 'ink-soft': '#42301E', 'ink-mute': '#85734E',
  },
  monsoon: {
    label: 'Monsoon',
    saffron: '#E07A1F', 'saffron-d': '#B95A12',
    red: '#9F1D32', 'red-d': '#741022',
    maroon: '#391118', navy: '#0F3F47', 'navy-d': '#082930',
    gold: '#BB8932',
    cream: '#F2EFE3', paper: '#F6F3E7', ivory: '#E5E1D2',
    ink: '#0D1A1C', 'ink-soft': '#2D3D40', 'ink-mute': '#6A7B7E',
  },
  classic: {
    label: 'Slate & Saffron',
    saffron: '#E8941A', 'saffron-d': '#C57411',
    red: '#8E1626', 'red-d': '#5E0E19',
    maroon: '#280910', navy: '#1A1F2E', 'navy-d': '#0F121C',
    gold: '#A77F2A',
    cream: '#F1ECDE', paper: '#F6F1E4', ivory: '#E5DEC9',
    ink: '#0F0C08', 'ink-soft': '#34281D', 'ink-mute': '#7A6B57',
  },
};

function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  // Intro state — only show on v2 (when window.SHOW_INTRO is true),
  // skip if user has reduced motion, allow replay via Tweaks
  const [introDone, setIntroDone] = React.useState(() => {
    if (!window.SHOW_INTRO) return true;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    return false;
  });
  const replayIntro = React.useCallback(() => {
    setIntroDone(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  React.useEffect(() => {
    const p = PALETTES[t.palette] || PALETTES.crest;
    const root = document.documentElement;
    Object.entries(p).forEach(([k, v]) => {
      if (k === 'label') return;
      root.style.setProperty('--' + k, v);
    });
  }, [t.palette]);

  useReveal();

  // Arrow keys jump between sections
  React.useEffect(() => {
    const ids = ['top', 'about', 'academics', 'words', 'life', 'news', 'visit', 'find'];
    const onKey = (e) => {
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      const cur = ids.findIndex((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 80 && r.bottom > 80;
      });
      let next = cur;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') next = Math.min(ids.length - 1, cur + 1);
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') next = Math.max(0, cur - 1);
      else return;
      e.preventDefault();
      document.getElementById(ids[next])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {!introDone && <SunriseIntro onDone={() => setIntroDone(true)} />}
      <CustomCursor enabled={t.cursor !== false} />
      <Nav />
      <main>
        <Hero motionLevel={t.motion} />
        <Welcome />
        <Memorial />
        <Academics />
        <WallOfWords />
        <LifeGallery />
        <News />
        <Visit />
        <FindUs />
        <Footer />
      </main>

      <TweaksPanel title="Tweaks · Sunhill">
        <TweakSection label="Palette" />
        <TweakColor
          label="Mood"
          value={t.paletteColors}
          options={[
            ['#F26B1F', '#B11226', '#1B2A6B', '#FBF6EC'],
            ['#E8941A', '#A11A2A', '#2B2452', '#FBF3DC'],
            ['#E07A1F', '#9F1D32', '#0F3F47', '#F2EFE3'],
            ['#E8941A', '#8E1626', '#1A1F2E', '#F1ECDE'],
          ]}
          onChange={(v) => {
            const map = [
              { key: 'crest',    colors: ['#F26B1F', '#B11226', '#1B2A6B', '#FBF6EC'] },
              { key: 'haldi',    colors: ['#E8941A', '#A11A2A', '#2B2452', '#FBF3DC'] },
              { key: 'monsoon',  colors: ['#E07A1F', '#9F1D32', '#0F3F47', '#F2EFE3'] },
              { key: 'classic',  colors: ['#E8941A', '#8E1626', '#1A1F2E', '#F1ECDE'] },
            ];
            const ix = map.findIndex(m => JSON.stringify(m.colors) === JSON.stringify(v));
            const key = (map[ix] || map[0]).key;
            setTweak({ paletteColors: v, palette: key });
          }}
        />
        <TweakSelect
          label="Named"
          value={t.palette}
          options={[
            { value: 'crest',    label: 'Crest (default)' },
            { value: 'haldi',    label: 'Haldi & Sindoor' },
            { value: 'monsoon',  label: 'Monsoon' },
            { value: 'classic',  label: 'Slate & Saffron' },
          ]}
          onChange={(v) => {
            const colors = {
              crest:    ['#F26B1F', '#B11226', '#1B2A6B', '#FBF6EC'],
              haldi:    ['#E8941A', '#A11A2A', '#2B2452', '#FBF3DC'],
              monsoon:  ['#E07A1F', '#9F1D32', '#0F3F47', '#F2EFE3'],
              classic:  ['#E8941A', '#8E1626', '#1A1F2E', '#F1ECDE'],
            }[v];
            setTweak({ palette: v, paletteColors: colors });
          }}
        />

        <TweakSection label="Motion" />
        <TweakSlider
          label="Parallax intensity"
          value={t.motion}
          min={0} max={10} step={1}
          onChange={(v) => setTweak('motion', v)}
        />
        <TweakToggle
          label="Custom cursor"
          value={t.cursor}
          onChange={(v) => setTweak('cursor', v)}
        />

        <TweakSection label="Jump to" />
        {window.SHOW_INTRO && (
          <TweakButton label="↻ Replay sunrise intro" onClick={replayIntro} />
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[
            ['Hero', 'top'], ['Welcome', 'about'],
            ['Academics', 'academics'], ['Words', 'words'],
            ['Life', 'life'], ['News', 'news'],
            ['Visit', 'visit'], ['Map', 'find'],
          ].map(([label, id]) => (
            <TweakButton key={id} label={label} secondary
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} />
          ))}
        </div>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
