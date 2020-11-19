<!--suppress JSAnnotator, JSUnresolvedVariable -->
<template>
  <v-card>
    <v-card-title>Invoice #{{ invoice.ref_id }}</v-card-title>
    <v-card-subtitle>
      Status: <b>{{ invoice.state }}</b
      >, Due Date: <b>{{ new Date(invoice.due_date).toDateString() }}</b>
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-card outlined elevation="0">
            <v-subheader>Blockchain State</v-subheader>
            <v-card-text>
              <v-simple-table dense>
                <template>
                  <tbody>
                    <tr
                      v-for="(value, name) in invoice.blockchainState"
                      :key="name"
                    >
                      <td>{{ name }}</td>
                      <td>{{ value }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card outlined elevation="0">
            <v-subheader>Payment</v-subheader>
            <v-card-text>
              <v-simple-table v-if="payment" dense>
                <template>
                  <tbody>
                    <tr v-for="(value, name) in payment" :key="name">
                      <td>{{ name }}</td>
                      <td>
                        <nuxt-link
                          v-if="name === 'blockchain_tx_hash'"
                          :to="'/transactions/#' + value"
                          >{{ value }}</nuxt-link
                        ><span v-else>{{ value }}</span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <p v-else>No payment found</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Invoice',
  props: {
    invoice: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    payment() {
      return this.getPaymentForInvoice(this.invoice.uid)
    },
    ...mapGetters({
      getPaymentForInvoice: 'payment/getPaymentForInvoice',
    }),
  },
}
</script>

<style scoped></style>
