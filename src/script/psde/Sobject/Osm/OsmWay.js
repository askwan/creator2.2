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
      refId: '',
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
    if(this.id == id) return true;
    let node = this.nodes.find(el=>el.isRelated(id));
    return Boolean(node);
  }
  normalized(context,entity){
    this.id = this.clearId(entity.id);
    this.uuid = entity.uuid;
    this.vid = entity.vid;
    this.nodes = entity.nodes.map(nodeId=>{
      return new OsmNode(context,context.entity(nodeId))
    })
    return this
  }
}

export default OsmWay