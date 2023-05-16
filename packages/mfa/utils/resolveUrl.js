export function resolveUrl(path) {
  const currentUrl = window.location.href;
  return currentUrl.slice(0, currentUrl.search('/cips/') + 6) + path;
}
