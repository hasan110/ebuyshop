
<template>
  <div class="site-wrapper">
    <site-header>
      <template #action>
        جزییات سفارش
      </template>
    </site-header>
    <site-bottom-navigation></site-bottom-navigation>

    <div class="body-wrapper">
      <div class="body-inner py-3 px-2">


        <template v-if="loading">
          <v-skeleton-loader
            v-for="(item , key) in 12" :key="key"
            type="card"
            :style="{marginBlock : '.75rem'}"
          ></v-skeleton-loader>
        </template>
        <template v-else>

          <div v-if="parseInt(order_detail.status) === 5" class="px-3">
            <v-alert
              outlined
              type="error"
              prominent
              border="left"
            >
              این سفارش توسط فروشنده لغو شده است.
            </v-alert>
          </div>
          <div v-if="parseInt(order_detail.status) === 0" class="px-3">
            <v-alert
              outlined
              type="warning"
              prominent
              border="left"
            >
              توجه: سفارش شما ابتدا باید توسط فروشنده تایید شود. سپس باید هزینه سفارش را پرداخت کنید تا فروشنده مرسوله شما را ارسال نماید.
            </v-alert>
          </div>

          <div v-if="parseInt(order_detail.status) === 1" class="text-center pb-5">
            <div><button class="px-btn size-md warning" @click="pay_modal = true">پرداخت سفارش</button></div>
          </div>

          <div v-if="parseInt(order_detail.status) === 2" class="p-2" >
            <v-alert
              outlined
              type="success"
              text style="font-size:12px"
            >
              شما هزینه این سفارش را پرداخت کرده اید. فروشنده در حال آماده سازی و ارسال سفارش شماست.
            </v-alert>
          </div>

          <div v-if="parseInt(order_detail.status) === 3" class="p-2">
            <v-alert
              outlined
              type="success"
              text style="font-size:12px"
            >
              سفارش شما توسط فروشنده آماده ارسال شده است. ادمین در کمترین زمان ممکن اقدامات لازم برای ارسال سفارش شما را انجام خواهد داد.
            </v-alert>
          </div>

          <div class="p-2">
            <div class="order-detail-box">

              <div class="o-row">
                <div class="o-col">وضعیت سفارش</div>
                <div class="o-col">{{ order_detail.status_title }}</div>
              </div>
              <div class="o-row">
                <div class="o-col">کد سفارش</div>
                <div class="o-col">{{ order_detail.id }}</div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">شناسه سفارش</div>
                <div class="o-col">{{ order_detail.uuid }}</div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">تحویل گیرنده</div>
                <div class="o-col">{{ order_detail.fullname }}</div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">استان</div>
                <div class="o-col">{{ order_detail.province }}</div>
              </div>

              <div class="o-row">
                <div class="o-col">شهر</div>
                <div class="o-col">{{ order_detail.city }}</div>
              </div>

              <div class="o-row">
                <div class="o-col">کد پستی</div>
                <div class="o-col">{{ order_detail.postal_code }}</div>
              </div>

              <div class="o-row">
                <div class="o-col">آدرس</div>
                <div class="o-col"><pre>{{ order_detail.address }}</pre></div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">شماره تماس</div>
                <div class="o-col"><bdi>{{ order_detail.call_number }}</bdi></div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">هزینه ارسال</div>
                <div class="o-col"><bdi>{{ formatPrice(order_detail.shipping_cost) }} تومان</bdi></div>
              </div>
              <div class="o-row">
                <div class="o-col">مبلغ فاکتور</div>
                <div class="o-col"><bdi>{{ formatPrice(order_detail.invoice_amount) }} تومان</bdi></div>
              </div>
              <div class="o-row">
                <div class="o-col">مجموع</div>
                <div class="o-col"><bdi>{{ formatPrice(order_detail.total_amount) }} تومان</bdi></div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">تاریخ</div>
                <div class="o-col"><bdi>{{ order_detail.date }}</bdi></div>
              </div>
              <div class="o-row">
                <div class="o-col">ساعت</div>
                <div class="o-col"><bdi>{{ order_detail.time }}</bdi></div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">توضیحات</div>
                <div class="o-col"><pre>{{ order_detail.description }}</pre></div>
              </div>

              <br><br>
              <v-simple-table>
                <template #default>
                  <thead>
                  <tr>
                    <th>نام محصول</th>
                    <th>تعداد</th>
                    <th>جمع هزینه</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                    v-for="item in order_detail.items"
                    :key="item.id"
                  >
                    <td>{{ item.store_product.name }}</td>
                    <td>{{ item.count }}</td>
                    <td>{{ formatPrice(item.cost) }} تومان</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>

            </div>
          </div>

        </template>

      </div>
    </div>
    <v-dialog
      v-model="pay_modal"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>پرداخت سفارش</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                از پرداخت هزینه سفارش اطمینان دارید؟.
              </v-col>

              <v-col cols="12">
                <div class="d-flex justify-space-between">
                  <span>قابل پرداخت</span>
                  <span>{{ formatPrice(order_detail.total_amount) }} تومان</span>
                </div>
                <hr>
                <div class="d-flex justify-space-between">
                  <span>اعتبار کیف پول</span>
                  <span>{{ formatPrice($store.state.user.USER.cash) }} تومان</span>
                </div>
                <hr>
              </v-col>
              <v-col cols="12">
                <h4>انتخاب شیوه پرداخت</h4>
                <v-radio-group v-model="pay_type">
                  <v-radio :disabled="parseFloat(order_detail.total_amount) > parseFloat($store.state.user.USER.cash) ? true : false" label="اعتبار کیف پول" :value="1"></v-radio>
                  <v-radio label="درگاه پرداخت" :value="2"></v-radio>
                </v-radio-group>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <button class="px-btn size-md px-btn-danger mx-3" @click="pay_modal = false">انصراف</button>

          <button v-if="pay_loading" class="px-btn size-md warning loading disabled">پرداخت</button>
          <button v-if="!pay_loading" class="px-btn size-md warning" @click="pay()">پرداخت</button>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
export default {
  name: 'OrderDetails',
  data : () => ({
    errors:{},
    order_id:null,
    order_detail:{},
    loading:true,
    pay_modal:false,
    delivered_modal:false,
    delivered_loading:false,
    pay_loading:false,
    pay_type:null,
  }),
  head() {
    return {
      title: this.getPageTitle('جزئیات سفارش')
    }
  },
  created() {
    this.checkAuth();

    if(this.$route.params.id !== ''){
      this.order_id = this.$route.params.id;
      this.getOrderDetails()
    }else{
      this.$router.replace({name:'orders-history'});
    }
  },
  mounted() {
    window.scrollTo(0 , 0);
  },
  methods: {
    pay(){
      if(this.pay_type === 1){
        return this.payOrderByCash();
      }else if(this.pay_type === 2){
        return this.payOrder();
      }else{
        this.$toast.error('لطفا ابتدا شیوه پرداخت خود را انتخاب نمایید.');
      }
    },
    getOrderDetails(){
      const apiToken = this.getToken();
      this.$axios.get(`get_order_details/`+this.order_id,
        {
          headers: {
            'api_token':apiToken
          }
        })
        .then(res => {
          const data = res.data.data;
          this.order_detail = data
          this.loading = false
        })
        .catch( () => {
          this.$router.replace({name:'orders-history'})
        });
    },
    payOrder(){
      this.pay_loading = true
      const apiToken = this.getToken();
      this.$axios.post(`pay_order`,{order_id:this.order_id},
        {
          headers: {
            'api_token':apiToken
          }
        })
        .then(res => {
          location.href = res.data.data
        })
        .catch( err => {
          this.pay_loading = false
          const error = err.response.data;
          if(error.message){
            this.$toast.error(error.message);
          }else{
            this.errors = error.errors
          }
        });
    },
    payOrderByCash(){
      this.pay_loading = true
      const apiToken = this.getToken();
      this.$axios.post(`cash_pay_order`,{order_id:this.order_id},
        {
          headers: {
            'api_token':apiToken
          }
        })
        .then( () => {
          location.reload()
        })
        .catch( err => {
          this.pay_loading = false
          const error = err.response.data;
          if(error.message){
            this.$toast.error(error.message);
          }else{
            this.errors = error.errors
          }
        });
    },
  },
}
</script>
<style>
.v-label{
  margin-bottom: 0 !important;
}
</style>
