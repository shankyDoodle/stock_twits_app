import React from "react";

import { Tabs } from 'antd';
const { TabPane } = Tabs;

class TabView extends React.Component {

    render() {
        return (
            <div className={"tabViewWrapper card-container"}>
                <Tabs type="card">
                    <TabPane tab={this.props.label} key="1">
                        {this.props.body}
                    </TabPane>
                </Tabs>
            </div>
        )

    }
}

export default TabView;