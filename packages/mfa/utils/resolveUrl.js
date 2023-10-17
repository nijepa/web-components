export function resolveUrl(path) {
  const currentUrl = window.location.href;
  return currentUrl.slice(0, currentUrl.search('/cips/') + 6) + path;
}
function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}
const snakeToCamel = str =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
);
export function resolveBaseUrl(cips = false, action = undefined) {
  const currentUrl = window.location.href;
  const idx = currentUrl.indexOf('frontend') + 9;
  let url = currentUrl
  if(!cips) url = insert(currentUrl, idx, 'ajax/');
  url = url.replace('.do', '/mfa.do')
  if(cips) url = url.replace('.do', '/' + snakeToCamel(action) + '.do')
  console.log('url: ', url)
  return url;
}
