import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteEditable from './NoteEditable.jsx';
import LaneActions from './actions/LaneActions';
import NoteActions from './actions/NoteActions';
import NoteStore from './stores/NoteStore';
import ItemTypes from './constants/itemTypes';
import {DropTarget} from 'react-dnd';
import {Button} from 'react-bootstrap';
import $ from 'jquery';

const laneTarget = {
    hover(targetProps, monitor) {
        const targetLane = targetProps.lane;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
        if(!(targetLane.notes instanceof Array) || targetLane.notes.length<1) {
            targetProps.onMove({sourceId, targetLane});
        }
    }

};

@DropTarget(ItemTypes.NOTE, laneTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))
export default class Lane extends React.Component {
    render() {
        const {lane, connectDropTarget, onMove, ...props} = this.props;

        return (
            connectDropTarget(<div {...props}>
                <div className="lane-header">
                    <div className="lane-add-note">
                        <Button bsStyle="default" bsSize="small" onClick={this.addNote}> + </Button>
                    </div>
                    <NoteEditable className="lane-name"
                                  editing={lane.editing}
                                  value={lane.value}
                                  onEdit={this.editLaneName}
                                  onFinish={this.finishEditLaneName}
                    />
                    {!lane.editing ?
                        <div className="lane-delete">
                            <button onClick={this.deleteLane}>x</button>
                        </div> : ''}
                </div>
                <AltContainer
                    stores={[NoteStore]}
                    inject={{ notes: () => NoteStore.getNotesByIds(lane.notes) }}
                >
                    <Notes onEdit={this.editNote} onFinish={this.finishEditNote} onDelete={this.deleteNote} />
                </AltContainer>
            </div>)
        )
    }

    /* Lane operation START */
    editLaneName = (e) => {
        e.stopPropagation();
        LaneActions.updating(this.props.lane.id);
    }

    finishEditLaneName = (e) => {
        e.stopPropagation();
        const id = this.props.lane.id;
        const value = $.trim(e.target.value);
        if(value === ''){
            LaneActions.updating(this.props.lane.id);
            return;
        }
        LaneActions.update({id, value});
    }

    deleteLane = (e) => {
        let yes = confirm('确认删除?');
        if(!yes){
            return;
        }
        const lane = this.props.lane;
        const id = lane.id;
        const notes = lane.notes;
        LaneActions.delete(id);
        NoteActions.delete(notes); // noteIds in fact
    }
    /* Lane operation END */

    /* Notes operation START */
    addNote = (e) => {
        const laneId = this.props.lane.id;
        const note = NoteActions.create({value: 'New task'});
        LaneActions.attachToLane({
            noteId: note.id,
            laneId
        });
    }

    deleteNote = (noteId, e) => {
        e.stopPropagation();
        const laneId = this.props.lane.id;
        LaneActions.detachFromLane({laneId, noteId});
        NoteActions.delete(noteId);
    }

    editNote = (id, e) => {
        e.stopPropagation();
        NoteActions.updating(id);
    }

    finishEditNote = (id, e) =>{
        e.stopPropagation();
        const value = $.trim(e.target.value);
        if(value === ''){
            NoteActions.updating(id);
            return;
        }
        NoteActions.update({id, value});
    }
    /* Notes operation END */

}