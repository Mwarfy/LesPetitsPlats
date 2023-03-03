import { recipes } from "/data/recipes.js";

const search = document.getElementById("search");
const selectOption1 = document.querySelector(".selectOption1");
const selectOption2 = document.querySelector(".selectOption2");
const selectOption3 = document.querySelector(".selectOption3");
let recipesFilter = recipes;
let tagListIngredient = [];
let tagListAppareil = [];
let tagListUstensils = [];
let recipesOptions = {};
search.value = "";
[selectOption1, selectOption2, selectOption3].forEach((e) =>
  e.addEventListener("click", () => {
    initDisplay();
  })
);

search.addEventListener("input", () => {
  initDisplay();
});

document.addEventListener("click", (e) => {
  const selectIngredient = document.getElementById("select1");
  const selectAppareils = document.getElementById("select2");
  const selectUstensiles = document.getElementById("select3");

  displayOptions(
    e,
    selectOption1,
    selectIngredient,
    "ingredient",
    "Rechercher un ingrédient",
    "color1"
  );
  displayOptions(
    e,
    selectOption2,
    selectAppareils,
    "appareil",
    "Rechercher un appareil",
    "color2"
  );
  displayOptions(
    e,
    selectOption3,
    selectUstensiles,
    "ustensile",
    "Rechercher un ustensile",
    "color3"
  );
});

const displayOptions = (
  e,
  selectOption,
  selectJS,
  onMap,
  inputPlaceHolder,
  color
) => {
  if (e.target === selectJS) {
    const input = document.createElement("input");
    input.addEventListener("click", (e) => e.stopPropagation());
    input.type = "text";
    input.placeholder = inputPlaceHolder;
    selectOption.className =
      selectOption.className + " visible grid grid-cols-3 pl-5 pt-5";
    selectOption.classList.remove("hidden");
    selectOption.classList.add("max-h-72");
    selectOption.innerHTML = "";
    input.className = input.className + "w-[600px]";
    selectJS.parentNode.replaceChild(input, selectJS);
    let unique = new Array();
    recipesOptions = recipesFilter;

    if (onMap === "ingredient") {
      input.setAttribute("id", "select1");
      recipesOptions.map(({ ingredients }) =>
        ingredients.map((data) =>
          tagListIngredient.length
            ? !data.ingredient.includes(tagListIngredient) &&
              unique.push(data.ingredient)
            : unique.push(data.ingredient)
        )
      );
    } else if (onMap === "appareil") {
      input.setAttribute("id", "select2");
      recipesOptions.map((data) =>
        tagListAppareil.length
          ? !data.appliance.includes(tagListAppareil) &&
            unique.push(data.appliance)
          : unique.push(data.appliance)
      );
    } else {
      input.setAttribute("id", "select3");
      recipesOptions.map(({ ustensils }) =>
        ustensils.map((data) =>
          tagListUstensils.length
            ? !data.includes(tagListUstensils) && unique.push(data)
            : unique.push(data)
        )
      );
    }
    unique = [...new Set(unique.map((data) => data))];
    displayFilterOption(unique, color, selectOption, onMap);
    input.addEventListener("input", () => {
      selectOption.innerHTML = "";
      displayFilterOption(
        unique.filter((data) => data.toLowerCase().includes(input.value)),
        color,
        selectOption,
        onMap
      );
    });
  } else {
    const select = document.createElement("select");
    const option = document.createElement("option");
    option.textContent = onMap;
    selectOption.classList.add("hidden");
    selectJS.parentNode.replaceChild(select, selectJS);
    if (onMap === "ingredient") {
      select.setAttribute("id", "select1");
    } else if (onMap === "appareil") {
      select.setAttribute("id", "select2");
    } else {
      select.setAttribute("id", "select3");
    }
    select.appendChild(option);
  }
};

const displayFilterOption = (unique, color, selectOption, onMap) => {
  unique.sort().map((data) => {
    const option = document.createElement("span");
    const tag = document.querySelector(".tag");
    option.textContent = data;
    selectOption.appendChild(option);
    option.addEventListener("click", () => {
      const div = document.createElement("div");
      const icon = document.createElement("i");
      icon.setAttribute("class", "fa fa-window-close");
      div.textContent = data;
      div.appendChild(icon);
      tag.appendChild(div);
      div.className =
        div.className +
        "border text-white rounded p-3 cursor-pointer flex gap-3 items-center";
      div.classList.add(color);
      if (onMap === "ingredient") {
        tagListIngredient.push(data);
      } else if (onMap === "appareil") {
        tagListAppareil.push(data);
      } else {
        tagListUstensils.push(data);
      }
      icon.addEventListener("click", () => {
        if (onMap === "ingredient") {
          tagListIngredient = tagListIngredient.filter((d) => d !== data);
        } else if (onMap === "appareil") {
          tagListAppareil = tagListAppareil.filter((d) => d !== data);
        } else {
          tagListUstensils = tagListUstensils.filter((d) => d !== data);
        }
        div.style = "display:none";
        initDisplay();
      });
    });
  });
};
const displayList = (recipesFilter) => {
  const listSection = document.querySelector(".list_section");
  listSection.innerHTML = "";
  recipesFilter.map((data) => {
    const article = document.createElement("article");
    const contentArticle = document.createElement("div");
    contentArticle.setAttribute(
      "class",
      "p-3 px-4 contentArticle flex flex-col gap-4 h-[180px]"
    );
    article.setAttribute("class", "flex flex-col h-[340px]");
    const divImage = document.createElement("div");
    divImage.setAttribute("class", "itemImg h-[160px] rounded-t");
    const divTitle = document.createElement("div");
    divTitle.setAttribute("class", "flex justify-between");
    const divIconTime = document.createElement("div");
    divIconTime.setAttribute("class", "font-bold flex gap-1 items-center pr-2");
    const title = document.createElement("span");
    title.setAttribute("class", "nowrap overflow-hidden text-ellipisis w-9/12");
    const icon = document.createElement("i");
    const time = document.createElement("span");
    const divDescription = document.createElement("div");
    divDescription.setAttribute("class", "flex gap-2");
    const divIngredients = document.createElement("div");
    divIngredients.setAttribute("class", "w-1/2 text-xs");
    const divPreparation = document.createElement("div");
    divPreparation.setAttribute("class", "w-1/2 preparation text-xs");
    data.ingredients.map((dataIngredient) => {
      const divLine = document.createElement("div");
      const ingredient = document.createElement("span");
      ingredient.setAttribute("class", "font-semibold");
      const quantity = document.createElement("span");
      const unite = document.createElement("span");
      ingredient.textContent = dataIngredient.ingredient + ": ";
      quantity.textContent = dataIngredient.quantity + " ";
      if (dataIngredient.unit) {
        let unit = "";
        if (dataIngredient.unit === "grammes") unit = "g";
        else if (dataIngredient.unit === "cuillères à soupe")
          unit = "cuillères";
        else unit = dataIngredient.unit;

        unite.textContent = unit;
      }
      divLine.appendChild(ingredient);
      divLine.appendChild(quantity);
      divLine.appendChild(unite);
      divIngredients.appendChild(divLine);
    });
    article.appendChild(divImage);
    title.textContent = data.name;
    icon.setAttribute("class", "fa-regular fa-clock");
    time.textContent = data.time + " min";
    divTitle.appendChild(title);
    divIconTime.appendChild(icon);
    divIconTime.appendChild(time);
    divTitle.appendChild(divIconTime);
    contentArticle.appendChild(divTitle);
    divPreparation.textContent = data.description;
    divDescription.appendChild(divIngredients);
    divDescription.appendChild(divPreparation);
    contentArticle.appendChild(divDescription);
    article.appendChild(contentArticle);
    listSection.appendChild(article);
  });
};
const filterOption = (recipesFilter) => {
  if (tagListIngredient.length > 0) {
    recipesFilter = recipesFilter.filter((data) =>
      tagListIngredient.every((tag) =>
        data.ingredients.some((d) => d.ingredient.includes(tag))
      )
    );
  }
  if (tagListAppareil.length > 0) {
    recipesFilter = recipesFilter.filter((data) =>
      tagListAppareil.every((tag) => data.appliance.includes(tag))
    );
  }
  if (tagListUstensils.length > 0) {
    recipesFilter = recipesFilter.filter((data) =>
      tagListUstensils.every((tag) => data.ustensils.includes(tag))
    );
  }
  return recipesFilter;
};
const initDisplay = () => {
  if (search.value.length > 2) {
    recipesFilter = filterWithTab(recipesFilter);
    recipesFilter = filterOption(recipesFilter);
  } else {
    recipesFilter = filterOption(recipes);
  }
  displayList(recipesFilter);
};

const filterWithTab = (recipesFilter) => {
  let recipesFilterTab = [];
  let bool = false;
  for (let i = 0; i < recipesFilter.length; i++) {
    if (recipesFilter[i].name.toLowerCase().includes(search.value)) {
      recipesFilterTab.push(recipesFilter[i]);
      bool = true;
    } else if (
      recipesFilter[i].description
        .toLowerCase()
        .includes(search.value.toLowerCase())
    ) {
      recipesFilterTab.push(recipesFilter[i]);
      bool = true;
    } else if (bool == false) {
      for (let j = 0; j < recipesFilter[i].ingredients.length; j++) {
        if (
          recipesFilter[i].ingredients[j]
            .toLowerCase()
            .includes(search.value.toLowerCase())
        ) {
          recipesFilterTab.push(recipesFilter[i]);
          break;
        }
      }
    }
    i++;
  }
  return recipesFilterTab;
};
const init = () => {
  displayList(recipes);
};

init();
