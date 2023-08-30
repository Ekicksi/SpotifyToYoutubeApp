import * as React from 'react';

import { Form, Button, Card } from 'react-bootstrap';
import css from './styles/playlistInfoContainer.module.css';


//    

export const PlaylistPicker = (props) => {
    

    React.useEffect(()=> {
        console.log(props.selectedPlayList)
    }, [props])

    return (
        <Form>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'white' }}>Hello {props.profile.display_name}!</h3>
            </div>
            <Form.Group className="mb-3 mt-4" controlId="playlistId">
                <Form.Label style={{ color: "white" }}>Choose a Spotify Playlist</Form.Label>
                <Form.Select size='lg' onChange={props.handleChange} value={props.selectedPlayList}>
                    {props.playlists.items.map((item) => (
                        <option value={item.id} key={item.name}>
                            {item.name}
                        </option>
                    ))}
                </Form.Select>
                <div className={css.submitContainer} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Button onClick={props.log} style={{ width: "150px", backgroundColor: "rgba(61, 140, 70, 0.8)", border: "none", padding: "15px" }} className="text-center mt-4" variant="success">
                        Refresh access token
                    </Button>
                    <Button onClick={props.handleLogout} style={{ width: "150px", backgroundColor: "rgba(61, 140, 70, 0.8)", border: "none", padding: "15px" }} className="text-center mt-4" variant="success">
                        Log Out
                    </Button>
                </div>

            </Form.Group>
        </Form>
    )
}