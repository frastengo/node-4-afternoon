require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagc = require('./controllers/swagController')
const authc = require('./controllers/authController')
const cartc = require('./controllers/cartController')
const searchc = require('./controllers/searchController')

const { SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)
app.use(checkForSession)

app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swagc.read)

app.get('/api/user', authc.getUser)
app.post('/api/login', authc.login)
app.post('/api/register', authc.register)
app.post('/api/signout', authc.signout)

app.post('/api/cart/checkout', cartc.checkout)
app.post('/api/cart/:id', cartc.add)
app.delete('/api/cart/:id', cartc.delete)

app.get('/api/search', searchc.search)


app.listen(SERVER_PORT, () => console.log( `Server listening on port: ${SERVER_PORT}`))