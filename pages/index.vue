<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="7">
        <!--      <div class="text-center">-->
        <!--        <logo />-->
        <!--      </div>-->
        <Welcome />
      </v-col>
    </v-row>
    <v-row v-if="!authenticated" justify="center" align="center">
      <v-col cols="12" sm="8" md="7">
        <Login />
      </v-col>
    </v-row>
    <v-row v-if="authenticated" justify="center" align="center">
      <v-col cols="12" sm="8" md="7">
        <WelcomeAuthenticated />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import Welcome from '@/components/Welcome.vue'
import Login from '@/components/Login.vue'
import WelcomeAuthenticated from '@/components/WelcomeAuthenticated.vue'

export default {
  components: {
    // Logo,
    Welcome,
    Login,
    WelcomeAuthenticated,
  },
  computed: {
    authenticated() {
      return this.$store.state.user.user.authenticated
    },
  },
}
</script>
