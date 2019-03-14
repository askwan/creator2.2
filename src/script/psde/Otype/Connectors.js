import Connector from './Connector'
class Connectors extends Array {
  constructor(list=[]){
    super();
    list.forEach(el=>this.add(el));
  }
  add(option){
    let index = this.findIndex(el=>el.id==option.id);
    if(index==-1){
      let connector = new Connector(option);
      this.push(connector);
    }
  }
}
export default Connectors