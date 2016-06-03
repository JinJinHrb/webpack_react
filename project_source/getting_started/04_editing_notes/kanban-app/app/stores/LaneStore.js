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