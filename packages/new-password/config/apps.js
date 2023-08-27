export const appConfig = new Map([
  [
    'im',
    {
      hasCaptcha: false,
      hasLabels: true,
      hasPlaceholders: false,
      hasUsername: true,
      hasErrorBorder: true
    },
  ],
  [
    'cips',
    {
      // classes: {
      //   wrapper: 'cips-wraper',
      //   title: 'cips-title',
      //   fields: 'cips-fields',
      //   field: 'cips-field',
      //   captcha: 'cips-captcha',
      //   button: 'cips-button',
      // },
      hasCaptcha: true,
      hasLabels: false,
      hasPlaceholders: true,
      hasUsername: true,
      hasErrorBorder: false
    },
  ],
]);
