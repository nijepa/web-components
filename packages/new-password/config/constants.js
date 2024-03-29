export const PREFIX = 'VITE_';
export const HCAPTCHA_KEY = 'HCAPTCHA_KEY';
export const RECAPTCHA_KEY = 'RECAPTCHA_KEY';
export const GLOBALS = {
  BASE: 'BASE_URL',
  PART: 'PART_URL',
  PATH: 'PATH_URL'
};
export const COMP_TYPES = {
  FORGOT: 'forgot',
  NEW: 'new',
  MESSAGE: 'msg'
};
export const APPS = {
  EBC: 'taxfreenoncashbenefit',
  IM: 'mall',
  CIPS: 'cips',
  OIP: 'oip',
  OTTO: 'otto',
  RENAULT: 'renault',
  SERVICE: 'serviceapps'
}
export const CONDITIONS = {
  PLACEHOLDERS: 'hasPlaceholders',
  LABELS: 'hasLabels',
  CAPTCHA: 'hasCaptcha',
  USERNAME: 'hasUsername',
  ERROR_BORDER: 'hasErrorBorder',
  INDEX: 'hasIndexUrl',
  FRONTEND: 'hasFrontendUrl',
  APP_TYPE: 'hasAppTypeUrl',
  ICONS: 'hasInputIcons',
};
export const CAPTCHA_TYPE = {
  HCAPTCHA: 'HCAPTCHA',
  RECAPTCHA: 'RECAPTCHA'
}
export const API_TYPES = {
  FORGOT: 'forgotPassword',
  VALIDATE: 'validateEmailLink',
  NEW: 'newPassword',
  REQUEST: 'requestEmail'
};
export const LOADING = {
  INIT: 'init',
  ERROR: 'error',
  DONE: 'done',
  SUCCESS: 'success',
};
export const INPUTS = {
  ONE: 'fieldOneType',
  TWO: 'fieldTwoType',
};
export const EMAIL_REGEX = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export const PASSWORD_REGEX = (passwordLength) => {
  return new RegExp(
    `(?=.*|\d)(?=.*[0-9])(?=.*[@$!%*?&])(?=.*[a-z])(?=.*[A-Z]).{${passwordLength.min},${passwordLength.max}}`
  );
};
export const REDIRECTION = {
  INDEX: 'INDEX_URL',
  LOGIN: 'LOGIN_URL',
};
export const CLASSES = {
  FIELD_ERROR: 'field-error',
};
export const FIELDS = {
  ONE: {
    label: 'labelOne',
    error: 'fieldOne',
    type: 'inputOneType',
    input: 'ONE'
  },
  TWO: {
    label: 'labelTwo',
    error: 'fieldTwo',
    type: 'inputTwoType',
    input: 'TWO'
  },
};
