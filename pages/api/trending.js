import { apiBase, apikey } from "../../lib/tmdb";    

export default async (req, res) => {
   const result = await fetch(`${apiBase}/trending/movie/week?api_key=${apikey}&language=pt-BR`);
   const json = await result.json();
   return new Response(
      JSON.stringify({ list: json.results }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
   )


  }
  