<template>
  <div class="comp">
    <!-- *********************** HEADER *********************** -->
    <div class="header" ref="header" v-if="fromMfaLogin !== 'true'">
      <h1 :style="{ 'font-weight': isEditing ? 600 : 400 }">
        2. {{ translate('notes.2fa_authentication') }}
      </h1>
      <button class="btn-edit" @click="editing(false)">
        <svg
          class="svg-edit"
          viewBox="0 0 33.583 34.179"
          x="0px"
          y="0px"
          width="32px"
          height="32px"
          stroke="rgb(255, 255, 255)"
          stroke-width="0"
          :style="{
            fill: isEditing ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)',
          }"
        >
          <g transform="matrix(1.3333333,0,0,-1.3333333,0,34.179467)">
            <g transform="translate(21.6945,25.6347)">
              <path
                d="m0 0-0.855-0.856-0.619-0.619-15.054-15.053-1.26-4.791 4.772 1.316 16.509 16.509zM-2.288-3.523 0-1.239 2.255-3.494-0.033-5.777Zm-13.002-13.005 12.045 12.041 2.256-2.254-12.046-12.041z"
              />
            </g>
            <g transform="translate(0,20.6298)">
              <path
                d="m0 0v-20.63h19.703v11.724l-1.037-1v-9.686H1.038v18.556h9.629L11.704 0Z"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
    <!-- *********************** CONTENT *********************** -->
    <Transition name="slide-up" appear>
      <div
        class="message"
        v-if="responseMsg.msg"
        :class="responseMsg.isError ? 'error-msg' : 'success-msg'"
      >
        <!-- <svg width="32px" height="32px" viewBox="0 0 16 16" fill="none">
          <path
            v-if="responseMsg.isError"
            fill="rgb(232, 0, 0)"
            d="M6.37119,11.87271h3.2554V14H6.37119ZM6.31551,2l.37063,8.54245H9.31386L9.68449,2Z"
          />
          <path
            v-else
            fill="rgb(12, 125, 12)"
            d="M14,4.69298L5.81846,12.87529l-3.81846-3.81846,1.63615-1.63692,2.25019,2.25019L12.43173,3.12471l1.56827,1.56827Z"
          />
        </svg>
        &nbsp; -->
        {{ responseMsg.msg }}
      </div>
    </Transition>
    <div class="subhead" v-if="fromMfaLogin !== 'true'">
      <h6>{{ translate('notes.status') }}</h6>
      <h4>{{ translateMfaStatus }}</h4>
      <Transition name="fade" appear>
        <button
          v-if="isEditing && templateState === 'backup'"
          @click="changeTemplateState('deactivate')"
          class="btn btn-state"
        >
          {{ translate('buttons.edit_2fa') }}
        </button>
      </Transition>
    </div>
    <hr v-if="isEditing && fromMfaLogin !== 'true'" />
    <Transition name="slide-up" appear>
      <div class="main" v-if="isEditing">
        <div class="content">
          <template v-for="item in templateFields">
            <h3 v-if="item.tag === 'h3'" :class="item.class">
              {{ translate(item.label) }}
            </h3>
            <p
              v-if="item.tag === 'p' && !item.isNote"
              :style="item.style === 'b' && 'font-weight: bold'"
            >
              {{ translate(item.label) }}
            </p>
            <div class="note" v-if="item.isNote">
              <p>
                <b>{{ translate('notes.note') }}</b>
              </p>
              <p
                v-if="item.isNote && item.tag === 'p' && item.style !== 'b'"
                v-html="translate(item.label)"
              ></p>
            </div>
            <p style="text-align: center; margin: 1em" v-if="item.tag === 'a'">
              <a :href="item.href" target="_blank" class="download">{{
                translate(item.label)
              }}</a>
            </p>
            <div style="display: flex; justify-content: center">
              <img
                v-if="item.tag === 'img'"
                :src="qrCodeUrl"
                alt="qrcode"
                class="qrcode"
              />
              <div class="secret" v-if="item.tag === 'sec'">
                {{ sharedSecret }}
              </div>
            </div>
          </template>
          <template style="display: flex; justify-content: center">
            <input
              v-if="getTemplates('execute').includes(templateState)"
              v-model="verificationCode"
              class="input-code"
              :class="templateState !== 'active' && 'code-enter'"
              :maxlength="templateState !== 'generate' ? 8 : 6"
              type="text"
              name=""
              id=""
              ref="code"
            />
          </template>
        </div>
        <!-- *********************** BUTTONS *********************** -->
        <div class="actions">
          <button
            v-if="getTemplates('leftBtn').includes(templateState)"
            class="btn btn-abort"
            :class="{ 'btn-light': templateState === 'backup' }"
            @click="leftButtonAction"
          >
            <svg
              v-if="templateState !== 'backup'"
              width="12px"
              height="12px"
              viewBox="0 0 1024 1024"
              style="margin-right: 0.5em"
            >
              <path
                d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                fill="rgb(93, 93, 93)"
              />
            </svg>
            {{ translate(mapStates[templateState].leftBtn) }}
          </button>
          <button
            class="btn btn-right"
            @click="handleClick"
            :disabled="isDisabled"
            :class="{
              'btn-disabled': isDisabled,
              'btn-light': templateState === 'backup',
            }"
          >
            {{ getButtonLabel }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useFetch } from '../composables/useFetch';
import { store } from '../store/store';
import { config } from '../config/config';
import { resolveUrl } from '../utils/resolveUrl';
import { getDataURL } from '../utils/convertImage';
import { generateNewPDF } from '../utils/generatePDF';
// setting props
const props = defineProps({
  translations: {
    type: String,
  },
  primaryColor: {
    type: String,
    default: '#000',
  },
  font: {
    type: String,
    default: "'Open Sans', sans-serif",
  },
  logoUrl: {
    type: String,
    default: '',
  },
  mfaStatusUrl: {
    type: String,
    default: '',
  },
  mfaActivateUrl: {
    type: String,
    default: '',
  },
  mfaDeactivateUrl: {
    type: String,
    default: '',
  },
  mfaCheckVerificationCodeUrl: {
    type: String,
    default: '',
  },
  mfaDownloadBackupCodesUrl: {
    type: String,
    default: '',
  },
  mfaGenerateQrCodeUrl: {
    type: String,
    default: '',
  },
  mfaGenerateNewBackupCodesUrl: {
    type: String,
    default: '',
  },
  fromMfaLogin: {
    typeof: String,
    default: '',
  },
  fromMfaHint: {
    typeof: String,
    default: '',
  },
});
// resolve images url's
const baseurl = resolveUrl('a');
const footerLogo = ref(
  baseurl.replace('cips/a', 'images/cips/cadooz_IPS_Logo_1c.png')
);
let logo = props.logoUrl.replace('url("', '').replace('")', '');
let ratio = 1;
// get status & calculate logo ratio
onMounted(() => {
  props.fromMfaLogin !== 'true' && props.mfaStatusUrl && getMfaStatus();
  isEditing.value = props.fromMfaHint === 'true';
  isEditing.value && editing(true);
  if (props.fromMfaLogin === 'true') {
    mfaGenerateQrCode();
    isEditing.value = true;
  }
  let image = new Image();
  image.onload = function () {
    ratio = +(image.width / image.height).toFixed(2);
    ratio = +(50 / ratio).toFixed(0);
  };
  image.src = logo;
});
// convert images to base64
let pdfImg = null;
let footerImg = null;
getDataURL(logo).then((base64) => {
  pdfImg = base64;
});
getDataURL(footerLogo.value).then((base64) => {
  footerImg = base64;
});
// focus code input
const code = ref(null);
const focusInput = () => {
  setTimeout(() => {
    code.value?.focus();
  }, 300);
};
// handle templates states
const templateState = ref(null);
const isEditing = ref(false);
const editing = (fromLogin = false) => {
  if (!fromLogin) isEditing.value = !isEditing.value;
  templateState.value = !mfaStatus.value
    ? mapStates['activation'].template
    : mapStates['backup'].template;
};
const templateFields = computed(() => {
  return config[templateState.value];
});
const getTemplates = (prop) => {
  const res = [];
  for (let key in mapStates) {
    mapStates[key].hasOwnProperty(prop) && res.push(mapStates[key].template);
  }
  return res;
};
const changeTemplateState = (template = null) => {
  if (template) {
    templateState.value = template === 'deactivate' ? 'deactivate' : 'generate';
  } else {
    templateState.value =
      mfaStatus.value && templateState.value === 'deactivate'
        ? 'deactivation'
        : 'download';
  }
  focusInput();
};
// handle button labels & status
const getButtonLabel = computed(() => {
  return translate(mapStates[templateState.value].label);
});
const isDisabled = computed(() => {
  if (getTemplates('execute').includes(templateState.value)) {
    return !verificationCode.value ||
      ![6, 8].includes(verificationCode.value?.length)
      ? true
      : false;
  }
  return false;
});
// handle button action
const leftButtonAction = () => {
  templateState.value === 'backup'
    ? changeTemplateState('generate')
    : (templateState.value = 'backup');
};
// define verification codes entry rules
const verificationCode = ref(null);
watch(
  () => verificationCode.value,
  (newValue, oldValue) => {
    verificationCode.value = newValue && newValue.replace(/[^0-9]/g, '');
  }
);
// handle mfa status/translation
const mfaStatus = ref(null);
const translateMfaStatus = computed(() => {
  const forTranslation = mfaStatus.value ? 'notes.active' : 'notes.inactive';
  return translate(forTranslation);
});
// return translations by keys
const prefix = 'cips.mfa.';
const translate = (key) => {
  return JSON.parse(props.translations)[prefix + key];
};
// execute button action
const handleClick = () => {
  mapStates[templateState.value].action();
  verificationCode.value = null;
};
// define scroll for messages
const header = ref(null);
const scrollToElement = () => {
  if (header.value) {
    header.value.scrollIntoView({ behavior: 'smooth' });
  }
};
// handle error & success messages
const responseMsg = computed(() => {
  setTimeout(() => {
    store.responseMessage.isError = null;
    store.responseMessage.msg = null;
  }, 15000);
  scrollToElement();
  return store.responseMessage;
});
const handleMessages = (response) => {
  if (response.error) {
    response.errorMessage =
      !mfaStatus.value && response.errorReason !== 'session_required'
        ? translate('error_message.code_incorrect')
        : response.errorMessage;
  }
  store.responseMessage = {
    isError: response.error,
    msg: response.errorMessage || response.successMessage,
  };
  if (response.errorReason) handleSessionExpired(response.errorReason);
};
// session expired action
const handleSessionExpired = (error) => {
  if (error === 'session_required') {
    const loginUrl = resolveUrl('login.do');
    setTimeout(() => (window.location.href = loginUrl), 6000);
  }
};
// actions / end-points calls
const getMfaStatus = async () => {
  const received = await useFetch(props.mfaStatusUrl, 'GET');
  if (!received.error)
    mfaStatus.value = received.multifactorAuthenticationEnabled;
};
const qrCodeUrl = ref(null);
const sharedSecret = ref(null);
const mfaGenerateQrCode = async () => {
  const received = await useFetch(props.mfaGenerateQrCodeUrl, 'GET');
  if (!received.error) {
    qrCodeUrl.value = received.QrCodeUrl;
    sharedSecret.value = received.sharedSecret;
    store.sharedSecret = received.sharedSecret;
    templateState.value = 'active';
    focusInput();
    console.log('mfa qrcode', received);
  }
  handleMessages(received);
};
const mfaActivate = async () => {
  const received = await useFetch(
    props.mfaActivateUrl + `?sharedSecret=${store.sharedSecret}`,
    'GET'
  );
  if (!received.error) {
    getMfaStatus();
    templateState.value = 'code';
    verificationCode.value = null;
    console.log('mfa activate', received);
  }
  handleMessages(received);
  store.sharedSecret = '';
};
const mfaDeactivate = async () => {
  const received = await useFetch(props.mfaDeactivateUrl, 'GET');
  if (!received.error) {
    getMfaStatus();
    templateState.value = 'activation';
    verificationCode.value = null;
    console.log('mfa deactivate', received);
  }
  handleMessages(received);
};
const mfaCheckVerificationCode = async () => {
  const sc = store.sharedSecret;
  const path = sc
    ? `?verificationCode=${verificationCode.value}&sharedSecret=${sc}`
    : `?verificationCode=${verificationCode.value}`;
  const received = await useFetch(
    props.mfaCheckVerificationCodeUrl + path,
    'GET'
  );
  if (!received.error) {
    mapStates[templateState.value].execute();
    console.log('mfa verification', received);
  }
  handleMessages(received);
};
const backupCodes = ref([]);
const mfaDownloadBackupCodes = async () => {
  const received = await useFetch(props.mfaDownloadBackupCodesUrl, 'GET');
  if (!received.error) {
    verificationCode.value = null;
    console.log('mfa download codes', received);
    backupCodes.value = received.backupCodes;
    generateNewPDF(
      props.primaryColor,
      backupCodes.value,
      pdfImg,
      footerImg,
      ratio
    );
    isEditing.value = false;
    if (props.fromMfaLogin === 'true') {
      const dashboardUrl = window.location.href.replace('login', 'welcome');
      setTimeout(() => (window.location.href = dashboardUrl), 6000);
    }
  }
  handleMessages(received);
};
const mfaGenerateNewBackupCodes = async () => {
  const received = await useFetch(props.mfaGenerateNewBackupCodesUrl, 'GET');
  if (!received.error) {
    verificationCode.value = null;
    console.log('mfa new backup codes', received);
  }
  handleMessages(received);
};
// define all views, translations, actions
const mapStates = {
  active: {
    template: 'active',
    label: 'buttons.activate_2fa',
    action: mfaCheckVerificationCode,
    execute: mfaActivate,
  },
  activation: {
    template: 'activation',
    label: 'buttons.activate_2fa',
    action: mfaGenerateQrCode,
  },
  code: {
    template: 'code',
    label: 'buttons.download_save_codes',
    action: mfaDownloadBackupCodes,
  },
  backup: {
    template: 'backup',
    label: 'buttons.download_save_codes',
    action: changeTemplateState,
    leftBtn: 'buttons.generate_codes',
  },
  deactivate: {
    template: 'deactivate',
    label: 'buttons.2fa_disable',
    action: changeTemplateState,
  },
  inputs: {
    template: 'inputs',
    label: 'buttons.confirm_entry',
    action: mfaCheckVerificationCode,
    leftBtn: 'buttons.abort',
  },
  generate: {
    template: 'generate',
    label: 'buttons.confirm_entry',
    action: mfaCheckVerificationCode,
    leftBtn: 'buttons.abort',
    execute: mfaGenerateNewBackupCodes,
  },
  download: {
    template: 'download',
    label: 'buttons.confirm_entry',
    action: mfaCheckVerificationCode,
    leftBtn: 'buttons.abort',
    execute: mfaDownloadBackupCodes,
  },
  deactivation: {
    template: 'deactivation',
    label: 'buttons.confirm_entry',
    action: mfaCheckVerificationCode,
    leftBtn: 'buttons.abort',
    execute: mfaDeactivate,
  },
};
</script>
<style lang="scss">
$small: 768px;
$medium: 1200px;
.download {
  text-align: center;
  &:hover {
    color: v-bind(primaryColor);
  }
  &:first-of-type {
    margin-top: 1em;
  }
  &:last-of-type {
    margin-bottom: 1em;
  }
}
.qrcode {
  width: 150px;
  height: 150px;
  align-self: center;
  margin: 1em 0;
}
.comp {
  display: flex;
  flex-direction: column;
  padding: 0;
  font-family: v-bind(font);
  @media screen and (min-width: $medium) {
    padding: 0 0.8em;
  }
  .header {
    display: flex;
    justify-content: space-between;
    background-color: rgb(158, 158, 158);
    align-items: center;
    padding: 17px 15px;
    z-index: 100;
    @media screen and (min-width: $small) {
      padding: 31px 24px;
    }
    @media screen and (min-width: $medium) {
      padding: 0 1em 0 0.5em;
    }
    h1 {
      padding-left: 0.5em;
      font-size: 1.33333em;
      font-weight: 400;
      line-height: 1.44444rem;
      color: #fff;
    }
    .btn-edit {
      background-color: transparent;
      border: none;
      .svg-edit {
        cursor: pointer;
        transition: all 0.25s ease;
        height: 50px;
        width: 50px;
        &:hover {
          //stroke-width: 1;
          //transform: scale(1.1);
        }
        @media screen and (min-width: $small) {
          height: 40px;
          width: 40px;
        }
        @media screen and (min-width: $medium) {
          height: 32px;
          width: 32px;
        }
      }
    }
  }
  .message {
    padding: 1em;
    // background-color: rgb(255, 194, 194);
    display: flex;
    align-items: center;
  }
  .error-msg {
    color: rgb(232, 0, 0);
  }
  .success-msg {
    color: rgb(12, 125, 12);
  }
  .subhead {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    height: 5em;
    padding: 1em;
    @media screen and (max-width: $small) {
      grid-template-columns: repeat(2, 1fr);
      height: 6em;
      button {
        grid-column: 1/3;
      }
    }
    h4 {
      margin: 0;
    }
    h6 {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.33333rem;
      color: v-bind(primaryColor);
    }
  }
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 0;
    padding: 0;
  }
  .main {
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .content {
      padding: 1rem 1rem 1rem 0;
      p {
        margin: 0.5rem 0;
      }
      .content-title {
        margin-top: -0.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        line-height: 1.25;
      }
    }
    .code {
      display: flex;
      flex-direction: column;
      width: 100%;
      .download {
        text-align: center;
        &:hover {
          color: v-bind(primaryColor);
        }
        &:first-of-type {
          margin-top: 1em;
        }
        &:last-of-type {
          margin-bottom: 1em;
        }
      }
      .qrcode {
        width: 150px;
        height: 150px;
        align-self: center;
        margin: 1em 0;
      }
      .secret {
        margin: 0 auto;
        color: #c31a19;
      }
    }
    .actions {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-top: -1rem;
      flex-wrap: wrap;
    }
  }
  .note {
    background-color: #fffbc6;
    padding: 0.5em 1em;
    margin: 1em 0;
    p {
      white-space: pre-line;
    }
  }
  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    //white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid trans;
    background-color: v-bind(primaryColor);
    border-color: v-bind(primaryColor);
    font-weight: 400;
    letter-spacing: 0.01rem;
    padding: 0.5em 2em;
    border: 1px solid v-bind(primaryColor);
    border-radius: 0;
    font-size: 1.25rem;
    color: rgb(255, 255, 255);
    vertical-align: middle;
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
    width: 100%;
    min-height: 62px;
    margin-top: 0.5em;
    &:hover {
      font-weight: 600;
      -webkit-box-shadow: none;
      box-shadow: none;
      //color: rgb(255, 255, 255);
      letter-spacing: -0.0075rem;
    }
    @media screen and (max-width: 576px) {
      font-size: 1rem;
    }
    @media screen and (min-width: $small) {
      font-size: 1.1rem;
      width: 350px;
    }
    @media screen and (min-width: $medium) {
      font-size: 1rem;
    }
  }
  .btn-state {
    justify-self: flex-end;
  }
  .btn-right {
    margin-left: auto;
  }
  .btn-abort {
    background-color: transparent;
    color: rgb(93, 93, 93);
    border-color: rgb(93, 93, 93);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-light {
    background-color: transparent;
    color: v-bind(primaryColor);
    border-color: v-bind(primaryColor);
  }
  .btn-light:hover {
    background-color: v-bind(primaryColor);
    color: #fff;
  }
  .btn-disabled {
    background-color: rgb(158, 158, 158);
    border-color: rgb(158, 158, 158);
    pointer-events: none;
  }
  .input-code {
    position: relative;
    height: 2.5em;
    //min-width: 225px;
    width: 250px;
    padding: 0 20px;
    border: 1px solid rgb(93, 93, 93);
    border-radius: 0;
    font-size: 1.25rem;
    background: rgb(255, 255, 255);
    -webkit-box-shadow: none;
    box-shadow: none;
    text-overflow: ellipsis;
    align-self: center;
    text-align: center;
    margin-top: 1em;
    &:focus {
      border-color: v-bind(primaryColor);
      outline: 0px none;
      -webkit-box-shadow: 0 0 0 1px v-bind(primaryColor);
      box-shadow: 0 0 0 1px v-bind(primaryColor);
    }
  }
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
