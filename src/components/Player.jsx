import { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import extractColors from "../utils/util";

const Player = ({ currentSong, isPlaying, setIsPlaying, onSkip, songEndedHandler }) => {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [colors, setColors] = useState(["#2ac2cc", "#2ac2c2"])
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      setSongInfo((prevInfo) => ({ ...prevInfo, duration: 0, currentTime: 0 }));

      audioRef.current.load();

      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Autoplay failed", error);
              setIsPlaying(false);
            });
        } else {
          setIsPlaying(false);
        }
      }
    }

    if(currentSong?.image) {
      extractColors(currentSong, setColors)
    }
  }, [currentSong]);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    console.log(animation);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      animationPercentage: animation,
    });
  };

  const loadedMetadataHandler = (e) => {
    const duration = e.target.duration;
    setSongInfo((prevInfo) => ({
      ...prevInfo,
      duration: duration,
      currentTime: 0,
      animationPercentage: 0,
    }));
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Manual play error:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  const timeFormatter = (time) => {
    if (isNaN(time) || time === null || time === undefined) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  const dragHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const trackBackground = {
    background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`
  }

  return (
    <div className="player">
      {songInfo.duration > 0 ? (
        <div className="time-control">
          <p>{timeFormatter(songInfo.currentTime)}</p>
          <div className="track" style={trackBackground}>
            <input
              type="range"
              min={0}
              max={songInfo.duration}
              value={songInfo.currentTime}
              onChange={dragHandler}
            />
            <div style={trackAnimation} className="animate-track"></div>
          </div>
          <p>{timeFormatter(songInfo.duration)}</p>
        </div>
      ) : (
        <div className="time-control loading">
          <p>0:00</p>
          <div className="loading-bar">
            <div className="spinner"></div>
          </div>
          <p>--:--</p>
        </div>
      )}
      <div className="play-control">
        <FaAngleLeft
          onClick={() => onSkip("skip-back")}
          className="icon skip-back"
          size={25}
        />
        {isPlaying ? (
          <FaPause className="icon play" size={25} onClick={playSongHandler} />
        ) : (
          <FaPlay className="icon play" size={25} onClick={playSongHandler} />
        )}
        <FaAngleRight
          onClick={() => onSkip("skip-forward")}
          className="icon skip-forward"
          size={25}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={loadedMetadataHandler}
        ref={audioRef}
        src={currentSong?.audio}
        onEnded={songEndedHandler}
      ></audio>
    </div>
  );
};

export default Player;
