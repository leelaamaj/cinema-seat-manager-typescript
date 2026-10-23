import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initializeSeating, displaySeating, reserveSeat, countSeats, findAdjacentSeats } from '../src/cinema';

test('empty room has 8 independent rows, 10 seats per row, 80 available', () => {
  const room = initializeSeating();
  assert.equal(room.length, 8);
  for (const row of room) assert.equal(row.length, 10);
  assert.deepEqual(countSeats(room), [0, 80]);
  reserveSeat(room, 0, 0);
  assert.equal(room[1][0], 0);
  assert.deepEqual(countSeats(initializeSeating()), [0, 80]);
});
test('reservation succeeds once and duplicate leaves counts unchanged', () => {
  const room = initializeSeating();
  assert.match(reserveSeat(room, 3, 5), /confirmed/);
  assert.equal(room[3][5], 1);
  assert.match(reserveSeat(room, 3, 5), /already taken/);
  assert.deepEqual(countSeats(room), [1, 79]);
});
test('invalid numbers never mutate or throw', () => {
  const room = initializeSeating();
  for (const [row, col] of [[-1,0],[8,0],[0,-1],[0,10],[1.2,0],[0,1.2],[NaN,0],[0,NaN],[Infinity,0],[0,-Infinity]]) {
    assert.match(reserveSeat(room, row, col), /Invalid/);
  }
  assert.deepEqual(countSeats(room), [0,80]);
});
test('all four corner seats are valid', () => {
  const room = initializeSeating();
  for (const [row,col] of [[0,0],[0,9],[7,0],[7,9]]) assert.match(reserveSeat(room,row,col), /confirmed/);
  assert.deepEqual(countSeats(room),[4,76]);
});
test('pair search returns earliest horizontal pair without reservation', () => {
  const room = initializeSeating();
  assert.deepEqual(findAdjacentSeats(room), [[0,0],[0,1]]);
  reserveSeat(room,0,1);
  assert.deepEqual(findAdjacentSeats(room), [[0,2],[0,3]]);
  assert.deepEqual(countSeats(room),[1,79]);
});
test('pair search reaches the last two columns and later rows', () => {
  const room = initializeSeating();
  for(let col=0;col<8;col++) reserveSeat(room,0,col);
  assert.deepEqual(findAdjacentSeats(room), [[0,8],[0,9]]);
  reserveSeat(room,0,8);
  assert.deepEqual(findAdjacentSeats(room), [[1,0],[1,1]]);
});
test('nearly full room has scattered singles and no horizontal pair', () => {
  const room = initializeSeating();
  for(let row=0;row<8;row++) for(let col=0;col<10;col++) if(!(row===4 && col%3===0)) reserveSeat(room,row,col);
  assert.deepEqual(countSeats(room),[76,4]);
  assert.equal(findAdjacentSeats(room),null);
});
test('full room rejects reservations and has no pair', () => {
  const room = initializeSeating();
  for(let row=0;row<8;row++) for(let col=0;col<10;col++) reserveSeat(room,row,col);
  assert.deepEqual(countSeats(room),[80,0]);
  assert.equal(findAdjacentSeats(room),null);
  assert.match(reserveSeat(room,7,9),/already taken/);
});
test('available seats across a row boundary do not form a pair', () => {
  const room = initializeSeating();
  for(let row=0;row<8;row++) for(let col=0;col<10;col++) room[row][col]=1;
  room[0][9]=0;room[1][0]=0;
  assert.equal(findAdjacentSeats(room),null);
});
test('console map includes coordinates and both seat symbols', () => {
  const lines: string[]=[];
  const original=console.log;
  console.log=(line: string) => {lines.push(line);};
  try {const room=initializeSeating();reserveSeat(room,0,0);displaySeating(room);} finally {console.log=original;}
  assert.equal(lines.length,9);
  assert.match(lines[0],/0 1 2 3 4 5 6 7 8 9/);
  assert.match(lines[1],/^0\s+X L/);
  assert.match(lines[8],/^7\s+L/);
});
