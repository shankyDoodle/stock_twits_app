import {getInitialState, defaultState} from "./initial-state";

import * as appActions from '../actions'

function resetToInitialState(oRet) {
    Object.assign(oRet, {...defaultState});
}

const _successFetchSymbolListFromServer =(state, symbolList)=>{
    return {
        ...state,
        symbolList
    }
}

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case appActions.SUCCESS_FETCH_SYMBOL_LIST:
            return _successFetchSymbolListFromServer(state, action.symbolList);

        default:
            return state
    }
}