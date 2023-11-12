import { reactive } from "vue";

export const state = reactive({
  appType: "",
  errors: {
    general: "",
    fieldOne: "",
    fieldTwo: "",
  },
});

export const resetErrors = () =>
  (state.errors = Object.keys(state.errors).reduce(
    (acc, curr) => ({ ...acc, [curr]: '' }),
    {}
  ));
