const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existOrError, notExistsOrError, equalsOrError, validEmail, validId, } = app.api.validation
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        try {
            existOrError(user.name, "Nome não informado")
            existOrError(user.email, "E-mail não informado")
            validEmail(user.email, "E-mail invalido")
            existOrError(user.password, "Senha não informada")
            existOrError(user.confirmPassword, "É necessário confirmar sua senha")
            equalsOrError(user.password, user.confirmPassword, "Senhas não se coincidem")

            const userFromDb = await app.db('users')
                .where({ email: user.email }).first()
            if (!user.id) {
                notExistsOrError(userFromDb, "Usuário já cadastrado")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(req.body.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(202).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(201).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 3
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('users')
                                .whereNull('deletedAt')
                                .count('id')
                                .first()

        const count = parseInt(result.count)

        
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .limit(limit)
            .offset(page*limit-limit)
            .then(users => res.json({data:users,count,limit}))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        try {
            validId(req.params.id, "ID invalido")

            const existId = await app.db('users')
                .where({ id: req.params.id })
                .first()

            existOrError(existId, "Usuário inexistente")
        } catch (msg) {
            return res.status(400).send(msg)
        }
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })

            notExistsOrError(articles, "Usuário possui artigos.")

            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })

            existOrError(rowsUpdated, "Usuário inexistente")

            return res.status(204).send()
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}