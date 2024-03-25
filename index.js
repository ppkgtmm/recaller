const imgArr = [
    'anonymus.png',
    'bear.png',
    'chicken.png',
    'gem.png',
    'pig.png',
    'sword.png',
    'whale.png',
    'wolf.png',
];

let index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let game = [];
let guess = [];
let score = 0;

function getImage() {
    let imgIndex = -1;
    if (index.length > 0) {
        imgIndex = index[Math.floor(Math.random() * index.length)];

    }
    return imgIndex;
}
function setUp() {
    let imgIndex = getImage();
    while (imgIndex != -1) {
        game.push(imgIndex % 8);
        index.splice(index.indexOf(imgIndex), 1);
        imgIndex = getImage();

    }
}

function enableClick(target) {
    target.style.pointerEvents = 'auto';
}
function disableClick(target) {
    target.style.pointerEvents = 'none';
}

async function flip(target) {
    setTimeout(() => {
        target.style.backgroundImage = 'none';
        enableClick(target);
    }, 500);

}

function displayCover(message) {
    const msg = document.querySelector('.message');
    const cover = document.querySelector('.cover');
    const game = document.querySelector('.game');
    msg.innerHTML = message
    cover.style.transition = 'display 4s ease-in-out';
    cover.style.display = 'flex'
    game.style.display = 'none'

}
function checkForMatch(target) {
    if (guess.length === 0) {
        disableClick(target);
        guess.push(target);
    }
    else if (guess.length % 2 === 1) {
        const last = guess.pop();
        const lastImgIndex = game[last.id] % 8;
        const currentImgIndex = game[target.id] % 8;
        if (lastImgIndex !== currentImgIndex) {
            flip(last);
            flip(target);
        }
        else {
            if (last.id !== target.id) {
                score++;
                console.log(score);
                disableClick(last);
                disableClick(target);
                if (score === 8) {
                    displayCover('You Win !!!');
                }
            }
            else {
                enableClick(target);
            }
        }
    }
    else {
        guess.push(target);
    }

}


function render_game() {
    setUp();
    blocks.forEach((block) => {
        block.addEventListener('click', handleClick)
    })
}

function handleClick(event) {
    const { target } = event;
    const imgUrl = imgArr[game[blocks.indexOf(target)]];
    target.style.backgroundImage = `url(img/${imgUrl})`;
    target.style.backgroundSize = 'cover';
    checkForMatch(target);
}

const blocks = Array.from(document.querySelectorAll('.block'));
render_game()
