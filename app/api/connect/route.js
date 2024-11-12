export async function GET(request) {
  return new Response('Connected to server', { status: 200 });
}