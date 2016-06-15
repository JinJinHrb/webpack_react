import uuid from 'node-uuid';
import alt from '../libs/alt';
import LogicTreeActions from '../actions/LogicTreeActions';
import NoteStore from './NoteStore';
import react_update from 'react-addons-update';

import LaneStore from './LaneStore'

class LogicTreeStore {

    constructor() {
        this.bindActions(LogicTreeActions);

        this.trees = [];

        this.editModal = {
            showModal: false
        };

        this.exportPublicMethods({
            getLogicNotes: this.getLogicNotes.bind(this)
            , getParentNode: this.getParentNode.bind(this)
        })
    }

    create(obj){
        const trees = this.trees;

        obj.id = uuid.v4();
        obj.tree = obj.tree || [{
                id: uuid.v4(),
                title: '新节点',
                isRoot: true
            }];
        obj.defaultExpandAll = true;

        this.setState({
            trees: trees.concat(obj)
        });
    }

    delete(id){
        const trees = this.trees;
        this.setState({
            trees: trees.filter(obj => obj.id!==id)
        });
    }

    updating(id){
        const trees = this.trees.map(tree => {
            if(tree.id === id){
                tree.editing = true;
            }
            return tree;
        });

        this.setState({trees});
    }

    update(updatedTree){
        const trees = this.trees.map(tree => {
            if(tree.id === updatedTree.id){
                tree.editing = false;
                return Object.assign({}, tree, updatedTree);
            }
            return tree;
        });

        this.setState({trees});
    }

    add([treeId, nodeId, counter]){
        if(!treeId || !nodeId){
            return;
        }
        const trees = this.trees.map(obj => {
            if(obj.id === treeId){
                this.add_iterateTree(obj.tree, nodeId, counter);
            }
            return obj;
        })
        this.setState({
            trees: trees
        });
    }

    add_iterateTree(tree, nodeId, counter){
        if( !(tree instanceof Array) ){
            return null;
        }
        for(let i=0; i<tree.length; i++){
            const node = tree[i];
            if(node.id === nodeId){
                const children = node.children || [];
                node.children = react_update(children, {$push: [
                    {
                        id: uuid.v4(),
                        title: '新节点 - ' + counter
                    }
                ]})
                break;
            }else{
                this.add_iterateTree(node.children, nodeId, counter);
            }
        }
    }

    deleteNode([treeId, nodeId]){
        if(!treeId || !nodeId){
            return;
        }
        const trees = this.trees.map(obj => {
            if(obj.id === treeId){
                obj.tree = this.deleteNode_iterateTree(obj.tree, nodeId);
            }
            return obj;
        })
        this.setState({
            trees: trees
        });
    }



    deleteNode_iterateTree(tree, nodeId){
        if( !(tree instanceof Array) ){
            return null;
        }
        const filteredTree = tree.filter(node => node.id!=nodeId);
        if(filteredTree.length<tree.length){
            return filteredTree;
        }
        for(let i=0; i<tree.length; i++){
            let node = tree[i];
            if(node.children instanceof Array){
                node.children = this.deleteNode_iterateTree(node.children, nodeId);
            }
        }
        return tree;
    }

    openEditModal([treeId, nodeId]){
        const editModal = Object.assign(
            this.editModal || {},
            {showModal: true, treeId, nodeId}
        );
        this.setState({
            editModal: editModal
        })
    }

    closeEditModal(){
        const editModal = Object.assign(this.editModal || {}, {showModal: false});
        this.setState({
            editModal: editModal
        })
    }

    getLogicNotes(treeId, nodeId){
        const obj = this.trees.filter(tree => tree.id===treeId)[0];
        if(!obj){
            return [];
        }
        const logicNotes = [];
        this.getLogicNotes_iterateTree(obj.tree, nodeId, logicNotes);
        return logicNotes;

    }

    /** 同时将 note 全部查出 */
    getParentNode(treeId, nodeId){
        const trees = this.trees.filter(obj=>obj.id===treeId);
        const treeObj = trees[0];
        if(!treeObj){
            return null;
        }
        var parentNodes = [];
        this.getParentNode_iterate(treeObj.tree, nodeId, null, parentNodes);
        return parentNodes;
    }

    getParentNode_iterate(tree, nodeId, parentNode, parentNodes){
        if( !(tree instanceof Array) ){
            return false;
        }
        for(let i=0; i<tree.length; i++){
            const node = tree[i];
            if(node.id === nodeId){
                if(!parentNode){
                    return false;
                }
                const logicNotes0 = parentNode.logicNotes;
                parentNode.logicNotes = logicNotes0.map(lane=>{
                    const laneId = lane.id;
                    const parentLogicNotes = LaneStore.getLanesByIds([laneId]);
                    const notesExtend = parentLogicNotes.map(lane=>{
                        const noteIds = lane.notes;
                        return NoteStore.getNotesByIds(noteIds);
                    });
                    lane.notesExtend = notesExtend;
                    return lane;
                });

                parentNodes.push(parentNode);
                return true;
            }
            const copyNode = {id: node.id, value: node.title, logicNotes: node.logicNotes};
            this.getParentNode_iterate(node.children, nodeId, copyNode, parentNodes);
        }
    }

    getLogicNotes_iterateTree(tree, nodeId, logicNotes=[]){
        if( !(tree instanceof Array) ){
            return null;
        }
        for(let i=0; i<tree.length; i++){
            const node = tree[i];
            if(node.id === nodeId){
                (node.logicNotes || []).forEach(logicNote=>logicNotes.push(logicNote));
                return;
            }else{
                this.getLogicNotes_iterateTree(node.children, nodeId, logicNotes);
            }
        }
    }

    addLogicNote([treeId, nodeId, logicNotes]){
        const trees = this.trees.map(obj => {
            if(obj.id === treeId){
                this.addLogicNote_iterateTree(obj.tree, nodeId, logicNotes);
            }
            return obj;
        })
        this.setState({
            trees: trees
        })
    }

    addLogicNote_iterateTree(tree, nodeId, logicNotes){
        if( !(tree instanceof Array) ){
            return null;
        }
        for(let i=0; i<tree.length; i++){
            const node = tree[i];
            if(node.id === nodeId){
                const logicNotes0 = node.logicNotes || [];
                node.logicNotes = react_update(logicNotes0, {$push: logicNotes});
                break;
            }else{
                this.addLogicNote_iterateTree(node.children, nodeId, logicNotes);
            }
        }
    }

    deleteLogicNote([treeId, nodeId, logicNoteId]){
        const trees = this.trees.map(obj => {
            if(obj.id === treeId){
                this.deleteLogicNote_iterate(obj.tree, nodeId, logicNoteId);
            }
            return obj;
        })
        this.setState({
            trees: trees
        })
    }

    deleteLogicNote_iterate(tree, nodeId, logicNoteId){
        if( !(tree instanceof Array) ){
            return null;
        }
        for(let i=0; i<tree.length; i++){
            const node = tree[i];
            if(node.id === nodeId){
                const logicNotes0 = node.logicNotes || [];
                node.logicNotes = logicNotes0.filter(note => note.id !== logicNoteId);
                break;
            }else{
                this.deleteLogicNote_iterate(node.children, nodeId, logicNoteId);
            }
        }
    }

    move({treeId, nodeId, sourceId, targetId}) {
        const trees = this.trees.map(obj => {
            if(obj.id === treeId){
                this.move_iterateTree(obj.tree, nodeId, sourceId, targetId);
            }
            return obj;
        })

        this.setState({
            trees: trees
        })

    }

    /** @param sourceIdStr: '123-321-312#0'
     * zero following the pound(#) is index of the array "logicNotes"
     * */
    move_iterateTree(tree, nodeId, sourceIdStr, targetIdStr){
        if( !(tree instanceof Array) ){
            return null;
        }

        const sourcePoundIdx = sourceIdStr.lastIndexOf('#');
        const sourceId = sourceIdStr.substring(0, sourcePoundIdx);
        //const sourceIdx = sourceIdStr.substring(sourcePoundIdx+1);

        const targetPoundIdx = targetIdStr.lastIndexOf('#');
        const targetId = targetIdStr.substring(0, targetPoundIdx);
        //const targetIdx = targetIdStr.substring(targetPoundIdx+1);

        for(let i=0; i<tree.length; i++){
            const node = tree[i];
            if(node.id === nodeId){
                const logicNotes0 = node.logicNotes;

                let sourceNote, sourceIdx, targetNote, targetIdx;
                for(let j=0; j<logicNotes0.length; j++){
                    if(!sourceNote && logicNotes0[j].id===sourceId){
                        sourceNote = logicNotes0[j];
                        sourceIdx = j;
                    }else if(!targetNote && logicNotes0[j].id===targetId){
                        targetNote = logicNotes0[j];
                        targetIdx = j;
                    }
                    if(sourceNote && targetNote){
                        break;
                    }
                }

                if(!sourceNote || !targetNote){
                    return null;
                }

                node.logicNotes = react_update(logicNotes0, {$splice: [
                    [sourceIdx, 1],
                    [targetIdx, 0, sourceNote]
                ]});
            }else{
                this.move_iterateTree(node.children, nodeId, sourceIdStr, targetIdStr);
            }
        }
    }

}

export default alt.createStore(LogicTreeStore, 'LogicTreeStore');