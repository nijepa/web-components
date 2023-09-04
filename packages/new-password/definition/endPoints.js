export const endPoints = new Map([
  [
    'forgotPassword',
    {
      method: 'POST',
      url: 'send_reset_password_email',
      payload: {
        username: 'string',
        email: 'string',
        website_uuid: 'string',
        language_id: 'de',
      },
    },
  ],
  [
    'validateEmailLink',
    {
      method: 'GET',
      url: 'validate_reset_password_email_link',
      params: {
        attr: 'string',
        website_uuid: 'string',
      },
    },
  ],
  [
    'newPassword',
    {
      method: 'PUT',
      url: 'new_password',
      payload: {
        password: 'string',
        repeat_password: 'string',
        user_uuid: 'string',
        website_uuid: 'string',
        attr: 'string',
      },
    },
  ],
]);
