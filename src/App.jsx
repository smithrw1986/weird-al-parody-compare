import "./App.css";

function App() {
  return (
    <main>
      <h1>Weird Al Parody Comparison</h1>
      <div className="song-container">
        <div className="song">
          <h2>Weird Al Song</h2>
          <p>Album: Dare to Be Stupid (1985)</p>
          <p>Song: Like a Surgeon</p>
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/7p0qZ2VNf6NfpRCMnSeVYG?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          ></iframe>
        </div>
        <div className="song">
          <h2>Original Song</h2>
          <p>Album: Like a Virgin (1984)</p>
          <p>Song: Like a Virgin</p>
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/4pYw6GhRtP7g0qMSu7m0Ec?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </main>
  );
}

export default App;
