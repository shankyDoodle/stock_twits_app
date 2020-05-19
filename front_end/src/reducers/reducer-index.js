import {getInitialState} from "./initial-state";

import * as appActions from '../actions'
import ShowMessage from "../libraries/message/Message";

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

const _createOrUpdateCountMap=(oMap, selectedSymbols, messages)=>{
    messages.forEach(message=>{
        message.symbols.forEach(sym=>{
            if(selectedSymbols.includes(sym.symbol)){
                oMap[sym.symbol] = oMap[sym.symbol] ? oMap[sym.symbol]+1 : 1;
            }
        });
    })
}

const _arraysEqual =(a, b)=> {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    let a2 = [...a].sort()
    let b2 = [...b].sort()
    for (let i = 0; i < a.length; ++i) {
        if (a2[i] !== b2[i]) return false;
    }
    return true;
}

const _successHandleSymbolDropDownOnBlur = (state, messagesData) =>{
    let messages = messagesData.message || [];
    let since = messagesData.cursor.since;
    let max = messagesData.cursor.max;
    let isMore = messagesData.cursor.more;

    //no change in data
    if(
        state.since === since &&
        state.max === max &&
        _arraysEqual(state.selectedSymbols, messagesData.selectedIdsSentToServer)
    ){
        return {...state}
    }

    let selectedSymbols = messagesData.nothingSelected ? [] : state.selectedSymbols;
    let countMap = {}
    selectedSymbols.forEach(sym=>{
        countMap[sym] = 0
    })
    _createOrUpdateCountMap(countMap, selectedSymbols, messages)

    if(!messagesData.emptyLoad){
        ShowMessage("List updated successfully")
    }
    return {
        ...state,
        messages,
        since,
        max,
        isMore,
        countMap,
        isLoading:false,
        selectedSymbols
    }
}

const _setLoadingTruthy = (state) => {
    return{
        ...state,
        isLoading:true
    }
}

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case appActions.SUCCESS_FETCH_SYMBOL_LIST:
            return _successFetchSymbolListFromServer(state, action.symbolList);

        case appActions.HANDLE_SYMBOL_DROP_DOWN_ON_CHANGE:
            return _handleDropDownOnChange(state, action.selectedSymbols)

        case appActions.HANDLE_NEW_SYMBOL_CREATE:
            return _handleCreateNewSymbol(state, action.newSymbol)

        case appActions.SUCCESS_HANDLE_SYMBOL_DROP_DOWN_ON_BLUR:
            return _successHandleSymbolDropDownOnBlur(state, action.messagesData)

        case appActions.SET_LOADING_TRUTHY:
            return _setLoadingTruthy(state)

        default:
            return state
    }
}