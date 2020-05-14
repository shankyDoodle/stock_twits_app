import React from 'react';

import MSSView from "../libraries/MSS/MSSView";
import {bindActionCreators} from "redux";
import * as appActions from "../actions";
import {connect} from "react-redux";

class SymbolSelectionView extends React.Component {

    createDropDownListModel(data) {
        let list = []
        for (let key in data) {
            let oData = data[key];
            list.push({id: oData.id, label: oData.label})
        }
        return list;
    }

    handleClassificationDropDownOnBlur = (selectedItems) => {
        console.log(selectedItems);
        // this.props.dispatch(appActions.handleClassificationCreateButtonCLickedServerCall(selectedItems));
    }

    getSymbolDropdownView() {
        let aDropDownListModel = this.createDropDownListModel(this.props.symbolList)
        return <MSSView
            key={"SYMBOLS"}
            label={"Symbols"}
            childElements={aDropDownListModel}
            onBlur={this.handleClassificationDropDownOnBlur}
            isMultiple={true}
            allowClear={true}
            selected={this.props.selectedSymbols || []}
            selectAll={true}/>
    }

    render() {
        return (
            <div className={"symbolSelectionContainer"}>
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
