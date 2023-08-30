# SpotifyToYoutubeApp
For this application to work, you need to create .env file inside nodeserver folder and provide following variables:

SPOTIFY_API_CLIENT_ID=(You need to create spotify app at "https://developer.spotify.com/dashboard" and provide client id of that app here)
REDIRECT_URI=http://localhost:3000
PORT=5000
API_SECRET=(Make up whatever you want)

You also need to create .env file inside front folder and provide following variables:

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_YOUTUBE_API_KEY=( First you need to create New Project at "https://console.cloud.google.com/cloud-resource-manager". 
To get api key follow steps at "https://blog.hubspot.com/website/how-to-get-youtube-api-key#:~:text=YouTube%20API%20Key-,Log%20in%20to%20Google%20Developers%20Console.,-Create%20a%20new" and paste it here.

//For now youtube api key is exposed in frontend and is needed to be provided here in order app to work, moving this logic to backend ASAP.
