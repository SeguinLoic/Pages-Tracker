const formulaire = document.getElementById("formPages");
const inputForm = formulaire.querySelector("#nomPage");
const containerPages = document.querySelector(".container-pages");
const containerCount = document.querySelector(".count-pages");
const deleteProject = document.querySelector(".delete");
let numberPages = 0;
let numberChecked = 0;
getStore();

// --- EVENT LISTENER
formulaire.addEventListener("submit", addPage);

deleteProject.addEventListener("click", function () {
  localStorage.removeItem("items");
  getStore();
});

containerPages.addEventListener("click", function (e) {
  if (e.target.tagName.toUpperCase() === "INPUT") {
    if (e.target.parentNode.classList.contains("checked")) {
      e.target.parentNode.classList.remove("checked");
      numberChecked--;
    } else {
      e.target.parentNode.classList.add("checked");
      numberChecked++;
    }
    countPages();
    setStore();
  }
});

// ADD PAGE
function addPage(e) {
  e.preventDefault();
  if (inputForm.value !== "") {
    const content = document.createElement("div");
    content.classList.add("page");
    let idInput = token();
    content.innerHTML = `<input type="checkbox" id="${idInput}"/><input type="text" class="titlePage" value="${inputForm.value}"/>`;
    containerPages.appendChild(content);
    setStore();
  }
  nbPages();
  inputForm.value = "";
}

// COUNT PAGE
function countPages() {
  containerCount.innerHTML = `${numberChecked} / ${numberPages}`;
}

// UPDATE NB PAGES
function nbPages() {
  const elem = containerPages.querySelectorAll(".page");
  numberPages = elem.length;
  countPages();
}

// TOKEN
const rand = () => Math.random().toString(36).substr(2);
const token = () => rand() + rand();

// STORE
function setStore() {
  const items = containerPages.innerHTML;
  localStorage.setItem("items", items);
}

function getStore() {
  const itemStore = localStorage.getItem("items");
  containerPages.innerHTML = itemStore;
  const checked = containerPages.querySelectorAll(".checked input");
  numberChecked = checked.length;
  checked.forEach((input) => (input.checked = true));

  nbPages();
}
