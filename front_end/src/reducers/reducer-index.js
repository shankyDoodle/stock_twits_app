import {getInitialState, defaultState} from "./initial-state";

import * as appActions from '../actions'
import {HANDLE_SYMBOL_DROP_DOWN_ON_CHANGE} from "../actions";

function resetToInitialState(oRet) {
    Object.assign(oRet, {...defaultState});
}

const _successFetchSymbolListFromServer =(state, symbolList)=>{
    return {
        ...state,
        symbolList
    }
}

const _handleDropDownOnChange = (state, selectedSymbols) => {
    return {
        ...state,
        selectedSymbols
    }
}

const _handleCreateNewSymbol = (state, newSymbol) => {
    let uppercase = newSymbol.toUpperCase();
    let oRet = {
        ...state
    }

    if (!state.selectedSymbols.includes(uppercase)) {
        let newSelected = [...state.selectedSymbols, uppercase];
        oRet = {
            ...oRet,
            selectedSymbols: newSelected
        }
    }

    if (!state.symbolList.findIndex(oD => oD.id === uppercase)) {
        let newSymbolList = [...state.symbolList, {id: uppercase, symbol: uppercase, name: ""}]
        oRet = {
            ...oRet,
            symbolList: newSymbolList
        }
    }

    return oRet
}

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case appActions.SUCCESS_FETCH_SYMBOL_LIST:
            return _successFetchSymbolListFromServer(state, action.symbolList);

        case appActions.HANDLE_SYMBOL_DROP_DOWN_ON_CHANGE:
            return _handleDropDownOnChange(state, action.selectedSymbols)

        case appActions.HANDLE_NEW_SYMBOL_CREATE:
            return _handleCreateNewSymbol(state, action.newSymbol)

        default:
            return state
    }
}