import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
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
                    <div className="lane-name">{lane.name}</div>
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

    addNote = (e) => {
        const laneId = this.props.lane.id;
        const note = NoteActions.create({task: 'New task'});
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

    //addNote = () => {
    //    NoteActions.create({task: 'New task'});
    //}

    editNote = (id, e) => {
        e.stopPropagation();
        NoteActions.updating(id);
    }

    finishEditNote = (id, e) =>{
        e.stopPropagation();
        const task = e.target.value;
        NoteActions.update({id, task});
    }

    //deleteNote = (id, e) => {
    //    e.stopPropagation();
    //    NoteActions.delete(id);
    //}

}