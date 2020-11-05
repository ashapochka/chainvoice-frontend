export const state = () => ({
  notifications: [],
})

let nextId = 1

// noinspection JSUnusedGlobalSymbols
export const mutations = {
  PUSH(state, notifications) {
    state.notifications.push({
      ...notifications,
      id: nextId++,
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
