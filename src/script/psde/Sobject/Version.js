import {User} from '../Otype'
class Version {
  constructor(version){
    this.setData(version)
  }
  setData(option){
    let version = {
      msg:'',
      operate:0,
      user:{},
      vid:'',
      vtime:''
    }
    Object.assign(version,option);
    version.user = new User(version.user);
    Object.assign(this,version);
  }
}

export default Version;