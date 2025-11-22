import { allLanguages } from "./languages.js";

// ===== FUNÇÕES DE LINGUAGEM =====
const getLanguage = (language) => {
  let languageToReturn = language;

  if (language === null) {
    let localLanguage = localStorage.getItem("lang");
    if (localLanguage) return localLanguage;

    let userLang = navigator.language || navigator.userLanguage;
    const translateOptions = { "en-US": "en", "pt-BR": "pt-br" };
    userLang = translateOptions[userLang] || "pt-br";
    languageToReturn = userLang;
  }

  return languageToReturn;
};

function getNestedTranslation(obj, path) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

const changeLanguage = (language) => {
  const languageToChoose = getLanguage(language);
  localStorage.setItem("lang", languageToChoose);

  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-translate");
    const translation = getNestedTranslation(allLanguages[languageToChoose], key);

    if (Array.isArray(translation)) {
      // Se for lista, gera <li> para cada item
      el.innerHTML = translation.map(item => `<li>${item}</li>`).join("");
    } else if (translation) {
      el.textContent = translation;
    }
  });

  document.documentElement.lang = languageToChoose;
};


window.changeLanguage = changeLanguage;

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  // --- BOTÕES DE IDIOMA ---
  document.getElementById("flag-br")?.addEventListener("click", () =>
    changeLanguage("pt-br")
  );
  document.getElementById("flag-en")?.addEventListener("click", () =>
    changeLanguage("en")
  );

  // Define idioma inicial
  changeLanguage(null);
}); // <-- FECHANDO corretamente o bloco
