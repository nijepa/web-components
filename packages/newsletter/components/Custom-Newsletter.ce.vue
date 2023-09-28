<template>
  <main class="main">
    <Transition name="slide-up" appear>
      <section class="stage" ref="accountWrapper">
        <div class="news">
          <div class="heading">
            <h3>Anmeldung zum ALDI SÜD Newsletter</h3>
            <p>
              Jetzt für den ALDI SÜD Newsletter anmelden und keine Angebote mehr
              verpassen! Abmeldung jederzeit möglich.
            </p>
          </div>
          <input
            class="email"
            type="email"
            v-model="email"
            placeholder="Ihre E-Mail-Adresse"
          />
          <div class="submit">
            <button class="btn btn-primary" @click="sendRequest" :disabled="!isValidated">
              Newsletter abonnieren
            </button>
            <div class="check">
              <label class="checkbox">
                <input type="checkbox" name="checkbox" v-model="check" />
                Ich möchte News per E-Mail erhalten und bin mit der damit
                verbundenen Verarbeitung meiner personenbezogenen Daten gemäß
                der ALDI SÜD-Datenschutzerklärung einverstanden. Ein Widerruf
                ist jederzeit möglich. cadooz GmbH übernimmt keine Haftung für
                den ALDI Newsletter.
              </label>
            </div>
          </div>
        </div>
        <img
          :src="imgUrl + 'newsletter-img.png'"
          alt="Newsletter Image"
          class="image"
        />
      </section>
    </Transition>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFetch } from '../composables/useFetch';
import { resolveUrl } from '../utils/resolveUrl'

// setting props
const props = defineProps({
  translations: {
    type: String,
  },
  primaryColor: {
    type: String,
    default: '#fff',
  },
  hoverColor: {
    type: String,
    default: '#660000',
  },
  font: {
    type: String,
    default: '',
  },
  actionUrl: {
    type: String,
    default: '',
  },
});

//const imageUrl = new URL('../assets/newsletter-img.png', import.meta.url).href;
console.log(0, resolveUrl())
const imgUrl = resolveUrl() + '/scripts/ebc/';
const EMAIL_REGEX = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const email = ref(null)
const check = ref(false)
const isValidated = computed(() => {
  return email.value && email.value.match(EMAIL_REGEX) && check.value ? true : false
})

// load user data
onMounted(async () => {
  //await getUserData();
});

// end-point call
const sendRequest = async () => {
  const url = import.meta.env.VITE_QA_URL
  const received = await useFetch(
    url,
    'POST',
    JSON.stringify({"email": email.value})
  );
  if (received.error.length) {
    console.log('pass errors', received);
  } else {
    console.log('success', received)
  }
};
// creating & emitting event for showing toast
const emit = defineEmits(['toggle-toast']);
const accountWrapper = ref(null);
const showToast = (messages, type, fixed = false) => {
  accountWrapper.value.dispatchEvent(
    new CustomEvent('toggle-toast', {
      bubbles: true,
      composed: true,
      detail: { messages, type, fixed },
    })
  );
};
</script>
<style>
*,
::after,
::before {
  box-sizing: border-box;
}
.stage {
  padding-bottom: 1.5rem;
  font-family: v-bind(props.font);
  display: flex;
  flex-direction: column;
  background-color: #202b78;
  border-radius: 0.5rem;
  color: #fff;
  padding: 2rem;
  position: relative;
}
.news {
  padding: 0;
  z-index: 1;
}
h3 {
  margin: 0;
}
.image {
  position: absolute;
  right: -15px;
  bottom: 0;
}
.submit {
  display: flex;
  flex-direction: column;
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
label {
  font-size: 0.725rem;
}
.btn {
  padding: 1rem;
  font-weight: 600;
  border-radius: 0.3rem;
  cursor: pointer;
  width: 100%;
  color: #202b78;
  font-size: 1rem;
}
.btn-primary {
  background-color: #fff;
  outline: none;
  border: 0;
  transition: all 0.4s ease-in-out;
}
.email {
  height: 3rem;
  margin-bottom: 1rem;
  background-color: #1a2261;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 0.3rem;
  padding: 1rem;
  width: 100%;
  font-size: 1rem;
}
.email:focus {
  color: #fff;
  background-color: #1a2261;
  border-color: rgb(237, 102, 102);
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(237 102 102 / 25%);
}
.btn-primary:hover:enabled,
.btn-primary:active:enabled,
.btn-primary:focus:enabled {
  /*background-color: rgb(237, 102, 102);
  border-color: v-bind(props.hoverColor);*/
  outline: none;
  box-shadow: none;
  background-color: rgb(237, 102, 102);
  /* box-shadow: inset 0px 0px 2px 1px rgba(237, 102, 102, 1); */
}
.btn-primary:disabled {
  cursor: not-allowed;
  pointer-events: all !important;
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
    width: 60%;
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
  transform: translateY(-50px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
