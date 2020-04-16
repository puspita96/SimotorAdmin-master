<template>
  <v-list dense>
    <template v-for="item in menus">
      <v-row v-if="item.heading" :key="item.heading" align="center">
        <v-col cols="6">
          <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
        </v-col>
        <v-col cols="6" class="text-center">
          <a href="#!" class="body-2 black--text">EDIT</a>
        </v-col>
      </v-row>
      <v-list-group
        v-else-if="item.children"
        :key="item.title"
        v-model="item.model"
        :prepend-icon="item.model ? item.icon : item['icon-alt']"
        append-icon
        link
        :to="item.title"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-for="child in item.children" :key="child.title" link :to="child.title">
          <v-list-item-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ child.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item v-else :key="item.title" link :to="item.title">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>
<script>
// import axios from "axios";
export default {
  data: () => ({
    // menus: [],
    menus: [
      { icon: 'mdi-home', text: 'Dashboard', title: 'dashboard' },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Tiket',
        model: true,
        children: [
          {
            icon: 'mdi-cash-usd',
            text: 'Pembelian Tiket',
            title: 'pembelian_tiket'
          },
          {
            icon: 'mdi-history',
            text: 'Pengembalian Tiket',
            title: 'pengembalian_tiket'
          }
        ]
      },
      { icon: 'mdi-motorbike', text: 'Moderasi', title: 'moderasi' },
      { icon: 'mdi-account', text: 'User', title: 'user' }

      // { icon: "mdi-settings", text: "Settings" },
      // { icon: "mdi-message", text: "Send feedback" },
      // { icon: "mdi-help-circle", text: "Help" },
      // { icon: "mdi-cellphone-link", text: "App downloads" },
      // { icon: "mdi-keyboard", text: "Go to the old version" }
    ]
  })
  // async beforeCreate() {
  //   try {
  //     const response = await axios.get(
  //       "http://devlmu.com:45/service/vue_menus_privileges",
  //       {
  //         params: {
  //           id_cms_privileges: 4
  //         }
  //       }
  //     );

  //     this.menus = response.data.data;
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
};
</script>
