export async function onRequestPost(context) {
  const { request, env } = context;

  // Parse the request body
  const { email } = await request.json();

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response("Invalid email format", { status: 400 });
  }

  // Check if email already exists in KV
  const existingEmail = await env.EMAILS_KV.get(email);
  if (existingEmail) {
    return new Response("Email already exists", { status: 409 });
  }

  // Save the email in KV Storage
  await env.EMAILS_KV.put(email, "true");
  return new Response("Email saved successfully!", { status: 201 });
}