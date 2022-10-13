import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import Select from 'react-select';
import Slider from 'rc-slider';
import NumberFormat from 'react-number-format';
import QueryString from 'querystring';

import { buscaCidades, buscaBairros, buscaValores, existsOrError } from '../../utils';

const Range = Slider.Range;

export default function ContentHeader(props) {

    // eslint-disable-next-line
    const storage = useSelector(state => state.data);

    // eslint-disable-next-line
    const [ loading, setLoading ] = useState(false);
    const [ formulario, setFormulario ] = useState({finalidade: '',tipo: '',uf: '',cidade: '',bairro: '',valorde: '',valorate: '',})
    
    // eslint-disable-next-line
    const [finalidade, setFinalidade] = useState([]);
    const [tipoImovel, setTipoImovel] = useState([]);
    const [uf, setUf] = useState([]);
    const [cidade, setCidade] = useState([{ value: '', label: 'Selecione' }]);
    const [bairro, setBairro] = useState([{ value: '', label: 'Selecione' }]);
    
    const [ valores, setValores ] = useState({});
    const [ slideValue, setSlideValue ] = useState([]);
    const [valorMin, setvalorMin] = useState(0);    
    const [valorMax, setvalorMax] = useState(100);
     

    useEffect(() => {
        if (Object.keys(storage).length > 0) {
            getValores();
        }
    },[]);

    const refStorage = useRef(true);
    useEffect(() => {        
        if (refStorage.current) { 
            refStorage.current = false;
            return; 
        }
        getValores();
    },[storage]);

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
    }    
    
    useEffect(() => {
        setFormulario({ ...formulario, valorde: valores.min, valorate: valores.max });               
    },[valores]);
    
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
            const response = await buscaCidades(valor);            
            setCidade(response); 
        } else if (tipo === 'cidade') {
            setFormulario({ ...formulario, cidade: valor });
            setBairro([{value: '', label: 'Carregando'}]);
            const response = await buscaBairros(valor);            
            setBairro(response);
        } else if (tipo === 'bairro') {
            setFormulario({ ...formulario, bairro: valor });            
        } 

    }    

    function handleSlideChange(values) {
        setSlideValue([ values.min, values.max ]);
        setValores({ min: values.min, max: values.max });
    }

    function handleSubmit() {
        setLoading(true);            
        props.routes.history.push(`/busca?${QueryString.stringify(formulario)}`);
    }
    
    return (
        
        <div className="content-header-primary">
        
            <div className="container py-4">                
               
                <div className="content-search shadow">
                    <form className="d-flex flex-column h-100">
                        
                        <h2 className="font-24 m-0 pb-3 color-primary">Encontre no Site</h2>
                    
                        <div className="flex-grow-1">
                            <div className="row">
                                
                                <div className="col-12 pb-2 mb-1">
                                    <Select className="select" classNamePrefix="react-select" placeholder="FINALIDADE" onChange={e => handleOptionChange('finalidade',e.value)} options={finalidade} />
                                </div>

                                <div className="col-12 pb-2 mb-1">
                                    <Select className="select" classNamePrefix="react-select" placeholder="TIPO DO IMÓVEL" onChange={e => handleOptionChange('tipo',e.value)} options={tipoImovel} /> 
                                </div>

                                <div className="col-12 col-md-4 pb-2 mb-1 pr-3 pr-md-0">
                                    <Select className="select" classNamePrefix="react-select" placeholder="UF" onChange={e => handleOptionChange('uf',e.value)} options={uf} />
                                </div>

                                <div className="col-12 col-md-8 pb-2 mb-1 pl-3 pl-md-0">
                                    <Select className="select" classNamePrefix="react-select" placeholder="CIDADE" onChange={e => handleOptionChange('cidade',e.value)} options={cidade} />
                                </div>

                                <div className="col-12 pb-2 mb-2">
                                    <Select className="select" classNamePrefix="react-select" placeholder="BAIRRO" onChange={e => handleOptionChange('bairro',e.value)} options={bairro} />                                        
                                </div>

                                <div className="col-12 pb-2 mb-1 " >
                                    
                                    <label className="d-block font-12 pb-1 imputValorDesejado"><b>VALOR DESEJADO</b></label>  
                                    
                                    <div>
                                        <Range allowCross={false}  min={valorMin} max={valorMax} value={slideValue} onChange={e => handleSlideChange({min: e[0], max: e[1]})} /> 
                                        <div className="d-flex justify-content-between font-12 pt-3 pb-1 text-center">
                                            <NumberFormat disabled className="bg-transparent w-50 font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={valores.min} />
                                            <NumberFormat disabled className="bg-transparent w-50 text-right font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={valores.max} />                                            
                                        </div>  
                                    </div>
                                    

                                </div>                               

                            </div>
                        </div>
                        
                        <button type="button" className="btn btn-primary font-weight-bold font-14 w-100 py-3" onClick={() => handleSubmit()} disabled={ loading ? true : false }>
                            { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                            { loading ? 'BUSCANDO' : 'BUSCAR AGORA' }
                        </button>

                    </form>
                </div>

            </div>
                
        </div>
        
    );
    
}
