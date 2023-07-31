<template>
  <v-app>
    <v-main class="app-wrapper">
      <keep-alive :include="['site-header' , 'index']">
        <Nuxt />
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
    }
  },
  created() {
    const apiToken = this.getToken();
    if(apiToken){
      this.auth()
    }
    this.getSetting()
  },
  methods: {
    getSetting () {
      this.$axios.get(`get_settings`)
      .then(res => {
        this.$store.dispatch('app/setSetting' , res.data.data);
      })
      .catch( () => {
      });
    },
    auth(){
      this.loading = true
      const token = this.getToken()
      this.$axios.post(`getUserData`,{},
      {
        headers: {
          'api_token':token
        }
      })
      .then(res => {
        const data = res.data.data;
        this.$store.dispatch('user/setUser' , data);
      })
      .catch( () => {
        this.$store.dispatch('user/setUser' , {});
        this.$cookie.remove(process.env.AUTH_TOKEN_NAME)
        this.$router.replace({name:'index'})
      });
    }
  },
}
</script>
