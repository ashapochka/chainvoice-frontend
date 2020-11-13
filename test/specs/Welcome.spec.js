import test from 'ava'
import { mount } from '@vue/test-utils'
import Welcome from '@/components/Welcome.vue'

test('is a Vue instance', (t) => {
  const wrapper = mount(Welcome)
  t.truthy(wrapper.vm)
})
