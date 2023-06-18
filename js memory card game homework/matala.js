// starting memory game by Mohamed Soliman 
// date of begining 29/5/23 19:34 

var images = [
    { src: 'apple.jpg' },
    { src: 'avocado.jpg' },
    { src: 'blueberry.jpg' },
    { src: 'coconut.jpg' },
    { src: 'grapes.jpg' },
    { src: 'lemon.jpeg' },
    { src: 'pineapple.jpeg' },
    { src: 'watermelon.jpeg' },
    { src: 'cherry.jpg' },
    { src: 'oranges.jpeg' },
    { src: 'banana.jpg' },
    { src: 'blackberry.jpg' }
];
var openedCards = [];
var gridItems = []; 
var gameStarted = false; 

function opencard(event) {
    if (gameStarted) {
        var currentCard = document.querySelector('.selected'); // getting the selected card 
        if (currentCard && !openedCards.includes(currentCard) && openedCards.length < 2) {
            currentCard.style.backgroundImage = 'none'; //removing the background of the pic
            currentCard.querySelector('img').style.display = 'block'; // shows or displays the picture 
            openedCards.push(currentCard); // adding he opend pic to the open cards array 
            if (openedCards.length === 2) {
                var firstCard = openedCards[0]; 
                var secondCard = openedCards[1]; 
                if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
                    openedCards = []; 
                    checkTheGame(); 
                } else {
                    setTimeout(function() {
                        firstCard.style.backgroundImage = 'url("card.jpg")'; // returning to the original background
                        firstCard.querySelector('img').style.display = 'none'; //hiding the image behind it 
                        secondCard.style.backgroundImage = 'url("card.jpg")'; 
                        secondCard.querySelector('img').style.display = 'none'; 
                        openedCards = []; // array is empty again
                    }, 1000); 
                }
            }
        }
    }
}

var gridContainer = document.getElementById('grid-container'); 
for (var i = 0; i < 24; i++) {
    var gridItem = document.createElement('div'); 
    gridItem.classList.add('grid-item'); // adding css to each grid item
    var img = document.createElement('img'); // creating images elements here
    img.src = images[i % images.length].src; 
    gridItem.appendChild(img); 
    gridItem.addEventListener('click', function() {
        if (gameStarted) {
            var prevSelected = document.querySelector('.selected'); 
            if (prevSelected) {
                prevSelected.classList.remove('selected'); 
            }
            this.classList.add('selected');
        }
    });
    gridContainer.appendChild(gridItem); // adding the grid item to the grid container
    gridItems.push(gridItem); // and here i add it to the griditems array
}

function Mix(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame() {
    gameStarted = true; 
    var startButton = document.getElementById('start-button'); 
    startButton.disabled = true; // i disabled the start game button so it wont be pressed again and restart the game 
    gridItems.forEach(function(item) {
        item.style.backgroundImage = 'url("card.jpg")'; // setting the card as my background image 
        item.querySelector('img').style.display = 'none'; // and here i hide the images behind them
        item.classList.remove('selected'); // make sure there are no selected items here
    });
    var MixedImages = Mix(images.concat(images)); // using the function Mix to mix up the images 
    for (var i = 0; i < gridItems.length; i++) {
        gridItems[i].querySelector('img').src = MixedImages[i].src; // giving src to each picture 
    }
    openedCards = []; 
}

function restartGame() {
    gameStarted = false; 
    var startButton = document.getElementById('start-button'); 
    startButton.disabled = false; 
    startGame(); 
}

function checkTheGame() {
    var remainingItems = gridItems.filter(function(item) {
        return item.style.backgroundImage !== 'none'; // checking if there is any opened images yet
    });
    if (remainingItems.length === 0) {
        setTimeout(function() {
            alert('Game over!'); 
        }, 2000); 
    }
}

document.addEventListener('keyup', opencard); // when i click any key on keyboard the opencard function works 
