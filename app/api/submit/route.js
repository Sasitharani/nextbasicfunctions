export async function POST(request) {
  const { username, role } = await request.json();
  let message = `Welcome ${username} from post request`;
  if (role === 'admin') {
    message += ', you have admin rights';
  }
  return new Response(JSON.stringify({ message }), { status: 200 });
}