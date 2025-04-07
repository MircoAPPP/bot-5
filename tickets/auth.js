document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("authPopup").style.display = "block";
});

async function verifyToken() {
    const token = document.getElementById("tokenInput").value;
    const userId = localStorage.getItem("userId"); // Assumiamo che l'ID utente sia salvato nel localStorage
    if (!userId) return alert("Errore: ID utente non trovato.");

    const response = await fetch("/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, token })
    });

    const data = await response.json();
    if (data.success) {
        alert("Accesso consentito");
        document.getElementById("authPopup").style.display = "none";
    } else {
        alert("Token non valido o scaduto");
    }
}
