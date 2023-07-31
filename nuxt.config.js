export default {
    head: {
        titleTemplate: `%s `,
        title: process.env.APP_NAME,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0' },
        ]
    },

    css: [
      '~assets/css/icons.min.css',
      '~assets/css/bootstrap.min.css',
      '~assets/css/plugins.min.css',
      '~assets/css/styles.css',

        // SCSS
        //'~assets/sass/style.scss'
    ],

    plugins: [
        { src: '~plugins/partials-client.js', mode: 'client' },
        // { src: '~plugins/axios', mode: 'client' },
        '~plugins/axios.js',
        '~plugins/partials.js',
        '~plugins/helper.js',
        '~plugins/auth.js'
    ],

    components: true,
    ssr: true,
    target: 'server',

    buildModules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/vuetify',
        'vue-ssr-carousel/nuxt'
    ],

    modules: [
        '@nuxtjs/i18n',
        '@nuxtjs/axios',
        '@nuxtjs/pwa', [
            'cookie-universal-nuxt', { alias: 'cookie' }
        ],
        ["vue-toastification/nuxt", {
            timeout: 6000,
            closeOnClick: true,
            draggable: true,
            position: "top-right",
            closeButton: "button",
            icon: true,
            rtl: true
        }]
    ],

    pwa: {
        manifest: {
            lang: 'en',
            name: process.env.APP_NAME,
        },
        icon: {
            source: '/fav-icon.png'
        }
    },


    /*i18n: {
        locales: [
            { code: 'fa', dir: 'rtl', file: 'fa.json' },
            { code: 'en', dir: 'ltr', file: 'en.json' }
        ],
        defaultLocale: process.env.defaultLocale,
        langDir: 'i18n/',
        lazy: true,
        vueI18n: {
            fallbackLocale: process.env.defaultLocale,
            // messages: {
            //     en: en.messages,
            //     fa: fa.messages
            // }
        }
    },*/

    vuetify: {
        rtl: true,
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: '#1976D2',
                    secondary: '#424242',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                    theme: '#47c68b',
                },
                dark: {
                    primary: '#2196F3',
                    secondary: '#424242',
                    accent: '#FF4081',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                    theme: '#47c68b',
                },
            }
        }
    }

    //build: {
        //transpile: ['vee-validate/dist/rules']
    //}
}
