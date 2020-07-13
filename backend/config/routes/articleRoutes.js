module.exports = app => {
    const {get,save,getById,getByCategory,remove} = app.api.article
    const { authenticate } = app.config.passport

    app.route('/articles')
        .all(authenticate())
        .get(app.admin(get))
        .post(app.admin(save))

    app.route('/articles/:id')
        .all(authenticate())
        .get(getById)
        .put(app.admin(save))
        .delete(app.admin(remove))

    app.route('/categories/:id/articles')
        .all(authenticate())
        .get(getByCategory)
}