import { useState, useEffect } from "react";
import { refreshAccesToken } from "./authController";

export const handleError = (error) => {
    console.log(error)

    if (error === "The access token expired") {
        const refreshToken = localStorage.getItem('token')

        //If access token has expired, try to refresh access token using refresh token.
        refreshAccesToken(refreshToken)
        .then(data => {
            console.log(data);
            location.reload();
        })
        .catch(error => {
            //If error occurs when trying to refresh access token, remove refresh token from local storage.
            console.log(error)
            localStorage.removeItem('token')
            location.reload();
        })

        
    }
    else {
        localStorage.removeItem('token');
        location.reload();
    }
}