const express = require('express')
var bodyParser = require('body-parser')
const res = require('express/lib/response')
const app = express()
const router =  express.Router()

const logger = (req, res, next) => {
    req.logger = Date.now()
    // console.log(`Request came ${Date.now()}`)
    next()
}

const userDB = [{username: 'abou', password: 123}]

app.use(logger)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


router.get('/', (req, res) => {
    console.log(req.body)
    res.send('hello root page')
})

router.get('/about', (req, res) => {
    res.send(`hello About Page time is ${req.logger}`)
})

router.get('/login', (req, res) => {
    res.send('hello Login Page')
})

router.get('/logout', (req, res) => {
    
    res.send('hello Logout Page')
})

router.post('/login', (req, res) => {
    // console.log(req.body)
    const {username, password} = req.body
    console.log(username)
    // res.send(`login success at ${req.logger}`)
    const userPresent = userDB.find(({username}) => {
       return username === username

    })
    const isEqual = userPresent.password == password
    console.log(isEqual)
    console.log(userPresent)

    if(!userPresent) {
        res.status(400).send('No User Present')
    } else {
        res.status(200).send('User is Present')
    }
})



app.use(router)

app.listen(8080, () => {
    console.log('Server is running')
})