var directions = "";
let row = 1;
let letterIndex = 0;
let wordIndex = 0;
let keyIndex = 0;
let myWord;

const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const lastRow = ["z", "x", "c", "v", "b", "n", "m"];

export function remoteControl(word) {
    alert("yo");
  myWord = word.split("");
  directions = "";
  row = 1;
  letterIndex = 0;
  wordIndex = 0;
  keyIndex = 0;
  
  console.log(myWord);
  myWord.forEach(mover);

  let dir = directions.substring(0, directions.length - 2);
  console.log(dir);
}

function mover() {
  if (firstRow.includes(myWord[wordIndex])) goToFirstRow();
  else if (secondRow.includes(myWord[wordIndex])) goToSecondRow();
  else if (lastRow.includes(myWord[wordIndex])) goToLastRow();
  else console.log("wtf how did we get here");

  wordIndex++;
}

function goToFirstRow() {
  // Change rows
  if (row == 2) directions += "up, ";
  else if (row == 3) directions += "up, up, ";
  
  row = 1;

  // Change index on keyboard
  letterIndex = firstRow.indexOf(myWord[wordIndex]);
  changeIndex();
}

function goToSecondRow() {
  // Change rows
  if (row == 1) directions += "down, ";
  else if (row == 3) directions += "up, ";
  
  row = 2;

  // Change index on keyboard
  letterIndex = secondRow.indexOf(myWord[wordIndex]);
  changeIndex();
}

function goToLastRow() {
  // Change rows
  if (row == 1) directions += "down, down, ";
  else if (row == 2) directions += "down, ";
  
  row = 3;

  // Change index on keyboard
  letterIndex = lastRow.indexOf(myWord[wordIndex]);
  changeIndex();
}

function changeIndex() {
  var ready = false;
  
  while (!ready) {
    if (letterIndex < keyIndex) {
      directions += "left, ";
      keyIndex--;
    } else if (letterIndex > keyIndex) {
      directions += "right, ";
      keyIndex++;
    } else {
      directions += "select, ";
      ready = true;
    }
  }
}
