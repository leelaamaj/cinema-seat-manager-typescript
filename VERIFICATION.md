# Verification — 23 October 2026

## Automated checks

- Clean dependency install (`npm ci`): passed; audit reported zero vulnerabilities.
- TypeScript checking (`npm run typecheck`): passed, including tests.
- Logic tests (`npm test`): 10 passed, zero failed.
- Production build (`npm run build`): passed.
- Console demonstration (`npm run console`): passed all four scenarios, including duplicate/invalid messages.

## Browser checks

Checked in the Codex in-app browser using the real application.

- Production-bundle smoke test: pair search highlighted two seats without booking; clicking confirmed a reservation; reset succeeded.
- All 80 seat buttons appear; empty-room totals are 80 available / 0 occupied.
- Pair search highlights exactly two seats without reducing availability.
- Clicking row 3, seat 5 produces 79 available / 1 occupied and a reservation confirmation.
- Clicking an available seat reserves it (79 available / 1 occupied); clicking again releases it (80 / 0). `aria-pressed` changes in both directions. Enter and Space toggle reservations; ArrowDown from row 0, seat 2 focuses row 1, seat 2.
- Reset returns 80 available / 0 occupied and removes highlights.
- Reload returns a new empty room.
- Desktop viewport: 1280 × 960; no horizontal overflow.
- Mobile viewport: 375 × 812; no horizontal overflow; all 80 seats remain visible in the map.

Visual review covered typography, seat geometry/spacing, coordinate labels, state colors and symbols, controls/status, and responsive wrapping. Desktop and mobile full-page screenshots were inspected. The user explicitly chose to skip a generated design concept, so there is no concept-image comparison.

## Boundaries

Verification is local. Codespace `cinema-seat-manager-qx7qpp46qx424776` was created successfully from the updated main branch on a two-core machine with a 10-minute idle timeout. GitHub reports it Available. Remote shell checks could not run because the starter container lacks an SSH server; the checks above ran locally. Instructor evaluation, public visibility, and portal submission have not occurred. This file is evidence of development checks, not course approval.
