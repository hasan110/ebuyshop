
<template>
  <div class="site-wrapper">
    <site-header>
      <template #action>
        اطلاعات کاربری
      </template>
    </site-header>
    <site-bottom-navigation></site-bottom-navigation>

    <div class="body-wrapper round shadow">
      <div class="body-inner py-4">

        <div class="profile">

          <div class="credit-wrapper">
            <div class="credit">
              <div class="titr">اعتبار شما:</div>
              <div class="amount">{{ formatPrice($store.state.user.USER.cash) }} تومان</div>
              <div class="icon">
                <img src="~/assets/images/icons/wallet-flat.png">
              </div>
            </div>

            <div class="text-center">
              <button class="px-btn size-md px-btn-primary" @click="add_credit_modal = true">افزایش اعتبار</button>
            </div>
          </div>

          <div class="profile-item">
            <div class="icon">
              <img src="~/assets/images/icons/person.png">
            </div>
            <div class="content">
              <div v-if="$store.state.user.USER.fullname">{{$store.state.user.USER.fullname}}</div>
              <div v-else class="grey--text lighten-5">نام و نام خانوادگی</div>
            </div>
            <div class="actions">
              <img src="~/assets/images/icons/edit.png" @click="edit_profile_modal = true">
            </div>
          </div>
          <div class="profile-hr"></div>

          <div class="profile-item">
            <div class="icon">
              <img src="~/assets/images/icons/number_keyboard.png">
            </div>
            <div class="content">
              <bdi>{{$store.state.user.USER.mobile_number}}</bdi>
            </div>
            <div class="actions">
            </div>
          </div>
          <div class="profile-hr"></div>

          <div class="profile-item">
            <div class="icon">
              <img src="~/assets/images/icons/location.png">
            </div>
            <div class="content">
              <pre v-if="$store.state.user.USER.address">{{$store.state.user.USER.address}}</pre>
              <div v-else class="grey--text lighten-5">آدرس</div>
            </div>
            <div class="actions">
              <img src="~/assets/images/icons/edit.png" @click="edit_profile_modal = true">
            </div>
          </div>

          <div class="profile-hr"></div>
          <div class="py-5"></div>
          <br>
          <br>
          <br>

          <div class="profile-hr"></div>
          <div class="profile-item">
            <div class="icon">
              <img src="~/assets/images/icons/cart.png">
            </div>
            <div class="content">
              <a v-if="$store.state.user.USER.is_seller" target="_blank" href="https://seller.e-buy-shop.com">ورود پنل فروش</a>
              <nuxt-link v-else :to="{name : 'auth-register-seller'}">درخواست پنل فروش</nuxt-link>
            </div>
            <div class="actions">
            </div>
          </div>

          <div class="profile-hr"></div>
          <div class="profile-item">
            <div class="icon">
              <img src="~/assets/images/icons/heart.png">
            </div>
            <div class="content">
              <nuxt-link :to="{name : 'favorites'}">علاقه مندی ها</nuxt-link>
            </div>
            <div class="actions">
            </div>
          </div>

          <div class="profile-hr"></div>
          <div class="profile-item">
            <div class="icon">
              <img src="~/assets/images/icons/history.png">
            </div>
            <div class="content">
              <nuxt-link :to="{name : 'orders-history'}">تاریخجه خریدها</nuxt-link>
            </div>
            <div class="actions">
            </div>
          </div>
          <div class="profile-hr"></div>

          <div class="profile-item">
            <div class="icon">
              <img src="~/assets/images/icons/hammer.png">
            </div>
            <div class="content">
              <nuxt-link :to="{name : 'rules'}">قوانین</nuxt-link>
            </div>
            <div class="actions">
            </div>
          </div>
          <div class="profile-hr"></div>

          <div class="profile-item" @click="logout_modal = true">
            <div class="icon">
              <img src="~/assets/images/icons/hammer.png">
            </div>
            <div class="content">
              <div>خروج از حساب</div>
            </div>
            <div class="actions">
            </div>
          </div>
          <div class="profile-hr"></div>

        </div>

      </div>
    </div>

    <v-dialog
      v-model="logout_modal"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>خروج از حساب کاربری</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                می خواهید از حساب خود خارج شوید؟
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <button class="px-btn size-md px-btn-danger mx-3" @click="logout_modal = false">انصراف</button>
          <button class="px-btn size-md px-btn-primary" @click="logoutUser()">خروج</button>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="edit_profile_modal"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>ویرایش پروفایل</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field
                  v-model="user.fullname"
                  outlined
                  label="نام و نام خانوادگی"
                  required
                  dense
                ></v-text-field>
                <div v-if="errors.fullname" class="red--text lighten-1">
                  <small>{{errors.fullname[0]}}</small>
                </div>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="user.address"
                  outlined
                  label="آدرس"
                  required
                  dense
                ></v-textarea>
                <div v-if="errors.address" class="red--text lighten-1">
                  <small>{{errors.address[0]}}</small>
                </div>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <button class="px-btn size-md px-btn-danger mx-3" @click="edit_profile_modal = false">انصراف</button>
          <button v-if="!loading" class="px-btn size-md px-btn-primary" @click="saveUser()">ثبت</button>
          <button v-else class="px-btn size-md px-btn-primary disabled">ثبت</button>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="add_credit_modal"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>افزایش اعتبار</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field
                  v-model="add_credit.amount"
                  class="ltr"
                  outlined type="number"
                  label="مبلغ"
                  dense :error-messages="errors.amount"
                ></v-text-field>
                <div class="text-left">{{ add_credit.amount ? formatPrice(add_credit.amount) : 0 }} تومان</div>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <button class="px-btn size-md px-btn-danger mx-3" @click="add_credit_modal = false">انصراف</button>
          <button v-if="!loading" class="px-btn size-md px-btn-primary" @click="addCredit()">ادامه</button>
          <button v-else class="px-btn size-md px-btn-primary disabled">ادامه</button>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
export default {
  name: 'Profile',
  data : () => ({
    errors:{},
    user:{},
    add_credit:{},
    loading:false,
    logout_modal:false,
    edit_profile_modal:false,
    add_credit_modal:false,
  }),
  head() {
    return {
      title: this.getPageTitle('اطلاعات کاربری')
    }
  },
  created() {
    this.checkAuth();
  },
  mounted() {
    this.getUser();
    window.scrollTo(0 , 0);
  },
  methods: {
    logoutUser(){
      this.$cookie.remove('accesstoken')
      this.$store.dispatch('user/setUser' , {});
      this.$router.replace({name:'index'});
    },
    getUser(get = false){
      const token = this.getToken()
      this.$axios.post(`getUserData`,{},
        {
          headers: {
            'api_token':token
          }
        })
        .then(res => {
          const data = res.data.data;
          this.user = data
          if(get){
            this.$store.dispatch('user/setUser' , data);
          }
        })
        .catch( () => {
        });
    },
    saveUser(){
      this.loading = true
      const token = this.getToken()
      this.$axios.post(`fast_update_profile`,this.user,
        {
          headers: {
            'api_token':token
          }
        })
        .then(res => {
          this.$toast.success(res.data.message);
          this.getUser(true);
          this.edit_profile_modal = false;
          this.loading = false
        })
        .catch(err => {
          const error = err.response.data;
          if(error.message){
            this.$toast.error(error.message);
          }else{
            this.errors = error.errors
          }
          this.loading = false
        });
    },
    addCredit(){
      this.loading = true
      const token = this.getToken()
      this.$axios.post(`add_credit`,this.add_credit,
        {
          headers: {
            'api_token':token
          }
        })
        .then(res => {
          location.href = res.data.data
        })
        .catch(err => {
          this.loading = false
          const error = err.response.data;
          if(error.message){
            this.$toast.error(error.message);
          }else{
            this.errors = error.errors
          }
        });
    }
  }
}
</script>
