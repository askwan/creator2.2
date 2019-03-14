
import Action from './Action'
import FLAG from './Flag'

class Actions extends Array {
  constructor(lists=[]){
    super();
    lists.forEach(el=>this.add(el.id,el.operation))
  }
  add(id,operation){
    let index = this.findIndex(el=>el.id==id&&el.operation==operation);
    if(index==-1) this.push(new Action({id,operation}));
  }
  find(id,operation){
    let result = this.Actions.find(el=>el.id==id&&el.operation == operation);
    return result;
  }
  del(id,operation){
    let index = this.Actions.find(el=>el.id==id&&el.operation == operation);
    this.splice(index,1);
  }
  createObject(id){
    let operation = FLAG.createObject
    this.add({id,operation});
  }
  modifyObject(id){
    let operation = FLAG.modifyObject;
    if(!this.isNew() && !this.isDelete()) this.add(id,operation);
  }
  deleteObject(id){
    this.clear();
    let operation = FLAG.deleteObject;
    this.add({id,operation})
  }
  //attr
  addAttr(id){
    let operation = FLAG.addAttribute;
    if(!this.isNew() && !this.isDelete()) this.add(id,operation);
  }
  modifyAttr(id){
    let operation = FLAG.modifyAttribute;
    if(!this.isNew() && !this.isDelete()) {
      let addAction = this.find(el=>el.id==id&&el.operation==(FLAG.addAttribute));
      let deleteAction = this.find(el=>el.id==id&&el.operation==(FLAG.deleteAttribute))
      if(!addAction&&!deleteAction){
        this.add(id,operation);
      }
    }
  }
  deleteAttr(id){
    let operation = FLAG.deleteAttribute;
    if(!this.isNew() && !this.isDelete()) {
      let addAction = this.findIndex(el=>el.id==id&&el.operation==(FLAG.addAttribute));
      if(addAction>-1){
        this.del(id,FLAG.addAttribute);
      }else {
        this.add(id,operation)
      }
    }
  }

  isNew(){
    return this.find(el=>el.operation==(FLAG.createObject)) ? true : false;
  }
  isDelete(){
    return this.find(el=>el.operation==(FLAG.deleteObject)) ? true : false;
  }
  clear(){
    this.splice(0,this.length);
  }
}

export default Actions