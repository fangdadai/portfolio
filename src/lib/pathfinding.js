// Four-way A* with a Manhattan heuristic. The trace drives the visualizer.
export function findPath({ columns, rows, walls, start, goal }) {
  const distance = (cell) => Math.abs(cell % columns - goal % columns) + Math.abs(Math.floor(cell / columns) - Math.floor(goal / columns));
  const open = new Set([start]);
  const visited = [];
  const closed = new Set();
  const parent = new Map();
  const costs = new Map([[start, 0]]);
  if (walls.has(start) || walls.has(goal)) return { visited, path: [] };

  while (open.size) {
    // Small board: a linear scan keeps the implementation small and inspectable.
    const current = [...open].reduce((best, cell) => {
      const score = costs.get(cell) + distance(cell);
      const bestScore = costs.get(best) + distance(best);
      return score < bestScore || (score === bestScore && distance(cell) < distance(best)) ? cell : best;
    });
    open.delete(current);
    closed.add(current);
    visited.push(current);
    if (current === goal) {
      const path = [goal];
      while (parent.has(path[0])) path.unshift(parent.get(path[0]));
      return { visited, path };
    }
    const x = current % columns;
    const y = Math.floor(current / columns);
    const neighbors = [x > 0 ? current - 1 : -1, x < columns - 1 ? current + 1 : -1, y > 0 ? current - columns : -1, y < rows - 1 ? current + columns : -1];
    for (const next of neighbors) {
      if (next < 0 || walls.has(next) || closed.has(next)) continue;
      const cost = costs.get(current) + 1;
      if (cost >= (costs.get(next) ?? Infinity)) continue;
      parent.set(next, current);
      costs.set(next, cost);
      open.add(next);
    }
  }
  return { visited, path: [] };
}

export const BOARD = { columns: 16, rows: 8, start: 17, goal: 110 };

export function createMaze(seed = 7) {
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let attempt = 0; attempt < 40; attempt++) {
    const walls = new Set();
    for (let cell = 0; cell < BOARD.columns * BOARD.rows; cell++) {
      if (cell !== BOARD.start && cell !== BOARD.goal && random() < 0.29) walls.add(cell);
    }
    if (findPath({ ...BOARD, walls }).path.length) return walls;
  }
  return new Set();
}
