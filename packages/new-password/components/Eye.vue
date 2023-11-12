<template>
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="eye"
    @click="toggleFieldType"
    v-if="fieldState === 'password' && appType === 'taxfreenoncashbenefit'"
  >
    <path
      d="M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <svg
    viewBox="0 0 56.7 56.7"
    width="32px"
    height="32px"
    v-if="fieldState === 'password' && appType === 'mall'"
    class="eye-im"
    @click="toggleFieldType"
  >
    <path
      d="M28.4,36.4c-4.4,0-8-3.6-8-8c0-1.8,0.6-3.4,1.5-4.7l-1.4-1.4c-1.3,1.7-2.1,3.8-2.1,6.1c0,5.5,4.5,10,10,10
		c2.3,0,4.4-0.8,6.1-2.1l-1.4-1.4C31.8,35.9,30.2,36.4,28.4,36.4z"
    />
    <path
      d="M28.4,20.4c4.4,0,8,3.6,8,8c0,1.3-0.3,2.5-0.9,3.6l1.5,1.5c0.9-1.5,1.4-3.2,1.4-5.1c0-5.5-4.5-10-10-10
		c-1.9,0-3.6,0.5-5.1,1.4l1.5,1.5C25.9,20.7,27.1,20.4,28.4,20.4z"
    />
    <path
      d="M28.4,33.5c1,0,1.8-0.3,2.6-0.7l-1.5-1.5c-0.4,0.1-0.7,0.2-1.1,0.2c-1.7,0-3.1-1.4-3.1-3.1c0-0.4,0.1-0.8,0.2-1.1L24,25.8
		c-0.5,0.8-0.7,1.7-0.7,2.6C23.3,31.2,25.6,33.5,28.4,33.5z"
    />
    <path
      d="M31.4,28l1.8,1.8c0.1-0.4,0.2-0.9,0.2-1.4c0-2.8-2.3-5.1-5.1-5.1c-0.5,0-0.9,0.1-1.4,0.2l1.8,1.8
		C30.2,25.6,31.2,26.6,31.4,28z"
    />
    <path
      d="M53,28c-5.1-10-14.5-16.2-24.6-16.2c-3.7,0-7.4,0.8-10.7,2.4l1.5,1.5c2.9-1.2,6-1.9,9.2-1.9c9.2,0,17.8,5.6,22.6,14.6
		c-2.2,4.2-5.3,7.7-8.9,10.2l1.4,1.4c3.8-2.8,7.1-6.6,9.5-11.2C53.2,28.6,53.2,28.3,53,28z"
    />
    <path
      d="M28.4,43.1c-9.2,0-17.8-5.6-22.6-14.6c2.5-4.6,5.9-8.4,10-10.9l-1.5-1.5C10,18.9,6.3,23,3.8,28c-0.1,0.3-0.1,0.6,0,0.9
		c5.1,10,14.5,16.2,24.6,16.2c4.2,0,8.2-1.1,11.9-3l-1.5-1.5C35.6,42.2,32,43.1,28.4,43.1z"
    />
    <g>
      <polygon points="10.6,13.4 42.3,45.1 44,43.5 12.3,11.8 	" />
    </g>
  </svg>
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="eye"
    @click="toggleFieldType"
    v-if="fieldState === 'text' && appType === 'taxfreenoncashbenefit'"
  >
    <path
      d="M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <svg
    viewBox="0 0 56.7 56.7"
    width="32px"
    height="32px"
    v-if="fieldState === 'text' && appType === 'mall'"
    class="eye-im"
    @click="toggleFieldType"
  >
    <path
      d="M28.4,18.4c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S33.9,18.4,28.4,18.4z M28.4,36.4c-4.4,0-8-3.6-8-8s3.6-8,8-8
			s8,3.6,8,8C36.4,32.9,32.8,36.4,28.4,36.4z"
    />
    <path
      d="M28.4,23.3c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1S31.2,23.3,28.4,23.3z M28.4,31.5
			c-1.7,0-3.1-1.4-3.1-3.1s1.4-3.1,3.1-3.1s3.1,1.4,3.1,3.1S30.1,31.5,28.4,31.5z"
    />
    <path
      d="M53,28c-5.1-10-14.5-16.2-24.6-16.2S8.9,18,3.8,28c-0.1,0.3-0.1,0.6,0,0.9c5.1,10,14.5,16.2,24.6,16.2S47.9,38.9,53,28.9
			C53.2,28.6,53.2,28.3,53,28z M28.4,43.1c-9.2,0-17.8-5.6-22.6-14.6c4.8-9,13.4-14.6,22.6-14.6S46.2,19.4,51,28.4
			C46.2,37.5,37.6,43.1,28.4,43.1z"
    />
  </svg>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
  appType: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  fieldType: {
    type: String,
    default: 'text',
  },
});
const emit = defineEmits(['checked']);
const fieldState = ref('password');
const toggleFieldType = () => {
  fieldState.value = fieldState.value === 'password' ? 'text' : 'password';
  emit('checked', {
    field: props.field,
    type: fieldState.value,
  });
};
</script>
