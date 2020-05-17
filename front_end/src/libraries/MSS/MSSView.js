import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import './style-mss.scss'
import { Select, Tag} from 'antd';
const { Option } = Select;


export class MSSView extends React.Component {

    constructor(props) {
        super(props);
        this.selected = []
        this.customKey = ""
    }

    checkIfDropDownHidden(){
        let oDOM = document.getElementsByClassName("ant-select-dropdown")[0]
        return oDOM ? oDOM.classList.contains("ant-select-dropdown-hidden") : false;
    }

    handleChange=(values)=>{
        this.selected = values

        if(this.checkIfDropDownHidden() && this.props.onChangeBlur){
            this.props.onChangeBlur(this.selected)
            return
        }

        if(this.props.selectAll && values.includes("selectAll")){
            this.selected = this.props.childElements.map(item=>item.id);
            this.customKey = Math.random()
            this.handleBlur();
        }

        if (this.props.onChange) {
            this.props.onChange(this.selected);
        }
    }

    handleBlur=()=>{
        if(this.props.onBlur){
            this.props.onBlur(this.selected);
        }
    }

    handleKeyDown=(oEvent)=>{
        if(this.props.onEnterPress && oEvent.keyCode === 13){
            this.props.onEnterPress(oEvent.target.value);
            this.customKey = Math.random()
        }
    }

    getChildren(){
        const children = [];
        if(this.props.selectAll){
            let bIsDisabled = this.props.selected.length === this.props.childElements.length
            children.push(<Option disabled={bIsDisabled} key={"selectAll"} value={"selectAll"}>{"Select All"}</Option>);
        }

        for (let item of this.props.childElements) {
            let bIsDisabled = this.props.lengthLimit &&
                this.props.selected.length >= this.props.lengthLimit &&
                !this.selected.includes(item.id)
            children.push(<Option disabled={bIsDisabled} key={item.id} value={item.id}>{item.label}</Option>);
        }
        return children;
    }

    tagRender=(props)=> {
        const { label, value, closable, onClose } = props;
        return (
            <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
                {this.props.tagCount[value] !== undefined ? <div className={"tagCount"}>{this.props.tagCount[value]}</div> : null}
                <div className={"tagLabel"}>{label}</div>
            </Tag>
        );
    }

    render() {
        return (
            <div className={"mssViewWrapper"} key={this.customKey}>
                <div className={"mssLabel"}>{this.props.label}</div>
                <Select
                    allowClear={!!this.props.allowClear}
                    mode={!!this.props.isMultiple ? "multiple" : ""}
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={this.props.selected || []}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    disabled={this.props.disabled}
                    onInputKeyDown={this.handleKeyDown}
                    tagRender={this.props.tagCount ? this.tagRender : null}
                >
                    {this.getChildren()}
                </Select>
            </div>
        )
    }
}


MSSView.propTypes={
    label:PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onEnterPress: PropTypes.func,
    onChangeBlur: PropTypes.func,
    childElements: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        label:PropTypes.string
    })).isRequired,
    selected: PropTypes.array,
    isMultiple: PropTypes.bool,
    allowClear: PropTypes.bool,
    selectAll: PropTypes.bool,
    disabled: PropTypes.bool,
    tagCount: PropTypes.object,
    lengthLimit: PropTypes.number
}

function mapStateToProps(state) {
    return state;
}

const ConnectedView = connect(mapStateToProps, null)(MSSView);
export default ConnectedView