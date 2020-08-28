<template>
  <div class="user-form">
    <h1>Форма создания клиента:</h1>
    <form @submit.prevent="onSubmit">
      <h3>Личные данные:</h3>
      <label for="lastname">Фамилия:*</label>
      <input type="text" id="lastname" v-model.trim.lazy="$v.client.lastname.$model">
      <span class="error" v-if="!$v.client.lastname.required && $v.client.$dirty">Это поле явлется обязательным!</span>
      <span class="error" v-if="!$v.client.lastname.alpha && $v.client.lastname.$dirty">Это поле может содержать только буквы!</span>
      <label for="firstname">Имя:*</label>
      <input type="text" id="firstname" v-model.trim.lazy="$v.client.firstname.$model">
      <span class="error" v-if="!$v.client.firstname.required && $v.client.firstname.$dirty">Это поле явлется обязательным!</span>
      <span class="error" v-if="!$v.client.firstname.alpha && $v.client.firstname.$dirty">Это поле может содержать только буквы!</span>
      <label for="patronymic">Отчество:</label>
      <input type="text" id="patronymic" v-model.trim="client.patronymic">
      <label for="birthdate">Дата рождения (в формате ДД-ММ-ГГГГ):*</label>
      <input type="text" id="birthdate" v-model.lazy="$v.client.birthdate.$model">
      <span class="error" v-if="!$v.client.birthdate.required && $v.client.birthdate.$dirty">Это поле явлется обязательным!</span>
      <span class="error" v-if="$v.client.birthdate.$invalid && $v.client.birthdate.$dirty">Это поле может содержать только цифры в формате ДД-ММ-ГГГГ!</span>
      <label for="phone">Номер телефона:*</label>
      <input type="text" id="phone" v-model.trim.lazy="$v.client.phone.$model">
      <span class="error" v-if="!$v.client.phone.required && $v.client.phone.$dirty">Это поле явлется обязательным!</span>
      <span class="error" v-if="$v.client.phone.$invalid && $v.client.phone.$dirty">Номер телефона должен содержать 11 цифр и начинаться с 7</span>
      <div class="selects">
        <div class="selects__item">
          <label for="gender">Пол:</label>
          <select id="gender" v-model="client.gender">
            <option disabled value=""></option>
            <option v-for="(gender, index) in genders" :key="index">{{ gender }}</option>
          </select>
        </div>
        <div class="selects__item">
          <label for="group">Группа клиентов:*</label>
          <select multiple id="group" size="3" v-model="client.group">
            <option v-for="(group, index) in groups" :key="index">{{ group }}</option>
          </select>
          <span class="error" v-if="!$v.client.group.required && $v.client.group.$dirty">Это поле явлется обязательным!</span>
        </div>
        <div class="selects__item">
          <label for="doctor">Лечащий врач:</label>
          <select id="doctor" v-model="client.doctor">
            <option disabled value=""></option>
            <option v-for="(doctor, index) in doctors" :key="index">{{ doctor }}</option>
          </select>
        </div>
      </div>
      <div class="checkbox__label">
        <label for="sms">Отправлять СМС:</label>
        <input 
          type="checkbox" 
          id="sms" 
          value="false"
          :true-value="sendSms"
          :false-value="dontSendSms"
          v-model="client.sms"
        >
      </div>
      <h3>Адрес:</h3>
      <label for="zip">Индекс:</label>
      <input type="text" id="zip" v-model="client.zip">
      <label for="country">Страна:</label>
      <input type="text" id="country" v-model="client.country">
      <label for="region">Область:</label>
      <input type="text" id="region" v-model="client.region">
      <label for="city">Город:*</label>
      <input type="text" id="city" v-model.trim.lazy="$v.client.city.$model">
      <span class="error" v-if="!$v.client.city.required && $v.client.city.$dirty">Это поле явлется обязательным!</span>
      <label for="street">Улица:</label>
      <input type="text" id="street" v-model="client.street">
      <label for="house">Дом:</label>
      <input type="text" id="house" v-model="client.house">
      <h3>Документ:</h3>
      <label for="docType">Тип документа:*</label>
      <select id="docType"  v-model="client.docType">
        <option disabled value=""></option>
        <option v-for="(doc, index) in documents" :key="index" :value="doc">{{ doc }}</option>
      </select>
      <span class="error" v-if="!$v.client.docType.required && $v.client.docType.$dirty">Это поле явлется обязательным!</span>
      <label for="serie">Серия:</label>
      <input type="text" id="serie" v-model="client.docSerie">
      <label for="number">Номер:</label>
      <input type="text" id="number" v-model="client.docNumber">
      <label for="issued">Кем выдан:</label>
      <input type="text" id="issued" v-model="client.docIssued">
      <label for="date">Дата выдачи (в формате ДД-ММ-ГГГГ):*</label>
      <input type="text" id="date" v-model.trim.lazy="$v.client.docDate.$model">
      <span class="error" v-if="!$v.client.docDate.required && $v.client.docDate.$dirty">Это поле явлется обязательным!</span>
      <span class="error" v-if="$v.client.docDate.$invalid && $v.client.docDate.$dirty">Это поле может содержать только цифры в формате ДД-ММ-ГГГГ!</span>
      <div class="bottom">
        <div>
          <div class="error" v-if="submitStatus === 'err'">Проверьте правильность заполнения формы!</div>
          <div class="bottom__message">Все поля, помеченные *, являются обязательными для заполнения!</div>
        </div>
        <button type="submit" class="btn">Добавить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, alpha, numeric } from 'vuelidate/lib/validators';

export default {
  name: 'UserForm',
  data: () => ({
    clients: [],
    newClient: {},
    genders: ['Мужской', 'Женский'],
    groups: ['VIP', 'Проблемные', 'ОМС'],
    doctors: ['Иванов', 'Захаров', 'Чернышева'],
    sendSms: 'Отправлять СМС',
    dontSendSms: 'Не отправлять СМС',
    documents: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение'],
    client: {
      lastname: '',
      firstname: '',
      patronymic: '',
      birthdate: '',
      phone: '',
      gender: '',
      group: [],
      doctor: '',
      sms: 'Не отправлять СМС',
      zip: '',
      country: '',
      region: '',
      city: '',
      street: '',
      house: '',
      docType: '',
      docSerie: '',
      docNumber: '',
      docIssued: '',
      docDate: ''
    },
    submitStatus: ''
  }),
  validations: {
    client: {
      lastname: { required, alpha },
      firstname: { required, alpha },
      birthdate: { 
        required,
        validDate: val => /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/.test(val)
      },
      phone: { 
        required,
        validPhone: val => /^7[0-9]{10}$/.test(val)
      },
      group: { required },
      city: { required },
      docType: { required },
      docDate: {
        required,
        validDate: val => /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/.test(val)
      }
    }
  },
  methods: {
    onSubmit() {
      

      if (this.$v.$invalid) {
        this.$v.$touch();
        this.submitStatus = 'err';
        return;
      } else {
        this.$v.$reset();
        this.newClient = { ...this.client };
        this.clients.push(this.newClient);
        this.submitStatus = '';
        alert(`Пользователь успешно создан!`);

        Object.keys(this.client).map(key => {
          if (key === 'group') {
            return this.client[key] = [];
          } else if (key === 'sms') {
            return this.client[key] = 'Не отправлять СМС';
          }
          return this.client[key] = '';
        });
      }
    }
  }
}
</script>

<style scoped lang="scss" scoped>
  form {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    margin-bottom: 30px;
  }

  label {
    font-size: 18px;
    margin-bottom: 5px;
  }

  input, select {
    font-size: 17px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    margin-bottom: 10px;
    padding: 10px;
    transition: border-bottom-color .3s linear;

    &:focus {
      border-bottom-color: #000;
    }
  }

  select {
    border-radius: 5px;
    background: none;
    max-width: 300px;

    box-shadow: 5px 5px 0 0 rgba(0, 0, 0, .25);
  }

  .selects {
    display: flex;
    justify-content: space-between;

    &__item {
      display: flex;
      flex-direction: column;
      width: 200px;
    }
  }

  .checkbox__label {
    max-width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .error {
    font-size: 12px;
    color: red;
    margin-bottom: 10px;
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .btn {
    font-size: 20px;
    padding: 5px 15px;
    background: none;
    outline: none;
    border: 1px solid #000;
    border-radius: 15px;
    cursor: pointer;
  }


  @media (max-width: 768px) {
    h1 {
      font-size: 25px;
    }

    .selects {
      flex-direction: column;

      &__item {
        width: 300px;
        margin-bottom: 20px;
      }
    }
  }
</style>
