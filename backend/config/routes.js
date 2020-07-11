module.exports = app =>{
    const {save,get,deleteUser} = app.api.user

    app.route('/users').post(save).get(get)
    app.route('/users/:id').get(get).delete(deleteUser).put(save)
}