import { useState } from "react";
import { songPairs } from "../data/songs";
import SongCard from "./SongCard";

export default function SongPairViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songPairs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songPairs.length) % songPairs.length);
  };

  const pair = songPairs[currentIndex];

  return (
    <div>
      <div className="song-container-wrapper">
        <div className="song-container">
          <SongCard {...pair.parody} label="Parody" />
          <div className="vs-label">vs</div>
          <SongCard {...pair.original} label="Original" />
        </div>
      </div>
      <div className="controls">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
