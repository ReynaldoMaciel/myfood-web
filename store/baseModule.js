const state = () => ({
  baseState: {}
})

// Retorno de dados
// const getters = {
//   baseGetter: state => {}
// }

// Mutação, alteração de dados
const mutations = {
  RESET_BASE_STATE(state) {
    state.baseState = {}
  },
  ADD_ATTRIBUTE(state, payload) {
    state.baseState[payload] = ''
  },
  ADD_ATTRIBUTES(state, payload) {
    state.baseState = payload
  },
  UPDATE_ATTRIBUTE(state, payload) {
    state.baseState[payload.key] = payload.value ? payload.value : ''
  },
  UPDATE_ATTRIBUTES(state, payload) {
    state.baseState = {
      ...state.baseState,
      ...payload
    }
  }
}

const actions = {
  addAttribute({ commit }, payload) {
    commit('ADD_ATTRIBUTE', payload)
  },
  addAttributes({ commit }, payload) {
    commit('ADD_ATTRIBUTES', payload)
  },
  updateAttribute({ commit }, payload) {
    commit('UPDATE_ATTRIBUTE', payload)
  },
  updateAttributes({ commit }, payload) {
    commit('UPDATE_ATTRIBUTES', payload)
  },
  resetState({ commit, state }) {
    commit('RESET_BASE_STATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
