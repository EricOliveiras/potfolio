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
