import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { songPairs } from "../data/songs";
import SongCard from "./SongCard";

export default function SongPairViewer() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      speed={700}
    >
      {songPairs.map((pair, index) => (
        <SwiperSlide key={index}>
          <div className="song-container-wrapper">
            <div className="song-container">
              <SongCard {...pair.parody} label="Parody" />
              <div className="vs-label">vs</div>
              <SongCard {...pair.original} label="Original" />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
