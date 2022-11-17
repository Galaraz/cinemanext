import Head from 'next/head'
import Link from 'next/link';
import { apiLocal } from "../../lib/tmdb"; 
import styles from '../../styles/Home.module.css'

export default function MovieItem({info}) {
  
    return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {info.title}
        </h1>
        <p>Nota: {info.vote_average}</p>
        <p>{info.overview}</p>
        <img src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`} width="400"/>
        <Link href="/">Voltar </Link>
   
   
      </main>
   
    </div>
  )
}

export async function getServerSideProps(context) {
  const result = await fetch(`${apiLocal}/api/movie/${context.params.id}`);
  const json = await result.json();
 
  return {
    props: {
      info: json.info
    } 
  };
}  