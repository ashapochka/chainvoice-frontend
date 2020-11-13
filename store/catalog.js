import ApiService from '@/services/ApiService'
import utils from '@/services/utils'
import _ from 'lodash'

export const state = () => ({
  catalogs: [],
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  UPDATE_CATALOGS(state, catalogs) {
    utils.updateObjects(state.catalogs, catalogs)
  },
}

export const actions = {
  async fetchMany({ commit, dispatch }, sellerUids) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const promises = sellerUids.map((sellerUid) => {
        return ApiService.getCatalogs(sellerUid)
      })
      const results = await Promise.all(promises)
      const catalogs = _.flatten(results.map((response) => response.data))
      commit('UPDATE_CATALOGS', catalogs)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
}

export const getters = {
  getBySeller: (state) => (sellerUid) => {
    return _.filter(state.catalogs, ['seller_uid', sellerUid])
  },
}
