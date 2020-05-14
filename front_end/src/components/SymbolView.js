import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import TabView from "../libraries/tabview/TabView";
import SymbolSelectionView from "./SymbolSelectionView"

import * as appActions from "../actions";

export class SymbolView extends React.Component {

    componentDidMount() {
        this.props.dispatch(appActions.fetchSymbolListFromServer());
    }

    render() {
        return (
            <div className={"symbolScreen"}>
                <div className={"leftPanel"}>
                    <SymbolSelectionView/>
                </div>
                <div className={"rightPanel"}>
                    Right Panel Data
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

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(SymbolView);
export default ConnectedView
