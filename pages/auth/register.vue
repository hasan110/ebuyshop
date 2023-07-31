<template>
  <div class="authenticate">
    <nuxt-link :to="{name:'index'}" class="p-2 float-left">
      <img style="width:100px" class="logo-top" src="~/assets/images/logo.svg">
    </nuxt-link>

    <br>
    <div class="form-out">
      <div class="form-in text-center">
        <h3>ثبت نام</h3>

        <div class="px-form-group">
          <label>لطفا شماره تلفن خود را وارد کنید</label>
          <input v-model="data.mobile_number" class="px-form-control text-center latin-input-3" placeholder="0 9 - - - - - - - - -" />
          <div v-if="errors.mobile_number" class="px-form-text">
            <small>{{errors.mobile_number[0]}}</small>
          </div>
        </div>

        <div class="px-form-group">
          <label>یک رمز عبور مناسب وارد کنید.</label>
          <div class="px-form-append">
            <input v-model="data.password" class="px-form-control text-center latin-input-3" :type="[show_password ? 'text' : 'password']" placeholder="رمز عبور" />
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

        <div v-if="step === 1" class="mb-4">
          <label>کد ارسال شده را وارد کنید.</label>
          <div class="px-form-group">
            <input v-model="data.code" class="px-form-control text-center latin-input-3" />
          </div>
          <div v-if="errors.code" class="px-form-text">
            <small>{{errors.code[0]}}</small>
          </div>
        </div>


        <div class="mb-4">
          <div class="a">قبلا ثبت نام کرده اید؟</div>
          <nuxt-link :to="{name:'auth-login'}" class="a">ورود</nuxt-link>
        </div>

        <div v-if="step === 0" class="mb-4">
          <button v-if="!loading" class="px-btn size-md block round primary" @click="registerByNumber">ثبت نام</button>
          <button v-else class="px-btn size-md primary round disabled block">ثبت نام</button>
        </div>
        <div v-if="step === 1" class="mb-4">
          <button v-if="!loading" class="px-btn size-md block round primary" @click="numberVerify">فعالسازی</button>
          <button v-else class="px-btn size-md primary round disabled block">فعالسازی</button>
        </div>

        <!-- <div class="text-center mb-2">
          رمز عبور خود را فراموش کرده اید؟  <router-link :to="{ name:'LoginByNumber' }" class="px-link">ورود با کد یکبار مصرف</router-link>
        </div>

        <div class="text-center mb-2">
          <router-link :to="{ name:'LoginByEmail' }" class="px-link">ورود با ایمیل</router-link>
        </div> -->
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Register',
  data : () => ({
    data:{
      mobile_number:'',
      password:'',
      from:'site',
      type:'register'
    },
    errorMessage:null,
    show_password:false,
    loading:false,
    step:0,
    errors:{}
  }),
  head() {
    return {
      title: this.getPageTitle('ثبت نام')
    }
  },
  mounted() {
    this.checkUnAuthenticated()
  },
  methods:{
    registerByNumber(){
      this.loading = true
      this.$axios.post(`registerByNumber` , this.data)
        .then( () => {
          this.step = 1
          this.loading = false
        })
        .catch(err => {
          if(err.response.data.message){
            this.errorMessage = err.response.data.message
            this.errors = {}
          }else if(err.response.data.errors){
            this.errors = err.response.data.errors
            this.errorMessage = null
          }
          this.loading = false
        });
    },
    numberVerify(){
      this.$axios.post(`numberVerify` , this.data)
        .then( res => {
          const data = res.data.data;
          this.$cookie.set("accesstoken", data.api_token , 60*60*24*365);
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
