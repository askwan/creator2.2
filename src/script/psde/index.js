import SobjectServer from './server/SobjectServer';
import OtypeServer from './server/OtypeServer'
import config from './config';
import Sobject from './Sobject/Sobject'
class Psde {
  constructor(base={}){
    let url = base.url?base.url:config.psdeUrl;
    this.state = {
      cache:[],
      url:url
    };
    Object.assign(this.state,base)
    this.init();
  }
  init(){
    this.objectServer = new SobjectServer(this.state);
    this.otypeServer = new OtypeServer(this.state);
  }
  
}

Psde.Sobject = Sobject;

export default Psde;