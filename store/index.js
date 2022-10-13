import { createStore } from 'redux';

const INITIAL_STATE = {
    data: {},
    open: false,
    active: false,
    dark: false
}

function datas(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_DATA':
            return { ...state, data: { ...state.data, ...action.dados } }; 
        case 'ADD_OPEN':
            return { ...state, open: action.show }; 
        case 'ADD_ACTIVE':
            return { ...state, active: action.show }; 
        case 'ADD_THEME':
            return { ...state, theme: action.type }; 
        default:
            return state;
    }    
}

const store = createStore( datas );

export default store;