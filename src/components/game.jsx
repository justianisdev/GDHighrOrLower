import { useEffect, useState } from "react";
import "../styling/game.css";
function Game({ playing, setPlaying }) {
  const [currentlevel, setCurrentLevel] = useState({});
  const [nextLevel, setNextLevel] = useState({});
  const [nextLevelDownloads, setNextLevelDownloads] = useState("???");
  const [score, setScore] = useState(0);
  const [Highscore, setHighscore] = useState(0);
  const [buttons, setButtons] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const fetchLevel = async () => {
    const response = await fetch(
      `${API_BASE_URL}/generate/level/downloads`,
    );
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const nextRound = async () => {
    const newLevel = await fetchLevel();
    setCurrentLevel(nextLevel);
    setNextLevel(newLevel);
  };

  const animateDownloads = (downloadCount) => {
    let current = 0;

    const duration = 1500;
    const steps = 60;

    const increment = downloadCount / steps;
    const intervalTime = duration / steps;

    setNextLevelDownloads("0");

    const counter = setInterval(() => {
      current += increment;

      if (current >= downloadCount) {
        current = downloadCount;
        clearInterval(counter);
      }

      setNextLevelDownloads(Math.floor(current).toLocaleString());
    }, intervalTime);
  };

  const guessEvent = (answer) => {
    setButtons(true);
    const compare = nextLevel.downloads >= currentlevel.downloads;
    animateDownloads(nextLevel.downloads);
    if (answer === compare) {
      setTimeout(() => {
        setScore((score) => score + 1);
        setNextLevelDownloads("???");
        nextRound();
        setButtons(false);
      }, 3000);
    } else {
      setTimeout(() => {
        if (score > Highscore) {
          localStorage.setItem("highscore", score);
        }

        setScore(0);
        setPlaying(false);
      }, 3000);
    }
  };

  const levelMap = [currentlevel, nextLevel];

  useEffect(() => {
    const initializeGame = async () => {
      localStorage.getItem("highscore", score);
      const highscoreCount = localStorage.getItem("highscore");
      setHighscore(highscoreCount);
      try {
        const levelOne = await fetchLevel();
        setCurrentLevel(levelOne);
        const levelTwo = await fetchLevel();
        setNextLevel(levelTwo);
      } catch (error) {
        console.error("Failed to initialize game:", error);
      }
    };

    initializeGame();
  }, []);

  return (
    <>
      <div className="game-container">
        {levelMap.map((level, index) => (
          <div
            className="level-panel"
            key={index}
            style={{ backgroundImage: `url(${level.levelpng})` }}
          >

            {index === 1 && (
              <div>
                {" "}
                <h6>Score: {score}</h6>
                <h5>Highscore: {Highscore}</h5>
              </div>
            )}

            <h3>{level.name}</h3>
            <p>by: {level.author}</p>

            <p>
              downloads:{" "}
              {index === 1
                ? nextLevelDownloads
                : level.downloads?.toLocaleString() || "0"}
            </p>


            {index === 1 && !buttons && (
              <div className="buttons">
                <button disabled={buttons} onClick={() => guessEvent(true)}>
                  Higher
                </button>
                <button disabled={buttons} onClick={() => guessEvent(false)}>
                  Lower
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Game;
