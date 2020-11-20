<template>
  <v-container grid-list-md>
    <v-row
      v-for="tx in transactions"
      :id="tx['hash']"
      :key="tx['hash']"
      justify="center"
    >
      <v-col cols="12">
        <Transaction :tx="tx" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import _ from 'lodash'
import Transaction from '@/components/Transaction.vue'
import { mapState } from 'vuex'

export default {
  name: 'TransactionList',
  components: {
    Transaction,
  },
  async fetch({ store }) {
    await store.dispatch('tx/fetchMany')
  },
  computed: mapState({
    transactions: (state) => state.tx.transactions,
  }),
}
</script>

<style scoped></style>
