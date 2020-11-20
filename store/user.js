import utils from '@/services/utils'

export const state = () => ({
  user: {
    username: null,
    authenticated: false,
    accessToken: null,
  },
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  SET_AUTHENTICATED(state, authenticated) {
    state.user.authenticated = authenticated
  },
  SET_USER(state, user) {
    state.user = user
  },
}

export const actions = {
  async login({ commit, dispatch }, { username, password }) {
    try {
      const accessToken = await this.$api.login(username, password)
      commit('SET_AUTHENTICATED', true)
      if (accessToken) {
        const response = await this.$api.getCurrentUser()
        const user = response.data
        commit('SET_USER', {
          authenticated: true,
          accessToken,
          ...user,
        })
        dispatch('party/fetchMany', {}, { root: true })
      }
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
  logout({ commit }) {
    commit('SET_USER', {
      authenticated: false,
      accessToken: null,
    })
    this.$api.setAccessToken(null)
  },
  ensureAuthentication({ getters }) {
    if (getters.isAuthenticated && getters.getAccessToken) {
      this.$api.setAccessToken(getters.getAccessToken)
    } else {
      // throw new Error('User is not authenticated yet')
      this.$api.setAccessToken(null)
    }
  },
}

export const getters = {
  isAuthenticated: (state) => {
    return state.user.authenticated
  },
  getAccessToken: (state) => {
    return state.user.accessToken
  },
}
