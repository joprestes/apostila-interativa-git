/* =========================================================
   navigation.js — Controle de navegação e progresso
   =========================================================
   Responsável por:
   - Alternar páginas da apostila
   - Gerenciar capítulos e subcapítulos
   - Atualizar barra de progresso
   ========================================================= */

let currentPage = 'login-page';
let completedPages = new Set(['login-page']);

/* ---------------------------------------------------------
   EXIBIÇÃO DE PÁGINAS
---------------------------------------------------------- */
function showPage(pageId) {
  const current = document.getElementById(currentPage);
  const next = document.getElementById(pageId);

  if (!next) {
    console.error(`❌ Página com ID '${pageId}' não encontrada no DOM.`);
    return;
  }

  if (current) current.classList.remove('active');
  next.classList.add('active');
  currentPage = pageId;

  completedPages.add(pageId);
  updateProgress();
  updateActiveNavigation(pageId);
}

/* ---------------------------------------------------------
   EXPANDIR / RECOLHER CAPÍTULOS NA SIDEBAR
---------------------------------------------------------- */
function toggleChapter(chapterId) {
  const chapter = document.getElementById(chapterId);
  const title = chapter?.previousElementSibling;

  if (!chapter) {
    console.warn(`⚠️ Capítulo '${chapterId}' não encontrado.`);
    return;
  }

  const isHidden = chapter.style.display === 'none' || !chapter.style.display;
  chapter.style.display = isHidden ? 'block' : 'none';

  if (title) title.classList.toggle('active', isHidden);
}

/* ---------------------------------------------------------
   ATUALIZAR ESTADO VISUAL DA NAVEGAÇÃO
---------------------------------------------------------- */
function updateActiveNavigation(pageId) {
  const subchapters = document.querySelectorAll('.subchapter');
  if (!subchapters.length) return;

  subchapters.forEach(sub => sub.classList.remove('active'));
  const activeSub = document.querySelector(`.subchapter[onclick="showPage('${pageId}')"]`);
  if (activeSub) activeSub.classList.add('active');
}

/* ---------------------------------------------------------
   ATUALIZAR BARRA DE PROGRESSO
---------------------------------------------------------- */
function updateProgress() {
  const pages = document.querySelectorAll('.page');
  if (!pages.length) return;

  const totalPages = pages.length;
  const completedCount = completedPages.size;
  const progress = totalPages ? Math.round((completedCount / totalPages) * 100) : 0;

  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressText');

  if (fill) fill.style.width = `${progress}%`;
  if (text) text.textContent = `${progress}%`;
}

/* ---------------------------------------------------------
   INICIALIZAÇÃO DE NAVEGAÇÃO PADRÃO
---------------------------------------------------------- */
function initNavigation() {
  try {
    toggleChapter('chapter1');
    updateActiveNavigation(currentPage);
    updateProgress();
  } catch (err) {
    console.error('🚨 Erro ao inicializar navegação:', err);
  }
}

/* ---------------------------------------------------------
   EVENTO DE INICIALIZAÇÃO
---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', initNavigation);

