import Form from './Form'

class Forms extends Array {
  constructor(lists=[]){
    super();
    lists.forEach(el=>this.add(el));
  }
  add(option){
    let index = this.findIndex(el=>el.id==option.id);
    if(index==-1){
      this.push(new Form(option))
    }
  }
  modify(){

  }
  remove(){
    
  }
}

export default Forms