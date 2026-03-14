const database = {
    eng: { title: "English Literature", notes: "Macbeth, AIC, and Christmas Carol focus.", questions: [{q:"Who kills Macbeth?", o:["Macduff","Duncan"], c:0}], file: "english.md" },
    math: { title: "Mathematics", notes: "Algebra, Number, and Geometry.", questions: [{q:"2x = 20", o:["x=10","x=5"], c:0}], file: "maths.md" }
};

let currentKey = "";
let qIdx = 0;
let flashcards = [];
let fIdx = 0;

function toggleTheme() { document.body.classList.toggle('dark'); }

function loadSubject(key) {
    currentKey = key;
    qIdx = 0; 
    fIdx = 0;
    document.getElementById('home').classList.add('hidden');
    document.getElementById('study').classList.remove('hidden');
    document.getElementById('sub-title').innerText = database[key].title;
    document.getElementById('note-body').innerHTML = database[key].notes;
    setTab('notes');
    loadFlashcards(database[key].file);
}

function goHome() {
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('study').classList.add('hidden');
}

function setTab(type) {
    document.getElementById('v-notes').classList.toggle('hidden', type !== 'notes');
    document.getElementById('v-quiz').classList.toggle('hidden', type !== 'quiz');
    document.getElementById('v-flash').classList.toggle('hidden', type !== 'flash');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('t-' + type).classList.add('active');
}

// --- FIXED FLASHCARD LOGIC ---
async function loadFlashcards(file) {
    try {
        console.log("Fetching file:", file);
        const res = await fetch(file);
        if (!res.ok) throw new Error("Could not find " + file);
        
        const text = await res.text();
        flashcards = [];
        
        // Split by new line and clean up whitespace
        const lines = text.split(/\r?\n/);
        let currentQ = "";

        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('Q:')) {
                currentQ = trimmed.replace('Q:', '').trim();
            } else if (trimmed.startsWith('A:') && currentQ) {
                flashcards.push({
                    q: currentQ,
                    a: trimmed.replace('A:', '').trim()
                });
                currentQ = ""; // Reset
            }
        });

        console.log("Loaded cards:", flashcards.length);
        
        if (flashcards.length > 0) {
            showFlashcard();
        } else {
            document.getElementById('f-front').innerText = "No cards found in " + file;
        }
    } catch(e) { 
        console.error("Flashcard Error:", e);
        document.getElementById('f-front').innerText = "Error loading cards. Check console.";
    }
}

function showFlashcard() {
    if(!flashcards.length) return;
    
    // Hide answer and reset button
    document.getElementById('f-back-wrapper').style.display = 'none';
    document.getElementById('reveal-btn').innerText = "Show Answer";
    
    // Fill text
    document.getElementById('f-front').innerText = flashcards[fIdx].q;
    document.getElementById('f-back').innerText = flashcards[fIdx].a;
}

function toggleAnswer() {
    const w = document.getElementById('f-back-wrapper');
    const b = document.getElementById('reveal-btn');
    const isHidden = w.style.display === 'none';
    w.style.display = isHidden ? 'block' : 'none';
    b.innerText = isHidden ? "Hide Answer" : "Show Answer";
}

function handleNextCard() {
    if(!flashcards.length) return;
    fIdx = (fIdx + 1) % flashcards.length;
    showFlashcard();
}
