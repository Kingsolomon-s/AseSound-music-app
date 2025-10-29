const LibrarySong = ({ song, songs, setSongIndex, currentSong, selectedIndex }) => {
  const onSelect = async () => {
    setSongIndex(selectedIndex)
  };

  const isSelected = song.id === currentSong?.id;

  const librarySongClassName = isSelected
    ? "library-song selected"
    : "library-song";

  return (
    <div className={librarySongClassName} onClick={onSelect}>
      <img src={song?.image} alt={song?.name} />
      <div className="song-description">
        <h3>{song?.name}</h3>
        <h4>{song?.artist_name}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
