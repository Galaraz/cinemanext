import { apiBase, apikey } from "../../lib/tmdb";  

export const config = {
   runtime: 'experimental-edge',
 }
export default async (req, res) => {
    
   const result = await fetch(`${apiBase}/search/movie?api_key=${apikey}&language=pt-BR&query=${req.query.q}`);
   const json = await result.json();
   const sucess =res.status(200).json({list: json.results}); 

   return new Response(sucess)

  }
  