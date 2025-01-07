// Fetching from the API
fetch("https://fancy-scene-ce9b.algrady.workers.dev")
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.text();
    })
    .then(data => {
        const apiResponseElement = document.getElementById("api-response");
        if (apiResponseElement) {
            apiResponseElement.innerText = `API Response: ${data}`;
        } else {
            console.warn("Element with id 'api-response' not found.");
        }
    })
    .catch(err => {
        console.error("Error fetching API:", err);
    });

// Email form submission
document.getElementById("email-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        const responseElement = document.getElementById("response");
        if (responseElement) {
            responseElement.innerText = "Invalid email address.";
        }
        return;
    }

    try {
        const response = await fetch("https://contact-us.algrady.workers.dev/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();
        const responseElement = document.getElementById("response");
        if (responseElement) {
            responseElement.innerText = result;
        }
    } catch (error) {
        console.error("Error submitting email:", error);
        const responseElement = document.getElementById("response");
        if (responseElement) {
            responseElement.innerText = "Error submitting email.";
        }
    }
});