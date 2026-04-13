let scrollPos = 0;
let isScrolling = false;
let animationId;
let currentSpeed = 3; 
let currentAlign = 'left';
let currentMirror = false;

const startBtn = document.getElementById('start-btn');
const textInput = document.getElementById('text-input');
const prompterText = document.getElementById('prompter-text');
const prompterScreen = document.getElementById('prompter-screen');
const mirrorBtn = document.getElementById('mirror-btn');

// 1. Direct Click Speed Selector
const speedOptions = document.querySelectorAll('#speed-options .opt');
speedOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
        document.querySelector('#speed-options .opt.selected').classList.remove('selected');
        e.target.classList.add('selected');
        currentSpeed = parseInt(e.target.dataset.speed);
    });
});

// 2. Direct Click Alignment Selector
const alignOptions = document.querySelectorAll('#align-options .opt');
alignOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
        document.querySelector('#align-options .opt.selected').classList.remove('selected');
        e.target.classList.add('selected');
        currentAlign = e.target.dataset.align;
    });
});

// 3. Mirror Toggle
mirrorBtn.addEventListener('click', () => {
    currentMirror = !currentMirror;
    const textSpan = document.getElementById('mirror-text');
    if(currentMirror) {
        textSpan.innerText = "Mirrored";
        prompterText.classList.add('mirrored');
    } else {
        textSpan.innerText = "Normal";
        prompterText.classList.remove('mirrored');
    }
});

// 4. Start Prompter
startBtn.addEventListener('click', () => {
    const text = textInput.value || "PASTE YOUR SCRIPT HERE TO BEGIN...";
    prompterText.innerText = text;
    
    // Reset alignment classes
    prompterText.classList.remove('align-center', 'align-right');
    if (currentAlign === 'center') prompterText.classList.add('align-center');
    if (currentAlign === 'right') prompterText.classList.add('align-right');

    prompterScreen.classList.remove('hidden');
    
    // FIXED: Ensure we start from the top
    window.scrollTo(0, 0); 
    isScrolling = true;
    animate();
});

// 5. THE FIX: The Scrolling Loop
function animate() {
    if (!isScrolling) return;

    // We use window.scrollBy for better compatibility with TV browsers
    // Speed 1-10 is multiplied for a smooth walk
    const scrollAmount = currentSpeed * 0.2;
    window.scrollBy(0, scrollAmount);
    
    animationId = requestAnimationFrame(animate);
}

// 6. Global Controls
window.addEventListener('keydown', (e) => {
    if (prompterScreen.classList.contains('hidden')) return;

    if (e.key === 'Escape') {
        isScrolling = false;
        cancelAnimationFrame(animationId);
        prompterScreen.classList.add('hidden');
    }
    
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); 
        isScrolling = !isScrolling;
        if (isScrolling) animate();
    }
});
