import Vue from 'vue';
Vue.mixin({
    data() {
        return {
            HostPath: 'http://localhost:3000',
            // FileUrl: 'http://localhost:8000/uploads/',
            StaticUrl: 'http://localhost:3000/images/',
            // HostPath: 'https://allwincrypto.com',
            FileUrl:'https://dl.polexofficial.com/uploads/',
            // StaticUrl:'https://allwincrypto.com/images/',
            DefaultLanguage: 'fa',
            themeColor: '#00A9A5',
        }
    },
    methods: {
        getPageTitle(text = null) {
          if(text)
          {
            return text + ' | ' + 'ای بای e-buy';
          }
          return 'ای بای e-buy';
        },
        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        },
        successToast(msg) {
            if (!msg) {
                msg = this.$t('success')
            }
            this.$toast.success(msg, {
                rtl: this.$t('dir') === 'rtl'
            });
        },
        errorToast(msg) {
            if (!msg) {
                msg = this.$t('error')
            }
            this.$toast.error(msg, {
                rtl: this.$t('dir') === 'rtl'
            });
        },
        number_e2p(n) {
            if (n !== undefined) {
                n = n.toString();
                return n.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹' [d]);
            }
        },
        G_formatPrice(value) {
            if (value) {
                const number = parseFloat(value)
                const val = Number((number).toFixed(1)).toLocaleString()
                return val
            } else {
                return value
            }
        },
        G_just_float(evt) {
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        G_just_latin(evt) {
            const p = /^[\u0600-\u06FF\s]+$/;
            if (p.test(evt.key)) {
                evt.preventDefault();
            }
        },
        G_dont_allow_number(evt) {
            const p = /[^0-9]/g;
            if (!p.test(evt.key)) {
                evt.preventDefault();
            }
        },
        G_allow_phone_number(evt) {
            const p = /[^0-9]/g;
            if (p.test(evt.key)) {
                evt.preventDefault();
            }
            if (evt.target.value.length >= 11) {
                evt.preventDefault();
            }
        },
        G_timeConverter(timestamp) {
            const a = new Date(timestamp);
            // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            const year = a.getFullYear();
            const month = months[a.getMonth()];
            // const month = a.getMonth();
            const date = a.getDate();
            const hour = a.getHours();
            const min = a.getMinutes();
            // const sec = a.getSeconds();
            const time = year + '-' + month + '-' + date + ' ' + hour + ':' + min;
            return time;
        },
        formatPrice(value) {
          // let val = (value/1).replace('.', '')
          // return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "،")
          if (value) {
            const number = parseInt(value)
            const val = Number((number).toFixed(1)).toLocaleString()
            return val
          } else {
            return value
          }
        },
        applyScrollingEffect()
        {
        // drag scrolling effect
        let sliders = document.querySelectorAll('.draggable');
        let isDown = false;
        let startX;
        let scrollLeft;
        sliders = [...sliders];
        sliders.forEach ( slider => {

          slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
          });
          slider.addEventListener('mouseleave', () => {
            isDown = false;
          });
          slider.addEventListener('mouseup', () => {
            isDown = false;
          });
          slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX); // scroll-fast
            slider.scrollLeft = scrollLeft - walk;
            e.preventDefault();
          });
        })
      }
    }
});
