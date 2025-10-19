// --- Initialisation ---
const pages = document.querySelectorAll(".page");
let currentPage = 0;
const answers = {};

// --- Fonctions de navigation ---
document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    saveAnswer();
    if (currentPage < pages.length - 1) {
      pages[currentPage].classList.remove("active");
      currentPage++;
      pages[currentPage].classList.add("active");
    }
  });
});

document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => {
    pages[currentPage].classList.remove("active");
    currentPage--;
    pages[currentPage].classList.add("active");
  });
});

// --- Initialisation ---
const pages = document.querySelectorAll(".page");
let currentPage = 0;
const answers = {};

// --- Navigation ---
document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    saveAnswer();
    if (currentPage < pages.length - 1) {
      pages[currentPage].classList.remove("active");
      currentPage++;
      pages[currentPage].classList.add("active");
    }
  });
});

document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => {
    pages[currentPage].classList.remove("active");
    currentPage--;
    pages[currentPage].classList.add("active");
  });
});

// --- Bloc de soumission (bouton "Terminer") ---
document.getElementById("submit").addEventListener("click", () => {
  saveAnswer(); // Enregistre la dernière page
  pages[currentPage].classList.remove("active");
  document.getElementById("resultats").classList.add("active");
  afficherResultats();        // Affiche le résumé à l’écran
  envoyerVersGoogleSheet();   // Envoie les réponses à Google Sheet
});

// --- Bouton "Recommencer" ---
document.getElementById("restart").addEventListener("click", () => {
  location.reload();
});

// --- Fonction pour enregistrer les réponses ---
function saveAnswer() {
  const page = pages[currentPage];
  const input = page.querySelector("input[type='radio']:checked");
  if (input) {
    answers[input.name] = input.value;
  }
}

// --- Fonction pour afficher le résumé ---
function afficherResultats() {
  const summary = document.getElementById("summary");
  summary.innerHTML = `
    <p><strong>Âge :</strong> ${answers.age || 'Non répondu'}</p>
    <p><strong>Satisfaction :</strong> ${answers.satisfaction || 'Non répondu'}</p>
    <p><strong>Fonction préférée :</strong> ${answers.fonction || 'Non répondu'}</p>
  `;
}

// --- Fonction pour envoyer les réponses à Google Sheet ---
function envoyerVersGoogleSheet() {
  const url = "https://script.google.com/macros/s/AKfycbzQnvFtoHprYp2wmuBVme4pPiLGNx8ms1aDlPIyBWIwk3LL1g4eE0DblW35Rw57HI9E/exec"; // 

  fetch(url, {
    method: "POST",
    body: JSON.stringify(answers),
    headers: { "Content-Type": "application/json" }
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      console.log("Réponses enregistrées dans Google Sheet !");
    } else {
      console.error("Erreur :", data.message);
    }
  })
  .catch(err => console.error("Erreur réseau :", err));
}

