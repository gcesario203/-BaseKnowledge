const app = require('express')()
const port = 3000
const consign = require('consign')
const db = require('./config/db')


app.db = db

consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(port,()=>{
    console.log('Backend iniciado com sucesso')
})