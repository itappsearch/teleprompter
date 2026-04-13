document.addEventListener('DOMContentLoaded', () => {
    let isScrolling = false;
    let animationId;
    let currentSpeed = 3;
    let currentAlign = 'left';
    let isMirrored = false;

    const startBtn = document.getElementById('start-btn');
    const textInput = document.getElementById('text-input');
    const prompterText = document.getElementById('prompter-text');
    const prompterScreen = document.getElementById('prompter-screen');

    // 1. Speed Handling
    document.querySelectorAll('#speed-options .opt').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('#speed-options .selected').classList.remove('selected');
            btn.classList.add('selected');
            currentSpeed = parseInt(btn.dataset.speed);
        });
    });

    // 2. Alignment Handling
    document.querySelectorAll('#align-options .opt').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('#align-options .selected').classList.remove('selected');
            btn.classList.add('selected');
            currentAlign = btn.dataset.align;
        });
    });

    // 3. Mirror Toggle Handling
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

    // 4. Start Button Logic
    startBtn.addEventListener('click', () => {
        // Set Text
        prompterText.innerText = textInput.value || "Paste your script...";
        
        // Apply Mirror
        if (isMirrored) prompterText.classList.add('mirrored');
        else prompterText.classList.remove('mirrored');

        // Apply Alignment
        prompterText.classList.remove('text-left', 'text-center', 'text-right');
        prompterText.classList.add(`text-${currentAlign}`);

        // Launch
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

    // 5. Controls
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
