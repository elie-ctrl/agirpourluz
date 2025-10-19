document.addEventListener("DOMContentLoaded", () => {

  // --- Initialisation ---
  const pages = document.querySelectorAll(".page");
  let currentPage = 0;
  const answers = {};

  // --- Navigation “Suivant” ---
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

  // --- Navigation “Précédent” ---
  document.querySelectorAll(".prev").forEach(btn => {
    btn.addEventListener("click", () => {
      pages[currentPage].classList.remove("active");
      currentPage--;
      pages[currentPage].classList.add("active");
    });
  });

  // --- Bouton “Terminer” ---
  document.getElementById("submit").addEventListener("click", () => {
    saveAnswer();
    pages[currentPage].classList.remove("active");
    document.getElementById("resultats").classList.add("active");
    afficherResultats();
    envoyerVersGoogleSheet();
  });

  // --- Bouton “Recommencer” ---
  document.getElementById("restart").addEventListener("click", () => location.reload());

  // --- Fonction pour enregistrer la réponse de la page actuelle ---
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
    const url = "https://script.google.com/macros/s/AKfycbznnGG_8oPLw9I7g4icZIbmsc-tmanFAGBFgkC9P6iN5wBM_BdNXfeB312nwUViOXo-/exec"; // <-- Remplace par l’URL Web App Google Apps Script

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers)
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

});
