const crypto = require('crypto');
const jwt = require('jsonwebtoken');

require('dotenv').config();


const generateRandomString = (length) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const generateCodeChallenge = (codeVerifier) => {
  function base64encode(string) {

    return Buffer.from(string).toString('base64');

  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);

  const digest = crypto.createHash('sha256').update(data).digest('base64');

  return digest
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}

exports.requestAuth = () => {

  //This actually just generates needed params for authorization and returns them to client, which then requests auth.
  
  var codeVerifier = generateRandomString(128);

  localStorage.setItem('code_verifier', codeVerifier);

  var codeChallenge = generateCodeChallenge(codeVerifier)
  let state = generateRandomString(16);
  let scope = 'user-read-private user-read-email';

  let args = {
    response_type: 'code',
    client_id: process.env.SPOTIFY_API_CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.REDIRECT_URI,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  };
  return args;
}

exports.requestAccessToken = async (code) => {
  let codeVerifier = localStorage.getItem('code_verifier');

  let args = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.SPOTIFY_API_CLIENT_ID,
    code_verifier: codeVerifier
  };

  let body = new URLSearchParams(args)

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  })
  const data = await result.json();
  if(data.access_token){
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.removeItem('code_verifier')
    console.log(data.refresh_token)
    return jwt.sign({data: data.refresh_token}, process.env.API_SECRET, {expiresIn: "12h"});
  }
  else{
    return false;
  }
}

exports.refreshAccessToken = async (refreshToken) => {
  let token;
  try {
    token = jwt.verify(refreshToken, process.env.API_SECRET)
  }
  catch (error){
    return {error: error};
  }
  let args = {
    grant_type: 'refresh_token',
    refresh_token: token.data,
    client_id: process.env.SPOTIFY_API_CLIENT_ID
  }

  let body = new URLSearchParams(args)

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  })

  const data = await result.json();
  
  if(data.access_token){
    localStorage.setItem('access_token', data.access_token)
    return jwt.sign({data: data.refresh_token}, process.env.API_SECRET, {expiresIn: "12h"});
  }
}