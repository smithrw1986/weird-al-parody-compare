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
          <p className="embed-label">Spotify Preview</p>
          <iframe
            src={embedUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            allowTransparency="true"
          ></iframe>
          <p className="open-link">
            <a
              href={embedUrl.replace("/embed/", "/")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Spotify
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
