<script setup lang="ts">
import {vMaska} from "maska/vue"
interface IField {
  text?: string,
  errorText?: string,
  validate?: boolean,
  error?: boolean,
}
const field = ref(<IField>{
  text: '',
  errorText: '',
  validate: false,
  error: false,
})
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  formType: {
    type: String
  },
  regex: {
    type: RegExp
  },
  propErrorText: {
    type: String
  },
  placeholder: {
    type: String
  },
  vvMask: {
    type: String
  },
  modelValue: {
    type: Boolean
  },
  name: {
    type: String
  }
})
const regexType: RegExp = props.regex!;
const validate = ():void => {
  if (!regexType.test(field.value.text)) {
    field.value.errorText = props.propErrorText;
    field.value.validate = false;
    field.value.error = true;
  } else {
    field.value.errorText = '';
    field.value.validate = true;
    field.value.error = false;
  }
}
watch(() => field.value.validate, () => emit('update:modelValue', field.value.validate))
</script>

<template>
  <label class="form-label">
    <input v-if="vvMask" :class="{error: field.error}" class="input" v-model="field.text" @blur="validate" :type="formType" v-maska="`${vvMask}`" :name="name" :value="field.text">
    <input v-else :class="{error: field.error}" class="input" v-model="field.text" @blur="validate" :type="formType" :name="name" :value="field.text">
    <span :class="{filled: field.text.length > 0}" class="form-label-span">{{placeholder}}</span>
    <span v-if="field.errorText" class="form-error-text">{{ field.errorText }}</span>
    <span :class="{visible: field.validate}" class="form-ready"></span>
    <span :class="{visible: field.error}" class="form-error"></span>
  </label>
</template>

<style scoped>

</style>