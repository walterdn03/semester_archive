const imagesLeft = [
  'assets/images/landing/left/canvas_01.jpg',
  'assets/images/landing/left/canvas_02.jpg',
  'assets/images/landing/left/canvas_03.jpg',
  'assets/images/landing/left/canvas_04.jpg',
];

const imagesRight = [
  'assets/images/landing/right/canvas_01.jpg',
  'assets/images/landing/right/canvas_02.jpg',
  'assets/images/landing/right/canvas_03.jpg',
  'assets/images/landing/right/canvas_04.jpg',
];

function changeImagesTogether() {
  const randomIndex = Math.floor(Math.random() * imagesLeft.length);
  document.getElementById('imageLeftImg').src = imagesLeft[randomIndex];
  document.getElementById('imageRightImg').src = imagesRight[randomIndex];
}

// Intervallo per cambiare le immagini ogni 180 millisecondi
setInterval(changeImagesTogether, 180);

// Array di parole per il titolo
const titleWords = ["SEMESTER", "PROJECT", "DESIGN", "ART", "IDEAS"];
let isMobile = window.matchMedia("(max-width: 768px)").matches;
let titleInterval;

// Funzione per cambiare il testo del titolo
function changeTitleText() {
  if (!isMobile) {
    const titleElement = document.getElementById("semesterTitle");
    const randomIndex = Math.floor(Math.random() * titleWords.length);
    titleElement.textContent = titleWords[randomIndex];
  }
}

// Funzione per bloccare il testo su mobile
function lockTitleText() {
  const titleElement = document.getElementById("semesterTitle");
  titleElement.textContent = "SEMESTER";
}

// Controllo iniziale per mobile o desktop
function updateMode() {
  isMobile = window.matchMedia("(max-width: 768px)").matches;
  clearInterval(titleInterval);

  if (isMobile) {
    lockTitleText();
  } else {
    titleInterval = setInterval(changeTitleText, 200);
  }
}

// Aggiungi un listener per rilevare cambiamenti nelle dimensioni dello schermo
window.addEventListener("resize", updateMode);

// Inizializza la modalità al caricamento
updateMode();
