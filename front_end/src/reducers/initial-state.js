
let initialState = {
    symbolList:[],
    selectedSymbols:[]
}

export const defaultState = initialState;

export const getInitialState = function () {
    return {
        ...initialState,
    }
}