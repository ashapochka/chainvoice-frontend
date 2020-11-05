<template>
  <v-container grid-list-md>
    <v-row>
      <v-col>
        <v-toolbar dark>
          <v-btn @click="refreshOrders">Refresh Orders</v-btn>
          <v-btn @click="createRandomOrder">Create Random Order</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row v-for="order in orders" :key="order.uid" justify="center">
      <v-col cols="8">
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
