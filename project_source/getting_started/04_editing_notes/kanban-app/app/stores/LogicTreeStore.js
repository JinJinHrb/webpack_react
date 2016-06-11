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
        })
    }

    add([treeId, nodeId]){
        const trees = this.trees.map(obj => {
            if(obj.id === treeId){
                this.add_iterateTree(obj.tree, nodeId);
            }
            return obj;
        })
        this.setState({
            trees: trees
        });
    }

    add_iterateTree(tree, nodeId){
        if( !(tree instanceof Array) ){
            return null;
        }
        for(let i=0; i<tree.length; i++){
            var node = tree[i];
            if(node.id === nodeId){
                const children = node.children || [];
                node.children = react_update(children, {$push: [
                    {
                        id: uuid.v4(),
                        title: '新节点'
                    }
                ]})
                break;
            }else{
                this.add_iterateTree(node.children, nodeId);
            }
        }
    }

}

export default alt.createStore(LogicTreeStore, 'LogicTreeStore');