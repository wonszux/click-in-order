"use client";

import { useEffect, useState } from "react";

const GREEN = "green-300";
const BLUE = "blue-300";
const YELLOW = "yellow-300";
const RED = "red-300";
const BLINK = "shadow-";

export default function Home() {
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState<true | false>(false);
  const [sequence, setSequence] = useState([0, 1, 2, 3, 0, 1, 2, 3]);
  const [squareBlink, setSquareblink] = useState("");

  const Generate = () => {
    const newRandom = Math.floor(Math.random() * 4);
    setSequence((prev) => [...prev, newRandom]);
  };

  const SquaresComponent = () => {
    const squares = [GREEN, BLUE, YELLOW, RED];

    const handleClick = (square: string) => {
      console.log(square);
      Generate();
      console.log(sequence);
    };

    const squareItem = squares.map((square, index) => (
      <div
        onClick={() => handleClick(square)}
        key={index}
        className={"w-50 h-50 rounded-lg bg-" + square}
      ></div>
    ));

    return squareItem;
  };

  // async function blinking(square: any) {
  //   const blink = BLINK + square;
  //   for (let i = 0; i < sequence.length; i++) {
  //     useEffect(() => {
  //       setSquareblink(blink);
  //     });
  //     setTimeout(() => {
  //       useEffect(() => {
  //         setSquareblink("");
  //       });
  //     }, 1000);
  //   }
  // }

  // const StartGame = () => {
  //   blinking;
  // };

  const StartButton = () => {
    return (
      <div className="flex flex-row justify-center items-center">
        <button
          // onClick={StartGame}
          className=" bg-purple-300 font-black text-black w-50 h-10 rounded-4xl"
        >
          Start the Game
        </button>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 min-h-screen">
      <div className="flex flex-row justify-center items-center">
        <div className="grid grid-cols-2 space-x-3 space-y-3">
          {SquaresComponent()}
        </div>
      </div>
      {StartButton()}
    </div>
  );
}
