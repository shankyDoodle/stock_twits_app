import React from 'react';

import MSSView from "../libraries/MSS/MSSView";
import {bindActionCreators} from "redux";
import * as appActions from "../actions";
import {connect} from "react-redux";

class SymbolSelectionView extends React.Component {

    componentDidMount() {
        setInterval(this.getData, 5000); // runs every 5 seconds.
    }

    checkIfDropDownHidden(){
        let oDOM = document.getElementsByClassName("ant-select-dropdown")[0]
        return oDOM ? oDOM.classList.contains("ant-select-dropdown-hidden") : false;
    }

    getData=()=>{
        if(!this.checkIfDropDownHidden()) return;

        let selectedSymbols = this.props.selectedSymbols
        this.props.dispatch(appActions.handleAutoReload(selectedSymbols));
    }

    createDropDownListModel(data) {
        return data.map(oData=>{ return {id: oData.id, label: oData.symbol}})
    }

    handleDropDownOnBlur = (selectedSymbols) => {
        this.props.dispatch(appActions.setLoadingTruthy());
        this.props.dispatch(appActions.handleDropDownOnBlur(selectedSymbols));
    }

    handleDropDownOnChange=(selectedSymbols)=>{
        this.props.dispatch(appActions.handleDropDownOnChange(selectedSymbols));
    }

    handleCreateNewSymbol=(newSymbol)=>{
        let selectedSymbols = [...this.props.selectedSymbols, newSymbol]
        this.props.dispatch(appActions.setLoadingTruthy());
        this.props.dispatch(appActions.handleCreateNewSymbol(newSymbol));
        this.props.dispatch(appActions.handleDropDownOnBlur(selectedSymbols));
    }

    handleSymbolRemoved=(selectedSymbols)=>{
        this.props.dispatch(appActions.setLoadingTruthy());
        this.props.dispatch(appActions.handleSymbolRemoved(selectedSymbols));
    }

    getSymbolDropdownView() {
        let aDropDownListModel = this.createDropDownListModel(this.props.symbolList)
        return <MSSView
            key={"SYMBOLS"}
            childElements={aDropDownListModel}
            onBlur={this.handleDropDownOnBlur}
            onChange={this.handleDropDownOnChange}
            onEnterPress={this.handleCreateNewSymbol}
            onChangeBlur={this.handleSymbolRemoved}
            isMultiple={true}
            tagCount={this.props.countMap}
            lengthLimit={10}
            selected={this.props.selectedSymbols}/>
    }

    render() {
        return (
            <div className={"symbolSelectionContainer"}>
                <div className={"sectionLabel"}>Symbols</div>
                <div className={"dropDownsContainer"}>
                    {this.getSymbolDropdownView()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({});
    return {...actions, dispatch};
}

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(SymbolSelectionView);
export default ConnectedView
