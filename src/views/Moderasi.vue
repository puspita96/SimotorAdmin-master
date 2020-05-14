<template>
  <div>
    <v-snackbar v-model="snackbar" :color="color.snackbar" top="top">
      {{ message }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog.Detail" persistent fullscreen hide-overlay>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Detail Unit</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="dialog.Detail = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-row justify="center" v-if="UnitsDetail !== ''">
          <viewer :images="images">
            <v-col cols="12" sm="12">
              <img
                :src="$url_img + UnitsDetail.foto_1"
                width="200px"
                height="230"
              />
              <v-list-item-title>Ket: Tampak Depan</v-list-item-title>
            </v-col>
          </viewer>
          <viewer :images="images">
            <v-col cols="12" sm="12">
              <img
                :src="$url_img + UnitsDetail.foto_2"
                width="200px"
                height="230"
              />
              <v-list-item-title>Ket: Tampak Belakang</v-list-item-title>
            </v-col>
          </viewer>
          <viewer :images="images">
            <v-col cols="12" sm="12">
              <img
                :src="$url_img + UnitsDetail.foto_3"
                width="200px"
                height="230"
              />
              <v-list-item-title>Ket: Foto Utama</v-list-item-title>
            </v-col>
          </viewer>
          <!-- <viewer :images="images">
              <v-col cols="3">
                <img :src="$url_img + UnitsDetail.foto_4" width="170px" height="110" />
              </v-col>
          </viewer>-->
        </v-row>

        <v-row justify="center" v-if="UnitsDetail !== ''">
          <viewer :images="images">
            <v-col cols="12" sm="12">
              <img
                :src="$url_img + UnitsDetail.foto_4"
                width="200px"
                height="230"
              />
              <v-list-item-title>Ket: Tampak Samping</v-list-item-title>
            </v-col>
          </viewer>
          <viewer :images="images">
            <v-col cols="12" sm="12">
              <img
                :src="$url_img + UnitsDetail.foto_5"
                width="200px"
                height="230"
              />
              <v-list-item-title>Ket: Detail Foto</v-list-item-title>
            </v-col>
          </viewer>
          <viewer v-if="UnitsDetail.foto_bpkb != null" :images="images">
            <v-col cols="3">
              <img
                :src="$url_img + UnitsDetail.foto_bpkb"
                width="170px"
                height="110"
              />
            </v-col>
          </viewer>
          <viewer v-if="UnitsDetail.foto_pajak != null" :images="images">
            <v-col cols="3">
              <img
                :src="$url_img + UnitsDetail.foto_pajak"
                width="170px"
                height="110"
              />
            </v-col>
          </viewer>
        </v-row>

        <v-divider light></v-divider>

        <v-row>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Nama User</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">
                  {{ namauser.nama }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Status Moderasi</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1 green--text">{{
                  UnitsDetail.status
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Kota</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">{{
                  UnitsDetail.lokasi
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>

        <v-divider light></v-divider>

        <v-row>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Moderasi Deskripsi</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">{{
                  UnitsDetail.moderasi_deskripsi
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Type</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">{{
                  UnitsDetail.type
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-divider light></v-divider>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Tanggal Pajak</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">{{
                  UnitsDetail.tanggal_pajak
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>

          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>No. Polisi</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">{{
                  UnitsDetail.nomor_polisi
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Warna</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">
                  {{ UnitsDetail.warna }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-divider light></v-divider>

          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Tanggal STNK</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">
                  {{ UnitsDetail.tanggal_stnk }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>

          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Tahun</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">
                  {{ UnitsDetail.tahun }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-divider light></v-divider>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Lokasi Samsat</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">{{
                  UnitsDetail.lokasi_samsat
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>

          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Merk</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">{{
                  UnitsDetail.merk
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Lembar Pajak</v-list-item-subtitle>
                <v-list-item-title
                  v-if="UnitsDetail.lembar_pajak == false"
                  class="headline2 mb-1"
                  >Tidak ada</v-list-item-title
                >
                <v-list-item-title
                  v-if="UnitsDetail.lembar_pajak == true"
                  class="headline2 mb-1"
                  >Ada</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-divider light></v-divider>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Lembar STNK</v-list-item-subtitle>
                <v-list-item-title
                  v-if="UnitsDetail.lembar_stnk == false"
                  class="headline2 mb-1"
                  >Tidak ada</v-list-item-title
                >

                <v-list-item-title
                  v-if="UnitsDetail.lembar_stnk == true"
                  class="headline2 mb-1"
                  >Ada</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Odometer</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">{{
                  UnitsDetail.odometer
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>

          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Jenis Unit</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">{{
                  UnitsDetail.jenis_motor
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-divider light></v-divider>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Transmisi</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">{{
                  UnitsDetail.transmisi
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>CC Motor</v-list-item-subtitle>
                <v-list-item-title class="headline2 mb-1">{{
                  UnitsDetail.cc
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Kepemilikan Pertama</v-list-item-subtitle>
                <v-list-item-title
                  v-if="UnitsDetail.kepemilikan_pertama == false"
                  class="headline2 mb-1"
                  >Tidak</v-list-item-title
                >
                <v-list-item-title
                  v-if="UnitsDetail.kepemilikan_pertama == true"
                  class="headline2 mb-1"
                  >Ya</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-divider light></v-divider>
        </v-row>

        <v-divider light></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <!-- <v-btn color="grey" dark @click="dialog.Detail = false">Cancel</v-btn> -->
          <v-btn
            color="red darken-1"
            dark
            v-if="UnitsDetail.id_mst_motor_bekas_status == 3"
            @click="dialog.Tolak = true"
            >Tolak</v-btn
          >
          <v-btn
            color="blue darken-1"
            dark
            v-if="UnitsDetail.id_mst_motor_bekas_status == 3"
            @click="dialog.Terima = true"
            >Konfirmasi</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.Tolak" persistent max-width="500px">
      <v-card>
        <v-toolbar dark color="teal darken-3">
          <v-toolbar-title>Tolak Moderasi</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="dialog.Tolak = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-select
          :items="MstStatusTolak"
          v-model="Alasan"
          item-text="alasan"
          item-value="alasan"
          label="Alasan Tolak Moderasi (Wajib Dipilih)"
          solo
        ></v-select>
        <v-card-text>
          <v-textarea label="Alasan Menolak" v-model="Alasan"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="red darken-1" dark @click="dialog.Tolak = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" dark @click="OnTolak(UnitsDetail.id)"
            >Tolak</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.Terima" persistent max-width="500px">
      <v-card>
        <v-toolbar color="teal darken-3">
          <v-toolbar-title>Terima Moderasi Unit</v-toolbar-title>

          <div class="flex-grow-1"></div>
          <v-btn icon @click="dialog.Terima = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-title>Apakah Anda Yakin Menerima Moderasi Unit?</v-card-title>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="red darken-1" dark @click="dialog.Terima = false"
            >Cancel</v-btn
          >
          <v-btn
            color="blue darken-1"
            dark
            @click="OnKonfirmasi(UnitsDetail.id)"
            >Terima</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-text-field
      solo
      label="Search"
      clearable
      prepend-inner-icon="search"
      @keyup.enter="doSearch"
      @click:clear="doClear"
      v-model="search"
    ></v-text-field>

    <v-tabs v-model="tab" fixed-tabs>
      <v-tab>
        <v-badge
          v-if="prosesModerasi.count != 0"
          color="pink"
          :content="prosesModerasi.count"
          >Moderasi</v-badge
        >
        <div v-else>Moderasi</div>
      </v-tab>
      <v-tab>Tersedia</v-tab>
      <v-tab>Ditolak</v-tab>
    </v-tabs>

    <v-tabs-items v-if="RenderUnits" v-model="tab">
      <v-tab-item>
        <Moderasi :units="prosesModerasi" :onDetail="GetUnitDetail" />

        <div class="text-center pt-2">
          <v-pagination
            v-model="page.Moderasi"
            @input="GetUnitProsesModerasi()"
            :length="lengthPage.Moderasi"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-tab-item>
      <v-tab-item>
        <Moderasi :units="tersedia" :onDetail="GetUnitDetail" />
        <div class="text-center pt-2">
          <v-pagination
            v-model="page.Tersedia"
            @input="GetUnitTersedia()"
            :length="lengthPage.Tersedia"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-tab-item>
      <v-tab-item>
        <Moderasi :units="moderasiDitolak" :onDetail="GetUnitDetail" />
        <div class="text-center pt-2">
          <v-pagination
            v-model="page.Ditolak"
            @input="GetUnitModerasiDitolak()"
            :length="lengthPage.Ditolak"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import Moderasi from '@/components/Moderasi.vue';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import Vue from 'vue';
Vue.use(Viewer);
export default {
  components: {
    Moderasi
  },
  data() {
    return {
      RenderUnits: true,
      tab: null,
      color: { snackbar: '' },
      snackbar: false,
      message: null,
      Alasan: [],
      images: [],
      namauser: [],
      UnitsDetail: [],
      dialog: { Detail: false, Tolak: false, Terima: false },
      MstStatusModerasi: [],
      MstStatusTolak: [],
      units: [],
      tersedia: [],
      moderasiDitolak: [],
      prosesModerasi: [],
      search: null,
      page: { Tersedia: 1, Moderasi: 1, Ditolak: 1, Units: 1 },
      lengthPage: { Tersedia: 0, Moderasi: 0, Ditolak: 0, Units: 1 },
      limit: 9,
      offset: 0,
      total: 0,
      users: []
    };
  },
  mounted() {
    // this.GetUnits();
    this.GetUnitTersedia();
    this.GetUnitProsesModerasi();
    this.GetUnitModerasiDitolak();
  },
  created() {
    let users = sessionStorage.getItem('user');
    this.users = JSON.parse(users);
    // this.GetMstStatusModerasi();

    this.GetMstStatusTolak();
  },
  methods: {
    forceRerender() {
      this.RenderUnits = false;
      this.$nextTick(() => {
        this.RenderUnits = true;
      });
    },
    async Reload() {
      this.GetUnitTersedia();
      this.GetUnitProsesModerasi();
      this.GetUnitModerasiDitolak();
      this.forceRerender();
    },
    doClear() {
      this.search = '';
      this.GetUnitTersedia();
      this.GetUnitProsesModerasi();
      this.GetUnitModerasiDitolak();
    },
    doSearch() {
      this.GetUnitTersedia();
      this.GetUnitProsesModerasi();
      this.GetUnitModerasiDitolak();
    },
    async GetUnitDetail(id) {
      await this.$req
        .get('api/produk/v1/unit_mokas', {
          params: {
            id: id,
            limit: 1
          }
        })
        .then(response => {
          this.UnitsDetail = response.data.data[0];
          this.dialog.Detail = true;

          this.GetUsersUnit();
        })
        .catch(error => {
          console.log(error);
        });
    },
    async GetUsersUnit() {
      const nama_user = await this.$req.get('api/user/v1/user', {
        params: {
          id: this.UnitsDetail.id_app_user,
          limit: 1
        }
      });

      this.namauser = nama_user.data.data[0];
    },

    go() {
      var offset = (this.offset = (this.page - 1) * this.limit);
      console.log(offset);
    },
    GetUnits() {
      var offset = (this.offset = (this.page.Units - 1) * this.limit);

      this.$req
        .get('api/produk/v1/unit_mokas', {
          params: {
            search: this.search,
            offset: offset,
            limit: this.limit
          }
        })
        .then(response => {
          this.units = response.data;
          var mod = this.units.count % this.limit;
          this.lengthPage.Units = (this.units.count - mod) / this.limit - 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async GetUnitTersedia() {
      var offset = (this.offset = (this.page.Tersedia - 1) * this.limit);

      await this.$req
        .get('api/produk/v1/unit_mokas', {
          params: {
            search: this.search,
            offset: offset,
            limit: this.limit,
            id_mst_motor_bekas_status: 1 //tersedia
          }
        })
        .then(response => {
          this.tersedia = response.data;
          var mod = this.tersedia.count % this.limit;
          this.lengthPage.Tersedia =
            (this.tersedia.count - mod) / this.limit - 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async GetUnitProsesModerasi() {
      var offset = (this.offset = (this.page.Moderasi - 1) * this.limit);

      await this.$req
        .get('api/produk/v1/unit_mokas', {
          params: {
            search: this.search,
            offset: offset,
            limit: this.limit,
            id_mst_motor_bekas_status: 3 //proses moderasi
          }
        })
        .then(response => {
          this.prosesModerasi = response.data;
          var mod = this.prosesModerasi.count % this.limit;
          this.lengthPage.Moderasi =
            (this.prosesModerasi.count - mod) / this.limit - 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async GetUnitModerasiDitolak() {
      var offset = (this.offset = (this.page.Ditolak - 1) * this.limit);

      await this.$req
        .get('api/produk/v1/unit_mokas', {
          params: {
            search: this.search,
            offset: offset,
            limit: this.limit,
            id_mst_motor_bekas_status: 5 //moderasi ditolak
          }
        })
        .then(response => {
          this.moderasiDitolak = response.data;
          var mod = this.moderasiDitolak.count % this.limit;
          this.lengthPage.Ditolak =
            (this.moderasiDitolak.count - mod) / this.limit - 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async GetMstStatusModerasi() {
      this.MstStatusModerasi = [];
      var params = new URLSearchParams();
      params.append('id', 1);
      params.append('id', 3);
      params.append('id', 5);

      var request = {
        params: params
      };
      const aaa = await this.$req.get(
        'api/produk/v1/mst_motor_bekas_status',
        request
      );
      this.MstStatusModerasi = aaa.data.data;
    },
    async GetMstStatusTolak() {
      this.MstStatusTolak = [];
      const status_tolak = await this.$req.get('api/master/v1/mst_moderasi');

      this.MstStatusTolak = status_tolak.data.data;
    },
    async OnTolak(id) {
      let formData = new FormData();
      formData.append('id', id);
      // formData.append("id_motor_bekas", id);
      formData.append('id_biz_user', this.users.id);
      formData.append('deskripsi', 'asas');
      formData.append('id_mst_motor_bekas_status', 5);

      const response = await this.$req.post(
        'api/produk/v1/unit_moderasi_update',
        formData
      );

      this.dialog.Detail = false;
      this.dialog.Tolak = false;
      this.snackbar = true;
      this.message = response.data.api_message;
      this.color.snackbar = 'success';

      this.Reload();
    },
    async OnKonfirmasi(id) {
      this.Alasan = 'Unit Berhasil diModerasi';
      let formData = new FormData();
      formData.append('id', id);
      formData.append('id_motor_bekas', id);
      formData.append('id_biz_user', this.users.id);
      formData.append('deskripsi', this.Alasan);
      formData.append('id_mst_motor_bekas_status', 1);

      const response = await this.$req.post(
        'api/produk/v1/unit_moderasi_update',
        formData
      );

      console.log(response);
      this.dialog.Detail = false;
      this.dialog.Terima = false;
      this.snackbar = true;
      this.message = response.data.api_message;
      this.color.snackbar = 'success';

      this.Reload();
    }
  }
};
</script>
