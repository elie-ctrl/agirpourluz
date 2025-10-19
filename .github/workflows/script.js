const pages = document.querySelectorAll(".page");
let currentPage = 0;
const answers = {};

// Navigation
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

// Soumission
document.getElementById("submit").addEventListener("click", () => {
  saveAnswer();
  pages[currentPage].classList.remove("active");
  document.getElementById("resultats").classList.add("active");
  afficherResultats();
  envoyerVersServeur();
});

// Redémarrer
document.getElementById("restart").addEventListener("click", () => {
  location.reload();
});

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
  fetch("save_results.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      console.log("Résultats enregistrés :", data.message);
    } else {
      console.error("Erreur :", data.message);
    }
  })
  .catch(err => console.error("Erreur réseau :", err));
}
