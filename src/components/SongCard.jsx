import { useEffect, useState } from "react";

export default function SongCard({ title, artist, album, year }) {
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
      <h3>{title}</h3>
      <p>
        {artist} — {album} ({year})
      </p>

      {albumArt && (
        <img
          src={albumArt}
          alt={`${album} album cover`}
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
      )}

      {embedUrl && (
        <iframe
          src={embedUrl}
          width="300"
          height="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
}
