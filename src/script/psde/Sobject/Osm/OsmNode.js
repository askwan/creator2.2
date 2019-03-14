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
}

export default OsmNode;