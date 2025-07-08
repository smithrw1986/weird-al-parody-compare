import fetch from "node-fetch";

export async function handler(event) {
  const { track, artist } = JSON.parse(event.body);

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const searchQuery = `track:${track} artist:${artist}`;
  const searchRes = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      searchQuery
    )}&type=track&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const searchData = await searchRes.json();

  if (searchData.tracks.items.length === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Track not found" }),
    };
  }

  const trackId = searchData.tracks.items[0].id;
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;

  return {
    statusCode: 200,
    body: JSON.stringify({ embedUrl }),
  };
}
