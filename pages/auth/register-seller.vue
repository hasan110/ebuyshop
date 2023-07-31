
<template>
  <div class="site-wrapper">
    <site-header>
      <template #action>
        درخواست پنل فروش
      </template>
    </site-header>
    <site-bottom-navigation></site-bottom-navigation>

    <div class="body-wrapper round shadow">
      <div class="body-inner py-4">

        <div class="profile">
          <div style="text-align: justify;">در صورتی که می خواهید در پنل فروشنده ثبت نام کنید ابتدا
            <router-link :to="{name:'sale-rules'}">قوانین</router-link>
            آن را مطالعه کرده و سپس از طریق فرم زیر درخواست خود را ارسال کنید.</div>
          <v-checkbox v-model="agreement" label="موافقت با قوانین"></v-checkbox>

          <div class="text-center">

            <button v-if="!agreement" class="px-btn size-md round disabled" @click="alertRule">ثبت نام در پنل فروش</button>
            <button v-else-if="loading" class="px-btn size-md round primary loading">ثبت نام در پنل فروش</button>
            <button v-else class="px-btn size-md round primary" @click="sellerRegister()">ثبت نام در پنل فروش</button>

          </div>
          <div v-if="success" class="text-center">
            <div class="py-5">از طریق لینک زیر وارد پنل فروش خود شوید.</div>
            <a target="_blank" href="https://seller.e-buy-shop.com" class="px-btn size-md round block success">ورود به پنل فروش</a>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'RegisterSeller',
  data : () => ({
    errors:{},
    user:{},
    agreement:false,
    loading:false,
    edit_profile_modal:false,
    add_credit_modal:false,
    success:false,
  }),
  head() {
    return {
      title: this.getPageTitle('پنل فروشندگان')
    }
  },
  created() {
    this.checkAuth();
  },
  mounted() {
    window.scrollTo(0 , 0);
  },
  methods: {
    sellerRegister(){
      this.loading = true
      const token = this.getToken()
      this.$axios.get(`sellerRegister`,
        {
          headers: {
            'api_token':token
          }
        })
        .then( () => {
          this.$toast.success('تبریک! شما در پنل فروش ثبت شدید.');
          this.success = true;
          this.loading = false
        })
        .catch( err => {
          const error = err.response.data;
          if(error.message){
            this.$toast.error(error.message);
          }else{
            this.errors = error.errors
          }
          this.loading = false
        });
    },
    alertRule(){
      this.$toast.error('لطفا ابتدا با قوانین فروش موافقت کنید.');
    }
  }
}
</script>
