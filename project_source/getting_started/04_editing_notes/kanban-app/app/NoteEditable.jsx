import React from 'react';

export default class NoteEditable extends React.Component {

    render(){
        const {value, editing, onEdit, onFinish, onDelete, ...props} = this.props;

        return (
            <div {...props}>
                {editing? this.renderEditable() : this.renderValue()}
                <button className="delete-note" onClick={onDelete}>x</button>
            </div>
        );
    }

    renderEditable = () => {
        return <input className="note-input" type="text" onBlur={this.props.onFinish} defaultValue={this.props.value} autoFocus={true}
           ref={ (e) => e ? e.selectionStart = 0/*this.props.value.length*/ : null }
        />
    }

    renderValue = () => {
        return <span className="note" onDoubleClick={this.props.onEdit}>{this.props.value}</span>
    }

}