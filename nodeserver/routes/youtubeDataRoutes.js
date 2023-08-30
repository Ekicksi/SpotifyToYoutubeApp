const express = require('express');
const router = express.Router();


const { searchByKeyword } = require('../controllers/youtubeDataControllers');

router.post('/searchByKeyword', (req, res) => {
    searchByKeyword(req.body.searchWord)
    .then(data => {
        return res.json(data)
    }) 
    .catch(error => {
        return res.json(error)
    })
})


module.exports = router;