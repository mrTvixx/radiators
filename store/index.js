import Vue from 'vue';
import Vuex from 'vuex';

import products from './products.module';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    products,
  },
});

export default store;