// Keep DOM-only code out of the terminal while sharing the reservation logic.
async function start(): Promise<void> {
  if (typeof document === 'undefined') {
    const { runDemo } = await import('./demo');
    runDemo();
  } else {
    await import('./style.css');
    await import('./web');
  }
}
void start();
export {};
