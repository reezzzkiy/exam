require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const path = require('path')
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT

const app = express()

app.use(fileUpload())
app.use(cors())
app.use(express.json())

const start = async () => {
    try {
		sequelize.authenticate()
        sequelize.sync()
        app.listen(PORT, () => {
            console.log( `работает ${PORT}`)
        })
    } catch (e) {
        console.log('не работаем')
    }
}
start()

const generatejwt  = (login, email, fio, password, role ) => {
    return jwt.sign({
        login, email, fio, password, role
    },
    process.env.SECRET_WORD,{
        expiresIn:'24h'
    }
    )
}

app.post('/reg', async(req,res) => {
    try {
        const regUser = await sequelize.query(
            `insert into users (login, email, fio, password) values (
                '${req.body.login}',
                '${req.body.email}',
                '${req.body.fio}',
                '${req.body.password}'
            )`)
            const token = generatejwt (req.body.login, req.body.email, req.body.fio, req.body.password, "USER")
            return res.send ({token})
    } catch (error) {
        return res.send(400)
    }
})

app.get('/auth', async (req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password
        const user = await sequelize.query(`
        select * from users where login = '${login}'`)
        if(user[0][0].password === password){
            const token = generatejwt(user[0][0].login, user[0][0].email, user[0][0].fio, user[0][0].password, user[0][0].role)
            const ret = [true, {token}]
            return res.send(ret)
        }
        else{
            return  res.send(false)
        }
    } catch (error) {
        return res.send(false )
    }
})

app.post('/cat', async(req,res) => {
    try {
        const newCat = await sequelize.query(
            `insert into categories (name_cat) values (
                '${req.body.name_cat}'
            )`)

            return res.send (req.body.name_cat)
    } catch (error) {
        return res.send(400)
    }
})

const addFile = async (file) =>{
    const fileName = uuid.v4() + ".jpg"
    file.mv(path.resolve(__dirname, "static", fileName))
    return fileName
}

app.post('/addlist', async(req, res) => {
    try {
        const post = req.body
        const file = await addFile(req.files.photo_1)
        const addPost = sequelize.query(`
        insert into listings (name, description, photo_1, login, id_cat ) values (
            '${post.name}',
            '${post.description}',
            '${file}',
            '${post.login}',
            '${post.id_cat}'
        )`)
        return res.send(200)
    } catch (error) {
        return res.send(400)
    }
});