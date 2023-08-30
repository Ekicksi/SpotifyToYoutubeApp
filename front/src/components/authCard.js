import styles from './styles/playlistInfoContainer.module.css';
import { Form, Button, Card } from 'react-bootstrap';
import { useEffect } from 'react';

export const AuthCard = (props) => {

    return(
        <div>
            {
                <div className={styles.cardContainer}>
                    <Card className={styles.cardElement} style={{ backgroundColor: "rgb(0, 0, 0, 0.7)", color: "white" }}>
                        <Card.Title>Authorization needed!</Card.Title>
                        <Card.Text>
                            In order for this application to work, you need to authenticate with your Spotify account.
                        </Card.Text>
                        <Card.Text>
                            Button down below will redirect you to Spotify
                        </Card.Text>
                        <div className='mt-2' style={{ textAlign: 'center' }}>
                            <Button onClick={props.authorizeApp} variant='success'>Authorize this app</Button>
                        </div>
                    </Card>

                </div>
            
            }
    </div>
)}