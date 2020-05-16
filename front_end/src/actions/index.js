import URLMappings from "./axios-url-mappings"
import axios from 'axios'


export const HANDLE_SYMBOL_DROP_DOWN_ON_CHANGE = 'HANDLE_SYMBOL_DROP_DOWN_ON_CHANGE';
export const HANDLE_NEW_SYMBOL_CREATE = 'HANDLE_NEW_SYMBOL_CREATE';
export const SUCCESS_HANDLE_SYMBOL_DROP_DOWN_ON_BLUR = 'SUCCESS_HANDLE_SYMBOL_DROP_DOWN_ON_BLUR';
export const SUCCESS_FETCH_SYMBOL_LIST = 'SUCCESS_FETCH_SYMBOL_LIST';


const handleServerFailure= function (error) {
    console.log(error);
}


export const handleDropDownOnChange=(selectedSymbols)=>({
    type: HANDLE_SYMBOL_DROP_DOWN_ON_CHANGE,
    selectedSymbols: selectedSymbols
})

export const handleCreateNewSymbol=(newSymbol)=>({
    type: HANDLE_NEW_SYMBOL_CREATE,
    newSymbol: newSymbol
})

export const successHandleSymbolDropDownOnBlur = (messagesData) => ({
    type: SUCCESS_HANDLE_SYMBOL_DROP_DOWN_ON_BLUR,
    messagesData: messagesData
})

const successFetchSymbolListFromServer = (symbolList) => ({
    type: SUCCESS_FETCH_SYMBOL_LIST,
    symbolList: symbolList
})


export function fetchSymbolListFromServer() {
    return dispatch => {
        return axios.get(URLMappings.GetSymbolList)
            .then(res => {
                dispatch(successFetchSymbolListFromServer(res.data));
            }).catch(e => dispatch(handleServerFailure(e)));
    };
}

export function handleDropDownOnBlur(selectedCustomerIds) {
    return dispatch => {
        return axios.get(URLMappings.GetSelectedSymbolData, {params:{symbols: selectedCustomerIds}})
            .then(res => {
                dispatch(successHandleSymbolDropDownOnBlur(res.data));
            }).catch(e => dispatch(handleServerFailure(e)));
    };
}