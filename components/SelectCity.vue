<template>
  <div class="site-wrapper">
    <site-header>
      <template v-slot:action>
        انتخاب شهر
      </template>
    </site-header>

    <div class="body-wrapper round shadow">
      <div class="body-inner py-4 px-2">

        <div class="p-1">
          لطفا شهر خود را انتخاب نمایید:
        </div>
        <div class="text-center py-2">
          <img style="height: 100px;margin: auto" src="~/assets/images/icons/location.png">
        </div>
        <div class="cities-wrapper">
          <div v-for="(item , key) in cities" :key="key" class="city" @click="selectCity(item.code)">
            {{item.name}}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import cities from '../plugins/available_cities'
export default {
  name: "SelectCity",
  data: () => ({
    cities
  }),
  methods:{
    selectCity(city)
    {
      this.$cookies.set("cityCode", 1020 , 60*60*24*365);
      this.$emit('citySelected')
    }
  }
}
</script>

<style scoped>

</style>
