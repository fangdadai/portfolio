import { useState } from 'react';
import { site } from '../content/site';
import { Arrow, Reveal } from './Primitives';
import LinkIcon from './LinkIcon';

const personalSignals = [
  'projects: HelloASL / Raiinet / DigAvi',
  'field notes: New Brunswick / Nova Scotia / Quebec / Shandong',
  'kitchen log: egg pancake / oden / soba / chicken platter',
  'relay log: 4 × 400 gold / New Brunswick provincials / 2022',
];

export default function Home() {
  const [signalIndex, setSignalIndex] = useState(0);
  const nextSection = site.sections.projects ? '#projects' : site.sections.about ? '#about' : site.sections.journal ? '#journal' : '#contact';
  return (
    <section id="home" className="hero" tabIndex={-1} aria-labelledby="hero-title">
      <div className="edition-line eyebrow"><span>FANGDA.DAI / PERSONAL SYSTEM</span><span><i aria-hidden="true" /> STATUS: ONLINE</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal>
            <h1 id="hero-title">{site.name}</h1>
            <p className="hero-titleline">{site.role}</p>
            <p className="hero-description">{site.intro}</p>
            <div className="hero-actions">
              <a className="button button-ink" href={nextSection}>View projects <Arrow /></a>
              {site.resume && <a className="button button-outline" href={site.resume} download><LinkIcon label="Résumé" /> Résumé.pdf <Arrow diagonal /></a>}
            </div>
            <div className="hero-socials eyebrow">
              <span>Public links</span>
              {site.socials.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer"><LinkIcon label={label} />{label}<Arrow diagonal /></a>)}
            </div>
          </Reveal>
          <dl className="profile-table">
            {site.profileRows.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <div className="human-log">
            <span className="human-log-prompt" aria-hidden="true">human.log&gt;</span>
            <span className="human-log-output" aria-live="polite">{personalSignals[signalIndex]}</span>
            <button type="button" onClick={() => setSignalIndex((current) => (current + 1) % personalSignals.length)} aria-label="Show another personal detail">next ↵</button>
          </div>
        </div>
        <Reveal className="profile-photo" delay={0.08}>
          <div className="portrait-frame"><img src={site.profileImage} alt="Fangda Dai by a lake surrounded by mountains" width="1892" height="1071" /></div>
        </Reveal>
      </div>
      <div className="hero-bottom eyebrow"><span>ENGINEERING / PRODUCT / CURIOSITY</span><a href={nextSection}>SCROLL TO CONTINUE <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}
