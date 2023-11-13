import { appDefinition } from '../definition/apps';
import { PREFIX, GLOBALS, REDIRECTION } from '../config/constants';

const { hostname } = new URL(window.location.href);
const currentUrl = window.location.href;

export function resolveUrl(context, path) {
  return currentUrl.slice(0, currentUrl.search(`${context}/`) + 6) + path;
}

export function resolveBaseUrl() {
  return (
    import.meta.env[PREFIX + GLOBALS.BASE] +
    hostname +
    import.meta.env[PREFIX + GLOBALS.PATH]
  );
}

export function getAttr() {
  // FIXME remove when live/testing and pass prop in function instead
  //const currentUrl ='https://employee-benefit-club.cadooztest.de/frontend/taxfreenoncashbenefit/password.do?action=change_password&attr=%2BqUKqLURPvhQz6xBGgsd4DbiuCXg9RKdyGKQA2YpXFv%2Bb%2FSfL2wQkA3MZYCFB0CZYeETOlS5ad53f8PF3Df9MYcYAH4yI8ajjhym9PFXovc%3D';
  const url = new URL(currentUrl);
  const params1 = new URLSearchParams(url.search);
  const returnUrl = decodeURIComponent(params1.get('attr'));
  return returnUrl;
}

export function getSessionId() {
  return currentUrl.slice(currentUrl.search('=') + 1);
}

export function getAppID() {
  return import.meta.env[PREFIX + GLOBALS.BASE] + hostname;
}

export function genarateRedirectUrl(appType) {
  // const currentUrl = 'https://employee-benefit-club.de/frontend/taxfreenoncashbenefit/password.do?action=change_password&attr=%2BqUKqLURPvhQz6xBGgsd4DbiuCXg9RKdyGKQA2YpXFv%2Bb%2FSfL2wQkA3MZYCFB0CZYeETOlS5ad53f8PF3Df9MYcYAH4yI8ajjhym9PFXovc%3D';
  let url = currentUrl.slice(0, currentUrl.search(/\./) + 4);
  if (appDefinition.get(appType).hasFrontendUrl) {
    url = url + 'frontend/';
  }
  if (appDefinition.get(appType).hasAppTypeUrl) {
    const type =
      appDefinition.get(appType).appType === undefined
        ? appType
        : appDefinition.get(appType).appType;
    url = url + type + '/';
  }
  url = appDefinition.get(appType).hasIndexUrl
    ? url + import.meta.env[PREFIX + REDIRECTION.INDEX]
    : url + import.meta.env[PREFIX + REDIRECTION.LOGIN];
  return url;
}
