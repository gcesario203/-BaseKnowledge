module.exports = app =>{
    const {save} = app.api.user
    const {signIn,validateToken} = app.api.auth

    app.post('/signup', save)
    app.post('/signin', signIn)
    app.post('/validateToken', validateToken)
}