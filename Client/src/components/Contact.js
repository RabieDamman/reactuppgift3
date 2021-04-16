import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
function Contact({ highscores }) {
  const [datascore, setData] = useState([]);

  useEffect(() => {
    function groupByGame(score) {
      let group = score.reduce((r, a) => {
        r[a.game.title] = [...(r[a.game.title] || []), a];
        return r;
      }, []);
      let result = Object.values(group.sort((a, b) => b.score - a.score));
      setData(result);
    }
    groupByGame(highscores);
  }, [highscores]);

  <h1 className="text-center">Highscores</h1>;

  return (
    <div>
      <Link to="/register">Register </Link>
      {datascore && datascore.map((s, index) => <Home key={index} s={s} />)}
    </div>
  );
}

export default Contact;
