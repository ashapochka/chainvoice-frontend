<!--suppress JSUnresolvedVariable -->
<template>
  <v-card>
    <v-card-title>{{ itemCount(orderItems) }} Order Items</v-card-title>
    <v-card-text>
      <v-simple-table fixed-header height="200px" dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Quantity</th>
              <th class="text-left">Base Price</th>
              <th class="text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderItems" :key="item.uid">
              <td>{{ item.catalog_item_name }}</td>
              <td class="text-right">{{ item.quantity }}</td>
              <td class="text-right">{{ formatAmount(item.base_price) }}</td>
              <td class="text-right">
                {{ formatAmount(item.quantity * item.base_price) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import utils from '~/services/utils'

export default {
  name: 'OrderItems',
  props: {
    orderItems: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatAmount(amount) {
      return utils.formatMoneyAmount(amount)
    },
    itemCount(items) {
      return items.reduce((acc, cur) => acc + cur.quantity, 0)
    },
  },
}
</script>

<style scoped></style>
