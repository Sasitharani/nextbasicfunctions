export async function GET(request) {
  return new Response('Connected to server', { status: 200 });
}

export async function POST(request) {
  const { username, password } = await request.json();

  // Dummy user data for demonstration purposes
  const user = {
    username: 'sasi',
    password: 'password123',
  };

  // Check if the provided credentials match the dummy user data
  if (username === user.username && password === user.password) {
    return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'Invalid username or password' }), { status: 401 });
  }
}