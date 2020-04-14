<template>
  <div>
    <v-row>
      <v-col v-for="item in units" :key="item.id" cols="12" md="3">
        <v-card elevation="7" class="mx-auto">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ item.nama }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.nama_ho }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text
                v-text="item.id"
              ></v-list-item-action-text>
              <v-list-item-action-text v-if="item.id_mst_user_type == 2"
                ><span style="color: red">
                  {{ item.user_type }}</span
                ></v-list-item-action-text
              >
              <v-list-item-action-text v-else
                ><span style="color: teal">
                  {{ item.user_type }}</span
                ></v-list-item-action-text
              >
            </v-list-item-action>
          </v-list-item>

          <v-img
            v-if="item.photo != null"
            :src="$url_img + item.photo"
            height="194"
          ></v-img>
          <v-img
            v-else
            src="https://img.icons8.com/clouds/2x/user.png"
            height="194"
          ></v-img>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle
                >Hp : {{ item.nomor_hp }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >Email : {{ item.email }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >Kota : {{ item.kota }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >Status : {{ item.user_status }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >Join : {{ item.created_at }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <!-- <v-btn text color="deep-purple accent-4">
                Bookmark
              </v-btn> -->
            <v-spacer></v-spacer>
            <v-btn text @click="onAddHo(item.id)">
              HO
            </v-btn>
            <v-btn text @click="onAddMOU(item.id)">
              MOU
            </v-btn>
            <v-btn text @click="onDetail(item.id)">
              Detail
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ListUser',
  props: {
    units: Array,

    onDetail: Function,
    onAddHo: Function,
    onAddMOU: Function
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
