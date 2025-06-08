const executeButton = document.getElementById('open-case-button');
const casesContainer = document.getElementById('cases-container');
const jobApplication = document.getElementById('job-application');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
var isRunning = false;

gsap.registerPlugin(ScrollToPlugin);

const cases = {};
const preDeterminedCases = [];
const maxCases = 250;

for (let i = 0; i <= maxCases; i++) {
    preDeterminedCases.push(1);
}


// html creation of case
const createCase = (pId) => {
    const id = parseInt(pId);

    const caseDiv = document.createElement('div');
    caseDiv.className = 'case';

    const caseImage = document.createElement('img');
    caseImage.src = `./images/${id}.avif`;
    caseImage.alt = 'Case 1';

    caseDiv.appendChild(caseImage);

    return caseDiv;
};


// create cases 
// could be loaded on the demand probably but in this case it doesnt matter really.
for (let i = 0; i <= maxCases; i++) {
    const id = preDeterminedCases[i];
    const caseElement = createCase(id);
    cases[i] = {
        element: caseElement,
        id: id,
    };
    casesContainer.appendChild(caseElement);
}


const targetIndex = 39;
// test case for the job application 
//cases[targetIndex].element.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; 
cases[targetIndex].element.children[0].src = `./images/2.png`; 
cases[targetIndex].element.children[0].id = "temp-case" 


executeButton.onclick = () => {
    if (isRunning) return;
    isRunning = true;
    executeButton.disabled = true;
    executeButton.style.opacity = '0.5';

    const targetCase = casesContainer.children[targetIndex];
    if (!targetCase) return;

    let boxOffset = (targetCase.clientWidth / 2) - 15 // 15px is the margin on the left and right side of the case just so it doesnt make confusion aboout which case has been picked
    // could also do as empire does and scale the image a little to show which skin is current picked;
    let randomOffset = Math.floor(Math.random() * (boxOffset * 2)) - boxOffset;
    console.log(randomOffset);

    const scrollOffset = targetCase.offsetLeft - (casesContainer.clientWidth - targetCase.clientWidth / 2) + randomOffset;

    gsap.to(casesContainer, {
        duration: 5,
        ease: "circ.out",
        scrollTo: { x: scrollOffset },
        onComplete: async () => {
            await sleep(650);
            targetCase.classList.add('chosen');
            confetti({
                particleCount: 120,
                spread: 360,
                origin: { y: 0.3 }
            });

            await sleep(100);
            jobApplication.style.display = 'block';
            jobApplication.style.zIndex = '10'

        }
    });

};


