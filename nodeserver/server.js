const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const session = require('express-session');
const cookieParser = require('cookie-parser');


const LocalStorage = require('node-localstorage').LocalStorage;
global.localStorage = new LocalStorage('./scratch');

const app = express();
const PORT = process.env.PORT || 5000;

const {validateRefreshToken} = require('./middleware/authMiddleware')

const spotifyAuthRoutes = require('./routes/spotifyAuthRoutes');
const spotifyDataRoutes = require('./routes/spotifyDataRoutes');
const youtubeDataRoutes = require('./routes/youtubeDataRoutes');

app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());

// app.use(session({
//   secret: 'secret-key',
//   resave: false,
//   saveUninitialized: false,
// }))


app.use("/api", spotifyAuthRoutes)
app.use("/api", spotifyDataRoutes)
app.use("/api", youtubeDataRoutes)


app.listen(PORT, () => {
    console.log("running on " + PORT);
})