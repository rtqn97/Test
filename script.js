// ===== CONSTANTS ===== //
const BIRTHDAY_DATE = "2025-04-10T00:00:00+03:00"; // Cyprus time (EET)
const MAIN_MESSAGE = `Hey AARATI,\n\nI know we haven't talked in a while, but today is a special day, and I couldn't just let it pass without wishing you. Happy Birthday! I genuinely hope this year brings you all the happiness, success, and prosperity you deserve.\n\nMay you always find reasons to smile, the strength to chase your dreams, and the right people who uplift and support you. No matter where life takes you, I hope you stay safe, healthy, and surrounded by love and positivity.\n\nEven though we may not be in touch, just know that I still wish the best for you, always. Enjoy your special day to the fullest, and may this year be even better than the last!\n\nTake care, and once again, Happy Birthday!`;
const MORSE_CODE = `.. / .-- .. ... .... / .. / -.-. --- ..- .-.. -.. / .... .- ...- . / -... . . -. / .- -... .-.. . / - --- / -. --- - / -.. --- / - .... --- ... . / - .... .. -. --. ... / --- .-. / ... .- -.-- / .-- .... .. -.-. .... / .. / -.. .. -.. --..-- / -... ..- - / .. - / .-- .- ... / -. . -.-. . ... ... .- .-. -.-- / -... . -.-. .- ..- ... . / --- ..-. / -- -.-- / ... .. - ..- .- - .. --- -. .-.-.- / .. / .- -- / .-. . .- .-.. .-.. -.-- / ... --- .-. .-. -.-- / .- -. -.. / .... --- .--. . / ..-. --- .-. / -.-- --- ..- .-. / -... . ... - / .- -. -.. / .- .-.. ... --- / --- ..- .-. / -... . ... - / .. -. / .- -. --- - .... . .-. / ..- -. .. ...- . .-. ... . / ❤️`;

// ===== ELEMENTS ===== //
const countdownEl = document.getElementById("countdown");
const waitTextEl = document.getElementById("wait-text");
const messageEl = document.getElementById("message");
const morseButtonEl = document.getElementById("morse-button");
const morseCodeEl = document.getElementById("morse-code");
const phase1El = document.getElementById("phase1");
const phase2El = document.getElementById("phase2");

// ===== AUDIO SETUP ===== //
const audio = {
    song: new Audio("sounds/Until.mp3"),
    pop: new Audio("sounds/pop.mp3"),
    confetti: new Audio("sounds/confetti.mp3")
};

// Preload and configure audio
Object.values(audio).forEach(sound => {
    sound.volume = 0.6;
    sound.preload = "auto";
});

// ===== COUNTDOWN ===== //
function updateCountdown() {
    const now = new Date();
    const birthday = new Date(BIRTHDAY_DATE);
    const diff = birthday - now;

    if (diff <= 0) {
        countdownEl.textContent = "00:00:00";
        startCelebration();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// ===== CELEBRATION ===== //
function startCelebration() {
    // 1. Switch phases
    phase1El.style.display = "none";
    phase2El.style.display = "block";

    // 2. Play sounds
    audio.confetti.play().catch(e => console.log("Play confetti after user click"));
    audio.pop.play().catch(e => console.log("Play pop after user click"));
    setTimeout(() => audio.song.play().catch(e => console.log("Click to play song")), 3000);

    // 3. Start animations
    createStars();
    createConfetti();
    createBalloons();

    // 4. Type messages
    typeWriter(MAIN_MESSAGE, messageEl, () => {
        morseButtonEl.style.display = "block";
        morseButtonEl.addEventListener("click", () => {
            morseCodeEl.style.display = "block";
            typeWriter(MORSE_CODE, morseCodeEl);
        });
    });
}

// ===== ANIMATIONS ===== //
function createStars() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(star);
    }
}

function createConfetti() {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(confetti);
    }
}

function createBalloons() {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.top = `${Math.random() * 80}vh`;
        balloon.style.backgroundColor = colors[i % colors.length];
        balloon.style.animationDelay = `${Math.random() * 5}s`;
        document.body.appendChild(balloon);
    }
}

// ===== TYPEWRITER EFFECT ===== //
function typeWriter(text, element, onComplete = () => {}) {
    let i = 0;
    element.innerHTML = "";
    function typing() {
        if (i < text.length) {
            const char = text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
            element.innerHTML += char;
            i++;
            setTimeout(typing, 20);
        } else {
            onComplete();
        }
    }
    typing();
}

// ===== INITIALIZE ===== //
updateCountdown();
setInterval(updateCountdown, 1000);
