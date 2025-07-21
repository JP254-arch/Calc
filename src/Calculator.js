import React, { useState } from "react";
import { evaluate } from "mathjs";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const clickSound = new Audio("/sounds/click.mp3");


  const handleClick = (value) => {
    clickSound.play();
    if (value === "=") {
      try {
        const calculatedResult = evaluate(input);
        setResult(calculatedResult.toLocaleString());
        setHistory([{ expression: input, result: calculatedResult.toLocaleString() }, ...history]);
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className={`calculator ${darkMode ? "dark" : "light"}`}>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>

      <div className="buttons">
        {["C", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="].map((btn, idx) => (
          <button
            key={idx}
            className={`btn ${["/", "*", "-", "+", "="].includes(btn) ? "orange" : ""}`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="history">
        <h4>History</h4>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item.expression} = {item.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
