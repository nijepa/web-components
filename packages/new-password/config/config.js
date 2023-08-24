export const appConfig = new Map([
  [
    'im',
    {
      classes: {
        wrapper: 'im-wraper',
        title: 'im-title',
        fields: 'im-fields',
        field: 'im-field',
        captcha: 'im-captcha',
        button: 'im-button',
      },
      hasCaptcha: true,
      hasLabels: true,
      hasPlaceholders: true,
    },
  ],
  [
    'cips',
    {
      classes: {
        wrapper: 'cips-wraper',
        title: 'cips-title',
        fields: 'cips-fields',
        field: 'cips-field',
        captcha: 'cips-captcha',
        button: 'cips-button',
      },
      hasCaptcha: true,
      hasLabels: false,
      hasPlaceholders: true,
    },
  ],
]);
