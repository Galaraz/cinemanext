import React from 'react';

export default function Map(props) {   

    function handleClick() {        
        window.open(`https://www.google.com/maps?q=${props.latitude},${props.longitude}`,'_blank');        
    }

    return (
        <div>
            <div className="mapa d-flex justify-content-center align-items-center">                
                
                { (props.latitude && props.longitude) ? <button type="button" onClick={() => handleClick()} className="btn btn-secondary shadow-sm text-white font-14 px-5 py-2 m-0"><b>VER NO MAPA</b></button> : '' }

            </div>
        </div>
    );

}
