const app = require('express')()
const port = 3000
const consign = require('consign')
const db = require('./config/db')
const admin = require('./config/admin')
const mongoose = require('mongoose')
require('./config/mongodb')


app.db = db
app.admin = admin
app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes')
    .into(app)

app.listen(port,()=>{
    console.log('Backend iniciado com sucesso')
})