<template>
  <Transition name="slide-up" appear mode="out-in">
    <section class="newsletter messages" v-if="apiCallEnded">
      <svg
        v-if="!isApiError"
        fill="#fff"
        width="32px"
        height="32px"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M351.605 663.268l481.761-481.761c28.677-28.677 75.171-28.677 103.847 0s28.677 75.171 0 103.847L455.452 767.115l.539.539-58.592 58.592c-24.994 24.994-65.516 24.994-90.51 0L85.507 604.864c-28.677-28.677-28.677-75.171 0-103.847s75.171-28.677 103.847 0l162.25 162.25z"
        />
      </svg>
      <svg
        v-else
        fill="#fff"
        width="32px"
        height="32px"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M512.481 421.906L850.682 84.621c25.023-24.964 65.545-24.917 90.51.105s24.917 65.545-.105 90.51L603.03 512.377 940.94 850c25.003 24.984 25.017 65.507.033 90.51s-65.507 25.017-90.51.033L512.397 602.764 174.215 940.03c-25.023 24.964-65.545 24.917-90.51-.105s-24.917-65.545.105-90.51l338.038-337.122L84.14 174.872c-25.003-24.984-25.017-65.507-.033-90.51s65.507-25.017 90.51-.033L512.48 421.906z"
        />
      </svg>
      <div v-html="apiCallEndedMessage" class="msg"></div>
    </section>
    <section v-else class="newsletter" ref="newsletterWrapper">
      <div class="news">
        <div class="heading">
          <p>
            {{ translate.title }}
          </p>
          <p>
            {{ translate.copy }}
          </p>
        </div>
        <input
          class="email"
          type="email"
          v-model="email"
          :placeholder="translate.placeholder"
        />
        <div class="submit">
          <button
            class="button-submit"
            @click="sendRequest"
            :disabled="!isValidated"
          >
            {{ translate.button }}
          </button>
          <div class="check">
            <label class="checkbox">
              <input type="checkbox" name="checkbox" v-model="check" />
              <span v-html="translate.check"></span>
            </label>
          </div>
        </div>
      </div>
      <!-- <img
        :src="imgUrl + 'newsletter-img.png'"
        alt="Newsletter Image"
        class="image"
      /> -->
    </section>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useFetch } from '../composables/useFetch';
import { resolveUrl } from '../utils/resolveUrl';
import { translate, EMAIL_REGEX } from '../config/config';

// setting props
const props = defineProps({
  translations: {
    type: String,
  },
  primaryColor: {
    type: String,
    default: '#202b78',
  },
  secondaryColor: {
    type: String,
    default: 'rgb(153, 204, 255)',
  },
  font: {
    type: String,
    default: "'Open Sans Regular', sans-serif",
  },
  actionUrl: {
    type: String,
    default: '',
  },
});

//const imageUrl = new URL('../assets/newsletter-img.png', import.meta.url).href;
const imgUrl = resolveUrl() + '/scripts/ebc/';
const email = ref('');
const check = ref(false);
const isValidated = computed(() => {
  return email.value && email.value.match(EMAIL_REGEX) && check.value
    ? true
    : false;
});

const clearData = () => {
  email.value = '';
  check.value = false;
};
const apiCallEnded = ref(false);
const apiCallEndedMessage = ref('');
const isApiError = ref(false);
const messages = {
  success:
    '<h3>Vielen Dank! Sie haben sich erfolgreich für unseren Newsletter angemeldet.</h3><p>Sie erhalten in Kürze eine E-Mail mit einem Link, den Sie noch einmal bestätigen müssen. Erst dann können Sie unseren Newsletter zukünftig erhalten.</p>',
  error:
    '<h3>Hier hat etwas nicht funktioniert.</h3><p>Bitte überprüfen Sie Ihre eingaben und versuchen Sie es erneut. Sollten Sie weiterhin Probleme mit der Anmeldung haben, wenden Sie sich gerne an uns unter: <a href="mailto:kontakt@kundenservice.aldi-sued.de">kontakt@kundenservice.aldi-sued.de</a></p>',
};
// end-point call
const sendRequest = async () => {
  const received = await useFetch('POST', { email: email.value });
  if (received.status = 400) {
    // TODO error action
    isApiError.value = true;
    apiCallEndedMessage.value = messages.error;
    console.log('success', received);
  } else {
    // TODO success action
    isApiError.value = false;
    apiCallEndedMessage.value = messages.success;
    console.log('pass errors', received);
  }
  apiCallEnded.value = true;
  setTimeout(() => {
    apiCallEnded.value = false;
  }, 16000);
  clearData();
};
</script>
<style>
*,
::after,
::before {
  box-sizing: border-box;
}
.newsletter {
  padding-bottom: 1.5rem;
  font-family: v-bind(font);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  background-color: v-bind(primaryColor);
  border-radius: 0.5rem;
  color: #fff;
  padding: 2rem;
  position: relative;
  margin-bottom: 2rem;
}
.messages {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.news {
  padding: 0;
  z-index: 1;
}
.heading p:first-of-type {
  font-weight: 600;
  margin-top: 0;
}
h3 {
  margin: 0;
}
.email {
  height: 3rem;
  margin-bottom: 1rem;
  background-color: color-mix(in srgb, v-bind(primaryColor), #000 25%);
  color: #fff;
  border: 1px solid #fff;
  border-radius: 0.3rem;
  padding: 1rem;
  width: 100%;
  font-size: 0.9rem;
}
.email:focus {
  color: #fff;
  background-color: color-mix(in srgb, v-bind(primaryColor), #000 25%);
  border-color: v-bind(secondaryColor);
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(153 204 255 / 25%);
}
.submit {
  display: flex;
  flex-direction: column;
}
.button-submit {
  padding: 1rem;
  font-weight: 600;
  border-radius: 0.3rem;
  cursor: pointer;
  width: 100%;
  color: v-bind(primaryColor);
  font-size: 0.9rem;
  font-family: v-bind(font);
  background-color: #fff;
  outline: none;
  border: 0;
  transition: all 0.4s ease-in-out;
}
.button-submit:hover:enabled,
.button-submit:active:enabled,
.button-submit:focus:enabled {
  /*background-color: rgb(237, 102, 102);
  border-color: v-bind(props.hoverColor);*/
  outline: none;
  box-shadow: none;
  background-color: v-bind(secondaryColor);
  /* box-shadow: inset 0px 0px 2px 1px rgba(237, 102, 102, 1); */
}
.button-submit:disabled {
  cursor: not-allowed;
  pointer-events: all !important;
}
.check {
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
}
.check label,
.checkbox {
  cursor: pointer;
}
.checkbox span a,
.msg a {
  color: #fff;
}
.checkbox span a:hover,
.msg a:hover {
  color: v-bind(secondaryColor);
}
label {
  font-size: 0.725rem;
}
.checkbox {
  font-size: 0.725rem;
  line-height: 1.5;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 2em;
}
.checkbox + .checkbox {
  margin-top: 1em;
}
.checkbox--disabled {
  color: var(--checkbox-disabled);
  cursor: not-allowed;
}
input[type='checkbox'] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 2em;
  height: 2em;
  border: 0.15em solid currentColor;
  border-radius: 0.2em;
  /* transform: translateY(-0.075em); */
  display: grid;
  place-content: center;
  padding: 0.5em;
  cursor: pointer;
}
input[type='checkbox']::before {
  content: '';
  width: 0.65em;
  height: 0.65em;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--checkbox-color);
  background-color: CanvasText;
}
input[type='checkbox']:checked::before {
  transform: scale(1);
}
.image {
  position: absolute;
  right: -15px;
  bottom: 0;
}

@media (min-width: 992px) {
  img {
    display: none;
  }
}
@media (max-width: 768px) {
  img {
    display: none;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
  .heading,
  .submit,
  .email {
    /* width: 60%; */
  }
  .submit {
    flex-direction: row;
    align-items: flex-start;
  }
  button,
  .check {
    flex: 1;
  }
  .check {
    margin-left: 1rem;
    margin-top: 0;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
