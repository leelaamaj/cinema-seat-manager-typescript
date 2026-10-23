# Cinema Seat Manager in TypeScript

A command-line reservation prototype with an optional accessible HTML + Tailwind seat map, built from [4Geeks Academy's TypeScript starter](https://github.com/4GeeksAcademy/typescript-hello).

## Run in Codespaces

Open this repository's **Code → Codespaces → Create codespace on main**. The dev container uses Node.js 22 and installs the locked dependencies with `npm ci`.

```bash
npm run console
npm test
npm run typecheck
npm run build
npm run start
```

Open forwarded port **5173** to use the seat map. Keep the port private. Stop the Codespace when finished to conserve quota. Locally, use Node.js 22.12+ (or 24), run `npm ci`, then the same commands.

## How it works

Think of the theater as a spreadsheet: eight rows, each containing ten cells. `seating[3][5]` means row 3, seat 5 (the fourth row and sixth seat). `0` is available; `1` is occupied. Coordinates start at zero, matching the assignment diagram.

All seating state lives in a two-dimensional numeric array. There are no custom objects or classes. Counts and coordinate pairs also use arrays; configuration files use the starter's standard tool configuration.

| Function | Parameters | Return / effect |
| --- | --- | --- |
| `initializeSeating` | none | A fresh 8 × 10 matrix containing zeros, with independent rows |
| `displaySeating` | seating matrix | Prints row/column numbers, `L` for available and `X` for occupied |
| `reserveSeat` | matrix, row, column | Confirmation or failure message; changes a valid available seat to `1` |
| `countSeats` | seating matrix | `[occupied, available]` |
| `findAdjacentSeats` | seating matrix | `[[row, column], [row, column + 1]]`, or `null` if no horizontal pair exists |

For example:

```ts
const seating = initializeSeating();
reserveSeat(seating, 3, 5); // Changes only seating[3][5] to 1.
countSeats(seating); // [1, 79]
findAdjacentSeats(seating); // [[0, 0], [0, 1]]; finds but does not reserve.
```

Reservation validation rejects out-of-bounds, fractional, NaN, and infinite coordinates before accessing the seat. Duplicate reservations leave the matrix unchanged. Pair search checks rows from top to bottom and seats from left to right; it cannot cross row boundaries.

## Files

- `src/cinema.ts`: the five shared reservation functions.
- `src/demo.ts`: empty, partial, scattered-single-seat, and full-room demonstrations.
- `src/main.ts`: chooses terminal or browser entry point.
- `src/web.ts`: buttons, messages, counts, pair highlights, reset, and keyboard navigation.
- `index.html` and `src/style.css`: semantic HTML and responsive Tailwind/CSS styling.
- `tests/cinema.test.ts`: 10 automated tests for reservation behavior and edge cases.

## Visual interface

Click an available `L` seat to reserve it; it becomes `X`. **Find two adjacent seats** highlights a pair without changing availability. Reserve the suggested seats individually. Every reservation clears the suggestion so it cannot display stale availability. **Reset room** clears all reservations immediately; this is a disposable practice room.

Use Tab to reach controls, arrow keys to move between seats, and Enter or Space to reserve. Occupied seats remain focusable so their coordinates and status can be read. Status messages are announced politely to screen readers. Text and symbols distinguish states as well as color. Reloading clears all data: no server, storage, accounts, or payment processing is included.

## Assignment checklist

- [x] Initialize 8 rows and 10 columns using a two-dimensional array.
- [x] Represent occupied seats with `1` and available seats with `0`.
- [x] Print `X` / `L` with row and column numbers.
- [x] Reserve a seat by row and column.
- [x] Validate availability and return success/failure messages.
- [x] Count occupied and available seats.
- [x] Search for horizontal adjacent available seats.
- [x] Return the first pair in row-major order.
- [x] Clearly report when no pair is available.
- [x] Test empty, partially filled, scattered-single-seat, and full rooms.
- [x] Provide clear operation messages.
- [x] Comment each function.
- [x] Provide the optional HTML/Tailwind interface using shared TypeScript logic.
- [x] Use a matrix for seating representation.
- [x] Use functions with parameters and return values.
- [x] Use conditionals for validation.
- [x] Use loops to process and display the matrix.
- [x] Verify horizontal adjacency including row edges.
- [x] Use readable, meaningful names.
- [x] Pass automated tests, typechecking, and production build.
- [x] Provide useful staff-facing console output.

These are development checks, not instructor approval or proof of portal submission. The repository remains private pending the student's review.

## Verification

The 10 tests cover independent rows; duplicate and invalid reservations; all corners; counts; earliest-pair ordering; final-column and later-row searches; isolated singles; full rooms; row boundaries; and console labels/symbols.

The browser is checked for pair highlighting without booking, clicking and keyboard booking, count updates, reset, refresh, and desktop/mobile layouts. No paid hosting or deployment is required.

## Credits

Starter configuration: 4Geeks Academy, @ehiber, and contributors. Implementation prepared with Codex assistance; review and understand the code before submitting it under your course's policies.
