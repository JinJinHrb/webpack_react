import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';
import NoteStore from './NoteStore';
var react_update = require('react-addons-update');

class LaneStore {
    constructor(){
        this.bindActions(LaneActions);

        this.lanes = [];

        this.exportPublicMethods({
            getAllLanes: this.getAllLanes.bind(this)
            , getLanesById: this.getLanesById.bind(this)
            , getLanesByIds: this.getLanesByIds.bind(this)
        })
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

    move({sourceId, targetId}) {
        const lanes = this.lanes;
        const sourceLane = lanes.filter(lane => lane.notes.includes(sourceId))[0];
        const targetLane = lanes.filter(lane => lane.notes.includes(targetId))[0];
        const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
        const targetNoteIndex = targetLane.notes.indexOf(targetId);
        if(sourceLane === targetLane) {
            // move at once to avoid complications
            sourceLane.notes = react_update(sourceLane.notes, {
                $splice: [
                    [sourceNoteIndex, 1],
                    [targetNoteIndex, 0, sourceId]
                ] }
            );
        } else {
            // get rid of the source
            sourceLane.notes.splice(sourceNoteIndex, 1);
            // and move it to target
            targetLane.notes.splice(targetNoteIndex, 0, sourceId);
        }
        this.setState({lanes});
    }

    move2EmptyLane({sourceId, targetLane}) {
        let notes = targetLane.notes;
        if( (notes instanceof Array) && notes.length>0){
            return;
        }
        let targetLaneId = targetLane.id;
        const lanes = this.lanes.map(lane => {
            if(lane.id === targetLaneId){
                lane.notes = react_update(lane.notes, {
                    $push: [sourceId]
                });
            }else if( (lane.notes instanceof Array) && lane.notes.includes(sourceId) ){
                let sourceIdx = lane.notes.indexOf(sourceId);
                lane.notes = react_update(lane.notes, {
                    $splice: [
                        [sourceIdx, 1]
                    ]
                });
            }
            return lane;
        });
        this.setState({lanes});
    }

    getAllLanes(){
        const lanes = this.lanes.map(lane => {
            let id = lane.id;
            let value = lane.value;
            return {id, value};
        })
        return lanes;
    }

    /** 可以根据单个 ID 获得 Lanes */
    getLanesById(id){
        return this.lanes.filter(lane => lane.id===id).map(lane => {
            return {id: lane.id, value: lane.value}
        });
    }

    /** 可以根据 多个 ID 获得 Lanes */
    getLanesByIds(ids){
        if( !(ids instanceof Array) ){
            return [];
        }
        return (ids || []).map(id => {
            return this.lanes.filter(lane => lane.id===id)
        }).filter(a=>a.length).map(a=>a[0]);
    }

}

export default alt.createStore(LaneStore, 'LaneStore')