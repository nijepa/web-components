<template>
  <div class="form-group">
    <label for="email" v-if="fieldProps.hasLabel">{{ fieldProps.labelText }}</label>
    <div class="field-icon">
      <input
        id="email"
        autofocus="autofocus"
        :class="['field', fieldProps.fieldClass]"
        :type="inputType || fieldProps.fieldType"
        :placeholder="fieldProps.placeholder"
        v-model="value"
      />
      <eye
        v-if="fieldProps.hasEye"
        :field="fieldProps.field"
        :field-type="'password'"
        :app-type="appType"
        @checked="handleInputType"
      />
    </div>
    <Transition name="slide-fade">
      <div class="alert" v-if="fieldProps.fieldError">
        <pre>{{ fieldProps.fieldError }}</pre>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import eye from "../components/Eye.vue";
import { ref, computed } from 'vue';
import { state } from '../store/state';
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  fieldProps: {
    type: Object
  }
  // appType: {
  //   type: String
  // },
  // hasLabel: {
  //   type: Boolean,
  //   default: false,
  // },
  // labelText: {
  //   type: String,
  //   default: '',
  // },
  // field: {
  //   type: String,
  //   default: ''
  // },
  // fieldClass: {
  //   type: String,
  //   default: '',
  // },
  // fieldType: {
  //   type: String,
  //   default: '',
  // },
  // placeholder: {
  //   type: String,
  //   default: '',
  // },
  // hasEye: {
  //   type: Boolean,
  //   default: false,
  // },
  // hasLabel: {
  //   type: Boolean,
  //   default: true,
  // },
  // fieldError: {
  //   type: String,
  //   default: '',
  // },
})
const { appType, errors } = state
console.log(555, props.fieldProps, appType)
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
const inputType = ref('')
const handleInputType = (e) => {
  inputType.value = e.type;
};
</script>
