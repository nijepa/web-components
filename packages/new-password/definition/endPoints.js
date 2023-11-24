import { API_TYPES } from '../config/constants';
export const endPointsDefinition = new Map([
  [
    API_TYPES.FORGOT,
    {
      method: 'POST',
      url: 'request_reset_password_email',
      payload: {
        username: 'string',
        email: 'string',
        website_uuid: 'string',
        language: 'de',
        captcha_response: 'string',
      },
    },
  ],
  [
    API_TYPES.VALIDATE,
    {
      method: 'GET',
      url: 'validate_reset_password_token/:reset_password_token',
      params: {
        reset_password_token: 'string',
      },
    },
  ],
  [
    API_TYPES.NEW,
    {
      method: 'PUT',
      url: 'save_new_password/:reset_password_token',
      payload: {
        newPassword: 'string',
        newPasswordRetype: 'string',
        language: 'string',
        website_uuid: 'string',
        captcha_response: 'string',
      },
      params: {
        reset_password_token: 'string',
      },
    },
  ],
  [
    API_TYPES.REQUEST,
    {
      method: 'POST',
      url: `websites/website_uuid/users/user_uuid/email`,
      params: {
        jsessionid: 'string',
      },
    },
  ],
]);
