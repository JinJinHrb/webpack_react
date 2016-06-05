import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';
import NoteStore from './NoteStore';

class LaneStore {
    constructor(){
        this.bindActions(LaneActions);

        this.lanes = [];
    }

    create(lane){
        const lanes = this.lanes;

        lane.id = uuid.v4();
        lane.notes = lane.notes || [];

        this.setState({
            lanes: lanes.concat(lane)
        });
    }

    updating(laneId){
        const lanes = this.lanes.map(lane => {
            if(lane.id === laneId){
                lane.editing = true;
            }
            return lane;
        });

        this.setState({lanes});
    }

    update(updatedLane){
        const lanes = this.lanes.map(lane => {
            if(lane.id === updatedLane.id){
                lane.editing = false;
                return Object.assign({}, lane, updatedLane);
            }
            return lane;
        });

        this.setState({lanes});
    }

    delete(laneId){
        let noteIds = [];
        const lanes = this.lanes.filter(lane => {
            if(lane.id === laneId){
                let notes = lane.notes || [];
                notes.forEach(note => {
                    noteIds.push(note.id);
                });
                return false;
            }
            return true;
        });
        this.setState({lanes});
    }

    attachToLane({laneId, noteId}) {
        if(!noteId) {
            this.waitFor(NoteStore);
            noteId = NoteStore.getState().notes.slice(-1)[0].id;
        }
        const lanes = this.lanes.map(lane => {
            if(lane.id === laneId) {
                if(lane.notes.includes(noteId)) {
                    console.warn('Already attached note to lane', lanes);
                } else {
                    lane.notes.push(noteId);
                }
            }
            return lane;
        });
        this.setState({lanes});
    }

    detachFromLane({laneId, noteId}) {
        const lanes = this.lanes.map(lane => {
            if(lane.id === laneId) {
                lane.notes = lane.notes.filter(note => note !== noteId);
            }
            return lane;
        });
        this.setState({lanes});
    }

}

export default alt.createStore(LaneStore, 'LaneStore')