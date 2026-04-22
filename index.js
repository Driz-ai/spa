                

const form = document.getElementById("form");
const input = document.getElementById("wordInput");

const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const synonymsEl = document.getElementById("synonyms");
const audioPlayer = document.getElementById("audio-player");


function clearUI() {
    wordEl.textContent = "";
    meaningEl.textContent = "";
    synonymsEl.textContent = "";
    audioPlayer.classList.add("hidden");
}


function displayData(result) {
    wordEl.textContent = result.word;

    const meaning = result.meanings[0];
    const definition = meaning.definitions[0];

    meaningEl.textContent = definition.definition;

    const synonyms = definition.synonyms?.length
        ? definition.synonyms
        : meaning.synonyms;

    synonymsEl.textContent = synonyms?.length
        ? `Synonyms: ${synonyms.join(", ")}`
        : "No synonyms found";

    const audio = result.phonetics.find(p => p.audio);
    if (audio) {
        audioPlayer.src = audio.audio;
        audioPlayer.classList.remove("hidden");
    }
}


async function fetchWord(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error("Word not found");
    return res.json();
}


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const word = input.value.trim().toLowerCase();
    if (!word) return alert("Enter word");

    clearUI();
    meaningEl.textContent = "Loading...";

    try {
        const data = await fetchWord(word);
        displayData(data[0]);
    } catch (err) {
        clearUI();
        meaningEl.textContent = err.message;
        console.error(err);
    }
});


