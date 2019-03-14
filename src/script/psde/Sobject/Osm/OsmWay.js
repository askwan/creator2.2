import OsmEntity from './OsmEntity';
import OsmNode from './OsmNode';

class OsmWay extends OsmEntity {
  constructor(way){
    super();
    this.setData(way);
  }
  setData(option){
    let way = {
      id:'',
      uuid:'',
      nodes:[],
      refOb: {},
      flag:0,
      type:'way'
    }
    Object.assign(way,option);
    way.nodes = way.nodes.map(node=>{
      return new OsmNode(node);
    })
    Object.assign(this,way);
  }
  toGeoJson(){
    
  }
  isRelated(id){
    id = this.clearId(id);
    let node = this.nodes.find(el=>el.isRelated(id));
    return Boolean(node);
  }
}

export default OsmWay