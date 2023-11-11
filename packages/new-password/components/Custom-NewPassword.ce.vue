<template>
  <div
    key="1"
    class="center-screen"
    v-if="loading === constants.LOADING.INIT && !isMsg"
  >
    <span class="loader"></span>
  </div>

  <div
    key="2"
    class="general-error"
    v-if="loading === constants.LOADING.ERROR && !isMsg"
  >
    {{ apiError.message }}
  </div>

  <Transition name="slide-fall" appear>
    <div class="msg" v-if="isMsg && msgText">
      <svg width="16" height="16" fill="rgb(110, 181, 49)" viewBox="0 0 16 16">
        <path
          d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
        />
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"
        />
      </svg>
      <h3>{{ msgText }}</h3>
    </div>
  </Transition>

  <Transition name="slide-fade" mode="out-in">
    <div
      key="3"
      class="success"
      v-if="loading === constants.LOADING.SUCCESS && !isMsg"
    >
      <svg width="48" height="48" fill="rgb(110, 181, 49)" viewBox="0 0 16 16">
        <path
          d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
        />
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"
        />
      </svg>
      <h3>{{ getSuccessMsg }}</h3>
    </div>
  </Transition>

  <Transition name="slide-fade">
    <div key="4" v-if="loading === constants.LOADING.DONE && !isMsg">
      <div class="wrapper" style="display: block">
        <form class="header-loginbox-content" autocomplete="off">
          <div
            class="form-group"
            v-if="
              componentType === constants.COMP_TYPES.NEW ||
              hasProperty(constants.CONDITIONS.USERNAME)
            "
          >
            <label
              for="username"
              v-if="
                hasProperty(constants.CONDITIONS.LABELS) &&
                hasProperty(constants.CONDITIONS.USERNAME)
              "
              >{{
                $t[language][compDefinition.get(componentType).config.labelOne]
              }}</label
            >
            <div class="field-icon">
              <input
                id="username"
                :class="[
                  'field',
                  hasProperty(constants.CONDITIONS.ERROR_BORDER)
                    ? errors.fieldOne
                      ? isError
                      : ''
                    : '',
                ]"
                autofocus="autofocus"
                :type="
                  inputTypes.fieldOneType ||
                  compDefinition.get(componentType).config.inputOneType
                "
                :placeholder="
                  hasProperty(constants.CONDITIONS.PLACEHOLDERS)
                    ? $t[language][
                        compDefinition.get(componentType).config.labelOne
                      ]
                    : ''
                "
                v-model="inputOne"
              />
              <eye
                v-if="
                  componentType === constants.COMP_TYPES.NEW &&
                  hasProperty(constants.CONDITIONS.ICONS)
                "
                :field="constants.INPUTS.ONE"
                :field-type="'password'"
                :app-type="appType"
                @checked="handleInputType"
              />
            </div>
            <Transition name="slide-fade">
              <div class="alert" v-if="errors.fieldOne">
                <pre>{{ errors.fieldOne }}</pre>
              </div>
            </Transition>
          </div>
          <div class="form-group">
            <label
              for="email"
              v-if="hasProperty(constants.CONDITIONS.LABELS)"
              >{{
                $t[language][compDefinition.get(componentType).config.labelTwo]
              }}</label
            >
            <div class="field-icon">
              <input
                id="email"
                autofocus="autofocus"
                :class="[
                  'field',
                  hasProperty(constants.CONDITIONS.ERROR_BORDER)
                    ? errors.fieldTwo
                      ? isError
                      : ''
                    : '',
                ]"
                :type="
                  inputTypes.fieldTwoType ||
                  compDefinition.get(componentType).config.inputTwoType
                "
                :placeholder="
                  hasProperty(constants.CONDITIONS.PLACEHOLDERS)
                    ? $t[language][
                        compDefinition.get(componentType).config.labelTwo
                      ]
                    : ''
                "
                v-model="inputTwo"
              />
              <eye
                v-if="
                  componentType === constants.COMP_TYPES.NEW &&
                  hasProperty(constants.CONDITIONS.ICONS)
                "
                :field="constants.INPUTS.TWO"
                :field-type="'password'"
                :app-type="appType"
                @checked="handleInputType"
              />
            </div>
            <Transition name="slide-fade">
              <div class="alert" v-if="errors.fieldTwo">
                <pre>{{ errors.fieldTwo }}</pre>
              </div>
            </Transition>
          </div>

          <Transition name="slide-fade">
            <div class="alert" v-if="errors.general">{{ errors.general }}</div>
          </Transition>

          <span
            class="captcha"
            v-if="hasProperty(constants.CONDITIONS.CAPTCHA)"
          >
            <VueHcaptcha
              v-if="captchaType === constants.CAPTCHA_TYPE.HCAPTCHA"
              ref="hcaptcha"
              :sitekey="hcaptchaKey"
              :language="language"
              @error="onCaptchaError"
              @verify="onCaptchaSuccess"
              @expired="onCaptchaExpired"
            />
            <VueRecaptcha
              v-if="captchaType === constants.CAPTCHA_TYPE.RECAPTCHA"
              :sitekey="recaptchaKey"
              :load-recaptcha-script="true"
              @verify="onCaptchaSuccess"
              @error="onCaptchaError"
              @expired="onCaptchaExpired"
            ></VueRecaptcha>
          </span>

          <button
            type="button"
            class="button button-cust"
            :disabled="!isButtonReady"
            @click.prevent="onSubmit"
          >
            {{ $t[language][compDefinition.get(componentType).config.button] }}
            <span class="magic-arrow" v-if="appType === 'mall'">›</span>
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import eye from '../components/Eye.vue';
import { ref, computed, watch, onMounted } from 'vue';
import { useFetch } from '../composables/useFetch';
import {
  getAttr,
  getAppID,
  genarateRedirectUrl,
  getSessionId,
} from '../utils/resolveUrl';
import { appConfig } from '../definition/apps';
import { endPoints } from '../definition/endPoints';
import { compDefinition } from '../definition/comps';
import * as constants from '../config/constants';
import { translations as $t } from '../utils/translations';
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { VueRecaptcha } from 'vue-recaptcha';

// setting props
const props = defineProps({
  componentType: {
    type: String,
    default: constants.COMP_TYPES.NEW,
  },
  appType: {
    type: String,
    default: 'mall',
  },
  websiteUuid: {
    type: String,
    default: '',
  },
  translations: {
    type: String,
  },
  primaryColor: {
    type: String,
    default: '#ca7900',
  },
  secondaryColor: {
    type: String,
    default: '#fac884',
  },
  language: {
    type: String,
    default: 'en',
  },
  captchaType: {
    type: String,
    default: 'HCAPTCHA',
  },
});
const isMsg = props.componentType === constants.COMP_TYPES.MESSAGE;
const msgText = ref('');
// TODO prepare translations
// const $tr = JSON.parse(props.translations);
// console.log('translations', $tr);

const resetPassword = (uid, wid) => {
  setTimeout(() => {
    msgText.value = '';
  }, 6000);
  const endPoint = endPoints.get(constants.API_TYPES.REQUEST);
  endPoint.params.jsessionid = getSessionId();
  endPoint.url = endPoint.url.replace('website_uuid', wid);
  endPoint.url = endPoint.url.replace('user_uuid', uid);
  console.log(8, endPoint);
  useFetch(endPoint).then((response) => {
    if (response.status >= 200 && response.status <= 300) {
      console.log(response);
    }
    if (response.status >= 400) {
      console.log(400, response);
      loading.value = constants.LOADING.ERROR;
    }
    if (response.error) {
      console.log('error', response);
      apiError.value = response.errorMsg;
      loading.value = constants.LOADING.ERROR;
    }
    msgText.value = response;
  });
};
defineExpose({ resetPassword });
console.log(0, genarateRedirectUrl(props.appType));
const loading = ref(constants.LOADING.INIT);
const inputOne = ref(null);
const inputTwo = ref(null);
const userUuid = ref(null);
const passwordLength = ref({
  min: 7,
  max: 10,
});

const isError = ref('');
const errors = ref(null);
const resetErrors = () => {
  errors.value = {
    general: '',
    fieldOne: '',
    fieldTwo: '',
  };
};
const getSuccessMsg = computed(() => {
  return props.componentType === constants.COMP_TYPES.NEW
    ? $tr['api.rest.password.success.new_password_saved']
    : $tr['api.rest.password.success.reset_password_email_sent'];
});

const otherFieldError = (field) => {
  return field ? field + '\n' : '';
};
const fieldValidation = () => {
  if (props.componentType === constants.COMP_TYPES.FORGOT) {
    if (
      inputOne.value ||
      (inputTwo.value && inputTwo.value.match(constants.EMAIL_REGEX))
    ) {
      isError.value = '';
      resetErrors();
      return true;
    }
    if (!inputOne.value)
      errors.value.fieldOne =
        $tr['api.rest.password.exception.errors.username_required'];
    if (!inputTwo.value)
      errors.value.fieldTwo =
        $tr['api.rest.password.exception.errors.email_required'];
    if (!inputTwo.value.match(constants.EMAIL_REGEX))
      errors.value.fieldTwo =
        otherFieldError(errors.value.fieldTwo) +
        $tr['api.rest.password.exception.errors.email_required'];
  } else {
    if (
      inputOne.value &&
      inputOne.value.match(constants.PASSWORD_REGEX(passwordLength.value)) &&
      inputTwo.value &&
      inputTwo.value.match(constants.PASSWORD_REGEX(passwordLength.value)) &&
      inputOne.value === inputTwo.value
    ) {
      isError.value = '';
      return true;
    }
    if (!inputOne.value) errors.value.fieldOne = 'error 1';
    if (!inputOne.value.match(constants.PASSWORD_REGEX(passwordLength.value)))
      errors.value.fieldOne =
        otherFieldError(errors.value.fieldOne) +
        $tr['api.rest.password.exception.errors.password_violates_policy'];
    if (!inputTwo.value) errors.value.fieldTwo = 'error 2';
    if (!inputTwo.value.match(constants.PASSWORD_REGEX(passwordLength.value)))
      errors.value.fieldTwo =
        otherFieldError(errors.value.fieldTwo) +
        $tr[api.rest.password.exception.errors.password_violates_policy];
    if (inputOne.value !== inputTwo.value)
      errors.value.fieldTwo =
        otherFieldError(errors.value.fieldTwo) + 'error 2 same';
  }
  if (hasProperty(constants.CONDITIONS.ERROR_BORDER)) {
    isError.value = constants.CLASSES.FIELD_ERROR;
  }
  return false;
};

const inputTypes = ref({
  fieldOneType: '',
  fieldTwoType: '',
});
const handleInputType = (e) => {
  inputTypes.value[e.field] = e.type;
};
const isButtonReady = computed(() => {
  if (props.componentType === constants.COMP_TYPES.FORGOT) {
    return (
      hasProperty(constants.CONDITIONS.CAPTCHA) &&
      captchaToken.value &&
      (inputOne.value || inputTwo.value)
    );
  } else {
    return (
      hasProperty(constants.CONDITIONS.CAPTCHA) &&
      captchaToken.value &&
      inputOne.value &&
      inputTwo.value
    );
  }
});

const hasProperty = (prop) => {
  return appConfig.get(props.appType)[prop];
};
// TODO remove for live
const environment = import.meta.env['VITE_ENV'];

const onSubmit = () => {
  const validated = fieldValidation();
  if (validated) {
    const endPoint = endPoints.get(
      constants.API_TYPES[props.componentType.toUpperCase()]
    );
    if (props.componentType === constants.COMP_TYPES.NEW) {
      endPoint.payload.password = inputOne.value;
      endPoint.payload.repeat_password = inputTwo.value;
      endPoint.payload.attr = getAttr();
      endPoint.payload.user_uuid = userUuid.value;
    } else {
      endPoint.payload.username = inputOne.value;
      endPoint.payload.email = inputTwo.value;
      endPoint.payload.language_id = props.language;
      endPoint.payload.captcha_response = captchaToken.value;
    }
    endPoint.payload.website_uuid = props.websiteUuid;
    console.log(`submited ${props.componentType} : `, endPoint);
    // TODO handle response/errors
    useFetch(endPoint);
    // errors.value = {
    //   general: 'general error',
    //   fieldOne: '1 error',
    //   fieldTwo: '2 error',
    // };
    loading.value = constants.LOADING.SUCCESS;
    if (props.componentType === constants.COMP_TYPES.NEW) {
      setTimeout(() => {
        //window.location.href = props.appUrl;
      }, 5000);
    } else {
      setTimeout(() => {
        loading.value = constants.LOADING.DONE;
      }, 7000);
    }
  } else {
    // errors.value = {
    //   general: 'general error',
    //   fieldOne: '1 error',
    //   fieldTwo: '2 error',
    // };
  }
};
// handling dynamic css
const css = ref(null);
const loadStyle = async () => {
  if (environment === 'production') {
    const response = await fetch(
      `${getAppID()}${
        import.meta.env[constants.PREFIX + constants.GLOBALS.PART]
      }${props.appType}.css`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'text',
        },
      }
    );
    return response.text();
  } else {
    // TODO remove for live
    css.value = `../assets/${props.appType}.css`;
    const response = await fetch(css.value, {
      method: 'GET',
      headers: {
        'Content-type': 'text',
      },
    });
    return response.text();
  }
};
if (environment === 'local') {
  watch(
    () => props.appType,
    (newValue) => {
      css.value = `../assets/${props.appType}.css`;
      applyCss();
    }
  );
}

const applyCss = async () => {
  const cssData = await loadStyle();
  // TODO remove partCss thing when live
  let partCss = null;
  if (environment === 'local') {
    partCss = cssData.split(/\r\n|\n/)[2];
    partCss = partCss
      .slice(partCss.search('"'), partCss.length)
      .replace(/(?:\\[rn])+/g, '')
      .replaceAll('"', '');
  }
  const el = document.querySelector('custom-new-password');
  if (environment === 'production') {
    el.shadowRoot.querySelector('style').innerHTML =
      el.shadowRoot.querySelector('style').innerHTML + cssData;
  } else {
    // FIXME remove when live
    let lastCss = el.shadowRoot.querySelector('style').innerHTML;
    if (lastCss.search('wrapper') >= 0) {
      lastCss = lastCss.slice(0, lastCss.search('.wrapper'));
    }
    el.shadowRoot.querySelector('style').innerHTML = lastCss + partCss;
    //loading.value = constants.LOADING.DONE;
  }
};

(async () => {
  props.componentType !== constants.COMP_TYPES.MESSAGE && (await applyCss());
})();

const apiError = ref(null);
const getInitData = () => {
  const endPoint = endPoints.get(constants.API_TYPES.VALIDATE);
  endPoint.params.attr = getAttr();
  endPoint.params.website_uuid = import.meta.env[
    constants.PREFIX + props.appType.toUpperCase()
  ];
  // FIXME replace when live/testing
  userUuid.value = '12345';
  passwordLength.value.min = 7;
  passwordLength.value.max = 10;

  if (environment === 'production') {
    useFetch(endPoint).then((response) => {
      if (response.status === 200) {
        userUuid.value = response.user_uuid;
        passwordLength.value.min = response.minimum_length;
        passwordLength.value.max = response.maximum_length;
      }
      if (response.status >= 400) {
        loading.value = constants.LOADING.ERROR;
      }
      if (response.error) {
        apiError.value = response.errorMsg;
        loading.value = constants.LOADING.ERROR;
      }
    });
  }
  //loading.value = constants.LOADING.DONE;
};
// handling hCaptcha
const hcaptchaKey = import.meta.env[constants.PREFIX + constants.HCAPTCHA_KEY];
const recaptchaKey = import.meta.env[
  constants.PREFIX + constants.RECAPTCHA_KEY
];
const hcaptcha = ref(null);
const captchaToken = ref(null);
const onCaptchaError = (error) => {
  if (!error.handled) {
    //this.toast(this.$t('form.error.hcaptcha', { error }));
  }
};
const onCaptchaSuccess = (token) => {
  captchaToken.value = token;
  console.log('hchapcha token', captchaToken.value);
};
const onCaptchaExpired = async () => {
  console.log('captcha expired');
  captchaToken.value = null;
  await hcaptcha.value.reset();
};

onMounted(() => {
  resetErrors();
  if (props.componentType === constants.COMP_TYPES.NEW) {
    getInitData();
  }
  // FIXME remove when live/testing
  setTimeout(() => {
    loading.value = constants.LOADING.DONE;
  }, 1500);
});
</script>
<style lang="scss">
* {
  font-family: 'Open Sans', sans-serif;
}
// FIXME add all classes for custom colors, uncoment when live/testing
// .button-cust {
//   background: v-bind(primaryColor) !important;
// }
// .button-cust:disabled {
//   background: v-bind(secondaryColor) !important;
// }
pre {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
.success {
  min-height: 180px;
  line-height: 1.5;
  font-weight: 400;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100%;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid transparent;
  border-bottom-color: v-bind(primaryColor);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.eye {
  cursor: pointer;
  /* stroke: v-bind(props.primaryColor); */
  /* stroke-width: .2; */
  height: 3rem;
}
.eye-im {
  padding: 0 1em;
  position: absolute;
  top: 40%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
}
.eye path {
  stroke: v-bind(primaryColor);
}
.eye:hover path {
  stroke: v-bind(secondaryColor);
}
.field-icon {
  display: flex;
  gap: 0.5rem;
  position: relative;
}
.field-error {
  border: solid 1px #c31a19;
}
.alert {
  padding: 0.5em 0 0 0;
  font-size: 0.8889rem;
  background: none;
  color: #c31a19;
  border: none;
  margin-bottom: 0;
}
.msg {
  line-height: 1.5;
  font-weight: 400;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: 50%;
  left: 45%;
  z-index: 111;
  background: white;
  padding: 1rem;
  box-shadow: 0 0.125rem 0.5rem rgba(34, 34, 34, 0.12);
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  //transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
.slide-fall-enter-active {
  transition: all 1s ease;
}
.slide-fall-leave-active {
  transition: all 1s ease;
}
.slide-fall-enter-from,
.slide-fall-leave-to {
  transform: translateY(-500px);
  opacity: 0;
}
</style>
