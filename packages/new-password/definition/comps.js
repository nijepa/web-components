import { COMP_TYPES } from '../config/constants'
export const compDefinition = new Map([
  [
    COMP_TYPES.FORGOT,
    {
      config: {
        inputOneType: 'text',
        labelOne: 'Username',
        inputTwoType: 'email',
        labelTwo: 'Email',
        button: 'Send',
        title: 'Headline',
      },
    },
  ],
  [
    COMP_TYPES.NEW,
    {
      config: {
        inputOneType: 'password',
        labelOne: 'Formfield1',
        inputTwoType: 'password',
        labelTwo: 'Formfield2',
        button: 'Button',
        title: 'Headline',
      },
    },
  ],
]);