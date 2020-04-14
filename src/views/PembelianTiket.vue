<template>
  <div>
    <v-snackbar v-model="snackbar" :color="color.snackbar" top="top">
      {{ message }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-dialog v-model="dialog.Detail" persistent fullscreen hide-overlay>
      <v-card>
        <v-toolbar dark color="teal darken-3">
          <v-toolbar-title>Detail Pembelian</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="dialog.Detail = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">No. Order</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 black--text">
                {{
                TransaksiDetail.no_order
                }}
              </v-list-item-title>
            </v-col>
            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">Status Pembayaran</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 green--text">
                {{
                TransaksiDetail.pembayaran_status
                }}
              </v-list-item-title>
            </v-col>
            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">Note</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 black--text">
                {{
                TransaksiDetail.note
                }}
              </v-list-item-title>
            </v-col>
            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">Note Detail</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 black--text">
                {{
                TransaksiDetail.note_detail
                }}
              </v-list-item-title>
            </v-col>

            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">Nama Pembeli</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 black--text">
                {{
                TransaksiDetail.nama_pembeli
                }}
              </v-list-item-title>
            </v-col>

            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">Tanggal Pembelian</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 black--text">
                {{
                TransaksiDetail.created_at | dateTimeFormat
                }}
              </v-list-item-title>
            </v-col>

            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">Metode Pembayaran</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 black--text">
                {{
                TransaksiDetail.metode
                }}
              </v-list-item-title>
            </v-col>

            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">Jenis Iklan</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 black--text">
                {{
                TransaksiDetail.jenis_iklan
                }}
              </v-list-item-title>
            </v-col>
          </v-row>

          <v-divider light></v-divider>

          <v-row>
            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">Nama Bank</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 black--text">
                {{
                RekeningUser.bank_name
                }}
              </v-list-item-title>
            </v-col>

            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">Nama Pemilik Rekening</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 black--text">
                {{
                RekeningUser.nama_rekening
                }}
              </v-list-item-title>
            </v-col>

            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">No. Rekening</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 black--text">
                {{
                RekeningUser.nomor_rekening
                }}
              </v-list-item-title>
            </v-col>

            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">Tanggal Pengajuan</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 blue--text">
                {{
                TransaksiDetail.created_at | dateTimeFormat
                }}
              </v-list-item-title>
            </v-col>

            <v-col cols="12" sm="6">
              <v-list-item-subtitle class="grey--text">Tanggal berakhir pengajuan :</v-list-item-subtitle>
              <v-list-item-title class="headline2 mb-1 red--text">
                {{
                TransaksiDetail.expired_at | dateTimeFormat
                }}
              </v-list-item-title>
            </v-col>
          </v-row>

          <v-divider light></v-divider>
          <v-row>
            <div v-if="foto !== null"></div>
            <viewer v-if="foto !== null" :images="images">
              <v-col cols="12" sm="12">
                <img v-if="foto !== null" :src="$url_img + foto[0].foto" width="200px" height="230" />
              </v-col>
            </viewer>
            <v-list-item three-line>
              <v-list-item-content>
                <!-- <v-list-item-title class="headline2 mb-1">{{ TransaksiDetail.judul }}</v-list-item-title> -->
                <div class="headline2 mb-1">Jumlah Tiket</div>
                <v-list-item-subtitle>
                  <span style="color: #EF5350">Rp {{ TransaksiDetail.harga }}</span>
                  X
                  {{ TransaksiDetail.jumlah }} Tiket
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <div class="headline2 mb-1">Total Pembayaran</div>
                <v-list-item-subtitle>
                  <span style="color: red">
                    <b>Rp {{ TransaksiDetail.total_pembayaran }}</b>
                  </span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="red darken-1"
            dark
            v-if="TransaksiDetail.id_mst_order_status != 2"
            @click="dialog.Tolak = true"
          >Tolak</v-btn>
          <v-btn
            color="blue darken-1"
            dark
            v-if="TransaksiDetail.id_mst_order_status != 2"
            @click="dialog.Terima = true"
          >Konfirmasi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.Tolak" persistent max-width="500px">
      <v-card>
        <form>
          <v-toolbar dark color="teal darken-3">
            <v-toolbar-title>Tolak Pembayaran</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-btn icon @click="dialog.Tolak = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-select
            :items="MstPembayaranNote"
            v-model="selected.PembayaranNote"
            item-text="note"
            item-value="id"
            label="Alasan Tolak  (Wajib Dipilih)"
            solo
          ></v-select>
          <v-card-text v-if="selected.PembayaranNote == 1">
            <v-textarea label="Alasan Menolak" v-model="Alasan"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="red" dark @click="dialog.Tolak = false">Cancel</v-btn>
            <v-btn color="blue" dark @click="OnTolak(TransaksiDetail.id)">Tolak</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.Terima" persistent max-width="500px">
      <v-card>
        <v-toolbar dark color="teal darken-3">
          <v-toolbar-title>Konfirmasi Pembayaran</v-toolbar-title>

          <div class="flex-grow-1"></div>
          <v-btn icon @click="dialog.Terima = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <h4>Apakah Anda Yakin Melakukan Konfirmasi Pembelian Tiket?</h4>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="red" dark @click="dialog.Terima = false">Cancel</v-btn>
          <v-btn color="blue" dark @click="OnKonfirmasi(TransaksiDetail.id)">Terima</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-text-field
      solo
      label="No Order"
      clearable
      prepend-inner-icon="search"
      @keyup.enter="doSeach"
      @click:clear="doClear"
      v-model="search"
    ></v-text-field>

    <v-tabs v-model="tab" fixed-tabs center-active show-arrows>
      <v-tab>
        <v-badge
          dense
          v-if="MenungguVerifikasi.count != 0"
          color="pink"
          :content="MenungguVerifikasi.count"
        >Verifikasi</v-badge>
        <div v-else>Verifikasi</div>
      </v-tab>
      <v-tab>Diterima</v-tab>
      <v-tab>Ditolak</v-tab>
      <v-tab>Expired</v-tab>
    </v-tabs>

    <v-tabs-items v-if="RenderUnits" v-model="tab">
      <v-tab-item>
        <PembelianTiket :units="MenungguVerifikasi" :onDetail="GetUnitDetail" />
        <div class="text-center pt-2">
          <v-pagination
            v-model="page.MenungguVerifikasi"
            @input="GetMenungguVerifikasi()"
            :length="lengthPage.MenungguVerifikasi"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-tab-item>
      <v-tab-item>
        <PembelianTiket :units="Diterima" :onDetail="GetUnitDetail" />

        <div class="text-center pt-2">
          <v-pagination
            v-model="page.Diterima"
            @input="GetDiterima()"
            :length="lengthPage.Diterima"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-tab-item>

      <v-tab-item>
        <PembelianTiket :units="Ditolak" :onDetail="GetUnitDetail" />
        <div class="text-center pt-2">
          <v-pagination
            v-model="page.Ditolak"
            @input="GetDitolak()"
            :length="lengthPage.Ditolak"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-tab-item>
      <v-tab-item>
        <PembelianTiket :units="Expired" :onDetail="GetUnitDetail" />
        <div class="text-center pt-2">
          <v-pagination
            v-model="page.Expired"
            @input="GetExpired()"
            :length="lengthPage.Expired"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import PembelianTiket from '@/components/PembelianTiket.vue';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import Vue from 'vue';
import moment from 'moment';
Vue.use(Viewer);
export default {
  components: {
    PembelianTiket
  },
  data() {
    return {
      RenderUnits: true,
      tab: null,
      color: { snackbar: '' },
      snackbar: false,
      message: null,
      Alasan: [],
      selected: {
        PembayaranNote: null
      },
      foto: null,
      images: null,
      TransaksiDetail: [],
      dialog: { Detail: false, Tolak: false, Terima: false },
      MstPembayaranNote: [],
      MenungguVerifikasi: [],
      Diterima: [],
      Expired: [],
      Ditolak: [],
      search: null,
      page: { MenungguVerifikasi: 1, Diterima: 1, Ditolak: 1, Expired: 1 },
      lengthPage: {
        MenungguVerifikasi: 0,
        Diterima: 0,
        Ditolak: 0,
        Expired: 0
      },
      limit: 9,
      offset: 0,
      RekeningUser: [],
      users: []
    };
  },
  mounted() {
    // this.GetUnits();
    this.GetMenungguVerifikasi();
    this.GetDiterima();
    this.GetDitolak();
    this.GetExpired();

    this.GetMStPembayaranNote();
  },
  created() {
    let users = sessionStorage.getItem('user');
    this.users = JSON.parse(users);
  },
  methods: {
    forceRerender() {
      this.RenderUnits = false;
      this.$nextTick(() => {
        this.RenderUnits = true;
      });
    },
    async Reload() {
      this.GetMenungguVerifikasi();
      this.GetDiterima();
      this.GetDitolak();
      this.GetExpired();
      this.forceRerender();
    },
    doClear() {
      this.search = '';
      this.GetMenungguVerifikasi();
      this.GetDiterima();
      this.GetDitolak();
      this.GetExpired();
    },
    doSeach() {
      this.GetMenungguVerifikasi();
      this.GetDiterima();
      this.GetDitolak();
      this.GetExpired();
    },
    async GetUnitDetail(id) {
      await this.$req
        .get('api/transaksi/v1/order', {
          params: {
            id: id,
            limit: 1
          }
        })
        .then(response => {
          this.TransaksiDetail = response.data.data[0];
          this.GetFotoBukti();

          this.dialog.Detail = true;
          this.GetRekeningUser();
        })
        .catch(error => {
          console.log(error);
          this.color.snackbar = 'error';
          this.message = error;
          this.snackbar = true;
        });
    },

    go() {
      var offset = (this.offset = (this.page - 1) * this.limit);
      console.log(offset);
    },
    async GetRekeningUser() {
      this.RekeningUser = '';
      const rekening = await this.$req.get('api/user/v1/user/rekening', {
        params: {
          id_app_user: this.TransaksiDetail.id_pembeli,
          limit: 1
        }
      });
      this.RekeningUser = rekening.data.data;
    },

    async GetFotoBukti() {
      this.foto = [];
      const foto_bukti = await this.$req.get(
        'api/transaksi/v1/upload_pembayaran',
        {
          params: {
            id_pembayaran: this.TransaksiDetail.id_pembayaran
          }
        }
      );
      this.foto = foto_bukti.data.data;
    },
    async GetMenungguVerifikasi() {
      var offset = (this.offset =
        (this.page.MenungguVerifikasi - 1) * this.limit);

      await this.$req
        .get('api/transaksi/v1/order', {
          params: {
            no_order: this.search,
            offset: offset,
            limit: this.limit,
            id_mst_iklan_jenis: 1,
            id_order_mst_type: 1,
            id_mst_order_jenis_iklan: 1,
            id_mst_pembayaran_status: 4
          }
        })
        .then(response => {
          this.MenungguVerifikasi = response.data;
          var mod = this.MenungguVerifikasi.count % this.limit;
          console.log('mod', mod);
          this.lengthPage.MenungguVerifikasi =
            (this.MenungguVerifikasi.count - mod) / this.limit + 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async GetDiterima() {
      var offset = (this.offset = (this.page.Diterima - 1) * this.limit);

      await this.$req
        .get('api/transaksi/v1/order', {
          params: {
            no_order: this.search,
            offset: offset,
            limit: this.limit,
            id_mst_iklan_jenis: 1,
            id_order_mst_type: 1,
            id_mst_order_jenis_iklan: 1,
            id_mst_pembayaran_status: 2
          }
        })
        .then(response => {
          this.Diterima = response.data;
          var mod = this.Diterima.count % this.limit;
          this.lengthPage.Diterima =
            (this.Diterima.count - mod) / this.limit + 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async GetDitolak() {
      var offset = (this.offset = (this.page.Ditolak - 1) * this.limit);

      await this.$req
        .get('api/transaksi/v1/order', {
          params: {
            no_order: this.search,
            offset: offset,
            limit: this.limit,
            id_mst_iklan_jenis: 1,
            id_order_mst_type: 1,
            id_mst_order_jenis_iklan: 1,
            id_mst_pembayaran_status: 6
          }
        })
        .then(response => {
          this.Ditolak = response.data;
          var mod = this.Ditolak.count % this.limit;
          this.lengthPage.Ditolak = (this.Ditolak.count - mod) / this.limit + 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async GetExpired() {
      var offset = (this.offset = (this.page.Expired - 1) * this.limit);

      await this.$req
        .get('api/transaksi/v1/order', {
          params: {
            no_order: this.search,
            offset: offset,
            limit: this.limit,
            id_mst_iklan_jenis: 1,
            id_order_mst_type: 1,
            id_mst_order_jenis_iklan: 1,
            id_mst_pembayaran_status: 3
          }
        })
        .then(response => {
          this.Expired = response.data;
          var mod = this.Expired.count % this.limit;
          this.lengthPage.Expired = (this.Expired.count - mod) / this.limit + 1;
        })
        .catch(error => {
          console.log(error);
        });
    },

    async GetMstStatusTolak() {
      this.MstStatusTolak = [];
      const status_tolak = await this.$req.get('api/master/v1/mst_moderasi');

      this.MstStatusTolak = status_tolak.data.data;
    },
    async OnTolak(id) {
      let formData = new FormData();
      formData.append('id', id);
      formData.append('id_mst_pembayaran_note', this.selected.PembayaranNote);
      formData.append('note_detail', this.Alasan);

      const resp = await this.$req
        .post('api/transaksi/v1/tolak_pembayaran', formData)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          return error.response;
        });

      console.log('resp', resp);
      if (resp.status == 200) {
        this.color.snackbar = 'success';
        this.message = resp.data.api_message;

        this.Reload();
        this.dialog.Detail = false;
        this.dialog.Tolak = false;
        this.Alasan = '';
      } else {
        this.color.snackbar = 'error';
        this.message = resp.data.api_message;
      }

      this.snackbar = true;
    },
    async OnKonfirmasi(id) {
      let formData = new FormData();
      formData.append('id', id);

      const resp = await this.$req
        .post('api/transaksi/v1/konfirmasi_pembayaran_tiket', formData)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          return error.response;
        });

      console.log('resp', resp);
      if (resp.status == 200) {
        this.color.snackbar = 'success';
        this.message = resp.data.api_message;

        this.Reload();
        this.dialog.Detail = false;
        this.dialog.Terima = false;
      } else {
        this.color.snackbar = 'error';
        this.message = resp.data.api_message;
      }

      this.snackbar = true;
    },
    async GetMStPembayaranNote() {
      this.MstPembayaranNote = [];
      const status_tolak = await this.$req.get(
        'api/transaksi/v1/mst_pembayaran_note'
      );
      this.MstPembayaranNote = status_tolak.data.data;
    }
  },
  filters: {
    countDoc(doc) {
      if (doc !== null) {
        return true;
      }
    },
    datediff: date => {
      return moment(date).from();
    },
    dateFormat: date => {
      return moment.utc(date).format('DD MMM YYYY');
    },
    timeFormat: date => {
      return moment.utc(date).format('HH:mm');
    },
    dateTimeFormat: date => {
      return moment.utc(date).format('DD MMM YYYY HH:mm');
    }
  }
};
</script>
