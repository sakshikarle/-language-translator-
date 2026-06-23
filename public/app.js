document.getElementById("welcome").innerText =
    "Welcome, " + (localStorage.getItem("userName") || "User");

async function translateText() {

    const text =
        document.getElementById("inputText").value;

    const source =
        document.getElementById("sourceLang").value;

    const target =
        document.getElementById("targetLang").value;

    if (!text.trim()) {
        alert("Enter Text");
        return;
    }

    document.getElementById("output").innerHTML =
        "⏳ Translating...";

    const response = await fetch("/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text,
            source,
            target
        })
    });

    const data = await response.json();

    document.getElementById("output").innerText =
        data.translatedText;

    let history =
        JSON.parse(localStorage.getItem("history")) || [];

    history.push({
        input: text,
        output: data.translatedText
    });

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    loadHistory();
}

function copyText() {

    navigator.clipboard.writeText(
        document.getElementById("output").innerText
    );

    alert("Copied");
}

function speakText() {

    const text =
        document.getElementById("output").innerText;

    const target =
        document.getElementById("targetLang").value;

    if (!text.trim()) {
        alert("No text to speak!");
        return;
    }

    const speech =
        new SpeechSynthesisUtterance(text);

    if (target === "hi") {
        speech.lang = "hi-IN";
    }
    else if (target === "mr") {
        speech.lang = "hi-IN";
    }
    else if (target === "fr") {
        speech.lang = "fr-FR";
    }
    else if (target === "de") {
        speech.lang = "de-DE";
    }
    else if (target === "es") {
        speech.lang = "es-ES";
    }
    else if (target === "it") {
        speech.lang = "it-IT";
    }
    else if (target === "pt") {
        speech.lang = "pt-PT";
    }
    else if (target === "ru") {
        speech.lang = "ru-RU";
    }
    else if (target === "ja") {
        speech.lang = "ja-JP";
    }
    else if (target === "ko") {
        speech.lang = "ko-KR";
    }
    else if (target === "zh-cn") {
        speech.lang = "zh-CN";
    }
    else if (target === "ar") {
        speech.lang = "ar-SA";
    }
    else {
        speech.lang = "en-US";
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}

function swapLanguages() {

    const source =
        document.getElementById("sourceLang");

    const target =
        document.getElementById("targetLang");

    let temp = source.value;

    source.value = target.value;

    target.value = temp;
}

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";
}

function loadHistory() {

    const history =
        JSON.parse(localStorage.getItem("history")) || [];

    let html = "";

    history.forEach(item => {

        html += `
        <li>${item.input} → ${item.output}</li>
        `;
    });

    document.getElementById("history").innerHTML =
        html;
}

function clearHistory() {

    localStorage.removeItem("history");

    loadHistory();
}

function toggleTheme() {

    document.body.classList.toggle("dark");
}

loadHistory();
function startListening() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech Recognition not supported");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {

        document.getElementById("inputText").value =
            event.results[0][0].transcript;
    };
}

function downloadTranslation() {

    const text =
        document.getElementById("output").innerText;

    if (!text.trim()) {
        alert("No translation available");
        return;
    }

    const blob = new Blob([text], {
        type: "text/plain"
    });

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "translation.txt";

    link.click();
}

function stopSpeech() {

    window.speechSynthesis.cancel();
}
console.log("JS Loaded Successfully");