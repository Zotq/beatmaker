class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./allSounds/kick-classic.wav";
    this.currentSnare = "./allSounds/snare-acoustic01.wav";
    this.currentHihat = "./allSounds/hihat-acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 120;
    this.isPlaying = null;
    this.select = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.icon = document.querySelector(".fa-volume-high");

    this.icon.onclick = function () {
      if (icon.classList.contains("fa-volume-high")) {
        icon.classList.replace("fa-volume-high", "fa-volume-xmark");
      }
    };
    console.log(this.icon);
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //LOOP OVER THE PADS
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //check if pads are active,they if are active play a sound
      if (bar.classList.contains("active")) {
        //check which type of sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.play();
          this.kickAudio.currentTime = 0;
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.play();
          this.kickAudio.currentTime = 0;
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000; //x1000 cuz its in ms
    //check if its playing
    if (this.isPlaying) {
      //clear/remove the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        console.log(selectionValue);
        break;
      case "snare-select":
        console.log(selectionValue);
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        console.log(selectionValue);
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  mute(e) {
    //below code doesn't work (its for changing the class of icons
    //of font awesome so they icons change but they dont)
    //need to ask someone why?
    if (this.icon.classList.contains("fa-volume-high")) {
      this.icon.classList.remove("fa-volume-high");
      this.icon.classList.add("fa-volume-xmark");
      console.log(this.icon);
    } else {
      this.icon.classList.remove("fa-volume-xmark");
      this.icon.classList.add("fa-volume-high");
    } //until here

    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      this.kickAudio.volume = 1;
      this.snareAudio.volume = 1;
      this.hihatAudio.volume = 1;
    }
  }
  changeTempo(e) {
    const tempText = document.querySelector(".tempo-nr");
    this.bpm = e.target.value;
    tempText.innerText = e.target.value;
  }
  //everytime you move the slider to change tempo "play" button should stop
  updateTempo(e) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

//Event listeners

const drumKit = new DrumKit();
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    //they keyword this here refers to the actual pad itself
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.select.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  })
);

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.updateTempo(e);
});
