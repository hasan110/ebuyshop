<template>
  <nav class="site-bottom-navigation">
    <ul>
      <li :class="[active_nav == 'home' ? 'active' : '']">
        <nuxt-link :to="{name:'index'}">
            <img v-if="active_nav == 'home'" src="~/assets/images/icons/home_FILL1.svg">
            <img v-else src="~/assets/images/icons/home_FILL0.svg">
            <span>خانه</span>
        </nuxt-link>
        <span class="tube-light">
          <span class="light-ray"></span>
        </span>
      </li>
      <li :class="[active_nav == 'cart' ? 'active' : '']">
        <span v-if="getCartItemsCount" class="badge-counter">
          {{getCartItemsCount}}
        </span>
        <nuxt-link :to="{name:'cart'}">
            <img v-if="active_nav == 'cart'" src="~/assets/images/icons/shopping_cart.svg">
            <img v-else src="~/assets/images/icons/shopping_cart_outline.svg">
            <span>سبد خرید</span>
        </nuxt-link>
        <span class="tube-light">
          <span class="light-ray"></span>
        </span>
      </li>
      <li :class="[active_nav == 'chat' ? 'active' : '']">
        <nuxt-link :to="{name:'chats'}">
            <img v-if="active_nav == 'chat'" src="~/assets/images/icons/chat_FILL1.svg">
            <img v-else src="~/assets/images/icons/chat_FILL0.svg">
            <span>پیام</span>
        </nuxt-link>
        <span class="tube-light">
          <span class="light-ray"></span>
        </span>
      </li>
      <li :class="[active_nav == 'order' ? 'active' : '']">
        <nuxt-link :to="{name:'orders-active'}">
            <img v-if="active_nav == 'order'" src="~/assets/images/icons/shopping_bag_FILL1.svg">
            <img v-else src="~/assets/images/icons/shopping_bag_FILL0.svg">
            <span>سفارشات</span>
        </nuxt-link>
        <span class="tube-light">
          <span class="light-ray"></span>
        </span>
      </li>
      <li :class="[active_nav == 'profile' ? 'active' : '']">
        <nuxt-link :to="{name:'auth-profile'}">
            <img v-if="active_nav == 'profile'" src="~/assets/images/icons/person_FILL1.svg">
            <img v-else src="~/assets/images/icons/person_FILL0.svg">
            <span>پروفایل</span>
        </nuxt-link>
        <span class="tube-light">
          <span class="light-ray"></span>
        </span>
      </li>
    </ul>
    <span class="tube-light">
      <span class="light-ray"></span>
    </span>

  </nav>
</template>
<script>
export default {
  name: 'SiteBottomNavigation',
  data : () => ({
    active_nav:'home'
  }),
  computed: {
    getCartItemsCount(){
      const cart = this.$cookie.get("cart");
      if(cart)
      {
        return cart.length
      }else{
        return 0
      }
    }
  },
  watch:{
    $route (to, from){
      this.activator()
    }
  },
  mounted() {
    this.activator()
  },
  methods:{
    activator()
    {
      const route = this.$route.name;
      const home = ['index' , 'category-id-title' , 'product-id-slug' , 'stores-id' , 'auth-login'];
      const chat = ['chats' , 'chats-id'];
      const order = ['orders-active','orders-details-id','orders-history'];
      const cart = ['cart'];
      const profile = ['auth-profile' , 'favorites' , 'rules' , 'sale-rules'];

      if(home.includes(route))
      {
        this.active_nav = 'home'
      }
      else if(cart.includes(route))
      {
        this.active_nav = 'cart'
      }
      else if(chat.includes(route))
      {
        this.active_nav = 'chat'
      }
      else if(order.includes(route))
      {
        this.active_nav = 'order'
      }
      else if(profile.includes(route))
      {
        this.active_nav = 'profile'
      }
    }
  },
}
</script>
