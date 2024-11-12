export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const role = searchParams.get('role');
  let message = `Welcome ${username} with role ${role} from get request as Query parameter`;
  return new Response(JSON.stringify({ message }), { status: 200 });
}