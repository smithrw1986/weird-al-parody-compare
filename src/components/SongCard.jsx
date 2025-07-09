import { useEffect, useState } from "react";

export default function SongCard({
  title,
  artist,
  album,
  year,
  label,
  youtubeId,
}) {
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
      }
    }
    fetchEmbed();
  }, [title, artist]);

  return (
    <div className="song-card">
      <div className="card-label">{label}</div>

      {youtubeId && (
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={`${title} music video`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <h3>{title}</h3>
      <p className="song-meta">
        {artist} &middot; <em>{album}</em> ({year})
      </p>

      {embedUrl && (
        <div className="embed-container">
          <iframe
            src={embedUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            allowTransparency="true"
          ></iframe>
          <p class="open-link">
            <a
              href={embedUrl.replace("/embed/", "/")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen on Spotify (volume unable to be controlled in embedded
              player - sorry!)
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
