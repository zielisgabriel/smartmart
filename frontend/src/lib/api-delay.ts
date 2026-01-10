export async function apiDelay(ms: number) {
  return new Promise(resolver => setTimeout(resolver, ms));
}