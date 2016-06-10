import uuid from 'node-uuid';
import alt from '../libs/alt';
import LogicTreeActions from '../actions/LogicTreeActions';
import NoteStore from './NoteStore';
var react_update = require('react-addons-update');

class LogicTreeStore {
    constructor() {
        this.bindActions(LogicTreeActions);

        this.trees = [];
    }

    create(obj){
        const trees = this.trees;

        obj.id = uuid.v4();
        obj.tree = obj.tree || [{
                id: uuid.v4(),
                title: '新节点',
                isLeaf: false
            }];

        this.setState({
            trees: trees.concat(obj)
        });
    }

    delete(id){
        const trees = this.trees;
        this.setState({
            trees: trees.filter(obj => obj.id!==id)
        })
    }

}

export default alt.createStore(LogicTreeStore, 'LogicTreeStore');