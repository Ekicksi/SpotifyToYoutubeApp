import * as React from 'react';
import { useState, useEffect } from 'react';

import { redirect, useLocation } from "react-router-dom";

import { requestAccessToken, requestAuthorization } from '../controllers/authController';

import container from '../components/styles/playlistInfoContainer.module.css';



import PlaylistComponent from '../components/playlistMainComponent';
import { AuthCard } from '../components/authCard';
import background from '../components/images/spotify.jpg';




const FrontPage = () => {

    //Store current URL to const defaultUrl
    const location = useLocation();
    const defaultUrl = location.pathname;

    const checkIfUserAuthorized = () => {
        const isAuth = localStorage.getItem('token')
        console.log(isAuth !== null)
        return (isAuth !== null);
    }

    const [userAuthorized, setUserAuthorized] = React.useState(checkIfUserAuthorized());

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get('code') !== null && !userAuthorized) { 
            let code = urlParams.get('code');

            requestAccessToken(code)
            .then((data) => {
                console.log(data)
                setUserAuthorized(true)
                //Remove urlParameters from browsers address bar when not needed anymore.
                window.history.pushState(null, '', defaultUrl)
            })
            .catch(error => {
                console.log(error)
                setUserAuthorized(false)
            })
        }
        else if(userAuthorized){
            console.log(userAuthorized)
        }
    }, [])

    const authorizeApp = () => {
        requestAuthorization();
    }

    return(
        <div>
            <div id='mainContentContainer' style={{ backgroundImage: `url(${background})` }}>
                <div id='playListComponent'>
                    {userAuthorized &&(
                        <PlaylistComponent 
                            setUserAuthorized={setUserAuthorized}
                        />
                    )}
                    
                    {!userAuthorized &&(
                        <AuthCard
                            authorizeApp={authorizeApp}
                        />
                    )}
                    
                </div>
                {/* <div id='adjustmentLayer'></div> */}
            </div>
        </div>
    )
}
export default FrontPage;