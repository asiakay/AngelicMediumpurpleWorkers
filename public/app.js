fetch("https://fancy-scene-ce9b.algrady.workers.dev")
.then(response => response.text())
.then(data => {
    document.getElementById("api-response").innerText = `API Response: ${data}`;
})
.catch(err => {
    console.error("Error fetching API:", err);
});


document.getElementById("email-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;

    try {
        const response = await fetch("https://email-saver.algrady.workers.dev/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const result = await response.text();
        document.getElementById("response").innerText = result;
    } catch (error) {
        console.error("Error submitting email:", error);
        document.getElementById("response").innerText = "Error submitting email.";
    }
});