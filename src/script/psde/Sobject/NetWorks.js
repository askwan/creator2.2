import Node from './Node';
export default class NetWorks extends Array {
  constructor(lists=[]){
    super();
    lists.forEach(el=>this.add(el))
  }
  add(node){
    let index = this.findIndex(el=>el.id==node.id);
    if(index==-1){
      this.push(new Node(node))
    }
  }
}