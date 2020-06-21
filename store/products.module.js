import { GET_PRODUCTS, GET_FULL_PRODUCTS_LIST } from "./actions.type";
import {
  START_FETCH,
  END_FETCH,
  SAVE_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS,
  SAVE_PRODUCTS_LIST,
  CLEAR_PRODUCTS_LIST,
} from "./mutations.type";
import { HTTP } from "../common/api.service";

const getFormattedList = (arr, reg) => {
  const newArr = arr.map((item) => ({
    ...item,
    name: item.name.toLowerCase().replace(reg.toLowerCase(), `<b>${reg.toLowerCase()}</b>`),
    link: `/product/${item.id}`
  }));

  return newArr;
}

const state = {
  list: [],
  fullProductsList: [],
  next: null,
  previous: null,
  count: 0,
  reg: '',
  isLoading: false,
};

const getters = {
  list(state) {
    return state.list;
  },
  reg(state) {
    return state.reg;
  },
  fullProductsList(state) {
    return state.fullProductsList;
  }
};

// request example
// return HTTP.get(`url`)
//   .then(({ data }) => commit(END_FETCH, data))
//   .catch(err => alert(err));

const actions = {
  async [GET_PRODUCTS]({ commit }, payload) {
    const { name, limit } = payload;
    if (!name) {
      commit(CLEAR_SEARCH_PRODUCTS);
      return;
    }
    await HTTP.get(`/products?name=${name}&limit=${limit}`)
      .then(({ data }) => {
        commit(SAVE_SEARCH_PRODUCTS, {
          reg: name,
          ...data
        });
      })
      .catch(err => alert(err));
  },
  async [GET_FULL_PRODUCTS_LIST]({ commit }, payload) {
    const { name, productType } = payload;
    await HTTP.get(`/products?name=${name}&type=${productType}`)
      .then(({ data }) => {
        commit(SAVE_PRODUCTS_LIST, {
          reg: name,
          ...data
        });
      })
      .catch(err => alert(err));
  }
};

const mutations = {
  [START_FETCH](state) {
    state.isLoading = true;
  },
  [END_FETCH](state) {
    state.isLoading = false;
  },
  [SAVE_SEARCH_PRODUCTS](state, { reg, ...data }) {
    state.list = getFormattedList(data.results, reg);
  },
  [SAVE_PRODUCTS_LIST](state, { reg, ...data }) {
    state.fullProductsList = data.results;
    state.next = data.next;
    state.previous = data.prev;
    state.count = data.count;
    state.reg = reg;
  },
  [CLEAR_SEARCH_PRODUCTS](state) {
    state.list = [];
    state.reg = '';
  },
  [CLEAR_PRODUCTS_LIST](state) {
    state.fullProductsList = [];
    state.next = null;
    state.previous = null;
    state.count = 0;
    state.reg = '';
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
