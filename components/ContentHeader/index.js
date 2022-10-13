import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import Slider from 'rc-slider';
import Select from 'react-select';
import QueryString from 'querystring';

import Search from '../../assets/img/search.svg';

import { buscaCidades, buscaBairros, buscaValores, existsOrError } from '../../utils';


const Range = Slider.Range;
export default function ContentHeader(props) {

   
    const storage = useSelector(state => state.data);

    const [ show, setShow ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ formulario, setFormulario ] = useState({ finalidade:'' , tipo:'', uf:'' , cidade: '', bairro: '', valorde: '', valorate: '' });
    const [ finalidade, setFinalidade ] = useState([ ]);
    const [ tipoImovel, setTipoImovel ] = useState([]);
    const [ uf, setUf ] = useState([]);
    const [ cidade, setCidade ] = useState([{ value: '', label: 'CIDADE' }]);        
    const [ bairro, setBairro ] = useState([{ value: '', label: 'BAIRRO' }]);

    const [ valores, setValores ] = useState({});
    const [ slideValue, setSlideValue ] = useState([]);
    const [valorMin, setvalorMin] = useState(0);    
    const [valorMax, setvalorMax] = useState(100);


    
    const formularioSelecionados = {
        finalidade: finalidade?.filter(item => item.value == formulario.finalidade),
        tipoImovel: tipoImovel?.filter(item => item.value == formulario.tipo),
        uf: uf?.filter(item => item.value == formulario.uf),
        cidade: cidade?.filter(item => item.value == formulario.cidade),
        bairro: bairro?.filter(item => item.value == formulario.bairro),
        
    } 
    // useEffect(() => {
        
    // },[finalidade ,tipoImovel,uf,cidade,bairro])
    
    useEffect(() => {
       getValores();
        if (props.dadosFiltrados)  setFormulario(props.dadosFiltrados)  ;
        // if (props.dadosFiltrados.uf) getCidade(props.dadosFiltrados.uf);
        // if (props.dadosFiltrados.cidade) getBairro(props.dadosFiltrados.cidade); 
    },[show]); 
    
    const refStorage = useRef(true);
    useEffect(() => {        
        if (refStorage.current) { refStorage.current = false;return; }
        getValores();
    },[storage ]);

 
    function handleSlideChange(values) {
        setSlideValue([ values.min, values.max ]);
        setValores({ min: values.min, max: values.max });
    }
    function getValores() {
        setFinalidade(storage.finalidades);
        setTipoImovel(storage.tipoimoveis);
        setUf(storage.estados);
        
        if (existsOrError(storage.valores)) {
            setValores({ min: parseInt(storage.valores.valor_minimo), max: parseInt(storage.valores.valor_maximo) });   
            setSlideValue([ parseInt(storage.valores.valor_minimo), parseInt(storage.valores.valor_maximo) ])        
            setvalorMin(parseInt(storage.valores.valor_minimo));
            setvalorMax(parseInt(storage.valores.valor_maximo));
            
        } 
        if (formulario.uf) getCidade(formulario.uf);
        if (formulario.cidade) getBairro(formulario.cidade);        
    }    
    
    useEffect(() => {
        setFormulario({ ...formulario, valorde: valores.min, valorate: valores.max });               
    },[valores]);

    async function getCidade(valor) {
        const response = await buscaCidades(valor);         
        response.unshift({value:'',label:'CIDADE'});
        setCidade(response); 
    }

    async function getBairro(valor) {
        const response = await buscaBairros(valor);            
        response.unshift({value:'',label:'BAIRRO'});
        setBairro(response); 
    }

    async function handleOptionChange(tipo, valor) {
        
        if (tipo === 'finalidade') {
            const response = await buscaValores(valor);                        
            setValores({ min: parseInt(response.valor_minimo), max: parseInt(response.valor_maximo) });   
            setSlideValue([ parseInt(response.valor_minimo), parseInt(response.valor_maximo) ])            
            setvalorMin(parseInt(response.valor_minimo));
            setvalorMax(parseInt(response.valor_maximo));
            setFormulario({ ...formulario, finalidade: valor });
        } else if (tipo === 'tipo') {
            setFormulario({ ...formulario, tipo: valor });
        } else if (tipo === 'uf') {
            setFormulario({ ...formulario, uf: valor });
            setCidade([{value: '', label: 'Carregando'}]);
            getCidade( valor )
        } else if (tipo === 'cidade') {
            setFormulario({ ...formulario, cidade: valor });
            setBairro([{value: '', label: 'Carregando'}]);
                      
            getBairro(valor);
        } else if (tipo === 'bairro') {
            setFormulario({ ...formulario, bairro: valor });            
        } 
    }

    async function handleSubmit() {
        setLoading(true); 
            props.busca ?  props.callbackchage(formulario)
                :
            props.routes.history.push(`/busca?${QueryString.stringify(formulario)}`);
           
        setLoading(false);
        setShow(false);
    }    
    
    const handleClose = () => setShow(false);
    const handleShow  = () => setShow(true);

    return (
        <>
        <div className="content-header">        
            <div className="d-flex align-items-center justify-content-between container py-4">
                <h1 className="font-20 font-md-28 text-center text-md-left m-0 text-white">{props.title}</h1> 
                <button onClick={handleShow} className={`p-1 m-0 bg-transparent border-0${props.noSearch ? ' d-block d-md-none' : ''}`}>
                    <img src={Search} width="25" height="25" />
                </button>
            </div>                
        </div>
        <Modal className="modal-style" centered show={show} onHide={handleClose}>          
            <Modal.Body className="p-4">          
                <h2 className="font-24 m-0 pb-3">Encontre no Site</h2>      
                <div className="row py-2">
                                
                    <div className="col-12 pb-2 mb-1">
                        <Select className="select" classNamePrefix="react-select" value={formularioSelecionados.finalidade} onChange={e => handleOptionChange('finalidade',e.value)}  placeholder="FINALIDADE"   options={finalidade} />
                    </div>

                    <div className="col-12 pb-2 mb-1">
                        <Select className="select" classNamePrefix="react-select" value={formularioSelecionados.tipoImovel} placeholder="TIPO DO IMÓVEL" onChange={e => handleOptionChange('tipo',e.value)} options={tipoImovel} /> 
                    </div>

                    <div className="col-12 col-md-4 pb-2 mb-1 pr-3 pr-md-0">
                        <Select className="select" classNamePrefix="react-select" value={formularioSelecionados.uf}  placeholder="UF" onChange={e => handleOptionChange('uf',e.value)} options={uf} />
                    </div>

                    <div className="col-12 col-md-8 pb-2 mb-1 pl-3 pl-md-0">
                        <Select className="select" classNamePrefix="react-select" value={formularioSelecionados.cidade}  placeholder="CIDADE" onChange={e => handleOptionChange('cidade',e.value)} options={cidade} />
                    </div>

                    <div className="col-12 pb-2 mb-2">
                        <Select className="select" classNamePrefix="react-select" value={formularioSelecionados.bairro} placeholder="BAIRRO" onChange={e => handleOptionChange('bairro',e.value)} options={bairro} />                                        
                    </div>

                    <label className="d-block font-12 col-12 pb-2 "><b className="imputValorDesejado">VALOR DESEJADO</b></label>  
                                
                        <div className="col-12 pb-2 mb-2 rageStyleMobile">
                            <Range allowCross={false}  min={valorMin} max={valorMax} value={slideValue} onChange={e => handleSlideChange({min: e[0], max: e[1]})} /> 
                            <div className="d-flex justify-content-between font-12 pt-3 pb-1 text-center">
                                <NumberFormat disabled className="bg-transparent w-50 font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={formulario.valorde} />
                                <NumberFormat disabled className="bg-transparent w-50 text-right font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={formulario.valorate} />                                            
                            </div>  
                        </div>

                </div>
                
                <button type="button" className="btn btn-primary font-weight-bold font-14 w-100 px-4 py-3 shadow" onClick={() => handleSubmit()} disabled={ loading ? true : false }>
                    { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                    { loading ? 'BUSCANDO' : 'BUSCAR AGORA' }
                </button>   
                                                                    
            </Modal.Body>
        </Modal>

        </>
        
    );
    
}
