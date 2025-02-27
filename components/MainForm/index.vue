<script setup lang="ts">
import {vMaska} from "maska/vue"
const body = ref()
const readyForm = ref(false)

const props = defineProps({
  opened: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['closeModal'])

const vacancy = ref({
  text: '',
  error: false,
  errorText: '',
  validate: false,
})

const nameSurname = ref({
  text: '',
  errorText: '',
  validate: false,
  error: false
})

const mail = ref({
  text: '',
  errorText: '',
  validate: false,
  error: false
})

const study = ref({
  text: '',
  errorText: '',
  validate: false,
  error: false
})

const address = ref({
  text: '',
  errorText: '',
  validate: false,
  error: false
})



const fileAdditional = ref('')
const phone = ref('+7 (')
const date = ref('')
const checkBox = ref(true)
const modal = ref(false)
const fileName = (e) => {
  if (e.target.files[0].name.length < 20) {
    fileAdditional.value = e.target.files[0].name
  } else {
    fileAdditional.value = `${e.target.files[0].name.slice(0, 20)}...${e.target.files[0].name.split('.').pop()}`
  }
}
const reset = () => {
  fileAdditional.value = ''
}

const sendForm = (e) => {
  e.target.reset()
  readyForm.value = true
}

const validateFullName = () => {
  const regex = /^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/;
  if (nameSurname.value.text.length === 0) {
    nameSurname.value.errorText = '';
    nameSurname.value.validate = false;
    nameSurname.value.error = true;
  } else if (!regex.test(nameSurname.value.text)) {
    nameSurname.value.errorText = 'Введите фамилию, имя и отчество через пробел (Например: Иванов Петр Алексеевич)';
    nameSurname.value.validate = false;
    nameSurname.value.error = true;
  } else {
    nameSurname.value.errorText = '';
    nameSurname.value.validate = true;
    nameSurname.value.error = false;
  }
}

const validateVacancy = () => {
  const regex = /^[А-ЯЁ][а-яё]+$/;
  if (vacancy.value.text.length === 0) {
    vacancy.value.errorText = '';
    vacancy.value.validate = false;
    vacancy.value.error = true;
  } else if (!regex.test(vacancy.value.text)) {
    vacancy.value.errorText = 'Введите желаемую вакансию (Например: Менеджер)';
    vacancy.value.validate = false;
    vacancy.value.error = true;
  } else {
    vacancy.value.errorText = '';
    vacancy.value.validate = true;
    vacancy.value.error = false;
  }
}

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!mail.value.text) {
    mail.value.errorText = 'Email не может быть пустым';
    mail.value.validate = false;
    mail.value.error = true;
  } else if (!emailPattern.test(mail.value.text)) {
    mail.value.errorText = 'Введите корректный email';
    mail.value.validate = false;
    mail.value.error = true;
  } else {
    mail.value.errorText = '';
    mail.value.validate = true;
    mail.value.error = false;
  }
}
const validateStudy = () => {
  const emailPattern = /^[A-Za-zА-Яа-яЁё0-9\s\-\'\.]+$/;
  if (!study.value.text) {
    study.value.errorText = 'Поле не может быть пустым';
    study.value.validate = false;
    study.value.error = true;
  } else if (!emailPattern.test(study.value.text)) {
    study.value.errorText = 'Недопустимое значение';
    study.value.validate = false;
    study.value.error = true;
  } else {
    study.value.errorText = '';
    study.value.validate = true;
    study.value.error = false;
  }
}
const validateAddress = () => {
  const emailPattern = /^[A-Za-zА-Яа-яЁё0-9\s\-\'\.]+$/;
  if (!address.value.text) {
    address.value.errorText = 'Поле не может быть пустым';
    address.value.validate = false;
    address.value.error = true;
  } else if (!emailPattern.test(address.value.text)) {
    address.value.errorText = 'Недопустимое значение';
    address.value.validate = false;
    address.value.error = true;
  } else {
    address.value.errorText = '';
    address.value.validate = true;
    address.value.error = false;
  }
}



const readyForSend = computed(() => {
  return vacancy.value.validate && nameSurname.value.validate && mail.value.validate && phone.value.length === 18 && study.value.validate && address.value.validate && fileAdditional.value && checkBox.value
})

const closeModaLForm = () => {
  modal.value = false
  emit('closeModal')
}

onMounted(() => {
  body.value = document.querySelector('body')
})

watch(() => modal.value, () => {
  modal.value ? body.value.classList.add('overflow') : body.value.classList.remove('overflow')
})

watch(() => props.opened, () => {
  props.opened ? modal.value = true : ''
})
</script>

<template>
  <div v-if="opened" class="modal">
    <div class="feedback">
      <form v-if="!readyForm" @submit.prevent="sendForm" class="feedback__form form">
        <h2 class="feedback__title">Отклик на вакансию</h2>
        <button @click.prevent="closeModaLForm" type="button" class="btn btn-primary form-close">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.70334 5.93158L11.2647 10.1623L10.9566 10.448L6.34001 6.1661L6 5.85074L5.65999 6.1661L1.04335 10.448L0.735263 10.1623L5.29666 5.93158L5.69191 5.56499L5.29666 5.1984L0.735263 0.967705L1.04335 0.681956L5.65999 4.96388L6 5.27924L6.34001 4.96388L10.9566 0.681956L11.2647 0.967705L6.70334 5.1984L6.30809 5.56499L6.70334 5.93158Z"
                fill="white" stroke="white"/>
          </svg>
        </button>
        <label class="form-label">
          <input :class="{error: vacancy.error}" class="input" v-model="vacancy.text" @input="validateVacancy" type="text">
          <span :class="{filled: vacancy.text.length > 0}" class="form-label-span">Желаемая вакансия *</span>
          <span v-if="vacancy.errorText" class="form-error-text">{{ vacancy.errorText }}</span>
          <span :class="{visible: vacancy.validate}" class="form-ready"></span>
          <span :class="{visible: vacancy.error}" class="form-error">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.2929 1.04335L6.6898 5.64645L6.33624 6L6.6898 6.35355L11.2929 10.9566L10.9566 11.2929L6.35355 6.6898L6 6.33624L5.64645 6.6898L1.04335 11.2929L0.707107 10.9566L5.3102 6.35355L5.66376 6L5.3102 5.64645L0.707107 1.04335L1.04335 0.707107L5.64645 5.3102L6 5.66376L6.35355 5.3102L10.9566 0.707107L11.2929 1.04335Z"
                    fill="#BE1A1A" stroke="#BE1A1A"/>
              </svg>
            </span>
        </label>
        <label class="form-label">
          <input :class="{error: nameSurname.error}" class="input" v-model="nameSurname.text" @input="validateFullName" type="text">
          <span :class="{filled: nameSurname.text.length > 0}"
                class="form-label-span">Фамилия, имя и отчество *</span>
          <span v-if="nameSurname.errorText" class="form-error-text">{{ nameSurname.errorText }}</span>
          <span :class="{visible: nameSurname.validate}" class="form-ready"></span>
          <span :class="{visible: nameSurname.error}" class="form-error">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.2929 1.04335L6.6898 5.64645L6.33624 6L6.6898 6.35355L11.2929 10.9566L10.9566 11.2929L6.35355 6.6898L6 6.33624L5.64645 6.6898L1.04335 11.2929L0.707107 10.9566L5.3102 6.35355L5.66376 6L5.3102 5.64645L0.707107 1.04335L1.04335 0.707107L5.64645 5.3102L6 5.66376L6.35355 5.3102L10.9566 0.707107L11.2929 1.04335Z"
                    fill="#BE1A1A" stroke="#BE1A1A"/>
              </svg>
            </span>
        </label>
        <div class="feedback__wrapper">
          <label class="form-label">
            <input :class="{error: phone.length < 18 && phone.length > 4}" class="input" v-model="phone" type="tel" v-maska="'+7 (###) ### ## ##'">
            <span :class="{filled: phone.length > 0}" class="form-label-span">Мобильный телефон *</span>
            <span :class="{visible: phone.length === 18}" class="form-ready"></span>
            <span :class="{visible: phone.length < 18 && phone.length > 4}" class="form-error">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.2929 1.04335L6.6898 5.64645L6.33624 6L6.6898 6.35355L11.2929 10.9566L10.9566 11.2929L6.35355 6.6898L6 6.33624L5.64645 6.6898L1.04335 11.2929L0.707107 10.9566L5.3102 6.35355L5.66376 6L5.3102 5.64645L0.707107 1.04335L1.04335 0.707107L5.64645 5.3102L6 5.66376L6.35355 5.3102L10.9566 0.707107L11.2929 1.04335Z"
                    fill="#BE1A1A" stroke="#BE1A1A"/>
              </svg>
            </span>
          </label>
          <label class="form-label">
            <input :class="{error: mail.error}" class="input" v-model="mail.text" @blur="validateEmail" type="email">
            <span :class="{filled: mail.text.length > 0}" class="form-label-span">E-mail *</span>
            <span v-if="mail.errorText" class="form-error-text">{{ mail.errorText }}</span>
            <span :class="{visible: mail.validate}" class="form-ready"></span>
            <span :class="{visible: mail.error}"  class="form-error">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.2929 1.04335L6.6898 5.64645L6.33624 6L6.6898 6.35355L11.2929 10.9566L10.9566 11.2929L6.35355 6.6898L6 6.33624L5.64645 6.6898L1.04335 11.2929L0.707107 10.9566L5.3102 6.35355L5.66376 6L5.3102 5.64645L0.707107 1.04335L1.04335 0.707107L5.64645 5.3102L6 5.66376L6.35355 5.3102L10.9566 0.707107L11.2929 1.04335Z"
                    fill="#BE1A1A" stroke="#BE1A1A"/>
              </svg>
            </span>
          </label>
        </div>
        <label class="form-label">
          <input :class="{error: study.error}"  class="input" @input="validateStudy" v-model="study.text" type="text">
          <span :class="{filled: study.text.length > 0}" class="form-label-span">Образование *</span>
          <span v-if="study.errorText" class="form-error-text">{{ study.errorText }}</span>
          <span :class="{visible: study.validate}" class="form-ready"></span>
          <span :class="{visible: study.error}"  class="form-error">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.2929 1.04335L6.6898 5.64645L6.33624 6L6.6898 6.35355L11.2929 10.9566L10.9566 11.2929L6.35355 6.6898L6 6.33624L5.64645 6.6898L1.04335 11.2929L0.707107 10.9566L5.3102 6.35355L5.66376 6L5.3102 5.64645L0.707107 1.04335L1.04335 0.707107L5.64645 5.3102L6 5.66376L6.35355 5.3102L10.9566 0.707107L11.2929 1.04335Z"
                    fill="#BE1A1A" stroke="#BE1A1A"/>
              </svg>
            </span>
        </label>
        <label class="form-label">
          <input :class="{error: address.error}"  class="input" @input="validateAddress" v-model="address.text" type="text">
          <span :class="{filled: address.text.length > 0}" class="form-label-span">Адрес места жительства *</span>
          <span v-if="address.errorText" class="form-error-text">{{ study.errorText }}</span>
          <span :class="{visible: address.validate}" class="form-ready"></span>
          <span :class="{visible: address.error}"  class="form-error">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.2929 1.04335L6.6898 5.64645L6.33624 6L6.6898 6.35355L11.2929 10.9566L10.9566 11.2929L6.35355 6.6898L6 6.33624L5.64645 6.6898L1.04335 11.2929L0.707107 10.9566L5.3102 6.35355L5.66376 6L5.3102 5.64645L0.707107 1.04335L1.04335 0.707107L5.64645 5.3102L6 5.66376L6.35355 5.3102L10.9566 0.707107L11.2929 1.04335Z"
                    fill="#BE1A1A" stroke="#BE1A1A"/>
              </svg>
            </span>
        </label>
        <div class="feedback__wrapper">
          <label class="form-label">
            <input class="input" v-model="date" type="tel" v-maska="'##/##/####'">
            <span :class="{filled: date.length > 0}" class="form-label-span">Дата рождения</span>
          </label>
          <label class="form-label label">
            <span v-if="!fileAdditional">Загрузить резюме</span>
            <span v-else class="text-dark form-short">{{ fileAdditional }}
              <svg v-if="fileAdditional" @click.prevent="reset" width="10" height="11" viewBox="0 0 10 11" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.84101 2.82349H0.161785C012.0725243 2.82349 0 2.88088 0 2.95151V3.65784C0 3.72847 0.0725243 3.78586 0.161785 3.78586H1.01255L1.67643 9.99936C1.72664 10.4717 2.22594 10.8337 2.82287 10.8337H7.30544C7.91074 10.8337 8.41283 10.4629 8.45467 9.9839L8.98745 3.78586H9.83821C9.92748 3.78586 10 3.72847 10 3.65784V2.95151C10 2.87867 9.92748 2.82349 9.84101 2.82349Z"
                    fill="#E9862A"/>
                <path
                    d="M9.84101 1.31775H6.68898C6.68898 1.30671 6.69177 1.29347 6.69177 1.28243V0.896156C6.69177 0.401725 6.1841 0 5.55928 0H4.44351C3.81869 0 3.31102 0.401725 3.31102 0.896156V1.28243C3.31102 1.29347 3.31381 1.30671 3.31381 1.31775H2.33194H0.161785C0.0725243 1.31775 0 1.37514 0 1.44577V2.1521C0 2.22273 0.0725243 2.28012 0.161785 2.28012H9.83821C9.92748 2.28012 10 2.22273 10 2.1521V1.44577C10 1.37293 9.92748 1.31775 9.84101 1.31775ZM4.27336 0.896156C4.27336 0.821109 4.35146 0.759305 4.4463 0.759305H5.55928C5.65412 0.759305 5.73222 0.821109 5.73222 0.896156V1.28243C5.73222 1.29567 5.72664 1.30671 5.72385 1.31775H4.28452C4.28173 1.30671 4.27615 1.29567 4.27615 1.28243V0.896156H4.27336Z"
                    fill="#E9862A"/>
              </svg>
              </span>
            <input class="hidden" @change="fileName" type="file" required placeholder="резюме">
          </label>
        </div>
        <textarea name="comment" rows="5" placeholder="Комментарий"></textarea>
        <div class="feedback__footer">
          <label class="checkbox-wrapper-42">
            <input id="cbx-42" v-model="checkBox" type="checkbox"/>
            <label class="cbx" for="cbx-42"></label>
            <label class="lbl" for="cbx-42">Я принимаю условия <span class="text-blue">передачи информации</span>
            </label>
          </label>
          <button :disabled="!readyForSend" class="btn btn-primary">Отправить</button>
        </div>


      </form>
      <form v-else class="feedback__form form">
        <button @click.prevent="closeModaLForm" type="button" class="btn btn-primary form-close">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.70334 5.93158L11.2647 10.1623L10.9566 10.448L6.34001 6.1661L6 5.85074L5.65999 6.1661L1.04335 10.448L0.735263 10.1623L5.29666 5.93158L5.69191 5.56499L5.29666 5.1984L0.735263 0.967705L1.04335 0.681956L5.65999 4.96388L6 5.27924L6.34001 4.96388L10.9566 0.681956L11.2647 0.967705L6.70334 5.1984L6.30809 5.56499L6.70334 5.93158Z"
                fill="white" stroke="white"/>
          </svg>
        </button>
        <h2 class="feedback__thx">Спасибо! Ваша заявка отправлена</h2>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>