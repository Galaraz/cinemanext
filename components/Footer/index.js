
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Map from '../Map';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import Logo from '../../assets/img/logo.png';
import SemFoto from '../../assets/img/sm-perfil.png';
import { existsOrError, urlFacebook, urlInstagram, urlImgs } from '../../utils';
import { buscarPerfilCorretores,verificarCreci } from '../../utils';


const customStyles = {
    content: {
      top:  '50%',
      left:  '50%',
      right:  'auto',
      bottom:  'auto',
      maxWidth: 600,
      maxHeight: 600,
      marginRight: '-50%',
      paddingBottom: 50,
      transform: 'translate(-50%, -50%)',
      overlay:{ zIndex: 120},
    
    },
    
  };

export default function Footer(props) {

    let subtitle;
    const storage = useSelector(state => state.data);
    const isOpen = useSelector(state => state.open);

    const [ latitude, setLatitude ] = useState(0);
    const [ longitude, setLongitude ] = useState(0);
    const [ finalidades, setFinalidades ] = useState([]);
    const [ modalIsOpen, setIsOpen] = useState(false);
    const [ corretores, setCorretores] = useState(['']);
    const [ loading, setLoading ] = useState(true); 
    const [ tituloCorretores, setTituloCorretores] = useState('');


    async function openModal() {
        setIsOpen(true);
        let axcorretores = await buscarPerfilCorretores();
        setCorretores(axcorretores);
        setLoading(false);
          
     }
 
     function afterOpenModal() {
         // references are now sync'd and can be accessed.
         subtitle.style.color = '#f00';
     }
 
     function closeModal() {
         setIsOpen(false);
     }

useEffect(() => {
     buscarPerfilCorretores().then(result => setCorretores(result));
 
},[]);

const ListaCorretores = corretores.map((corretor) =>
                                           
<div className="corretor">
 <div className ="esquerda">
    {
        corretor && corretor.foto  ?
            <img className="imagem-corretor" src={urlImgs + '/' + corretor.foto} alt="imagem corretor" />
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

    const currentYear = new Date();

    useEffect(() => {
        if (Object.keys(storage).length > 0) {
            
            (Object.keys(storage).includes('anunciante') && storage.anunciante.latitude) && setLatitude(storage.anunciante.latitude);
            (Object.keys(storage).includes('anunciante') && storage.anunciante.longitude) && setLongitude(storage.anunciante.longitude);
            setFinalidades(storage.finalidades.map(item => item.label));
            
        }

    },[storage]);





    const refStorage = useRef(true);
    useEffect(() => {        
        if (refStorage.current) { 
            refStorage.current = false;
            return; 
        }
        (Object.keys(storage).includes('anunciante') && storage.anunciante.latitude) && setLatitude(storage.anunciante.latitude);
        (Object.keys(storage).includes('anunciante') && storage.anunciante.longitude) && setLongitude(storage.anunciante.longitude);
        existsOrError(storage.finalidades) && setFinalidades(storage.finalidades.map(item => item.label));
        setTituloCorretores(storage.anunciante.creci);
        
    },[storage]);

    return (
        <>
            <footer className={isOpen ? 'open' : ''}>            
                
                <Map latitude={latitude} longitude={longitude} />                
                
                <div className="container footer-container d-flex flex-column">                    
                    
                    <div className="topo d-flex flex-grow-1 align-items-center pt-0 pt-xl-4">
                        
                        { (existsOrError(urlFacebook) || existsOrError(urlInstagram)) ? (

                            <div className="d-flex flex-column flex-xl-row align-items-center w-100">
                                                        
                                <div className="logo-rodape pr-0 pr-xl-5">
                                    <Link to="/"><img src={Logo} alt="Imobiliaria Teste" /></Link>
                                </div>

                                <div className="d-flex align-items-center justify-content-between flex-grow-1">
                                    <div className="d-none d-xl-block">
                                        <nav className="text-right">
                                            <NavLink to="/" exact>Home</NavLink>      
                                            { (finalidades.includes('Aluguel') || finalidades.includes('Aluguel/Temporada')) && <NavLink to="/aluguel">Aluguel</NavLink> }
                                            { finalidades.includes('Venda') && <NavLink to="/venda">Venda</NavLink> }                                        
                                            <NavLink to="/banco-de-pedidos">Banco de Pedidos</NavLink>
                                            <NavLink to="/fale-conosco">Fale Conosco</NavLink>
                                        </nav>
                                    </div>
                                    
                                    <div className="redes-sociais font-13 font-md-14 pt-3 pt-xl-0">
                                        <span className="mr-2">SIGA-NOS NAS REDES SOCIAIS:</span>
                                        { existsOrError(urlInstagram) && <a href={ urlInstagram } className="instagram mx-0" target="_blank" rel="noopener noreferrer nofollow">Instagram</a> }
                                        { existsOrError(urlFacebook) && <a href={ urlFacebook } className="facebook mx-0" target="_blank" rel="noopener noreferrer nofollow">Facebook</a> }                              
                                    </div>                                
                                    
                                </div>

                            </div>

                        ) : (
                            
                            <div className="d-flex flex-column flex-xl-row align-items-center justify-content-center w-100">
                                                        
                                <div className="logo-rodape pr-0 pr-xl-5">
                                    <Link to="/"><img src={Logo} alt="Imobiliaria Teste" /></Link>
                                </div>

                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-none d-xl-block">
                                        <nav className="text-right">

                                        <Modal
                                                isOpen={modalIsOpen}
                                                onAfterOpen={afterOpenModal}
                                                onRequestClose={closeModal}
                                                style={customStyles}
                                                contentLabel="Modal corretores"
                                                disabled={ loading ? true : false }
                                            >
                                                        
                                                <h2 className="tituloModal font-20 font-md-28" ref={(_subtitle) => (subtitle = _subtitle)}>{verificarCreci(tituloCorretores)}</h2>
                                            
                                                { 
                                                    loading ? 
                                                        <div className="estilo-carregado"><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" /></div>
                                                        :
                                                        ListaCorretores
                                                }
                                                                                                                                                                         
                                                <Button onClick={closeModal} className="btn-fechar-corretor">Fechar</Button>
                                            
                                            </Modal>
                                            <NavLink to="/" exact>Home</NavLink>
                                            { (finalidades.includes('Aluguel') || finalidades.includes('Aluguel/Temporada')) && <NavLink to="/aluguel">Aluguel</NavLink> }
                                            { finalidades.includes('Venda') && <NavLink to="/venda">Venda</NavLink> }
                                            {ListaCorretores.length > 0 ? 
                                            <NavLink to="/" onClick={openModal} ref={(_subtitle) => (subtitle = _subtitle)}>{verificarCreci(tituloCorretores)}</NavLink>
                                                                                       
                                            : 
                                            ''
                                            }
                                                                                   
                                            <NavLink to="/banco-de-pedidos">Banco de Pedidos</NavLink>
                                            <NavLink to="/fale-conosco">Fale Conosco</NavLink>
                                        </nav>
                                    </div>
                                </div>

                            </div>

                        ) }                        

                    </div>
                    
                    <div className="rodape font-11 font-xl-14 d-flex justify-content-center align-items-center text-center">
                        <b>© { currentYear.getFullYear() } INFOIMÓVEIS - Sua Referência em Imóveis - Todos os direitos reservados</b>                        
                    </div>

                </div>            
            
        </footer>

        </>
    )
}