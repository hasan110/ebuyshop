<template>
  <div class="site-wrapper">
    <site-header>
      <template #action>
        <v-row
          align="center"
          justify="center"
        >
          {{store.name}}
        </v-row>
      </template>
    </site-header>
    <site-bottom-navigation></site-bottom-navigation>

    <div class="body-wrapper round shadow">
      <div class="body-inner">

        <div class="store-details">

          <div class="banner-wrapper">
            <img v-if="loaded" :src="FileUrl + store.banner" :alt="store.name" style="max-height: 400px;margin: auto">
            <template v-else>
              <v-skeleton-loader
                type="image"
              ></v-skeleton-loader>
            </template>
          </div>

          <div class="details-wrapper">
            <div class="details">
              <div v-if="store.user" class="salesman">فروشنده: {{store.user.fullname}}</div>
              <div class="address">
                <v-icon large color="dark">mdi-map-marker</v-icon>
                {{store.address}}
              </div>
            </div>
            <div class="icon">
              <img src="~/assets/images/icons/store.svg">
            </div>
          </div>

          <template v-if="!loaded">
            <v-skeleton-loader
              v-for="(item , key) in 12" :key="key"
              type="card"
              :style="{marginBlock : '.75rem'}"
            ></v-skeleton-loader>
          </template>
          <template v-else>
            <nuxt-link v-for="(item , key) in store.store_products" :key="key" :to="{name:'products-id-slug' , params : {id : item.uuid,slug : item.slug}}" class="mini-product-wrapper simple">
              <div class="picture">
                <img :src="FileUrl + item.files[0]['path']">
              </div>
              <div class="details">
                <div class="name">{{ item.name }}</div>
                <div class="price">
                  {{formatPrice(item.price)}} تومان
                </div>
              </div>
            </nuxt-link>
          </template>

        </div>

      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: 'Store',
  data : () => ({
    store_id:null,
    store:{},
    errors:{},
    show_comment_modal: false,
    add_comment_modal: false,
    add_comment_loading: false,
    share_modal: false,
    loaded:false
  }),
  head() {
    return {
      title: this.getPageTitle('اطلاعات فروشگاه')
    }
  },
  updated() {
    this.applyScrollingEffect();
  },
  mounted() {
    if(this.$route.params.id !== ''){
      this.getData()
    }else{
      this.$router.replace({name:'index'});
    }

  },
  methods: {
    getData (){
      this.store_id = this.$route.params.id;
      this.loaded = false
      window.scrollTo(0 , 0);
      return this.$axios.get(`get_store_data/${this.store_id}`)
        .then(res => {
          this.store = res.data.data
          this.loaded = true
        })
        .catch( () => {
          this.loaded = true
          this.$router.replace({name:'index'});
        });
    },
  }
}
</script>
