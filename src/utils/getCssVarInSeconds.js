export function getCssVarInSeconds(name) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (raw.endsWith('ms')) return parseFloat(raw) / 1000;
  if (raw.endsWith('s')) return parseFloat(raw);
  return parseFloat(raw); // assume segundos
}