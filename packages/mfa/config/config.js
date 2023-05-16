export const config = {
  activation: [
    { label: "notes.important_note_title", tag: "h3", class: "content-title" },
    { label: "notes.mfa_info_01", tag: "p" },
    { label: "notes.mfa_info_011", tag: "p" },
    { label: "notes.mfa_info_012", tag: "p" },
    { label: "notes.mfa_info_013", tag: "p" },
    { label: "notes.mfa_info_014", tag: "p", style: "b" },
  ],
  active: [
    { label: "buttons.activate_2fa", tag: "h3", class: "content-title" },
    { label: "notes.mfa_info_02", tag: "p", isNote: true },
    { label: "notes.installation_instruction", tag: "p" },
    { label: "notes.installation_steps", tag: "p" },
    {
      label: "notes.download_ios",
      tag: "a",
      href: "https://apps.apple.com/de/app/google-authenticator/id388497605",
    },
    {
      label: "notes.download_android",
      tag: "a",
      href: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=de&gl=US",
    },
    { label: "notes.installation_steps2", tag: "p" },
    { label: "", tag: "img" },
    { label: "", tag: "sec" },
    { label: "notes.installation_steps3", tag: "p" },
  ],
  code: [
    { label: "notes.important_note_title", tag: "h3", class: "content-title" },
    { label: "notes.download_code_info", tag: "p", isNote: true },
    { label: "notes.backup_codes", tag: "p" },
    { label: "notes.backup_codes_info", tag: "p" },
    { label: "notes.backup_codes_info2", tag: "p", style: "b" },
  ],
  backup: [
    { label: "notes.backup_codes", tag: "h3", class: "content-title" },
    { label: "notes.important_codes_info", tag: "p" },
    { label: "notes.backup_codes_info2", tag: "p", style: "b" },
  ],
  deactivate: [
    { label: "notes.disable_2fa", tag: "h3", class: "content-title" },
    { label: "notes.mfa_info_02", tag: "p", isNote: true },
    { label: "notes.change_device", tag: "p", style: "b" },
    { label: "notes.link_device_info", tag: "p" },
    { label: "notes.device_instructions", tag: "p" },
    { label: "notes.disable_2fa", tag: "p", style: "b" },
    { label: "notes.confirm_disable_2fa", tag: "p" },
  ],
  generate: [
    { label: "notes.enter_code", tag: "h3", class: "content-title" },
    { label: "notes.generate_codes", tag: "p" },
  ],
  download: [
    { label: "notes.save_codes", tag: "h3", class: "content-title" },
    { label: "notes.received_codes_info", tag: "p" },
    { label: "notes.received_codes_info2", tag: "p" },
  ],
  deactivation: [
    { label: "notes.deactivate", tag: "h3", class: "content-title" },
    { label: "notes.generate_codes", tag: "p" },
  ],
};
