module.exports = app =>{
    const {authenticate} = app.config.passport
    const {get} = app.api.stat

    app.route('/stats')
        .all(authenticate())
        .get(get)
}