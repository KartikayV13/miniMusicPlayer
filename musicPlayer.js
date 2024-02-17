const container = document.querySelector(".container");
musicImg = container.querySelector(".img-area img");
musicName = container.querySelector(".song-details .name");
musicArtist = container.querySelector(".song-details .artist");
mainAudio = container.querySelector("#main-audio");
playpauseBtn = container.querySelector(".play-pause");
nextBtn = container.querySelector("#next");
prevBtn = container.querySelector("#prev");
progressArea = container.querySelector(".progress-area");
progressBar = container.querySelector(".progress-bar");
musicList = container.querySelector(".music-list");
moreMusicBtn = container.querySelector("#more-music");
closeMusicBtn = container.querySelector("#close");

let allMusics = [
  {
    id: "1",
    name: "Aankhon Mein Teri Ajab Si",
    artist: "KK",
    img: "img-1",
    src: "music-1",
  },
  {
    id: "2",
    name: "Main Agar Kahoon",
    artist: "Suno Nigam",
    img: "img-2",
    src: "music-2",
  },
  {
    id: "3",
    name: "Jeene Laga Hoon",
    artist: "KK",
    img: "img-3",
    src: "music-3",
  },
  {
    id: "4",
    name: "Chaahat",
    artist: "Rahat Fateh Ali Khan",
    img: "img-4",
    src: "music-4",
  },
  {
    id: "5",
    name: "Dil Ibaadat",
    artist: "KK",
    img: "img-5",
    src: "music-5",
  },
  {
    id: "6",
    name: "Hosanna",
    artist: "A.R Rehman",
    img: "img-6",
    src: "music-6",
  },
  {
    id: "7",
    name: "Labon Ko",
    artist: "KK",
    img: "img-7",
    src: "music-7",
  },
  {
    id: "8",
    name: "Jeena Jeena",
    artist: "KK",
    img: "img-8",
    src: "music-8",
  },
  {
    id: "9",
    name: "Mere Nishan",
    artist: "Darshan Rawal",
    img: "img-9",
    src: "music-9",
  },
  {
    id: "10",
    name: "Tu Jo Mila",
    artist: "KK",
    img: "img-10",
    src: "music-10",
  },
];

let musicIndex = Math.floor(Math.random() * allMusics.length + 1);

window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingSong();
});

//load music function

function loadMusic(indexNumb) {
  musicName.innerText = allMusics[indexNumb - 1].name;
  musicArtist.innerText = allMusics[indexNumb - 1].artist;
  musicImg.src = `images/${allMusics[indexNumb - 1].img}.jpg`;
  mainAudio.src = `songs/${allMusics[indexNumb - 1].src}.mp3`;
}

//play music function
function playMusic() {
  container.classList.add("paused");
  playpauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

// //pause music function
function pauseMusic() {
  container.classList.remove("paused");
  playpauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

// //next music function
function nextMusic() {
  musicIndex++; //increse of music index by 1
  //if musicindex is greater than array length than -
  // musicIndex will be 1 so the first musicplay
  musicIndex > allMusics.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

// //prev music function
function prevMusic() {
  musicIndex--; //decrement of music Index by 1
  //if music Index isless than 1 so ir will be continue from
  //last song from the list
  musicIndex < 1 ? (musicIndex = allMusics.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

//play or music button event
playpauseBtn.addEventListener("click", () => {
  const isMusicPaused = container.classList.contains("paused");

  isMusicPaused ? pauseMusic() : playMusic();
});

//next music button event
nextBtn.addEventListener("click", () => {
  nextMusic();
});

//prev music button event
prevBtn.addEventListener("click", () => {
  prevMusic();
});

// update progressbar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime; //getting playing song currenttime
  const duration = e.target.duration; //getting playing total song duration
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = container.querySelector(".current-time"),
    musicDuration = container.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", () => {
    // update song toatl duratuion

    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      //if sec is les than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }

    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    //if sec is les than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }

  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//update playing song current width onaccording to the progress bar width

progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth; //getting width of progress bar
  let clickedoffsetX = e.offsetX; //getitng offset X value
  let songDuration = mainAudio.duration; // getting song toatl duration

  mainAudio.currentTime = (clickedoffsetX / progressWidth) * songDuration;
  playMusic();
});

//change loop , shuffle, repeat icon onclick
const repeatBtn = container.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "playlist looped");
      break;
  }
});

//above we just change icon, now let's work on what to do after song ended
mainAudio.addEventListener("ended", () => {
  let getText = repeatBtn.innerHTML; //getting this tag innerText
  switch (getText) {
    case "repeat":
      nextMusic(); //calling next music function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; //setting audio current time to 0
      loadMusic(musicIndex); //calling load music function with argument,
      // in the argument there is a index of current song
      playMusic(); //calling playMusic function
      break;
    case "shuffle":
      let randmIndex = Math.floor(Math.random() * allMusics.length + 1);
      do {
        randmIndex = Math.floor(Math.random() * allMusics.length + 1);
      } while (musicIndex == randmIndex);
      //this loop run until the next random number wont's be the same
      //of current musciIndex
      musicIndex = randmIndex; //passing randomIndex ro musicIndex
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});

//show the music list onclick music icon
moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

closeMusicBtn.addEventListener("click", () => {
  moreMusicBtn.click();
});

const ulTag = container.querySelector("ul");

//let create li tag according to array length for list
for (let i = 0; i < allMusics.length; i++) {
  let liTag = `<li li-index = "${i + 1}" >
  <div class="row">
    <span>${allMusics[i].name}</span>
    <p>${allMusics[i].artist}</p>
  </div>
  <audio class="${allMusics[i].src}" src="songs/${
    allMusics[i].src
  }.mp3"></audio>
  <span  id="${allMusics[i].src}" class="audio-duration">1:45</span>
</li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);
  let liAudioDurationTag = ulTag.querySelector(`#${allMusics[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusics[i].src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) {
      //if sec is les than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }

    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
    //adding t-duration attribute with total duration value
    liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

//play particular song from the list on click of li tag

const allLiTags = ulTag.querySelectorAll("li");

function playingSong() {
  for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTags[j].querySelector(".audio-duration");

    //let remove playing class from all other li expect the last one which is clicked
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");
      // let's get that audio duration value and pass to .audio-duration innertext
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    // if there is an li tag which li index is equal yo musicIndex
    //thn this musci is playing now and we'll style it
    if (allLiTags[j].getAttribute("li-index") == musicIndex) {
      allLiTags[j].classList.add("playing");
      audioTag.innerText = "playing";
    }
    //add on click attribute in all li tags
    allLiTags[j].setAttribute("onclick", "clicked(this)");
  }
}

//let play song on click li
function clicked(element) {
  //getting li index of particular clicked li tag
  let getLiindex = element.getAttribute("li-index");
  musicIndex = getLiindex; // passing the liindex to musciIndex
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}
