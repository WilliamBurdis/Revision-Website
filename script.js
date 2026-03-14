const database = {
    eng: {
        title: "English: Complete Suite",
        notes: `<h3>Literature Overview</h3>
                <ul>
                    <li><b>Macbeth:</b> Regicide and the Supernatural.</li>
                    <li><b>A Christmas Carol:</b> The ghost of Malthusian economics.</li>
                    <li><b>An Inspector Calls:</b> Collective responsibility.</li>
                </ul>
                <h3>Language Skills</h3>
                <p>Focus on <i>Structural Shifts</i> for Paper 1 Question 3.</p>`,
        questions: [
            { q: "What is an 'Iambic Pentameter'?", o: ["5 beats per line", "A type of rhyme", "A sad poem"], c: 0 },
            { q: "Who is the primary antagonist in Macbeth?", o: ["Banquo", "Macbeth himself", "The Porter"], c: 1 },
            { q: "What does 'Sibilance' repeat?", o: ["Vowel sounds", "S sounds", "Plosive sounds"], c: 1 }
        ]
    },
    math: {
        title: "Mathematics: Mastery Bank",
        notes: "Algebra, Geometry, and Ratio focus.",
        questions: [
            { q: "Solve 4x + 10 = 30", o: ["x=5", "x=10", "x=4"], c: 0 },
            { q: "Square root of 169?", o: ["12", "13", "14"], c: 1 },
            { q: "Area of a triangle (Base 6, Height 10)?", o: ["60", "30", "15"], c: 1 },
            { q: "Percentage increase: 50 to 60?", o: ["10%", "20%", "25%"], c: 1 },
            { q: "How many sides in a Nonagon?", o: ["7", "9", "11"], c: 1 },
            { q: "Simplify x^5 / x^2", o: ["x^7", "x^3", "x^2.5"], c: 1 },
            { q: "What is 0.04 as a fraction?", o: ["1/4", "1/25", "1/40"], c: 1 },
            { q: "Interior angles of a hexagon sum to?", o: ["720°", "540°", "360°"], c: 0 }
        ]
    }
};

let currentKey = "";
let qIndex = 0;

function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    document.getElementById('theme-toggle').innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function openSubject(key) {
    currentKey = key;
    qIndex = 0;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('study-screen').classList.remove('hidden');
    document.getElementById('subject-title').innerText = database[key].title;
    document.getElementById('note-body').innerHTML = database[key].notes;
    switchTab('notes');
    loadQuestion();
}

function goHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('study-screen').classList.add('hidden');
}

function switchTab(type) {
    document.getElementById('view-notes').classList.toggle('hidden', type !== 'notes');
    document.getElementById('view-quiz').classList.toggle('hidden', type !== 'quiz');
    document.getElementById('tab-notes').classList.toggle('active', type === 'notes');
    document.getElementById('tab-quiz').classList.toggle('active', type === 'quiz');
}

function loadQuestion() {
    const data = database[currentKey].questions[qIndex];
    document.getElementById('question-text').innerText = data.q;
    document.getElementById('feedback-text').innerText = "";
    document.getElementById('next-btn').classList.add('hidden');
    
    const container = document.getElementById('options-container');
    container.innerHTML = "";
    
    data.o.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = "quiz-opt";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i);
        container.appendChild(btn);
    });
}

function checkAnswer(choice) {
    const correct = database[currentKey].questions[qIndex].c;
    const feedback = document.getElementById('feedback-text');
    document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
    
    if(choice === correct) {
        feedback.innerHTML = "<span style='color:#27ae60'>✔ Correct!</span>";
    } else {
        feedback.innerHTML = "<span style='color:#e74c3c'>✘ Incorrect.</span>";
    }
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    qIndex++;
    if(qIndex < database[currentKey].questions.length) {
        loadQuestion();
    } else {
        document.getElementById('view-quiz').innerHTML = "<h2>Subject Mastered!</h2><button class='primary-btn' onclick='goHome()'>Dashboard</button>";
    }
}
