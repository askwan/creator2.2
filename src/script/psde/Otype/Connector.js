import User from './User';

class Connector {
  constructor(option){
    this.setData(option)
  }
  setData(option){
    let connector = {
      id:'',
      type:'',
      user:'',
      dType:'',
      fId:''
    }
    Object.assign(connector,option);
    if(connector.user) connector.user = new User(connector.user);
    Object.assign(this,connector);
  }
}

export default Connector

