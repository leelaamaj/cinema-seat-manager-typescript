import { initializeSeating, reserveSeat, countSeats, findAdjacentSeats } from './cinema';

let seating = initializeSeating();
let highlightedPair: number[][] | null = null;
const map = document.querySelector<HTMLDivElement>('#seat-map')!;
const status = document.querySelector<HTMLParagraphElement>('#status')!;

// Update existing buttons so keyboard focus remains in place after reservations.
function renderSeats(): void {
  const counts = countSeats(seating);
  document.querySelector('#available-count')!.textContent = String(counts[1]);
  document.querySelector('#occupied-count')!.textContent = String(counts[0]);
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 10; column++) {
      const button = document.querySelector<HTMLButtonElement>(`#seat-${row}-${column}`)!;
      const occupied = seating[row][column] === 1;
      let suggested = false;
      if (highlightedPair) {
        for (let index = 0; index < highlightedPair.length; index++) {
          if (highlightedPair[index][0] === row && highlightedPair[index][1] === column) suggested = true;
        }
      }
      button.className = `seat ${occupied ? 'occupied' : suggested ? 'suggested' : 'available'}`;
      button.textContent = occupied ? 'X' : 'L';
      button.setAttribute('aria-label', `Row ${row}, seat ${column}, ${occupied ? 'occupied' : suggested ? 'available, suggested pair' : 'available'}`);
      button.setAttribute('aria-disabled', String(occupied));
    }
  }
}

// Build a labeled 8 × 10 map using ordinary HTML buttons.
function buildMap(): void {
  map.append(document.createElement('span'));
  for (let column = 0; column < 10; column++) {
    const label = document.createElement('span');
    label.className = 'coordinate';
    label.textContent = String(column);
    map.append(label);
  }
  for (let row = 0; row < 8; row++) {
    const label = document.createElement('span');
    label.className = 'coordinate';
    label.textContent = String(row);
    map.append(label);
    for (let column = 0; column < 10; column++) {
      const button = document.createElement('button');
      button.id = `seat-${row}-${column}`;
      button.type = 'button';
      button.addEventListener('click', () => {
        status.textContent = reserveSeat(seating, row, column);
        highlightedPair = null;
        renderSeats();
      });
      button.addEventListener('keydown', (event) => {
        let nextRow = row;
        let nextColumn = column;
        if (event.key === 'ArrowRight') nextColumn++;
        else if (event.key === 'ArrowLeft') nextColumn--;
        else if (event.key === 'ArrowDown') nextRow++;
        else if (event.key === 'ArrowUp') nextRow--;
        else return;
        event.preventDefault();
        document.querySelector<HTMLButtonElement>(`#seat-${nextRow}-${nextColumn}`)?.focus();
      });
      map.append(button);
    }
  }
}

document.querySelector('#find-pair')!.addEventListener('click', () => {
  highlightedPair = findAdjacentSeats(seating);
  status.textContent = highlightedPair
    ? `Pair found in row ${highlightedPair[0][0]}: seats ${highlightedPair[0][1]} and ${highlightedPair[1][1]}. Click each highlighted seat to reserve it.`
    : 'No adjacent available seats. Single seats may still be available.';
  renderSeats();
});
document.querySelector('#reset')!.addEventListener('click', () => {
  seating = initializeSeating();
  highlightedPair = null;
  status.textContent = 'Room reset. All 80 seats are available.';
  renderSeats();
});
buildMap();
renderSeats();
