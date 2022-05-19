var random_words = ["love","hate","dog","responsible",] //array of random words
let answer = ''; //anwsers
let maximumAtt = 6; //the maximum wrong attempts that we can get
let wrong = 0; // counts the wrong attempts, starting from 0
let guessed = []; //the letters that was guessed, starting from empty array
let Status = null; //gets the status of the word that we are guessing
function Word() {
  answer = random_words[Math.floor(Math.random() * random_words.length)]; //picks the word from the array 
}// word end
function Buttons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => // this is our alphabet
        `
          <button
            class="waves-effect waves-light btn-small"
            id='` + letter + `'
            onClick="guessLetter('` + letter + `')"
          >
            ` + letter + `
          </button>
        `).join('');
      document.getElementById('keyboard').innerHTML = buttonsHTML; // this is the buttons for our letters
}//buttons end
function wordGuessed() {
    Status = answer.split('').map(letter =>(guessed.indexOf(letter) >= 0 ? letter : " _ ")).join(''); //creates underscore
    document.getElementById('Status').innerHTML = Status; //updates the status of the word
}//wordGuessed end
function guessLetter(chooseLetter) {
guessed.indexOf(chooseLetter) == -1 ? guessed.push(chooseLetter) : null; 
if (answer.indexOf(chooseLetter) >= 0) {
    wordGuessed();
    YouWon();
} //if end
else if (answer.indexOf(chooseLetter) === -1) {
    wrong++;
    wrongNum();
    YouLose();
    closerToHanging();
} // else if end
function wrongNum() {
    document.getElementById('wrongs').innerHTML = wrong;
} //wrongNum end
function YouWon() {
    if (Status == answer) {
    document.getElementById('keyboard').innerHTML = 'Congratulations for nothing!';
    } // if end
} //YouWon end
function YouLose() {
    if (wrong == maximumAtt) {
    document.getElementById('keyboard').innerHTML = 'Welp, get better';
    } // if end
}// YouLose end
function closerToHanging() {
    document.getElementById('hangman').src = './images/' + wrong + '.jpg';
} //closerToHanging end
    }//guessLetter end
document.getElementById('maximumAtt').innerHTML = maximumAtt;
Word();
Buttons();
wordGuessed();
guessLetter();