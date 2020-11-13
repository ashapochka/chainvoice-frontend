import { ApiClient } from '@/services/ApiService'

export default function ({ $axios }, inject) {
  const api = new ApiClient($axios)

  // Inject to context as $api
  inject('api', api)
}
