// SPACEBAR PLAY VID

document.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.keyCode === 32 || e.key === ' ') {
        e.preventDefault();
        playVid();
    }
});

// M KEY MUTE UNMUTE

document.addEventListener('keydown', e => {
    if (e.code === 'KeyM' || e.keyCode === 77 || e.key === 'm') {
        e.preventDefault();
        muteUnmute();
    }
});

// ARROW KEYS 

document.addEventListener('keydown', e => {
    if (e.code.startsWith('Arrow')) {
        switch (e.code) {
            case 'ArrowUp':
                volUp(e);
                break;
            case 'ArrowDown':
                volDown(e);
                break;
            case 'ArrowLeft':
                skipBack(e);
                break;
            case 'ArrowRight':
                skipFwd(e);
                break;
        }
    }
});

// UP+DOWN - INCREMENT VOLUME 

function volUp(e) {
    e.preventDefault();
    volLevel = Math.min(volLevel + 0.1, 1);
    if (typeof currentVid !== 'undefined') {
        currentVid.volume = volLevel;
    };
    volThumb.style.left = ((volTrack.offsetWidth - volThumb.offsetWidth) * volLevel) + `px`;
    volFill.style.width = volThumb.offsetLeft + `px`;
};

function volDown(e) {
    e.preventDefault();
    volLevel = Math.max(volLevel - 0.1, 0);
    if (typeof currentVid !== 'undefined') {
        currentVid.volume = volLevel;
    };
    volThumb.style.left = ((volTrack.offsetWidth - volThumb.offsetWidth) * volLevel) + `px`;
    volFill.style.width = volThumb.offsetLeft + `px`;
};

// LEFT+RIGHT - SKIP 10 SECONDS BACKWARDS+ FORWARD

function skipFwd(e) {
    e.preventDefault();
    if (typeof currentVid == 'undefined') return;
    const currentTime = currentVid.currentTime;
    currentVid.currentTime = currentVid.currentTime + 5;
}

function skipBack(e) {
    e.preventDefault();
    if (typeof currentVid == 'undefined') return;
    const currentTime = currentVid.currentTime;
    currentVid.currentTime = currentVid.currentTime - 5;
}