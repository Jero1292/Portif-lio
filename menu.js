document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const header = document.querySelector(".site-header");

  if (menuToggle && navLinks && header) {
    // estado inicial: mobile começa expandido (menu visível)
    if (window.innerWidth <= 768) {
      header.classList.add("expanded");
    }

    menuToggle.addEventListener("click", () => {
      if (header.classList.contains("expanded")) {
        // fecha menu → compacto
        header.classList.remove("expanded");
        header.classList.add("compact");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
      } else {
        // abre menu → expandido
        header.classList.remove("compact");
        header.classList.add("expanded");
        menuToggle.textContent = "✖";
        menuToggle.setAttribute("aria-expanded", "true");
      }
    });

    // reset ao redimensionar
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        header.classList.remove("compact");
        header.classList.remove("expanded");
        menuToggle.textContent = "";
        menuToggle.setAttribute("aria-expanded", "false");
      } else {
        // mobile volta expandido por padrão
        header.classList.add("expanded");
        menuToggle.textContent = "☰";
      }
    });
  }
});
