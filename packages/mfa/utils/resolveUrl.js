import { insert, snakeToCamel } from './helpers';
import { store } from '../store/store'

export function resolveUrl(path) {
  const currentUrl = window.location.href;
  return currentUrl.slice(0, currentUrl.search('/cips/') + 6) + path;
}

export function resolveBaseUrl(cips = false, action = undefined) {
  const currentUrl = window.location.href;
  let url = currentUrl.split('?')[0];
  if (!cips) {
    const idx = url.indexOf('frontend') + 9;
    url = insert(url, idx, 'ajax/');
  }
  url = url.replace('.do', '/mfa.do');
  if(store.isMandatory) {
    url = url.replace('cat/view/', 'shop/login/')
    url = url.replace('welcome', 'login/')
    url = url.replace('myprofile', 'login/')
    url = url.replace('logout', 'login/')
    url = url.replace('basket/view/', 'shop/login/')
  }
  if (cips) url = url.replace('.do', '/' + snakeToCamel(action) + '.do');
  return url;
}
