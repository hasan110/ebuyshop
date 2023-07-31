import Vue from 'vue';

const auth = {
    data() {
        return {
          auth_token_name:'accesstoken'
        }
    },
    computed: {
        USER_DATA() {
            return this.$store.state.user.USER;
        }
    },
    methods: {
        checkAuth() {
            const apiToken = this.$cookie.get(this.auth_token_name);

            if (!apiToken) {
                this.$router.replace({ name: 'auth-login' })
            }
        },
        saveToken(token) {

            this.$cookie.set(this.auth_token_name, token, {
                path: '/',
                maxAge: 60 * 60 * 24 * 365
            })

            return true;
        },
        checkUnAuthenticated() {
            const apiToken = this.$cookie.get(this.auth_token_name);

            if (apiToken) {
                this.$router.replace({ name: 'index' })
            }
        },
        getToken() {
            return this.$cookie.get(this.auth_token_name);
        },
        checkIsAuthenticated() {
            const apiToken = this.$cookie.get(this.auth_token_name);

            if (apiToken) {
                return true
            } else {
                return false
            }
        },
    }
}

Vue.mixin(auth);
