const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/backend_statics', {useNewUrlParser:true,useUnifiedTopology: true}).catch(e=>{
    const msg = "Não foi possível conectar com mongoDB"

    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
})