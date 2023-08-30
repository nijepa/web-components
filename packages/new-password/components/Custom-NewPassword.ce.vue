<template>
  <div key="1" class="center-screen" v-if="loading === constants.LOADING.INIT">
    <span class="loader"></span>
  </div>
  <div key="2" class="general-error" v-if="loading === constants.LOADING.ERROR">
    error
  </div>
  <Transition name="slide-fade" mode="out-in">
    <div key="3" class="success" v-if="loading === constants.LOADING.SUCCESS">
      <h1>{{ getSuccessMsg }}</h1>
    </div>
  </Transition>
  <Transition name="slide-fade" mode="out-in">
    <div key="3" v-if="loading === constants.LOADING.DONE">
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
                    ? isError
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
                {{ errors.fieldOne }}
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
                    ? isError
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
                {{ errors.fieldTwo }}
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
            <slot name="captcha"></slot>
          </span>
          <vue-hcaptcha
              sitekey="10000000-ffff-ffff-ffff-000000000001"
              size="compact"
              theme="dark"
            ></vue-hcaptcha>
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
  resolveUrl,
  getAppID,
  genarateRedirectUrl,
} from '../utils/resolveUrl';
import { appConfig } from '../definition/apps';
import { endPoints } from '../definition/endPoints';
import { compDefinition } from '../definition/comps';
import * as constants from '../config/constants';
import { translations as $t } from '../utils/translations';
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
getAppID();
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
  appUrl: {
    type: String,
    default: 'https://ullapopkenclub-de.cadooztest.de/cips/login.do',
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
});

// TODO prepare translations if needed
// const $t = JSON.parse(props.translations);
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
    ? $t[props.language]['NewSuccess']
    : $t[props.language]['ForgotSuccess'];
});

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
    isError.value = constants.CLASSES.FIELD_ERROR;
    return false;
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
    isError.value = constants.CLASSES.FIELD_ERROR;
    return false;
  }
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
    return inputOne.value || inputTwo.value;
  } else {
    return inputOne.value && inputTwo.value;
  }
});

const hasProperty = (prop) => {
  return appConfig.get(props.appType)[prop];
};

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
    }
    endPoint.payload.website_uuid = import.meta.env[
      constants.PREFIX + props.appType.toUpperCase()
    ];
    console.log(`submited ${props.componentType} : `, endPoint);
    // TODO handle response/errors
    //useFetch(endPoint);
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
    }
  } else {
    errors.value = {
      general: 'general error',
      fieldOne: '1 error',
      fieldTwo: '2 error',
    };
  }
};

// FIXME uncomment when live/testing
// const loadStyle = async () => {
//   const response = await fetch(
//     `${props.appUrl}${
//       import.meta.env[constants.PREFIX + constants.GLOBALS.PART]
//     }${props.appType}.css`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-type': 'text',
//       },
//     }
//   );
//   return response.text();
// };

// FIXME comment when live/testing
const css = ref(`../assets/${props.appType}.css`);
const loadStyle = async () => {
  const response = await fetch(css.value, {
    method: 'GET',
    headers: {
      'Content-type': 'text',
    },
  });
  return response.text();
};
watch(
  () => props.appType,
  (newValue) => {
    css.value = `../assets/${props.appType}.css`;
    applyCss();
  }
);

const applyCss = async () => {
  const cssData = await loadStyle();
  // FIXME remove partCss thing when live/testing
  let partCss = cssData.split(/\r\n|\n/)[2];
  partCss = partCss
    .slice(partCss.search('"'), partCss.length)
    .replace(/(?:\\[rn])+/g, '')
    .replaceAll('"', '');

  const el = document.querySelector('custom-new-password');
  // FIXME replace when live/testing
  // el.shadowRoot.querySelector('style').innerHTML =
  //   el.shadowRoot.querySelector('style').innerHTML + cssData;
  let lastCss = el.shadowRoot.querySelector('style').innerHTML;
  if (lastCss.search('wrapper') >= 0) {
    lastCss = lastCss.slice(0, lastCss.search('.wrapper'));
  }
  el.shadowRoot.querySelector('style').innerHTML = lastCss + partCss;
  // FIXME uncomment when live/testing
  //loading.value = constants.LOADING.DONE;
};

(async () => {
  await applyCss();
})();

const getInitData = () => {
  const endPoint = endPoints.get(constants.API_TYPES.VALIDATE);
  endPoint.payload.attr = getAttr();
  endPoint.payload.website_uuid = import.meta.env[
    constants.PREFIX + props.appType.toUpperCase()
  ];
  // FIXME replace when live/testing
  userUuid.value = '12345';
  passwordLength.value.min = 7;
  passwordLength.value.max = 10;

  // useFetch(endPoint).then((response) => {
  //   if (response.status === 200) {
  //     userUuid.value = response.user_uuid;
  //     passwordLength.value.min = response.minimum_length;
  //     passwordLength.value.max = response.maximum_length;
  //   }
  //   if (response.status >= 400) {
  //     loading.value = constants.LOADING.ERROR;
  //   }
  // });
  loading.value = constants.LOADING.DONE;
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
  border-bottom-color: #f700ff;
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
.field-icon {
  display: flex;
  gap: 0.5rem;
  position: relative;
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
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
</style>
