import URLMappings from "./axios-url-mappings"
import axios from 'axios'


export const SUCCESS_HANDLE_SYMBOL_DROP_DOWN_ON_BLUR = 'SUCCESS_HANDLE_SYMBOL_DROP_DOWN_ON_BLUR';
export const SUCCESS_FETCH_SYMBOL_LIST = 'SUCCESS_FETCH_SYMBOL_LIST';


const handleServerFailure= function (error) {
    console.log(error);
}

export const successHandleSymbolDropDownOnBlur=(dropdownButtonType, selectedItems)=>({
  type: SUCCESS_HANDLE_SYMBOL_DROP_DOWN_ON_BLUR,
  dropdownButtonType: dropdownButtonType,
  selectedItems:selectedItems
})

const successFetchSymbolListFromServer = (symbolList)=>({
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

export function handleSymbolDropDownOnBlur(selectedCustomerIds) {
  return dispatch => {
    return axios.post(URLMappings.GetSelectedSymbolData,  {selectedSymbolIds:selectedCustomerIds})
        .then(res => {
          dispatch(successHandleSymbolDropDownOnBlur(res.data));
        }).catch(e => dispatch(handleServerFailure(e)));
  };
}