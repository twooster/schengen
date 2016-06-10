export function formatDate(d) {
  if (!d) return '';

  // yyyy-mm-ddT...
  // 0123457890
  return d.toISOString().slice(0, 10);
}
