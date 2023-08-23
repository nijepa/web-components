<template>
  <div :class="classes.wrapper">
    <h1 :class="classes.title">title</h1>
    <div :class="classes.fields">
      <input type="text" :class="classes.field" v-model="newPassword" />
      <input type="text" :class="classes.field" v-model="repeatNewPassword" />
      <span :class="classes.captcha" >
        <slot name="captcha"></slot>
      </span>
      <button type="submit" :class="classes.btn" @click="">submit</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, useSlots } from 'vue';
import { useFetch } from '../composables/useFetch';
import { resolveUrl } from '../utils/resolveUrl';

const appClasses = new Map([
  [
    'im',
    {
      wrapper: 'im-wraper',
      title: 'im-title',
      fields: 'im-fields',
      field: 'im-field',
      captcha: 'im-captcha',
      btn: 'im-btn',
    },
  ],
]);

// setting props
const props = defineProps({
  appType: {
    type: String,
    default: 'im',
  },
  hasCaptcha: {
    type: String,
    default: 'false',
  },
  translations: {
    type: String,
  },
  context: {
    type: String,
    default: '/mall',
  },
});

const slots = useSlots();
console.log(slots)
const hasSlot = (name) => {
  return !!slots[name];
};
// prepare translations
// const $t = JSON.parse(props.translations);

const newPassword = ref(null);
const repeatNewPassword = ref(null);

const fieldValidation = () => {};

const hasCaptcha = computed(() => {
  console.log(3, hasSlot('captcha'))
  return slots.captcha;
});

const classes = ref({
  wrapper: '',
  title: '',
  fields: '',
  field: '',
  captcha: '',
  btn: '',
});
const applyStyles = () => {
  classes.value = appClasses.get(props.appType);
};
onMounted(() => {
  applyStyles();
});
// show error
const error = ref(null);
const handleError = (msg) => {
  error.value = msg;
  setTimeout(() => {
    error.value = null;
  }, 6000);
};

// fetch availabile vouchers
const receivedData = ref([]);
const getData = async () => {
  const received = await useFetch('GET', props.context);
  received.error
    ? handleError(received.errorMessage)
    : (receivedData.value = received);
};

// links for product details or product list page
const generateLink = (product) => {
  return product.listArticle
    ? resolveUrl(
        props.context,
        `cat/view.do?liArt=${product.productNumber}&lht=list_article#0`
      )
    : resolveUrl(
        props.context,
        `product.do?productNumber=${product.productNumber}`
      );
};

// setting component state
// const active = ref(false);
// watch(
//   () => props.isActive,
//   (newValue) => {
//     active.value = newValue === 'true';
//     if (active.value) {
//       !receivedData.value.length && getData();
//       search.value.focus();
//     }
//   }
// );

// creating & emitting events
const emit = defineEmits(['close-search']);
const searchWrapper = ref(null);
const hideSearch = () => {
  active.value = false;
  searchWrapper.value.dispatchEvent(
    new CustomEvent('close-search', {
      bubbles: true,
      composed: true,
    })
  );
};
</script>
<style lang="scss">
* {
  font-family: 'Open Sans', sans-serif;
}

.im-field {
  background: #ffffff;
  color: #333333;
  border: 1px solid #cccccc;
  border-radius: 0;
  font-size: 1rem;
  padding: 0 0.5em;
  position: relative;
  text-overflow: ellipsis;
  -webkit-box-shadow: none;
  box-shadow: none;
  display: block;
  width: 100%;
  // height: calc(1.5em + 0.75rem + 2px);
  // padding: 0.375rem 0.75rem;
  // font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  // color: #495057;
  // background-color: #fff;
  // background-clip: padding-box;
  // border: 1px solid #ced4da;
  // border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    box-shadow: none;
    outline: none;
    border-color: #cccccc;
  }
  &:hover {
    outline: none;
  }
}
.im-btn {
  padding: 0.6em 2em;
  min-height: 3em;
  border: 2px solid transparent;
  border-radius: 0;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
</style>
