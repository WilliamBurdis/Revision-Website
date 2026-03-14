const database = {
    eng: { 
        title: "English Eduqas Prep", 
        notes: `
            <h3>Eduqas Component 2: Practice</h3>
            <p><i>19th & 21st Century Non-Fiction</i></p>
            <div class="exam-box">
                <span class="exam-tag">Component 2 Q1</span>
                <b>Q (4 marks):</b> List four things you learn about the writer's attitude in lines 1-15.
            </div>
            <div class="exam-box">
                <span class="exam-tag">Component 2 Q3</span>
                <b>Q (10 marks):</b> Compare the writers' views on education in Text A and Text B.
            </div>
        `, 
        file: "english.md" 
    },
    math: { title: "Mathematics", notes: "Algebra, Number, and Geometry.", file: "maths.md" },
    sci: { 
        title: "Combined Science (Edexcel)", 
        notes: `
            <h3>Edexcel Exam Style Questions</h3>
            <div class="exam-box">
                <span class="exam-tag">Biology: 6-Marker</span>
                <b>Q:</b> Explain how the structure of a root hair cell is adapted to its function. (6 marks)
            </div>
            <div class="exam-box">
                <span class="exam-tag">Chemistry: 4-Marker</span>
                <b>Q:</b> Describe the test for chlorine gas and the observed result. (4 marks)
            </div>
            <div class="exam-box">
                <span class="exam-tag">Physics: 6-Marker</span>
                <b>Q:</b> Explain the difference between contamination and irradiation. (6 marks)
            </div>
        `, 
        file: "science.md" 
    },
    hist: { title: "History", notes: "Medicine Through Time, Weimar & Nazi Germany.", file: "history.md" },
    geo: { title: "Geography", notes: "Natural Hazards, Urban Issues, UK Landscapes.", file: "geography.md" },
    span: { title: "Spanish", notes: "Identity, Culture, Holidays, and Study.", file: "spanish.md" },
    dra: { title: "Drama", notes: "Blood Brothers, DNA, Live Theatre Review.", file: "drama.md" },
    art: { title: "Art", notes: "Portfolio, Artist Analysis, Media Skills.", file: "art.md" },
    mus: { title: "Music", notes: "Set Works, Dictation, Composition.", file: "music.md" },
    cs: { title: "Computer Science", notes: "Algorithms, Data Representation, Cyber Security.", file: "cs.md" },
    it: { title: "IT", notes: "User Interfaces, Spreadsheets, Digital Systems.", file: "it.md" },
    rs: { title: "RS", notes: "Christianity, Islam, Ethics & Relationships.", file: "rs.md" },
    food: { title: "Food & Nutrition", notes: "Nutrition, Food Safety, Science of Cooking.", file: "food.md" },
    biz: { title: "Business", notes: "Enterprise, Marketing, Finance, HR.", file: "business.md" },
    sport: { title: "Sport", notes: "Anatomy, Physiology, Fitness Training.", file: "sport.md" },
    cit: { title: "Citizenship", notes: "Democracy, Justice, Global Citizenship.", file: "citizenship.md" }
};

let allFlashcards = [];
let filteredCards = [];
let fIdx = 0;

function toggleTheme() { document.body.classList.toggle('dark'); }

function setTab(type) {
    document.getElementById('v-notes').classList.add('hidden');
    document.getElementById('v-flash').classList.add('hidden');
    document.getElementById('v-' + type).classList.remove('hidden');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('t-' + type).classList.add('active');
}

async function loadSubject(key) {
    const sub = database[key];
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
                currentTopic = clean.replace('#', '').replace(/-/g, '').trim().toUpperCase();
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
        document.getElementById('f-front').innerText = "Create " + sub.file + " on GitHub to see cards."; 
    }
}

function filterCards(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const isMatch = (category === 'ALL' && btn.innerText === 'All') || btn.innerText.toUpperCase() === category;
        btn.classList.toggle('active', isMatch);
    });
    filteredCards = (category === 'ALL') ? [...allFlashcards] : allFlashcards.filter(c => c.topic.includes(category));
    fIdx = 0;
    updateFlashcardUI();
}

function shuffleCurrentDeck() {
    if (filteredCards.length === 0) return;
    for (let i = filteredCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredCards[i], filteredCards[j]] = [filteredCards[j], filteredCards[i]];
    }
    fIdx = 0;
    updateFlashcardUI();
}

function updateFlashcardUI() {
    if (!filteredCards.length) {
        document.getElementById('f-front').innerText = "No cards found.";
        return;
    }
    document.getElementById('f-back-wrapper').style.display = 'none';
    document.getElementById('reveal-btn').innerText = "Show Answer";
    const card = filteredCards[fIdx];
    document.getElementById('f-topic').innerText = card.topic + " - QUESTION";
    document.getElementById('f-front').innerText = card.q;
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
