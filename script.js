const video = document.querySelector("video");
const player = document.querySelector(".player");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullScreenBtn = document.querySelector(".fullscreen");
const playerSpeed = document.querySelector(".player-speed");

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
function progressBarPlay(e) {
  let percentWidth = e.offsetX / e.srcElement.clientWidth;
  video.currentTime = percentWidth * video.duration;
}

function setProgressBarWidth() {
  displayTime(video.currentTime, currentTime);
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
}

function displayTime(time, el) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  el.textContent = `${minutes}:${seconds}`;
}

function setDuration() {
  displayTime(video.duration, duration);
}
// Volume Controls --------------------------- //
function changeVolume(e) {
  if (video.muted) {
    video.muted = false;
  }
  let volume = e.offsetX / volumeRange.offsetWidth;
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
}

function toggleMute() {
  if (video.muted) {
    video.muted = false;
    volumeBar.style.width = `${video.volume * 100}%`;
    volumeIcon.setAttribute("title", "Mute");
  } else {
    video.muted = true;
    volumeBar.style.width = 0;
    volumeIcon.setAttribute("title", "Unmute");
  }
}

function volumeIconClass() {
  volumeIcon.className = "fas";
  let volume = video.volume;
  if (video.muted) {
    volumeIcon.classList.add("fa-volume-mute");
  } else if (volume > 0.7) {
    volumeIcon.classList.add("fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fa-volume-down");
  } else {
    volumeIcon.classList.add("fa-volume-off");
  }
}
// Change Playback Speed -------------------- //

function changeSpeed() {
  let speed = playerSpeed.value;
  video.playbackRate = speed;
}

// Fullscreen ------------------------------- //
let fullscreen = false;

function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }

  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", setProgressBarWidth);
video.addEventListener("canplay", setDuration);
video.addEventListener("ended", showPlayIcon);
video.addEventListener("volumechange", volumeIconClass);
volumeIcon.addEventListener("click", toggleMute);
volumeRange.addEventListener("click", changeVolume);
progressRange.addEventListener("click", progressBarPlay);
playerSpeed.addEventListener("change", changeSpeed);
fullScreenBtn.addEventListener("click", toggleFullscreen);
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    togglePlay();
  }
});
