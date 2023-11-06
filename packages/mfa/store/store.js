import { reactive } from 'vue';

export const store = reactive({
  responseMessage: {
    isError: null,
    msg: '',
  },
  sharedSecret: '',
  isCips: false,
  isLogin: false,
});
