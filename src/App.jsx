import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  const handleLap = () => {
    if (running) {
      setLaps([...laps, formatTime(time)]);
    }
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="container">
      <h1>Stopwatch</h1>

      <div className="display">{formatTime(time)}</div>

      <div className="buttons">
        {!running ? (
          <button onClick={() => setRunning(true)}>
            {time === 0 ? "Start" : "Resume"}
          </button>
        ) : (
          <button onClick={() => setRunning(false)}>Pause</button>
        )}

        <button onClick={handleReset}>Reset</button>

        <button onClick={handleLap} disabled={!running}>
          Lap
        </button>
      </div>

      {laps.length > 0 && (
        <div className="laps">
          <h2>Laps</h2>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>
                Lap {index + 1}: {lap}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;