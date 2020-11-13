<!--suppress JSUnresolvedVariable -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar dark>
          <!--          <nuxt-link to="/orders">BACK TO ORDERS</nuxt-link>-->
          <v-btn
            :loading="creatingInvoice"
            :disabled="
              creatingInvoice ||
              publishingInvoice ||
              payingInvoice ||
              cancelingInvoice ||
              hasInvoiceInStates(['DRAFT', 'UNPAID', 'PAID'])
            "
            @click="createInvoice"
            >Create Invoice</v-btn
          >
          <v-btn
            :loading="publishingInvoice"
            :disabled="
              creatingInvoice ||
              publishingInvoice ||
              payingInvoice ||
              cancelingInvoice ||
              !hasInvoiceInStates(['DRAFT'])
            "
            @click="publishInvoice"
            >Publish Invoice</v-btn
          >
          <v-btn
            :loading="payingInvoice"
            :disabled="
              creatingInvoice ||
              publishingInvoice ||
              payingInvoice ||
              cancelingInvoice ||
              !hasInvoiceInStates(['UNPAID'])
            "
            @click="payInvoice"
            >Pay Invoice</v-btn
          >
          <v-btn
            :loading="cancelingInvoice"
            :disabled="
              creatingInvoice ||
              publishingInvoice ||
              payingInvoice ||
              cancelingInvoice ||
              !hasInvoiceInStates(['DRAFT', 'UNPAID'])
            "
            @click="cancelInvoice"
            >Cancel Invoice</v-btn
          >
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-alert :value="actionAlert" dismissible elevation="10" type="info">
          {{ actionAlertText }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Order :order="order" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <OrderItems :order-items="orderItems" />
      </v-col>
    </v-row>
    <v-row v-for="invoice in invoices" :key="invoice.uid">
      <v-col>
        <Invoice :invoice="invoice" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import Order from '@/components/Order.vue'
import OrderItems from '@/components/OrderItems.vue'
import Invoice from '@/components/Invoice.vue'

export default {
  name: 'Id',
  components: {
    Order,
    OrderItems,
    Invoice,
  },
  async fetch({ store, params }) {
    await store.dispatch('order/fetchOne', params.id)
    await store.dispatch('orderItem/fetchMany', params.id)
    await store.dispatch('invoice/fetchMany', params.id)
    const order = store.state.order.currentOrder
    const partyUids = [order.seller_uid, order.customer_uid]
    await store.dispatch('party/fetchTokenBalances', partyUids)
    const topInvoice = _.head(store.state.invoice.invoices)
    if (topInvoice && topInvoice.state === 'PAID') {
      await store.dispatch('payment/fetchMany', topInvoice.uid)
    }
  },
  data() {
    return {
      actionAlert: false,
      actionAlertText: 'Please wait...',
      creatingInvoice: false,
      publishingInvoice: false,
      payingInvoice: false,
      cancelingInvoice: false,
    }
  },
  fetchOnServer: false,
  computed: mapState({
    order: (state) => state.order.currentOrder,
    orderItems: (state) => state.orderItem.orderItems,
    invoices: (state) => state.invoice.invoices,
  }),
  methods: {
    alertOn(text) {
      this.actionAlert = true
      this.actionAlertText = text
    },
    alertOff() {
      this.actionAlert = false
      this.actionAlertText = ''
    },
    async createInvoice() {
      if (this.findInvoiceInStates(['DRAFT', 'UNPAID', 'PAID'])) return
      this.creatingInvoice = true
      this.alertOn('Wait, invoice is being created')
      try {
        await this.$store.dispatch('invoice/create', this.order.uid)
        await this.$store.dispatch('invoice/fetchMany', this.order.uid)
      } finally {
        this.alertOff()
        this.creatingInvoice = false
      }
    },
    async publishInvoice() {
      const draftInvoice = this.findInvoiceInStates(['DRAFT'])
      if (!draftInvoice) return
      this.publishingInvoice = true
      this.alertOn('Wait, invoice is being published')
      try {
        await this.$store.dispatch('invoice/publish', draftInvoice)
        await this.fetchInvoices()
      } finally {
        this.alertOff()
        this.publishingInvoice = false
      }
    },
    async cancelInvoice() {
      const invoiceToCancel = this.findInvoiceInStates(['DRAFT', 'UNPAID'])
      if (!invoiceToCancel) return
      this.cancelingInvoice = true
      this.alertOn('Wait, invoice is being canceled')
      try {
        await this.$store.dispatch('invoice/cancel', invoiceToCancel)
        await this.fetchInvoices()
      } finally {
        this.alertOff()
        this.cancelingInvoice = false
      }
    },
    async payInvoice() {
      const unpaidInvoice = this.findInvoiceInStates(['UNPAID'])
      if (!unpaidInvoice) return
      this.payingInvoice = true
      this.alertOn('Wait, invoice is being paid')
      try {
        await this.$store.dispatch('payment/create', {
          invoiceUid: unpaidInvoice.uid,
          amount: this.order.amount,
        })
        await this.fetchPartyBalances()
        await this.fetchInvoices()
      } finally {
        this.alertOff()
        this.payingInvoice = false
      }
    },
    async fetchInvoices() {
      await this.$store.dispatch('invoice/fetchMany', this.order.uid)
    },
    async fetchPartyBalances() {
      const partyUids = [this.order.seller_uid, this.order.customer_uid]
      await this.$store.dispatch('party/fetchTokenBalances', partyUids)
    },
    findInvoiceInStates(states) {
      return this.invoices.find((invoice) => states.includes(invoice.state))
    },
    hasInvoiceInStates(states) {
      const invoice = this.findInvoiceInStates(states)
      return !_.isEmpty(invoice)
    },
  },
}
</script>

<style scoped>
/*noinspection CssUnusedSymbol*/
.nuxt-link-active {
  color: white;
  font-weight: normal;
}
</style>
