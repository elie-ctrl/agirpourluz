// -----------------------------
// script.js
// -----------------------------

// --- Variables globales ---
const pages = document.querySelectorAll(".page");
let currentPage = 0;
const answers = {};

// --- Fonctions ---
function saveAnswer() {
  const page = pages[currentPage];
  const input = page.querySelector("input[type='radio']:checked");
  if (input) {
    answers[input.name] = input.value;
  }
}

function afficherResultats() {
  const summary = document.getElementById("summary");
  summary.innerHTML = `
    <p><strong>Âge :</strong> ${answers.age || 'Non répondu'}</p>
    <p><strong>Satisfaction :</strong> ${answers.satisfaction || 'Non répondu'}</p>
    <p><strong>Fonction préférée :</strong> ${answers.fonction || 'Non répondu'}</p>
  `;
}

function envoyerVersServeur() {
  const url = "https://script.google.com/macros/s/AKfycbymBcoBq9ubHojlEAK_9BwJh8VzKpwvlEgWcIFkfnT3VG6lf8KsCCl9KO1r9Tf2B3WB/exec"; // <-- Remplace par ton URL

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Réponse Google Sheets :", data);
      const info = document.createElement("p");
      info.textContent = "✅ Vos réponses ont été enregistrées.";
      document.getElementById("summary").appendChild(info);
    })
    .catch(err => {
      console.error("Erreur d'envoi :", err);
      const info = document.createElement("p");
      info.textContent = "❌ Erreur d'enregistrement.";
      document.getElementById("summary").appendChild(info);
    });
}

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

// --- Bouton Terminer ---
document.getElementById("submit").addEventListener("click", () => {
  saveAnswer();
  pages[currentPage].classList.remove("active");
  document.getElementById("resultats").classList.add("active");
  afficherResultats();
  envoyerVersServeur();
});

// --- Bouton Recommencer ---
document.getElementById("restart").addEventListener("click", () => {
  location.reload();
});

// --- Initialisation ---
pages[currentPage].classList.add("active");
