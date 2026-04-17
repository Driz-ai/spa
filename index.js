
const form = document.getElementById("form");
const input = document.getElementById("wordInput");

const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const audioPlayer = document.getElementById("audio-player");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

        const word = input.value.trim().toLowerCase();

        if (!word) {
            alert('Enter word');
            return;
        }

        wordEl.innerHTML = "";







        

        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error("Word not found");
        }

        const result = data[0];

        wordEl.textContent = result.word;

        const meaningData = result.meanings[0];
        const definition = meaningData.definitions[0];

        meaningEl.textContent = definition.definition;




        const synonymsEl = document.getElementById("synonyms");

        const synonyms = definition.synonyms || meaningData.synonyms;

        if (synonyms && synonyms.length > 0) {
            synonymsEl.textContent = "Synonyms: " + synonyms.join(", ");
        } else {
            synonymsEl.textContent = "No synonyms found";
        }




        const audio = result.phonetics.find(p => p.audio && p.audio !== "");

        if (audio) {
            audioPlayer.src = audio.audio;
            audioPlayer.classList.remove("hidden");
        } else {
            audioPlayer.classList.add("hidden");
        }

    } catch (error) {
        console.error('ERROR:', error);
    }
}); 
