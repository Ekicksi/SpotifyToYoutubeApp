exports.getProfileInfo = async () => {

    //TODO: Change localstorage usage to REDIS caching or something better!!!
    let accessToken = localStorage.getItem('access_token');
  
    const test = await fetch('https://api.spotify.com/v1/me', {
      headers: {
      Authorization: 'Bearer ' + accessToken
      }
    })
    const data = test.json();
    return data;
}

exports.getUserPlaylists = async (userId) => {
  let accessToken = localStorage.getItem('access_token');

  const result = await fetch('https://api.spotify.com/v1/users/' + userId + '/playlists?limit=50&offset=0', {
      method: "GET",
      headers: {
          Authorization: 'Bearer ' + accessToken
      }
  });
  return result.json();
}

exports.getPlaylistSongs = async (playlistId, offset) => {
  let accessToken = localStorage.getItem('access_token');
  try{                              
    const result = await fetch('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks?fields=items%28track%28name%2Calbum.name%2C+artists%29%29&limit=50&offset=' + offset, {
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    console.log(result)
    return result.json();
  }
  catch (error){
    console.log(error)
    console.log("error")
}
}