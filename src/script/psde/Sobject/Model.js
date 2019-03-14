class Model {
  constructor(model){
    this.setData(model)
  }
  setData(option){
    let model = {};
    Object.assign(this,model,option);
  }
}

export default Model;