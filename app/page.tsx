"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [round, setRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [sequence, setSequence] = useState([0]);
  const [answer, setAnswer] = useState<number[]>([]);
  const [blinkIndex, setBlinkIndex] = useState<number | null>(null);

  const getColorClass = (color: string, index: number) => {
    if (index === blinkIndex) {
      switch (color) {
        case "green":
          return "bg-green-700";
        case "blue":
          return "bg-blue-700";
        case "yellow":
          return "bg-yellow-700";
        case "red":
          return "bg-red-700";
      }
    } else {
      switch (color) {
        case "green":
          return "bg-green-300";
        case "blue":
          return "bg-blue-300";
        case "yellow":
          return "bg-yellow-300";
        case "red":
          return "bg-red-300";
      }
    }
  };

  const Generate = () => {
    const newRandom = Math.floor(Math.random() * 4);
    setSequence((prevRand) => [...prevRand, newRandom]);
  };

  const SquaresComponent = () => {
    const squares = ["green", "blue", "yellow", "red"];

    const handleClick = (round: number, sequence: number[], index: number) => {
      console.log(index);
      setAnswer((prevAns) => [...prevAns, index]);
      GetAnswer(round, sequence);
      console.log(round);
      console.log(sequence);
    };

    const squareItem = squares.map((color, index) => (
      <div
        onClick={() => handleClick(round, sequence, index)}
        key={index}
        className={`w-50 h-50 rounded-lg ${getColorClass(color, index)}`}
      ></div>
    ));

    return squareItem;
  };

  const Blinking = () => {
    sequence.forEach((colorIndex, i) => {
      setTimeout(() => {
        setBlinkIndex(colorIndex);
        setTimeout(() => setBlinkIndex(null), 500);
      }, i * 800);
    });
  };

  const GameRestart = (round: number, sequence: number[]) => {
    setRound(1);
    setSequence([0]);
  };

  const GetAnswer = (round: number, sequence: number[]) => {
    if (answer.length === round) {
      if (answer === sequence) {
        setAnswer([]);
        setRound(round + 1);
        Generate();
        alert("you won this round");
      } else {
        GameRestart(round, sequence);
        alert("you lost, restarting");
      }
    }
  };

  const StartGame = () => {
    Blinking();
    GetAnswer(round, sequence);
    setGameStarted(true);
  };

  const StartButton = () => {
    return (
      <div className="flex flex-row justify-center items-center">
        {!gameStarted ? (
          <button
            onClick={() => StartGame()}
            className=" bg-purple-300 font-black text-black w-50 h-10 rounded-4xl"
          >
            Start the Game
          </button>
        ) : (
          <div>{round}</div>
        )}
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
