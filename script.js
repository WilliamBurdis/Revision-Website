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
    qIdx = 0; fIdx = 0;
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

// QUIZ LOGIC
function renderQuestion() {
    const q = database[currentKey].questions[qIdx];
    document.getElementById('q-text').innerText = q.q;
    const container = document.getElementById('q-options');
    container.innerHTML = "";
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

// FLASHCARD LOGIC
async function loadFlashcards(file) {
    try {
        const res = await fetch(file);
        const text = await res.text();
        flashcards = [];
        let lines = text.split('\n');
        let tempQ = "";
        lines.forEach(l => {
            if(l.startsWith('Q:')) tempQ = l.replace('Q:', '').trim();
            if(l.startsWith('A:')) flashcards.push({q: tempQ, a: l.replace('A:', '').trim()});
        });
        showFlashcard();
    } catch(e) { console.log("MD file not found"); }
}

function showFlashcard() {
    if(!flashcards.length) return;
    document.getElementById('card').classList.remove('flipped');
    document.getElementById('f-front').innerText = flashcards[fIdx].q;
    document.getElementById('f-back').innerText = flashcards[fIdx].a;
}

function flipCard() { document.getElementById('card').classList.toggle('flipped'); }
function nextFlashcard() { fIdx = (fIdx + 1) % flashcards.length; showFlashcard(); }
