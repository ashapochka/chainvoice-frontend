<template>
  <v-container grid-list-md>
    <v-row v-for="(n, index) in notifications" :key="index" justify="center">
      <v-col cols="12">
        <Notification :notification="n" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import _ from 'lodash'
import Notification from '@/components/Notification.vue'
import { mapState } from 'vuex'

export default {
  name: 'NotificationList',
  components: {
    Notification,
  },
  computed: mapState({
    notifications: (state) => state.notification.notifications,
  }),
}
</script>

<style scoped></style>
