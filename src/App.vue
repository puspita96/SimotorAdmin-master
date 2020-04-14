<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="check !== '/'"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <AppDrawer />
    </v-navigation-drawer>

    <v-app-bar
      v-if="check !== '/'"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="teal"
      elevation="5"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span>Simotor Admin</span>
      </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />-->
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-avatar size="32px" item>
              <v-img
                src="https://avatars0.githubusercontent.com/u/23564348?s=460&u=9c85c43d189f99309cdbd3966e97bc55eb7d94a6&v=4"
                alt="User"
              />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" @click="OnLogout">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-btn v-if="check !== '/'" bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Create contact</v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center" class="mr-0">
                <v-avatar size="40px" class="mx-3">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                </v-avatar>
                <v-text-field placeholder="Name" />
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field prepend-icon="mdi-account-card-details-outline" placeholder="Company" />
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="Job title" />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-mail" placeholder="Email" />
            </v-col>
            <v-col cols="12">
              <v-text-field type="tel" prepend-icon="mdi-phone" placeholder="(000) 000 - 0000" />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-text" placeholder="Notes" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import AppDrawer from './components/AppDrawer';
export default {
  props: {
    source: String
  },
  components: {
    AppDrawer
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [{ icon: 'mdi-logout', title: 'Logout', to: '/' }]
  }),
  methods: {
    OnLogout() {
      // console.log('logus');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');

      this.$store.commit('SET_USER', []);
      this.$store.commit('SET_TOKEN', []);
      // this.$router.push({ path: '/' });
      this.$router.go();
    }
  },
  computed: {
    check() {
      return this.$route.path;
    }
  },
  mounted() {}
};
</script>
