<template>
  <v-card>
    <v-snackbar v-model="snackbar" :color="color.snackbar" top="top">
      {{ message }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog.Edit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span>Edit User</span>
        </v-card-title>
        <v-card-subtitle>{{ DetailMitra.nama }}</v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="ComUserNama" label="Nama User"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="DetailMitra.nomor_hp" label="*No. Handphone" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="ComUserWA" label="*No. Whatsapp"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="ComUserDesc" label="Deskripsi"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  :items="UserStatus"
                  label="Status"
                  v-model="ComUserStatus"
                  item-text="status"
                  item-value="id"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  disabled
                  :items="UserType"
                  label="type"
                  v-model="ComUserType"
                  item-text="type"
                  item-value="id"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" dark @click="dialog.Edit = false">Close</v-btn>
          <v-btn color="blue darken-1" dark @click="UpdateMitra">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.AddHO" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span>Head Office Form</span>
        </v-card-title>
        <v-card-subtitle>{{ DetailMitra.nama }}</v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- <v-col v-if="DetailMitra.nama_ho" cols="12" sm="6">
                <v-switch
                  v-model="addHO"
                  class="ma-2"
                  label="Head Office"
                ></v-switch>
              </v-col>-->
              <v-col cols="12">
                <v-text-field
                  v-if="DetailMitra.nama_ho"
                  disabled
                  v-model="DetailMitra.nama_ho"
                  item-text="nama"
                  item-value="id"
                ></v-text-field>
                <v-autocomplete
                  v-else
                  :items="ListHO.data"
                  v-model="selected_HO"
                  label="*Pilih Head Office"
                  item-text="nama"
                  item-value="id"
                  required
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog.AddHO = false">Close</v-btn>

          <v-btn
            color="red darken-1"
            dark
            v-if="DetailMitra.nama_ho"
            text
            @click="DeleteHO"
          >Hapus HO</v-btn>
          <v-btn color="blue darken-1" dark v-else text @click="JoinHO">Tambah HO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.AddMOU" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span>MOU Form</span>
        </v-card-title>
        <v-card-subtitle>{{ DetailMitra.nama }}</v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :items="UserType"
                  v-model="ComUserType"
                  label="*Pilih Type User"
                  item-text="type"
                  item-value="id"
                  required
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog.AddMOU = false">Close</v-btn>

          <v-btn color="blue darken-1" text @click="UpdateMou">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          solo
          label="Search"
          clearable
          prepend-inner-icon="search"
          @keyup.enter="GetListMitra"
          @click:clear="doClear"
          v-model="keyword"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          :items="UserType"
          v-model="Selected_UserType"
          item-text="type"
          item-value="id"
          label="Filter Type User"
          v-on:change="handleClickStatus()"
          solo
        ></v-select>
      </v-col>
    </v-row>

    <ListUser
      v-if="RenderUnits"
      :units="ListMitra.data"
      :onDetail="GetDetailMitra"
      :onAddHo="GetAddHo"
      :onAddMOU="GetUserTypeMitra"
    />
    <div class="text-center pt-2">
      <v-pagination v-model="page" @input="GetListMitra()" :length="lengthPage" :total-visible="7"></v-pagination>
    </div>
  </v-card>
</template>
<script>
import ListUser from '@/components/ListUser.vue';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import Vue from 'vue';
Vue.use(Viewer);
export default {
  components: {
    ListUser
  },
  data() {
    return {
      response: null,
      RenderUnits: true,
      color: { snackbar: '' },
      snackbar: false,
      selected_HO: null,
      Selected_UserType: null,
      message: null,
      UserStatus: [],
      UserType: [],
      addHO: false,
      dialog: { Edit: false, AddHO: false, AddMOU: false },

      units: [],
      ListMitra: [],
      ListHO: [],
      MitraInfo: [],
      keyword: '',
      page: 1,
      lengthPage: 0,
      limit: 16,
      offset: 0,
      total: 0,
      users: []
    };
  },
  mounted() {
    this.GetUserStatus();
    this.GetUserType();
    this.GetListHO(3);
  },
  created() {
    let users = sessionStorage.getItem('user');
    this.users = JSON.parse(users);
    this.GetListMitra();
  },
  methods: {
    async handleClickStatus() {
      await this.GetListMitra(this.Selected_UserType);
      this.forceRerender();
    },
    forceRerender() {
      this.RenderUnits = false;
      this.$nextTick(() => {
        this.RenderUnits = true;
      });
    },
    async Reload() {
      this.GetListMitra();
      this.forceRerender();
    },
    doClear() {
      var params = new URLSearchParams();
      // params.append('id_app_user', this.user[0].id);
      params.append('search', '');
      params.append('limit', 999);

      var request = {
        params: params
      };

      this.$req
        .get('api/user/v1/user', request)
        .then(response => {
          let { data } = response.data;
          this.ListMitra = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },

    go() {
      var offset = (this.offset = (this.page - 1) * this.limit);
      console.log(offset);
    },
    async GetListMitra() {
      var offset = (this.offset = (this.page - 1) * this.limit);

      await this.$req
        .get('api/user/v1/user', {
          params: {
            id_mst_user_type: this.Selected_UserType,
            search: this.keyword,
            offset: offset,
            limit: this.limit
          }
        })
        .then(response => {
          this.ListMitra = response.data;
          var mod = this.ListMitra.count % this.limit;
          this.lengthPage = (this.ListMitra.count - mod) / this.limit - 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async GetListHO(id_mst_user_type) {
      await this.$req
        .get('api/user/v1/user', {
          params: {
            limit: this.limit,
            id_mst_user_type: id_mst_user_type
          }
        })
        .then(response => {
          this.ListHO = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async GetDetailMitra(id) {
      const mitra = await this.$req.get('api/user/v1/user', {
        params: {
          id: id,
          limit: 1
        }
      });
      this.MitraInfo = mitra.data.data[0];
      this.dialog.Edit = true;
    },
    async GetUserTypeMitra(id) {
      const mitra = await this.$req.get('api/user/v1/user', {
        params: {
          id: id,
          limit: 1
        }
      });
      this.MitraInfo = mitra.data.data[0];
      this.dialog.AddMOU = true;
    },
    async GetAddHo(id) {
      const mitra = await this.$req.get('api/user/v1/user', {
        params: {
          id: id,
          limit: 1
        }
      });
      this.MitraInfo = mitra.data.data[0];
      this.dialog.AddHO = true;
    },
    async JoinHO() {
      let formData = new FormData();
      formData.append('id_app_user', this.MitraInfo.id);
      formData.append('id_app_user_ho', this.selected_HO);

      let resp = await this.$req
        .post('api/user/v1/user/app_user_ho', formData)
        .then(function(response) {
          return response;
        })
        .catch(error => {
          return error.response;
        });
      if (resp.status == 200) {
        this.color.snackbar = 'success';
        this.message = resp.data.api_message;

        this.Reload();
        this.dialog.AddHO = false;
      } else {
        this.color.snackbar = 'error';
        this.message = resp.data.api_message;
      }

      this.snackbar = true;

      this.selected_HO = null;
    },
    async DeleteHO() {
      let formData = new FormData();
      formData.append('id_app_user', this.MitraInfo.id);
      formData.append('id_app_user_ho', this.MitraInfo.id_app_user_ho);

      let resp = await this.$req
        .delete('api/user/v1/user/app_user_ho', {
          params: {
            id_app_user: this.MitraInfo.id,
            id_app_user_ho: this.MitraInfo.id_app_user_ho
          }
        })
        .then(function(response) {
          return response;
        })
        .catch(error => {
          return error.response;
        });

      if (resp.status == 200) {
        this.color.snackbar = 'success';
        this.message = resp.data.api_message;

        this.Reload();
        this.dialog.AddHO = false;
      } else {
        this.color.snackbar = 'error';
        this.message = resp.data.api_message;
      }

      this.snackbar = true;

      this.selected_HO = null;
    },
    async UpdateMitra() {
      let formData = new FormData();

      formData.append('id', this.DetailMitra.id);
      formData.append('photo', this.DetailMitra.photo);
      formData.append('nama', this.ComUserNama);
      formData.append('deskripsi', this.ComUserDesc);
      // formData.append("nomor_hp", null);
      formData.append('nomor_whatsapp', this.ComUserWA);
      // formData.append("email", null);
      formData.append('kota', this.DetailMitra.kota);
      formData.append('user_status', this.ComUserStatus);
      formData.append('id_mst_user_type', this.ComUserType);

      // formData.append("id_token", "test");

      const resp = await this.$req
        .put('api/user/v1/user', formData)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          return error.response;
        });

      if (resp.status == 200) {
        this.color.snackbar = 'success';
        this.message = resp.data.api_message;

        this.Reload();
        this.dialog.Edit = false;
      } else {
        this.color.snackbar = 'error';
        this.message = resp.data.api_message;
      }

      this.snackbar = true;
    },

    async UpdateMou() {
      let formData2 = new FormData();

      formData2.append('id_app_user', this.MitraInfo.id);
      formData2.append('id_biz_user', this.users.id);
      formData2.append('id_mst_user_type', this.ComUserType.id);
      const resp = await this.$req
        .post('api/user/v1/user/konfirmasi_mou', formData2)
        .then(function(response) {
          return response;
        })
        .catch(error => {
          return error.response;
        });
      if (resp.status == 200) {
        this.color.snackbar = 'success';
        this.message = resp.data.api_message;

        this.Reload();
        this.dialog.AddMOU = false;
        this.MitraInfo = [];
      } else {
        this.color.snackbar = 'error';
        this.message = resp.data.api_message;
      }

      this.snackbar = true;
    },
    async GetUserStatus() {
      const statususer = await this.$req.get('api/user/v1/mst/status_user', {
        params: {}
      });
      this.UserStatus = statususer.data;
    },
    async GetUserType() {
      const usertype = await this.$req.get('api/user/v1/mst/type_user', {
        params: {}
      });
      this.UserType = usertype.data;
    }
  },
  computed: {
    // DetailMitra: {
    //   get: function() {
    //     return this.MitraInfo;
    //   },
    //   // setter
    //   set: function(newValue) {
    //     this.MitraInfo = newValue;
    //   }
    // },
    DetailMitra() {
      return this.MitraInfo;
    },
    ComUserType: {
      get: function() {
        return this.MitraInfo.id_mst_user_type;
      },
      // setter
      set: function(newValue) {
        this.MitraInfo.id_mst_user_type = newValue;
      }
    },
    ComUserStatus: {
      get: function() {
        return this.MitraInfo.id_mst_user_status;
      },
      // setter
      set: function(newValue) {
        this.MitraInfo.id_mst_user_status = newValue;
      }
    },
    ComUserWA: {
      get: function() {
        return this.MitraInfo.nomor_whatsapp;
      },
      // setter
      set: function(newValue) {
        this.MitraInfo.nomor_whatsapp = newValue;
      }
    },
    ComUserNama: {
      get: function() {
        return this.MitraInfo.nama;
      },
      // setter
      set: function(newValue) {
        this.MitraInfo.nama = newValue;
      }
    },
    ComUserDesc: {
      get: function() {
        return this.MitraInfo.deskripsi;
      },
      // setter
      set: function(newValue) {
        this.MitraInfo.deskripsi = newValue;
      }
    },
    ComUserHO: {
      get: function() {
        return this.DetailMitra.id_app_user_ho;
      },
      // setter
      set: function(newValue) {
        this.DetailMitra.id_app_user_ho = newValue;
      }
    }
  }
};
</script>
