const video = document.querySelector("video");
const progressRange = document.getElementsByClassName("progress-range");
const progressBar = document.getElementsByClassName("progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.getElementsByClassName("volume-range");
const volumeBar = document.getElementsByClassName("volume-bar");
const currentTime = document.getElementsByClassName("time-elapsed");
const duration = document.getElementsByClassName("time-duration");
const fullScreenBtn = document.getElementsByClassName("fullscreen");

// Play & Pause ----------------------------------- //
function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}

function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}
// Progress Bar ---------------------------------- //

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showPlayIcon);
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    togglePlay();
  }
});
