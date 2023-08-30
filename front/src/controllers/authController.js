import { useState, useEffect } from "react";
import { CLIENT_ID, REDIRECT_URI, API_URL } from "../config";

export const requestAuthorization = async () => {
  
  await fetch(API_URL + "/login", {
    method: "GET"
  })
  .then(async response => {
    const data = await response.json()
    const args = new URLSearchParams(data)
    window.location = 'https://accounts.spotify.com/authorize?' + args;
  })
  

}

export const requestAccessToken = async (code) => {
  const response = await fetch(API_URL + "/requestAccessToken", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({code:code})
  })
  const data = await response.json()
  //Unable to save refresh token to httpOnly cookies or to cookies in general for unknown reason, probably should not be stored in localstorage. 
  localStorage.setItem("token", data.token)
  console.log(data)
  
  return data;
}

export const refreshAccesToken = async () => {
  const refreshToken = localStorage.getItem("token")
  console.log(refreshToken)

  const response = await fetch(API_URL + "/refreshAccessToken", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({refreshToken:refreshToken})
  })
  const data = await response.json()
  console.log(data)
  if(data.error){
    throw new Error(data.error.message);
  }
  localStorage.setItem('token', data)
  return data;
}


  


