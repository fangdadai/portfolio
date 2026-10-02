import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { site } from '../content/site';

export default function Navbar({ navigation, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { scrollYProgress } = useScroll();
  const progressClip = useTransform(scrollYProgress, (value) => `inset(0 ${(1 - Math.min(1, Math.max(0, value))) * 100}% 0 0)`);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
    navigation.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [navigation]);
  useEffect(() => {
    function dismiss(event) {
      if (event.key === 'Escape' && !event.target.closest('dialog')) {
        setMenuOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
    }
    if (menuOpen) window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [menuOpen]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label={`${site.name}, home`} onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">[{site.initials}]</span>
          <span className="brand-name">{site.name}<span className="eyebrow">{site.edition}</span></span>
        </a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} id="main-navigation" aria-label="Main navigation">
          {navigation.filter(({ id }) => id !== 'home').map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => { setMenuOpen(false); requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true })); }}>{label}<span className="nav-dot" aria-hidden="true" /></a>
          ))}
        </nav>
        <div className="header-tools">
          <button className="search-trigger" onClick={() => { setMenuOpen(false); onSearch(); }} aria-label="Open site index" aria-keyshortcuts="Meta+k Control+k">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
            <span className="search-label">Command</span><kbd>⌘ K</kbd>
          </button>
          <button className="menu-toggle" id="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}><span>{menuOpen ? 'Close' : 'Menu'}</span><span aria-hidden="true">{menuOpen ? '×' : '+'}</span></button>
        </div>
      </div>
      <div className="load-progress" aria-hidden="true">
        <motion.div className="reading-progress" style={{ clipPath: progressClip }} />
      </div>
    </header>
  );
}
