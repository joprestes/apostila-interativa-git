/* =========================================================
   storage.js — Persistência de dados da Apostila Interativa Git
   =========================================================
   Responsável por:
   - Armazenar e recuperar dados no localStorage
   - Garantir integridade e fallback seguro
   ========================================================= */

/* ---------------------------------------------------------
   FUNÇÕES DE SUPORTE AO LOCALSTORAGE
---------------------------------------------------------- */

// Verifica se o navegador suporta localStorage
function storageAvailable() {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, 'ok');
    localStorage.removeItem(testKey);
    return true;
  } catch (err) {
    console.warn('⚠️ localStorage não disponível, fallback ativado.');
    return false;
  }
}

// Fallback simples na memória (se localStorage não funcionar)
const memoryStorage = {};
const storage = {
  setItem: (key, value) => (memoryStorage[key] = value),
  getItem: key => memoryStorage[key] || null,
  removeItem: key => delete memoryStorage[key]
};

// Define o storage ativo (preferencialmente o localStorage real)
const activeStorage = storageAvailable() ? localStorage : storage;

/* ---------------------------------------------------------
   FUNÇÕES DE USUÁRIO
---------------------------------------------------------- */
function saveUserName(name) {
  if (!name) return;
  activeStorage.setItem('userName', name);
}

function getUserName() {
  return activeStorage.getItem('userName') || '';
}

function clearUserName() {
  activeStorage.removeItem('userName');
}

/* ---------------------------------------------------------
   FUNÇÕES DE PROGRESSO
---------------------------------------------------------- */
function saveProgress(pagesSet) {
  if (!(pagesSet instanceof Set)) return;
  const pagesArray = Array.from(pagesSet);
  activeStorage.setItem('completedPages', JSON.stringify(pagesArray));
}

function getProgress() {
  const data = activeStorage.getItem('completedPages');
  try {
    return data ? new Set(JSON.parse(data)) : new Set(['login-page']);
  } catch {
    console.error('❌ Erro ao recuperar progresso.');
    return new Set(['login-page']);
  }
}

/* ---------------------------------------------------------
   FUNÇÕES DE QUIZZES
---------------------------------------------------------- */
function saveQuizAnswers(answersObj) {
  if (!answersObj || typeof answersObj !== 'object') return;
  activeStorage.setItem('quizAnswers', JSON.stringify(answersObj));
}

function getQuizAnswers() {
  const data = activeStorage.getItem('quizAnswers');
  try {
    return data ? JSON.parse(data) : {};
  } catch {
    console.error('❌ Erro ao recuperar respostas de quiz.');
    return {};
  }
}

/* ---------------------------------------------------------
   FUNÇÕES DE RESET
---------------------------------------------------------- */
function resetAllData() {
  ['userName', 'completedPages', 'quizAnswers'].forEach(key =>
    activeStorage.removeItem(key)
  );
  console.info('🔄 Todos os dados da apostila foram resetados.');
}

/* ---------------------------------------------------------
   EXPORTS GLOBAIS
---------------------------------------------------------- */
window.saveUserName = saveUserName;
window.getUserName = getUserName;
window.clearUserName = clearUserName;

window.saveProgress = saveProgress;
window.getProgress = getProgress;

window.saveQuizAnswers = saveQuizAnswers;
window.getQuizAnswers = getQuizAnswers;

window.resetAllData = resetAllData;
