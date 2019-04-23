import SobjectServer from './server/SobjectServer';
import OtypeServer from './server/OtypeServer'
import config from './config';
import Sobject from './Sobject/Sobject';
import OsmNode from './Sobject/Osm/OsmNode';
import OsmWay from './Sobject/Osm/OsmWay';
import OsmRelation from './Sobject/Osm/OsmRelation';
class Psde {
  constructor(base={}){
    let url = base.url?base.url:config.psdeUrl;
    this.state = {
      cache:[],
      url:url,
      sdomains:base.sdomains
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
Psde.OsmNode = OsmNode;
Psde.OsmWay = OsmWay;
Psde.OsmRelation = OsmRelation;

export default Psde;