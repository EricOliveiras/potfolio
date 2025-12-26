document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".typing");

  async function typeSequence() {
    for (let element of elements) {
      // Se o elemento estiver dentro de um project-item ou experience-item, mostra o container primeiro
      const parentItem = element.closest(".project-item, .experience-item");
      if (parentItem) {
        parentItem.classList.add("item-visible");
      }

      const destination = element;
      const fullContent = destination.innerHTML;

      destination.innerHTML = "";
      destination.style.visibility = "visible";
      destination.classList.add("typing-active");

      let currentHTML = "";
      let isTag = false;
      let tagBuffer = "";

      for (let i = 0; i < fullContent.length; i++) {
        const char = fullContent[i];
        if (char === "<") isTag = true;

        if (isTag) {
          tagBuffer += char;
          if (char === ">") {
            isTag = false;
            currentHTML += tagBuffer;
            tagBuffer = "";
          }
        } else {
          currentHTML += char;
          destination.innerHTML = currentHTML;
          const delay = parseInt(element.getAttribute("data-delay")) || 20;
          await new Promise((res) => setTimeout(res, delay));
        }
      }

      destination.innerHTML = fullContent;
      destination.classList.remove("typing-active");
      await new Promise((res) => setTimeout(res, 100));
    }
  }

  typeSequence();
});

// Adicione isso ao final do seu arquivo script.js
const inputField = document.getElementById("terminal-input");
const messageArea = document.getElementById("download-msg");

inputField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const command = inputField.value.toLowerCase().trim();

    if (command === "./download" || command === "get resume") {
      // Passo 1: Mostra que iniciou
      messageArea.innerHTML = "Iniciando download... [▒▒▒▒▒▒▒▒▒▒] 0%";
      messageArea.style.color = "var(--cyan)";

      // Passo 2: Após 2 segundos, atualiza para concluído e inicia o download real
      setTimeout(() => {
        messageArea.innerHTML = "Download concluído! [██████████] 100%";
        messageArea.style.color = "var(--terminal-green)";

        const link = document.createElement("a");
        // Certifique-se de que o nome do arquivo abaixo seja o mesmo que está na pasta public
        link.href =
          "Currículo – Desenvolvedor Backend – Eric Nascimento.pdf";
        link.download = "Eric_Oliveira_CV.pdf";
        link.click();
      }, 2000); // 2000 milissegundos = 2 segundos
    } else {
      messageArea.innerHTML = `Comando '${command}' não reconhecido. Tente './download'`;
      messageArea.style.color = "red";
    }
    inputField.value = "";
  }
});
