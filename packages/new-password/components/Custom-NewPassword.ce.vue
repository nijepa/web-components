<template>
  <div key="1" class="center-screen" v-if="loading === constants.LOADING.INIT">
    <span class="loader"></span>
  </div>
  <div key="2" class="general-error" v-if="loading === constants.LOADING.ERROR">
    error
  </div>
  <Transition name="slide-fade">
    <div key="3" v-if="loading === constants.LOADING.DONE">
      <div class="wrapper" style="display: block">
        <form class="header-loginbox-content" autocomplete="off">
          <div
            class="form-group"
            v-if="
              componentType === constants.COMP_TYPES.NEW ||
              (componentType === constants.COMP_TYPES.FORGOT &&
                hasProperty(constants.CONDITIONS.USERNAME))
            "
          >
            <label
              for="username"
              v-if="hasProperty(constants.CONDITIONS.LABELS)"
              >{{
                $t[language][compDefinition.get(componentType).config.labelOne]
              }}</label
            >
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
              :type="compDefinition.get(componentType).config.inputOneType"
              :placeholder="
                hasProperty(constants.CONDITIONS.PLACEHOLDERS)
                  ? $t[language][
                      compDefinition.get(componentType).config.labelOne
                    ]
                  : ''
              "
              v-model="inputOne"
            />
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
            <input
              id="email"
              :class="[
                'field',
                hasProperty(constants.CONDITIONS.ERROR_BORDER)
                  ? isError
                    ? isError
                    : ''
                  : '',
              ]"
              :type="compDefinition.get(componentType).config.inputTwoType"
              :placeholder="
                hasProperty(constants.CONDITIONS.PLACEHOLDERS)
                  ? $t[language][
                      compDefinition.get(componentType).config.labelTwo
                    ]
                  : ''
              "
              v-model="inputTwo"
            />
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
          <button
            type="button"
            class="button button-cust"
            :disabled="!isReady"
            @click.prevent="onSubmit"
          >
            {{ $t[language][compDefinition.get(componentType).config.button] }}
            <span class="magic-arrow" v-if="appType === 'im'">›</span>
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useFetch } from '../composables/useFetch';
import { getAttr, resolveUrl } from '../utils/resolveUrl';
import { appConfig } from '../definition/apps';
import { endPoints } from '../definition/endPoints';
import { compDefinition } from '../definition/comps';
import * as constants from '../config/constants';
import { translations as $t } from '../utils/translations';

// setting props
const props = defineProps({
  componentType: {
    type: String,
    default: constants.COMP_TYPES.NEW,
  },
  appType: {
    type: String,
    default: 'cips',
  },
  appUrl: {
    type: String,
    default: 'https://ullapopkenclub-de.cadooztest.de',
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

// TODO prepare translations
// const $t = JSON.parse(props.translations);

// FIXME replace done with init iwhen live/testing
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

const isReady = computed(() => {
  return fieldValidation();
});
const hasProperty = (prop) => {
  return appConfig.get(props.appType)[prop];
};

const onSubmit = () => {
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
  errors.value = {
    general: 'general error',
    fieldOne: '1 error',
    fieldTwo: '2 error',
  };
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

  //loading.value = constants.LOADING.DONE;
};
// FIXME uncomment when live/testing
(async () => {
  await applyCss();
})();

const getInitData = () => {
  const endPoint = endPoints.get(constants.API_TYPES.VALIDATE);
  endPoint.payload.attr = getAttr();
  endPoint.payload.website_uuid = import.meta.env[
    constants.PREFIX + props.appType.toUpperCase()
  ];
  useFetch(endPoint).then((response) => {
    if (response.status === 200) {
      userUuid.value = response.user_uuid;
      passwordLength.value.min = response.minimum_length;
      passwordLength.value.max = response.maximum_length;
    }
    if (response.status >= 400) {
      loading.value = constants.LOADING.ERROR;
    }
  });
  loading.value = constants.LOADING.DONE;
};

onMounted(() => {
  resetErrors();
  if (props.componentType === constants.COMP_TYPES.FORGOT) {
    // FIXME uncomment when live/testing
    //getInitData();
  }
  // FIXME remove when live/testing
  setTimeout(() => {
    loading.value = constants.LOADING.DONE;
  }, 1500);
});
</script>
<style scoped lang="scss">
* {
  font-family: 'Open Sans', sans-serif;
}
// FIXME uncoment when live/testing
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
