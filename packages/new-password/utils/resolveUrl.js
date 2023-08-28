export function resolveUrl(context, path) {
  const currentUrl = window.location.href;
  return currentUrl.slice(0, currentUrl.search(`${context}/`) + 6) + path;
}

export function getAttr() {
  // FIXME remove when live/testing and pass prop in function instead
  const currentUrl = 'https://employee-benefit-club.cadooztest.de/frontend/taxfreenoncashbenefit/password.do?action=change_password&attr=%2BqUKqLURPvhQz6xBGgsd4DbiuCXg9RKdyGKQA2YpXFv%2Bb%2FSfL2wQkA3MZYCFB0CZYeETOlS5ad53f8PF3Df9MYcYAH4yI8ajjhym9PFXovc%3D'
  return currentUrl.slice(currentUrl.search(`attr=`) + 5, currentUrl.length) 
}