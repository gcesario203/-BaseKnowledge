module.exports = app =>{
    let userCount = 1
    const save = (req,res) =>{
        console.log('Requisição de usuário número: '+userCount++)
        res.send('user > save')
    }

    return {save}
}