export async function GET(request) {
  return new Response('Connected to server', { status: 200 });
}

export async function POST(request) {
  const { name, email, message } = await request.json();

  // Here you can handle the form data, e.g., save it to a database or send an email

  // For demonstration purposes, we'll just return a success message
  return new Response(JSON.stringify({ message: 'Form submitted successfully' }), { status: 200 });
}