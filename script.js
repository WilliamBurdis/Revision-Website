const database = {
    eng: { 
        title: "English Eduqas", 
        notes: `<h3>Subject Notes</h3><p>Focus on 19th and 21st Century Non-Fiction.</p>
                <hr>
                <h3>Exam Questions</h3>
                <div class="exam-box"><span class="exam-tag">Component 2</span><b>Q:</b> Compare how the writers convey their attitudes toward the city. (10 marks)</div>`, 
        file: "english.md" 
    },
    math: { 
        title: "Mathematics", 
        notes: `<h3>Subject Notes</h3><p>Practice Algebra, Geometry, and Statistics.</p>
                <hr>
                <h3>Exam Questions</h3>
                <div class="exam-box"><span class="exam-tag">Algebra</span><b>Q:</b> Solve the simultaneous equations: $3x + y = 13$ and $x - y = 3$.</div>`, 
        file: "maths.md" 
    },
    sci: { 
        title: "Combined Science", 
        notes: `<h3>Subject Notes</h3><p>Edexcel Combined Science (9-1) - Biology, Chemistry, Physics.</p>
                <hr>
                <h3>Exam Questions</h3>
                <div class="exam-box"><span class="exam-tag">Biology</span><b>Q:</b> Explain how the structure of a root hair cell is adapted for its function. (6 marks)</div>
                <div class="exam-box"><span class="exam-tag">Chemistry</span><b>Q:</b> Describe the test for chlorine gas. (2 marks)</div>`, 
        file: "science.md" 
    },
    hist: { 
        title: "OCR B History Suite", 
        notes: `
            <div class="history-container">
                <section>
                    <h3>🏷️ Nazis: The Rise and Rule</h3>
                    <p>Notes: Focus on the impact of the Wall Street Crash and the Enabling Act.</p>
                    <div class="exam-box"><span class="exam-tag">Nazis</span><b>Q:</b> Explain why the Nazi party had limited appeal before 1929. (7 marks)</div>
                </section>
                <section>
                    <h3>🏰 History Around Us</h3>
                    <p>Notes: Focus on your specific site study and its physical remains.</p>
                    <div class="exam-box"><span class="exam-tag">Site Study</span><b>Q:</b> How far does the site tell us about the lives of people in the past? (20 marks)</div>
                </section>
                <section>
                    <h3>🛡️ Vikings: Expansion and Settlement</h3>
                    <p>Notes: Focus on Danelaw and Alfred the Great.</p>
                    <div class="exam-box"><span class="exam-tag">Vikings</span><b>Q:</b> 'Viking raids were motivated only by wealth.' How far do you agree? (18 marks)</div>
                </section>
                <section>
                    <h3>⚔️ Normans: Conquest and Control</h3>
                    <p>Notes: ---The Anglo Saxons--- 
                    This is recognised as a golden age by many historians as it was seen as idylic, there was no war, they lived rurally and it was peaceful. 
                    The society was structured: Thralls-->Ceorl-->Thegns-->Earls-->King
                    All of the Earls were a member of the Whitan, they had no indevidual power but they could challenge a weak king
                    In 1051 Edward the Confessor attempted to exile Godwin The Earl of Wessex, however Godwin returned with military backing and forced Edward to reintstate him, this highlights the Kings dependence on his nobles</p>
                    <div class="exam-box"><span class="exam-tag">Normans</span><b>Q:</b> Explain how the Normans used castles to control England. (9 marks)</div>
                </section>
                <section>
                    <h3>⚖️ Crime and Punishment</h3>
                    <p>Notes: Focus on the Bloody Code and the rise of the Police force.</p>
                    <div class="exam-box"><span class="exam-tag">C&P</span><b>Q:</b> How far did the purpose of punishment change between 1500 and 1900? (18 marks)</div>
                </section>
            </div>
            <hr>
            <h3>General History Exam Strategy</h3>
            <p>Always use PEEL (Point, Evidence, Explanation, Link) for long-answer questions.</p>
        `, 
        file: "history.md" 
    },
    geo: { title: "Geography", notes: `<h3>Notes</h3><p>Tectonics & Urbanization.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Assess the effectiveness of responses to a hazard.</div>`, file: "geography.md" },
    span: { title: "Spanish", notes: `<h3>Notes</h3><p>Tenses & Vocab.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Task:</b> Describe your last holiday.</div>`, file: "spanish.md" },
    dra: { title: "Drama", notes: `<h3>Notes</h3><p>Blood Brothers.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> How would you perform Mickey in Act 1?</div>`, file: "drama.md" },
    art: { title: "Art", notes: `<h3>Notes</h3><p>Analysis.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Task:</b> Annotate your portfolio.</div>`, file: "art.md" },
    mus: { title: "Music", notes: `<h3>Notes</h3><p>Set Works.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Identify the tempo.</div>`, file: "music.md" },
    cs: { title: "Comp Sci", notes: `<h3>Notes</h3><p>Binary & Logic.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Convert 12 to Binary.</div>`, file: "cs.md" },
    it: { title: "IT", notes: `<h3>Notes</h3><p>UIs.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Why is accessibility important?</div>`, file: "it.md" },
    rs: { title: "RS", notes: `<h3>Notes</h3><p>Ethics.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Evaluate war ethics.</div>`, file: "rs.md" },
    food: { title: "Food Tech", notes: `<h3>Notes</h3><p>Nutrition.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> What is denaturation?</div>`, file: "food.md" },
    biz: { title: "Business", notes: `<h3>Notes</h3><p>Finance.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Calculate profit.</div>`, file: "business.md" },
    sport: { title: "Sport", notes: `<h3>Notes</h3><p>Physiology.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> Define aerobic exercise.</div>`, file: "sport.md" },
    cit: { title: "Citizenship", notes: `<h3>Notes</h3><p>Politics.</p><hr><h3>Exam Questions</h3><div class="exam-box"><b>Q:</b> What is a democracy?</div>`, file: "citizenship.md" }
};
