module.exports = app => {
    const { authenticate } = app.config.passport
    const { save, get, getById,remove} = app.api.user

    app.route('/users')
        .all(authenticate())
        .post(app.admin(save))
        .get(app.admin(get))

    app.route('/users/:id')
        .all(authenticate())
        .get(app.admin(getById))
        .put(app.admin(save))
        .delete(app.admin(remove))
}