<template>
  <v-container>
    <v-row v-if="render">
      <v-col cols="4" md="2">
        <v-skeleton-loader class="mx-auto" max-width="600" type="list-item-two-line">
          <v-card v-if="render">
            <p class="title text-center" style="margin:0">{{ FilterUnit[0].moderasi }}</p>
            <v-card-actions class="justify-center">
              <v-btn x-small text color="red">Moderasi</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="4" md="2">
        <v-skeleton-loader class="mx-auto" max-width="600" type="list-item-two-line">
          <v-card v-if="render">
            <p class="title text-center" style="margin:0" color="red">{{ FilterUnit[0].total }}</p>
            <v-card-actions class="justify-center">
              <v-btn x-small text color="blue">Total</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="4" md="2">
        <v-skeleton-loader class="mx-auto" max-width="600" type="list-item-two-line">
          <v-card v-if="render">
            <p class="title text-center" style="margin:0">{{ FilterUnit[0].terjual }}</p>
            <v-card-actions class="justify-center">
              <v-btn x-small text>Terjual</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="4" md="2">
        <v-skeleton-loader class="mx-auto" max-width="600" type="list-item-two-line">
          <v-card>
            <p class="title text-center" style="margin:0">{{ FilterUnit[0].tersedia }}</p>
            <v-card-actions class="justify-center">
              <v-btn x-small text>Tersedia</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="4" md="2">
        <v-skeleton-loader class="mx-auto" max-width="600" type="list-item-two-line">
          <v-card>
            <p class="title text-center" style="margin:0">{{ FilterUnit[0].terpakai }}</p>
            <v-card-actions class="justify-center">
              <v-btn x-small text>Terpakai</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="4" md="2">
        <v-skeleton-loader class="mx-auto" max-width="600" type="list-item-two-line">
          <v-card>
            <p class="title text-center" style="margin:0">{{ FilterUnit[0].serah_terima }}</p>
            <v-card-actions class="justify-center">
              <v-btn x-small text>Serah Terima</v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mx-auto">
          <v-subheader>Total Transaksi</v-subheader>
          <v-list dense height="200" class="overflow-y-auto">
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in Statistik.Transaksi" :key="i">
                <v-list-item-content>
                  <v-list-item-subtitle>{{ item.month }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ item.total }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-auto">
          <v-subheader>Total Unit</v-subheader>
          <v-list dense height="200" class="overflow-y-auto">
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in Statistik.Unit" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.month"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ item.total }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    {{
                    item.booking
                    }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-card class="mx-auto text-center" max-width="600">
      <v-card-text>
        <v-sheet color="cyan" elevation="12">
          <v-sparkline
            :value="value"
            :labels="labels"
            :gradient="gradient"
            height="100"
            padding="12"
            line-width="2"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item"> ${{ item.value }} </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn block small text>Booking Report</v-btn>
      </v-card-actions>

      <v-divider></v-divider>
    </v-card>-->
  </v-container>
</template>
<script>
import axios from 'axios';
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
];
export default {
  inject: ['theme'],
  data: () => ({
    gradient: gradients[5],
    labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm'],
    value: [200, 675, 410, 390, 310, 460, 250],
    Dashboard: 6,
    render: false,
    Perfomance: [],
    TopBooking: [],
    TargetStatus: [],
    DealStatus: [],
    LeadStatus: [],
    Statistik: { Transaksi: [], Unit: [] },
    date: '2020-01'
    // Dashboard: ["Users", "Target", "Lead", "Target Call", "Deals", "Orders"]
  }),

  mounted() {
    this.GetUnit();
  },
  methods: {
    GetUnit() {
      var params = new URLSearchParams();
      params.append('year', '2020');
      var request = {
        params: params
      };

      this.$req
        .get('/api/produk/v1/statistik', request)

        .then(response => {
          let { data } = response.data;
          this.Statistik.Unit = data;
          this.render = true;
          console.log(response);
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    GetTransaksi() {
      var params = new URLSearchParams();
      params.append('year', '2020');
      var request = {
        params: params
      };

      this.$req
        .get('/api/transaksi/v1/statistik', request)

        .then(response => {
          let { data } = response.data;
          this.Statistik.Transaksi = data;
          console.log(response);
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    GetPerfomance() {
      var params = new URLSearchParams();
      params.append('tahun', 2020);
      var request = {
        params: params
      };

      axios
        .get('http://192.168.77.8:5002/service/dashboard/perfomance', request)

        .then(response => {
          let { data } = response.data;
          this.Perfomance = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    GetTargetStatus() {
      var params = new URLSearchParams();
      //   params.append("tahun", 2020);
      var request = {
        params: params
      };

      axios
        .get('http://192.168.77.8:5002/service/target/status', request)

        .then(response => {
          let { data } = response.data;
          this.TargetStatus = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    GetLeadStatus() {
      var params = new URLSearchParams();
      //   params.append("tahun", 2020);
      var request = {
        params: params
      };

      axios
        .get('http://192.168.77.8:5002/service/lead/status', request)

        .then(response => {
          let { data } = response.data;
          this.LeadStatus = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    GetDealStatus() {
      var params = new URLSearchParams();
      //   params.append("tahun", 2020);
      var request = {
        params: params
      };

      axios
        .get('http://192.168.77.8:5002/service/order/deals/status', request)

        .then(response => {
          let { data } = response.data;
          this.DealStatus = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    }
  },
  computed: {
    FilterUnit: function() {
      let d = new Date();
      let GetTahun = d.getFullYear();
      let GetBulan = d.getMonth() + 1;

      let tahun = String(GetTahun);
      let bulan = String(GetBulan);

      if (String(GetBulan).length == 1) {
        bulan = '0' + bulan;
      }
      var tanggal = tahun + '-' + bulan;
      return this.Statistik.Unit.filter(function(number) {
        return number.date === tanggal;
      });
    }
  },
  created() {
    this.GetTransaksi();
  }
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
