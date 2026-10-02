import test from 'node:test';
import assert from 'node:assert/strict';
import { BOARD, createMaze, findPath } from './pathfinding.js';

// An independent breadth-first search checks that A* returns optimal routes.
function shortestDistance({ columns, rows, start, goal, walls }) {
  const queue = [[start, 0]];
  const seen = new Set([start]);
  for (let index = 0; index < queue.length; index++) {
    const [cell, steps] = queue[index];
    if (cell === goal) return steps;
    const x = cell % columns;
    const y = Math.floor(cell / columns);
    for (const [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
      const nx = x + dx;
      const ny = y + dy;
      const next = ny * columns + nx;
      if (nx < 0 || nx >= columns || ny < 0 || ny >= rows || walls.has(next) || seen.has(next)) continue;
      queue.push([next, steps + 1]);
      seen.add(next);
    }
  }
  return Infinity;
}

test('finds shortest legal routes on 100 generated boards', () => {
  for (let seed = 1; seed <= 100; seed++) {
    const walls = createMaze(seed);
    const board = { ...BOARD, walls };
    const { visited, path } = findPath(board);
    assert.ok(path.length);
    assert.equal(path[0], BOARD.start);
    assert.equal(path.at(-1), BOARD.goal);
    assert.equal(path.length - 1, shortestDistance(board));
    assert.equal(new Set(visited).size, visited.length);
    path.forEach((cell, index) => {
      assert.ok(!walls.has(cell));
      assert.ok(cell >= 0 && cell < BOARD.columns * BOARD.rows);
      if (index) {
        const previous = path[index - 1];
        const delta = Math.abs(cell % BOARD.columns - previous % BOARD.columns) + Math.abs(Math.floor(cell / BOARD.columns) - Math.floor(previous / BOARD.columns));
        assert.equal(delta, 1);
      }
    });
  }
});

test('reports an unreachable destination without fabricating a route', () => {
  const walls = new Set([BOARD.start - 1, BOARD.start + 1, BOARD.start - BOARD.columns, BOARD.start + BOARD.columns]);
  assert.deepEqual(findPath({ ...BOARD, walls }), { visited: [BOARD.start], path: [] });
});

test('does not wrap between row edges', () => {
  const board = { columns: 4, rows: 2, start: 3, goal: 4, walls: new Set() };
  assert.equal(findPath(board).path.length - 1, 4);
});

test('handles a single-cell board and blocked endpoints', () => {
  assert.deepEqual(findPath({ columns: 1, rows: 1, start: 0, goal: 0, walls: new Set() }), { visited: [0], path: [0] });
  assert.deepEqual(findPath({ ...BOARD, walls: new Set([BOARD.goal]) }), { visited: [], path: [] });
});

test('maze generation is repeatable and preserves endpoints', () => {
  assert.deepEqual(createMaze(7), createMaze(7));
  assert.notDeepEqual(createMaze(7), createMaze(8));
  assert.ok(!createMaze(7).has(BOARD.start));
  assert.ok(!createMaze(7).has(BOARD.goal));
});
