

<template>
  <div class="site-wrapper">
    <site-header>
      <template #action>
        پیگیری سفارشات
      </template>
    </site-header>
    <site-bottom-navigation></site-bottom-navigation>

    <div class="body-wrapper round shadow">
      <div class="body-inner py-4 px-1">


        <v-simple-table>
          <template #default>
            <thead>
            <tr>
              <th>شناسه سفارش</th>
              <th>کد سفارش</th>
              <th>مبلغ کل</th>
              <th>وضعیت سفارش</th>
              <th>جزییات</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="item in invoices"
              :key="item.id"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.uuid }}</td>
              <td>{{ formatPrice(item.total_amount) }} تومان</td>
              <td>{{ item.status_title }}</td>
              <td>
                <v-btn :to="{name:'orders-details-id' , params:{id:item.uuid}}" class="my-1" icon dark color="info">
                  <v-icon dark>
                    mdi-information
                  </v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>

        <template v-if="!loading && invoices.length === 0">
          <div class="py-5 text-center">سفارش فعالی ندارید.</div>
        </template>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'ActiveOrders',
  data : () => ({
    errors:{},
    loading:false,
    invoices: [],
    current_page:1,
    last_page:1,
  }),
  head() {
    return {
      title: this.getPageTitle('سفارشات فعال')
    }
  },
  watch:{
    current_page() {
      this.getInvoices();
    }
  },
  created() {
    this.checkAuth();
  },
  mounted() {
    this.getInvoices()
    window.scrollTo(0 , 0);
  },
  methods: {
    getInvoices(reset = false){
      if(reset)
      {
        this.current_page = 1
        this.invoices = []
      }
      this.loading = true
      const token = this.getToken()

      this.$axios.post(`get_order_list`,{status:'active' , page:this.current_page},
      {
        headers: {
          'api_token':token
        }
      })
      .then(res => {
        const data = res.data.data;
        this.invoices = this.invoices.concat(data.data)
        this.last_page = data.last_page;
        this.loading = false
      })
      .catch( () => {
        this.loading = false
      });
    },
    loadMore(){
      if(this.current_page < this.last_page){
        this.current_page++;
      }
    },
  }
}
</script>
