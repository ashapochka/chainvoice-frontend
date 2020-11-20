<template>
  <v-container grid-list-md>
    <v-row>
      <v-col>
        <v-toolbar dark>
          <v-btn @click="refreshOrders">Refresh Orders</v-btn>
          <v-btn :disabled="!authenticated" @click="createRandomOrder"
            >Create Random Order</v-btn
          >
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row v-for="order in orders" :key="order.uid" justify="center">
      <v-col cols="12">
        <Order :order="order" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Order from '@/components/Order.vue'
import { mapState } from 'vuex'

export default {
  name: 'OrderList',
  components: {
    Order,
  },
  async fetch({ store }) {
    await store.dispatch('order/fetchMany')
  },
  computed: mapState({
    orders: (state) => state.order.orders,
    authenticated: (state) => state.user.user.authenticated,
  }),
  methods: {
    async refreshOrders() {
      await this.$store.dispatch('order/fetchMany')
    },
    async createRandomOrder() {
      await this.$store.dispatch('order/createRandom')
    },
  },
}
</script>

<style scoped></style>
