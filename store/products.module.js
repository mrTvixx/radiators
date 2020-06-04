import { GET_PRODUCTS } from "./actions.type";
import {
  START_FETCH,
  END_FETCH,
  SAVE_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS,
} from "./mutations.type";
import { HTTP } from "../common/api.service";

const getFormattedList = (arr, reg) => {
  const newArr = arr.map((item) => ({
    ...item,
    name: item.name.toLowerCase().replace(reg.toLowerCase(), `<b>${reg.toLowerCase()}</b>`)
  }));

  return newArr;
}

const state = {
  list: [],
  next: null,
  previous: null,
  count: 0,
  isLoading: false,
};

const getters = {
  list(state) {
    return state.list;
  },
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
    state.next = data.next;
    state.previous = data.previous;
    state.count = data.count;
  },
  [CLEAR_SEARCH_PRODUCTS](state, data) {
    state.list = [];
    state.next = null;
    state.previous = null;
    state.count = 0;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
