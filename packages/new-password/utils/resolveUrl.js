import { appConfig } from '../definition/apps';
import { PREFIX, REDIRECTION } from '../config/constants';
export function resolveUrl(context, path) {
  const currentUrl = window.location.href;
  return currentUrl.slice(0, currentUrl.search(`${context}/`) + 6) + path;
}

export function getAttr() {
  // FIXME remove when live/testing and pass prop in function instead
  //const currentUrl ='https://employee-benefit-club.cadooztest.de/frontend/taxfreenoncashbenefit/password.do?action=change_password&attr=%2BqUKqLURPvhQz6xBGgsd4DbiuCXg9RKdyGKQA2YpXFv%2Bb%2FSfL2wQkA3MZYCFB0CZYeETOlS5ad53f8PF3Df9MYcYAH4yI8ajjhym9PFXovc%3D';
  const currentUrl = window.location.href
  const url = new URL(currentUrl)
  const params1 = new URLSearchParams(url.search);
  const returnUrl = decodeURIComponent(params1.get('attr'));
  return returnUrl;
}

export function getAppID() {
  const { hostname } = new URL(window.location.href);
  return 'https://' + hostname 
}

export function genarateRedirectUrl(appType) {
  const currentUrl = window.location.href
  // const currentUrl =
  //   'https://employee-benefit-club.de/frontend/taxfreenoncashbenefit/password.do?action=change_password&attr=%2BqUKqLURPvhQz6xBGgsd4DbiuCXg9RKdyGKQA2YpXFv%2Bb%2FSfL2wQkA3MZYCFB0CZYeETOlS5ad53f8PF3Df9MYcYAH4yI8ajjhym9PFXovc%3D';
  let url = currentUrl.slice(0, currentUrl.search(/\./) + 4);
  if (appConfig.get(appType).hasFrontendUrl) {
    url = url + 'frontend/';
  }
  if (appConfig.get(appType).hasAppTypeUrl) {
    const type =
      appConfig.get(appType).appType === undefined
        ? appType
        : appConfig.get(appType).appType;
    url = url + type + '/';
  }
  url = appConfig.get(appType).hasIndexUrl
    ? url + import.meta.env[PREFIX + REDIRECTION.INDEX]
    : url + import.meta.env[PREFIX + REDIRECTION.LOGIN];
  return url;
}
