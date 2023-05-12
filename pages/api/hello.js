// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes


export default async function (req) {
  return new Response(
    JSON.stringify({ name: 'John Doe' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}