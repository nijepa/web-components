import { insert, snakeToCamel } from './helpers';
import { store } from '../store/store';
import { URL_REPLACE } from '../config/config';

export function resolveUrl(path) {
  const currentUrl = window.location.href;
  return currentUrl.slice(0, currentUrl.search('/cips/') + 6) + path;
}

export function resolveBaseUrl(action = undefined) {
  const currentUrl = window.location.href;
  let url = currentUrl.split('?')[0];
  if (!store.isCips) {
    const idx = url.indexOf('frontend') + 9;
    url = insert(url, idx, 'ajax/');
  }
  url = url.replace('.do', '/mfa.do');
  if (store.isLogin) {
    const found = URL_REPLACE.find((val) => url.includes(val.origin));
    if (found) url = url.replace(found.origin, found.replacement);
  }
  if (store.isCips)
    url = url.replace('.do', '/' + snakeToCamel(action) + '.do');
  return url;
}
