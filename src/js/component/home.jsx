import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';

const Home = () => {
    const [songs, setSongs] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(null);
	const [baseUrl,setBaseUrl]=useState('https://playground.4geeks.com');
	const audioRef = useRef();

	function getSongs() {
		fetch('https://playground.4geeks.com/sound/songs')
            .then(response => response.json())
            .then(data => setSongs(data.songs))
            .catch(error => console.error('Error al cargar las canciones:', error));
	}
	console.log(songs);
    useEffect(() => {
		getSongs()
    }, []);

	const playSong=(url)=>{
		if (audioRef.current) {
            console.log("Esta es la url: ", baseUrl+url);
            audioRef.current.src = baseUrl+url;
            audioRef.current.play();
            setCurrentIndex(index);
        }
	}

	const handlePlay=()=>{
		if (audioRef.current) {
            audioRef.current.play();
        }
	}

	const handlePause=()=>{
		if (audioRef.current) {
            audioRef.current.pause();
        }
	}

	const handleNext=()=>{
		if (songs.length > 0) {
            const nextIndex = (currentIndex + 1) % songs.length;
            playSong(nextIndex);
        }
	}

	const handlePrevious=()=>{
		if (songs.length>0){
			const prevIndex = (currentIndex-1+songs.length) % songs.length;
            playSong(prevIndex);
		}
	}

    return (
        <Container className="my-4 bg-black">
            <Row>
                <Col className="text-center">
                    <h1>Lista de Canciones</h1>
                    <ListGroup>
                        {songs.map((song, index) => (
                            <ListGroup.Item 
							key={song.id}
							onClick={()=>playSong(song.url)}
							style={{cursor:'pointer', textAlign:'left',padding:'20px'}}
							 >
                               <span style={{marginRight:'20px'}}>{index +1}.</span>{song.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
			<Row>
				<Col className="text-center fixed-bottom bg-light p-3">
					<i className="fas fa-backward fa-2x m-2" onClick={handlePrevious}></i>	
                    <i className="fas fa-play fa-2x m-2" onClick={handlePlay}></i>
					<i className="fas fa-pause fa-2x m-2" onClick={handlePause}></i>
					<i className="fas fa-forward fa-2x m-2" onClick={handleNext}></i>
					<audio ref={audioRef} controls><source src={audioRef} type="audio/mp3"/></audio>
                </Col>
			</Row>
        </Container>
    );
};

export default Home;
