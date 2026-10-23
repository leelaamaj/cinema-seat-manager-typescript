import { initializeSeating, displaySeating, reserveSeat, countSeats, findAdjacentSeats } from './cinema';

// Demonstrate the required four scenarios through the same shared functions.
export function runDemo(): void {
  for (let scenario = 0; scenario < 4; scenario++) {
    const seating = initializeSeating();
    const titles = ['EMPTY ROOM', 'PARTIALLY FILLED ROOM', 'SCATTERED SINGLE SEATS', 'FULL ROOM'];
    console.log(`\n=== ${titles[scenario]} ===`);
    if (scenario === 1) {
      console.log(reserveSeat(seating, 0, 0));
      console.log(reserveSeat(seating, 0, 1));
      console.log(reserveSeat(seating, 3, 5));
      console.log(reserveSeat(seating, 0, 0));
      console.log(reserveSeat(seating, -1, 0));
    }
    if (scenario >= 2) {
      for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 10; column++) {
          if (scenario === 3 || !(row === 4 && column % 3 === 0)) reserveSeat(seating, row, column);
        }
      }
    }
    displaySeating(seating);
    const counts = countSeats(seating);
    console.log(`Occupied: ${counts[0]} | Available: ${counts[1]}`);
    const pair = findAdjacentSeats(seating);
    console.log(pair ? `Adjacent seats found: (${pair[0]}) and (${pair[1]}).` : 'No adjacent available seats.');
  }
}
