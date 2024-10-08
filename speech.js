var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)(); // Compatibilitate cu mai multe browsere
var recognition_started = false;

// Setăm opțiuni pentru recunoașterea vocală
recognition.continuous = false;  // Recunoaștere pe o singură propoziție
recognition.lang = 'ro-RO';      // Setăm limba pentru recunoaștere (română)
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Funcție care pornește recunoașterea vocală
function startRecognition() {
    if (!recognition_started) {
        recognition.start();
        recognition_started = true;
        document.getElementById("text").innerHTML = "Recunoașterea vocală a început...<br>";
    }
}

// Funcție care se execută când recunoașterea se încheie
function onend() {
    recognition.stop();
    recognition_started = false;
    document.getElementById("text").innerHTML += "Recunoașterea vocală s-a încheiat.<br>";
}

// Funcție care procesează rezultatele recunoașterii
recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;  // Textul transcris
    var confidence = event.results[0][0].confidence;  // Acuratețea

    document.getElementById("text").innerHTML += "Ați rostit: " + transcript + " (Acuratețe: " + (confidence * 100).toFixed(2) + "%)<br>";
};

// Gestionăm evenimentele de terminare
recognition.onend = onend;
recognition.onsoundend = onend;
recognition.onspeechend = onend;

// Gestionăm erorile
recognition.onerror = function (event) {
    document.getElementById("text").innerHTML += "Eroare: " + event.error + "<br>";
    recognition_started = false;
};
