const database = {
    eng: { title: "English Literature", notes: "Macbeth, AIC, and Christmas Carol.", file: "english.md" },
    math: { title: "Mathematics", notes: "Algebra, Number, and Geometry.", file: "maths.md" }
};

let flashcards = [];
let fIdx = 0;

function toggleTheme() { 
    document.body.classList.toggle('dark'); 
}

// THIS RUNS WHEN YOU CLICK ENGLISH OR MATHS
async function loadSubject(key) {
    const sub = database[key];
    if(!sub) return;

    // 1. Reset counters
    fIdx = 0;
    flashcards = [];

    // 2. Update UI labels
    document.getElementById('home').classList.add('hidden');
    document.getElementById('study').classList.remove('hidden');
    document.getElementById('sub-title').innerText = sub.title;
    document.getElementById('note-body').innerHTML = sub.notes;

    // 3. Switch to Notes tab by default
    setTab('notes');

    // 4. Fetch the cards
    try {
        const res = await fetch(sub.file);
        const text = await res.text();
        
        const lines = text.split(/\r?\n/);
        let currentQ = "";

        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('Q:')) {
                currentQ = trimmed.replace('Q:', '').trim();
            } else if (trimmed.startsWith('A:') && currentQ) {
                flashcards.push({ q: currentQ, a: trimmed.replace('A:', '').trim() });
                currentQ = "";
            }
        });

        if (flashcards.length > 0) {
            showFlashcard();
        } else {
            document.getElementById('f-front').innerText = "No cards found in " + sub.file;
        }
    } catch (e) {
        document.getElementById('f-front').innerText = "Error loading " + sub.file;
    }
}

function goHome() {
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('study').classList.add('hidden');
}

function setTab(type) {
    document.getElementById('v-notes').classList.toggle('hidden', type !== 'notes');
    document.getElementById('v-flash').classList.toggle('hidden', type !== 'flash');
    
    // Update button colors
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('t-' + type).classList.add('active');
}

function showFlashcard() {
    if (flashcards.length === 0) return;
    
    document.getElementById('f-back-wrapper').style.display = 'none';
    document.getElementById('reveal-btn').innerText = "Show Answer";
    
    document.getElementById('f-front').innerText = flashcards[fIdx].q;
    document.getElementById('f-back').innerText = flashcards[fIdx].a;
}

function toggleAnswer() {
    const w = document.getElementById('f-back-wrapper');
    const b = document.getElementById('reveal-btn');
    if (w.style.display === 'none') {
        w.style.display = 'block';
        b.innerText = "Hide Answer";
    } else {
        w.style.display = 'none';
        b.innerText = "Show Answer";
    }
}

function handleNextCard() {
    if (flashcards.length === 0) return;
    fIdx = (fIdx + 1) % flashcards.length;
    showFlashcard();
}
