export default function({ app, redirect, route }) {
    const token = app.$cookie.get(process.env.AUTH_TOKEN_NAME)
    if (token) {
        return redirect(app.localePath({
            name: 'index',
        }))
    }
}
