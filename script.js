document.addEventListener('DOMContentLoaded', () => {
    let isScrolling = false;
    let animationId;
    let currentSpeed = 3;
    let currentAlign = 'left';
    let currentSize = 'standard';
    let isMirrored = false;

    const startBtn = document.getElementById('start-btn');
    const textInput = document.getElementById('text-input');
    const prompterText = document.getElementById('prompter-text');
    const prompterScreen = document.getElementById('prompter-screen');

    // 1. UI Selection Handlers
    function setupSegment(containerId, callback) {
        document.querySelectorAll(`#${containerId} .opt`).forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector(`#${containerId} .selected`).classList.remove('selected');
                btn.classList.add('selected');
                callback(btn);
            });
        });
    }

    setupSegment('speed-options', (btn) => currentSpeed = parseInt(btn.dataset.speed));
    setupSegment('size-options', (btn) => currentSize = btn.dataset.size);
    setupSegment('align-options', (btn) => currentAlign = btn.dataset.align);

    // 2. Mirror Toggle
    const mirrorBtn = document.getElementById('mirror-btn');
    mirrorBtn.addEventListener('click', () => {
        isMirrored = !isMirrored;
        const mirrorText = document.getElementById('mirror-text');
        if (isMirrored) {
            mirrorText.innerText = "Mirrored";
            mirrorText.classList.add('selected');
        } else {
            mirrorText.innerText = "Normal";
            mirrorText.classList.remove('selected');
        }
    });

    // 3. Start Button Logic
    startBtn.addEventListener('click', () => {
        prompterText.innerText = textInput.value || "PASTE YOUR SCRIPT HERE...";
        
        // Apply Mirror
        if (isMirrored) prompterText.classList.add('mirrored');
        else prompterText.classList.remove('mirrored');

        // Apply Alignment
        prompterText.className = ''; // Reset all classes
        prompterText.classList.add(`text-${currentAlign}`);
        
        // Apply Size
        prompterText.classList.add(`size-${currentSize}`);

        prompterScreen.classList.remove('hidden');
        window.scrollTo(0, 0);
        isScrolling = true;
        animate();
    });

    function animate() {
        if (!isScrolling) return;
        window.scrollBy(0, currentSpeed * 0.25);
        animationId = requestAnimationFrame(animate);
    }

    // 4. Keyboard Controls
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
});
