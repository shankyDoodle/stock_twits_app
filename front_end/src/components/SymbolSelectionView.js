import React from 'react';

import MSSView from "../libraries/MSS/MSSView";
import {bindActionCreators} from "redux";
import * as appActions from "../actions";
import {connect} from "react-redux";

class SymbolSelectionView extends React.Component {

    createDropDownListModel(data) {
        return data.map(oData=>{ return {id: oData.id, label: oData.symbol}})
    }

    handleClassificationDropDownOnBlur = (selectedItems) => {
        console.log(selectedItems);
        // this.props.dispatch(appActions.handleClassificationCreateButtonCLickedServerCall(selectedItems));
    }

    getSymbolDropdownView() {
        let aDropDownListModel = this.createDropDownListModel(this.props.symbolList)
        return <MSSView
            key={"SYMBOLS"}
            childElements={aDropDownListModel}
            onBlur={this.handleClassificationDropDownOnBlur}
            isMultiple={true}
            allowClear={true}
            selected={this.props.selectedSymbols || []}/>
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
