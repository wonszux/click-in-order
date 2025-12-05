"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState<true | false>(false);
  const [correct, setCorrect] = useState(0);
  const [sequence, setSequence] = useState([]);

  function Generate() {
    const randomSquare = Math.floor(Math.random() * (5 - 1) + 1);
    setCorrect(randomSquare);
  }

  function ClickHandler(key: any) {
    console.log(key);
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center space-y-3">
      <div className="flex flex-row space-x-3">
        <div
          key={1}
          onClick={ClickHandler}
          className="bg-green-300 w-50 h-50 rounded-xl"
        ></div>
        <div key={2} className="bg-blue-300 w-50 h-50 rounded-lg"></div>
      </div>
      <div className="flex flex-row space-x-3">
        <div key={3} className="bg-yellow-300 w-50 h-50 rounded-lg"></div>
        <div key={4} className="bg-red-300 w-50 h-50 rounded-lg"></div>
      </div>
    </div>
  );
}
