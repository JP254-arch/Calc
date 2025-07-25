import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const clickSound = new Audio("/sounds/click.wav");

  useEffect(() => {
    document.body.className = darkMode ? "" : "light-mode";
  }, [darkMode]);

  const handleClick = (value) => {
    clickSound.play();

    if (value === "=") {
      try {
        const replacedInput = input.replace(/÷/g, "/").replace(/×/g, "*");
        const calculatedResult = evaluate(replacedInput);
        setResult(calculatedResult.toLocaleString());
        setHistory([
          { expression: input, result: calculatedResult.toLocaleString() },
          ...history,
        ]);
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "+/-") {
      try {
        const replacedInput = input.replace(/÷/g, "/").replace(/×/g, "*");
        const val = evaluate(replacedInput) * -1;
        setInput(val.toString());
      } catch {
        setResult("Error");
      }
    } else if (value === "%") {
      try {
        const replacedInput = input.replace(/÷/g, "/").replace(/×/g, "*");
        const val = evaluate(replacedInput) / 100;
        setResult(val.toLocaleString());
        setHistory([
          { expression: input + " %", result: val.toLocaleString() },
          ...history,
        ]);
      } catch {
        setResult("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className={`calculator ${darkMode ? "dark" : "light"}`}>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>

      <div className="buttons">
        <button className="btn special" onClick={() => setInput(input.slice(0, -1))}>⌫</button>
        <button className="btn special" onClick={() => handleClick("C")}>C</button>
        <button className="btn special" onClick={() => handleClick("+/-")}>+/-</button>
        <button className="btn orange" onClick={() => handleClick("÷")}>÷</button>

        {["7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+"].map((btn, idx) => (
          <button
            key={idx}
            className={`btn ${["÷", "×", "-", "+"].includes(btn) ? "orange" : ""}`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}

        <button className="btn zero" onClick={() => handleClick("0")}>0</button>
        <button className="btn" onClick={() => handleClick(".")}>.</button>
        <button className="btn orange" onClick={() => handleClick("=")}>=</button>
      </div>

      <div className="history">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <h4>History</h4>
          {history.length > 0 && (
            <button className="clear-btn" onClick={() => setHistory([])}>
              Clear
            </button>
          )}
        </div>
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
