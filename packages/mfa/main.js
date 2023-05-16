import { defineCustomElement } from "vue";
import Mfa from "./components/Custom-Mfa.ce.vue";
const CustomMfa = defineCustomElement(Mfa);
customElements.define("custom-mfa", CustomMfa);
