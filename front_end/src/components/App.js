import React from 'react'
import {connect} from "react-redux";

// import SymbolView from './SymbolView'

import { Layout } from 'antd';
const { Header} = Layout;


class App extends React.Component {
    render() {
        return(
            <div className={"appContainer"}>
                <Layout style={{minHeight: "100%"}}>
                    <Header className="header">
                        <div className={"app-name"} style={{fontSize: '25px', color: '#fff'}}> Orbis Systems</div>
                    </Header>

                    <div className={"screenContainer"}>
                        {/*<SymbolView/>*/}
                    </div>
                </Layout>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

const ConnectedView = connect(mapStateToProps, null)(App);
export default ConnectedView