// global state

const global_data = {
  selected_category: null,
  selected_word: null,
  most_recent_guess: null,
  remaining_guesses: 8,
};

// functions
async function fetchDataJSON() {
  const response = await fetch("http://127.0.0.1:5500/data.json");
  const data = await response.json();
  return data;
}

function fetchRandomItem(category) {
  fetchDataJSON().then((data) => {
    storeInGlobalData("selected_category", category);
    const word =
      data.categories[category][
        Math.floor(Math.random() * data.categories[category].length)
      ].name;
    storeInGlobalData("selected_word", word);
    removeCategoryWrapperFromDOM();
    showCategoryInDOM(category);
    console.log(global_data.selected_word);
    createBlankLettersInDOM();
  });
}
function showCategoryInDOM(item) {
  document.querySelector("#game-content-wrapper").classList.remove("hidden");
  new_item = item.replace("_", " ");
  document.querySelector(
    "#game-content-wrapper #selected-category"
  ).textContent = new_item;
}
function removeCategoryWrapperFromDOM() {
  document
    .querySelector("#category-selection-wrapper")
    .classList.add("display-none");
}
function storeInGlobalData(key, item) {
  global_data[key] = item;
}
function createBlankLettersInDOM() {
  for (let i = 0; i < global_data.selected_word.length; i++) {
    const blankLetter = document.createElement("div");
    blankLetter.classList.add("blank-letter");
    console.log(global_data.selected_word[i]);
    if (global_data.selected_word[i] === " ") {
      blankLetter.classList.add("no-border");
    } else {
      const blankLetterP = document.createElement("p");
      blankLetter.append(blankLetterP);
    }
    document.querySelector("#word-wrapper").append(blankLetter);
  }
}
function findSubstringIndices(mainString, substring) {
  let indices = [];
  let startIndex = 0;
  let index;

  while ((index = mainString.indexOf(substring, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + 1;
  }

  return indices;
}
function guessLetter(trigger) {
  //disable letter button (pass event.target for 'trigger')
  trigger.setAttribute("disabled", "true");
  //decrement remaining guesses and update DOM
  global_data.remaining_guesses--;
  document.querySelector("#guess-number").textContent =
    global_data.remaining_guesses;
  //if letter is in the word, then add it to the corresponding blank letter in the DOM
  if (global_data.selected_word.toLowerCase().includes(trigger.textContent)) {
    const lowerCaseInstances = findSubstringIndices(
      global_data.selected_word,
      trigger.textContent
    );
    const upperCaseInstances = findSubstringIndices(
      global_data.selected_word,
      trigger.textContent.toUpperCase()
    );
    for (
      let i = 0;
      i < document.querySelectorAll(".blank-letter").length;
      i++
    ) {
      lowerCaseInstances.forEach((item) => {
        if (i === item) {
          document.querySelectorAll(".blank-letter")[i].children[0].textContent =
            global_data.selected_word[i];
        }
      });
      upperCaseInstances.forEach((item) => {
        if (i === item) {
          document.querySelectorAll(".blank-letter")[i].children[0].textContent =
            global_data.selected_word[i];
        }
      });
    }
  }
}
// event listeners
document.querySelector("#movies-button").addEventListener("click", () => {
  fetchRandomItem("movies");
});
document.querySelector("#tv_shows-button").addEventListener("click", () => {
  fetchRandomItem("tv_shows");
});
document.querySelector("#countries-button").addEventListener("click", () => {
  fetchRandomItem("countries");
});
document
  .querySelector("#capital_cities-button")
  .addEventListener("click", () => {
    fetchRandomItem("capital_cities");
  });
document.querySelector("#animals-button").addEventListener("click", () => {
  fetchRandomItem("animals");
});
document.querySelector("#sports-button").addEventListener("click", () => {
  fetchRandomItem("sports");
});
