const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.validateRefreshToken = (req, res, next) => {
    const verifiedRefreshToken = jwt.verify(req.headers.authrefresh, process.env.API_SECRET).data;
    const originalRefreshToken = localStorage.getItem('refresh_token');
    console.log(verifiedRefreshToken === originalRefreshToken)
    
    if(verifiedRefreshToken === originalRefreshToken){
        next();
    }
    else {
        return res.json({"isAuthorized": false})
    }
}