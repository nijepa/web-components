import { defineCustomElement } from "vue";
import Pass from "./components/Custom-NewPassword.ce.vue";
const CustomNewPassword = defineCustomElement(Pass);
customElements.define("custom-new-password", CustomNewPassword);
