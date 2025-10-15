/* =========================================================
   main.js — Script principal da Apostila Interativa Git
   =========================================================
   Agora integrado ao módulo storage.js
   Responsável por:
   - Iniciar a apostila
   - Controlar nome do usuário
   - Gerenciar páginas e progresso
   - Sincronizar dados com storage.js
   ========================================================= */

let userName = getUserName();
let completedPages = getProgress();
let currentPage = 'login-page';

/* ---------------------------------------------------------
   INÍCIO DA APOSTILA
---------------------------------------------------------- */
function startApostila() {
  const nameInput = document.getElementById('userName');
  const inputName = nameInput.value.trim();

  if (!inputName) {
    nameInput.style.borderColor = '#e74c3c';
    nameInput.placeholder = 'Por favor, digite seu nome para continuar...';
    nameInput.focus();
    return;
  }

  userName = inputName;
  saveUserName(userName);
  updateUserNameElements();
  showPage('boas-vindas');
}

/* ---------------------------------------------------------
   ATUALIZAR NOMES DE USUÁRIO NAS PÁGINAS
---------------------------------------------------------- */
function updateUserNameElements() {
  const welcomeElement = document.getElementById('welcomeUserName');
  if (welcomeElement) welcomeElement.textContent = userName;

  const finalElement = document.getElementById('finalUserName');
  if (finalElement) finalElement.textContent = userName;

  document.querySelectorAll('.user-name-feedback').forEach(el => {
    el.textContent = userName;
  });
}

/* ---------------------------------------------------------
   EXIBIÇÃO DE PÁGINAS (wrapper de navegação)
---------------------------------------------------------- */
function showPage(pageId) {
  const current = document.getElementById(currentPage);
  const next = document.getElementById(pageId);

  if (!next) {
    console.error(`❌ Página com ID '${pageId}' não encontrada.`);
    return;
  }

  if (current) current.classList.remove('active');
  next.classList.add('active');
  currentPage = pageId;

  completedPages.add(pageId);
  updateProgress();
  updateActiveNavigation(pageId);
  saveProgress(completedPages); // ✅ Salva o progresso
}

/* ---------------------------------------------------------
   ATUALIZAÇÃO DE PROGRESSO
---------------------------------------------------------- */
function updateProgress() {
  const totalPages = document.querySelectorAll('.page').length;
  const completedCount = completedPages.size;
  const progress = Math.round((completedCount / totalPages) * 100);

  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressText');

  if (fill) fill.style.width = `${progress}%`;
  if (text) text.textContent = `${progress}%`;
}

/* ---------------------------------------------------------
   REINICIAR APOSTILA / LIMPAR DADOS
---------------------------------------------------------- */
function resetApostila() {
  if (confirm('Tem certeza que deseja reiniciar sua apostila? Isso apagará seu progresso.')) {
    resetAllData();
    location.reload();
  }
}

/* ---------------------------------------------------------
   INICIALIZAÇÃO AUTOMÁTICA
---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // 🔹 Carregar dados do storage
  userName = getUserName();
  completedPages = getProgress();

  if (userName) {
    updateUserNameElements();
    showPage('boas-vindas');
  } else {
    showPage('login-page');
  }

  // 🔹 Garante que o capítulo 1 e progresso apareçam corretamente
  toggleChapter('chapter1');
  updateActiveNavigation(currentPage);
  updateProgress();
});
