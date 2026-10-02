import { useEffect, useRef } from 'react';
import { Arrow } from './Primitives';
import ProjectMedia from './ProjectMedia';
import { formatDate } from './Blog';

export default function DetailDialog({ entry, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (!entry) return;
    const node = dialog.current;
    const activeElement = document.activeElement;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      if (activeElement instanceof HTMLElement && activeElement.isConnected) activeElement.focus({ preventScroll: true });
    };
  }, [entry]);

  return <dialog ref={dialog} className="detail-dialog" aria-labelledby="detail-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === dialog.current) { const bounds = dialog.current.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose(); } }}>
    {entry && <>
      <div className="detail-top"><span className="eyebrow">{entry.kind === 'project' ? 'PROJECT FILE / READ ONLY' : 'PERSONAL ARCHIVE / ENTRY'}</span><button className="close-button" aria-label="Close detail" onClick={onClose} autoFocus>Close <span aria-hidden="true">×</span></button></div>
      {entry.kind === 'project' ? <ProjectMedia project={entry} detail /> : entry.image ? <img className="detail-image" src={entry.image} alt={entry.imageAlt || ''} /> : null}
      <div className="detail-body">
        <p className="eyebrow">{entry.category} <span aria-hidden="true"> / </span> {entry.date ? formatDate(entry.date) : entry.year}</p>
        <h2 id="detail-title">{entry.title}</h2>
        {(entry.body || []).map((paragraph, index) => <p className="detail-paragraph" key={index}>{paragraph}</p>)}
        {entry.tags?.length > 0 && <div className="interest-list">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
        {entry.links?.length > 0 && <div className="detail-links">{entry.links.map(({ label, href }) => <a key={href} href={href} className="text-link" target="_blank" rel="noreferrer">{label}<Arrow diagonal /></a>)}</div>}
      </div>
    </>}
  </dialog>;
}
