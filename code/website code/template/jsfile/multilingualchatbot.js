console.log("Chatbot Loaded");

// ================= CONFIG =================
const BACKEND_BASE_URL = 'http://localhost:8082';

// ================= ELEMENTS =================
const input = document.querySelector("#dynamicpromt");
const sendBtn = document.querySelector("#submitpromt");
const chatHistory = document.querySelector(".chat-history");

// ================= TEXT TO SPEECH =================
function speakTextFromButton(btn) {
    const text = btn
        .closest(".msg-bubble")
        .querySelector(".msg-text")
        .innerText;

    // stop any previous speech
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";     // Hindi / Hinglish
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

// ================= UI HELPERS =================
function autoScroll() {
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// ================= USER MESSAGE =================
function addUserMessage(text) {
    const row = document.createElement("div");
    row.classList.add("message-row", "user-row");

    const bubble = document.createElement("div");
    bubble.classList.add("msg-bubble", "user-bubble");
    bubble.innerText = text;

    const icon = document.createElement("div");
    icon.classList.add("user-icon-small");
    icon.innerHTML = `<i class="fas fa-user"></i>`;

    row.appendChild(bubble);
    row.appendChild(icon);
    chatHistory.appendChild(row);

    autoScroll();
}

// ================= AI MESSAGE =================
function createAiMessage(initialText = "") {
    const row = document.createElement("div");
    row.classList.add("message-row", "bot-row");

    const icon = document.createElement("div");
    icon.classList.add("bot-icon-small");
    icon.innerHTML = `<i class="fas fa-robot"></i>`;

    const bubble = document.createElement("div");
    bubble.classList.add("msg-bubble", "bot-bubble");

    bubble.innerHTML = `
        <span class="msg-text">${initialText}</span>
        <button class="audio-btn" onclick="speakTextFromButton(this)">🔊</button>
    `;

    row.appendChild(icon);
    row.appendChild(bubble);
    chatHistory.appendChild(row);

    autoScroll();
    return bubble;
}

// ================= STREAMING REQUEST =================
async function sendStreamingRequest(question) {
    const aiBubble = createAiMessage("...");

    const url = `${BACKEND_BASE_URL}/ai/ask?q=${encodeURIComponent(question)}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            mode: "cors"
        });

        if (!response.ok || !response.body) {
            aiBubble.querySelector(".msg-text").innerText =
                `Error ${response.status}: Backend not responding`;
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let fullResponse = "";
        aiBubble.querySelector(".msg-text").innerText = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            fullResponse += chunk;

            aiBubble.querySelector(".msg-text").innerText = fullResponse;
            autoScroll();
        }

    } catch (error) {
        console.error(error);
        aiBubble.querySelector(".msg-text").innerText =
            `Error: Cannot connect to backend (${BACKEND_BASE_URL})`;
    }
}

// ================= EVENTS =================
sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = "";
    sendStreamingRequest(text);
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});
