import uuid from 'node-uuid';
import alt from '../libs/alt';
import LogicTreeActions from '../actions/LogicTreeActions';
import NoteStore from './NoteStore';
var react_update = require('react-addons-update');

class LogicTreeStore {

    constructor() {
        this.bindActions(LogicTreeActions);

        this.trees = [];

        this.editModal = {
            showModal: false
        };

        this.exportPublicMethods({
            getLogicNotes: this.getLogicNotes.bind(this)
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

}

export default alt.createStore(LogicTreeStore, 'LogicTreeStore');