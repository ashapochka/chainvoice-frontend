<template>
  <v-container grid-list-md>
    <v-row v-for="party in parties" :key="party.uid" justify="center">
      <v-col cols="12">
        <Party :party="party" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash'
import Party from '@/components/Party.vue'
import { mapState } from 'vuex'

export default {
  name: 'PartyList',
  components: {
    Party,
  },
  async fetch({ store }) {
    await store.dispatch('party/fetchMany')
    const sellerUids = _.map(
      _.reject(store.state.party.parties, _.isEmpty),
      (party) => party.uid
    )
    await store.dispatch('party/fetchTokenBalances', sellerUids)
    await store.dispatch('catalog/fetchMany', sellerUids)
  },
  computed: mapState({
    parties: (state) => _.filter(state.party.parties, _.isObject),
  }),
}
</script>

<style scoped></style>
