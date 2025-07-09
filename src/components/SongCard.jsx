import { useEffect, useState } from "react";

export default function SongCard({ title, artist, album, year, label }) {
  const [albumArt, setAlbumArt] = useState(null);
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    async function fetchEmbed() {
      const res = await fetch("/.netlify/functions/getSpotifyEmbedUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ track: title, artist }),
      });

      if (!res.ok) {
        console.error("Function error:", res.status);
        return;
      }

      const data = await res.json();
      if (data.embedUrl) {
        setEmbedUrl(data.embedUrl);
        setAlbumArt(data.albumArt);
      }
    }
    fetchEmbed();
  }, [title, artist]);

  return (
    <div className="song-card">
      <div className="card-label">{label}</div>
      {albumArt && (
        <img
          className="album-art"
          src={albumArt}
          alt={`${album} album cover`}
        />
      )}

      <h3>{title}</h3>
      <p className="song-meta">
        {artist} &middot; <em>{album}</em> ({year})
      </p>

      {embedUrl && (
        <div className="embed-container">
          <iframe
            src={embedUrl}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            allowTransparency="true"
          ></iframe>
        </div>
      )}
    </div>
  );
}
