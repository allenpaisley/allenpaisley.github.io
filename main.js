const screen = document.querySelector('.screen');
const vidStrip = document.querySelector('#vid-strip');
const computedStyles = window.getComputedStyle(vidStrip);
const transitionDuration = Math.round(parseFloat(computedStyles.transitionDuration) * 1000);
let videosArray = [];

const howManyVids = 7;
var vidHeight = 405;

// add vids to vid strip

for (i = 0; i < howManyVids; i++) {
    videosArray.push('vid' + i + '.mp4');
};

videosArray.forEach((element, index) => {
    var newVid = document.createElement('video');
    newVid.src = 'https://github.com/allenpaisley/allenpaisley.github.io/raw/main/vids/' + videosArray[index];
    newVid.classList.add(`video`);
    newVid.controls = false;
    vidStrip.appendChild(newVid);
});

const videos = document.querySelectorAll(".video");
let currentVidIndex = 0;
let currentVid = videos[currentVidIndex - 1];

// PREV + NEXT + SHUFFLE BUTTONS

const vidStripStyle = window.getComputedStyle(vidStrip);
let currentTop = parseFloat(vidStripStyle.top);

const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const shuffle = document.querySelector('#shuffle');

prev.addEventListener('click', (e) => {
    currentTop = parseFloat(vidStripStyle.top);
    if (currentVidIndex == 0) return;
    if (typeof currentVid !== 'undefined') {
        pauseCurrentVid();
    };
    if ((currentTop == 0 || currentTop % vidHeight == 0) && currentTop < vidHeight) {
        currentTop = (currentTop + vidHeight) + 'px';
        vidStrip.style.top = currentTop;
        currentVidIndex--
        currentVid = videos[currentVidIndex - 1]
        playVidWithDelay();
        getProgress();
    }
});

next.addEventListener('click', (e) => {
    currentTop = parseFloat(vidStripStyle.top);
    if (currentVidIndex == howManyVids) return;
    if (typeof currentVid !== 'undefined') {
        pauseCurrentVid();
    };
    if ((currentTop == 0 || currentTop % vidHeight == 0) && currentTop > (-vidHeight * (howManyVids - 1))) {
        currentTop = (currentTop - vidHeight) + 'px';
        vidStrip.style.top = currentTop;
        currentVidIndex++
        currentVid = videos[currentVidIndex - 1]
        playVidWithDelay();
        getProgress();
    }
});

shuffle.addEventListener('click', (e) => {
    currentTop = parseFloat(vidStripStyle.top);
    if (typeof currentVid !== 'undefined') {
        pauseCurrentVid();
    };
    let randomInt = Math.floor(Math.random() * howManyVids) + 1;
    while (randomInt == currentVidIndex) {
        randomInt = Math.floor(Math.random() * howManyVids) + 1;
    };
    console.log(`randomint is ` + randomInt);
    currentTop = (vidHeight - (vidHeight * (randomInt))) + 'px';
    vidStrip.style.top = currentTop;
    currentVidIndex = randomInt;
    currentVid = videos[currentVidIndex - 1]
    playVidWithDelay();
    getProgress();
});

// create menu items

var menu = document.querySelector('#menu');
var menuItems = document.querySelector('#menu-items');

videosArray.forEach((element, index) => {
    var menuItem = document.createElement('div');
    menuItem.innerHTML = titles[index];
    menuItem.classList.add('menu-item');
    menuItems.appendChild(menuItem);
});

const allMenuItems = document.querySelectorAll('.menu-item');

allMenuItems.forEach((element, index) => {
    allMenuItems[index].addEventListener('click', (e) => {
        if (typeof currentVid !== 'undefined') {
            pauseCurrentVid();
        };
        currentTop = (index * -405) + 'px';
        vidStrip.style.top = currentTop;
        currentVidIndex = index + 1;
        currentVid = videos[currentVidIndex - 1];
        playVidWithDelay();
        getProgress();
    });
});

// VIDEO CONTROLS

// progress bar

let maxX;
let thumbStartX;
let thumbOffsetX;
let thumbX;
let progIsDragging = false;


const progTrack = document.querySelector("#prog-track");
const progFill = document.querySelector("#prog-fill");
const progThumb = document.querySelector("#prog-thumb");
const progThumbCenter = progThumb.offsetWidth / 2;
let progressTime = 0;

function getProgress() {
    if (typeof currentVid == 'undefined') return;
    currentVid.addEventListener('timeupdate', () => {
        let percentage = (currentVid.currentTime / currentVid.duration) * 100;
        progFill.style.width = `${percentage}%`;
        progThumb.style.left = `${percentage}%`;
    });
}

progTrack.addEventListener(`mousedown`, progJump);
function progJump(e) {
    if (typeof currentVid == 'undefined') return;
    progressTime = (e.offsetX / progTrack.offsetWidth) * currentVid.duration;
    currentVid.currentTime = progressTime;
    thumbX = e.offsetX;
    progThumb.style.left = thumbX - progThumbCenter + 'px';
    progFill.style.width = thumbX + `px`;
    progIsDragging = true;
    progStartDrag(e);
    document.addEventListener(`mouseup`, progStopDrag);
};

progThumb.addEventListener(`mousedown`, progStartDrag);
function progStartDrag(e) {
    if (typeof currentVid !== 'undefined')
        progIsDragging = true;
    thumbStartX = e.clientX;
    thumbOffsetX = progThumb.offsetLeft;
    document.addEventListener(`mousemove`, progDrag);
    document.addEventListener(`mouseup`, progStopDrag);
};

function progDrag(e) {
    if (!progIsDragging) return;
    maxX = progTrack.offsetWidth - progThumb.offsetWidth;
    thumbX = e.clientX - thumbStartX + thumbOffsetX;
    if (thumbX < 0) {
        thumbX = 0;
    } else if (thumbX > maxX) {
        thumbX = maxX;
    }
    progThumb.style.left = thumbX + 'px';
    progFill.style.width = thumbX + `px`;
    progressTime = (thumbX / progTrack.offsetWidth) * currentVid.duration;
    currentVid.currentTime = progressTime;
};

function progStopDrag(e) {
    progIsDragging = false;
};

// play+pause

const playBtn = document.querySelector("#play-btn");
const muteBtn = document.querySelector("#mute-btn");

function pauseCurrentVid() {
    currentVid.pause();
    playBtn.innerHTML = `<svg width="14px" fill="currentColor" viewBox="0 0 210 210">
    <path d="M179.07,105L30.93,210V0L179.07,105z" />
</svg>`;
};

playBtn.addEventListener('click', playVid)

function playVid() {
    if (currentVidIndex == 0) return;
    if (currentVidIndex > howManyVids) return;
    if (currentVid.paused || currentVid.ended) {
        currentVid.volume = volLevel;
        currentVid.play();
        playBtn.innerHTML = `<svg width="24px" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-width="1.5" d="M8.75 6.75V17.25" />
        <path stroke="currentColor" stroke-width="1.5" d="M15.25 6.75V17.25" />
    </svg>`;
    } else {
        pauseCurrentVid();
    }
};

function playVidWithDelay() {
    setTimeout(function () {
        playVid();
    }, transitionDuration);
};

// mute+unmute

function muteAll() {
    videos.forEach((element, index) => {
        element.muted = true;
        muteBtn.innerHTML = `<svg width="20px" viewBox="0 0 512 512">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="icon" fill="currentColor" transform="translate(42.666667, 85.333333)">
                <path d="M361.299413,341.610667 L328.014293,314.98176 C402.206933,233.906133 402.206933,109.96608 328.013013,28.8906667 L361.298133,2.26304 C447.910187,98.97536 447.908907,244.898347 361.299413,341.610667 Z M276.912853,69.77216 L243.588693,96.4309333 C283.38432,138.998613 283.38304,204.87488 243.589973,247.44256 L276.914133,274.101333 C329.118507,215.880107 329.118507,127.992107 276.912853,69.77216 Z M191.749973,1.42108547e-14 L80.8957867,87.2292267 L7.10542736e-15,87.2292267 L7.10542736e-15,257.895893 L81.0208,257.895893 L191.749973,343.35424 L191.749973,1.42108547e-14 L191.749973,1.42108547e-14 Z" id="Shape"></path>
            </g>
        </g>
    </svg>`
    });
}

function unMuteAll() {
    videos.forEach((element, index) => {
        element.muted = false;
        muteBtn.innerHTML = `<svg fill="currentColor" width="30px" viewBox="0 0 1024 1024">
        <path
            d="M542.86 294.4L362.3 430a10.72 10.72 0 0 0-2.71 3.25H255.53v153.2h104.06a10.58 10.58 0 0 0 2.71 3.25l180.56 135.52a10.83 10.83 0 0 0 17.34-8.66v-413.5a10.83 10.83 0 0 0-17.34-8.66zM742.6 599.41L765 577l-67.2-67.2 67.2-67.2-22.4-22.4-67.2 67.2-67.2-67.2-22.4 22.4 67.2 67.2-67.2 67.2 22.4 22.4 67.2-67.2 67.2 67.2z" />
    </svg>`;
    });
}
function muteUnmute() {
    if (currentVidIndex == 0) return;
    if (currentVidIndex > howManyVids) return;
    if (currentVid.muted) {
        unMuteAll();
    }
    else {
        muteAll();
    }
}

muteBtn.addEventListener('click', muteUnmute);

// volume slider

const volTrack = document.querySelector("#vol-track");
const volFill = document.querySelector("#vol-fill");
const volThumb = document.querySelector("#vol-thumb");
volThumb.style.left = volTrack.offsetWidth - volThumb.offsetWidth + `px`;
const volThumbCenter = volThumb.offsetWidth / 2;
let volLevel = 1;
let volIsDragging = false;

volTrack.addEventListener(`mousedown`, volJump);
function volJump(e) {
    thumbX = e.offsetX;
    volThumb.style.left = thumbX - volThumbCenter + 'px';
    volFill.style.width = thumbX + `px`;
    volIsDragging = true;
    volStartDrag(e);
    document.addEventListener(`mouseup`, volStopDrag);
    volLevel = e.offsetX / volTrack.offsetWidth;
    if (typeof currentVid !== 'undefined') {
        currentVid.volume = volLevel;
    };
};

volThumb.addEventListener(`mousedown`, volStartDrag);
function volStartDrag(e) {
    volIsDragging = true;
    thumbStartX = e.clientX;
    thumbOffsetX = volThumb.offsetLeft;
    document.addEventListener(`mousemove`, volDrag);
    document.addEventListener(`mouseup`, volStopDrag);
};

function volDrag(e) {
    if (!volIsDragging) return;
    maxX = volTrack.offsetWidth - volThumb.offsetWidth;
    thumbX = e.clientX - thumbStartX + thumbOffsetX;
    if (thumbX < 0) {
        thumbX = 0;
    } else if (thumbX > maxX) {
        thumbX = maxX;
    }
    volThumb.style.left = thumbX + 'px';
    volFill.style.width = thumbX + `px`;
    volLevel = thumbX / volTrack.offsetWidth;
    if (typeof currentVid !== 'undefined') {
        currentVid.volume = volLevel;
    }
};

function volStopDrag(e) {
    volIsDragging = false;
};

// fullscreen

var fullscreen = document.querySelector("#fullscreen");
var player = document.querySelector("#player");

if (!document?.fullscreenEnabled) {
    fullscreen.style.display = "none";
};

fullscreen.addEventListener("click", (e) => {
    handleFullscreen();
});

function handleFullscreen() {
    if (currentVidIndex == 0) return;
    if (document.fullscreenElement !== null) {
        document.exitFullscreen();
        setFullscreenData(false);
    } else {
        player.requestFullscreen();
        setFullscreenData(true);
    }
}

function setFullscreenData(state) {
    player.setAttribute("data-fullscreen", !!state);
}

document.addEventListener("fullscreenchange", (e) => {
    setFullscreenData(!!document.fullscreenElement);
});