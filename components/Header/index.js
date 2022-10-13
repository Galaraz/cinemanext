import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Link } from 'react-router-dom';

import { api, apiId, scrollTopDist, headerFixed, urlImgs } from '../../utils';
//import LogoHr from '../../assets/img/logo-hor.png';
import Logo from '../../assets/img/logo.png';
import SemFoto from '../../assets/img/sm-perfil.png';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { buscarPerfilCorretores,verificarCreci } from '../../utils';

const customStyles = {
    content: {
      top:  '50%',
      left:  '50%',
      right:  'auto',
      bottom:  'auto',
      maxWidth: 320,
      maxHeight: 600,
      marginRight: '-50%',
      paddingBottom: 50,
      transform: 'translate(-50%, -50%)',
      overlay:{ zIndex: 120},
        
    },
    
  };




export default function Header(props) {
    let subtitle ="";
    const isOpen = useSelector(state => state.open);
    const dispatch = useDispatch();

    const [ dadosAnunciante, setDadosAnunciante ] = useState({});
    const [ finalidades, setFinalidades ] = useState([]);
    const [ showHeaderFixed, setShowHeaderFixed ] = useState(false);
    const [ showScrollTop, setShowScrollTop ] = useState(false);
    const [ modalIsOpen, setIsOpen] = useState(false);
    const [corretores, setCorretores] = useState(['']);
    const [ loading, setLoading ] = useState(true);


    async function openModal() {
        setIsOpen(true);
        let axcorretores = await buscarPerfilCorretores();
        setCorretores(axcorretores);
        dispatch({ type: 'ADD_OPEN', show: false });
        setLoading(false);
           
     }
 
     function afterOpenModal() {
        subtitle.style.color = '#f00';
     }
 
     function closeModal() {
        setIsOpen(false);
     }
 
     useEffect(() => {
        buscarPerfilCorretores().then(result => setCorretores(result));
       //setCorretores(axcorretores);
       
   },[]);
     const ListaCorretores = corretores.map((corretor) =>
                                           
     <div className="corretor">
      <div className ="esquerda imagem-corretor">
        {
            corretor && corretor.foto  ?
             <img src= {urlImgs+'/'+corretor.foto} alt="imagem corretor"/>
            :
             <img src= {SemFoto} alt="imagem corretor"/>
        }
      </div>
      <div className ="direita">
          <div className ="nome-corretor">{corretor.nome}</div>
          <div className="texto font-14">Creci: {corretor.creci}</div>
          <div className="texto font-14">{corretor.texto}</div>
      </div>
     </div>

 ); 

    useEffect(() => {
        api.post('',{                    
            acoes: [                        
                { metodo : "dadosanunciante" },		
                { metodo : "finalidades" },
                { metodo : "estados" }, 
		        { metodo : "valores"  },
		        { metodo : "tipoimoveis" }
            ],
            id: apiId
        }).then(resp => {                        
           const dados = Object.keys(resp.data).length > 0 && Object.keys(resp.data).includes('anunciante') ? resp.data : {};            
           Object.keys(resp.data).includes('anunciante') && setDadosAnunciante(dados.anunciante);
           Object.keys(resp.data).includes('finalidades') && setFinalidades(dados.finalidades.map(item => item.label)); 
           dispatch({ type: 'ADD_DATA', dados });  
        }).catch(e => {
           // console.log(e);
        });   
        
        window.addEventListener('scroll', function() {
            
            if (window.pageYOffset > scrollTopDist) {
                !showScrollTop && setShowScrollTop(true);
                !showHeaderFixed && setShowHeaderFixed(true);
                
            } else {
                setShowScrollTop(false);
                setShowHeaderFixed(false);
                handleOpenMenu('close');
                
            }            

            if (window.pageYOffset > (scrollTopDist+200)) {
                dispatch({ type: 'ADD_ACTIVE', show: true }); 
            } else {
                dispatch({ type: 'ADD_ACTIVE', show: false });
            }
            
        });
        
    },[]);

   
   
    function handleOpenMenu(close) {
        const show = close ? false : !isOpen;
        dispatch({ type: 'ADD_OPEN', show });
               
    }

    return (
        <>
        <header className={`${isOpen ? 'open ' : ''}d-flex align-items-center header`}>              

            <div className="container d-flex flex-column flex-md-row align-items-center pt-1  pt-md-0 pb-md-0">
            
                <div className="logo pt-4 pb-3  pt-lg-0 pb-lg-0">
                    <Link to="/"><img src={Logo} alt="Nome do corretor" /></Link>
                </div>

                <button onClick={() => handleOpenMenu()} className={`${isOpen ? 'open ': ''}d-block d-md-none btn-menu primary border-0 font-16 m-3`}>MENU<div><span></span></div></button>

                <div className="d-flex justify-content-end flex-grow-1">
                    
                    <div >
                        
                        <nav className="d-none d-md-block menu-topo pt-0 pb-3 pt-md-2 pb-md-2 pt-xl-0 pb-xl-0 text-center text-md-right">
                            <NavLink to="/" exact>HOME</NavLink>
                            { (finalidades.includes('Aluguel') || finalidades.includes('Aluguel/Temporada') ) && <NavLink to="/aluguel">ALUGUEL</NavLink> }
                            { finalidades.includes('Venda') && <NavLink to="/venda">VENDA</NavLink> }
                            <NavLink to="/banco-de-pedidos">BANCO DE PEDIDOS</NavLink>
                            <NavLink to="/fale-conosco">FALE CONOSCO</NavLink>
                        </nav>

                        <div className="header-dados d-flex flex-column flex-md-row justify-content-end pt-0 pt-xl-3 font-12 font-xl-14 ">
                            
                            <div className="px-0 px-md-3 px-xl-4 py-1 py-xl-0 text-center text-md-right">
                                <div>
                                    { (Object.keys(dadosAnunciante).length > 0 && Object.keys(dadosAnunciante).includes('telefones')) && dadosAnunciante.telefones.map((tel, index) => (          
                                        <>                              
                                            <a href={tel.app !== '0' ? `https://api.whatsapp.com/send?l=pt-BR&amp;phone=55${tel.ddd}${tel.numero.replace('-','')}&text=Oi,%20vim%20pelo%20seu%20site!` : `tel:0${tel.ddd}${tel.numero.replace('-','')}`} key={index} className={tel.app !== '0' ? 'whats' : ''} rel="noopener noreferrer nofollow" target="_blank">{ `(${tel.ddd}) ${tel.numero}`}</a>
                                            { dadosAnunciante.telefones.length !== (index+1) && ' / ' }
                                        </>
                                    ))}
                                </div>
                                <div className="creas">
                                    { (Object.keys(dadosAnunciante).length > 0 && Object.keys(dadosAnunciante).includes('creci')) && `CRECI: ${dadosAnunciante.creci}`}
                                </div>
                                
                             
                            </div>
                            
                            <div className="px-0 px-md-3 px-xl-4 py-1 py-xl-0 text-center text-md-right">
                                { Object.keys(dadosAnunciante).length > 0 && `${dadosAnunciante.endereco}`}<br />
                                { Object.keys(dadosAnunciante).length > 0 && `${dadosAnunciante.bairro} - ${dadosAnunciante.cidade}/${dadosAnunciante.uf}`}
                            </div>

                        </div>

                    </div>
                    
                </div>
            </div>            
            
        </header>

        { headerFixed && (
            <>
            <header className={`${ showScrollTop ? 'show ' : '' }header-fixed${isOpen ? ' open' : ''}`}>
                <div className="d-flex justify-content-between container py-2">
                    
                    <div className="d-flex align-items-center logo">
                        <Link to="/"><img src={Logo} alt="Celso Wagner Dias - Corretora de Imóvies" /></Link>
                    </div>

                    <button onClick={() => handleOpenMenu()} className={`${isOpen ? 'open ': ''}d-block d-md-none btn-menu border-0 font-16`}>MENU<div><span></span></div></button>
                    <nav className="d-none d-md-flex align-items-center justify-content-end menu-topo flex-grow-1">
                        <NavLink to="/" exact>HOME</NavLink>
                        { (finalidades.includes('Aluguel') || finalidades.includes('Aluguel/Temporada') ) && <NavLink to="/aluguel">ALUGUEL</NavLink> }
                        { finalidades.includes('Venda') && <NavLink to="/venda">VENDA</NavLink> }
                        <NavLink to="/banco-de-pedidos">BANCO DE PEDIDOS</NavLink>
                        <NavLink to="/fale-conosco">FALE CONOSCO</NavLink>
                    </nav>

                </div>
            </header>

            <nav className={`${isOpen ? 'show ' : ''}d-block d-md-none menu-topo-fixed`}>
                <NavLink onClick={() => handleOpenMenu()} to="/" exact>HOME</NavLink>
                { (finalidades.includes('Aluguel') || finalidades.includes('Aluguel/Temporada') ) && <NavLink onClick={() => handleOpenMenu()} to="/aluguel">ALUGUEL</NavLink> }
                { finalidades.includes('Venda') && <NavLink onClick={() => handleOpenMenu()} to="/venda">VENDA</NavLink> }
                {
                ListaCorretores.length > 0 ? 
                    <NavLink to="/" onClick={openModal} className="menu-topo-fixed-corretor" ref={(_subtitle) => (subtitle = _subtitle)}>{verificarCreci(dadosAnunciante.creci).toUpperCase()}</NavLink>
                     : 
                    ''
                }
                <NavLink onClick={() => handleOpenMenu()} to="/banco-de-pedidos">BANCO DE PEDIDOS</NavLink> 
                <NavLink onClick={() => handleOpenMenu()} to="/fale-conosco">FALE CONOSCO</NavLink>
            </nav>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Modal corretores"
                disabled={ loading ? true : false }
                
            >
                                       
                <h2 className="tituloModal font-20 font-md-28" ref={(_subtitle) => (subtitle = _subtitle)}>{verificarCreci(dadosAnunciante.creci )}</h2>
                { 
                    loading ? 
                        <div className="estilo-carregado"><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" /></div>
                        :
                        ListaCorretores
                }
                <Button onClick={closeModal} className="btn-fechar-corretor">Fechar</Button>
                
            </Modal>

            </>
        ) }
        

        <div className={`${ showScrollTop ? 'show ' : '' }btnToTop p-4`}>
            <button className="d-flex justify-content-center align-items-center text-white border-0 font-10" type="button" onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}>
                <div>TOPO</div>
            </button>
        </div>

        
        </>
    );
}
