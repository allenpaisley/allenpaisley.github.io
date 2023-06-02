var videos = document.querySelectorAll('video');
var menuItems = document.querySelectorAll('.menu-item');

function HideAll() {
    videos.forEach((video, index) => {
        videos[index].style.display = "none";
    });
};

function PauseAll() {
    videos.forEach((video, index) => {
        videos[index].pause();
    });
};

menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', () => {
        HideAll();
        PauseAll();
        videos[index].style.display = "block";
        videos[index].play();
    });
});

videos[8].innerHTML = 'hey';
videos[7].src = "vids/vid8.mp4";

videos.forEach((video, index) => {
    console.log('video ' + [index]);
    videos[index].src = 'https://github.com/allenpaisley/allenpaisley.github.io/raw/main/vids/vid' + [index] + '.mp4';
});