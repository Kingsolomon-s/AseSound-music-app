import LibrarySong from "./LibrarySong";

const Library = ({ songs, setSongIndex, currentSong, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song, index) => (
          <LibrarySong
            key={song.id}
            song={song}
            selectedIndex={index}
            setSongIndex={setSongIndex}
            currentSong={currentSong}
          />
        ))}
      </div>
    </div>
  );
};
export default Library;
