import { apiBase, apikey } from "../../lib/tmdb";  

export default async (req, res) => {
   if (req.query.q === undefined || req.query.q === null){
      req.query.q = 'brasil'
   }else{req.query.q = 'brasil'}
   const result = await fetch(`${apiBase}/search/movie?api_key=${apikey}&language=pt-BR&query=${req.query.q}`);
   const json = await result.json();
   const sucess =res.status(200).json({list: json.results}); 

   return new Response(sucess)

  }
  