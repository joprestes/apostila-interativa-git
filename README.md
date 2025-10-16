# 📚 Apostila Interativa Git para QA — Versão 2.0.0

![Status](https://img.shields.io/badge/status-online-success?style=flat-square)
![Git](https://img.shields.io/badge/Git-para_QA-8B5CF6?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

Apostila digital **interativa** e **modularizada**, criada para revisão de **Git voltada a profissionais de QA**.  
Agora com arquitetura 2.0 — modular em HTML, CSS e JavaScript, persistência segura e navegação otimizada.

---

## 🚀 Demonstração

👉 **Acesse online:** [https://joprestes.github.io/apostila-interativa-git/](https://joprestes.github.io/apostila-interativa-git/)

---

## 🧩 Arquitetura Modular

| Módulo | Função |
|---------|--------|
| `assets/js/storage.js` | Persistência de dados (localStorage + fallback em memória) |
| `assets/js/navigation.js` | Controle de páginas, capítulos e progresso |
| `assets/js/quizzes.js` | Lógica dos quizzes, feedback e resultados |
| `assets/js/main.js` | Orquestra inicialização e integra os módulos |
| `assets/css/base.css` | Estilos globais e resets |
| `assets/css/components.css` | Componentes visuais e interativos |
| `assets/css/layout.css` | Estrutura de layout e containers |
| `assets/css/themes.css` | Paleta de cores e temas visuais |
| `chapters.json` | Estrutura e conteúdo da apostila |

---

## 💻 Tecnologias Utilizadas

- **HTML5** — estrutura da apostila  
- **CSS3** — estilização moderna e responsiva  
- **JavaScript (ES6)** — interatividade e quizzes  
- **Git** — controle de versão e aprendizado prático  

---

## 📖 Conteúdo Abordado

1. Conceitos Essenciais de Git para QA  
2. Comandos Básicos e Fluxos de Trabalho  
3. Nomenclatura de Branches e Commits Semânticos  
4. Pull Requests e Revisão de Código  
5. Quiz Final e Recursos Complementares  

Cada capítulo contém **explicações teóricas**, **exemplos práticos** e **quizzes automáticos** com feedback em tempo real.

---

## 🧠 Objetivo do Projeto

Esta apostila foi criada para:
- Ajudar **QAs** a revisarem comandos e boas práticas do Git  
- Fortalecer a integração entre **QA e Dev** via versionamento colaborativo  
- Servir como **material de estudo ou treinamento interno**  

---

## ⚙️ Execução Local

```bash
# 1. Clone o repositório
git clone https://github.com/joprestes/apostila-git-qa.git

# 2. Acesse a pasta
cd apostila-git-qa

# 3. Abra o arquivo no navegador
start index.html     # (Windows)
# ou
open index.html      # (macOS)
```

Não é necessário servidor — o projeto é **100% estático**.

---

## 🌐 Publicação no GitHub Pages

1. Vá em **Settings → Pages**  
2. Em **Source**, selecione `main` → `/ (root)`  
3. Clique em **Save**  
4. O site estará disponível em:
   ```
   https://joprestes.github.io/apostila-git-qa
   ```

---

## 🧱 Estrutura de Pastas

```bash
apostila-git-qa/
├── index.html
├── README.md
├── chapters.json
└── assets/
    ├── css/
    │   ├── base.css
    │   ├── components.css
    │   ├── layout.css
    │   └── themes.css
    └── js/
        ├── storage.js
        ├── navigation.js
        ├── quizzes.js
        └── main.js
```

---

## 🧭 Convenção de Branches

| Tipo de mudança | Prefixo | Exemplo |
|-----------------|----------|---------|
| Nova funcionalidade | `feat/` | `feat/adicionar-quiz-final` |
| Correção de bug | `fix/` | `fix/erro-navegacao` |
| Documentação | `docs/` | `docs/add-readme` |
| Estilo/estrutura visual | `style/` | `style/ajustes-layout` |
| Refatoração | `refactor/` | `refactor/otimizar-js` |

---

## 🧾 Versionamento

Segue o padrão [Conventional Commits](https://www.conventionalcommits.org/):  
- `feat:` novas funcionalidades  
- `fix:` correções  
- `docs:` atualizações de documentação  
- `style:` ajustes visuais ou de layout  
- `refactor:` melhorias estruturais sem mudar comportamento  

---

## 🪪 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).  
Sinta-se à vontade para usar, modificar e compartilhar — citando a fonte.

---

## ✨ Autora e Desenvolvimento

Desenvolvido por **Joelma Prestes Ferreira** 💜  

🔗 **LinkedIn:** [linkedin.com/in/joprestes84](https://www.linkedin.com/in/joprestes84/)  
📝 **Medium:** [medium.com/@joprestes](https://medium.com/@joprestes)  
💻 **GitHub:** [github.com/joprestes](https://github.com/joprestes)

---

> 💡 *"Aprender Git é essencial — especialmente para quem garante a qualidade do código."*
