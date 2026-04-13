let scrollPos = 0;
let isScrolling = false;
let animationId;
let currentSpeed = 3; // Default 
let currentAlign = 'left';
let currentMirror = false;

// UI Elements
const startBtn = document.getElementById('start-btn');
const textInput = document.getElementById('text-input');
const prompterText = document.getElementById('prompter-text');
const prompterScreen = document.getElementById('prompter-screen');
const mirrorBtn = document.getElementById('mirror-btn');

// 1. Direct Click Speed Selector (1-10)
const speedOptions = document.querySelectorAll('#speed-options .opt');
speedOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
        // Remove existing selection
        document.querySelector('#speed-options .opt.selected').classList.remove('selected');
        // Add new selection
        e.target.classList.add('selected');
        // Update variable
        currentSpeed = parseInt(e.target.dataset.speed);
    });
});

// 2. Direct Click Alignment Selector
const alignOptions = document.querySelectorAll('#align-options .opt');
alignOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
        // Remove existing selection
        document.querySelector('#align-options .opt.selected').classList.remove('selected');
        // Add new selection
        e.target.classList.add('selected');
        // Update variable
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
    
    // Apply Output Settings
    prompterText.innerText = text;
    
    // Set Alignment
    prompterText.classList.remove('align-center', 'align-right');
    if (currentAlign === 'center') prompterText.classList.add('align-center');
    if (currentAlign === 'right') prompterText.classList.add('align-right');

    // Show prompter and begin
    prompterScreen.classList.remove('hidden');
    scrollPos = 0;
    isScrolling = true;
    requestAnimationFrame(animate);
});

// 5. The Scrolling Loop
function animate() {
    if (!isScrolling) return;

    // Use currentSpeed value (1-10)
    // Adjustment factor for readable speed on TV
    scrollPos += (currentSpeed * 0.2); 
    
    // Perform the scroll
    prompterScreen.scrollTop = scrollPos;
    
    // Recursively call animate
    animationId = requestAnimationFrame(animate);
}

// Global Controls (Remote Control/Keyboard friendly)
window.addEventListener('keydown', (e) => {
    if (prompterScreen.classList.contains('hidden')) return; // Ignore if menu is open

    // ESC to exit
    if (e.key === 'Escape') {
        isScrolling = false;
        prompterScreen.classList.add('hidden');
        cancelAnimationFrame(animationId);
    }
    // SPACE or "Enter/OK" on remote to pause
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); // Prevent accidental exit
        isScrolling = !isScrolling;
        if (isScrolling) requestAnimationFrame(animate);
    }
});