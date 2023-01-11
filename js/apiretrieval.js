async function callingDesserts() {
  const routes = ["?category=Cookie", "?category=Donut", "?category=Ice_Cream"];
  const baseURL = "https://freerandomapi.cyclic.app/api/v1/desserts";
  const res = await Promise.all(
    routes.map((route) =>
      fetch(`${baseURL}${route}`)
        .then((res) => res.json())
        .then((response) => response.data)
        .then((data) =>
          data.map((info) => {
            return info;
          })
        )
    )
  );
  const goodies = document.querySelector(".goodies-option");
  let card;
  
  for (const item of res.flat()) {
    card = document.createElement("div");
    card.classList.add("card-container");
    card.innerHTML = `
      <div class="icon-container">
        <i id="myHeart" class="fa-regular fa-heart blue"></i>
      </div>
      <div class="category-text">
        <div class="image-container"><img src="${item.photoUrl}" alt="${item.name}"></div>
        <h1 id="category">${item.name}</h1>
        <h3 id="sweetsName">${item.description}</h3>
      </div>
    `;
    const heart = card.querySelector(".fa-heart")
    heart.addEventListener("click", function () {
      if (heart.classList.contains("red")) {
        heart.classList.remove("red");
        heart.classList.add("blue");
        // alert(`You have taken off ${item.name} from your favorites!`);
        heartTurnsBlue();
      } else {
        heart.classList.remove("blue");
        heart.classList.add("red");
        // alert(`You have added ${item.name} to your favorites!`);
        heartTurnsRed(`${item.photoUrl}`, `${item.name}`, `${item.description}`);
      }
    });
    goodies.appendChild(card);
  }
}

callingDesserts();

function heartTurnsRed(photoUrl, name, description) {
  const container = document.querySelector('.favorites-section');
  const cardContent = document.querySelector('.content-area');

  card = document.createElement('div');
  card.classList.add('card-container');
  card.innerHTML = `
    <div class="icon-container"><i id="myHeart" class="fa-regular fa-heart blue"></i></div>
    <div class="category-text">
    <div class="image-container"><img src="${photoUrl}" alt="${name}"></div>
    <h1 id="category">${name}</h1>
    <h3 id="sweetsName">${description}</h3>
    </div>
  `

  cardContent.appendChild(card);
  
  // Add an event listener to the heart icon
  const heart = card.querySelector('.fa-heart');
  heart.addEventListener('click', heartTurnsBlue );
}

function heartTurnsBlue() {
  // Remove the selected card
  const cardContent = document.querySelector('.content-area');
  const selectedCard = document.querySelector('.card-container');
  cardContent.removeChild(selectedCard);

  // Find the corresponding heart icon on the main page
  const heart = document.querySelector(`[alt="${selectedCard.querySelector('#category').innerText}"]`).parentNode.querySelector('.fa-heart');

  // Change the color of the heart icon back to blue
  heart.classList.remove('red');
  heart.classList.add('blue');
}


