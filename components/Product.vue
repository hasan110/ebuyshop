<template>
  <div class="product-wrapper">
    <nuxt-link :to="{name:'products-id-slug' , params : {id : product.uuid , slug : product.slug}}" class="product type-1">

      <div class="picture">
        <img :src="FileUrl + product.files[0]['path']">
      </div>
      <div class="product-content">
        <h4 class="name">{{product.name}}</h4>
        <div class="short-desc">
          <p>{{product.description}}</p>
        </div>
        <div v-if="!showOff" class="shipment">
          <img src="~/assets/images/icons/delivery-truck-svgrepo-com.svg">
          ارسال در {{product.store.shipping_time}}
        </div>
        <template v-if="showOff && product.discount">
          <div class="off-price">

            <bdi class="off">
              %{{product.discount}} تخفیف
            </bdi>
            <div class="prices">
              <span class="new-price">{{formatPrice(product.price)}} تومان</span>
              <span class="strike">{{formatPrice(product.price_before_off)}} تومان</span>
            </div>

          </div>
        </template>
        <template v-else>
          <div class="price">
            {{formatPrice(product.price)}} تومان
          </div>
        </template>
        <div class="action">
          <button class="px-btn block size-md px-btn-primary">+ افزودن به سبد خرید</button>
        </div>
      </div>

    </nuxt-link>
  </div>
</template>

<script>
  export default {
    name: 'ProductItem',
    props:{
      product:{
        required:true,
        type:Object
      },
      bg:{
        default:false,
        type:Boolean
      },
      showOff:{
        default:false,
        type:Boolean
      }
    },
    data: () => ({
    }),
  }
</script>
