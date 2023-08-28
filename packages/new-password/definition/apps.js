// TODO add definitions for all apps
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
      hasCaptcha: true,
      hasLabels: false,
      hasPlaceholders: true,
      hasUsername: true,
      hasErrorBorder: false
    },
  ],
]);
