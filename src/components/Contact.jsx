import { useEffect, useRef, useState } from 'react';
import { site } from '../content/site';
import { Arrow, Reveal } from './Primitives';
import LinkIcon from './LinkIcon';

export default function Contact() {
  const [copyState, setCopyState] = useState('');
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(site.email); setCopyState('Email copied.'); }
    catch { setCopyState('Select the email address to copy it.'); }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState(''), 4000);
  }
  return (
    <section id="contact" className="contact-section" tabIndex={-1} aria-labelledby="contact-title">
      <Reveal><p className="eyebrow section-kicker"><span>[04]</span> OPEN CONNECTION</p><div className="contact-layout"><div><h2 id="contact-title">Say hello.</h2><p>Questions, projects, or just a hello—send me a note.</p></div><a className="contact-arrow" href={`mailto:${site.email}`} aria-label="Send me an email"><Arrow diagonal /></a></div>
      <div className="contact-bottom"><div className="email-row"><a href={`mailto:${site.email}`} className="email-link">{site.email}</a><button className="copy-email" onClick={copyEmail} aria-label="Copy email address"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="1" /><path d="M16 8V3H3v13h5" /></svg></button><span className="copy-status" role="status">{copyState}</span></div><div className="social-links">{site.socials.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer"><LinkIcon label={label} />{label}<Arrow diagonal /></a>)}</div></div>
      </Reveal>
    </section>
  );
}
