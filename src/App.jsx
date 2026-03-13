import { useState } from "react";
import Game from "./components/game.jsx";
import "./styling/home.css";
import gdLogo from "./assets/geometrydash.png";
import higherLowerText from "./assets/gold - higher or lower.png";
function App() {
  const [playing, setPlaying] = useState(false);
  const levelPhotos = [10565740, 128,11402965,119550490,100417573];
  const randomLevelPhoto =
    levelPhotos[Math.floor(Math.random() * levelPhotos.length)];
  return (
    <div>
      {playing ? (
        <Game playing={playing} setPlaying={setPlaying} />
      ) : (
        <div
          className="home-container"
          style={{
            backgroundImage: `url(https://levelthumbs.prevter.me/thumbnail/${randomLevelPhoto}/small)`,
          }}
        >
          <div className="home-logo-section">
            <img src={higherLowerText} alt="Higher or Lower" className="higher-lower-text" />
            <img src={gdLogo} alt="Geometry Dash Logo" className="gd-logo" />
          </div>
          <h3 className="home-subtitle">
            guess if the secret second level is higher or lower than the first
            in download count!
          </h3>
          <button className="home-play-btn" onClick={() => setPlaying(true)}>play</button>
        </div>
      )}
    </div>
  );
}

export default App;
