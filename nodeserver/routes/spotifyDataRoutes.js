const express = require('express');
const { getProfileInfo, getUserPlaylists, getPlaylistSongs } = require('../controllers/spotifyDataControllers');

const router = express.Router();

router.get('/getProfile', (req, res) => {
    getProfileInfo()
    .then(data => {
        return(res.json(data))
    })
    .catch(error => {
        return(res.json(error))
    })
});

router.post('/getUserPlaylists', (req, res) => {
    const id = req.body.userId;
    getUserPlaylists(id)
    .then(data => {
        return(res.json(data))
    })
    .catch(error => {
        return(res.json(error))
    })
})

router.post('/getPlaylistSongs', (req, res) => {
    const id = req.body.id;
    const offset = req.body.offset;

    getPlaylistSongs(id, offset)
    .then(data => {
        if(data.error){
            console.log(data.error)
            return res.status(data.error.status).json(data);
        }
        return res.json(data)
    })
    .catch(error => {
        console.log(error);
        return(res.json(error))
    })
})



module.exports = router;