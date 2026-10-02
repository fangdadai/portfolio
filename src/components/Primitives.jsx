import { motion } from 'framer-motion';

export function Arrow({ diagonal = false }) {
  return <svg className="arrow-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}</svg>;
}

export function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.45, delay, ease: [0.2, 0.65, 0.3, 1] }}>{children}</motion.div>;
}

export function SectionHeading({ number, label, title, children, id }) {
  return <div className="section-heading"><div><p className="eyebrow section-kicker"><span>[{number}]</span> {label}</p><h2 id={id}>{title}</h2></div>{children}</div>;
}
