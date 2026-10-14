export function waitWithCallback(ms: number, callback: () => void): void {
  setTimeout(() => {
    callback();
  }, ms);
}
