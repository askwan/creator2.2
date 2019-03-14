
import Field from './Field'


class Fields extends Array {
  constructor(lists=[]){
    super();
    lists.forEach(el=>this.add(el));
  }
  add(option){
    let field = new Field(option);
    let index = this.findIndex(el=>el.id==field.id);
    if(index==-1) this.push(field)
  }
  toJson(){
    return {
      fields:this.map(el=>el.toJson())
    }
  }
  simple(){
    return this.map(el=>el.simple());
  }
}


export default Fields