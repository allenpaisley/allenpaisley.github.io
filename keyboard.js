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
// UP+DOWN - INCREMENT VOLUME 

// LEFT+RIGHT - SKIP 10 SECONDS BACKWARDS+ FORWARD

function volUp(e) {
    e.preventDefault();
    volLevel = Math.min(volLevel + 0.1, 1);
    if (typeof currentVid !== 'undefined') {
        currentVid.volume = volLevel;
    };
    console.log(`volLevel is ` + volLevel)
    volThumb.style.left = ((volTrack.offsetWidth - volThumb.offsetWidth) * volLevel) + `px`;
    volFill.style.width = volThumb.offsetLeft + `px`;
};

function volDown(e) {
    e.preventDefault();
    volLevel = Math.max(volLevel - 0.1, 0);
    if (typeof currentVid !== 'undefined') {
        currentVid.volume = volLevel;
    };
    console.log(`volLevel is ` + volLevel)
    volThumb.style.left = ((volTrack.offsetWidth - volThumb.offsetWidth) * volLevel) + `px`;
    volFill.style.width = volThumb.offsetLeft + `px`;
};

document.addEventListener('keydown', e => {
    if (e.code.startsWith('Arrow')) {
        switch (e.code) {
            case 'ArrowUp':
                volUp(e)
                break;
            case 'ArrowDown':
                volDown(e)
                break;
            case 'ArrowLeft':
                // Left arrow key was pressed
                // Add your code here to handle the event
                break;
            case 'ArrowRight':
                // Right arrow key was pressed
                // Add your code here to handle the event
                break;
        }
    }
});
