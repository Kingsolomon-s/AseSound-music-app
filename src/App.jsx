import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song"
import Library from "./components/Library";
import Nav from "./components/Nav";
import useData from "./hooks/useData";
import { useState } from "react";

function App() {
  const { data, error } = useData();
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songIndex, setSongIndex] = useState(0);

  const currentSong = data[songIndex];

  const skipTrackHandler = (direction) => {
    let newIndex;

    const listLength = data.length;

    if (direction === "skip-forward") {
      newIndex = (songIndex + 1) % listLength;
    } else if (direction === "skip-back") {
      newIndex = (songIndex - 1 + listLength) % listLength
    }

    setSongIndex(newIndex)

    if (isPlaying) {
      setIsPlaying(true);
    }
  }

  const songEndedHandler = () => {
    const listLength = data.length;
    let newIndex = (songIndex + 1) % listLength;
    setSongIndex(newIndex)
    if (isPlaying) {
      setIsPlaying(true);
    }
  }

  if (!currentSong) return <div>Loading</div>;

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onSkip={skipTrackHandler}
        songEndedHandler={songEndedHandler}
      />
      <Library
        songs={data}
        setSongIndex={setSongIndex}
        currentSong={currentSong}
        libraryStatus={libraryStatus}
      />
    </div>
  );
}

export default App;
