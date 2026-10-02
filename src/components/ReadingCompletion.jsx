import { useEffect, useRef, useState } from 'react';

// One little reward per page visit; scrolling back down never replays it.
export default function ReadingCompletion() {
  const celebrated = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;
    let timer;
    function onScroll() {
      const y = window.scrollY;
      const movingDown = y > previousY;
      previousY = y;
      const end = document.documentElement.scrollHeight - window.innerHeight;
      // Allow a pixel for fractional browser scroll positions. Resize/layout
      // changes alone and pages that fit the viewport do not earn the stamp.
      if (celebrated.current || !movingDown || end <= 0 || y < end - 1) return;
      celebrated.current = true;
      setVisible(true);
      timer = window.setTimeout(() => setVisible(false), 6500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <aside className={`reading-reward ${visible ? 'is-visible' : ''}`} aria-label="Reading milestone">
      <div className="reading-reward-message" role="status" aria-live="polite" aria-atomic="true">
        {visible && <>
          <span className="reading-stamp" aria-hidden="true"><span>100%</span><span>COVER TO COVER</span><span>✦</span></span>
          <span className="reading-reward-copy"><strong>You found the end.</strong><span>Thanks for taking the scenic route.</span></span>
        </>}
      </div>
      {visible && <button className="reading-reward-dismiss" type="button" aria-label="Dismiss reading milestone" onClick={() => setVisible(false)}>×</button>}
    </aside>
  );
}
