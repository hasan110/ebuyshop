export default function({ app, $axios }, inject) {
    // $axios.onRequest(config => {
        // if (config.data) {
        // }
    // })

    // $axios.onError(error => {
    //   const code = parseInt(error.response && error.response.status)
    //   if (code === 400) {
    //   }
    // })
    const token = app.$cookie.get(process.env.AUTH_TOKEN_NAME);
    const axios = $axios.create({
      baseUrl: process.env.API_URL,
      headers: {
          // 'Authorization': 'Bearer ' + app.$cookie.get(process.env.AUTH_TOKEN_NAME)
          'api_token': token
      }
    })
    // Set baseURL to something different
    // axios.setBaseURL(process.env.API_URL)

    // Inject to context as $axios
    inject('axios', axios)
}
