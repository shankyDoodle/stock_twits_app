import React from 'react';
import {Spin} from "antd";
import PropTypes from 'prop-types';

import './style-spin-view.scss'

export function SpinView(props) {
    return (
        <Spin spinning={props.spinning} size="large">
            {props.body}
        </Spin>
    );
}

SpinView.propTypes = {
    body:PropTypes.object,
    spinning: PropTypes.bool
}