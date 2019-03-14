import Edge from './Edge'
import {Otype} from '../Otype'
import Properties from './Properties';
import Location from './Location'
class Node {
  constructor(option){
    this.setData(option)
  }
  setData(option){
    let node = {
      edge:{},
      id:'',
      label:'',
      oType:{},
      otypeName:'',
      point:{},
      properties:{},
      relatedObjectId:''
    }
    Object.assign(node,option);
    if(node.edge) node.edge = new Edge(node.edge);
    node.oType = new Otype(node.oType);
    node.properties = new Properties(node.properties);
    node.point = new Location(node.point);
    Object.assign(this,node);
  }
  toJson(){
    return {
      nodes:this
    }
  }
}

export default Node;