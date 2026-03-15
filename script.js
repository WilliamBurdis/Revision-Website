const database = {
    eng: { 
        title: "English Eduqas", 
        notes: `<h3>Notes</h3><p>Focus on 19th/21st Century Comparison.</p>
                <h3>Exam Prep</h3>
                <div class="exam-box"><span class="exam-tag">10-Marker</span><b>Q:</b> Compare how the writers convey their childhood experiences.</div>`, 
        file: "english.md" 
    },
    math: { 
        title: "Mathematics", 
        notes: `<h3>Notes</h3><p>Algebra, Ratio, and Geometry fundamentals.</p>
                <h3>Exam Prep</h3>
                <div class="exam-box"><span class="exam-tag">Calculation</span><b>Q:</b> Solve $2x^2 + 5x - 3 = 0$ using the quadratic formula.</div>`, 
        file: "maths.md" 
    },
    sci: { 
        title: "Combined Science", 
        notes: `<h3>Notes</h3><p>Edexcel Bio, Chem, Phys specifications.</p>
                <h3>Exam Prep</h3>
                <div class="exam-box"><span class="exam-tag">6-Marker</span><b>Q:</b> Explain the process of fractional distillation in crude oil.</div>`, 
        file: "science.md" 
    },
    hist: { 
        title: "OCR B History Suite", 
        notes: `
            <div class="history-container">
                <section>
                    <h3>🏷️ Nazis: The Rise and Rule</h3>
                    <p>Focus: Impact of the Depression, Enabling Act, and Gleichschaltung.</p>
                    <div class="exam-box"><span class="exam-tag">7-Marker</span><b>Q:</b> Explain why the Nazi party had limited appeal before 1929.</div>
                </section>
                <section>
                    <h3>🏰 History Around Us</h3>
                    <p>Focus: Site analysis, physical remains, and historical significance.</p>
                    <div class="exam-box"><span class="exam-tag">20-Marker</span><b>Q:</b> How far do the remains of your site reveal its importance?</div>
                </section>
                <section>
                    <h3>🛡️ Vikings: Expansion</h3>
                    <p>Focus: Reasons for raids, Danelaw, and Alfred the Great.</p>
                    <div class="exam-box"><span class="exam-tag">18-Marker</span><b>Q:</b> 'Viking raids were motivated only by wealth.' Discuss.</div>
                </section>
                <section>
                    <h3>⚔️ Normans: Conquest</h3>
                    <p>Focus: Hastings, The Feudal System, and the Domesday Book.</p>
                    <div class="exam-box"><span class="exam-tag">9-Marker</span><b>Q:</b> Explain how the Normans used castles to control England.</div>
                </section>
                <section>
                    <h3>⚖️ Crime and Punishment</h3>
                    <p>Focus: The Bloody Code, Law Enforcement, and Prison Reform.</p>
                    <div class="exam-box"><span class="exam-tag">18-Marker</span><b>Q:</b> How far did punishment change between 1500 and 1900?</div>
                </section>
            </div>
        `, 
        file: "history.md" 
    },
    geo: { 
        title: "Geography", 
        notes: `<h3>Notes</h3><p>Physical and Human Geography.</p>
                <h3>Exam Prep</h3>
                <div class="exam-box"><span class="exam-tag">8-Marker</span><b>Q:</b> Assess the effectiveness of responses to a tectonic hazard.</div>`, 
        file: "geography.md" 
    },
    span: { 
        title: "Spanish", 
        notes: `<h3>Notes</h3><p>Tenses and Identity/Culture vocab.</p>
                <h3>Exam Prep</h3>
                <div class="exam-box"><span class="exam-tag">Writing</span><b>Task:</b> Describe your last holiday using three tenses.</div>`, 
        file: "spanish.md" 
    },
    dra: { 
        title: "Drama", 
        notes: `<h3>Notes</h3><p>Performance and Design elements.</p>
                <h3>Exam Prep</h3>
                <div class="exam-box"><span class="exam-tag">Design</span><b>Q:</b> Describe your costume ideas for Mickey in Blood Brothers.</div>`, 
        file: "drama.md" 
    },
    art: { title: "Art", notes: `<h3>Notes</h3><p>Portfolio and Analysis.</p><h3>Exam Prep</h3><div class="exam-box"><span class="exam-tag">Analysis</span><b>Task:</b> Explain artist influence.</div>`, file: "art.md" },
    mus: { title: "Music", notes: `<h3>Notes</h3><p>Theory & Set Works.</p><h3>Exam Prep</h3><div class="exam-box"><span class="exam-tag">Theory</span><b>Q:</b> Identify Baroque features.</div>`, file: "music.md" },
    cs: { title: "Comp Sci", notes: `<h3>Notes</h3><p>Algorithms & Systems.</p><h3>Exam Prep</h3><div class="exam-box"><span class="exam-tag">Coding</span><b>Q:</b> Write a Binary Search.</div>`, file: "cs.md" },
    it: { title: "IT", notes: `<h3>Notes</h3><p>Apps & Systems.</p><h3>Exam Prep</h3><div class="exam-box"><span class="exam-tag">UX</span><b>Q:</b> Discuss accessibility.</div>`, file: "it.md" },
    rs: { title: "RS", notes: `<h3>Notes</h3><p>Ethics & Religion.</p><h3>Exam Prep</h3><div class="exam-box"><span class="exam-tag">12-Marker</span><b>Q:</b> Evaluate war ethics.</div>`, file: "rs.md" },
    food: { title: "Food Tech", notes: `<h3>Notes</h3><p>Nutrition & Prep.</p><h3>Exam Prep</h3><div class="exam-box"><span class="exam-tag">Science</span><b>Q:</b> Explain gluten function.</div>`, file: "food.md" },
    biz: { title: "Business", notes: `<h3>Notes</h3><p>Marketing & Finance.</p><h3>Exam Prep</h3><div class="exam-box"><span class="exam-tag">Finance</span><b>Q:</b> Calculate Break-even.</div>`, file: "business.md" },
    sport: { title: "Sport", notes: `<h3>Notes</h3><p>Anatomy & Fitness.</p><h3>Exam Prep</h3><div class="exam-box"><span class="exam-tag">Anatomy</span><b>Q:</b> Describe the respiratory pathway.</div>`, file: "sport.md" },
    cit: { title: "Citizenship", notes: `<h3>Notes</h3><p>Law & Politics.</p><h3>Exam Prep</h3><div class="exam-box"><span class="exam-tag">Politics</span><b>Q:</b> Role of House of Lords.</div>`, file: "citizenship.md" }
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
