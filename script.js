import { newEl, createCard, q } from "./utils.js";

const BASE_URL = "https://fakestoreapi.com/products";

const nomeUtente = prompt("Inserire nome utente");
const navbarEl = newEl("nav");
const footerEl = newEl("footer");
const titleEl = newEl("h4");
const contentEl = newEl("p");
const titleEl2 = newEl("h4");
const contentEl2 = newEl("p");
const divfooter = newEl("div");
const productList = newEl("div");
const pezziInEccesso = newEl("h3");
const carrello = newEl("p");

titleEl.innerText = "Nome utente: ";
titleEl2.innerText = "Nome utente: ";

pezziInEccesso.innerText = "Prodotti in eccesso(>200 pezzi):";
document.body.append(navbarEl, pezziInEccesso, productList, divfooter);
navbarEl.append(titleEl, contentEl, carrello);
divfooter.append(footerEl);
footerEl.append(titleEl2, contentEl2);

localStorage.setItem("username", nomeUtente);
contentEl.innerText = nomeUtente + ";";
contentEl2.innerText = nomeUtente;

navbarEl.className = "navbar_El";
divfooter.className = "divfooter";
footerEl.className = "footer_El";
productList.className = "product_List";
pezziInEccesso.className = "pezziInEccesso";
carrello.className = "carrello";

titleEl.style = `margin-top: 0px; padding-top: 5px`;
contentEl.style = `margin-top: 0px; padding: 5px 0 0 10px;`;
titleEl2.style = `margin-top: 0px; padding-top: 5px`;
contentEl2.style = `margin-top: 0px; padding: 5px 0 0 10px;`;

fetch(BASE_URL)
  .then((res) => res.json())
  .then((data) => {
    const prodottiInEccesso = data
      .filter((product) => product.rating.count >= 200)
      .map((product) =>
        createCard(
          productList,
          product.image,
          product.title,
          product.price,
          product.rating.count
        )
      );
    carrello.textContent = ` Carrello: ${prodottiInEccesso.length} prodotti presenti;`;

    // data
    //   .filter((product) => product.price >= 100)
    //   .map((product) =>
    //     createCard(productList, product.image, product.title, product.price)
    //   );
  });
