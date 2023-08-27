export const PREFIX = 'VITE_';
export const GLOBALS = {
  BASE: 'BASE_URL',
  PART: 'PART_URL'
}
export const COMP_TYPES = {
  FORGOT: 'forgot',
  NEW: 'new',
};
export const COMP_CONFIG = new Map([
  [
    'forgot',
    {
      config: {
        inputOne: 'text',
        labelOne: 'Username',
        inputTwo: 'email',
        labelTwo: 'Email',
        button: 'Send',
        title: 'Headline',
      },
    },
  ],
  [
    'new',
    {
      config: {
        inputOne: 'password',
        labelOne: 'Formfield1',
        inputTwo: 'password',
        labelTwo: 'Formfield2',
        button: 'Button',
        title: 'Headline',
      },
    },
  ],
]);
export const API_TYPES = {
  FORGOT: 'forgotPassword',
  VALIDATE: 'validateEmailLink',
  NEW: 'newPassword',
};
export const LOADING = {
  INIT: 'init',
  ERROR: 'error',
  DONE: 'done',
};
export const EMAIL_REGEX = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export const PASSWORD_REGEX = (passwordLength) => {
  return new RegExp(
    `(?=.*|\d)(?=.*[0-9])(?=.*[@$!%*?&])(?=.*[a-z])(?=.*[A-Z]).{${passwordLength.min},${passwordLength.max}}`
  );
};
export const CONDITIONS = {
  PLACEHOLDERS: 'hasPlaceholders',
  LABELS: 'hasLabels',
  CAPTCHA: 'hasCaptcha',
  USERNAME: 'hasUsername',
  ERROR_BORDER: 'hasErrorBorder'
};
export const CLASSES = {
  FIELD_ERROR: 'field-error',
};
