const express = require('express')
const app = express()
const { auth, requiresAuth } = require('express-openid-connect')
require('dotenv').config({ path: './.env' })

// .env file
    // ISSUER_BASE_URL=https://YOUR_DOMAIN
    // CLIENT_ID=YOUR_CLIENT_ID
    // BASE_URL=https://YOUR_APPLICATION_ROOT_URL
    // SECRET=LONG_RANDOM_VALUE

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

app.get('/profile', requiresAuth(), (req, res) => {
    res.send("You are viewing state secrets. Shhhhh!!!!");
});

app.listen(3000, console.log("Server is running!!"))