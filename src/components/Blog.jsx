import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { journal } from '../content/journal';
import { Arrow, Reveal, SectionHeading } from './Primitives';

export const formatDate = (date) => new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));

export default function Blog({ onOpen }) {
  const [filter, setFilter] = useState('All');
  const available = journal.filter((entry) => entry.visible !== false);
  const categories = ['All', ...new Set(available.map((entry) => entry.category))];
  const effectiveFilter = categories.includes(filter) ? filter : 'All';
  const entries = available.filter((entry) => effectiveFilter === 'All' || entry.category === effectiveFilter);
  return (
    <section id="journal" className="content-section journal-section" tabIndex={-1} aria-labelledby="journal-title">
      <Reveal><SectionHeading id="journal-title" number="03" label="PERSONAL ARCHIVE" title="Things beyond the screen."><p>Food, travel, competition, and<br />the photographs I kept.</p></SectionHeading></Reveal>
      <div className="collection-toolbar"><div className="filters" role="group" aria-label="Filter journal">{categories.map((category) => <button key={category} aria-pressed={effectiveFilter === category} onClick={() => setFilter(category)}>{category}</button>)}</div><span className="eyebrow collection-count" aria-live="polite">{String(entries.length).padStart(2, '0')} entries</span></div>
      <motion.div layout className="journal-grid"><AnimatePresence mode="popLayout">{entries.map((entry) => <motion.article key={entry.id} className="journal-card" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <div className="journal-photo"><img src={entry.image} alt={entry.imageAlt} loading="lazy" width="640" height="480" /><span className="photo-corner" aria-hidden="true">↗</span></div>
          <div className="journal-meta eyebrow"><span>{entry.category}</span><time dateTime={entry.date}>{formatDate(entry.date)}</time></div>
          <h3><button className="journal-open" onClick={() => onOpen(entry)} aria-label={`Read ${entry.title}`}>{entry.title}</button></h3><p>{entry.excerpt}</p><span className="read-note" aria-hidden="true">Read the note <Arrow /></span>
      </motion.article>)}</AnimatePresence></motion.div>
      {!available.length && <p className="empty-collection">A blank page, and plenty of possibilities. Notes coming soon.</p>}
      {available.some((entry) => entry.archival) && <p className="scaffold-note">ARCHIVE COMPLETE / 10 records restored from the original portfolio.</p>}
    </section>
  );
}
