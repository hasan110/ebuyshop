<template>
  <div class="header-wrapper" :class="{fixed : fixed , shadow : shadow}">
    <div class="header-inner">
      <div class="header-title">
        <slot name="action">
          <v-btn icon @click="search_modal = true">
            <v-icon>
              mdi-magnify
            </v-icon>
          </v-btn>
        </slot>
      </div>
      <router-link :to="{name:'index'}" class="header-logo">
        <img src="~/assets/images/logo.svg">
      </router-link>
    </div>

    <v-dialog
        v-model="search_modal"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
    >
      <v-toolbar
          dark height="80"
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="search_modal = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field v-model="search_key" light placeholder="بیشتر از ۳ حرف وارد کنید" clearable solo hide-details label="جست و جو" @keyup="search()"></v-text-field>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              variant="text" icon
              @click="search()"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <div class="search-body">
        <div class="search-body-inner">

          <template v-if="loading">
            <v-skeleton-loader
                v-for="(item , key) in 12" :key="key"
                type="card"
                :style="{marginBlock : '.75rem'}"
            ></v-skeleton-loader>
          </template>
          <template v-else>
            <div v-if="products.length === 0" class="px-2 text-center p-5">
              موردی برای نمایش وجود ندارد.
            </div>
            <nuxt-link v-for="(item , key) in products" :key="key" :to="{name:'products-id-slug' , params : {id : item.uuid,slug : item.name}}" class="mini-product-wrapper">
              <div class="picture">
                <img :src="FileUrl + item.files[0]['path']" :alt="item.files[0]['description'] ?? item.name">
              </div>
              <div class="details">
                <div class="name">{{ item.name }}</div>
                <div class="store-name"><i class="mdi mdi-store"></i> {{ item.store.name }}</div>
                <div class="price">
                  {{formatPrice(item.price)}} تومان
                </div>
              </div>
              <div class="actions">
              </div>
              <template v-if="item.discount">
                <div class="discount-label">
                  <bdi class="tape">
                    %{{item.discount}} تخفیف
                  </bdi>
                </div>
              </template>
            </nuxt-link>
          </template>

        </div>
      </div>

    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'SiteHeader',
  props:{
    fixed:{
      default:false,
      type:Boolean
    },
    shadow:{
      default:false,
      type:Boolean
    }
  },
  data : () => ({
    search_modal : false,
    search_key : '',
    products : [],
    loading : false
  }),
  methods:{
    search (){
      if(this.search_key.length < 3){
        this.products = []
        return;
      }
      this.loading = true;
      return this.$axios.post(`search_products`,{search_key:this.search_key})
      .then(res => {
        this.products = res.data.data
        this.loading = false
      })
      .catch( () => {
        this.loading = false
      });
    },
  }
}
</script>
