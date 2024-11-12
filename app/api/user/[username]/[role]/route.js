// app/api/user/[username]/[role]/route.js

export async function GET(request, { params }) {
  const { username, role } = params;
  let message = `Welcome ${username} with role ${role} from get request as Route parameter`;
  return new Response(JSON.stringify({ message }), { status: 200 });
}

