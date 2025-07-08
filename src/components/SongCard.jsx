// src/components/SongCard.jsx
export default function SongCard({
  title,
  album,
  year,
  songName,
  spotifyEmbedUrl,
}) {
  return (
    <div className="song">
      <h2>{title}</h2>
      <p>
        Album: {album} ({year})
      </p>
      <p>Song: {songName}</p>
      <iframe
        style={{ borderRadius: "12px" }}
        src={spotifyEmbedUrl}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
      ></iframe>
    </div>
  );
}
