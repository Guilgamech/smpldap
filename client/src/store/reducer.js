import * as actionTypes from './action';

const initialState = {
    search:''
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_USER:
            return {
                ...state,
                search: action.search
            };    
        default:
            return state;
    }
};

export default reducer;