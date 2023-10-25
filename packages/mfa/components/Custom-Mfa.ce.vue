<template>
  <div :class="!isCips ? 'comp-new' : 'comp'">
    <div v-if="loading" class="loading">
      <span class="loader"></span>
    </div>
    <template v-else>
      <!-- *********************** HEADER *********************** -->
      <div
        :class="!isCips ? 'header-new' : 'header'"
        ref="header"
        v-if="fromMfaLogin !== 'true'"
      >
        <template v-if="isCips">
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
        </template>
        <template v-else>
          <h1>Zwei-Faktor-Identifizierung</h1>
          <button class="btn-edit-new" @click="editing(false)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square svg-edit"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </button>
        </template>
      </div>
      <!-- *********************** CONTENT *********************** -->
      <Transition name="slide-up" appear>
        <div class="message" v-if="responseMsg.msg" :class="messageType">
          <svg
            v-if="!isCips"
            @click="clearMsg(0)"
            fill="#fff"
            class="close-msg"
            width="16px"
            height="16px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M512.481 421.906L850.682 84.621c25.023-24.964 65.545-24.917 90.51.105s24.917 65.545-.105 90.51L603.03 512.377 940.94 850c25.003 24.984 25.017 65.507.033 90.51s-65.507 25.017-90.51.033L512.397 602.764 174.215 940.03c-25.023 24.964-65.545 24.917-90.51-.105s-24.917-65.545.105-90.51l338.038-337.122L84.14 174.872c-25.003-24.984-25.017-65.507-.033-90.51s65.507-25.017 90.51-.033L512.48 421.906z"
            />
          </svg>
          <svg
            v-if="!isCips"
            fill="#fff"
            width="24px"
            height="24px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="!responseMsg.isError"
              d="M351.605 663.268l481.761-481.761c28.677-28.677 75.171-28.677 103.847 0s28.677 75.171 0 103.847L455.452 767.115l.539.539-58.592 58.592c-24.994 24.994-65.516 24.994-90.51 0L85.507 604.864c-28.677-28.677-28.677-75.171 0-103.847s75.171-28.677 103.847 0l162.25 162.25z"
            />
            <path
              v-else
              d="M512.481 421.906L850.682 84.621c25.023-24.964 65.545-24.917 90.51.105s24.917 65.545-.105 90.51L603.03 512.377 940.94 850c25.003 24.984 25.017 65.507.033 90.51s-65.507 25.017-90.51.033L512.397 602.764 174.215 940.03c-25.023 24.964-65.545 24.917-90.51-.105s-24.917-65.545.105-90.51l338.038-337.122L84.14 174.872c-25.003-24.984-25.017-65.507-.033-90.51s65.507-25.017 90.51-.033L512.48 421.906z"
            />
          </svg>
          {{ responseMsg.msg }}
        </div>
      </Transition>
      <div
        :class="!isCips ? 'subhead-new' : 'subhead'"
        v-if="fromMfaLogin !== 'true'"
      >
        <h6>{{ translate('notes.status') }}</h6>
        <h4>{{ translateMfaStatus }}</h4>
        <Transition name="fade" appear>
          <button
            v-if="isEditing && templateState === 'backup'"
            @click="changeTemplateState('deactivate')"
            class="btn-state"
            :class="!isCips ? 'btn-new' : 'btn'"
          >
            {{ translate('buttons.edit_2fa') }}
          </button>
        </Transition>
      </div>
      <hr
        v-if="isEditing && fromMfaLogin !== 'true'"
        :class="!isCips && 'hr-new'"
      />
      <Transition name="slide-up" appear>
        <div
          class="main"
          :class="!isCips && 'main-new'"
          v-if="isEditing"
        >
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
              <p
                style="text-align: center; margin: 1em"
                v-if="item.tag === 'a'"
              >
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
                :class="
                  (templateState !== 'active' && 'code-enter',
                  !isCips && 'input-code__new')
                "
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
              class="btn-abort"
              :class="[
                { 'btn-light': templateState === 'backup' },
                !isCips ? 'btn-new' : 'btn',
              ]"
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
              class="btn-right"
              @click="handleClick"
              :disabled="isDisabled"
              :class="[
                {
                  'btn-disabled': isDisabled,
                  'btn-light': templateState === 'backup',
                },
                !isCips ? 'btn-new' : 'btn',
              ]"
            >
              {{ getButtonLabel }}
            </button>
          </div>
        </div>
      </Transition>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useFetch } from '../composables/useFetch';
import { store } from '../store/store';
import { config, ACTIONS } from '../config/config';
import { resolveUrl, resolveBaseUrl } from '../utils/resolveUrl';
import { getDataURL } from '../utils/convertImage';
import { generateNewPDF } from '../utils/generatePDF';
import { prepareFormData } from '../utils/prepareFormData';
// setting props
const props = defineProps({
  translations: {
    type: String,
  },
  appType: {
    type: String,
    default: 'cips',
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
const ratio = ref(1);
const ratiow = ref(50);
// get status & calculate logo ratio
const loading = ref(true);
const isCips = props.appType === 'cips';
onMounted(async () => {
  props.fromMfaLogin !== 'true' && (await getMfaStatus());
  isEditing.value = props.fromMfaHint === 'true';
  isEditing.value && editing(true);
  if (props.fromMfaLogin === 'true') {
    await mfaGenerateQrCode();
    isEditing.value = true;
  }
  let image = new Image();
  image.onload = function () {
    ratio.value = +(image.width / image.height).toFixed(2);
    ratio.value = +(50 / ratio.value).toFixed(0);
    if (!isCips) {
      ratiow.value = 25;
    }
  };
  image.src = logo;
  loading.value = false;
});
// convert images to base64
let pdfImg = null;
let footerImg = null;
getDataURL(logo).then((base64) => {
  pdfImg = base64;
});
if (isCips) {
  getDataURL(footerLogo.value).then((base64) => {
    footerImg = base64;
  });
}
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
  if(networkError.value) {
    store.responseMessage.isError = true;
    store.responseMessage.msg = 'Network Error';
    isEditing.value = false
    return
  }
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
  return templateState.value ? translate(mapStates[templateState.value].label) : 'error';
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
const clearMsg = (time = 15000) => {
  setTimeout(() => {
    store.responseMessage.isError = null;
    store.responseMessage.msg = null;
  }, time);
};
const responseMsg = computed(() => {
  clearMsg();
  scrollToElement();
  return store.responseMessage;
});
const messageType = computed(() => {
  if (isCips) {
    return responseMsg.value.isError ? 'error-msg' : 'success-msg';
  } else {
    return responseMsg.value.isError ? 'error-msg__new' : 'success-msg__new';
  }
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
const networkError = ref(false)
const METHOD = isCips ? 'GET' : 'POST';
const payload = (name) => {
  return !isCips ? prepareFormData(name) : undefined;
};
const action = (name) => {
  return isCips ? name : undefined;
};
const getMfaStatus = async () => {
  const received = await useFetch(
    resolveBaseUrl(isCips, action(ACTIONS.CHECK_STATUS)),
    METHOD,
    payload(ACTIONS.CHECK_STATUS)
  );
  if (!received.error) {
    mfaStatus.value = received.multifactorAuthenticationEnabled;
  } else {
    networkError.value = true
    loading.value = false;
  }
};
const qrCodeUrl = ref(null);
const sharedSecret = ref(null);
const mfaGenerateQrCode = async () => {
  const received = await useFetch(
    resolveBaseUrl(isCips, action(ACTIONS.GENERATE_QR_CODE)),
    METHOD,
    payload(ACTIONS.GENERATE_QR_CODE)
  );
  if (!received.error) {
    qrCodeUrl.value = received.QrCodeUrl;
    sharedSecret.value = received.sharedSecret;
    store.sharedSecret = received.sharedSecret;
    templateState.value = 'active';
    focusInput();
    console.info('mfa qrcode', received);
  } else {
    loading.value = false;
  }
  handleMessages(received);
};
const mfaActivate = async () => {
  const received = await useFetch(
    resolveBaseUrl(isCips, action(ACTIONS.ACTIVATE)) +
      `?sharedSecret=${store.sharedSecret}`,
    METHOD,
    payload(ACTIONS.ACTIVATE)
  );
  if (!received.error) {
    getMfaStatus();
    templateState.value = 'code';
    verificationCode.value = null;
    console.info('mfa activate', received);
  }
  handleMessages(received);
  store.sharedSecret = '';
};
const mfaDeactivate = async () => {
  const received = await useFetch(
    resolveBaseUrl(isCips, action(ACTIONS.DEACTIVATE)),
    METHOD,
    payload(ACTIONS.DEACTIVATE)
  );
  if (!received.error) {
    getMfaStatus();
    templateState.value = 'activation';
    verificationCode.value = null;
    console.info('mfa deactivate', received);
  }
  handleMessages(received);
};
const mfaCheckVerificationCode = async () => {
  const sc = store.sharedSecret;
  const path = sc
    ? `?verificationCode=${verificationCode.value}&sharedSecret=${sc}`
    : `?verificationCode=${verificationCode.value}`;
  const received = await useFetch(
    resolveBaseUrl(isCips, action(ACTIONS.CHECK_VERIFICATION_CODE)) + path,
    METHOD,
    payload(ACTIONS.CHECK_VERIFICATION_CODE),
    false
  );
  if (!received.error) {
    mapStates[templateState.value].execute();
    console.info('mfa verification', received);
  }
  handleMessages(received);
};
const backupCodes = ref([]);
const mfaDownloadBackupCodes = async () => {
  const received = await useFetch(
    resolveBaseUrl(isCips, action(ACTIONS.DOWNLOAD_BACKUP_CODES)),
    METHOD,
    payload(ACTIONS.DOWNLOAD_BACKUP_CODES)
  );
  if (!received.error) {
    verificationCode.value = null;
    console.info('mfa download codes', received);
    backupCodes.value = received.backupCodes;
    generateNewPDF(
      props.primaryColor,
      backupCodes.value,
      pdfImg,
      footerImg,
      ratiow.value,
      ratio.value / 2
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
  const received = await useFetch(
    resolveBaseUrl(isCips, action(ACTIONS.GENERATE_NEW_BACKUP_CODES)),
    METHOD,
    payload(ACTIONS.GENERATE_NEW_BACKUP_CODES)
  );
  if (!received.error) {
    verificationCode.value = null;
    console.info('mfa new backup codes', received);
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
<style>
.download {
  text-align: center;
}
.download:hover {
  color: v-bind(primaryColor);
}
.download:first-of-type {
  margin-top: 1em;
}
.download:last-of-type {
  margin-bottom: 1em;
}
.qrcode {
  width: 150px;
  height: 150px;
  align-self: center;
  margin: 1em 0;
}
.comp-new {
  height: 100%;
  background-color: transparent;
  border: none;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem #0000001f;
  margin-bottom: 1.5rem;
}
.comp {
  display: flex;
  flex-direction: column;
  padding: 0;
  font-family: v-bind(font);
}
@media screen and (min-width: 1200px) {
  .comp {
    padding: 0 0.8em;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  background-color: #9e9e9e;
  align-items: center;
  padding: 17px 15px;
  z-index: 100;
}
.header-new {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  z-index: 100;
}
@media screen and (min-width: 768px) {
  .header {
    padding: 31px 24px;
  }
}
@media screen and (min-width: 1200px) {
  .header {
    padding: 0 1em 0 0.5em;
  }
}
.header h1 {
  padding-left: 0.5em;
  font-size: 1.33333em;
  font-weight: 400;
  line-height: 1.44444rem;
  color: #fff;
}
.header-new h1 {
  /* padding-left: 0.5em; */
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.44444rem;
  color: #000;
}
.btn-edit,
.btn-edit-new {
  background-color: transparent;
  border: none;
}
.btn-edit .svg-edit {
  cursor: pointer;
  transition: all 0.25s ease;
  height: 50px;
  width: 50px;
}
.btn-edit-new .svg-edit {
  cursor: pointer;
  transition: all 0.25s ease;
  height: 1.5rem;
  width: 1.5rem;
}
.btn-edit-new .svg-edit:hover {
  fill: v-bind(primaryColor);
}
@media screen and (min-width: 768px) {
  .btn-edit .svg-edit {
    height: 40px;
    width: 40px;
  }
}
@media screen and (min-width: 1200px) {
  .btn-edit .svg-edit {
    height: 32px;
    width: 32px;
  }
}
.message {
  padding: 1em;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}
.error-msg {
  color: #e80000;
}
.error-msg__new {
  background-color: #e80000;
  color: #fff;
  border-radius: 0.5rem;
  margin: 0 1rem 1rem 1rem;
}
.success-msg {
  color: #0c7d0c;
}
.success-msg__new {
  background-color: #0c7d0c;
  color: #fff;
  border-radius: 0.5rem;
  margin: 0 1rem 1rem 1rem;
}
.close-msg {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.close-msg:hover {
  fill: #000;
}
.subhead {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  height: 5em;
  padding: 1em;
}
.subhead-new {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  /* margin: 0 2.25rem 1.5rem 2.25rem; */
  padding: 0 1rem 1rem 1rem;
}
@media screen and (max-width: 768px) {
  .subhead,
  .subhead-new {
    grid-template-columns: repeat(2, 1fr);
    height: 6em;
  }
  .subhead button,
  .subhead-new button {
    grid-column: 1/3;
    width: 100%;
  }
}
.subhead h4,
.subhead-new h4 {
  margin: 0;
}
.subhead h6,
.subhead-new h6 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.33333rem;
  color: v-bind(primaryColor);
}
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 0;
  padding: 0;
}
.hr-new {
  margin: 0 1rem;
}
.main {
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.main-new {
  padding: 1em;
}
.main .content {
  padding: 1rem 1rem 1rem 0;
}
.main .content p {
  margin: 0.5rem 0;
}
.main .content .content-title {
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  line-height: 1.25;
}
.main .code {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.main .code .download {
  text-align: center;
}
.main .code .download:hover {
  color: v-bind(primaryColor);
}
.main .code .download:first-of-type {
  margin-top: 1em;
}
.main .code .download:last-of-type {
  margin-bottom: 1em;
}
.main .code .qrcode {
  width: 150px;
  height: 150px;
  align-self: center;
  margin: 1em 0;
}
.main .code .secret {
  margin: 0 auto;
  color: #c31a19;
}
.main .actions {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: -1rem;
  flex-wrap: wrap;
}
.main-new .actions {
  margin-top: 0;
}
.note {
  background-color: #fffbc6;
  padding: 0.5em 1em;
  margin: 1em 0;
}
.note p {
  white-space: pre-line;
}
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid trans;
  background-color: v-bind(primaryColor);
  border-color: v-bind(primaryColor);
  letter-spacing: 0.01rem;
  padding: 0.5em 2em;
  border: 1px solid v-bind(primaryColor);
  border-radius: 0;
  font-size: 1.25rem;
  color: #fff;
  vertical-align: middle;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
  width: 100%;
  min-height: 62px;
  margin-top: 0.5em;
}
.btn-new {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid trans;
  background-color: v-bind(primaryColor);
  border-color: v-bind(primaryColor);
  font-weight: 600;
  letter-spacing: 0.01rem;
  padding: 1em;
  border: 1px solid v-bind(primaryColor);
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #fff;
  vertical-align: middle;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
  margin-top: 0.5em;
}
.btn:hover {
  font-weight: 600;
  -webkit-box-shadow: none;
  box-shadow: none;
  letter-spacing: -0.0075rem;
}
.btn-new:hover {
  background-color: rgb(13, 17, 48);
  border-color: rgb(13, 17, 48);
  outline: none;
  box-shadow: none;
  color: rgb(255, 255, 255);
}
@media screen and (max-width: 576px) {
  .btn {
    font-size: 1rem;
  }
}
@media screen and (min-width: 768px) {
  .btn {
    font-size: 1.1rem;
    width: 350px;
  }
}
@media screen and (min-width: 1200px) {
  .btn {
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
  color: #5d5d5d;
  border-color: #5d5d5d;
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
  background-color: #9e9e9e;
  border-color: #9e9e9e;
  pointer-events: none;
}
.input-code {
  position: relative;
  height: 2.5em;
  width: 250px;
  padding: 0 20px;
  border: 1px solid #5d5d5d;
  border-radius: 0;
  font-size: 1.25rem;
  background: #fff;
  -webkit-box-shadow: none;
  box-shadow: none;
  text-overflow: ellipsis;
  align-self: center;
  text-align: center;
  margin-top: 1em;
}
.input-code__new {
  border-radius: 0.5rem;
}
.input-code:focus {
  border-color: v-bind(primaryColor);
  outline: 0px none;
  -webkit-box-shadow: 0 0 0 1px v-bind(primaryColor);
  box-shadow: 0 0 0 1px v-bind(primaryColor);
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

.loading {
  display: flex;
  justify-content: center;
}
.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: '';
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #3b3b3b;
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
