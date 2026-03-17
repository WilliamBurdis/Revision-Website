const database = {
    eng: { title: "English Eduqas", notes: "<h3>Notes</h3><p>Focus on comparison.</p><hr><h3>Exam Questions</h3><div class='exam-box'><b>Q:</b> Compare attitudes in Text A and B.</div>", file: "english.md" },
    math: { title: "Mathematics", notes: "<h3>Notes</h3><p>Algebra and Geometry.</p><hr><h3>Exam Questions</h3><div class='exam-box'><b>Q:</b> Solve for X.</div>", file: "maths.md" },
    sci: { title: "Combined Science", notes: "<h3>Notes</h3><p>Edexcel Combined.</p><hr><h3>Exam Questions</h3><div class='exam-box'><b>Q:</b> Test for Chlorine.</div>", file: "science.md" },
    hist: { 
        title: "OCR B History Suite", 
        notes: `
            <div class="history-container">
                <section><h3>🏷️ Nazis</h3><div class='exam-box'><b>Q:</b> Nazi appeal 1929?</div></section>
                <section><h3>🏰 History Around Us</h3><div class='exam-box'><b>Q:</b> Site remains?</div></section>
                <section><h3>🛡️ Vikings</h3><div class='exam-box'><b>Q:</b> Viking motivations?</div></section>
                <section><h3>⚔️ Normans</h3><div class='exam-box'><b>Q:</b> Castle control?</div></section>
                <section><h3>⚖️ Crime & Punishment</h3><div class='exam-box'><b>Q:</b> 1500-1900 changes?</div></section>
            </div>`, 
        file: "history.md" 
    },
    geo: { title: "Geography", notes: "Notes here.", file: "geo.md" },
    span: { title: "Spanish", notes: "Notes here.", file: "span.md" },
    dra: { title: "Drama", notes: "Notes here.", file: "dra.md" },
    art: { title: "Art", notes: "Notes here.", file: "art.md" },
    mus: { title: "Music", notes: "Notes here.", file: "mus.md" },
    cs: { title: "Comp Sci", notes: "Notes here.", file: "cs.md" },
    it: { title: "IT", notes: "Notes here.", file: "it.md" },
    rs: { title: "RS", notes: "Notes here.", file: "rs.md" },
    food: { title: "Food Tech", notes: "Notes here.", file: "food.md" },
    biz: { title: "Business", notes: "Notes here.", file: "biz.md" },
    sport: { title: "Sport", notes: "Notes here.", file: "sport.md" },
    cit: { title: "Citizenship", notes: "Notes here.", file: "cit.md" }
};

let allFlashcards = [];
let filteredCards = [];
let fIdx = 0;

function toggleTheme() { document.body.classList.toggle('dark'); }

function goHome() {
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('study').classList.add('hidden');
}

function setTab(type) {
    document.getElementById('v-notes').classList.add('hidden');
    document.getElementById('v-flash').classList.add('hidden');
    document.getElementById('v-' + type).classList.remove('hidden');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('t-' + type).classList.add('active');
}

function getRagStatus(cardQ) {
    const saved = localStorage.getItem('gradeforge_rag');
    const ragData = saved ? JSON.parse(saved) : {};
    return ragData[cardQ] || 'none';
}

function rateCard(color) {
    if (!filteredCards.length) return;
    const card = filteredCards[fIdx];
    const saved = localStorage.getItem('gradeforge_rag');
    const ragData = saved ? JSON.parse(saved) : {};
    ragData[card.q] = color;
    localStorage.setItem('gradeforge_rag', JSON.stringify(ragData));
    updateFlashcardUI();
}

function resetAllRatings() {
    if (confirm("Reset all color ratings?")) {
        localStorage.removeItem('gradeforge_rag');
        updateFlashcardUI();
    }
}

function filterByRag(color) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filteredCards = allFlashcards.filter(card => getRagStatus(card.q) === color);
    fIdx = 0;
    updateFlashcardUI();
}

function filterCards(type) {
    if (type === 'ALL') {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('btn-all').classList.add('active');
        filteredCards = [...allFlashcards];
        fIdx = 0;
        updateFlashcardUI();
    }
}

async function loadSubject(key) {
    const sub = database[key];
    if (!sub) return;
    document.getElementById('home').classList.add('hidden');
    document.getElementById('study').classList.remove('hidden');
    document.getElementById('sub-title').innerText = sub.title;
    document.getElementById('note-body').innerHTML = sub.notes;
    fIdx = 0;
    allFlashcards = [];
    setTab('notes');
    try {
        const res = await fetch(sub.file);
        const text = await res.text();
        const lines = text.split('\n');
        let topic = "General";
        let tempQ = "";
        lines.forEach(line => {
            if (line.trim().startsWith('#')) topic = line.replace('#','').trim();
            else if (line.trim().startsWith('Q:')) tempQ = line.replace('Q:','').trim();
            else if (line.trim().startsWith('A:') && tempQ) {
                allFlashcards.push({ q: tempQ, a: line.replace('A:','').trim(), topic: topic });
                tempQ = "";
            }
        });
        filteredCards = [...allFlashcards];
        updateFlashcardUI();
    } catch (e) { console.log("File error"); }
}

function updateFlashcardUI() {
    const container = document.getElementById('f-card-container');
    if (!filteredCards.length) {
        document.getElementById('f-front').innerText = "No cards found.";
        container.style.borderBottomColor = "#ccc";
        return;
    }
    document.getElementById('f-back-wrapper').style.display = 'none';
    const card = filteredCards[fIdx];
    const status = getRagStatus(card.q);
    const colors = { 'red': '#e74c3c', 'amber': '#f39c12', 'green': '#27ae60', 'none': '#ccc' };
    container.style.borderBottomColor = colors[status];
    document.getElementById('f-topic').innerText = card.topic;
    document.getElementById('f-front').innerText = card.q;
    document.getElementById('f-back').innerText = card.a;
}

function toggleAnswer() {
    const w = document.getElementById('f-back-wrapper');
    w.style.display = (w.style.display === 'none') ? 'block' : 'none';
}

function handleNextCard() {
    if (filteredCards.length > 0) {
        fIdx = (fIdx + 1) % filteredCards.length;
        updateFlashcardUI();
    }
}
