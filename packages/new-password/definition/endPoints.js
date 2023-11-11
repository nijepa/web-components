import { API_TYPES } from '../config/constants';
export const endPoints = new Map([
  [
    [API_TYPES.FORGOT],
    {
      method: 'POST',
      url: 'request_reset_password_email',
      payload: {
        username: 'string',
        email: 'string',
        website_uuid: 'string',
        language_id: 'de',
        captcha_response: 'string',
      },
    },
  ],
  [
    [API_TYPES.VALIDATE],
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
    [API_TYPES.NEW],
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
  [
    [API_TYPES.REQUEST],
    {
      method: 'POST',
      url: `websites/website_uuid/users/user_uuid`,
      params: {
        jsessionid: 'string',
      },
    },
  ],
]);
