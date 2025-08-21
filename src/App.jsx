import { Player } from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import { Logs } from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

let initialBoardLayout = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

export default function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  let winner = null;

  let gameBoard = initialBoardLayout;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  };

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol =
    gameBoard[combination[0].row][combination[0].column];
    const secondSymbol =
    gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol =
    gameBoard[combination[2].row][combination[2].column];
    if (
      firstSymbol == secondSymbol &&
      secondSymbol == thirdSymbol &&
      firstSymbol != null
    ) {
      winner = firstSymbol;
      break;
    }
  };

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { player: activePlayer, square: { rowIndex, colIndex } },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              playerName="Player 1"
              symbol="X"
              isActive={activePlayer == "X"}
            />
            <Player
              playerName="Player 2"
              symbol="O"
              isActive={activePlayer == "O"}
            />
          </ol>
          {winner && <h1>{winner} has won!</h1>}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
          <Logs logItems={gameTurns}></Logs>
        </div>
      </main>
    </>
  );
}
