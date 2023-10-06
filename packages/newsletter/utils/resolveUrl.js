export function resolveUrl() {
  const { hostname } = new URL(window.location.href);
  return 'https://' + hostname 
}
export function resolveSessionId() {
  const currentUrl = window.location.href;
  return currentUrl.slice(currentUrl.search(';'), currentUrl.search('\\?'));
}