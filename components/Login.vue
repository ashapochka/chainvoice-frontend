<template>
  <v-card class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="userCredentials.username"
          label="Username"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          v-model="userCredentials.password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <!-- <v-btn color="success">Register</v-btn> -->
      <v-spacer></v-spacer>
      <v-btn color="info" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userCredentials: {
        username: '',
        password: '',
      },
      showPassword: false,
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('user/login', this.userCredentials)
    },
  },
}
</script>

<style></style>
