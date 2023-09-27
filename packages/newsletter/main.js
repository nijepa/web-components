import { defineCustomElement } from "vue";
import newsletter from "./components/Custom-Newsletter.ce.vue";
const CustomNewsletter = defineCustomElement(newsletter);
customElements.define("custom-newsletter", CustomNewsletter);
