// Sélection des éléments HTML nécessaires
const keyboard = document.querySelector(".keyboard");
const h4 = document.querySelector("h4");
const wordDisplay = document.querySelector(".word-display");
const chance = document.querySelector(".chance");
const img = document.querySelector(".img");

const gameover = document.querySelector(".GameOver");
const gameoverimg = document.querySelector(".gameoverImg");
const answer = document.querySelector(".answer");
const h3 = document.querySelector("h3");
const h6 = document.querySelector("h6");

// Initialisation du compteur pour les erreurs

let count = 0;
// Initialisation du compteur pour les réponses correctes
let correctAnswers = 0;
// Niveau actuel
let level = 1;


// Sélection d'un mot aléatoire à partir de la liste de mots
const randomIndex = Math.floor(Math.random() * wordList.length);
const { word, hint } = wordList[randomIndex];

// Création des boutons pour le clavier virtuel
for (var i = 97; i <= 122; i++) {

  let button = document.createElement("button");
  button.classList.add("btn");
  button.innerHTML = String.fromCharCode(i);
  keyboard.appendChild(button); // Ajout du bouton au clavier virtuel
}

// Fonction appelée lorsque le jeu est terminé
const gameOver = (bool) => {
  if (bool) {
    // Affichage du message de fin de jeu en cas de défaite
    gameover.classList.add("show");
    document.querySelector(".game").style.opacity = 0.8;
    answer.innerText = word;
  } else {
    // Affichage du message de fin de jeu en cas de victoire
    gameover.classList.add("show");
    document.querySelector(".game").style.opacity = 0.8;
    gameoverimg.src = "/images/victory.gif";
    h3.innerText="Félictations!"
    h6.innerText="Vous avez deviné la bonne réponse !"
  }
};

// Fonction pour vérifier si le joueur a gagné
const gameOverwin = () => {
  const letterElem = document.querySelectorAll(".letter");
  var matchLetter = "";

  letterElem.forEach((v) => {
    matchLetter += v.innerText.toLowerCase();
  });


  if (matchLetter === word) {
    // Appel de la fonction gameOver avec le paramètre false en cas de victoire
    gameOver(false);
    // Incrémentation du nombre de réponses correctes
    correctAnswers++;
    // Si le nombre de réponses correctes atteint 3, réduire le nombre de chances de moitié
    if (correctAnswers === 3) {
      chance = chance / 2;
    }
    // Charger une nouvelle question pour le niveau suivant
    loadQuestion();
  }
};





// Fonction pour vérifier si une lettre correspond au mot
const matchWord = (val) => {
  const matches = [];
  console.log(word);
  word.split("").forEach((el, index) => {
    if (el === val.toLowerCase()) {
      matches.push(index);
    }
  });

  if (matches.length === 0) {
        // Incrémentation du compteur d'erreurs si la lettre ne correspond à aucune lettre du mot
    count++;
    chance.innerText = `${count}/6`;
  } else {
    matches.forEach((v) => {
            // Affichage de la lettre correcte dans les cases appropriées du mot
      const letterElem = document.querySelectorAll(".letter");
      letterElem[v].innerText = val;
      letterElem[v].classList.add("guess");
    });
  }
};

// Fonction pour charger la question (mot à deviner)
const loadQuestion = () => {
  h4.innerText = `Hint: ${hint}`;

  // Création d'une case pour chaque lettre du mot à deviner
  for (let i = 0; i < word.length; i++) {
    let liTag = document.createElement("li");
    liTag.classList.add("letter");
    wordDisplay.appendChild(liTag);
  }

  // Ajout d'un gestionnaire d'événement à chaque bouton du clavier virtuel
  const buttonTag = document.querySelectorAll(".btn");

  buttonTag.forEach((v) => {
    v.addEventListener("click", (e) => {
      matchWord(e.target.innerText); // Appel de la fonction matchWord avec la lettre correspondante comme argument

      const letterElem = document.querySelectorAll(".letter");

      // Changement de l'image de pendu en fonction du nombre d'erreurs
      if (count >= 1 && count < 2) {
        img.src = "images/hangman-1.svg";
      } else if (count >= 2 && count < 3) {
        img.src = "images/hangman-2.svg";
      } else if (count >= 3 && count < 4) {
        img.src = "images/hangman-4.svg";
      } else if (count >= 4 && count < 5) {
        img.src = "images/hangman-5.svg";
      } else if (count >= 6 && count < 7) {
        img.src = "images/hangman-6.svg";
        // Appel de la fonction gameOver avec le paramètre true en cas de défaite
        setTimeout(()=>{
          gameOver(true);
        },200)
    
      }
      // Vérification si le joueur a gagné après chaque coup
      gameOverwin();
    });
  });
};

loadQuestion();

    let button = document.createElement("button");
    button.classList.add("btn")
        button.innerHTML = String.fromCharCode(i);
        keyboard.appendChild(button);