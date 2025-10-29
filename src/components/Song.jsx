const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img src={currentSong?.image} alt={currentSong?.name} />
      <h2>{currentSong?.name}</h2>
      <h3>{currentSong?.artist_name}</h3>
    </div>
  );
};

export default Song;
