fetch("https://my-worker.<your-cloudflare-domain>.workers.dev")
.then(response => response.text())
.then(data => {
    document.getElementById("api-response").innerText = `API Response: ${data}`;
})
.catch(err => {
    console.error("Error fetching API:", err);
});