import OsmEntity from './OsmEntity';

class OsmNode extends OsmEntity {
  constructor(node){
    super();
    this.setData(node);
  }
  setData(option){
    let node = {
      id:'',
      uuid:'',
      vid:'',
      flag:0,
      x:0,
      y:0,
      refId:'',
      type:'node'
    };
    Object.assign(node,option);
    Object.assign(this,node)
  }
  toGeoJson(){
    
  }
  isRelated(id){
    id = this.clearId(id);
    return id == this.id;
  }
  normalized(context,entity){
    this.x = entity.loc[0];
    this.y = entity.loc[1];
    this.id = this.clearId(entity.id);
    this.uuid = entity.uuid;
    this.vid = entity.vid;
    return this;
  }
  changeLoc(loc){
    this.x = loc[0];
    this.y = loc[1];
  }
}

export default OsmNode;