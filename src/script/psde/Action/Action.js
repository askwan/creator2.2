
class Action {
  constructor(action){
    this.setData(action)
  }
  setData(option){
    let action = {
      id:'',
      operation:0
    };
    Object.assign(this,action,option)
  }
}

export default Action;