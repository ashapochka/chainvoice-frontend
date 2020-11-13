<template>
  <v-card>
    <v-card-title class="headline">Welcome, {{ userTitle }}</v-card-title>
    <v-card-text>
      <p>
        You can proceed to the <NuxtLink to="/parties">parties</NuxtLink> or to
        the <NuxtLink to="/orders">list of orders</NuxtLink> now.
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="logout">Logout</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'WelcomeAuthenticated',
  computed: {
    userTitle() {
      const user = this.$store.state.user.user
      return `${user.name}(${user.username})`
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    },
  },
}
</script>

<style scoped></style>
