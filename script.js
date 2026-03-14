const database = {
    eng: {
        title: "English Suite",
        notes: "Focus on Macbeth and Language techniques.",
        questions: [{ q: "Who kills Macbeth?", o: ["Macduff", "Duncan"], c: 0 }],
        file: "english.md"
    },
    math: {
        title: "Mathematics",
        notes: "Practice your Algebra and Shapes.",
        questions: [{ q: "Solve 2x = 10", o: ["x=5", "x=2"], c: 0 }],
        file: "maths.md"
    }
};

let currentKey = "";
let qIdx = 0;
let flashcards = [];
let fIdx = 0;

function toggleTheme() {
    document.body.classList.toggle('dark');
}

function loadSubject(key) {
    currentKey = key;
    qIdx = 0; 
    fIdx = 0; // Reset flashcard counter to 0
    document.getElementById('home').classList.add('hidden');
    document.getElementById('study').classList.remove('hidden');
    document.getElementById('sub-title').innerText = database[key].title;
    document.getElementById('note-body').innerHTML = database[key].notes;
    setTab('notes');
    renderQuestion();
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

// --- QUIZ LOGIC ---
function renderQuestion() {
    const q = database[currentKey].questions[qIdx];
    document.getElementById('q-text').innerText = q.q;
    const container = document.getElementById('q-options');
    container.innerHTML = "";
    document.getElementById('q-feedback').innerText = ""; // Clear old feedback
    q.o.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = "quiz-opt"; b.innerText = opt;
        b.onclick = () => {
            document.getElementById('q-feedback').innerText = (i === q.c) ? "✅ Correct!" : "❌ Try again";
            document.getElementById('next-btn').classList.remove('hidden');
        };
        container.appendChild(b);
    });
}

function nextQuestion() {
    qIdx = (qIdx + 1) % database[currentKey].questions.length;
    renderQuestion();
}

// --- FLASHCARD LOGIC (FIXED) ---
async function loadFlashcards(file) {
    try {
        const res = await fetch(file);
        const text = await res.text();
        flashcards = [];
        let lines = text.split('\n');
        let tempQ = "";
        
        lines.forEach(l => {
            let line = l.trim();
            if(line.startsWith('Q:')) tempQ = line.replace('Q:', '').trim();
            if(line.startsWith('A:') && tempQ) {
                flashcards.push({q: tempQ, a: line.replace('A:', '').trim()});
                tempQ = ""; // Clear temp after pair is found
            }
        });

        if(flashcards.length > 0) {
            fIdx = 0; // Ensure we start at the first card
            showFlashcard();
        }
    } catch(e) { 
        console.log("Error loading MD file:", e); 
    }
}

function showFlashcard() {
    if(flashcards.length === 0) return;
    
    // 1. Un-flip the card first so you don't see the next answer early
    document.getElementById('card').classList.remove('flipped');
    
    // 2. Wait a split second for the flip animation, then change the text
    setTimeout(() => {
        document.getElementById('f-front').innerText = flashcards[fIdx].q;
        document.getElementById('f-back').innerText = flashcards[fIdx].a;
    }, 150);
}

function flipCard() { 
    if(flashcards.length > 0) {
        document.getElementById('card').classList.toggle('flipped'); 
    }
}

function nextFlashcard() { 
    if(flashcards.length === 0) return;
    fIdx = (fIdx + 1) % flashcards.length; // Moves to next or loops to start
    showFlashcard();
}
