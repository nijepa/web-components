// TODO add definitions for all apps
export const appConfig = new Map([
  [
    'mall',
    {
      hasLabels: true,
      hasUsername: true,
      hasErrorBorder: true,
      hasInputIcons: true,
      hasAppTypeUrl: true,
      hasInputIcons: true
    },
  ],
  [
    'ebc',
    {
      hasCaptcha: true,
      hasPlaceholders: true,
      hasUsername: true,
      hasAppTypeUrl: true,
      hasFrontendUrl: true,
      hasInputIcons: true
    },
  ],
  [
    'cips',
    {
      hasCaptcha: true,
      hasPlaceholders: true,
      hasUsername: true,
      hasAppTypeUrl: true
    },
  ],
  [
    'oip',
    {
      hasCaptcha: true,
      hasPlaceholders: true,
      hasUsername: true,
      hasIndexUrl: true,
      hasFrontendUrl: true
    },
  ],
  [
    'otto',
    {
      hasCaptcha: true,
      hasLabels: true,
      hasFrontendUrl: true,
      hasAppTypeUrl: true,
      appType: 'oip'
    },
  ],
  [
    'renault',
    {
      hasCaptcha: true,
      hasLabels: true,
      hasUsername: true,
      hasFrontendUrl: true,
      hasAppTypeUrl: true,
      appType: 'oip'
    },
  ],
]);
