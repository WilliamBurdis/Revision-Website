const database = {
    eng: { 
        title: "English Eduqas", 
        notes: `<h3>Notes</h3><p>Focus on Comparison skills.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Compare the writers' attitudes in Text A and B.</div>`, 
        file: "english.md" 
    },
    math: { 
        title: "Mathematics", 
        notes: `<h3>Notes</h3><p>Algebra and Geometry.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Solve $3x + y = 13$ and $x - y = 3$.</div>`, 
        file: "maths.md" 
    },
    sci: { 
        title: "Combined Science", 
        notes: `<h3>Notes</h3><p>Edexcel Combined Science.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Explain the test for chlorine gas.</div>`, 
        file: "science.md" 
    },
    hist: { 
        title: "OCR B History Suite", 
        notes: `
            <div class="history-container">
                <section><h3>🏷️ Nazis</h3><div class="exam-box"><b>Q:</b> Why did Nazis have limited appeal before 1929?</div></section>
                <section><h3>🏰 History Around Us</h3><div class="exam-box"><b>Q:</b> How do remains reveal site importance?</div></section>
                <section><h3>🛡️ Vikings</h3><div class="exam-box"><b>Q:</b> Were Viking raids only for wealth?</div></section>
                <section><h3>⚔️ Normans</h3><div class="exam-box"><b>Q:</b> How did castles help control England?</div></section>
                <section><h3>⚖️ Crime and Punishment</h3><div class="exam-box"><b>Q:</b> How did punishment change 1500-1900?</div></section>
            </div>`, 
        file: "history.md" 
    },
    geo: { title: "Geography", notes: "<h3>Notes</h3><p>Tectonics.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Assess hazard responses.</div>", file: "geography.md" },
    span: { title: "Spanish", notes: "<h3>Notes</h3><p>Tenses.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Task:</b> Describe a holiday.</div>", file: "spanish.md" },
    dra: { title: "Drama", notes: "<h3>Notes</h3><p>Blood Brothers.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Describe Mickey's costume.</div>", file: "drama.md" },
    art: { title: "Art", notes: "<h3>Notes</h3><p>Analysis.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Task:</b> Annotate portfolio.</div>", file: "art.md" },
    mus: { title: "Music", notes: "<h3>Notes</h3><p>Set Works.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Identify tempo.</div>", file: "music.md" },
    cs: { title: "Comp Sci", notes: "<h3>Notes</h3><p>Binary.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Convert 12 to Binary.</div>", file: "cs.md" },
    it: { title: "IT", notes: "<h3>Notes</h3><p>UIs.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Discuss accessibility.</div>", file: "it.md" },
    rs: { title: "RS", notes: "<h3>Notes</h3><p>Ethics.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Evaluate war ethics.</div>", file: "rs.md" },
    food: { title: "Food Tech", notes: "<h3>Notes</h3><p>Nutrition.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Define denaturation.</div>", file: "food.md" },
    biz: { title: "Business", notes: "<h3>Notes</h3><p>Finance.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Calculate profit.</div>", file: "business.md" },
    sport: { title: "Sport", notes: "<h3>Notes</h3><p>Anatomy.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Define aerobic.</div>", file: "sport.md" },
    cit: { title: "Citizenship", notes: "<h3>Notes</h3><p>Politics.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Define democracy.</div>", file: "citizenship.md" }
};

let allFlashcards = [];
let filteredCards = [];
let fIdx = 0;

function toggleTheme() { document.body.classList.toggle('dark'); }

function setTab(type) {
    const notesView = document.getElementById('v-notes');
    const flashView = document.getElementById('v-flash');
    if(!notesView || !flashView) return;

    notesView.classList.add('hidden');
    flashView.classList.add('hidden');
    document.getElementById('v-' + type).classList.remove('hidden');
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('t-' + type).classList.add('active');
}

async function loadSubject(key) {
    const sub = database[key];
    if (!sub) return;

    document.getElementById('home').classList.add('hidden');
    document.getElementById('study').classList.remove('hidden');
    document.getElementById('sub-title').innerText = sub.title;
    document.getElementById('note-body').innerHTML = sub.notes;

    const filterUI = document.getElementById('flash-filters');
    key === 'sci' ? filterUI.classList.remove('hidden') : filterUI.classList.add('hidden');

    fIdx = 0;
    allFlashcards = [];
    setTab('notes');

    try {
        const res = await fetch(sub.file);
        const text = await res.text();
        const lines = text.split(/\r?\n/);
        let currentTopic = "GENERAL";
        let tempQ = "";

        lines.forEach(line => {
            const clean = line.trim();
            if (clean.startsWith('#')) {
                currentTopic = clean.replace('#', '').trim().toUpperCase();
            } else if (clean.startsWith('Q:')) {
                tempQ = clean.replace('Q:', '').trim();
            } else if (clean.startsWith('A:') && tempQ) {
                allFlashcards.push({ q: tempQ, a: clean.replace('A:', '').trim(), topic: currentTopic });
                tempQ = "";
            }
        });
        filteredCards = [...allFlashcards];
        updateFlashcardUI();
    } catch (e) { 
        console.log("No markdown file found for " + key);
    }
}

function updateFlashcardUI() {
    const front = document.getElementById('f-front');
    if (!front) return;
    
    if (!filteredCards.length) {
        front.innerText = "No cards found.";
        document.getElementById('f-back-wrapper').style.display = 'none';
        return;
    }
    document.getElementById('f-back-wrapper').style.display = 'none';
    document.getElementById('reveal-btn').innerText = "Show Answer";
    const card = filteredCards[fIdx];
    document.getElementById('f-topic').innerText = card.topic + " - QUESTION";
    front.innerText = card.q;
    document.getElementById('f-back').innerText = card.a;
}

function toggleAnswer() {
    const w = document.getElementById('f-back-wrapper');
    const b = document.getElementById('reveal-btn');
    const isHidden = w.style.display === 'none';
    w.style.display = isHidden ? 'block' : 'none';
    b.innerText = isHidden ? "Hide Answer" : "Show Answer";
}

function handleNextCard() {
    if (!filteredCards.length) return;
    fIdx = (fIdx + 1) % filteredCards.length;
    updateFlashcardUI();
}

function goHome() {
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('study').classList.add('hidden');
}
