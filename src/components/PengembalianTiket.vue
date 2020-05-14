<template>
  <div>
    <v-row fill-height align="center" justify="center" style="margin:0">
      <span v-if="units.count == 0">Tidak Ada Data</span>
    </v-row>

    <v-row>
      <v-col v-for="item in units.data" :key="item.id" cols="12" md="4">
        <v-card elevation="7" class="mx-auto">
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.nama_penjual }}</v-list-item-title>
              <v-list-item-subtitle>No.Order: {{ item.no_order }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text v-text="item.id"></v-list-item-action-text>
              <v-list-item-action-text v-if="!item.type_user_pembeli == 'Premium'">
                <span style="color: red">{{ item.type_user_pembeli }}</span>
              </v-list-item-action-text>
              <v-list-item-action-text v-else>
                <span style="color: teal">{{ item.type_user_pembeli }}</span>
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>
                Jumlah: {{ item.jumlah }} x
                <span style="color: #EF5350">Rp {{ item.harga }}</span>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Total Pembayaran :
                <span style="color: #EF5350">Rp {{ item.total_pembayaran }}</span>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Tanggal :
                {{ item.CreatedAt | dateTimeFormat }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <!-- <v-btn text color="deep-purple accent-4">
              Lihat
            </v-btn>-->

            <!-- <v-btn text color="deep-purple accent-4">
                Bookmark
            </v-btn>-->
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>-->
            <v-btn icon @click="onDetail(item.id)">
              <v-icon>mdi-grease-pencil</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'PembelianTiket',
  props: {
    units: { Array },

    onDetail: Function
  },
  data() {
    return {};
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
  },
  methods: {
    // async GetUnitDetail(id) {
    //   await this.$req
    //     .get("api/produk/v1/unit_mokas", {
    //       params: {
    //         id: id,
    //         limit: 1
    //       }
    //     })
    //     .then(response => {
    //       this.UnitsDetail = response.data.data[0];
    //       this.Detail = true;
    //       this.GetUsersUnit();
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    // async GetUsersUnit() {
    //   const nama_user = await this.$req.get("api/user/v1/user", {
    //     params: {
    //       id: this.UnitsDetail.id_app_user,
    //       limit: 1
    //     }
    //   });
    //   this.namauser = nama_user.data.data[0];
    // },
  }
};
</script>
