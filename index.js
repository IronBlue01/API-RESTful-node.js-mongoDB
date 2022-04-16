
//config inicial chamar os pacotes
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();


//Forma de ler JSON  / middlewares
app.use(
    express.urlencoded({
        extend: true
    })
)
app.use(express.json())

//Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)



//Rota inicial / endpoint
app.get('/', (req,res) => {
    //mostrar requisição
    res.json({
        message: 'Olá casada'
    })
})




const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASSWORD


//Entregar uma porta para o express saber onde ele vai disponibilixar esta aplicação
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.ubhzk.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(() => {

    console.log('Conectamos ao mongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))

