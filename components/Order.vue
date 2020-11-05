<!--suppress JSUnresolvedVariable -->
<template>
  <v-card>
    <v-card-title>
      <nuxt-link :to="'/orders/' + order.uid">
        Order #{{ order.ref_id }}
      </nuxt-link>
    </v-card-title>
    <v-card-subtitle>
      created at:
      {{ new Date(order.created_at).toUTCString() }}
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="6">from: {{ order.seller_name }}</v-col>
        <v-col cols="6">to: {{ order.customer_name }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <b>Total: {{ formatAmount(order.amount) }}</b>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Order',
  props: {
    order: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    formatAmount(amount) {
      if (!amount) {
        return 'Unknown'
      } else {
        return '$' + amount.toFixed(2)
      }
    },
  },
}
</script>

<style scoped></style>
