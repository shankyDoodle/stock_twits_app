
let initialState = {
    symbolList:[],
    selectedSymbols:[],
    messages:[],
    since:null,
    max:null,
    isMore:false,
    isLoading:false,
    countMap:null
}

// export const defaultState = initialState;

export const getInitialState = function () {
    return {
        ...initialState
    }
}