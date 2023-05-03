import Head from 'next/head'

import { useState } from 'react';

import styles from '../styles/Home.module.css'

export default function Busca({list}) {
 const [searchText, setSearchText] = useState('');
 const [movieList, setMovieList] = useState([]);

 const handlerSearch = async () => { 
    if (searchText !== '') {
        const result = await fetch(`/api/search?q=${searchText}`);
        const json = await result.json();
        setMovieList(json.list);
    }

 }

  return (
    <div className={styles.container}> 
      <Head>
        <title>site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        Busca
        </h1>

        <input type="text" value={searchText} onChange={e=>setSearchText(e.target.value)} />
        <br></br>    
        <button onClick={handlerSearch}>Buscar</button>

       
   
        <ul>
            {movieList.map(item=>(
                 <li key="">
                    <a href={`/movie/${item.id}`}>
                        <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} width="150" /><br/>
                        {item.title}
                    </a>
               </li>
            ))}
        </ul>
      
   
      </main>
   
    </div>
  )
}

 