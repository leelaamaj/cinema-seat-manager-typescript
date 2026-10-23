// Create separate rows so reserving one seat never changes another row.
export function initializeSeating(): number[][] {
  const seating: number[][] = [];
  for (let row = 0; row < 8; row++) {
    seating[row] = [];
    for (let column = 0; column < 10; column++) seating[row][column] = 0;
  }
  return seating;
}

// Print a numbered map: L means available and X means occupied.
export function displaySeating(seating: number[][]): void {
  console.log('     0 1 2 3 4 5 6 7 8 9');
  for (let row = 0; row < seating.length; row++) {
    let line = `${row}    `;
    for (let column = 0; column < seating[row].length; column++) {
      line += seating[row][column] === 1 ? 'X ' : 'L ';
    }
    console.log(line.trimEnd());
  }
}

// Validate coordinates and availability before changing a seat to occupied.
export function reserveSeat(seating: number[][], row: number, column: number): string {
  if (!Number.isInteger(row) || !Number.isInteger(column) || row < 0 || row >= seating.length || column < 0 || column >= seating[row].length) {
    return 'Invalid seat. Use a row from 0–7 and a column from 0–9.';
  }
  if (seating[row][column] === 1) return `Seat ${row}, ${column} is already taken.`;
  seating[row][column] = 1;
  return `Reservation confirmed for row ${row}, seat ${column}.`;
}

// Return [occupied, available], using an array rather than a custom object.
export function countSeats(seating: number[][]): number[] {
  let occupied = 0;
  let available = 0;
  for (let row = 0; row < seating.length; row++) {
    for (let column = 0; column < seating[row].length; column++) {
      if (seating[row][column] === 1) occupied++;
      else available++;
    }
  }
  return [occupied, available];
}

// Find the first horizontal pair, without reserving it or crossing row edges.
export function findAdjacentSeats(seating: number[][]): number[][] | null {
  for (let row = 0; row < seating.length; row++) {
    for (let column = 0; column < seating[row].length - 1; column++) {
      if (seating[row][column] === 0 && seating[row][column + 1] === 0) {
        return [[row, column], [row, column + 1]];
      }
    }
  }
  return null;
}
