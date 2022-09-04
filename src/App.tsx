import React, { useState, useEffect, ReactElement } from "react";
import CustomButton from "./components/CustomButton";
import getRandomInt from "./utils/number.utils";
import "./App.css";

interface IJoke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

const App: React.FC<{ initJoke?: IJoke }> = ({ initJoke }): ReactElement => {
  const [dailyJoke, setDailyJoke] = useState(initJoke);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cacheMoreJokes, setCacheMoreJokes] = useState(false);
  const [cachedJokes, setCachedJokes] = useState([]);
  const [showPunchline, setShowPunchline] = useState(false);

  const handleNewJokeClick = () => {
    setShowPunchline(false);
    const randomNumber: number = getRandomInt(0, cachedJokes.length);
    const newJoke: IJoke = cachedJokes[randomNumber];
    setDailyJoke(newJoke);
    const cpArr = cachedJokes;
    cpArr.splice(randomNumber, 1);
    setCachedJokes(cpArr);
    if (cachedJokes.length < 10) setCacheMoreJokes(!cacheMoreJokes);
  };
  const handleShowPunchlineClick = () => {
    setShowPunchline(!showPunchline);
  };
  useEffect(() => {
    (async () => {
      fetch("https://karljoke.herokuapp.com/jokes/100", {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
      })
        .then((res) => res.json())
        .then((res) => {
          setDailyJoke(res[0]);
          setLoading(false);
          res.splice(1, 2);
          setCachedJokes(res);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    })();
  }, [cacheMoreJokes]);

  return (
    <div className="joke-app">
      <header className="joke-header">
        <div>
          <CustomButton
            name="get-new-joke-button"
            className="joke-btn joke-get-button"
            onClick={handleNewJokeClick}
          >
            Get A New Random Joke
          </CustomButton>
        </div>
        <div className="joke-link">
          <a
            href="https://karljoke.herokuapp.com/"
            rel="noreferrer noopener"
            target="_blank"
          >
            View API Docs
          </a>
        </div>
      </header>
      <main className="joke-main">
        <section>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="joke-setup">{dailyJoke?.setup}</div>
          )}
          <br />
        </section>
        <section>
          <div className="joke-punchline-div">
            <CustomButton
              name="show-joke-punchline-button"
              className="joke-btn joke-punchline-button"
              onClick={handleShowPunchlineClick}
            >
              {showPunchline ? "Hide" : "Show"} Punchline
            </CustomButton>
          </div>
        </section>
        <section>
          <div
            className={
              showPunchline ? "joke-punchline-show" : "joke-punchline-hide"
            }
          >
            {dailyJoke?.punchline}
          </div>
        </section>
      </main>
    </div>
  );
};
export default App;
