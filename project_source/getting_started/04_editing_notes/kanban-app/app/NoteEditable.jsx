import React from 'react';

export default class NoteEditable extends React.Component {

    render(){
        const {value, editing, onEdit, onFinish, onDelete, arrow, ...props} = this.props;

        return (
            <div {...props}>
                {arrow}
                {editing? this.renderEditable() : this.renderValue()}
                {(onDelete && !editing)? <button className="delete-btn" onClick={onDelete}>x</button> : ''}
            </div>
        );
    }

    renderEditable = () => {
        return <input className="note-input" type="text" onBlur={this.props.onFinish} defaultValue={this.props.value} autoFocus={true} onKeyDown={this.onKeyDownHandler.bind(null, this.props.onFinish)}
           ref={ (e) => e ? e.selectionStart = 0/*this.props.value.length*/ : null }
        />
    }

    renderValue = () => {
        return <span className="note" onDoubleClick={this.props.onEdit}>{this.props.value}</span>
    }

    onKeyDownHandler = (onFinish=()=>{}, e) => {
        let keyPressed = '';
        if(e.keyCode) {
            keyPressed = e.keyCode;
        }else{
            return;
        }
        if(keyPressed === 13){ // 回车
            onFinish(e);
        }
    }

}