import utils from '@/services/utils'
import _ from 'lodash'

export const state = () => ({
  catalogItems: [],
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  UPDATE_CATALOG_ITEMS(state, catalogItems) {
    utils.updateObjects(state.catalogItems, catalogItems)
  },
}

export const actions = {
  async fetchMany({ commit, dispatch }, catalogUids) {
    try {
      dispatch('user/ensureAuthentication', {}, { root: true })
      const promises = catalogUids.map((catalogUid) => {
        return this.$api.getCatalogItems(catalogUid)
      })
      const results = await Promise.all(promises)
      const catalogItems = _.flatten(results.map((response) => response.data))
      commit('UPDATE_CATALOG_ITEMS', catalogItems)
    } catch (error) {
      utils.handleApiError(error, dispatch)
    }
  },
}

export const getters = {
  getByCatalog: (state) => (catalogUid) => {
    return _.filter(state.catalogItems, ['catalog_uid', catalogUid])
  },
}
