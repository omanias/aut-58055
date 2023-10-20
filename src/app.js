import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { createHash, isValidPassword, generateToken, authToken } from './utils.js'
import viewsRouter from './routes/views.router.js'
import mongoose, { mongo } from 'mongoose'
import sessionsRouter from './routes/sessions.router.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import userRouter from "./routes/user.router.js"

const app = express()

const port = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://omanias:1234562023@cluster0.3lmci0d.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600
    }),
    secret: "CoderKey",
    resave: false,
    saveUninitialized: false
}))

// const connetion = mongoose.connect("mongodb+srv://omanias:1234562023@cluster0.3lmci0d.mongodb.net/?retryWrites=true&w=majority")

/* initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session()) */

/* app.use(session({
    secret: "CoderSecret",
    resave: true,
    saveUninitialized: true
})) */
// app.use("/api/sessions", sessionsRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

/* 
app.use(bodyParser.urlencoded({ extended: true }));
*/

const users = []

console.log(users)


app.get("/", (req, res) => {
    res.send("test")
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    /*   console.log(name)
      const exists = users.find(user => user.email === email)
  
      if (exists) return res.status(400).send({ error: "error", error: "El usuario ya existe" }) */

    const user = {
        name,
        email,
        password
    }

    console.log(user)

    users.push(user)

    const access_token = generateToken(user)
    res.send({ status: "success", access_token })
})

app.post("/login", (req, res) => {
    const { email, password } = req.body
    const user = users.find(user => user.email === email && user.password === password)
    if (!user) return res.status(400).send({ status: "error", error: "Credencial invalida" })
    const access_token = generateToken(user)
    res.send({ status: "success", access_token })
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})