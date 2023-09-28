export function resolveUrl() {
  const { hostname } = new URL(window.location.href);
  return 'https://' + hostname 
}