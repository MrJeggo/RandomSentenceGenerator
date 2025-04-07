let adjectives = [];
let animals = [];
let verbs = [];

async function loadWords(url) {
  const res = await fetch(url);
  const text = await res.text();
  return text.split('\n').map(word => word.trim()).filter(Boolean);
}

async function initialize() {
  adjectives = await loadWords('https://gist.githubusercontent.com/hugsy/8910dc78d208e40de42deb29e62df913/raw/eec99c5597a73f6a9240cab26965a8609fa0f6ea/english-adjectives.txt');
  animals = await loadWords('https://raw.githubusercontent.com/sroberts/wordlists/refs/heads/master/animals.txt');
  verbs = await loadWords('https://raw.githubusercontent.com/aaronbassett/Pass-phrase/refs/heads/master/verbs.txt');
  generateSentence(); // generate one on load
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSentence() {
  if (adjectives.length === 0 || animals.length === 0 || verbs.length === 0) {
    document.getElementById("sentence").textContent = "Loading words...";
    return;
  }

  const adj1 = getRandom(adjectives);
  const animal1 = getRandom(animals);
  const verb = getRandom(verbs);
  const adj2 = getRandom(adjectives);
  const animal2 = getRandom(animals);

  const sentence = `A ${adj1} ${animal1} ${verb} a ${adj2} ${animal2}.`;
  document.getElementById("sentence").textContent = sentence;
}

initialize();
