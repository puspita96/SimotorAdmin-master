<template>
  <v-app>
    <v-alert v-if="alert" dense outlined type="error">{{ message }}</v-alert>

    <v-row fill-height align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="white" flat>
            <v-toolbar-title align="center" justify="center">Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                name="Email"
                v-model="email"
                prepend-icon="email"
                type="text"
              />

              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="green lighten-1" outlined @click="Login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      eula: true,
      email: null,
      password: null,
      alert: false,
      message: null,
      response: null
    };
  },
  methods: {
    async Login() {
      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);

      const response = await this.$req.post('/api/user/v1/biz/login', formData);
      await console.log('response', response);
      // this.response == response;
      console.log('status', response.status);
      if (response.status == 200) {
        console.log('token', response.data.data[0].token);
        window.sessionStorage.setItem(
          'user',
          JSON.stringify(response.data.data[0])
        );
        window.sessionStorage.setItem('token', response.data.data[0].token);

        this.$store.commit('SET_USER', response.data.data[0]);
        this.$store.commit('SET_TOKEN', response.data.data[0].token);
        this.$router.push(response.redirect ? response.redirect : '/dashboard');
      } else {
        this.alert = true;
        this.message = response.api_message;
      }
    }
  }
};
</script>
s
