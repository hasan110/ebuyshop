export default function({ app, redirect, route }) {
    const token = app.$cookie.get(process.env.AUTH_TOKEN_NAME)
    if (token === null || token === undefined) {
        return redirect(app.localePath({
            name: 'login',
            query: {
                redirect: route.fullPath
            }
        }))
    }
}
