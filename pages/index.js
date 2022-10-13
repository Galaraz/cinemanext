//import Head from 'next/head'
//import Link from 'next/link';
// import { apiLocal } from "../lib/tmdb"; 
// import styles from '../styles/Home.module.css'

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux'
import ContentHeader from '../components/ContentHeaderMain';
import Skeleton from '../components/Skeleton';
import { descriptionDefault, apiId, urlImgs, urlSite, moneyFormatter, titleSite, api, reloadTime, urlFavicon } from '../utils';
import Place from '../assets/img/place.svg';



export default function Home(props) {
  const isOpen = useSelector(state => state.open);
    const [ pageSkeleton, setPageSkeleton ] = useState(true);
    const [ destaques, setDestaques ] = useState([]);
    const [ noticias, setNoticias ] = useState([]);
    
    useEffect(() => {        
        getDados();          
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        //ReactGA.initialize(gaId, {debug: false});
        //ReactGA.pageview(props.location.pathname);
    },[]);

    let renderSkeletonList = [];
    for (let i = 0; i < 4; i++) {
        renderSkeletonList[i] = i;        
    }

    function getDados() {
        api.post('',{                    
            acoes: [                        
                { metodo: "destaques", params: [ { resultados: "4" }] },
                { metodo: "ultimasnoticias", params: [ { resultados: "4" }] },
            ],
            id: apiId                 
        }).then(resp => {            
            Object.keys(resp.data).includes('destaques') && setDestaques(resp.data.destaques);
            Object.keys(resp.data).includes('ultimasnoticias') && setNoticias(resp.data.ultimasnoticias);
            setTimeout(() => {setPageSkeleton(false)}, 100);
        }).catch(e => {
            setTimeout(() => { getDados() }, reloadTime);
            //console.log(e);
        });
    }

    return (
        <>
            <Helmet>
                
                <link rel="apple-touch-icon" sizes="57x57" href={ `${urlFavicon}apple-icon-57x57.png`} />
                <link rel="apple-touch-icon" sizes="60x60" href={ `${urlFavicon}apple-icon-60x60.png`} />
                <link rel="apple-touch-icon" sizes="72x72" href={ `${urlFavicon}apple-icon-72x72.png`} />
                <link rel="apple-touch-icon" sizes="76x76" href={ `${urlFavicon}apple-icon-76x76.png`} />
                <link rel="apple-touch-icon" sizes="114x114" href={ `${urlFavicon}apple-icon-114x114.png`} />
                <link rel="apple-touch-icon" sizes="120x120" href={ `${urlFavicon}apple-icon-120x120.png`} />
                <link rel="apple-touch-icon" sizes="144x144" href={ `${urlFavicon}apple-icon-144x144.png`} />
                <link rel="apple-touch-icon" sizes="152x152" href={ `${urlFavicon}apple-icon-152x152.png`} />
                <link rel="apple-touch-icon" sizes="180x180" href={ `${urlFavicon}apple-icon-180x180.png`} />
                <link rel="icon" type="image/png" sizes="192x192"  href={ `${urlFavicon}android-icon-192x192.png`} />
                <link rel="icon" type="image/png" sizes="32x32" href={ `${urlFavicon}favicon-32x32.png`} />
                <link rel="icon" type="image/png" sizes="96x96" href={ `${urlFavicon}favicon-96x96.png`} />
                <link rel="icon" type="image/png" sizes="16x16" href={ `${urlFavicon}favicon-16x16.png`} />
                <link rel="manifest" href={ `${urlFavicon}manifest.json`} />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content={ `${urlFavicon}ms-icon-144x144.png`} />
                <meta name="theme-color" content="#ffffff" />
                <meta name="description" content={descriptionDefault} />
                <meta name="og:site_name" property="og:site_name" content={titleSite} />
                <meta name="og:title" property="og:title" content={titleSite} />
                <meta name="og:url" property="og:url" content={urlSite} />
                <meta name="og:description" property="og:description" content={descriptionDefault} />
                <meta name="og:image" property="og:image" content={`${urlFavicon}padrao.png`} />
                <meta name="og:image:width" property="og:image:width" content="300" />
                <meta name="og:image:height" property="og:image:height" content="300" />
                <title>{titleSite}</title>
            </Helmet>
            
               

            <div className={`${isOpen ? 'open ': ''}main`}>
                
                <ContentHeader routes={props} /> 

                <div className="container py-4 px-4 px-sm-0">
                 
                    <div className="pb-3 pb-md-5">
                        <h2 className="color-primary font-28 m-0 pb-2">Imóveis em Destaque</h2>
                        <p className="font-14 w-50 pr-0 pr-md-5">Confira em nossos principais imóveis aquele que mais se adeque as suas necessidades</p>
                    </div>

                    <div className={`${ pageSkeleton ? '' : 'd-none '}row`}>
                        { renderSkeletonList.map((imovel, index) => { 
                            return (
                                <div key={index} className="col-12 col-md-6 col-xl-3 py-3 py-xl-0">
                                    <div className="d-flex flex-column shadow h-100 item-grid">
                                        <div className="foto position-relative">
                                            <Skeleton className="skeleton-absolute" />
                                        </div>
                                        <div className="d-flex flex-grow-1 flex-column bg-white px-3 py-3">
                                            
                                            <div className="flex-grow-2">
                                                <Skeleton width={100} height={12} />
                                                <Skeleton className="mt-1" width={120} height={24} />                        
                                            </div>

                                            <div className="d-flex infos flex-grow-1 align-items-center py-3">
                                                <Skeleton width={177} height={11} />
                                            </div>
                                            
                                            <div className="endereco font-12 line-height-130 pl-0">
                                                <Skeleton width={200} height={32} /> 
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        }) }
                    </div>

                    <div className={`${ pageSkeleton ? 'd-none ' : ''}row`}>
                        
                        { destaques.map(dest => (
                            
                            <div key={dest.id} className="col-12 col-md-6 col-xl-3 py-3 py-xl-0">
                                <Link to={`/imovel/${dest.id}`} className="d-flex flex-column shadow h-100 item-grid" >                                
                                    <div className="foto position-relative"><img src={`${urlImgs}/${dest.imagem}`} alt={dest.tipo} /></div>
                                    <div className="d-flex flex-grow-1 flex-column px-3 py-3">
                                        
                                        <div className="flex-grow-2">
                                            <div className="font-12 font-md-11 line-height-100">{dest.finalidade}{dest.tipo && <small className="ml-1 font-italic opacity-50">({dest.tipo})</small>}</div>
                                            <div className="font-20 color-primary">
                                                { dest.valor ? (
                                                    <b>R$ {moneyFormatter(dest.valor)}</b>
                                                ) :
                                                (
                                                    <b>SEM VALOR</b>
                                                ) }                                                    
                                            </div>
                                            { dest.valor_condominio && <div className="font-12 font-md-11 line-height-100 color-secondary">Condomínio: R$ {moneyFormatter(dest.valor_condominio)}</div> }
                                        </div>

                                        <div className="d-flex infos flex-grow-1 align-items-center py-3">
                                            <div className="d-flex">
                                                { dest.dormitorios != 0 && <div className="info info-dormitorios font-12 font-md-11 line-height-100 pr-3"><div>{dest.dormitorios}</div></div> }
                                                { dest.banheiros != 0 && <div className="info info-banheiros font-12 font-md-11 line-height-100 pr-3"><div>{dest.banheiros}</div></div> }
                                                { dest.area != 0 && <div className="info info-area font-12 font-md-11 line-height-100 pr-3"><div>{dest.area} m<sup>2</sup></div></div> }
                                            </div>
                                        </div>
                                        
                                        <div className="endereco font-12 line-height-130">
                                            <img src={Place} alt="" />
                                            {`${dest.bairro} | ${dest.cidade}/${dest.uf}`}
                                        </div>
                                        
                                    </div>                                
                                </Link>
                            </div>

                        )) }

                    </div>
                </div>

                <div className="container py-5 px-4 px-sm-0">
                    <div className="pb-3 pb-md-5">
                        <h2 className="color-primary font-28 m-0 pb-2">Notícias Imobiliárias</h2>
                        <p className="font-14 w-50 pr-0 pr-md-5">Fique por dentro das últimas notícias do setor imobiliário.</p>
                    </div>
                    
                    <div className={`${ pageSkeleton ? '' : 'd-none '}row`}>
                        { renderSkeletonList.map((imovel, index) => { 
                            return (
                                <div key={index} className="col-12 col-md-6 col-xl-3 py-3 py-xl-0">
                                    <div className="d-flex flex-column shadow h-100 item-grid">
                                        <div className="foto position-relative">
                                            <Skeleton className="skeleton-absolute" />
                                        </div>
                                        <div className="d-flex flex-grow-1 flex-column bg-white px-3 py-3">
                                            
                                            <div className="flex-grow-2">
                                                <Skeleton width={100} height={12} />
                                                <Skeleton className="mt-1" width={120} height={24} />                        
                                            </div>

                                            <div className="d-flex infos flex-grow-1 align-items-center py-3">
                                                <Skeleton width={177} height={11} />
                                            </div>
                                            
                                            <div className="endereco font-12 line-height-130 pl-0">
                                                <Skeleton width={200} height={32} /> 
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        }) }
                    </div>


                    <div className={`${ pageSkeleton ? 'd-none ' : ''}row`}>

                        { noticias.map(noti => (
                            <div key={noti.id} className="col-12 col-md-6 col-xl-3 py-3 py-xl-0">

                                <Link to={`/noticia/${noti.id}`} className="d-flex flex-column shadow h-100 item-grid-noticia">                                
                                    <div className="foto"><img src={`${urlImgs}/${noti.imagem}`} alt={noti.titulo} /></div>
                                    <div className="d-flex flex-grow-1 flex-column px-3 py-3">                                            
                                        <div className="flex-grow-1"><h2 className="font-14 line-height-130 color-secondary m-0">{noti.titulo}</h2></div>
                                        <div className="py-3"><p className="m-0 font-14 line-height-130">{ noti.resumo }</p></div>
                                        <div className="ler-mais color-primary"><span className="line-height-100 font-14">LER MATÉRIA COMPLETA</span></div>
                                    </div>                                
                                </Link>

                            </div>
                        )) }

                    </div>
                </div> 

            </div>

        </>
    );   
    
}
