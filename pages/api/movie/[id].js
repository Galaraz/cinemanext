import { apiBase, apikey } from "../../../lib/tmdb";    

export default async (req, res) => {
  
   const result = await fetch(`${apiBase}/movie/${req.query.id}?api_key=${apikey}&language=pt-BR`);
   const json = await result.json();


   //https://api.themoviedb.org/3/movie642885?api_key=5a9ac975da01e7ff2c086d9b3076541a&language=pt-BR
   res.status(200).json({
    info: json
   }); 


  }