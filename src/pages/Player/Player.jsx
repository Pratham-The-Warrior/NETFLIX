import React from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const Player = () => {
  /* here paste the documentation of tmdb api for video playing
 https://developers.themoviedb.org/3/movies/get-movie-videos */

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" />
      <iframe
        width={"90%"}
        height="90%"
        src="https://www.youtube.com/embed/hkHHwA-vEyQ"
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        {/* fetch the data from the api and show it here */}

        <p>Published Date</p>
        <p>Name</p>
        <p>Type</p>
      </div>
    </div>
  );
};

export default Player;
