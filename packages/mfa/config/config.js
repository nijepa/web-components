export const TEMPLATES = {
  ACTIVATION: 'activation',
  ACTIVE: 'active',
  CODE: 'code',
  BACKUP: 'backup',
  DEACTIVATE: 'deactivate',
  GENARATE: 'generate',
  DOWNLOAD: 'download',
  DEACTIVATION: 'deactivation',
}

export const config = {
  [TEMPLATES.ACTIVATION]: [
    { label: 'notes.important_note_title', tag: 'h3', class: 'content-title' },
    { label: 'notes.mfa_info_01', tag: 'p' },
    { label: 'notes.mfa_info_011', tag: 'p' },
    { label: 'notes.mfa_info_012', tag: 'p' },
    { label: 'notes.mfa_info_013', tag: 'p' },
    { label: 'notes.mfa_info_014', tag: 'p', style: 'b' },
  ],
  [TEMPLATES.ACTIVE]: [
    { label: 'buttons.activate_2fa', tag: 'h3', class: 'content-title' },
    { label: 'notes.mfa_info_02', tag: 'p', isNote: true },
    { label: 'notes.installation_instruction', tag: 'p' },
    { label: 'notes.installation_steps', tag: 'p' },
    {
      label: 'notes.download_ios',
      tag: 'a',
      href: 'https://apps.apple.com/de/app/google-authenticator/id388497605',
    },
    {
      label: 'notes.download_android',
      tag: 'a',
      href: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=de&gl=US',
    },
    { label: 'notes.installation_steps2', tag: 'p' },
    { label: '', tag: 'img' },
    { label: '', tag: 'sec' },
    { label: 'notes.installation_steps3', tag: 'p' },
  ],
  [TEMPLATES.CODE]: [
    { label: 'notes.important_note_title', tag: 'h3', class: 'content-title' },
    { label: 'notes.download_code_info', tag: 'p', isNote: true },
    { label: 'notes.backup_codes', tag: 'p' },
    { label: 'notes.backup_codes_info', tag: 'p' },
    { label: 'notes.backup_codes_info2', tag: 'p', style: 'b' },
  ],
  [TEMPLATES.BACKUP]: [
    { label: 'notes.backup_codes', tag: 'h3', class: 'content-title' },
    { label: 'notes.important_codes_info', tag: 'p' },
    { label: 'notes.backup_codes_info2', tag: 'p', style: 'b' },
  ],
  [TEMPLATES.DEACTIVATE]: [
    { label: 'notes.disable_2fa', tag: 'h3', class: 'content-title' },
    { label: 'notes.mfa_info_02', tag: 'p', isNote: true },
    { label: 'notes.change_device', tag: 'p', style: 'b' },
    { label: 'notes.link_device_info', tag: 'p' },
    { label: 'notes.device_instructions', tag: 'p' },
    { label: 'notes.disable_2fa', tag: 'p', style: 'b' },
    { label: 'notes.confirm_disable_2fa', tag: 'p' },
  ],
  [TEMPLATES.GENARATE]: [
    { label: 'notes.enter_code', tag: 'h3', class: 'content-title' },
    { label: 'notes.generate_codes', tag: 'p' },
  ],
  [TEMPLATES.DOWNLOAD]: [
    { label: 'notes.save_codes', tag: 'h3', class: 'content-title' },
    { label: 'notes.received_codes_info', tag: 'p' },
    { label: 'notes.received_codes_info2', tag: 'p' },
  ],
  [TEMPLATES.DEACTIVATION]: [
    { label: 'notes.deactivate', tag: 'h3', class: 'content-title' },
    { label: 'notes.generate_codes', tag: 'p' },
  ],
};

export const ACTIONS = {
  CHECK_STATUS: 'CHECK_STATUS',
  ACTIVATE: 'ACTIVATE',
  DEACTIVATE: 'DEACTIVATE',
  GENERATE_QR_CODE: 'GENERATE_QR_CODE',
  CHECK_VERIFICATION_CODE: 'CHECK_VERIFICATION_CODE',
  DOWNLOAD_BACKUP_CODES: 'DOWNLOAD_BACKUP_CODES',
  GENERATE_NEW_BACKUP_CODES: 'GENERATE_NEW_BACKUP_CODES',
  CANCEL: 'cancel'
};

const replacements = ['shop/login/', 'login/'];
export const URL_REPLACE = [
  { origin: 'cat/view/', replacement: replacements[0] },
  { origin: 'welcome', replacement: replacements[1] },
  { origin: 'myprofile', replacement: replacements[1] },
  { origin: 'logout', replacement: replacements[1] },
  { origin: 'basket/view/', replacement: replacements[0] },
];
