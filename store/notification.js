export const state = () => ({
  notifications: [],
})

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  PUSH(state, notifications) {
    state.notifications.unshift({
      ...notifications,
      id: state.notifications.length,
      createdAt: new Date(),
    })
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== notificationToRemove.id
    )
  },
}

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  },
}
