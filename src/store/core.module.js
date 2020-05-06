import { GET_DATA } from "./actions.type";
import { START_FETCH, END_FETCH } from "./mutations.type";
import { HTTP } from "@/common/api.service";

const state = {
  test: '',
  isLoading: false,
};

const getters = {
  test(state) {
    return state.test;
  },
};

// request example
// return HTTP.get(`url`)
//   .then(({ data }) => commit(END_FETCH, data))
//   .catch(err => alert(err));

const actions = {
  [GET_DATA]({ commit }) {
    commit(END_FETCH)
  }
};

const mutations = {
  [START_FETCH](state) {
    state.isLoading = true;
  },
  [END_FETCH](state) {
    state.isLoading = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
