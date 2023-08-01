
<template>
  <div class="site-wrapper">
    <site-header>
      <template #action>
        گفت و گو با فروشنده
      </template>
    </site-header>
    <site-bottom-navigation></site-bottom-navigation>

    <div class="body-wrapper round shadow">
      <div class="body-inner py-4">

        <div class="chat-list-wrapper">

          <template v-if="loading">
            <v-skeleton-loader
              v-for="(item , key) in 15" :key="key"
              type="list-item-avatar-two-line"
              class="my-4"
            ></v-skeleton-loader>
          </template>

          <template v-if="chats.length <= 0">
            <div class="no-data-placeholder">
              <div>
                <img src="~/assets/images/no-search-results-icon-retina.svg">
              </div>
              داده ای برای نمایش وجود ندارد
            </div>
          </template>

          <nuxt-link v-for="(item , key) in chats" :key="key" class="chat-list-item" :to="{name:'chats-id' , params:{id:item.id}}">
            <div class="icon">
              <img v-if="item.store && item.store.banner" :src="FileUrl + item.store.banner">
              <img v-else src="~/assets/images/icons/store.svg">
            </div>
            <div class="texts">
              <h4 v-if="item.store">{{item.store.name}}</h4>
              <h4 v-else>فروشگاه بی نام</h4>
              <div v-if="item.messages && item.messages[0]" class="message">{{item.messages[0].text}}</div>
            </div>
            <div class="unread">
              <div v-if="item.unread_messages" class="unread-bullet">{{item.unread_messages}}</div>
            </div>
          </nuxt-link>

        </div>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Chats',
  data : () => ({
    errors:{},
    chats:[],
    current_page:1,
    last_page:null,
    loading:true
  }),
  head() {
    return {
      title: this.getPageTitle('گفت و گو ها')
    }
  },
  created() {
    this.checkAuth();
  },
  mounted() {
    window.scrollTo(0 , 0);
    this.getChats();
  },
  methods: {
    getChats(){
      const token = this.getToken()
      this.$axios.get(`getChatList?page=${this.current_page}`,
      {
        headers: {
          'x-api-key':token
        }
      })
      .then(res => {
        this.chats = res.data.data.data;
        this.last_page = res.data.data.last_page
        this.loading = false
      })
      .catch( () => {
        this.loading = false
      });
    }
  }
}
</script>
