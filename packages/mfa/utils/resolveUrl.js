import { insert, snakeToCamel } from './helpers';

export function resolveUrl(path) {
  const currentUrl = window.location.href;
  return currentUrl.slice(0, currentUrl.search('/cips/') + 6) + path;
}

export function resolveBaseUrl(cips = false, action = undefined) {
  const currentUrl = window.location.href;
  let url = currentUrl;
  if (!cips) {
    const idx = currentUrl.indexOf('frontend') + 9;
    url = insert(currentUrl, idx, 'ajax/');
  }
  url = url.replace('.do', '/mfa.do');
  if (cips) url = url.replace('.do', '/' + snakeToCamel(action) + '.do');
  console.log('url: ', url);
  return url;
}
