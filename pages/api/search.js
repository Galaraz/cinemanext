import { apiBase, apikey } from "../../lib/tmdb";  


export default async (req, res) => {
   
   
   console.log(req.query.q);
   const result = await fetch(`${apiBase}/search/movie?api_key=${apikey}&language=pt-BR&query=${req.query.q}`);
   const json = await result.json();
   const sucess =res.status(200).json({list: json.results}); 

   return sucess

  }
  