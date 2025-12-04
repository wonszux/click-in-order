"use client";

import { useState } from "react";

export default function Home() {
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState<true | false>(false);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center space-y-3">
      <div className="flex flex-row space-x-3">
        <div className="bg-green-300 min-w-50 min-h-50 rounded-xl"></div>
        <div className="bg-blue-300 min-w-50 min-h-50 rounded-lg"></div>
      </div>
      <div className="flex flex-row space-x-3">
        <div className="bg-yellow-300 min-w-50 min-h-50 rounded-lg"></div>
        <div className="bg-red-300 min-w-50 min-h-50 rounded-lg"></div>
      </div>
    </div>
  );
}
