import axios from 'axios';
import { toast } from 'react-toastify';


const apiId = "526";
const apiUrl = "https://www.infoimoveis.com.br/webservice/hotsites.php";
const urlImgs = "https://static.infoimoveis.com.br"; 
const urlSite = "https://www.jraimobiliaria.com.br"; 
const urlFavicon = "https://www.jraimobiliaria.com.br/favicon/";
const urlFacebook = "";
const urlInstagram = "";
const titleSite = "Abuhassan Imóveis";
const descriptionDefault = "Imóvel Urbano e Rural";
const itensPorPagina = 12;
const headerFixed = true;
const scrollTopDist = 200;
const gaId = '';
const reloadTime = 5000;

const api = axios.create({    
    baseURL: apiUrl,        
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },    
});

const defaulTheme = {    
    navFixedWidth: '200px',
    navFixedTranform: '-200px',
    headerHeight: '165px',
    contentPrimaryHeaderHeight: '400px',
    contentSecondaryHeaderHeight: '100px',
    contentSecondaryHeaderHeightMobile: '60px',
    mapHeight: '250px',
    footerHeight: '255px',
}

const lightTheme = {    
    title: 'light',
    mainBackground: '#FFF',
    placeholderColor: 'rgb(128, 128, 128)',
    defaultColor: '#313131',
    mainColor: 'hsl(0,0%,50%)',   
    mainBorderColor: '#E9E9E9',
    primaryColor: '#EF0008',
    secondaryColor: '#5e5e5e',
    navColor: '#343434',
    navColorHover: '#343434',
    btnPrimaryColor: '#EF0008',
    btnPrimaryColorHover: '#222222',
    btnSecondaryColor: '#415c6e',
    btnSecondaryColorHover: '#222222',        
    navFixedBackground: '#F1F1F1',
    activeColor: '#EF0008',
    headerBackground: '#FFF',
    footerBackground: 'transparent',    
    bodyBackground: '#FFF',
    shadow: '0 4px 30px rgba(135,135,135,.4)',
    shadowHover: '0 4px 5px rgba(135,135,135,.4)',
    shadowSM: '0 4px 10px rgba(135,135,135,.4)',
    skeletonRoot: '#EBEBEB',
    skeletonAnimation: 'linear-gradient(90deg, rgba(255,255,255, 0) 0, rgba(255,255,255, .2) 25%, rgba(255,255,255, .3) 50%, rgba(255,255,255, .2) 75%, rgba(255,255,255, .0) 100%);',
}
const darkTheme = {
    title: 'dark',    
    mainBackground: '#33302D',
    placeholderColor: 'rgb(128, 128, 128)',
    defaultColor: '#33302D',
    mainColor: 'rgba(255,255,255,.7)',   
    mainBorderColor: '#D2AE70', 
    primaryColor: '#33302D',
    secondaryColor: 'rgba(255,255,255,.75)',
    navColor: '#FFFFFF',
    navColorHover: '#FFFFFF',
    btnPrimaryColor: '#D2AE70',
    btnPrimaryColorHover: '#BB9F66',
    btnSecondaryColor: '#8A8149',
    btnSecondaryColorHover: '#7D7542',    
    navFixedBackground: '#F1F1F1',
    activeColor: '#D2AE70',    
    headerBackground: '#33302D',        
    footerBackground: 'transparent',    
    bodyBackground: '#FFFFFF',
    shadow: '0 4px 5px rgba(0,0,0,.3)',
    shadowHover: '0 4px 30px rgba(0,0,0,.3)',
    shadowSM: '0 4px 10px rgba(0,0,0,.3)',    
    skeletonRoot: '#EBEBEB',
    skeletonAnimation: 'linear-gradient(90deg, rgba(255,255,255, 0) 0, rgba(255,255,255, .2) 25%, rgba(255,255,255, .3) 50%, rgba(255,255,255, .2) 75%, rgba(255,255,255, .0) 100%);',
}

const moneyFormatter = (valor) => { 
    // eslint-disable-next-line
    return parseFloat(valor).toFixed(2).replace('.',',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
}

const existsOrError = (value) => {
    if(!value) return false;
    if(Array.isArray(value) && value.length === 0) return false;
    if(typeof value === 'string' && !value.trim()) return false;

    return true;
}

const IsEmail = (email) => { 
    // eslint-disable-next-line
    var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;var check=/@[\w\-]+\./;var checkend=/\.[a-zA-Z]{2,3}$/;if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){return false;}else {return true;} 
}

const notify = (tipo, mensagem) => {

    if (tipo === 'sucesso') {
        toast.success(mensagem, {
            position: toast.POSITION.BOTTOM_RIGHT,
            //className: 'foo-bar',
            autoClose: 5000
        });            
    } else if (tipo === 'erro') {
        toast.error(mensagem, {
            position: toast.POSITION.BOTTOM_RIGHT,
            //className: 'foo-bar',
            autoClose: 5000
        });
    } else if (tipo === 'aviso') {
        toast.warn(mensagem, {
            position: toast.POSITION.BOTTOM_RIGHT,
            //className: 'foo-bar' ,
            autoClose: 5000
        });
    }

}

const isMobile = (celular) => {
    const numero = celular.replace('-', '').replace('(', '').replace(')', '').replace(' ', '').replace('_', '');
    const telefones_blacklist = ['000000000', '111111111','222222222','333333333','444444444','555555555','666666666','777777777','888888888','999999999'];
    let validaBlacklist = true;
    telefones_blacklist.forEach(function(valida){
            if(valida === numero.substr(2,9)){
                validaBlacklist = false;
                return false;
            }
        }
    );
    
    if(numero.length === 11 && numero.substr(2,1) === '9' && validaBlacklist){ 
        return true; 
    }else{ 
        return false;  
    } 
}

const handleUrl = (url) => {    
    const urlArr = url.replace('?','').split('&');
    const objeto = {}
    urlArr.map(item => {        
        if (item.split('=')[0] === "pg") {                    
            const value = item.split('=')[1];
            objeto["pagina"] = value;
        } else if (item.split('=')[0] === "ordenacao") {            
            const value = item.split('=')[1];
            objeto["ordenacao"] = value;
        }        
    });
    
    return objeto;
}

const buscaCidades = async (value) => {    
    const response = await api.post('',{ acoes: [{ metodo: "cidades", params: [ { registro: value }] }], id: apiId });
    return response.data ? response.data.cidades : false;
}

const buscaBairros = async (value) => {
    const response = await api.post('',{ acoes: [{ metodo: "bairros", params: [ { registro: value }] }], id: apiId });
    return response.data ? response.data.bairros : false;    
}

const buscaValores = async (value) => {
    const response = await api.post('',{ acoes: [{ metodo: "valores", params: [ { finalidade: value }] }], id: apiId });
    return response.data ? response.data.valores : false;    
}

const buscarPerfilCorretores = async () => {
    const response =  await api.post('',{ acoes: [{ metodo: "perfilcorretores", params: [ ] }], id: apiId });
   
    return response.data.perfilcorretores ? response.data.perfilcorretores : false;
}



function verificarCreci(creci){
   
    if (creci) {
        let result = creci.substr(-1).toUpperCase();
        if (result === 'J'){
           return "Nossos Corretores";
        }
        else{
          return "Perfil do Corretor";
        }
    }
    return '';
 }
 

export { 
    apiUrl,     
    apiId, 
    urlImgs, 
    urlSite,
    descriptionDefault,
    moneyFormatter, 
    existsOrError,     
    IsEmail, 
    isMobile, 
    notify, 
    titleSite, 
    itensPorPagina,    
    defaulTheme,
    lightTheme,
    darkTheme,
    api,
    buscarPerfilCorretores,
    verificarCreci,
    handleUrl,
    buscaCidades,
    buscaBairros,
    buscaValores,
    scrollTopDist,
    headerFixed,
    gaId,
    reloadTime,
    urlFavicon,
    urlFacebook,
    urlInstagram
}
