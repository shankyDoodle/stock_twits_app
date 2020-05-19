import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import ListView from "../libraries/listview/ListView";

class SymbolListView extends React.Component {

    handleLoadMoreClick(){
        console.log("handleLoadMoreClick");
    }

    prepareListViewModel() {
        let _this = this;
        let items = this.props.messages.map(oMess=>{
            let symbols = oMess.symbols;
            let temp = [];
            symbols.forEach(oS => {
                if (_this.props.selectedSymbols.includes(oS.symbol)) {
                    temp.push(oS.symbol);
                }
            })
            let found = temp.join(",");

            return{
                id:oMess.id,
                label: found,
                description:oMess.body,
            }
        })
        return {
            items: items,
            loadMore: this.handleLoadMoreClick
        }
    }

    getSymbolListView(){
        let listViewModel = this.prepareListViewModel();
        return(
            <ListView
                items={listViewModel.items}
                loadMore={null}
            />
        )
    }

    render() {
        return (
            <div className={"symbolListContainer"}>
                <div className={"sectionLabel"}>Messages</div>
                <div className={"listContainer"}>
                    {this.getSymbolListView()}
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

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(SymbolListView);
export default ConnectedView
