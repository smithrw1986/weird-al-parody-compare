import { useEffect, useState } from "react";

export default function SongCard({ title, artist }) {
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    async function fetchEmbed() {
      const res = await fetch("/.netlify/functions/getSpotifyEmbedUrl", {
        method: "POST",
        body: JSON.stringify({ track: title, artist }),
      });

      const data = await res.json();
      if (data.embedUrl) {
        setEmbedUrl(data.embedUrl);
      }
    }
    fetchEmbed();
  }, [title, artist]);

  return (
    <div className="song">
      <h2>{title}</h2>
      <p>Artist: {artist}</p>
      {embedUrl ? (
        <iframe
          style={{ borderRadius: "12px" }}
          src={embedUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
