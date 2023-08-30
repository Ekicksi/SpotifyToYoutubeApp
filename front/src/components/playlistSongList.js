import * as React from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './styles/playlistInfoContainer.module.css';
import { PiArrowFatLinesUpThin } from 'react-icons/pi';
import { CiSearch } from 'react-icons/ci';

import { getPlaylistSongs } from '../controllers/spotifyController';
import { searchByKeyword } from '../controllers/youtubeController';
import { handleError } from '../controllers/errorController';
import {TailSpin} from 'react-loading-icons'


export const SongList = (props) => {

    const [playlistId, setPlaylistId] = React.useState("");
    const [playlist, setPlaylist] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [searchActive, setSearchActive] = React.useState(false);
    
    // const [playlistReady, setPlaylistReady] = React.useState(false)
    
    

    React.useEffect(() => {
        if(!props.playlistComponentActive){
            // setPlaylistReady(false);
        }
        if (props.playlistId && props.playlistComponentActive) {
            setLoading(true);
            getPlaylistSongs(props.playlistId)
                .then(data => {
                    console.log(data)
                    if(data.error){
                        handleError(data.error.message);
                    }
                    setPlaylist(data)
                    setLoading(false);
                    // props.playlistComponentActive ? setPlaylistReady(true) : setPlaylistReady(false);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [props])

    const arrayCount = (array) => {
        return array.length;
    }

    const dissmissSongList = () => {
        // setPlaylistReady(false);
        props.setPlaylistComponentActive(false)
        setPlaylist([]);
        setSearch("");
    }

    const handleSongDblClick = (song) => {
        let search = "";
        song.track.artists.map(artist => {
            search += artist.name + " ";
        })
        search += song.track.name;

        //Get video info from youtube API
        searchByKeyword(search)
        .then(res => {
            window.open('https://www.youtube.com/watch?v=' + res.items[0].id.videoId)
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleSearchChange = event => {
        setSearch(event.target.value);
    }

    const handleSearchClick = event => {
        console.log(searchActive)
        setSearchActive(!searchActive)
        
        let searchBar = document.getElementById('searchBar');

        //state updates one step behind so logic here is other way around than it's supposed to be.
        if(!searchActive){
            searchBar.focus()
        }
        else {
            searchBar.blur();
            setSearch("");
        } 
        
        
        
    }

    const getArtistsAsString = (artists) => {
        let artistsAsString;
        artists.forEach(artist => {
            artistsAsString += artist.name + " ";
        })

        return artistsAsString;

    }
    
        return (
            <div id={styles.songListComponentWrapper} className={props.playlistComponentActive ? styles.songListComponentActive : styles.songListComponentNotActive}>
                <div style={{ display: "flex", alignItems:"center", justifyContent:"center"}} >
                    <PiArrowFatLinesUpThin id={styles.arrowUpIcon} style={{margin: "15px", justifySelf:"center"}} onClick={dissmissSongList}>Go back</PiArrowFatLinesUpThin>  
                </div>
                <div style={{ display: "flex", alignItems:"center", justifyContent:"center"}}>
                    
                    {/* <Form.Label style={{ color: "white" }}>Change playlist</Form.Label> */}
                    <Form.Select style={{width: "30%", marginBottom: "15px"}} size='lg' onChange={props.handleChange} value={props.playlistId}>
                        {props.playlists.items.map((item)=> (
                            <option value={item.id} key={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                    <div id={styles.songListHeader}>
                        <Row className={styles.row}>
                            <Col className={styles.colHeader} ><h3>Song</h3></Col>
                            <Col className={styles.colHeader} ><h3>Artist(s)</h3></Col>
                            <Col className={styles.colHeader} ><h3>Album</h3></Col>
                        </Row>
                    </div>
                <div className={styles.songListComponent}>
                    {loading && (
                        <div className='d-flex justify-content-center align-items-center h-75'>
                            <TailSpin/>
                        </div>
                    )}
                    
                    <div>
                        
                        {playlist && !loading && (
                            playlist.filter(song => {
                                return search !== "" ? getArtistsAsString(song.track.artists).toLowerCase().includes(search.toLowerCase()) || song.track.name.toLowerCase().includes(search.toLowerCase()) : true
                            }).map((song, index) => (
                                <Row onDoubleClick={() => handleSongDblClick(song)} id={styles.row} key={index}>
                                    <Col className={styles.col} style={{ color: "white"}}><p style={{margin: "0px"}} >{song.track.name}</p></Col>
                                    <Col className={styles.col} style={{ color: "white"}}><p style={{margin: "0px"}} >{song.track.artists.map((artist, index) => (
                                        arrayCount(song.track.artists) > 1 && index < arrayCount(song.track.artists) -1 ? artist.name + ", " : artist.name
                                    ))}
                                    </p></Col>
                                    <Col className={styles.col} style={{ color: "white"}}><p style={{margin: "0px"}} >{song.track.album.name}</p></Col>
                                </Row>
                            ))
                        )}

                    </div>
                    <CiSearch onClick={handleSearchClick} id={styles.searchIcon} style={{position: "absolute", right: "30px", bottom: "20px"}}></CiSearch>
                    <Form.Control size='lg' id='searchBar' className={searchActive ? styles.searchBarActive : styles.searchBarNotActive} style={{transition: "0.3s", position: "absolute", right: "75px", bottom: "15px"}} value={search} onChange={handleSearchChange} placeholder='Search'></Form.Control>
                </div>
            </div>
        )   
    
}