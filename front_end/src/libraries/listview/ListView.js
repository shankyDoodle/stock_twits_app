import React from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import { Tooltip, Button, Divider, Empty} from 'antd';

import './style-list-view.scss'

export class ListView extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLoadMoreClicked=()=>{
        this.props.loadMore()
    }

    getListNodes() {
        return this.props.items.map((item, index) => (
            <div key={item.id} className={"listNodeWrapper"}>
                <div className={"listNodeLabel " + (item.description ? "listNodeHeader" : "")}>{item.label}</div>
                {!item.description ? null:
                    <div className={"listNodeDesc"}>
                        <Tooltip title={item.description} mouseEnterDelay={0.5}>
                            {item.description}
                        </Tooltip>

                    </div>
                }
                <Divider/>
            </div>
        ))
    }

    getLoadMoreView(){
        if(!this.props.loadMore){
            return null;
        }

        return (
            <div className={"loadMoreContainer"}>
                <Button onClick={this.handleLoadMoreClicked}>Load More</Button>
            </div>
        )
    }

    getInnerView(){
        if(!this.props.items || !this.props.items.length){
            return <div className={"empty"}>
                <Empty/>
            </div>
        }

        return <>
            {this.getListNodes()}
            {this.getLoadMoreView()}
        </>

    }

    render() {
        return (
            <div className={"listViewContainer"}>
                {this.getInnerView()}
            </div>
        )
    }
}

ListView.propTypes={
    label:PropTypes.string,
    items:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        label:PropTypes.string,
        description:PropTypes.string,
    })),
    loadMore:PropTypes.func
}

function mapStateToProps(state) {
    return state;
}

const ConnectedView = connect(mapStateToProps, null)(ListView);
export default ConnectedView

