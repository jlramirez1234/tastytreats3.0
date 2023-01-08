const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const contentArea = document.getElementById("additional");

leftBtn.addEventListener("click", function () {
  const cards = contentArea.querySelectorAll(".card-container");
  const cardsArray = Array.from(cards);
  cardsArray.sort((a, b) => {
    const aName = a.querySelector("#category").textContent;
    const bName = b.querySelector("#category").textContent;

    if (aName < bName) {
      return -1;
    } else if (aName > bName) {
      return 1;
    } else {
      return 0;
    }
  });
  while (contentArea.firstChild) {
    contentArea.removeChild(contentArea.firstChild);
  }
  cardsArray.forEach((card) => {
    contentArea.appendChild(card);
  });
});

rightBtn.addEventListener("click", function () {
  const cards = contentArea.querySelectorAll(".card-container");
  const cardsArray = Array.from(cards);
  cardsArray.sort((a, b) => {
    const aName = a.querySelector("#category").textContent;
    const bName = b.querySelector("#category").textContent;

    if (aName > bName) {
      return -1;
    } else if (aName < bName) {
      return 1;
    } else {
      return 0;
    }
  });
  while (contentArea.firstChild) {
    contentArea.removeChild(contentArea.firstChild);
  }
  cardsArray.forEach((card) => {
    contentArea.appendChild(card);
  });
});
