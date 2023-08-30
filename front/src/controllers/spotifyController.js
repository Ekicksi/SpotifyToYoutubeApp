
import { CLIENT_ID, REDIRECT_URI, API_URL } from "../config";

let isFetching;

export const getProfileInfo = async () => {

        const result = await fetch(API_URL + "/getProfile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'AuthRefresh': localStorage.getItem('token')
        },
        })
        const data = await result.json();
        if(data.error){
            throw new Error(data.error.message);
        }
        return data;
    }
    


export const getUserPlaylists = async (userId) => {
    
        console.log(userId)
        const result = await fetch(API_URL + "/getUserPlaylists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
        },
            body: JSON.stringify({userId:userId})
            
        })
        const data = await result.json();
        console.log(data)
        return data;
}

export const getPlaylistSongs = async (playlistId) => {
    
    let offset = 0;
    let reachedEndOfPlaylist = false;
    let songlist = [];
    if(isFetching){
        throw new Error("App is already loading playlist. Please wait!")
    }
    isFetching = true;
        while(offset < 1000 && !reachedEndOfPlaylist){
            const result = await fetch(API_URL + "/getPlaylistSongs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'AuthRefresh': localStorage.getItem('token')
                },
                body: JSON.stringify({id: playlistId, offset: offset})
            })
            const data = await result.json();
            console.log(data.items)
            if(data.error){
                return data;
            }
            data.items.forEach(item => {
                songlist.push(item);
            })

            if(data.items.length < 50){
                reachedEndOfPlaylist = true;
            }

            offset += 50;
        }
        isFetching = false;
        return songlist;
}