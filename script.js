const database = {
    eng: { title: "English Literature", notes: "Macbeth, AIC, and Christmas Carol.", file: "english.md" },
    math: { title: "Mathematics", notes: "Algebra, Number, and Geometry.", file: "maths.md" }
};

let flashcards = [];
let fIdx = 0;

function toggleTheme() {
    document.body.classList.toggle('dark');
}

function setTab(type) {
    // Hide all views
    document.getElementById('v-notes').classList.add('hidden');
    document.getElementById('v-flash').classList.add('hidden');
    
    // Show selected view
    document.getElementById('v-' + type).classList.remove('hidden');
    
    // Update button colors
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('t-' + type).classList.add('active');
}

async function loadSubject(key) {
    const sub = database[key];
    
    // Update UI Labels
    document.getElementById('home').classList.add('hidden');
    document.getElementById('study').classList.remove('hidden');
    document.getElementById('sub-title').innerText = sub.title;
    document.getElementById('note-body').innerHTML = sub.notes;

    // Reset Counters
    fIdx = 0;
    flashcards = [];
    setTab('notes');

    // Fetch Cards
    try {
        const response = await fetch(sub.file);
        const text = await response.text();
        
        const lines = text.split(/\r?\n/);
        let tempQ = "";

        lines.forEach(line => {
            const cleanLine = line.trim();
            if (cleanLine.startsWith('Q:')) {
                tempQ = cleanLine.replace('Q:', '').trim();
            } else if (cleanLine.startsWith('A:') && tempQ) {
                flashcards.push({ q: tempQ, a: cleanLine.replace('A:', '').trim() });
                tempQ = "";
            }
        });

        if (flashcards.length > 0) {
            updateFlashcardUI();
        } else {
            document.getElementById('f-front').innerText = "No cards found in " + sub.file;
        }
    } catch (error) {
        document.getElementById('f-front').innerText = "Error: Could not find " + sub.file;
    }
}

function updateFlashcardUI() {
    if (flashcards.length === 0) return;
    
    // Reset Display
    document.getElementById('f-back-wrapper').style.display = 'none';
    document.getElementById('reveal-btn').innerText = "Show Answer";
    
    // Inject Text
    document.getElementById('f-front').innerText = flashcards[fIdx].q;
    document.getElementById('f-back').innerText = flashcards[fIdx].a;
}

function toggleAnswer() {
    const wrapper = document.getElementById('f-back-wrapper');
    const btn = document.getElementById('reveal-btn');
    
    if (wrapper.style.display === 'none') {
        wrapper.style.display = 'block';
        btn.innerText = "Hide Answer";
    } else {
        wrapper.style.display = 'none';
        btn.innerText = "Show Answer";
    }
}

function handleNextCard() {
    if (flashcards.length === 0) return;
    fIdx = (fIdx + 1) % flashcards.length;
    updateFlashcardUI();
}

function goHome() {
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('study').classList.add('hidden');
}
