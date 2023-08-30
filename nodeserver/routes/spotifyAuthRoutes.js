const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


const { requestAuth, requestAccessToken, refreshAccessToken } = require('../controllers/spotifyAuthOperations')


router.get("/checkIfUserAuthorized", (req, res) => {
    const verifiedRefreshToken = jwt.verify(req.headers.token, process.env.API_SECRET).data;
    const originalRefreshToken = localStorage.getItem('refresh_token');
    console.log(verifiedRefreshToken === originalRefreshToken)
    
    if(verifiedRefreshToken === originalRefreshToken){
        return res.json({"isAuthorized": true})
    }
    else {
        return res.json({"isAuthorized": false})
    }
    
})

router.get("/login", (req, res) => {
    const data = requestAuth();
    return res.json(data);
})


router.post("/requestAccessToken", (req, res) => {
    const code = req.body.code

    requestAccessToken(code)
    .then(refreshToken => {
        const token = refreshToken
        res.cookie("token", token, {
            httpOnly: true,
            expire: new Date() + 60 
        });

        return res.json({token, isAuth: true})
    })
    .catch(error => {
        return res.json(error);
    })
})

router.post("/refreshAccessToken", (req, res) => {
    refreshAccessToken(req.body.refreshToken)
    .then((data) => {
        console.log(data)
        return res.json(data);
    })
    .catch(error => {
        console.log(error)
        console.log("SpotifyAuthRoutes refreshAccessToken catch block")
    })
})


module.exports = router;