export function resolveUrl(path) {
  const currentUrl = window.location.href;
  return currentUrl.slice(0, currentUrl.search('/cips/') + 6) + path;
}
function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}
export function resolveBaseUrl() {
  const currentUrl = window.location.href;
  const idx = currentUrl.indexOf('frontend') + 9;
  let url = insert(currentUrl, idx, 'ajax/');
  url = url.replace('.do', '/mfa.do')
  console.log('url: ', url)
  return url;
}
