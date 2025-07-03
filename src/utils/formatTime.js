export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${secs}`;
}