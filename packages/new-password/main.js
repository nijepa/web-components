import { defineCustomElement } from "vue";
import Search from "./components/Custom-NewPassword.ce.vue";
const CustomNewPassword = defineCustomElement(Search);
customElements.define("custom-new-password", CustomNewPassword);
