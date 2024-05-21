import express from 'express'
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

import connection from "./config/sequelize-config.js"

import UsersController from "./controllers/UsersController.js"

connection.authenticate().then(()=>{
    console.log("Conexão com o banco de dados feita com sucesso!")
}).catch((error) => {
    console.log(error)
})
connection.query(`CREATE DATABASE IF NOT EXISTS buffs;`).then(() => {
    console.log("O banco de dados está criado.")
}).catch((error) => {
    console.log(error)
})

app.use("/", UsersController)

//rota main
app.get("/",function(req,res){
    res.render("index")
})

//porta do servidor
app.listen(8080,function(erro){
    if(erro) {
        console.log("Ocorreu um erro!")

    }else{
        console.log("Servidor iniciado com sucesso!")
    }
})