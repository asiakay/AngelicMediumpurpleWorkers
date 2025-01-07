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
  const responseDiv = document.getElementById("response");

  try {
    const response = await fetch("/api/submit-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const responseText = await response.text();
    if (response.ok) {
      responseDiv.textContent = "Success: " + responseText;
      responseDiv.style.color = "green";
    } else {
      responseDiv.textContent = "Error: " + responseText;
      responseDiv.style.color = "red";
    }
  } catch (error) {
    console.error("Error submitting email:", error);
    responseDiv.textContent = "An error occurred. Please try again.";
    responseDiv.style.color = "red";
  }
});