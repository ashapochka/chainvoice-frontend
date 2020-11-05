export default {
  handleApiError(error, dispatch) {
    let notification
    if (error.response) {
      notification = {
        type: 'error',
        origin: 'api',
        response: {
          status: error.response.status,
          data: error.response.data,
        },
        error,
      }
    } else {
      notification = {
        type: 'error',
        origin: 'local',
        error,
      }
    }
    dispatch('notification/add', notification, { root: true })
  },
}
