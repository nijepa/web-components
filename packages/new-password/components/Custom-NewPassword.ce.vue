<template>
  <div class="" v-if="componentType === 'neww'">
    <div :class="classes.wrapper" style="display: block">
      <form class="header-loginbox-content" autocomplete="off">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            :class="classes.field"
            autofocus="autofocus"
            type="text"
          />
          <div id="password-forgotten-username-error" class="alert"></div>
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input id="email" :class="classes.field" type="text" />
          <div id="password-forgotten-email-error" class="alert"></div>
        </div>
        <div id="reset-password-validation-error" class="alert pt-0"></div>
        <span :class="classes.captcha" v-if="hasProperty('hasCaptcha')">
          <slot name="captcha"></slot>
        </span>
        <button type="button" :class="[classes.button, 'button-cust']">
          Send <span class="magic-arrow" v-if="appType === 'im'">›</span>
        </button>
      </form>
    </div>
  </div>

  <div v-else :class="classes.wrapper">
    <h1 :class="classes.title">{{ $t.en.Headline }}</h1>
    <form :class="classes.fields">
      <label for="newPassword" v-if="hasProperty('hasLabels')">{{
        $t.en.Formfield1
      }}</label>
      <input
        id="newPassword"
        type="password"
        :class="[classes.field, isError]"
        :placeholder="hasProperty('hasPlaceholders') && $t.en.Formfield1"
        v-model="newPassword"
      />
      <span class="alert"></span>
      <label for="repeatNewPassword" v-if="hasProperty('hasLabels')">{{
        $t.en.Formfield2
      }}</label>
      <input
        id="repeatNewPassword"
        type="password"
        :class="classes.field"
        :placeholder="hasProperty('hasPlaceholders') && $t.en.Formfield2"
        v-model="repeatNewPassword"
      />
      <span class="classes.error"></span>
      <span :class="classes.captcha" v-if="hasProperty('hasCaptcha')">
        <slot name="captcha"></slot>
      </span>
      <button
        type="submit"
        :disabled="!isReady"
        :class="[classes.button, 'button-cust']"
        @click.prevent="onSubmit"
      >
        {{ $t.en.Button }}
        <span class="magic-arrow" v-if="appType === 'im'">›</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, useSlots } from 'vue';
import { useFetch } from '../composables/useFetch';
import { resolveUrl } from '../utils/resolveUrl';
import { appConfig } from '../config/config';
import { translations as $t } from '../utils/translations';

// setting props
const props = defineProps({
  componentType: {
    type: String,
    default: 'new',
  },
  appType: {
    type: String,
    default: 'im',
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
  secondayColor: {
    type: String,
    default: '#fac884',
  },
  context: {
    type: String,
    default: '/mall',
  },
});

// prepare translations
// const $t = JSON.parse(props.translations);

const newPassword = ref(null);
const repeatNewPassword = ref(null);

const isError = ref('');
const fieldValidation = () => {
  const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (
    newPassword.value &&
    newPassword.value.match(pattern) &&
    repeatNewPassword.value &&
    repeatNewPassword.value.match(pattern) &&
    newPassword.value === repeatNewPassword.value
  ) {
    return true;
  }
  isError.value = 'form-field-error';
  return false;
};

const isReady = computed(() => {
  return fieldValidation();
});
const hasProperty = (prop) => {
  return appConfig.get(props.appType)[prop];
};

const classes = ref({
  wrapper: '',
  title: '',
  fields: '',
  field: '',
  captcha: '',
  button: '',
});
const applyStyles = () => {
  classes.value = appConfig.get(props.appType).classes;
};

const onSubmit = () => {
  console.log('submited', newPassword.value, repeatNewPassword.value);
};

const loadStyle = async () => {
  const response = await fetch(
    `${props.appUrl}/scripts/ebc/${props.appType}.css`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'text',
      },
    }
  );
  return response.text();
};
(async () => {
  const cssData = await loadStyle();
  const el = document.querySelector('custom-new-password');
  el.shadowRoot.querySelector('style').innerHTML = cssData;
})();

onMounted(async () => {
  applyStyles();
});
</script>
<style lang="scss">
//@import '../assets/im.scss';

* {
  font-family: 'Open Sans', sans-serif;
}
.button-cust {
  background: v-bind(primaryColor) !important;
}
.button-cust:disabled {
  background: v-bind(secondayColor) !important;
}
</style>
