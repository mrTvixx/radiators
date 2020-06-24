import { GET_PRODUCTS, GET_FULL_PRODUCTS_LIST } from "./actions.type";
import {
  START_FETCH,
  END_FETCH,
  SAVE_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS,
  SAVE_PRODUCTS_LIST,
  CLEAR_PRODUCTS_LIST,
  SAVE_SEARCH_VALUE,
} from "./mutations.type";
import { HTTP } from "../common/api.service";

const ELEMENT_PER_PAGE = 25;
const getPageCount = (count) => {
  const pages = Math.ceil(count / ELEMENT_PER_PAGE);
  if (!Boolean(count % ELEMENT_PER_PAGE)) return pages - 1;
  return pages;
}

const getFormattedList = (arr, searchValue) => {
  const newArr = arr.map((item) => ({
    ...item,
    name: item.name.toLowerCase().replace(searchValue.toLowerCase(), `<b>${searchValue.toLowerCase()}</b>`),
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
  searchValue: '',
  isLoading: false,
};

const getters = {
  isLoading(state) {
    return state.isLoading;
  }, 
  list(state) {
    return state.list;
  },
  searchValue(state) {
    return state.searchValue;
  },
  fullProductsList(state) {
    return state.fullProductsList;
  },
  pageCount(state) {
    return getPageCount(state.count);
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
          searchValue: name,
          ...data
        });
      })
      .catch(err => alert(err));
  },
  async [GET_FULL_PRODUCTS_LIST]({ commit }, payload) {
    commit(CLEAR_PRODUCTS_LIST);
    commit(START_FETCH);

    const { name = '', productType = '', page = 1 } = payload;
    let url = `/products?name=${name}&limit=${ELEMENT_PER_PAGE}`;
    if (productType) url += `&type=${productType}`;
    if (page > 1) url += `&offset=${(page - 1) * ELEMENT_PER_PAGE}`
    await HTTP.get(url)
      .then(({ data }) => {
        commit(SAVE_PRODUCTS_LIST, {
          searchValue: name,
          ...data
        });
        commit(END_FETCH);
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
  [SAVE_SEARCH_PRODUCTS](state, { searchValue, ...data }) {
    state.list = getFormattedList(data.results, searchValue);
  },
  [SAVE_SEARCH_VALUE](state, value) {
    state.searchValue = value;
  },
  [SAVE_PRODUCTS_LIST](state, { searchValue, ...data }) {
    state.fullProductsList = data.results;
    state.next = data.next;
    state.previous = data.prev;
    state.count = data.count;
    state.searchValue = searchValue;
  },
  [CLEAR_SEARCH_PRODUCTS](state) {
    state.list = [];
    state.searchValue = '';
    state.fullProductsList = [];
  },
  [CLEAR_PRODUCTS_LIST](state) {
    state.fullProductsList = [];
    state.next = null;
    state.previous = null;
    state.count = 0;
    state.searchValue = '';
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
