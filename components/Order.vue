<!--suppress JSUnresolvedVariable -->
<template>
  <v-card>
    <v-card-title>
      <nuxt-link :to="'/orders/' + order.uid">
        Order #{{ order.ref_id }}
      </nuxt-link>
    </v-card-title>
    <v-card-subtitle>
      Created at:
      <b>{{ new Date(order.created_at).toUTCString() }}</b>
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <p>
            seller: <b>{{ order.seller_name }}</b>
          </p>
          <p>
            owns tokens: <b>{{ sellerBalance }}</b>
          </p>
        </v-col>
        <v-col cols="3">
          <p>
            customer: <b>{{ order.customer_name }}</b>
          </p>
          <p>
            owns tokens: <b>{{ customerBalance }}</b>
          </p>
        </v-col>
        <v-col cols="3">
          for total of: <b>{{ formatAmount(order.amount) }}</b>
        </v-col>
        <v-col cols="3">
          invoiced: <b>{{ order.invoiced || false }}</b>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import utils from '@/services/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'Order',
  props: {
    order: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      getParty: 'party/getParty',
    }),
    sellerBalance() {
      return this.getPartyTokenAmount(this.order.seller_uid)
    },
    customerBalance() {
      return this.getPartyTokenAmount(this.order.customer_uid)
    },
  },
  methods: {
    formatAmount(amount) {
      return utils.formatMoneyAmount(amount)
    },
    getPartyTokenAmount(partyUid) {
      const party = this.getParty(partyUid)
      if (party) {
        if (party.token_amount) {
          return party.token_amount
        } else {
          return NaN
        }
      } else {
        return NaN
      }
    },
  },
}
</script>

<style scoped></style>
