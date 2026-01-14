export async function GET() {
  return Response.json({ api_url: process.env.API_URL ?? null })
}