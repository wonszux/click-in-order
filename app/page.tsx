"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [round, setRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [sequence, setSequence] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number[]>([]);
  const [blinkIndex, setBlinkIndex] = useState<number | null>(null);
  const [shouldBlink, setShouldBlink] = useState(false);

  const getColorClass = (color: string, index: number) => {
    if (index === blinkIndex) {
      switch (color) {
        case "green":
          return "bg-green-200";
        case "blue":
          return "bg-blue-200";
        case "yellow":
          return "bg-yellow-200";
        case "red":
          return "bg-red-200";
      }
    } else {
      switch (color) {
        case "green":
          return "bg-green-400";
        case "blue":
          return "bg-blue-400";
        case "yellow":
          return "bg-yellow-400";
        case "red":
          return "bg-red-500";
      }
    }
  };

  const Generate = () => {
    const newRand = Math.floor(Math.random() * 4);
    setSequence((prevRand) => [...prevRand, newRand]);
  };

  const SquaresComponent = () => {
    const squares = ["green", "blue", "yellow", "red"];

    const handleClick = (index: number) => {
      setAnswer((prevAns) => [...prevAns, index]);
      console.log(round);
      console.log(sequence);
    };

    const squareItem = squares.map((color, index) => (
      <div
        onClick={() => handleClick(index)}
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
      }, i * 800);

      setTimeout(() => {
        setBlinkIndex(null);
      }, i * 800 + 500);
    });
  };

  const GameRestart = () => {
    setRound(1);
    setSequence([]);
    setGameStarted(false);
    setAnswer([]);
    setShouldBlink(false);
  };

  const StartGame = () => {
    Generate();
    setGameStarted(true);
    setShouldBlink(true);
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

  useEffect(() => {
    if (answer.length === round && answer.length > 0) {
      const currentSequence = sequence.slice(0, round);
      const isCorrect =
        JSON.stringify(answer) === JSON.stringify(currentSequence);

      if (isCorrect) {
        setTimeout(() => {
          alert("You won this round!");
          setAnswer([]);
          setRound((prev) => prev + 1);
          Generate();
          setShouldBlink(true);
        }, 300);
      } else {
        setTimeout(() => {
          alert("You lost, restarting");
          GameRestart();
        }, 300);
      }
    }
  }, [answer, round, sequence]);

  useEffect(() => {
    if (shouldBlink && sequence.length > 0) {
      Blinking();
      setShouldBlink(false);
    }
  }, [sequence, shouldBlink]);

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
