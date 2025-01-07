use worker::*;

#[durable_object]
pub struct EmailStorage {
    state: State, // Durable Object state for persistent storage
}

impl DurableObject for EmailStorage {
    fn new(state: State, _env: Env) -> Self {
        EmailStorage { state }
    }

    async fn fetch(&mut self, req: Request) -> Result<Response> {
        match req.method() {
            // Save an email address (POST request)
            Method::Post => {
                let email: String = req.json().await?; // Parse email from JSON body
                let mut emails: Vec<String> = self.state.storage().get("emails").await?.unwrap_or_default();
                emails.push(email);
                self.state.storage().put("emails", emails).await?;
                Response::ok("Email saved successfully!")
            }

            // Retrieve all saved email addresses (GET request)
            Method::Get => {
                let emails: Vec<String> = self.state.storage().get("emails").await?.unwrap_or_default();
                Response::from_json(&emails)
            }

            // Handle unsupported methods
            _ => Response::error("Method not allowed", 405),
        }
    }
}