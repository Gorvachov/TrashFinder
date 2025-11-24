// HU-020: Información educativa sobre el impacto de la basura

(() => {
  const CARDS_KEY = "edu_cards_status_v1";
  const QUIZ_KEY = "edu_quiz_result_v1";

  const defaultCards = [
    {
      id: "c1",
      title: "Contaminación urbana",
      text: "La mala gestión de residuos contamina agua, aire y suelos.",
      read: false,
    },
    {
      id: "c2",
      title: "Impacto en la salud",
      text: "La acumulación de basura atrae plagas y enfermedades.",
      read: false,
    },
    {
      id: "c3",
      title: "Separación en origen",
      text: "Separar residuos correctamente mejora el reciclaje.",
      read: false,
    },
    {
      id: "c4",
      title: "Economía circular",
      text: "Reutilizar y reciclar reduce el impacto ambiental.",
      read: false,
    },
  ];

  let cards = JSON.parse(localStorage.getItem(CARDS_KEY)) || defaultCards;

  const cardsContainer = document.getElementById("cardsContainer");

  function renderCards() {
    cardsContainer.innerHTML = "";

    cards.forEach((card) => {
      const div = document.createElement("div");
      div.className = "edu-card";

      div.innerHTML = `
          <h3>${card.title}</h3>
          <p>${card.text}</p>
          <button class="btn-card" data-id="${card.id}">
            ${card.read ? "Marcar como no leído" : "Marcar como leído"}
          </button>
        `;

      cardsContainer.appendChild(div);
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.matches(".btn-card")) return;

    const id = e.target.getAttribute("data-id");
    const card = cards.find((c) => c.id === id);

    if (card) {
      card.read = !card.read;
      localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
      renderCards();
    }
  });

  renderCards();

  const quiz = {
    questions: [
      {
        q: "¿Qué reduce el impacto de los residuos?",
        options: ["Quemar basura", "Separar residuos", "Tirarlo todo junto"],
        a: 1,
      },
      {
        q: "La basura acumulada puede:",
        options: ["Desaparecer sola", "Atraer plagas", "Purificar aire"],
        a: 1,
      },
      {
        q: "La economía circular fomenta:",
        options: ["Tirar más residuos", "Reusar y reciclar", "Gastar recursos"],
        a: 1,
      },
    ],
  };

  const quizContainer = document.getElementById("quizContainer");
  const quizResult = document.getElementById("quizResult");

  function renderQuiz() {
    quizContainer.innerHTML = "";

    quiz.questions.forEach((q, i) => {
      const div = document.createElement("div");
      div.className = "quiz-question";

      div.innerHTML = `
          <p><strong>${i + 1}.</strong> ${q.q}</p>
        `;

      q.options.forEach((opt, j) => {
        div.innerHTML += `
            <label>
              <input type="radio" name="q${i}" value="${j}" /> ${opt}
            </label><br />
          `;
      });

      quizContainer.appendChild(div);
    });

    const btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.textContent = "Enviar respuestas";
    btn.onclick = gradeQuiz;

    quizContainer.appendChild(btn);

    const stored = JSON.parse(localStorage.getItem(QUIZ_KEY));
    if (stored) {
      quizResult.textContent = `Resultado anterior: ${stored.score}/3`;
    }
  }

  function gradeQuiz() {
    let score = 0;

    quiz.questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && Number(selected.value) === q.a) {
        score++;
      }
    });

    localStorage.setItem(QUIZ_KEY, JSON.stringify({ score }));
    quizResult.textContent = `Tu resultado: ${score}/3`;
  }

  renderQuiz();
})();
