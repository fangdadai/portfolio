import { useCallback, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import DetailDialog from './components/DetailDialog';
import ReadingCompletion from './components/ReadingCompletion';
import { site } from './content/site';
import { projects } from './content/projects';
import { journal } from './content/journal';

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const closeDetail = useCallback(() => setDetail(null), []);
  const navigation = useMemo(() => [
    { id: 'home', label: 'Home' },
    ...(site.sections.projects ? [{ id: 'projects', label: 'Work' }] : []),
    ...(site.sections.about ? [{ id: 'about', label: 'About' }] : []),
    ...(site.sections.journal ? [{ id: 'journal', label: 'Journal' }] : []),
    { id: 'contact', label: 'Contact' },
  ], []);
  const navigate = useCallback((id) => {
    window.location.hash = id;
    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
  }, []);
  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (!detail) setPaletteOpen((open) => !open);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [detail]);
  const commands = useMemo(() => [
    ...navigation.map(({ id, label }) => ({ id, title: label, category: 'Go to', onSelect: () => navigate(id) })),
    ...(site.sections.projects ? projects.filter((entry) => entry.visible !== false).map((entry) => ({
      id: `project-${entry.id}`, title: entry.title, category: 'Work', keywords: entry.tags?.join(' ') || '', onSelect: () => setDetail({ ...entry, kind: 'project' }),
    })) : []),
    ...(site.sections.journal ? journal.filter((entry) => entry.visible !== false).map((entry) => ({
      id: `journal-${entry.id}`, title: entry.title, category: 'Journal', keywords: entry.category, onSelect: () => setDetail({ ...entry, kind: 'journal' }),
    })) : []),
  ], [navigation, navigate]);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="site-shell">
        <Navbar navigation={navigation} onSearch={() => setPaletteOpen(true)} />
        <main id="main" tabIndex={-1}>
          <Home />
          {site.sections.projects && <Projects onOpen={(entry) => setDetail({ ...entry, kind: 'project' })} />}
          {site.sections.about && <About />}
          {site.sections.journal && <Blog onOpen={(entry) => setDetail({ ...entry, kind: 'journal' })} />}
          <Contact />
        </main>
        <footer className="site-footer">
          <a href="#home" className="footer-signature">[{site.initials}] {site.name}</a>
          <span className="eyebrow">END OF FILE / THANKS FOR VISITING</span>
          <a href="#home" className="back-to-top">RETURN HOME <span aria-hidden="true">↑</span></a>
        </footer>
      </div>
      <CommandPalette open={paletteOpen} onClose={closePalette} items={commands} />
      <DetailDialog entry={detail} onClose={closeDetail} />
      <ReadingCompletion />
    </MotionConfig>
  );
}
export default App;
