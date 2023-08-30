import * as React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import css from './styles/playlistInfoContainer.module.css';
import { refreshAccesToken } from '../controllers/authController';
import { getUserPlaylists, getProfileInfo, } from '../controllers/spotifyController';
import { handleError } from '../controllers/errorController'; 
import { PlaylistPicker } from './playlistPicker'

import { SongList } from './playlistSongList';

const playlistInfoComponent = (props) => {

    //comment for testing purposes

    const [playlistsInfoLoaded, setPlaylistsInfoLoaded] = React.useState(false)

    const [profile, setProfile] = React.useState("");

    const [error, setError] = React.useState("");

    const [playlists, setPlaylists] = React.useState("");

    const [selectedPlayList, setSelectedPlaylist] = React.useState("");

    const [playlistComponentActive, setPlaylistComponentActive] = React.useState(false);


    React.useEffect(() => {
        getfrontPageInfo();
    }, []);

    const getfrontPageInfo = () => {
        getProfileInfo()
            .then((profile) => {
                setProfile(profile)
                console.log(profile)
                return getUserPlaylists(profile.id)
            })
            .then((playlists) => {
                setPlaylists(playlists)
                setPlaylistsInfoLoaded(true)
                console.log(playlists)
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
                handleError(error.message)
            })
    }

    const handleChange = event => {
        console.log(event.target.value);
        setSelectedPlaylist(event.target.value);
        setPlaylistComponentActive(true);
        console.log(selectedPlayList)
    }

    // const handleComponentActive = () => {
    //     setPlaylistComponentActive(false);
    // }

    const log = event => {
        event.preventDefault
        refreshAccesToken()
        console.log(selectedPlayList)
    }

    const handleLogout = () => {
        localStorage.clear();
        props.setUserAuthorized(false);
    }

    return (
        <div>
            {playlistsInfoLoaded && (
                <div className={css.playlistContentWrapper}>
                    <div id={css.playlistPicker} className={playlistComponentActive ? css.playlistPickerNotActive : css.playlistPickerActive}>
                        <PlaylistPicker
                            profile={profile}
                            handleChange={handleChange}
                            selectedPlayList={selectedPlayList}
                            playlists={playlists}
                            log={log}
                            handleLogout={handleLogout}
                        />
                    </div>
                        <SongList
                            playlistId={selectedPlayList}
                            playlistComponentActive={playlistComponentActive}
                            setPlaylistComponentActive={setPlaylistComponentActive}
                            handleChange={handleChange}
                            playlists={playlists}
                        />
                </div>
            )
            }
        </div>

    )
}
export default playlistInfoComponent;