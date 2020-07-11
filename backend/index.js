const app = require('express')()
const port = 3000
const consign = require('consign')

consign()
    .then('./config/middlewares.js')
    .into(app)

app.listen(port,()=>{
    console.log('Backend iniciado com sucesso')
})