<script setup lang="ts">
import {vMaska} from "maska/vue"

const emit = defineEmits(['closeModal'])
const props = defineProps({
  opened: {
    type: Boolean,
    required: true
  }
})

const fileAdditional = ref('')
const checkBox = ref(true)
const modal = ref(false)
const body = ref()
const date = ref('')
const readyForm = ref(false)
const vacancy = ref(false)
const name = ref(false)
const phone = ref(false)
const mail = ref(false)
const study = ref(false)
const address = ref(false)
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

const closeModalForm = () => {
  modal.value = false
  emit('closeModal')
}


const readyForSend = computed(() => {
  return fileAdditional.value && checkBox.value && vacancy.value && name.value && phone.value && mail.value && study.value && address.value
})

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
        <button @click.prevent="closeModalForm" type="button" class="btn btn-primary form-close">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.70334 5.93158L11.2647 10.1623L10.9566 10.448L6.34001 6.1661L6 5.85074L5.65999 6.1661L1.04335 10.448L0.735263 10.1623L5.29666 5.93158L5.69191 5.56499L5.29666 5.1984L0.735263 0.967705L1.04335 0.681956L5.65999 4.96388L6 5.27924L6.34001 4.96388L10.9566 0.681956L11.2647 0.967705L6.70334 5.1984L6.30809 5.56499L6.70334 5.93158Z"
                fill="white" stroke="white"/>
          </svg>
        </button>
        <FormField v-model="vacancy" form-type="text" :regex="/^[А-ЯЁ][а-яё]+$/" prop-error-text="Введите желаемую вакансию (Например: Менеджер)" placeholder="Желаемая вакансия *"/>
        <FormField v-model="name" form-type="text" :regex="/^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/" prop-error-text="Введите фамилию, имя и отчество через пробел (Например: Иванов Петр Алексеевич)" placeholder="Фамилия, имя и отчество *"/>
        <div class="feedback__wrapper">
          <FormField v-model="phone"  form-type="text" :regex="/^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/" prop-error-text="Введите верный номер телефона" placeholder="Мобильный телефон *" vv-mask="+7(###)###-##-##"/>
          <FormField v-model="mail"  form-type="email" :regex="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" prop-error-text="Введите корректный email" placeholder="E-mail"/>
        </div>
        <FormField v-model="study" form-type="text" :regex="/^[А-ЯЁ][а-яё]+$/" prop-error-text="Введите Ваше образование(Например: Высшее)" placeholder="Образование *"/>
        <FormField v-model="address"  form-type="text" :regex="/^[А-ЯЁ][а-яё]+$/" prop-error-text="Введите адрес проживания(Например: Иваново)" placeholder="Адрес места жительства *"/>
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
        <button @click.prevent="closeModalForm" type="button" class="btn btn-primary form-close">
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