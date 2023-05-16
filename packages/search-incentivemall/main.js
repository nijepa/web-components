import { defineCustomElement } from "vue";
import Search from "./components/Custom-Search.ce.vue";
const CustomSearch = defineCustomElement(Search);
customElements.define("custom-search", CustomSearch);
