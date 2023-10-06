const wordSearchForm = document.getElementById("word-search-form");
const wordAppBody = document.querySelector(".word-app-body");
const wordListContainer = document.getElementById("word-list");
const loadingSpinner = document.querySelector(".spinner");
const copyBtn = document.getElementById("copy-btn");
let wordNotFound = true;

const getInputWord = () => {
  wordSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let searchWord = wordSearchForm.search_word.value;
    fetchSynWords(searchWord);
    wordAppBody.style.display = "none";
  });
};

getInputWord();

const fetchSynWords = async (searchWord) => {
  let url = `https://api.datamuse.com/words?rel_syn=${searchWord}`;
  try {
    loadingSpinner.style.display = "flex";
    let response = await fetch(url);
    let fetchData = await response.json();
    loadingSpinner.style.display = "none";
    renderWords(fetchData);
  } catch (error) {
    console.log(error);
  }
};

const renderWords = (wordsArr) => {
  let htmlCode;
  if (wordsArr.length > 0) {
    wordNotFound = false;
    htmlCode = wordsArr.map((word) => {
      return `<span class="word-item">${word.word}</span>`;
    });
    wordListContainer.innerHTML = htmlCode.join(" ");
  } else {
    wordNotFound = true;
    htmlCode = "No search results found";
    wordListContainer.innerHTML = htmlCode;
  }
  wordAppBody.style.display = "block";
};

const copyWordList = () => {
  if (!wordNotFound) {
    let words = wordListContainer.textContent.split(" ");

    let filteredWords = words.filter((word) => {
      return word.length !== 0;
    });

    let wordToCopy = filteredWords.join(", ");

    navigator.clipboard.writeText(wordToCopy);
  } else {
    console.log("Nothing to copy");
  }
};

copyBtn.addEventListener("click", copyWordList);
