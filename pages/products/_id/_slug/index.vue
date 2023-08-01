
<template>
  <div class="site-wrapper">
    <site-header>
      <template #action>
        <v-row
          align="center"
          justify="center"
        >
          <v-icon color="dark" @click="share_modal = true">mdi-share-variant</v-icon>
          <div class="mx-2"></div>
          <v-icon v-if="product.is_favorite" color="red" @click="toggleFavorite()">mdi-heart</v-icon>
          <v-icon v-else @click="toggleFavorite()">mdi-heart</v-icon>
        </v-row>
      </template>
    </site-header>
    <site-bottom-navigation></site-bottom-navigation>

    <div class="body-wrapper round shadow">
      <div class="body-inner">

        <div class="product-details">

          <div class="images-wrapper">
            <ssr-carousel v-if="loaded" :slides-per-page='1' show-dots show-arrows>
              <img v-for="(item , key) in product.files" :key="key" :src="FileUrl + item.path">
            </ssr-carousel>
            <template v-else>
              <v-skeleton-loader
                type="image"
              ></v-skeleton-loader>
            </template>
          </div>

          <div class="px-2">
            <h4 class="mt-3">{{product.name}}</h4>

            <h4 class="price-wrapper">
              <div>
                <template v-if="product.discount">
                  <strike>{{formatPrice(product.price_before_off)}} تومان</strike>
                </template>
              </div>
              <div>{{formatPrice(product.price)}} تومان</div>
            </h4>
            <h4 v-if="product.discount" class="discount-wrapper">
              <bdi class="discount">
                {{product.discount}}% تخفیف
              </bdi>
            </h4>

            <pre ref="desc" :class="[show_more ? 'h-160' : 'h-auto']" class="desc-wrapper">{{product.description}}</pre>
            <div v-if="is_over" class="text-center">
              <a @click="showMore()">
                <template v-if="!show_more">کمتر <i class="fa fa-angle-up"></i></template>
                <template v-else>مشاهده بیشتر <i class="fa fa-angle-down"></i></template>
              </a>
            </div>

            <div class="details-wrapper borderless py-4">

              <div v-if="parseInt(product.inventory)">
                موجودی : {{product.inventory}} عدد
              </div>
              <div v-else>
                <v-tooltip top>
                  <template #activator="{ on, attrs }">
                    <div
                      class="red--text lighten-1"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon large color="red">mdi-information</v-icon>
                      ناموجود
                    </div>
                  </template>
                  <span>موجودی این محصول به اتمام رسیده است.</span>
                </v-tooltip>
              </div>

              <div v-if="product.store" class="shipment-wrapper">
                <img src="~/assets/images/icons/delivery-truck-svgrepo-com.svg">
                ارسال در {{product.store.shipping_time}}
              </div>

            </div>

            <div class="details-wrapper">
              <router-link v-if="product.store" :to="{name:'stores-id' , params:{id : product.store.uuid}}" class="detail-item">
                <img src="~/assets/images/icons/store.svg">
                <template v-if="product.store">
                  {{product.store.name}}
                </template>
              </router-link>
              <button class="detail-item" @click="add_comment_modal = true">
                ثبت نظر
                <img src="~/assets/images/icons/comment.svg">
              </button>
            </div>

            <div class="actions-wrapper">
              <div class="second">
                <button class="px-btn size-md block px-btn-info" @click="allow_chat_modal = true">
                  گفت و گو با فروشنده
                  <i class="mdi mdi-forum mx-1" style="font-size: 1.5rem;"></i>
                </button>
              </div>
              <div class="first">
                <button class="px-btn size-md block px-btn-danger">
                  گزارش
                  <i class="mdi mdi-information mx-1" style="font-size: 1.5rem;"></i>
                </button>
              </div>
            </div>

            <h4>نظرات کاربران</h4>
            <div class="comments-wrapper draggable">
              <template v-if="product.comments && product.comments.length">
                <div v-for="(item , key) in product.comments" :key="key" class="comment" @click="show_comment = item , show_comment_modal = true">
                  <div class="commentor">{{item.user}}</div>
                  <div class="content">
                    <p>{{item.text}}</p>
                  </div>
                  <div class="stars">
                    <i v-for="(star , k) in parseInt(item.stars)" :key="k" class="mdi mdi-star"></i>
                  </div>
                </div>
              </template>
              <div v-else class="placeholder">
                هنوز نظری برای این محصول ثبت نشده است.
              </div>

            </div>
          </div>

        </div>

        <div class="py-3 px-1">
          <div class="section-5">

            <h3 class="text-light">محصولات مشابه</h3>
            <div class="section-5-inner draggable">
              <template v-if="!loaded">
                <v-skeleton-loader
                  v-for="(item , key) in 6" :key="key"
                  type="card"
                  :style="{flexBasis : '250px' , paddingLeft : '1rem'}"
                  min-width="250"
                ></v-skeleton-loader>
              </template>
              <template v-else>
                <div v-if="product.same_products && product.same_products.length <= 0" class="placeholder1">
                  محصول مشابهی یافت نشد
                </div>
                <Product
                  v-for="(item , key) in product.same_products"
                  v-else
                  :key="key"
                  bg
                  :product="item"
                ></Product>
              </template>
            </div>
          </div>
        </div>

        <br><br><br><br>

      </div>

      <v-dialog
        v-model="add_comment_modal"
        width="500"
      >
        <template v-if="!$store.state.user.USER">
          <v-card>
            <v-card-title class="">
              <v-spacer></v-spacer>
              <v-btn
                fab
                small
                @click="add_comment_modal = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <div class="text-center py-10">
              <div>
                برای ثبت نظر ابتدا وارد سایت شوید.
              </div>
              <div class="py-10">
                <router-link :to="{name : 'auth-login'}" class="px-btn size-md px-btn-primary">ورود</router-link>
              </div>
            </div>
          </v-card>
        </template>
        <v-card v-else>
          <v-card-title class="grey lighten-2">
            ثبت نظر
          </v-card-title>

          <v-card-text>
            <div class="text-center py-10">
              <v-rating
                v-model="comment.stars"
                color="warning"
                background-color="warning"
                hover
                length="5"
                size="45"
              ></v-rating>

              <div v-if="errors.stars" class="red--text lighten-1">
                <small>از ۱ تا ۵ لطفا ستاره دهید.</small>
              </div>
            </div>

            <div class="px-form-group">
              <label for="">متن نظر</label>
              <textarea v-model="comment.text" rows="5" class="px-form-control"></textarea>
              <div v-if="errors.text" class="red--text lighten-1">
                <small>متن نظر الزامی است.</small>
              </div>
            </div>

          </v-card-text>

          <v-divider class="my-0"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <button class="px-btn size-md px-btn-danger" @click="add_comment_modal = false">انصراف</button>
            <button v-if="!loading" class="px-btn size-md px-btn-primary mx-3" @click="addComment()">ثبت نظر</button>
            <button v-else class="px-btn size-md loading disabled mx-3"></button>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="show_comment_modal"
        width="500"
      >
        <v-card>
          <v-card-title class="grey lighten-2">
            {{show_comment.user}}
          </v-card-title>
          <div class="p-2">
            <pre>{{show_comment.text}}</pre>
          </div>

          <v-divider class="my-0"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <button class="px-btn size-md px-btn-danger" @click="show_comment_modal = false">بستن</button>
          </v-card-actions>

        </v-card>
      </v-dialog>

      <v-dialog
        v-model="add_to_cart_modal"
        width="500"
      >
        <v-card>
          <v-card-title class="grey lighten-2">
            افزودن به سبد خرید
          </v-card-title>
          <div v-if="product.inventory" class="px-10 pb-4 pt-10">
            <v-text-field
              v-model="add_to_cart.count"
              readonly label="تعداد" outlined
              append-outer-icon="mdi-minus" dense
              prepend-icon="mdi-plus"
              @click:append-outer="decrement"
              @click:prepend="increment"
            >
            </v-text-field>
          </div>
          <div v-else class="text-center py-10">
            موجودی این محصول به اتمام رسیده است.
          </div>

          <v-divider class="my-0"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <button class="px-btn size-md px-btn-danger" @click="add_to_cart_modal = false">بستن</button>
            <span v-if="product.inventory">
              <button v-if="!loading" class="px-btn size-md px-btn-primary mx-3" @click="addToCart()">افزودن</button>
              <button v-else class="px-btn size-md loading disabled mx-3"></button>
            </span>
          </v-card-actions>

        </v-card>
      </v-dialog>

      <v-dialog
        v-model="allow_chat_modal"
        width="500"
      >
        <v-card>
          <v-card-title class="grey lighten-2">
            گفت و گو با فروشنده
          </v-card-title>

          <div class="pa-4">آیا مطمئنید می خواهید با فروشنده گفت و گویی داشته باشید؟</div>

          <v-divider class="my-0"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <button class="px-btn size-md px-btn-danger" @click="allow_chat_modal = false">خیر</button>
            <button v-if="!loading" class="px-btn size-md px-btn-primary mx-3" @click="goToChat()">بله</button>
            <button v-else class="px-btn size-md loading disabled mx-3"></button>
          </v-card-actions>

        </v-card>
      </v-dialog>


    </div>

    <div class="absolute-action-wrapper">
      <div class="absolute-action">
        <button class="px-btn size-md px-btn-info block" @click="add_to_cart_modal = true">افزودن به سبد خرید</button>
      </div>
    </div>

  </div>
</template>
<script>
import Product from '~/components/Product.vue'
export default {
  name: 'ProductData',
  components:{
    Product
  },
  async asyncData({$axios , route}) {
    const productId = route.params.id;
    return await $axios.get(`get_product_data/${productId}`)
    .then( res => {
      return { product : res.data.data }
    })
    .catch( () => {
      return {
        product : null
      }
    });
  },
  data : () => ({
    product_id:null,
    comment:{},
    show_comment:{},
    errors:{},
    show_comment_modal: false,
    add_comment_modal: false,
    loading: false,
    share_modal: false,
    add_to_cart_modal: false,
    allow_chat_modal: false,
    loaded:false,
    is_over:false,
    show_more:false,
    toggle_favorite_loading:false,
    add_to_cart:{
      count:1
    }
  }),
  head() {
    return {
      title: this.getPageTitle(this.product.name),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.product.description
        }
      ]
    }
  },
  updated() {
    this.applyScrollingEffect();
  },
  mounted() {
    if(this.product && this.product.id !== undefined){
      this.product_id = this.$route.params.id;
      setTimeout(() => {
        const h = this.$refs.desc.clientHeight;
        if(h > 160)
        {
          this.is_over = true
          this.show_more = true
        }
      } , 200)
      this.loaded = true
    }else{
      this.$router.replace({name:'index'});
    }

  },
  methods: {
    addComment (){
      this.loading = true
      this.comment.product_id = this.product_id;
      const token = this.getToken()
      return this.$axios.post(`product/add_comment` , this.comment,
        {
          headers: {
            'x-api-key':token
          }
        })
        .then( () => {

          this.$toast.success('نظر شما با موفقیت ثبت شد و پس از تایید منتشر خواهد شد.');

          this.add_comment_modal = false
          this.comment = {}
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
    toggleFavorite (){
      this.toggle_favorite_loading = true
      const token = this.getToken()
      return this.$axios.post(`product/toggle_favorite` , {product_id : this.product_id},
        {
          headers: {
            'x-api-key':token
          }
        })
        .then( () => {
          this.product.is_favorite = !this.product.is_favorite
          this.toggle_favorite_loading = false
        })
        .catch( err => {
          const error = err.response.data;
          if(error.message){
            this.$toast.warning('لطفا ابتدا وارد سایت شوید.');
          }else{
            this.errors = error.errors
          }
          this.toggle_favorite_loading = false
        });
    },
    addToCart (){
      this.add_to_cart.product_id = this.product.uuid;
      const cart = this.$cookie.get("cart");
      if(cart)
      {
        let isInCart = false;
        let repeatitive;
        cart.forEach(element => {
          if(element.product_id === this.product.uuid){
            isInCart = true
            repeatitive = element;
          }
        });
        if(isInCart){
          const index = cart.indexOf(repeatitive);
          cart.splice(index, 1);
        }
        cart.push(this.add_to_cart);
        this.$cookie.set("cart", JSON.stringify(cart) , 60*60*24*30);
      }else{
        const arr = [];
        arr[0] = this.add_to_cart
        this.$cookie.set("cart", JSON.stringify(arr) , 60*60*24*30);
      }

      this.$toast.success('محصول مورد نظر به سبد خرید شما اضافه گردید.');
      this.add_to_cart_modal = false;
      this.add_to_cart = {
        count:1
      }
    },
    goToChat (){
      const token = this.getToken()
      return this.$axios.post(`newChat` , {store_id : this.product.store.uuid},
        {
          headers: {
            'x-api-key':token
          }
        })
        .then(res => {
          const chat = res.data
          this.$router.push({name:'chats-id' , params:{id:chat.id}})
        })
        .catch(err => {
          const error = err.response.data;
          if(error.message){
            this.$notify({
              group: 'foo',
              type: 'error',
              duration: 5000,
              text: 'لطفا ابتدا به حساب کاربری خود وارد شوید'
            });
          }else{
            this.errors = error.errors
          }
          this.loading = false
        });
    },
    increment (){
      if(this.product.inventory === 0){
        return
      }
      if(this.add_to_cart.count){
        if(this.add_to_cart.count < this.product.inventory){
          this.add_to_cart.count ++;
        }
      }else{
        this.add_to_cart.count = 1
      }
    },
    decrement (){
      if(!this.add_to_cart.count){
        this.add_to_cart.count = 1
        return
      }
      if(this.add_to_cart.count === 1){
        return
      }
      this.add_to_cart.count --;
    },
    showMore (){
      this.show_more = !this.show_more;
      return true;
    }
  },
}
</script>
<style>
.placeholder1{
  min-width: 100%;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: azure;
}
.h-auto{
  max-height: unset !important;
}
.h-160{
  max-height: 160px !important;
}
</style>
