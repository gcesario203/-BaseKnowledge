module.exports = app => {
    const {save,get,getTree,getById,remove} = app.api.category
    const { authenticate } = app.config.passport

    app.route('/categories')
        .all(authenticate())
        .post(app.admin(save))
        .get(app.admin(get))

    app.route('/categories/tree')
        .all(authenticate())
        .get(getTree)

    app.route('/categories/:id')
        .all(authenticate())
        .put(app.admin(save))
        .get(getById)
        .delete(app.admin(remove))
}