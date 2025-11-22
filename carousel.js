// carousel.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("carousel.js carregado!");

  const carousel = document.getElementById("video-carousel");
  const scrollLeftBtn = document.getElementById("scroll-left");
  const scrollRightBtn = document.getElementById("scroll-right");

  if (!carousel || !scrollLeftBtn || !scrollRightBtn) {
    console.warn("Carousel: elementos não encontrados");
    return;
  }

  // largura aproximada de cada vídeo + gap
  const STEP = 340;

  // Clique único
  scrollLeftBtn.addEventListener("click", () => {
    console.log("Botão esquerdo clicado");
    carousel.scrollBy({ left: -STEP, behavior: "smooth" });
  });

  scrollRightBtn.addEventListener("click", () => {
    console.log("Botão direito clicado");
    carousel.scrollBy({ left: STEP, behavior: "smooth" });
  });
});
// Drag com mouse (desktop)
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("video-carousel");
  if (!carousel) return;

  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;

  // feedback visual opcional
  carousel.style.cursor = "grab";

  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    carousel.style.cursor = "grabbing";
    startX = e.pageX - carousel.offsetLeft;
    startScrollLeft = carousel.scrollLeft;
    // evita selecionar texto enquanto arrasta
    e.preventDefault();
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.style.cursor = "grab";
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.style.cursor = "grab";
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX); // delta
    carousel.scrollLeft = startScrollLeft - walk;
  });
});
