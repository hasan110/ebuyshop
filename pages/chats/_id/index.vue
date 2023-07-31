
<template>
  <div class="site-wrapper">
    <site-header fixed>
      <template #action>
        <nuxt-link :to="{name:'chats'}">
          <i class="mdi mdi-caret-left"></i><span> بازگشت</span>
        </nuxt-link>
      </template>
    </site-header>

    <div class="body-wrapper round shadow">
      <div class="body-inner">

        <div ref="chatContainer" class="chat-messages-wrapper">
          <template v-if="chat.id">
            <div v-for="msg in chat.messages" :key="msg.id">

              <div v-if="msg.sender == 'user'" class="left-msg">
                <div class="msg-text">
                  <pre>{{msg.text}}</pre>
                </div>
              </div>
              <div v-else class="right-msg">
                <div class="msg-text">
                  <pre>{{msg.text}}</pre>
                </div>
              </div>

            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="chat-input-wrapper">
      <form class="chat-input-inner" @submit.prevent="sendChatMessage">
        <div class="chat-input">
          <input v-model="form.message" placeholder="چیزی بنویسید..." type="text">
        </div>
        <div class="submit-input" :class="[!form.message ? 'disable' : '']">
          <button type="submit"><i class="mdi mdi-send"></i></button>
        </div>
      </form>
    </div>

  </div>
</template>
<script>
export default {
  name: 'ChatDetails',
  data : () => ({
    errors:{},
    chat:{},
    form:{},
    chat_id:null,
    loading:true,
    sending:false,
  }),
  head() {
    return {
      title: this.getPageTitle('پیام ها')
    }
  },
  updated() {
    const container = this.$refs.chatContainer;
    container.scrollTop = container.scrollHeight;
  },
  created() {
    this.checkAuth();
  },
  mounted() {
    window.scrollTo(0 , 0);
    if(this.$route.params.id !== ''){
      this.chat_id = this.$route.params.id;
      this.getChatDetails()
    }else{
      this.$router.replace({name:'chats'});
    }
  },
  methods: {
    getChatDetails(){
      const token = this.getToken()
      this.$axios.get(`getChatDetails/${this.chat_id}`,
        {
          headers: {
            'api_token':token
          }
        })
        .then(res => {
          const d = res.data
          this.chat = d.data;
          this.loading = false
          const container = this.$refs.chatContainer;
          container.scrollTop = container.scrollHeight;
        })
        .catch( () => {
          this.$router.replace({name:'chats'});
        });
    },
    sendChatMessage(){
      if(this.sending || !this.form.message)
      {
        return;
      }
      this.sending = true
      const token = this.getToken()
      this.form.chat_id = this.chat.id
      this.$axios.post(`sendChatMessage`, this.form ,
        {
          headers: {
            'api_token':token
          }
        })
        .then( () => {
          this.form = {}
          this.sending = false
          this.getChatDetails()
        })
        .catch( err => {
          const error = err.response.data;
          if(error.message){
            this.$toast(error.message);
          }else{
            this.errors = error.errors
          }
          this.sending = false
        });
    },
  }
}
</script>
