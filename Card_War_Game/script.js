import Deck from "./main.js";

//because of A,J,Q,K in the cards , convert them to their
//numerical values to help check the winner

const numCardValue = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
// const computerCaSlot = document.querySelector('.computer-card');
const playerCaSlot = document.querySelector(".player-card-slot");
const compCarSlot = document.querySelector(".computer-card-slot");
const computerDeckEle = document.querySelector(".computer-deck");
const playerDeckEle = document.querySelector(".player-deck");
const clockCountDown = document.querySelector("#timeNum");
const avatarBox = document.querySelector('.avatar-box');
const playerAvatar= document.querySelector('#player-avatar')
//DOM
const text = document.querySelector(".text");
const startBut = document.querySelector("#start");
const resetBut = document.querySelector("#reset");
const nextBut = document.querySelector("#next");
const musicBut = document.querySelector("#music");
// avatar

let playerDeck, compuDeck;
let flipSound = new Audio("sounds/shuff1.wav");
let audio = new Audio("sounds/playi1.mp3");
let winSound = new Audio("sounds/win1.wav");
let drawSound = new Audio("sounds/draw.wav");
let loseSound = new Audio("sounds/try_again.wav");
let congratSound = new Audio("sounds/congratulations.wav");
let youWinSound = new Audio("sounds/winStrings.wav");
let gameOveSound = new Audio("sounds/game_over.wav");
let loseEffect = new Audio("sounds/lose.wav");
let winingEffect = new Audio("sounds/wining.wav");
let losinEffect = new Audio("sounds/damaged1.wav");
let drawinSound = new Audio("sounds/healed2")

let inSession = false; //set default value to false
let stopGame = false;

let clockCounter = 30;

resetBut.addEventListener("click", () => {
  startGame();
  clockCounter = 30;
  nextBut.style.display = "inline-block";
});
musicBut.addEventListener("click", () => {
  if (audio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }

  // pauseAudio()
});
nextBut.addEventListener("click", () => {
  if (inSession) {
    startReset();
  } else {
    flipcard();
  }
});
//set a countdown timer for

function timeIt() {
  clockCounter--;
  if (clockCounter > 0) {
    // console.log(clockCounter)
    // startGame();
    clockCountDown.innerHTML = clockCounter;
  } else if (clockCounter === 0) {
    // console.log('hello')
    youWinSound.play();
    gameOver();
    clockCountDown.innerText = "Game Over";
    // clearInterval(clockC);
  }
}
setInterval(timeIt, 1000);

startGame(); //this starts game immidiately before
function startGame() {
  const deck = new Deck();
  deck.shuffle();
  // audio.play();
  audio.volume = 0.1; // decreases audio volume
  //split into two equal parts of cards
  const midDeck = Math.ceil(deck.lenCards / 2);
  // console.log(midDeck)//note that lencard is defined in main.js as a getter function;
  playerDeck = new Deck(deck.cards.slice(0, midDeck));
  compuDeck = new Deck(deck.cards.slice(midDeck, deck.lenCards));
  inSession = false;
  stopGame = false;
  // clockCounter = 10;

  // console.log(playerDeck)
  // console.log(compuDeck)
  startReset(); //this cleans out deck before start of next game
}
function startReset() {
  inSession = false;
  compCarSlot.innerHTML = "";
  playerCaSlot.innerHTML = "";
  text.innerText = "";

  updateDeckCount();
}

function flipcard() {
  inSession = true;
  //get the first card from the deck
  flipSound.play();
  const playerCard = playerDeck.pop();
  const computerCard = compuDeck.pop();

  playerCaSlot.appendChild(playerCard.getHTML());
  compCarSlot.appendChild(computerCard.getHTML());

  updateDeckCount();
  // check with the roundWinner function's condition, if playerCard won
  if (roundWinner(playerCard, computerCard)) {
    text.innerText = "Win 😊";
    winSound.play();
    winingEffect.play();
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
    //add emojie
  } //  check if computerCard won
  else if (roundWinner(computerCard, playerCard)) {
    text.innerText = "Lose 😢";
    losinEffect.play();
    loseEffect.play();
    compuDeck.push(playerCard);
    compuDeck.push(computerCard);
  } else {
    // drawSound.play();
    drawinSound.play();
    text.innerText = "Draw";
    playerDeck.push(playerCard);
    compuDeck.push(computerCard);
    // add sound
  }
}
function playAudio() {
  audio.play();
  audio.volume = 0.1;
}

function pauseAudio() {
  audio.pause();
}
function updateDeckCount() {
  computerDeckEle.innerText = compuDeck.lenCards;
  playerDeckEle.innerText = playerDeck.lenCards;
}

function roundWinner(card1, card2) {
  return numCardValue[card1.value] > numCardValue[card2.value];
}

function gameOver(deck) {
  if (compuDeck.lenCards > playerDeck.lenCards) {
    stopGame = true;
    loseSound.play();
    text.innerText = "You lose 😢!!!";
  } else if (playerDeck.lenCards > compuDeck.lenCards) {
    congratSound.play();
    youWinSound.play();
    text.innerText = "You Won 😊 !!!";
    stopGame = true;
  } else {
    drawSound.play();
    text.innerText = "It was a draw 😊 ";
  }
  nextBut.style.display = "none";
 
}

//avatar
function generateAvatar(
  initials,
  foregroundColor ='white',
  backgroundColor = 'crimson'
  ){
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 100;
    canvas.height = 100;

    // draw background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    //Draw text
    ctx.font = 'bold 30px Assistant';
    ctx.fillStyle = foregroundColor;
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, canvas.width/2, canvas.height/2);

    // avatarBox.appendChild(canvas);
    return canvas.toDataURL('image/png');

  }
  playerAvatar.src = generateAvatar('GA','white','crimson')