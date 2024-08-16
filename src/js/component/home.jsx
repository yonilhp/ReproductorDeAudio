import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const Home = () => {
    const [songs, setSongs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si está reproduciendo
    const [baseUrl, setBaseUrl] = useState('https://playground.4geeks.com');
    const audioRef = useRef();

    function getSongs() {
        fetch('https://playground.4geeks.com/sound/songs')
            .then(response => response.json())
            .then(data => setSongs(data.songs))
            .catch(error => console.error('Error al cargar las canciones:', error));
    }

    useEffect(() => {
        getSongs();
    }, []);

    const playSong = (url, index) => {
        if (audioRef.current) {
            console.log("Esta es la url: ", baseUrl + url);
            audioRef.current.src = baseUrl + url;
            audioRef.current.play();
            setCurrentIndex(index); // Actualiza el índice actual
            setIsPlaying(true); // Actualiza el estado a "reproduciendo"
        }
    }

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false); // Actualiza el estado a "pausado"
        }
    }

    const handleNext = () => {
        if (songs.length > 0 && currentIndex !== null) {
            const nextIndex = (currentIndex + 1) % songs.length;
            playSong(songs[nextIndex].url, nextIndex);
        }
    }

    const handlePrevious = () => {
        if (songs.length > 0 && currentIndex !== null) {
            const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
            playSong(songs[prevIndex].url, prevIndex);
        }
    }

    return (
        <Container className="my-4 bg-black">
            <Row>
                <Col className="text-center">
                    <h1 style={{ color: '#d4edda' }}>Mis canciones favoritas</h1>
                    <ListGroup>
                        {songs.map((song, index) => (
                            <ListGroup.Item 
                                key={song.id}
                                onClick={() => playSong(song.url, index)}
                                style={{
                                    cursor: 'pointer', 
                                    textAlign: 'left', 
                                    padding: '20px',
                                    backgroundColor: currentIndex === index ? '#d4edda' : 'white' // Aplica el fondo gris a la canción en reproducción
                                }}
                            >
                               <span style={{ marginRight: '20px' }}>{index + 1}.</span>{song.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col className="text-center fixed-bottom bg-light p-3">
                    <i className="fas fa-backward fa-2x m-2" onClick={handlePrevious}></i>
                    {isPlaying ? (
                        <i className="fas fa-pause fa-2x m-2" onClick={handlePause}></i>
                    ) : (
                        <i className="fas fa-play fa-2x m-2" onClick={handlePlay}></i>
                    )}
                    <i className="fas fa-forward fa-2x m-2" onClick={handleNext}></i>
                    <audio ref={audioRef} controls><source src={audioRef.current?.src} type="audio/mp3" /></audio>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
