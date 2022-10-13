import React from 'react';

export default props => {    
    return (
        <div className={`skeleton-root ${ props.className && props.className }`} style={{ width: props.width, height: props.height }}></div>        
    );    
}
