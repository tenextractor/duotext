// @ts-nocheck
import './style.css'

document.addEventListener("mouseup", async () => {
  const selection = window.getSelection()?.toString();
  const selectedDiv = window.getSelection()?.anchorNode;

  if (selection && selectedDiv && selectedDiv.parentElement?.classList.contains("right")) {
    const wiktionaryJson = await getWiktionaryJson(selection);
    updateDictionaryDiv(wordJsonToHtml(wiktionaryJson));
  }

  const wiktionaryLinks = document.querySelectorAll("a.wiktionary");
  wiktionaryLinks.forEach(link => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      const wiktionaryJson = await getWiktionaryJson(getWordFromWiktionaryLink(link.getAttribute("href")));
      updateDictionaryDiv(wordJsonToHtml(wiktionaryJson));
    })
  })
});

function getWiktionaryJson(word: string): object { //get word definition from wiktionary as json
  return fetch("https://en.wiktionary.org/api/rest_v1/page/definition/" + word)
    .then((response) => {return response.json()})
    .catch((_) => {return {error: "Error connecting to Wiktionary"};});
}

function wordJsonToHtml(wordJson: object): string { //convert the json data to html to be displayed
  let innerHTML: string;
  if (wordJson.error !== undefined)
    innerHTML = "Error";
  else {
    innerHTML = wordJson.la.map((object) => {
      return `<b>${object.partOfSpeech}</b><br>
      ${object.definitions.map(definition => {
        const newDefinition = definition.definition.replaceAll("<a", "<a class=\"wiktionary\"");
        //mark all wiktionary links, so that they can be intercepted and shown in the window itself,
        //instead of opening wiktionary
        return newDefinition;
      }).join("<br>")}`
    }).join("<br>");
  }
  return innerHTML;
}


function updateDictionaryDiv(innerHTML: string) {
  let dictionaryDiv = document.getElementById("dictionary");
    if (dictionaryDiv == null) {
      const mainDiv = document.getElementById("main"); //main div, parent of div with text and dictionary div
      dictionaryDiv = document.createElement("div");
      dictionaryDiv.setAttribute("class", "column");
      dictionaryDiv.setAttribute("id", "dictionary");
      mainDiv?.appendChild(dictionaryDiv);
    }
    dictionaryDiv.innerHTML = innerHTML;
}

function getWordFromWiktionaryLink(url: string): string {
  const lastSlashIndex = url.lastIndexOf("/");
  if (lastSlashIndex !== -1) return url.substring(lastSlashIndex + 1);
  return "";
}