import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { BOARD, createMaze, findPath } from '../lib/pathfinding';
import './PathfindingLab.css';

const cells = Array.from({ length: BOARD.columns * BOARD.rows }, (_, cell) => cell);
const emptyTrace = { visited: [], path: [] };

export default function PathfindingLab() {
  const [walls, setWalls] = useState(() => createMaze());
  const [trace, setTrace] = useState(emptyTrace);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [focused, setFocused] = useState(BOARD.start);
  const boardRef = useRef(null);
  const seed = useRef(7);
  const reducedMotion = useReducedMotion();
  const total = trace.visited.length + trace.path.length;
  const visited = useMemo(() => new Set(trace.visited.slice(0, step)), [trace, step]);
  const route = useMemo(() => new Set(trace.path.slice(0, Math.max(0, step - trace.visited.length))), [trace, step]);
  const complete = total > 0 && step >= total;

  useEffect(() => {
    if (!running) return;
    if (reducedMotion || step >= total) {
      setStep(total);
      setRunning(false);
      return;
    }
    const timer = window.setTimeout(() => setStep((current) => current + 1), step < trace.visited.length ? 28 : 42);
    return () => window.clearTimeout(timer);
  }, [running, reducedMotion, step, total, trace]);

  function reset() {
    setRunning(false);
    setTrace(emptyTrace);
    setStep(0);
  }

  function toggleWall(cell) {
    if (cell === BOARD.start || cell === BOARD.goal) return;
    reset();
    setWalls((current) => {
      const next = new Set(current);
      if (next.has(cell)) next.delete(cell);
      else next.add(cell);
      return next;
    });
  }

  function moveFocus(event, cell) {
    const x = cell % BOARD.columns;
    const y = Math.floor(cell / BOARD.columns);
    const next = { ArrowLeft: x > 0 ? cell - 1 : cell, ArrowRight: x < BOARD.columns - 1 ? cell + 1 : cell, ArrowUp: y > 0 ? cell - BOARD.columns : cell, ArrowDown: y < BOARD.rows - 1 ? cell + BOARD.columns : cell }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setFocused(next);
    boardRef.current?.querySelector(`[data-cell="${next}"]`)?.focus();
  }

  const status = running ? (step < trace.visited.length ? 'Searching…' : 'Tracing route…') : complete ? (trace.path.length ? 'Shortest route found.' : 'No route. Try removing a wall.') : 'Ready when you are.';

  return (
    <div className="path-lab">
      <div className="path-lab-header"><span className="eyebrow">A* / PATHFINDING</span><span className="path-lab-badge">Interactive</span></div>
      <div className="path-lab-intro"><h3>Find a way.</h3><code>f(n) = g(n) + h(n)</code></div>
      <p className="path-lab-hint" id="path-lab-help">Add a wall. Run the search. Watch it adapt.</p>
      <div className="path-board" ref={boardRef} role="group" aria-label="Editable pathfinding board" aria-describedby="path-lab-help path-lab-keyboard">
        {cells.map((cell) => {
          const endpoint = cell === BOARD.start ? 'A' : cell === BOARD.goal ? 'B' : '';
          const state = walls.has(cell) ? 'wall' : route.has(cell) ? 'route' : visited.has(cell) ? 'visited' : 'empty';
          return <button type="button" data-cell={cell} key={cell} className={`path-cell is-${state} ${endpoint ? 'is-endpoint' : ''}`} tabIndex={focused === cell ? 0 : -1} aria-label={`Row ${Math.floor(cell / BOARD.columns) + 1}, column ${cell % BOARD.columns + 1}: ${endpoint === 'A' ? 'start' : endpoint === 'B' ? 'destination' : state}`} aria-pressed={endpoint ? undefined : walls.has(cell)} aria-disabled={endpoint ? true : undefined} onFocus={() => setFocused(cell)} onKeyDown={(event) => moveFocus(event, cell)} onClick={() => toggleWall(cell)}>{endpoint}</button>;
        })}
      </div>
      <p className="sr-only" id="path-lab-keyboard">Use arrow keys to move between cells. Press Enter or Space to toggle a wall. A and B stay fixed.</p>
      <div className="path-legend" aria-hidden="true"><span><i className="is-wall" />Wall</span><span><i className="is-visited" />Explored</span><span><i className="is-route" />Route</span></div>
      <div className="path-controls">
        <button className="path-run" type="button" disabled={running} onClick={() => { setTrace(findPath({ ...BOARD, walls })); setStep(0); setRunning(true); }}><span aria-hidden="true">▷</span> {running ? 'Searching' : complete ? 'Run again' : 'Run search'}</button>
        <button className="path-reset" type="button" onClick={() => { reset(); setWalls(createMaze(++seed.current)); }}>New maze <span aria-hidden="true">↻</span></button>
      </div>
      <div className="path-readout"><span role="status">{status}</span><span>{visited.size} explored · {complete && trace.path.length ? trace.path.length - 1 : '—'} steps</span></div>
    </div>
  );
}
