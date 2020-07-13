const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existOrError, notExistsOrError, equalsOrError, validEmail,  validId, } = app.api.validation
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

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
                .then(_ => res.status(202))
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(201).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id','name','email','admin')
            .then(users => res.json(users))
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
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    return { save, get ,getById}
}