<!--suppress JSUnresolvedVariable -->
<template>
  <v-card>
    <v-card-title> {{ party.name }} </v-card-title>
    <v-card-subtitle>
      Owns Tokens:
      <b>{{ party.token_amount }}</b> | Blockchain Account Address:
      <b>{{ party.blockchain_account_address }}</b>
    </v-card-subtitle>
    <v-subheader v-if="catalogs.length">Seller's Catalogs</v-subheader>
    <v-card-text>
      <template>
        <v-treeview
          :items="catalogs"
          :load-children="fetchCatalogItems"
          item-key="uid"
          dense
          open-on-click
        >
          <template v-slot:prepend="{ item }">
            <v-icon v-if="item.children">mdi-book-open-page-variant</v-icon>
            <v-icon v-else>mdi-package-variant-closed</v-icon>
          </template>
          <template v-slot:append="{ item }">
            <span v-if="item.price">{{ formatAmount(item.price) }}</span>
          </template>
        </v-treeview>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import _ from 'lodash'
import utils from '@/services/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'Party',
  props: {
    party: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    catalogs() {
      return _.map(this.getBySeller(this.party.uid), (catalog) => ({
        name: catalog.name,
        uid: catalog.uid,
        children: this.getByCatalog(catalog.uid),
      }))
    },
    ...mapGetters({
      getBySeller: 'catalog/getBySeller',
      getByCatalog: 'catalogItem/getByCatalog',
    }),
  },
  methods: {
    formatAmount(amount) {
      return utils.formatMoneyAmount(amount)
    },
    async fetchCatalogItems(item) {
      await this.$store.dispatch('catalogItem/fetchMany', [item.uid])
      const catalogItems = this.getByCatalog(item.uid)
      item.children = catalogItems
    },
  },
}
</script>

<style scoped></style>
