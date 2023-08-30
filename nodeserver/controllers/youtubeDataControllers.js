require('dotenv').config();

exports.searchByKeyword = async (searchWord) => {
    const result = await fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=' + searchWord +'&key=' + process.env.YOUTUBE_API_KEY, {
        method: 'GET',
        headers: {
            Accept: "application/json",
        }
    })
    const data = await result.json();
    console.log(data)
    return data;
}