import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { projects } from '../content/projects';
import ProjectMedia from './ProjectMedia';
import { Arrow, Reveal, SectionHeading } from './Primitives';

export default function Projects({ onOpen }) {
  const [expanded, setExpanded] = useState(null);
  const reducedMotion = useReducedMotion();
  const available = projects.filter((project) => project.visible !== false).sort((a, b) => Number(b.featured) - Number(a.featured));
  return (
    <section id="projects" className="content-section projects-section" tabIndex={-1} aria-labelledby="projects-title">
      <Reveal><SectionHeading id="projects-title" number="01" label="PROJECT LOG" title="Projects."><p>A few things I’ve made.<br />Open a demo to take a look.</p></SectionHeading></Reveal>
      <div className="project-list">
        {available.map((project, index) => {
          const isExpanded = expanded === project.id;
          return (
          <Reveal key={project.id} className={`project-entry ${isExpanded ? 'is-expanded' : ''}`} delay={Math.min(index * 0.04, 0.12)}>
            <div className="project-entry-head eyebrow"><span>PRJ_{String(index + 1).padStart(2, '0')}</span><span>{project.category}</span><time>{project.year}</time></div>
            <div className="project-entry-copy">
              <div><h3>{project.title}</h3><p>{project.summary}</p></div>
              <div className="project-actions">
                <button className="demo-toggle" id={`demo-toggle-${project.id}`} aria-expanded={isExpanded} aria-controls={`demo-${project.id}`} aria-label={`${isExpanded ? 'Close' : 'Watch'} ${project.title} demo`} onClick={() => setExpanded(isExpanded ? null : project.id)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="currentColor">{isExpanded ? <path d="M2 5h8v2H2z" /> : <path d="m3 1 8 5-8 5z" />}</svg>
                  {isExpanded ? 'Close demo' : 'Watch demo'}
                </button>
                <button className="project-details" onClick={() => { setExpanded(null); onOpen(project); }} aria-label={`Read about ${project.title}`}>Details <Arrow /></button>
              </div>
            </div>
            <motion.div className="project-demo" id={`demo-${project.id}`} role="region" aria-labelledby={`demo-toggle-${project.id}`} aria-hidden={!isExpanded} initial={false} animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.24 }}>
              {isExpanded && <div className="project-demo-inner"><ProjectMedia project={project} /><p className="demo-caption eyebrow">{project.title} / {project.year}<span>Expand the player for fullscreen ↗</span></p></div>}
            </motion.div>
          </Reveal>
          );
        })}
      </div>
      {!available.length && <p className="empty-collection">NO PROJECT RECORDS FOUND.</p>}
    </section>
  );
}
