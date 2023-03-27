const callingDesserts = async () => {
  const routes = ["?category=Cookie", "?category=Donut", "?category=Ice_Cream"];
  const baseURL = "https://freerandomapi.cyclic.app/api/v1/desserts";
  const res = await Promise.all(
    routes.map((route) =>
      fetch(`${baseURL}${route}`)
        .then((res) => res.json())
        .then((response) => response.data)
        .then((data) =>
          data.map((info) => {
            info.isHearted = false;
            // console.log(info)
            return info;
          })
        )
    )
  );
  return res;
};

async function dessertsToDisplay() {
  let res = await callingDesserts();
  const goodies = document.querySelector(".goodies-option");

  for (const item of res.flat()) {
    let card = document.createElement("div");
    card.classList.add("card-container");
    card.innerHTML = `
      <div class="icon-container">
        <i id="myHeart" class="fa-regular fa-heart"></i>
      </div>
      <div class="category-text">
        <div class="image-container"><img src="${item.photoUrl}" alt="${item.name}"></div>
        <h1 id="category">${item.name}</h1>
        <h3 id="sweetsName">${item.description}</h3>
      </div>
    `;

    const heart = card.querySelector(".fa-regular");

    heart.addEventListener("click", () => {
      if (!item.isHearted) {
        item.isHearted = true;
        heart.classList.add("is-heart");
        card.remove();
        favoritesPage(item, goodies);
      } else {
        item.isHearted = false;
        heart.classList.remove("is-heart");
        card.remove();
      }
    });

    goodies.appendChild(card);
  }
}

dessertsToDisplay();

function favoritesPage(item, goodies) {
  const cardContent = document.querySelector(".content-area");
  let card = document.createElement("div");
  card.classList.add("card-container");
  card.innerHTML = `
    <div class="icon-container"><i id="myHeart" class="fa-regular fa-heart is-heart"></i></div>
    <div class="category-text">
    <div class="image-container"><img src="${item.photoUrl}" alt="${item.name}"></div>
    <h1 id="category">${item.name}</h1>
    <h3 id="sweetsName">${item.description}</h3>
    </div>
  `;

  cardContent.appendChild(card);

  const heart = card.querySelector(".fa-regular");
  heart.addEventListener("click", () => {
    if (item.isHearted) {
      item.isHearted = false;
      card.remove();
      heart.classList.remove("is-heart");
      goodies.appendChild(card);
    }
  });
}

async function counter() {
  let goodSweets = await callingDesserts();
  let flat = goodSweets.flat();
  let cookie = flat.filter((oreo) => oreo.category == "Cookie").length;
  let donuts = flat.filter((oreo) => oreo.category == "Donut").length;
  let iceCream = flat.filter((oreo) => oreo.category == "Ice_Cream").length;

  const numberCount = document.querySelector(".numberCount");
  let sweetness = document.createElement("div");
  sweetness.classList.add("sweetness");
  sweetness.innerHTML = `
  <h3>Total Amount of Cookies: ${cookie}</h3>
  <h3>Total Amount of Donuts:  ${donuts} </h3>
  <h3>Total Amount of Ice-Creams:   ${iceCream}</h3>`;
  numberCount.appendChild(sweetness);
  dessertsToDisplay();
}

counter();
