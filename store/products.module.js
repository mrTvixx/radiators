import {
  GET_PRODUCTS,
  GET_FULL_PRODUCTS_LIST,
  GET_PRODUCT_DATA,
  SEND_ORDER,
  GET_ORDER,
  SEND_CALL,
  GET_CATALOG_LIST,
  GET_PROJECT_SETTINGS,
} from "./actions.type";
import {
  START_FETCH,
  END_FETCH,
  SAVE_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS,
  SAVE_PRODUCTS_LIST,
  CLEAR_PRODUCTS_LIST,
  SAVE_SEARCH_VALUE,
  SAVE_PRODUCT_DATA,
  CLEAR_PRODUCT_DATA,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_PRODUCT_COUNT,
  CHECK_CART_DATA,
  SAVE_ORDER_ID,
  CLEAR_ORDER_DATA,
  SAVE_ORDER_DATA,
  SAVE_FILTERS_LIST,
  CLEAR_FILTERS_LIST,
  SET_PAGINATION_PAGE,
  SAVE_MANUFACTURERS_LIST,
  SAVE_CATALOG_LIST,
} from "./mutations.type";
import { HTTP } from "../common/api.service";

const ELEMENT_PER_PAGE = 25;
const getPageCount = (count) => {
  const pages = Math.ceil(count / ELEMENT_PER_PAGE);
  if (!(count % ELEMENT_PER_PAGE)) return pages - 1;
  return pages;
};

const getFormattedList = (arr, searchValue) => {
  const newArr = arr.map((item) => ({
    ...item,
    originalName: item.name,
    name: item.name
      .toLowerCase()
      .replace(
        searchValue.toLowerCase(),
        `<b>${searchValue.toLowerCase()}</b>`
      ),
    link: `/product/${item.id}`,
  }));

  return newArr;
};

const state = {
  list: [],
  fullProductsList: [],
  next: null,
  previous: null,
  count: 0,
  searchValue: "",
  isLoading: false,
  productData: {},
  orderData: {},
  cart: [],
  orderId: null,
  filtersList: null,
  paginationPage: 1,
  manufacturers: [],
  catalogList: [],
};

const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  productData(state) {
    return state.productData;
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
  },
  cart(state) {
    return state.cart;
  },
  cartCount(state) {
    return (state.cart || []).length;
  },
  cartIds(state) {
    return (state.cart || []).map((item) => item.id);
  },
  cartTotalPrice(state) {
    if (!(state.cart || []).length) return 0;
    const totalPrice = state.cart.reduce((acc, item) => {
      const price = item.count > 4 && item.price_nds ? item.price_nds : item.final_price;
      acc += Number(price) * Number(item.count);
      return acc;
    }, 0);
    return totalPrice;
  },
  orderId(state) {
    return state.orderId;
  },
  orderData(state) {
    return state.orderData;
  },
  page(state) {
    return state.paginationPage;
  },
  manufacturers(state) {
    return state.manufacturers;
  },
  catalogList(state) {
    return state.catalogList;
  },
};

// request example
// return HTTP.get(`url`)
//   .then(({ data }) => commit(END_FETCH, data))
//   .catch(err => alert(err));

const actions = {
  async [GET_PROJECT_SETTINGS]({ commit }) {
    commit(START_FETCH);
    await HTTP.get(`/project_settings/`)
      .then(({ data }) => {
        const list = data?.manufacturers || []
        const manufacturers = []

        list.forEach((item) => {
          const newItem = { ...item }
          if (newItem.parent) return

          manufacturers.push({
            id: newItem.id,
            key: newItem.key,
            name: newItem.name,
            childrens: []
          })
        })

        list.forEach((item) => {
          const newItem = { ...item }
          if (!newItem.parent) return

          const parent = manufacturers.find((item) => item.id === newItem.parent)
          if (!parent) return

          parent.childrens.push({
            id: newItem.id,
            key: newItem.key,
            name: newItem.sub_type,
          })
        })

        commit(SAVE_MANUFACTURERS_LIST, manufacturers)
      })
      .catch((err) => alert(err));
    commit(END_FETCH);
  },
  async [GET_PRODUCTS]({ commit }, payload) {
    const { name, limit } = payload;
    if (!name) {
      commit(CLEAR_SEARCH_PRODUCTS);
      return;
    }
    commit(SAVE_SEARCH_VALUE, name)
    await HTTP.get(`/products?name=${name}&limit=${limit}`)
      .then(({ data }) => {
        commit(SAVE_SEARCH_PRODUCTS, {
          ...data,
        });
      })
      .catch((err) => alert(err));
  },
  async [SEND_CALL]({ commit }, { onSuccess, ...data}) {
    commit(START_FETCH);
    await HTTP.post(`/call/`, data)
      .then(() => onSuccess())
      .catch((err) => alert(err));
    commit(END_FETCH);
  },
  async [SEND_ORDER]({ commit, state }, payload) {
    commit(START_FETCH);
    const formData = new FormData();
    formData.append(
      "buy",
      JSON.stringify(
        state.cart.map((item) => ({
          id: item.id,
          count: item.count,
          name: item.name,
          price: item.count > 4 && item.price_nds ? Number(item.price_nds) : Number(item.final_price),
        }))
      )
    );
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    await HTTP.post(`/order/`, formData)
      .then(({ data }) => {
        commit(SAVE_ORDER_ID, data.id);
      })
      .catch((err) => alert(err));
    commit(END_FETCH);
  },
  async [GET_PRODUCT_DATA]({ commit }, payload) {
    commit(CLEAR_PRODUCT_DATA);
    commit(START_FETCH);

    await HTTP.get(`/products/${payload}`)
      .then(({ data }) => {
        commit(SAVE_PRODUCT_DATA, data);
      })
      .catch((err) => alert(err));
    commit(END_FETCH);
  },
  async [GET_ORDER]({ commit }, payload) {
    commit(CLEAR_ORDER_DATA);
    commit(START_FETCH);

    await HTTP.get(`/order/${payload}`)
      .then(({ data }) => {
        commit(SAVE_ORDER_DATA, data);
      })
      .catch((err) => alert(err));
    commit(END_FETCH);
  },
  async [GET_CATALOG_LIST]({ commit }) {
    commit(START_FETCH);
    await HTTP.get(`/catalog/`)
      .then(({ data }) => {
        commit(SAVE_CATALOG_LIST, data.results);
      })
      .catch((err) => alert(err));
    commit(END_FETCH);
  },
  async [GET_FULL_PRODUCTS_LIST]({ commit, state }, payload) {
    commit(CLEAR_PRODUCTS_LIST);
    commit(START_FETCH);
    const filters = { ...state.filtersList, ...(payload || {}) };

    const {
      productType = null,
      price = null,
      os = null,
      garant = null,
      countries = null,
      types = null,
      producers = null,
      rediatorType = null,
      height = null,
      color = null,
    } = filters;

    let url = `/products?name=${state.searchValue || ""}&limit=${ELEMENT_PER_PAGE}`;
    if (productType !== null) url += `&type=${productType}`;
    if (color) url += `&color=${color}`;
    if (rediatorType !== null) url += `&radiatorType=${rediatorType},${rediatorType === 12 ? 21 : rediatorType}`;
    if (height !== null) url += `&height=${height},${height}`;
    if (state.paginationPage > 1) url += `&offset=${(state.paginationPage - 1) * ELEMENT_PER_PAGE}`;
    if (price) url += `&price=${price.min},${price.max}`;
    if (garant) url += `&garant=${garant.min},${garant.max}`;
    if (os) url += `&os=${os.min},${os.max}`;
    if (countries && countries.length)
      url += `&countries=${countries.join(",")}`;
    if (types && types.length) url += `&types=${types.join(",")}`;
    if (producers && producers.length)
      url += `&producers=${producers.join(",")}`;
    // url += '/'
    await HTTP.get(url)
      .then(({ data }) => {
        commit(SAVE_FILTERS_LIST, filters);
        commit(SAVE_SEARCH_VALUE, name);
        commit(SAVE_PRODUCTS_LIST, {
          ...data,
        });
      })
      .catch((err) => alert(err));
    commit(END_FETCH);
  },
};

const mutations = {
  [SAVE_MANUFACTURERS_LIST](state, data) {
    state.manufacturers = data
  },
  [START_FETCH](state) {
    state.isLoading = true;
  },
  [END_FETCH](state) {
    state.isLoading = false;
  },
  [SAVE_ORDER_DATA](state, data) {
    state.orderData = data;
  },
  [CLEAR_ORDER_DATA](state) {
    state.orderData = {};
  },
  [SAVE_PRODUCT_DATA](state, data) {
    state.productData = data;
  },
  [CLEAR_PRODUCT_DATA](state) {
    state.productData = {};
  },
  [SAVE_SEARCH_PRODUCTS](state, { ...data }) {
    state.list = getFormattedList(data.results, state.searchValue);
  },
  [SAVE_SEARCH_VALUE](state, value) {
    state.searchValue = value;
  },
  [SAVE_ORDER_ID](state, id) {
    state.orderId = id;
    state.cart = [];
    localStorage.removeItem("cart");
  },
  [SAVE_PRODUCTS_LIST](state, { ...data }) {
    state.fullProductsList = data.results;
    state.next = data.next;
    state.previous = data.prev;
    state.count = data.count;
  },
  [CLEAR_SEARCH_PRODUCTS](state) {
    state.list = [];
  },
  [SAVE_FILTERS_LIST](state, data) {
    state.filtersList = data;
  },
  [CLEAR_FILTERS_LIST](state) {
    state.filtersList = null;
  },
  [CLEAR_PRODUCTS_LIST](state) {
    state.fullProductsList = [];
    state.next = null;
    state.previous = null;
    state.count = 0;
  },
  [SET_PAGINATION_PAGE](state, page) {
    state.paginationPage = page;
  },
  [ADD_TO_CART](state, product) {
    const currentCart = state.cart;
    const targetProduct = currentCart.find((item) => item.id === product.id);
    if (targetProduct) return;
    const newCart = [
      ...currentCart,
      {
        ...product,
        count: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(newCart));
    state.cart = newCart;
    state.orderId = null;
  },
  [REMOVE_FROM_CART](state, productId) {
    const currentCart = state.cart;
    const newCart = currentCart.filter((item) => item.id !== productId);

    localStorage.setItem("cart", JSON.stringify(newCart));
    state.cart = newCart;
  },
  [CHECK_CART_DATA](state) {
    const cartData = localStorage.getItem("cart");
    if (!cartData) return;
    state.cart = JSON.parse(cartData || []);
  },
  [SAVE_CATALOG_LIST](state, data) {
    state.catalogList = data;
  },
  [CHANGE_PRODUCT_COUNT](state, { id, value }) {
    const currentCart = state.cart;
    const newCart = currentCart.map((item) => {
      const newItem = { ...item };
      if (newItem.id === id) {
        newItem.count = Number(value);
      }
      return newItem;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    state.cart = newCart;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
