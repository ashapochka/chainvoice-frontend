<template>
  <v-card>
    <v-card-title>{{ notification.type }}</v-card-title>
    <v-card-subtitle>
      Created at: <b>{{ notification.createdAt }}</b> | Origin:
      <b>{{ notification.origin }}</b>
    </v-card-subtitle>
    <v-card-text>
      <div v-if="notification.response">
        <v-subheader>Response Details</v-subheader>
        <p>
          {{ notification.response }}
        </p>
      </div>
      <div v-if="notification.error">
        <v-subheader>Error Details</v-subheader>
        <p>
          {{ notification.error }}
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    notification: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style scoped></style>
