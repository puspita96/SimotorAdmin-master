<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="unitMokas"
        class="elevation-1"
        :loading="loading"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-text-field
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-select
                      v-model="sortBy"
                      :items="states"
                      label="Select"
                      multiple
                      chips
                      width="200px"
                    ></v-select>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text>Cancel</v-btn>
                  <v-btn color="blue darken-1" text>Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          @input="doSearch"
          :length="lengthPage"
          :total-visible="7"
        ></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sortBy: null,
      states: ["Alabama", "Alaska", "American Samoa", "Arizona"],
      dialog: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      keyword: "",
      unitMokas: [],
      items: [],
      lengthPage: 0,
      limit: 10,
      offset: 0,
      total: 0,
      loading: true,
      headers: [
        {
          text: "created_at",
          align: "start",
          sortable: false,
          value: "created_at"
        },
        { text: "Merk", value: "merk", sortable: false },
        { text: "nomor_polisi", value: "nomor_polisi", sortable: false },
        { text: "type", value: "type", sortable: false },
        { text: "warna", value: "warna", sortable: false },
        { text: "Iron (%)", value: "status", sortable: false }
      ]
    };
  },

  methods: {
    go() {
      var offset = (this.offset = (this.page - 1) * this.limit);
      console.log(offset);
    },
    doSearch() {
      var offset = (this.offset = (this.page - 1) * this.limit);

      var params = new URLSearchParams();
      // params.append("id_app_user", this.user[0].id);
      if (this.value > 0) {
        params.append("id_mst_motor_bekas_status", this.value);
      }
      params.append("search", this.keyword);
      params.append("offset", offset);
      params.append("limit", this.limit);

      var request = {
        params: params
      };

      axios
        .get("http://116.197.129.222/api/produk/v1/unit_mokas", request)
        .then(response => {
          let { data } = response.data;
          this.unitMokas = data;
          this.total = response.data.count;
          var mod = this.total % this.limit;
          this.lengthPage = (this.total - mod) / this.limit - 1;
          this.loading = false;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
          this.loading = false;
        });
    },
    doClear() {
      var params = new URLSearchParams();
      params.append("id_app_user", this.user[0].id);
      params.append("search", "");
      params.append("limit", 999);

      var request = {
        params: params
      };

      this.axios
        .get("/produk/v1/unit_mokas", request)
        .then(response => {
          let { data } = response.data;
          this.unitMokas = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    }
  },
  created() {
    this.doSearch();
  }
};
</script>
