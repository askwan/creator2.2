import Model from './Model'
class Models extends Array {
  constructor(lists){
    super();
    lists.forEach(el=>this.add(el));
  }
  add(option){
    let index = this.findIndex(el=>el.id==option.id);
    if(index==-1){
      let model = new Model(option);
      this.push(model);
    }
  }
}

export default Models