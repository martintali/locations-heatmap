import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBzinrvegdjuqYaL6EaQXOXgpM8yuZLM6o',
    libraries: ['places', 'visualization'],
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
