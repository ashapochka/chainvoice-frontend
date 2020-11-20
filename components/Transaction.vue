<!--suppress JSUnresolvedVariable -->
<template>
  <v-card>
    <v-card-title> TX {{ tx['hash'] }} </v-card-title>
    <v-card-subtitle>
      Block:
      <b>{{ tx.block_number }}</b> | Index:
      <b>{{ tx.index_in_block }}</b>
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="6"
          >from: <b>{{ tx.from_address }}</b></v-col
        >
        <v-col cols="6"
          >to: <b>{{ tx.to_address }}</b></v-col
        >
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-subheader
            ><b>Transaction Input (Smart Contract Call)</b></v-subheader
          >
          <p>
            address: <b>{{ tx.input.address }}</b> | contract:
            <b>{{ tx.input.contract }}</b>
          </p>
          <p>
            function:
            <b>{{ tx.input.function }}</b>
          </p>
          <p>args:</p>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr v-for="(value, name) in tx.input.args" :key="name">
                  <td>{{ name }}</td>
                  <td>{{ value }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-subheader><b>Events:</b></v-subheader>
          <v-simple-table
            v-for="event in tx.events"
            :key="event.log_index"
            dense
          >
            <template>
              <tbody>
                <tr v-for="(value, name) in event" :key="name">
                  <td>{{ name }}</td>
                  <td>{{ value }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>

      <!--      <template>-->
      <!--        <v-treeview-->
      <!--          :items="catalogs"-->
      <!--          :load-children="fetchCatalogItems"-->
      <!--          item-key="uid"-->
      <!--          dense-->
      <!--          open-on-click-->
      <!--        >-->
      <!--          <template v-slot:prepend="{ item }">-->
      <!--            <v-icon v-if="item.children">mdi-book-open-page-variant</v-icon>-->
      <!--            <v-icon v-else>mdi-package-variant-closed</v-icon>-->
      <!--          </template>-->
      <!--          <template v-slot:append="{ item }">-->
      <!--            <span v-if="item.price">{{ formatAmount(item.price) }}</span>-->
      <!--          </template>-->
      <!--        </v-treeview>-->
      <!--      </template>-->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Transaction',
  props: {
    tx: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
