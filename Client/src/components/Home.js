import React from 'react';
import { Link } from 'react-router-dom';

function Home({ s }) {
  const { game, date, player, score } = s[0];

  return (
    <div className="">
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col m-4">
            <div className="card-block px-2">
              <Link to={`/gamedetails/${game.title}`}>
                <h3 className="item_game">{game.title}</h3>
              </Link>
              <p className="card-text">{date}</p>
              <p className="card-text">{player}</p>
            </div>
          </div>
          <div className="col m-4 text-center">
            <div className="card-block px-2">
              <span className="card-text ">{score}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
