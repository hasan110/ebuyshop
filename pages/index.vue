<template>
  <div class="site-wrapper">
    <site-header></site-header>
    <site-bottom-navigation></site-bottom-navigation>

    <div class="body-wrapper">
      <div class="body-inner">

        <div class="section-1">
          <ssr-carousel v-if="loaded" :slides-per-page='1' :autoplay-delay='6' loop show-dots>
            <img v-for="(item , key) in home_data.slide_shows" :key="key" :src="FileUrl + item.file">
          </ssr-carousel>
          <template v-else>
            <v-skeleton-loader
              :height="410"
              type="image"
            ></v-skeleton-loader>
          </template>
        </div>

        <div class="section-2">
          <h4 class="titr">دسته بندی</h4>
          <div class="categories draggable">

            <div
              v-for="(item , key) in home_data.categories" :key="key"
              class="category-item" :style="{backgroundColor: item.color}"
              @click="selectCategory(item)"
            >
              <div class="icon">
                <img :src="FileUrl + item.icon">
              </div>
              <div class="name">{{ item.title }}</div>
            </div>

          </div>
        </div>

        <div v-if="selected_category.store_products !== undefined && selected_category.store_products.length > 0" class="py-3">
          <div class="section-3" :style="{backgroundColor:selected_category.color}">
            <div class="section-3-inner draggable">
              <template v-if="!loaded">
                <v-skeleton-loader
                  v-for="(item , key) in 6" :key="key"
                  type="card"
                  :style="{flexBasis : '250px' , paddingLeft : '1rem'}"
                  min-width="250"
                ></v-skeleton-loader>
              </template>
              <template v-else>
                <Product v-for="(item , key) in selected_category.store_products" :key="key" bg :product="item"></Product>
                <router-link v-if="selected_category.store_products.length > 1" :to="{name:'category-id-title' , params: {id:selected_category.uuid,title:selected_category.title}}" class="see-more">
                  <img src="~/assets/images/seemore.png">
                  <span>
                    مشاهده بیشتر
                  </span>
                </router-link>
              </template>
            </div>
          </div>
        </div>

        <div class="py-3">
          <div class="section-4">
            <h4>جدید ترین ها</h4>
            <div class="section-4-inner draggable">
              <template v-if="!loaded">
                <v-skeleton-loader
                  v-for="(item , key) in 6" :key="key"
                  type="card"
                  :style="{flexBasis : '250px' , paddingLeft : '1rem'}"
                  min-width="250"
                ></v-skeleton-loader>
              </template>
              <template v-else>
                <Product v-for="(item , key) in home_data.latest_products" :key="key" :product="item"></Product>
              </template>
            </div>
          </div>
        </div>

        <div class="py-3">
          <div class="section-5">

            <div class="best-products-wrapper">
              <div class="label">
                <div class="icon">
                  <img src="~/assets/images/speakerbell-icon.png">
                </div>
                <div class="titr py-2">
                  <h5 class="m-0">بهترین محصولات</h5>
                </div>
              </div>
              <div class="best-products-inner">
                <div v-if="home_data.best_products !== undefined && home_data.best_products.length > 8" class="best-products-animation-wrapper">
                  <div v-for="(j , k) in 15" :key="k" class="best-products">
                    <nuxt-link v-for="(item , key) in home_data.best_products" :key="key" :to="{name:'products-id-slug' , params : {id : item.uuid,slug : item.name}}" class="best-product">
                      <img :src="FileUrl + item.files[0]['path']" :alt="item.name">
                    </nuxt-link>
                  </div>
                </div>
                <div v-else class="p-5 px-1 text-center">
                  محصولی وجود ندارد.
                </div>
              </div>
            </div>

            <h3 class="text-center text-light">تخفیف شگفت انگیز</h3>
            <div class="section-5-inner draggable">
              <template v-if="!loaded">
                <v-skeleton-loader
                  v-for="(item , key) in 6" :key="key"
                  type="card"
                  :style="{flexBasis : '250px' , paddingLeft : '1rem'}"
                  min-width="250"
                ></v-skeleton-loader>
              </template>
              <template v-else>
                <div v-if="home_data.off_products !== undefined && home_data.off_products.length === 0" style="min-width: 100%">
                  <div class="text-light text-center p-5 px-1">
                    محصولی وجود ندارد
                  </div>
                </div>

                <Product
                 v-for="(item , key) in home_data.off_products"
                 :key="key"
                 bg
                 show-off
                 :product="item"
                ></Product>
              </template>
            </div>
          </div>
        </div>

        <div class="py-3">
          <div class="section-4">
            <h4>پیشنهادی شما</h4>
            <div class="section-4-inner draggable">
              <template v-if="!loaded">
                <v-skeleton-loader
                  v-for="(item , key) in 6" :key="key"
                  type="card"
                  :style="{flexBasis : '250px' , paddingLeft : '1rem'}"
                  min-width="250"
                ></v-skeleton-loader>
              </template>
              <template v-else>
                <Product v-for="(item , key) in home_data.suggested_products" :key="key" :product="item"></Product>
              </template>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Product from '../components/Product.vue'
export default {
  name: 'Index',
  components: { Product },
  async asyncData({$axios}) {
    return await $axios.get('get_store_home_data')
    .then(res => {
      return { home_data: res.data.data }
    })
    .catch(() => {
      return { home_data: {} }
    })
  },
  data(){
    return {
      selected_category:{},
      category_products:[],
      loaded:false,
      categorie_loading:false,
    }
  },
  head() {
    return {
      title: this.getPageTitle(),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'در ایبای، ما بهترین و متنوع ترین محصولات لوازم آرایشی و بهداشتی را برای شما فراهم میکنیم. از اصلی ترین لوازم آرایشی تا محصوالت بهداشتی و مراقبت از پوست، مو و بدن، همه چیز را در فروشگاه آنلاین ای بای خواهید یافت. اطمینان حاصل کنید که تنوع و کیفیت محصولات ما بینظیر است. ما با استفاده از  برترین برندها و تولیدکنندگان بین المللی همکاری میکنیم تا بهترین تجربه را برای شما به ارمغان آوریم. همچنین، محصولات ما به صورت موردی بر اساس نیازهای شما انتخاب شده اند تا بهترین نتیجه را در رسیدن به زیبایی و بهداشتی کامل برای شما فراهم کنند. از آرایش های روزمره تا آرایش های شبانه، از محصولات مراقبت پوست تا لوازم آرایشی حرفه ای، ایبای در کنار شما خواهد بود تا بهترین انتخاب هایی را برای زیبایی و بهداشت شخصی خود داشته باشید. سفارشی ساده که از فروشگاه آنلاین ای بای خریداری کنید، به سرعت و با امنیت برای شما ارسال میشود. همچنین، در صورت نیاز به راهنمایی در انتخاب محصولات مناسب برای شما، تیم پشتیبانی ما همواره آماده پاسخگویی به سوالات شما است. با مراجعه به فروشگاه آنلاین ای بای، شروع به خرید لوازم آرایشی و بهداشتی با کیفیترین و مطمئنترین روشها را تجربه خواهید کرد. ما به فروش محصولات اصلی و با کیفیت تمرکز میکنیم تا شما بتوانید به راحتی از خرید خود لذت ببرید.همچنین، در ایبای به آرامش و رضایت شما اهمیت میدهیم. به همین دلیل، به سادگی و سرعت در مراحل پرداخت و ارسال سفارشات توجه کرده ایم. همواره سعی میکنیم تا برای شما تجربهای مثبت و بی نقص از فروشگاه آنلاین ایبای فراهم کنیم. ما بهعنوان یک مقصد شگفت انگیز برای علاقه مندان به لوازم آرایشی و بهداشتی، مشتاقانه منتظر شما هستیم. بیایید با ما همراه شوید و با تنوع، کیفیت و خدمات برترمان، بهترین محصولات لوازم آرایشی و بهداشتی را تجربه کنید.ایبای - زیبایی در دستان شماست!'
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content: 'لوازم آرایشی: رژلب، ریمل، فرانژه، کرم پودر، ایشادو، پنسیل آبرو، براش آرایشی، پرایمر، پودر صورت، کانسیلر، براش پودر، سایه چشم، بالشر، هایالیتر، کوچک کننده منافذ، مات کننده صورت، افزایش دهنده حجم مژه - محصولات پوستی: کرم ضد آفتاب، کرم روز، کرم شب، تونر، صابون روزانه، ماسک صورت، کرم مرطوب کننده، سرم پوست، اکسفولیانت، روغن صورت، کرم ضد چروک، کرم ضد لک، ضد آکنه، کرم ترمیم کننده - لوازم بهداشتی: شامپو، بالشتک دندان، مسواک، پاستیل ضد عفونی کننده، دستمال کاغذی، دیودرانت، شوینده دست، صابون دست، ضد عفونی کننده دست، شیر پاک کننده، لوسیون بدن، رول ضد تعریق، کرم ضد حساسیت، شامپو خشک، روغن ماساژ - لوازم زیبایی: صابون روغنی، اسفنج آرایشی، براش ماساژ صورت، دستگاه تمیز کننده صورت، برس مو، برس پنسیل، خمیر دندان، کمک های آرایشی، جاروی صورت، ست آرایشی، فریمر ناخن، روکش ناخن، رژ لب دائمی - مراقبت از مو: شامپو ضد ریزش، روغن مو، محصولات حالت دهنده، ماسک مو، کرم ضد شوره، برس مو، صابون مو، کرم ضد لکه مو، محصولات حالت دهنده مو - محصولات مردانه: اسباب مراقبت از ریشه، کرم ضد ترک، شامپو مردانه، کرم روز مردانه، لوسیون پس از اصالح، برس ریشه، خمیر دندان مردانه، ادکلن، روغن بدن مردانه، کرم مرطوب کننده پوست مردانه، محصولات آرایشی مردانه - لوازم آرایشی حرفهای: پالت سایه، برس آرایشی حرفهای، کیت آرایش حرفهای، براش پودر حرفهای، رژ گونه، آبرسان، اسفنج آرایشی حرفهای، براش آرایش حرفهای، فیکساتور آرایش حرفهای - لوازم بهداشتی طبیعی: صابون دست طبیعی، شامپو طبیعی، کرم صورت طبیعی، ماسک صورت طبیعی، دئودرانت طبیعی، روغن مو طبیعی، صابون روغنی طبیعی، کرم بدن طبیعی، کمکهای آرایشی طبیعی - محصولات آرایشی بر اساس نوع پوست: محصولات آرایشی برای پوست چرب، محصولات آرایشی برای پوست خشک، محصولات آرایشی برای پوست حساس، محصولات آرایشی برای پوست مختلط - محصولات ضد آفتاب: کرم ضد آفتاب، اسپری ضد آفتاب، لوسیون ضد آفتاب '
        }
      ]
    }
  },
  mounted() {
    if (this.home_data && this.home_data.categories !== undefined && this.home_data.categories.length > 0) {
      this.selectCategory(this.home_data.categories[0])
    }else{
      this.home_data = {}
    }
    this.loaded = true
  },
  updated(){
    this.getBestProductsWidth();
    this.applyScrollingEffect();
  },
  methods: {
    get_store_home_data (){
      return this.$axios.get(`get_store_home_data`)
        .then(res => {
          this.home_data = res.data.data
          if(this.home_data.categories !== undefined && this.home_data.categories.length > 0){
            this.selectCategory(this.home_data.categories[0])
          }

          this.loaded = true
        })
        .catch( () => {
          this.loaded = true
        });
    },
    getProductsByCategories (categoryId){
      this.categorie_loading = true
      return this.$axios.get(`get_category_products/${categoryId}`)
        .then(res => {
          this.category_products = res.data.data
          this.categorie_loading = false
        })
        .catch( () => {
          this.categorie_loading = false
        });
    },
    selectCategory(category) {
      this.selected_category = category;
    },
    getBestProductsWidth() {
      const elements = this.$el.querySelectorAll('.best-product');
      let width = 0
      for(let i = 0; i < elements.length; i++){
        width +=  elements[i].offsetWidth;
      }
      document.documentElement.style.setProperty('--vari' , `${width}px`)
      document.documentElement.style.setProperty('--varisec' , `${width}s`)
    }
  }
}
</script>
