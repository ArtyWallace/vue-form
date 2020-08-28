import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';

Vue.config.devtools = true;
Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  render: h => h(App),
}).$mount('#app');
