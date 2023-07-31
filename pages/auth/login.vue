<template>
  <div class="authenticate">
    <nuxt-link :to="{name:'index'}" class="p-2 float-left">
      <img style="width:100px" class="logo-top" src="~/assets/images/logo.svg">
    </nuxt-link>
    <div class="p-2 float-right">
      <nuxt-link :to="{name:'auth-register'}" class="px-btn size-md round primary">
        ثبت نام
      </nuxt-link>
    </div>

    <br>
    <div class="form-out">
      <div class="form-in text-center">
        <h3>ورود</h3>

        <div class="px-form-group">
          <label>لطفا شماره تلفن خود را وارد کنید</label>
          <input v-model="data.mobile_number" class="px-form-control text-center latin-input-3" placeholder="0 9 - - - - - - - - -" />
          <div v-if="errors.mobile_number" class="px-form-text">
            <small>{{errors.mobile_number[0]}}</small>
          </div>
        </div>

        <div class="px-form-group">
          <div class="px-form-append">
            <input v-model="data.password" :type="[show_password ? 'text' : 'password']" class="px-form-control text-center latin-input-3" placeholder="رمز عبور" />
            <span class="px-form-icon" @click="show_password = !show_password">
              <i v-if="show_password" class="fa fa-eye"></i>
              <i v-else class="fa fa-eye-slash"></i>
            </span>
          </div>
          <div v-if="errors.password" class="px-form-text">
            <small>{{errors.password[0]}}</small>
          </div>
        </div>

        <div v-if="errorMessage" class="px-alert danger round mb-3">
          <small>{{errorMessage}}</small>
        </div>

        <div class="mb-4">
          <div class="a">حساب کاربری ندارید؟</div>
          <nuxt-link :to="{name:'auth-register'}" class="a">ثبت نام کنید</nuxt-link>
        </div>

        <div class="mb-4">
          <button class="px-btn size-md block round primary" @click="LoginByPassword">ورود</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'LoginByPassword',
  data : () => ({
    data:{
      mobile_number:'',
      password:'',
      from:'site',
      type:'login'
    },
    active_tab:'password',
    errorMessage:null,
    show_password:false,
    errors:{}
  }),
  head() {
    return {
      title: this.getPageTitle('ورود')
    }
  },
  mounted() {
    this.checkUnAuthenticated()
  },
  methods:{
    LoginByPassword(){
      this.$axios.post(`loginByNumber` , this.data)
        .then( res => {
          const data = res.data.data;
          this.$cookie.set('accesstoken', data.api_token , 60*60*24*365);
          this.$store.dispatch('user/setUser' , data);
          this.$router.replace({name:'index'});
        })
        .catch(err => {
          if(err.response.data.message){
            this.errorMessage = err.response.data.message
            this.errors = {}
          }else if(err.response.data.errors){
            this.errors = err.response.data.errors
            this.errorMessage = null
          }
        });
    }
  }
}
</script>
