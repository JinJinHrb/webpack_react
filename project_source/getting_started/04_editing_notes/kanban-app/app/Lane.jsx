import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteEditable from './NoteEditable.jsx';
import LaneActions from './actions/LaneActions';
import NoteActions from './actions/NoteActions';
import NoteStore from './stores/NoteStore';

export default class Lane extends React.Component {
    render() {
        const {lane, ...props} = this.props;

        return (
            <div {...props}>
                <div className="lane-header">
                    <div className="lane-add-note">
                        <button onClick={this.addNote}>+</button> </div>
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
            </div>
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
        const value = e.target.value;
        LaneActions.update({id, value});
    }

    deleteLane = (e) => {
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
        const value = e.target.value;
        NoteActions.update({id, value});
    }
    /* Notes operation END */

}