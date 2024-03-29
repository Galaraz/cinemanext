import { apiBase, apikey } from "../../lib/tmdb";    


export default async (req, res) => {
   const result = await fetch(`${apiBase}/trending/movie/week?api_key=${apikey}&language=pt-BR`);
   const json = await result.json();
   return  res.status(200).json({list: json.results });

  }
  