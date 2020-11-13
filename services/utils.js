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
  formatMoneyAmount(amount) {
    if (!amount) {
      return 'Unknown'
    } else {
      return '$' + amount.toFixed(2)
    }
  },
  updateObjects(objects, newObjects) {
    for (const newObject of newObjects) {
      const index = objects.findIndex(
        (object) => object && object.uid === newObject.uid
      )
      if (index < 0) {
        objects.push(newObject)
      } else {
        Object.assign(objects[index], newObject)
      }
    }
  },
}
