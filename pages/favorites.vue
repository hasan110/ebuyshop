
<template>
  <div class="site-wrapper">
    <site-header>
      <template #action>
        علاقه مندی ها
      </template>
    </site-header>
    <site-bottom-navigation></site-bottom-navigation>

    <div class="body-wrapper round shadow">
      <div class="body-inner py-4">

        <template v-if="!loaded">
          <v-skeleton-loader
            v-for="(item , key) in 12" :key="key"
            type="card"
            :style="{marginBlock : '.75rem'}"
          ></v-skeleton-loader>
        </template>
        <template v-else>
          <nuxt-link v-for="(item , key) in products" :key="key" :to="{name:'product-id-slug' , params : {id : item.uuid,id : item.slug}}" class="mini-product-wrapper">
            <div class="picture">
              <img :src="FileUrl + item.files[0]['path']">
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

  </div>
</template>
<script>
export default {
  name: 'Favorites',
  data : () => ({
    products:[],
    loaded:false
  }),
  head() {
    return {
      title: this.getPageTitle('علاقه مندی ها')
    }
  },
  created() {
    this.checkAuth();
  },
  mounted() {
    window.scrollTo(0 , 0);
    this.getData()
  },
  methods: {
    getData (){
      const token = this.getToken()
      this.$axios.get(`product/favorites`,
        {
          headers: {
            'x-api-key':token
          }
        })
        .then(res => {
          this.products = res.data.data
          this.loaded = true
        })
        .catch( () => {
          this.loaded = true
        });
    }
  }
}
</script>
