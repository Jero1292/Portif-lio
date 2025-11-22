// Função de confirmação com popup
window.confirmarDownload = async function(event, url) {
  event.preventDefault();

  try {
    const response = await fetch(url, { method: 'HEAD' });
    const size = response.headers.get("Content-Length");
    let tamanhoMB = "desconhecido";

    if (size) {
      tamanhoMB = (size / (1024*1024)).toFixed(2) + " MB";
    }

    const confirmar = confirm(`Este arquivo tem ${tamanhoMB}. Deseja baixar?`);

    if (confirmar) {
      const link = document.createElement("a");
      link.href = url;
      link.download = url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (e) {
    alert("Erro ao verificar o tamanho do arquivo.");
    console.error(e);
  }
};

// Função para mostrar tamanho na página ANTES do clique
async function mostrarTamanho(url, elementId) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const size = response.headers.get("Content-Length");
    if (size) {
      const mb = (size / (1024*1024)).toFixed(2);
      document.getElementById(elementId).textContent = `${mb} MB`;
    }
  } catch (e) {
    console.error("Erro ao obter tamanho:", e);
  }
}

// Executa ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  mostrarTamanho("arquivos/guia-completo.pdf", "size-guia");
  mostrarTamanho("arquivos/ciberseguranca.pdf", "size-ciber");
  mostrarTamanho("arquivos/relatorio-tendencias.pdf", "size-tendencias");
});
