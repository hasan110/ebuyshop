
<template>
  <div class="site-wrapper">
    <site-header>
      <template #action>
        {{category.title}}
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
          <nuxt-link v-for="(item , key) in category.store_products" :key="key" :to="{name:'products-id-slug' , params : {id : item.uuid,slug : item.slug}}" class="mini-product-wrapper">
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
              <template v-if="item.discount">
                <div class="discount-label">
                  <bdi class="tape">
                    %{{item.discount}} تخفیف
                  </bdi>
                </div>
              </template>
            </div>
          </nuxt-link>
        </template>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Category',
  data : () => ({
    category_id:null,
    category:{},
    loaded:false
  }),
  head() {
    return {
      title: this.getPageTitle('دسته بندی')
    }
  },
  mounted() {
    window.scrollTo(0 , 0);
    if(this.$route.params.id !== ''){
      this.category_id = this.$route.params.id;
      this.getData()
    }else{
      this.$router.replace({name:'index'});
    }

  },
  methods: {
    getData (){
      return this.$axios.get(`get_category_products/${this.category_id}`)
      .then(res => {
        this.category = res.data.data
        this.loaded = true
      })
      .catch( () => {
        this.loaded = true
        this.$router.replace({name:'index'});
      });
    }
  }
}
</script>
