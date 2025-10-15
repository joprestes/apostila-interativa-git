/* =========================================================
   quizzes.js — Lógica de quizzes e recomendações da apostila
   =========================================================
   Responsável por:
   - Validar respostas de quizzes
   - Armazenar progresso individual
   - Calcular desempenho final
   - Exibir recomendações personalizadas
   ========================================================= */

let quizAnswers = {};
let finalQuizAnswers = {};
let userName = localStorage.getItem('userName') || '';

/* ---------------------------------------------------------
   VERIFICAÇÃO DE RESPOSTAS DE QUIZ
---------------------------------------------------------- */
function checkQuiz(quizId) {
  const quiz = document.getElementById(quizId);
  if (!quiz) {
    console.error(`❌ Quiz '${quizId}' não encontrado no DOM.`);
    return;
  }

  const selected = quiz.querySelector('input[type="radio"]:checked');
  let feedback = quiz.querySelector('.quiz-feedback');

  if (!selected) {
    alert('Selecione uma resposta antes de continuar!');
    return;
  }

  // Cria o feedback se não existir no DOM
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'quiz-feedback';
    quiz.appendChild(feedback);
  }

  const isCorrect = selected.dataset.correct === 'true';
  quizAnswers[quizId] = isCorrect;

  feedback.textContent = isCorrect
    ? `✅ Muito bem, ${userName || 'aluno'}!`
    : `❌ Quase lá, ${userName || 'aluno'}! Reveja o conteúdo acima.`;
  feedback.style.color = isCorrect ? '#16a34a' : '#dc2626';
}

/* ---------------------------------------------------------
   REGISTRAR RESPOSTAS DO QUIZ FINAL
---------------------------------------------------------- */
function registerFinalAnswer(questionId, category, isCorrect) {
  if (!questionId) {
    console.warn('⚠️ Questão sem ID identificador ignorada.');
    return;
  }
  finalQuizAnswers[questionId] = { correct: !!isCorrect, category: category || 'geral' };
}

/* ---------------------------------------------------------
   EXIBIR RESULTADOS FINAIS
---------------------------------------------------------- */
function showFinalResults() {
  const results = document.getElementById('finalResults');
  if (!results) {
    console.warn('⚠️ Elemento #finalResults não encontrado.');
    return;
  }

  const categories = {
    conceitos: { correct: 0, questions: 0 },
    comandos: { correct: 0, questions: 0 },
    nomenclatura: { correct: 0, questions: 0 },
    pr: { correct: 0, questions: 0 },
    geral: { correct: 0, questions: 0 }
  };

  Object.values(finalQuizAnswers).forEach(({ correct, category }) => {
    const key = categories[category] ? category : 'geral';
    categories[key].questions++;
    if (correct) categories[key].correct++;
  });

  results.innerHTML = generateRecommendations(categories);
}

/* ---------------------------------------------------------
   GERAR RECOMENDAÇÕES PERSONALIZADAS
---------------------------------------------------------- */
function generateRecommendations(categories) {
  let recommendations = '<ul>';

  Object.entries(categories).forEach(([key, cat]) => {
    if (cat.questions === 0) return;

    const pct = (cat.correct / cat.questions) * 100;

    if (pct >= 75) {
      const msgs = {
        conceitos: 'Excelente domínio dos fundamentos do Git!',
        comandos: 'Você domina o fluxo básico de versionamento!',
        nomenclatura: 'Você entende bem convenções de branch e commits!',
        pr: 'Ótimo entendimento de colaboração via Pull Requests!',
        geral: 'Bom desempenho geral — continue praticando!'
      };
      recommendations += `<li><strong>${capitalize(key)}:</strong> ${msgs[key]}</li>`;
    } else {
      const msgs = {
        conceitos: 'Revise workflows e boas práticas de versionamento.',
        comandos: 'Pratique comandos como rebase, stash e cherry-pick.',
        nomenclatura: 'Aplique convenções de commits e branches semânticos.',
        pr: 'Participe de revisões de código em equipe.',
        geral: 'Continue praticando diariamente para reforçar os conceitos.'
      };
      recommendations += `<li><strong>${capitalize(key)}:</strong> ${msgs[key]}</li>`;
    }
  });

  const totalQuestions = Object.values(categories).reduce((sum, c) => sum + c.questions, 0);
  const totalCorrect = Object.values(categories).reduce((sum, c) => sum + c.correct, 0);
  const overall = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  if (overall >= 75) {
    recommendations += '<li><strong>Próximo Nível:</strong> Explore Git hooks, CI/CD e automações avançadas.</li>';
  } else {
    recommendations += '<li><strong>Prática Constante:</strong> Reserve 15 minutos por dia para praticar Git.</li>';
  }

  recommendations += '</ul>';
  return recommendations;
}

/* ---------------------------------------------------------
   FUNÇÃO AUXILIAR
---------------------------------------------------------- */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
