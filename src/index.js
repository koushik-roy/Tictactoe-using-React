import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClickEvent}>
      {props.value}
    </button>
  );
};

const Board = () => {
  //const initialSquares = [null, null, null, null, null, null, null, null, null];
  //another way to implement the above line
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);
  const handleClickEvent = (i) => {
    //1. make a copy of squares state array
    const newSquares = [...squares];
    //2. mutate the copy, setting the i-th element to 'X'
    newSquares[i] = xIsNext ? "X" : "O";
    //3. call the setsquares function with the mutated copy
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <Square value={squares[i]} onClickEvent={() => handleClickEvent(i)} />
    );
  };
  let player = null;

  const winner = calculateWinner(squares);
  return (
    <div
      style={{
        backgroundColor: "skyblue",
        margin: 10,
        padding: 20,
      }}
    >
      <div className="status">Winner: {winner}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(9)}
      </div>
    </div>
  );
};
const Game = () => {
  return (
    <div className="game">
      TIC-TAC-TOE
      <Board />
    </div>
  );
};

// ReactDOM.render(<Game />, document.getElementById("root"));const root = ReactDOM.createRoot(document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //cols
    [0, 4, 8],
    [2, 4, 6], //diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return squares[a]; //X or O
    }
  }
  return null;
}
