<template>
  <div class="site-wrapper">
    <site-header>
      <template #action>
        سبد خرید
      </template>
    </site-header>
    <site-bottom-navigation></site-bottom-navigation>

    <div class="cart-steps-wrapper">
      <div class="cart-steps">
        <div class="cart-step" @click="step = 1">
          <img v-if="step >= 1" src="~/assets/images/icons/shopping_cart_active.svg">
          <div class="titr">سبد خرید</div>
        </div>
        <div class="cart-step">
          <img v-if="step >= 2" src="~/assets/images/icons/location_on_active.svg">
          <img v-else src="~/assets/images/icons/location_on.svg">
          <div class="titr">آدرس و ارسال</div>
        </div>
        <div class="cart-step">
          <img v-if="step >= 3" src="~/assets/images/icons/check_circle_active.svg">
          <img v-else src="~/assets/images/icons/check_circle.svg">
          <div class="titr">ثبت سفارش</div>
        </div>
      </div>
    </div>

    <div class="body-wrapper round shadow">
      <div class="body-inner py-4 px-1">

        <template v-if="step === 1">

          <template v-if="!loaded">
            <v-skeleton-loader
              v-for="(item , key) in 12" :key="key"
              type="card"
              :style="{marginBlock : '.75rem'}"
            ></v-skeleton-loader>
          </template>
          <template v-else>

            <div v-if="cart_products.length === 0" class="text-center grey--text lighten-5 py-10">
              <div>
                <v-icon large color="grey">mdi-information</v-icon>
              </div>
              سبد خرید شما خالی است.
            </div>

            <div v-for="(item , key) in cart_products" :key="key" class="mini-product-wrapper">
              <div class="picture">
                <img :src="FileUrl + item.files[0]['path']">
              </div>
              <div class="details">
                <nuxt-link :to="{name:'products-id-slug' , params : {id : item.uuid,slug : item.slug}}" class="name">{{ item.name }}</nuxt-link>
                <div class="store-name"><i class="mdi mdi-store"></i> {{ item.store.name }}</div>
                <div class="price">
                  {{formatPrice(item.price)}} تومان
                </div>
                <div class="count">
                  تعداد: {{item.cart_count}}
                </div>
              </div>
              <template v-if="item.discount">
                <div class="discount-label">
                  <bdi class="tape">
                    %{{item.discount}} تخفیف
                  </bdi>
                </div>
              </template>

              <div class="remove">
                <i class="mdi mdi-trash-can" @click="remove(item.uuid)"></i>
              </div>

            </div>
          </template>

          <div v-if="cart_products.length > 0" class="absolute-action-wrapper">
            <div class="absolute-action">
              <button class="px-btn size-md px-btn-primary block" @click="step = 2">ادامه خرید</button>
            </div>
          </div>

        </template>

        <template v-if="step === 2">
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field
                  v-model="order.fullname"
                  label="نام و نام خانوادگی تحویل گیرنده"
                ></v-text-field>
                <div v-if="errors.fullname" class="red--text lighten-1">
                  <small>{{errors.fullname[0]}}</small>
                </div>
              </v-col>

              <v-col cols="12" md="6" sm="12">
                <v-autocomplete
                  v-model="order.province"
                  :items="provinces"
                  outlined dense
                  label="استان"
                ></v-autocomplete>
                <div v-if="errors.province" class="red--text lighten-1">
                  <small>{{errors.province[0]}}</small>
                </div>
              </v-col>

              <v-col cols="12" md="6" sm="12">
                <v-autocomplete
                  v-model="order.city"
                  :items="cities"
                  outlined dense
                  label="شهر"
                ></v-autocomplete>
                <div v-if="errors.city" class="red--text lighten-1">
                  <small>{{errors.city[0]}}</small>
                </div>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="order.address"
                  outlined dense
                  label="آدرس پستی دقیق"
                ></v-textarea>
                <div v-if="errors.address" class="red--text lighten-1">
                  <small>{{errors.address[0]}}</small>
                </div>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="order.description"
                  outlined dense
                  label="توضیحات سفارش (شماره محصول , سایز , رنگ و ...)"
                ></v-textarea>
                <div v-if="errors.description" class="red--text lighten-1">
                  <small>{{errors.description[0]}}</small>
                </div>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="order.postal_code"
                  class="ltr" type="number"
                  label="کد پستی 10 رقمی"
                ></v-text-field>
                <div v-if="errors.postal_code" class="red--text lighten-1">
                  <small>{{errors.postal_code[0]}}</small>
                </div>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="order.call_number"
                  class="ltr"
                  label="شماره تماس"
                  :error-messages="errors.call_number"
                ></v-text-field>
              </v-col>

              <!-- <v-col
                cols="12"
                center
              >
              <v-radio-group
                v-model="order.shipping_type"
                row
                >
                <v-radio
                  color="orange"
                  label="ارسال عادی"
                  value="0"
                ></v-radio>
                <v-radio
                  color="orange"
                  label="ارسال پیشتاز"
                  value="1"
                ></v-radio>
              </v-radio-group>
              </v-col> -->

            </v-row>
          </v-container>

          <div class="absolute-action-wrapper">
            <div class="absolute-action">
              <button v-if="canSubmit" class="px-btn size-md px-btn-primary block" :class="[loading ? 'loading' : '']" @click="submitOrder()">ادامه خرید</button>
              <button v-else class="px-btn size-md px-btn-primary disabled block" @click="showErrorToast()">ادامه خرید</button>
            </div>
          </div>

        </template>

        <template v-if="step === 3">
          <div class="order-done">
            <div class="icon">
              <i class="mdi mdi-check-circle"></i>
            </div>
            <div class="text">
              ثبت سفارش با موفقیت انجام شد.
            </div>

            <div class="order-total-price">
              <div>مبلغ قابل پرداخت:</div>
              <div>{{ formatPrice(saved_order.total_amount) }} تومان</div>
            </div>

            <div class="order-details-wrapper">
              <div class="order-details-item">
                <span>مبلغ کل محصولات:</span>
                <span>{{ formatPrice(saved_order.invoice_amount) }} تومان</span>
              </div>
              <div class="order-details-item">
                <span>هزینه ارسال:</span>
                <span v-if="saved_order.shipping_cost">{{ formatPrice(saved_order.shipping_cost) }} تومان</span>
                <span v-else>رایگان</span>
              </div>
            </div>

            <div class="descriptions">
              <ul>
                <li>
                  سفارش شما در انتظار تایید فروشنده می باشد.
                </li>
                <br>
                <li>
                  درصورت تایید فروشنده، از طریق پیامک به شما اطلاع رسانی می گردد و شما می بایست مبلغ سفارش را پرداخت کنید تا سفارش شما ارسال گردد.
                </li>
              </ul>
            </div>
          </div>

          <div class="absolute-action-wrapper">
            <div class="absolute-action">
              <nuxt-link :to="{name:'orders-active'}" class="px-btn size-md px-btn-primary block">فهمیدم</nuxt-link>
            </div>
          </div>

        </template>

      </div>
    </div>


  </div>
</template>
<script>

import cities from '~/plugins/cities'
import provinces from '~/plugins/provinces'
export default {
  name: 'Cart',
  data : () => ({
    cart_products:[],
    step:1,
    saved_order:{},
    order:{},
    errors:{},
    cities,
    provinces,
    loading:false,
    loaded:false
  }),
  head() {
    return {
      title: this.getPageTitle('تکمیل خرید')
    }
  },
  computed:{
    canSubmit(){
      let allow = true;
      if(!this.order.fullname){allow = false}
      if(!this.order.province){allow = false}
      if(!this.order.city){allow = false}
      if(!this.order.address){allow = false}
      if(!this.order.postal_code){allow = false}
      return allow;
    }
  },
  mounted() {
    window.scrollTo(0 , 0);
    this.getCartProducts()
    this.setInvoiceData()
  },
  methods: {
    getCartProducts (){
      const cart = this.$cookie.get("cart");
      if(!cart)
      {
        this.loaded = true
        return false;
      }

      return this.$axios.post(`get_cart_products` , {products : cart})
        .then(res => {
          this.cart_products = res.data.data
          this.loaded = true
        })
        .catch( () => {
          this.loaded = true
        });
    },
    remove(uuid){
      const cart = this.$cookie.get("cart");
      if(!cart)
      {
        return false;
      }

      for (let i = 0; i < cart.length; i++) {

        if(cart[i].product_id === uuid){
          cart.splice(i, 1);
        }
      }
      this.$cookie.set("cart", JSON.stringify(cart) , 60*60*24*30);
      this.getCartProducts()
    },
    setInvoiceData (){
      const userData = this.$store.state.user.USER;
      if(userData !== undefined && userData !== null)
      {
        this.order.fullname = userData.fullname
        this.order.call_number = userData.mobile_number
      }
    },
    showErrorToast(){
      this.$toast.error('لطفا تمامی فیلد ها را با دقت پر کنید.');
    },
    submitOrder (){
      const cart = this.$cookie.get("cart");
      if(!cart)
      {
        return false;
      }
      this.loading = false
      this.order.products = cart
      const token = this.getToken()
      return this.$axios.post(`submit_order` , this.order,
        {
          headers: {
            'x-api-key':token
          }
        })
        .then(res => {
          this.saved_order = res.data.data
          this.step = 3
          this.loading = false
          this.$cookie.remove('cart')
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
    },
  }
}
</script>
