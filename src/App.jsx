import "./App.css";
import SongPairViewer from "./components/SongPairViewer";

function App() {
  return (
    <main>
      <h1 className="site-title">"Weird Al" Parody Comparison</h1>
      <p className="site-description">
        Compare "Weird Al" Yankovic's hilarious parodies with the original hits.
        Watch, listen, and swipe through your favorites!
      </p>
      <SongPairViewer />
    </main>
  );
}

export default App;
