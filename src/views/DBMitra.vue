<template>
  <div>
    <v-dialog v-model="DialogAddMitra" max-width="800px">
      <v-card>
        <v-toolbar class="mb-2" color="teal darken-3" dark flat>
          <v-toolbar-title>Tambah Mitra</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-container fill-height fluid grid-list-xl>
            <v-layout justify-center wrap>
              <v-flex xs12 md10>
                <v-form>
                  <v-container py-0>
                    <v-layout wrap>
                      <v-flex xs12 md6>
                        <v-text-field
                          v-model="DefaultAddMitra.nama"
                          label="Nama Lengkap"
                          class="blue-input"
                        />
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field
                          v-model="DefaultAddMitra.deskripsi"
                          label="Deskripsikan Diri Anda"
                          class="blue-input"
                        />
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field
                          v-model="DefaultAddMitra.nomor_hp"
                          label="No. Telepon"
                          class="blue-input"
                        />
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field
                          v-model="DefaultAddMitra.nomor_whatsapp"
                          label="No. Whatsapp"
                          class="blue-input"
                        />
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field
                          v-model="DefaultAddMitra.email"
                          label="Email"
                          class="blue-input"
                        />
                        <div class="g-signin2" data-onsuccess="onSignIn"></div>
                      </v-flex>

                      <v-flex xs12 md6>
                        <v-file-input label="Foto" outlined dense></v-file-input>
                      </v-flex>

                      <v-flex xs12 md6>
                        <v-text-field
                          v-model="DefaultAddMitra.kota"
                          label="Kota"
                          class="blue-input"
                        />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="red darken-1" dark class="mb-2" @click="DialogAddMitra = false">Cancel</v-btn>
          <v-btn color="success" dark class="mb-2" @click="AddMitra()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="DialogDetail" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Detail Mitra</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <img :src="$url_img + DetailMitra.photo" width="150px" height="150px" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="DetailMitra.id" label="Id User" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="DetailMitra.nama" label="Nama User"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="DetailMitra.deskripsi" label="Deskripsi"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="DetailMitra.nomor_hp" label="No. Handphone" disabled></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="DetailMitra.nomor_whatsapp" label="No. Whatsapp"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="DetailMitra.email" label="Email" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :items="UserStatus"
                  v-model="ComUserStatus"
                  item-text="status"
                  item-value="id"
                  label="Status User"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-combobox
                  :items="UserType"
                  v-model="ComUserType"
                  item-text="type"
                  item-value="id"
                  label="Tipe User"
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="DetailMitra.kota" label="Kota"></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="ResetPassword" type="password" label="Reset Password"></v-text-field>
              </v-col>-->
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="red darken-1" dark class="mb-2" @click="DialogDetail = false">Cancel</v-btn>
          <v-btn color="blue darken-1" dark class="mb-2" @click="UpdateMitra(DetailMitra.id)">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="ListMitra"
      class="elevation-1"
      :search="search"
      sort-desc:="created_at"
    >
      <template v-slot:top>
        <v-toolbar flat color="teal lighten-2">
          <v-toolbar-title>Daftar User</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-text-field
            v-model="search"
            append-icon="search"
            @click:append="SearchUser()"
            label="Search"
            single-line
            clearable
            hide-details
          ></v-text-field>
          <!-- ini buat add user -->
          <!-- <v-btn icon color="black" fab x-large dark @click="DialogAddMitra= true">
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>-->
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon color="blue darken-3" small class="mr-2" @click="GetDetailMitra(item.id)">edit</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="GetListMitra">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// import config from '../config';

export default {
  data() {
    return {
      DialogAddMitra: false,
      DialogDetail: false,
      search: '',
      ListMitra: [],
      MitraInfo: [],
      MstStatusUser: [],
      Selected_MstStatusUser: [],
      UserType: [],
      UserStatus: [],
      headers: [
        { text: 'Nama', value: 'nama' },
        { text: 'Email', value: 'email' },
        { text: 'No. Telepon', value: 'nomor_hp' },
        { text: 'Kota', value: 'kota' },
        { text: 'Tipe User', value: 'user_type' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      editedIndex: -1,
      ResetPassword: '',
      DefaultAddMitra: {
        nama: '',
        deskripsi: '',
        nomor_hp: '',
        nomor_whatsapp: '',
        email: '',
        photo: '',
        kota: ''
      }
    };
    // function onSignIn(googleUser) {
    //   var profile = googleUser.getBasicProfile();
    //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //   console.log('Name: ' + profile.getName());
    //   console.log('Image URL: ' + profile.getImageUrl());
    //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // }
  },
  async mounted() {
    this.GetUserType();
    this.GetListMitra();
    this.GetMStStatusUser();
    this.GetUserStatus();
  },
  computed: {
    DetailMitra: {
      get: function() {
        return this.MitraInfo;
      },
      // setter
      set: function(newValue) {
        this.MitraInfo = newValue;
      }
    },
    ComUserType: {
      get: function() {
        return this.DetailMitra.user_type;
      },
      // setter
      set: function(newValue) {
        this.DetailMitra.user_type = newValue;
      }
    },
    ComUserStatus: {
      get: function() {
        return this.DetailMitra.user_status;
      },
      // setter
      set: function(newValue) {
        this.DetailMitra.user_status = newValue;
      }
    }
  },

  watch: {},
  created() {
    this.GetListMitra();
  },
  methods: {
    async SearchUser() {
      await this.GetListMitra(null, null, null, null, null, null, this.search);
      this.forceRerender();
    },

    async GetListMitra(id) {
      const mitra = await this.$req.get('api/user/v1/user', {
        params: {
          id: id,
          limit: 1000
        }
      });

      this.ListMitra = mitra.data.data;
    },

    async GetDetailMitra(id) {
      const mitra = await this.$req.get('api/user/v1/user', {
        params: {
          id: id,
          limit: 1
        }
      });
      this.MitraInfo = mitra.data.data[0];
      this.DialogDetail = true;
    },

    async GetUserStatus(id) {
      const statususer = await this.$req.get('api/user/v1/mst/status_user', {
        params: {
          id: id,
          limit: 1
        }
      });
      this.UserStatus = statususer.data;
    },

    async GetDetailStatus() {
      this.DetailStatus = [];
      const statusdetail = await this.$req.get('/v1/user', {
        params: {
          limit: 1
        }
      });

      this.DetailStatus = statusdetail.data.data;
    }
    //     async AddMitra() {
    //       let formData = new FormData();

    //       formData.append('nama', this.DefaultAddMitra.nama);
    //       formData.append('photo', this.DefaultAddMitra.photo);
    //       formData.append('deskripsi', this.DefaultAddMitra.deskripsi);
    //       formData.append('nomor_hp', this.DefaultAddMitra.nomor_hp);
    //       formData.append('nomor_whatsapp', this.DefaultAddMitra.nomor_whatsapp);
    //       formData.append('email', this.DefaultAddMitra.email);
    //       formData.append('kota', this.DefaultAddMitra.kota);
    //       // formData.append("id_mst_user_type", this.DetailMitra.id_mst_user_type);

    //       const add_mitra = await this.$user.post('/v1/user', formData);
    //       console.log(add_mitra, 'Error add Mitra');
    //       this.DialogAddMitra = false;

    //       this.Reload();
    //     },

    //     async UpdateMitra(id) {
    //       let formData = new FormData();

    //       formData.append('id', id);
    //       formData.append('photo', this.DetailMitra.photo);
    //       formData.append('nama', this.DetailMitra.nama);
    //       formData.append('deskripsi', this.DetailMitra.deskripsi);
    //       // formData.append("nomor_hp", null);
    //       formData.append('nomor_whatsapp', this.DetailMitra.nomor_whatsapp);
    //       // formData.append("email", null);
    //       formData.append('kota', this.DetailMitra.kota);
    //       formData.append('user_status', this.DetailMitra.user_status);
    //       formData.append('id_mst_user_type', this.ComUserType.id);

    //       // formData.append("id_token", "test");

    //       const update_mitra = await this.$user.put('/v1/user', formData);

    //       console.log(
    //         'this.MitraInfo !== this.DetailMitra.user_type.id',
    //         this.MitraInfo.id_mst_user_type,
    //         this.DetailMitra.user_type.id
    //       );

    //       if (this.MitraInfo.id_mst_user_type !== this.DetailMitra.user_type.id) {
    //         this.UpdateMou();
    //       }

    //       this.DialogDetail = false;
    //       // this.ResetPassword = "";
    //       this.Reload();
    //     },

    //     async UpdateMou() {
    //       let formData2 = new FormData();

    //       formData2.append('id_app_user', this.MitraInfo.id);
    //       formData2.append('id_biz_user', 1);
    //       formData2.append('id_mst_user_type', this.ComUserType.id);
    //       const update_mou = await this.$user.post(
    //         '/v1/user/konfirmasi_mou',
    //         formData2
    //       );
    //       console.log(update_mou);
    //       this.DialogDetail = false;
    //       // this.ResetPassword = "";
    //       this.Reload();
    //     },
    //     async GetUserType(id) {
    //       // this.UserType = [];
    //       const usertype = await this.$user.get('/v1/mst/type_user', {
    //         params: {
    //           id: id,
    //           limit: 1
    //         }
    //       });
    //       this.UserType = usertype.data;
    //     }
  }
};
</script>
