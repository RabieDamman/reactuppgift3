import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Select from 'react-select';

function Register({ addToHighScore }) {
    const [game, setGame] = useState("")
    const [player, setPlayer] = useState("")
    const [score, setScore] = useState("")
    const [date, setDate] = useState("")

    const history = useHistory()

    const [gameList, setGameList] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/games')
            .then(response => response.json())
            .then(res => {
                setGameList(res)
            });
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const dt = {
            game: game,
            player: player,
            score: score,
            date: date,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dt)
        };
        fetch('http://localhost:8000/highscores', requestOptions)
            .then(response => response.json())
            .then(data => console.log('Register ', data));

        // addToHighScore(dt)
        history.push("/")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    {/* <label htmlFor="exampleInputEmail1">Game</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your game" onChange={(e) => setGame(e.target.value)} /> */}

                    <Select
                        options={gameList.map((d) => ({
                            value: d._id,
                            label: d.title,
                        }))}
                        placeholder="please select game"
                        required
                        onChange={(e) => setGame({ id: e.value, title: e.label })
                        }

                    />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">player</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your  player" onChange={(e) => setPlayer(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Score</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your  score" onChange={(e) => setScore(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Date</label>
                    <input type="Date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your  date" onChange={(e) => setDate(e.target.value)} />
                </div>



                <button type="submit" className="btn btn-primary">Rigester</button>
            </form>
        </div>
    )
}

export default Register
