const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    const {existOrError,notExistsOrError,equalsOrError,validEmail,validPassword} = app.api.validation
    const encryptPassword = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    const save = async(req,res)=>{
        const user ={...req.body}
    }

    return {save}
}