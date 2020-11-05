<!--suppress JSUnresolvedVariable -->
<template>
  <v-card>
    <v-card-title>Order #{{ order.ref_id }}</v-card-title>
    <v-card-subtitle>created at: {{ order.created_at }}</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="6">from: {{ order.seller_uid }}</v-col>
        <v-col cols="6">to: {{ order.customer_uid }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="12"><b>Total: $123.45</b></v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn>Create Invoice</v-btn>
      <v-btn>Send Invoice</v-btn>
      <v-btn>Cancel Invoice</v-btn>
      <v-btn>Pay Invoice</v-btn>
    </v-card-actions>
    <v-card-title>Invoice #REFID</v-card-title>
    <v-card-subtitle>for order #REFID</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <p>Status: UNPAID</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12"><b>Due Date: 05/10/2020</b></v-col>
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
}
</script>

<style scoped></style>
