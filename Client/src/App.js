import Contact from './components/Contact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import GameDetails from './components/GameDetails';
import { useState, useEffect } from 'react';
import './App.css';

const highscores = [];
//  = [
//   { id: 1, game: "Tetris", date: "2020-01-01", player: "John Doe", score: 999999 },
//   { id: 2, game: "Pacman", date: "2020-01-01", player: "John Doe", score: 999999 },
//   { id: 3, game: "Asteroids", date: "2020-01-01", player: "John Doe", score: 999999 },
// ];

function App() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/highscores')
      .then((response) => response.json())
      .then((res) => {
        setScores(res);
      });
  }, []);

  const addToHighScore = (data) => {
    // count = count + 1
    // data.id = count
    setScores(data);
    console.log(highscores);
  };
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            {' '}
            {/* Home Page */}
            <Contact highscores={scores} />
          </Route>
          <Route exact path="/register">
            <Register addToHighScore={addToHighScore} />
            {/*   To regigster  Page   */}
          </Route>
          <Route path="/gamedetails/:slug">
            <GameDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
