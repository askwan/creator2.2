export default class Model {
  constructor(option){
    this.setData(option);
  }
  setData(option){
    let model = {};
    Object.assign(this,model,option);
    
  }
}