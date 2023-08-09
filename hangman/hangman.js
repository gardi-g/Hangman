var random_words = ["love","hate","football","array",] //array of random words
let answer = ''; //anwser
let maximumAtt = 6; //the maximum wrong attempts that we can get
let wrong = 0; // counts the wrong attempts, starting from 0
let guessed = []; //the letters that was guessed, starting from empty array
let Status = null; //gets the status of the word that we are guessing
function Word() {
  answer = random_words[Math.floor(Math.random() * random_words.length)]; //picks the word from the array 
}
function Buttons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
      `
      <button
          class="waves-effect waves-light btn-small ${guessed.indexOf(letter) >= 0 ? 'guessed' : ''}"
          id='` + letter + `'
          onClick="guessLetter('` + letter + `')"
          ${guessed.indexOf(letter) >= 0 ? 'disabled' : ''} // Disable if already guessed
      >
          ` + (guessed.indexOf(letter) >= 0 ? letter : letter.toUpperCase()) + `
      </button>
      `
  ).join('');
  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function wordGuessed() {
    Status = answer.split('').map(letter =>(guessed.indexOf(letter) >= 0 ? letter : " _ ")).join(''); //creates underscore
    document.getElementById('Status').innerHTML = Status; //updates the status of the word
}
function guessLetter(chooseLetter) {
  if (guessed.indexOf(chooseLetter) === -1) {
    guessed.push(chooseLetter);
}
guessed.indexOf(chooseLetter) == -1 ? guessed.push(chooseLetter) : null; 
if (answer.indexOf(chooseLetter) >= 0) {
    wordGuessed();
    YouWon();
} 
else if (answer.indexOf(chooseLetter) === -1) {
    wrong++;
    wrongNum();
    YouLose();
    closerToHanging();
} 
if(wrong<maximumAtt) {
  Buttons();
}
function wrongNum() {
    document.getElementById('wrongs').innerHTML = wrong;
} 
function YouWon() {
  if (Status == answer) {
      document.getElementById('endgame').innerHTML = 'Congratulations! You have Won!';
  }
}
function YouLose() {
    if (wrong == maximumAtt) {
    document.getElementById('keyboard').innerHTML = 'Sorry, you are out of guesses.';
    } 
}
function closerToHanging() {
    document.getElementById('hangman').src = './images/' + wrong + '.jpg';
}
function restartGame() {
  wrong = 0;
  guessed = [];
  Status = null;
  document.getElementById('hangman').src = './images/0.jpg';
  Word();
  Buttons();
  wordGuessed();
  wrongNum();
  document.getElementById('keyboard').innerHTML = ''; // Clear the guessed letters
  document.getElementById('endgame').innerHTML = ''; // Clear the guessed letters
  Buttons();
  document.getElementById('keyboard').style.pointerEvents = 'auto'; // Enable letter buttons
}
document.getElementById('restartButton').addEventListener('click', restartGame);
    }
document.getElementById('maximumAtt').innerHTML = maximumAtt;
Word();
Buttons();
wordGuessed();
