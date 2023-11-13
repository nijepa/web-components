import { APPS, CONDITIONS } from '../config/constants';
export const appDefinition= new Map([
  [
    APPS.IM,
    {
      [CONDITIONS.LABELS]: true,
      [CONDITIONS.USERNAME]: true,
      [CONDITIONS.ERROR_BORDER]: true,
      [CONDITIONS.ICONS]: true,
      [CONDITIONS.APP_TYPE]: true,
    },
  ],
  [
    APPS.EBC,
    {
      [CONDITIONS.CAPTCHA]: true,
      [CONDITIONS.PLACEHOLDERS]: true,
      [CONDITIONS.ERROR_BORDER]: true,
      [CONDITIONS.APP_TYPE]: true,
      [CONDITIONS.FRONTEND]: true,
      [CONDITIONS.ICONS]: true
    },
  ],
  [
    APPS.CIPS,
    {
      [CONDITIONS.CAPTCHA]: true,
      [CONDITIONS.PLACEHOLDERS]: true,
      [CONDITIONS.USERNAME]: true,
      [CONDITIONS.APP_TYPE]: true
    },
  ],
  [
    APPS.OIP,
    {
      [CONDITIONS.CAPTCHA]: true,
      [CONDITIONS.PLACEHOLDERS]: true,
      [CONDITIONS.USERNAME]: true,
      [CONDITIONS.INDEX]: true,
      [CONDITIONS.FRONTEND]: true
    },
  ],
  [
    APPS.OTTO,
    {
      [CONDITIONS.CAPTCHA]: true,
      [CONDITIONS.LABELS]: true,
      [CONDITIONS.FRONTEND]: true,
      [CONDITIONS.APP_TYPE]: true,
    },
  ],
  [
    APPS.RENAULT,
    {
      [CONDITIONS.USERNAME]: true,
      [CONDITIONS.LABELS]: true,
      [CONDITIONS.CAPTCHA]: true,
      [CONDITIONS.APP_TYPE]: true,
    },
  ],
  [
    APPS.SERVICE,
    {
      [CONDITIONS.USERNAME]: true,
      [CONDITIONS.LABELS]: true,
      [CONDITIONS.CAPTCHA]: true,
      [CONDITIONS.APP_TYPE]: true,
    },
  ],
]);
